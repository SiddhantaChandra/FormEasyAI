import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import { Toaster } from '@/components/ui/toaster';

import './globals.css';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: 'FormEasy - AI Form Builder',
  description:
    'FormEasy is an AI-powered form builder designed to simplify the way you create and manage forms. With intuitive features and smart automation, it helps you design professional, dynamic forms effortlessly—perfect for surveys, registrations, feedback, and more. Say goodbye to tedious setups and hello to smarter, faster form creation with FormEasy!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`bg-white ${poppins.className} ${poppins.className} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
