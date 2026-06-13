import type { Metadata } from "next";
import { Inter } from "next/font/google";

import "./globals.css";
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

const inter = Inter({ subsets: ["latin"] });

import { ClerkProvider } from '@clerk/nextjs'

export const metadata: Metadata = {
  title: "AI Marketing Command Center",
  description: "Enterprise SaaS platform for marketing analytics and intelligence",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID || ''} />
        <body className={inter.className} suppressHydrationWarning>
          {children}
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || ''} />
        </body>
      </html>
    </ClerkProvider>
  );
}
