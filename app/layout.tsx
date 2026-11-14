import type { Metadata } from 'next';
import './globals.css';
export const metadata: Metadata = { title: 'Disce · Učbeniki', description: 'Interaktivni učbeniki in jezikovna pomoč v slovenščini.' };
export default function RootLayout({children}: Readonly<{children: React.ReactNode}>) { return <html lang="sl"><body>{children}</body></html>; }
