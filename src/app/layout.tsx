import type { Metadata } from "next";
import { FirebaseProvider } from "./contexts/FirebaseProvider";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Akinola Femi — Full-Stack Software Engineer",
  description:
    "Portfolio of Akinola Femi, a mid-level Full-Stack Software Engineer specializing in TypeScript, React, Next.js, Node.js, Python, and scalable distributed architectures.",
  keywords: [
    "Akinola Femi",
    "Full-Stack Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Node.js Developer",
    "TypeScript",
    "Python",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Akinola Femi" }],
  openGraph: {
    title: "Akinola Femi — Full-Stack Software Engineer",
    description:
      "Engineering high-performance web applications and robust architectures for global scale.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/Images/HeroPic.png",
        width: 800,
        height: 800,
        alt: "Akinola Femi — Full-Stack Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Akinola Femi — Full-Stack Software Engineer",
    description:
      "Full-stack software engineering portfolio specializing in TypeScript, React, Next.js, and Node.js.",
    images: ["/Images/HeroPic.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased selection:bg-brand-500 selection:text-white`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          <FirebaseProvider>
            <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-200 transition-colors duration-200">
              {children}
              <Analytics />
              <Toaster
                position="top-right"
                toastOptions={{
                  className:
                    "bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 shadow-xl",
                }}
              />
            </div>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}