import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import React from 'react';
import JoiProvider from 'src/shared/providers/JoiProvider';

import ReactQueryProvider from '../shared/providers/ReactQueryProvider';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  description: 'Facebook',
  title: 'Facebook',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <ReactQueryProvider>
          <JoiProvider>{children}</JoiProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
