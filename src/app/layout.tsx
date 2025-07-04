import type { Metadata } from "next";
import { FirebaseProvider } from "./contexts/FirebaseProvider";
import { ThemeProvider } from "./Theme/ThemeProvider";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata  = {
  title: 'Akinola Femi - Portfolio',
  description: 'The portfolio of Akinola Femi, a full-stack developer.',
};

export default function RootLayout({
   children, }: Readonly<{
    children: React.ReactNode;
   }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`} suppressHydrationWarning>

        <ThemeProvider>
          <FirebaseProvider>
              <div className="bg-slate-100 dark:bg-slate-900 text-slate-700 dark:text-slate-300 font-sans">
                <style>{`
                  @keyframes float { 
                    0% { transform: translateY(0px); } 
                    50% { transform: translateY(-10px); } 
                    100% { transform: translateY(0px); } 
                  } 
                  .animate-float { animation: float 6s ease-in-out infinite; }
                `}</style>
                {children}
              </div>
          </FirebaseProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}