import React from 'react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import '@/app/globals.css';
import { Header } from '@/components/Header';
import { Navigation } from '@/components/Navigation';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ModernizedApp - COBOL CRM System',
  description: 'Modernized CICS/BMS Customer Relationship Management Application',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-950 text-slate-100 min-h-screen flex flex-col`}>
        <Header />
        <div className="flex flex-col md:flex-row flex-1">
          <Navigation />
          <main className="flex-1 p-4 md:p-8 overflow-x-hidden bg-slate-950">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}
