import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Vibecoding CV Engine',
  description: 'AI powered CV generation and tailoring'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
