import type { Metadata } from 'next';

import { Inter } from 'next/font/google';
import React from 'react';
import JoiProvider from 'src/contexts/JoiProvider';
import { Toaster } from 'src/shared/components/toast/toaster';

import ReactQueryProvider from '../contexts/ReactQueryProvider';
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
          <Toaster />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
