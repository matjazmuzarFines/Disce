import assert from 'node:assert/strict';
import test from 'node:test';
import { AnswerStore } from '../lib/answer-store.ts';

class MemoryStorage {
  values = new Map();
  getItem(key) { return this.values.get(key) ?? null; }
  setItem(key, value) { this.values.set(key, value); }
}

function deferred() {
  let resolve;
  let reject;
  const promise = new Promise((yes, no) => { resolve = yes; reject = no; });
  return { promise, resolve, reject };
}

function backend(initial = []) {
  const rows = new Map(initial.map(row => [row.book_id + ':' + row.field_id, row]));
  return {
    rows,
    async read() { return [...rows.values()]; },
    async write(values, preserveExisting) {
      for (const row of values) {
        const key = row.book_id + ':' + row.field_id;
        if (!preserveExisting || !rows.has(key)) rows.set(key, { ...row });
      }
    },
  };
}

test('server answers replace stale cache and preserve fields edited during loading', async () => {
  const storage = new MemoryStorage();
  storage.setItem('disce-answers-v1:user-a', JSON.stringify({ answers: { worksheet: { old: 'stale' } } }));
  const read = deferred();
  const server = backend();
  server.read = () => read.promise;
  const store = new AnswerStore('user-a', server);
  const started = store.start(storage);
  store.put('worksheet', 'new', 'typed');
  read.resolve([{ book_id: 'worksheet', field_id: 'old', answer: 'server' }]);
  await started;
  assert.deepEqual(store.getSnapshot().answers.worksheet, { old: 'server', new: 'typed' });
  await store.flush();
  assert.equal(server.rows.get('worksheet:new').answer, 'typed');
  store.stop();
});

test('typing during an in-flight write is serialized and keeps the latest value', async () => {
  const server = backend();
  const firstWrite = deferred();
  const originalWrite = server.write;
  let calls = 0;
  server.write = async rows => {
    calls++;
    if (calls === 1) await firstWrite.promise;
    await originalWrite(rows);
  };
  const store = new AnswerStore('user-a', server);
  await store.start(new MemoryStorage());
  store.put('volentieri', 'predstavitev-0', 'first');
  const saving = store.flush();
  store.put('volentieri', 'predstavitev-0', 'latest');
  store.put('worksheet', 'ex1-0-1', 'scrivo');
  firstWrite.resolve();
  assert.equal(await saving, true);
  assert.equal(server.rows.get('volentieri:predstavitev-0').answer, 'latest');
  assert.equal(server.rows.get('worksheet:ex1-0-1').answer, 'scrivo');
  assert.equal(store.getSnapshot().pendingCount, 0);
  store.stop();
});

test('failed saves retain the per-user outbox across logout and retry after login', async () => {
  const storage = new MemoryStorage();
  const server = backend();
  const originalWrite = server.write;
  server.write = async () => { throw Error('offline'); };
  const first = new AnswerStore('user-a', server);
  await first.start(storage);
  first.put('worksheet', 'ex1-0-1', 'scrivo');
  assert.equal(await first.flush(), false);
  assert.equal(first.getSnapshot().pendingCount, 1);
  first.stop();
  server.write = originalWrite;
  const second = new AnswerStore('user-a', server);
  await second.start(storage);
  assert.equal(second.getSnapshot().answers.worksheet['ex1-0-1'], 'scrivo');
  assert.equal(await second.flush(), true);
  assert.equal(server.rows.get('worksheet:ex1-0-1').answer, 'scrivo');
  second.stop();
  const other = new AnswerStore('user-b', backend());
  await other.start(storage);
  assert.deepEqual(other.getSnapshot().answers, {});
  other.stop();
});

test('legacy import preserves server answers, old local data and pending edits', async () => {
  const storage = new MemoryStorage();
  storage.setItem('parola-answers', JSON.stringify({ 'predstavitev-0': 'legacy', 'predstavitev-1': 'Roma' }));
  storage.setItem('disce-worksheet-answers', JSON.stringify({ '4': 'old free text', 'ex1-0-1': 'old' }));
  const server = backend([{ book_id: 'volentieri', field_id: 'predstavitev-0', answer: 'server' }]);
  const store = new AnswerStore('user-a', server);
  await store.start(storage);
  store.put('worksheet', 'ex1-0-1', 'new');
  await store.importLegacy();
  assert.equal(server.rows.get('volentieri:predstavitev-0').answer, 'server');
  assert.equal(server.rows.get('volentieri:predstavitev-1').answer, 'Roma');
  assert.equal(server.rows.get('worksheet:4').answer, 'old free text');
  assert.equal(server.rows.get('worksheet:ex1-0-1').answer, 'new');
  assert.equal(storage.getItem('disce-legacy-answers-owner'), 'user-a');
  assert.ok(storage.getItem('parola-answers'));
  store.stop();
  const other = new AnswerStore('user-b', backend());
  await other.start(storage);
  assert.equal(other.getSnapshot().legacyCount, 0);
  other.stop();
});

test('a late load from a disposed session cannot populate a new session', async () => {
  const firstRead = deferred();
  const server = backend();
  let reads = 0;
  server.read = () => ++reads === 1 ? firstRead.promise : Promise.resolve([]);
  const store = new AnswerStore('user-a', server);
  const stale = store.start(new MemoryStorage());
  store.stop();
  await store.start(new MemoryStorage());
  firstRead.resolve([{ book_id: 'worksheet', field_id: 'x', answer: 'stale' }]);
  await stale;
  assert.deepEqual(store.getSnapshot().answers, {});
  store.stop();
});

test('editing during a failed load can retry without deleting other remote fields', async () => {
  const server = backend([{ book_id: 'worksheet', field_id: 'other', answer: 'keep' }]);
  const read = server.read;
  server.read = async () => { throw Error('offline'); };
  const store = new AnswerStore('user-a', server);
  await store.start(new MemoryStorage());
  store.put('worksheet', 'mine', 'new');
  server.read = read;
  assert.equal(await store.retry(), true);
  assert.equal(server.rows.get('worksheet:other').answer, 'keep');
  assert.equal(server.rows.get('worksheet:mine').answer, 'new');
  store.stop();
});
