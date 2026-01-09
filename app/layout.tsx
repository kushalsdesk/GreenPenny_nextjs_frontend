import type React from "react";
import type { Metadata } from "next";
import { Inter, JetBrains_Mono, SUSE } from "next/font/google";
import "./globals.css";

const suse = SUSE({
  weight: "600",
  display: "auto",
  subsets: ["latin"],
  variable: "--font-sans",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenPenny - Smart Finance Management",
  description:
    "Track expenses, manage bills, and grow your wealth with intelligent insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={` ${suse.variable} ${jetbrainsMono.variable} `}>
      <body className="font-sans antialiased bg-linear-to-br from-green-50 via-white to-slate-50">
        {children}
      </body>
    </html>
  );
}
