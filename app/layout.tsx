import type React from "react";
import type { Metadata } from "next";
import { JetBrains_Mono, SUSE } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "@/components/auth/ToastProvider";

const suse = SUSE({
  weight: "600",
  display: "auto",
  subsets: ["latin"],
  variable: "--font-sans",
});

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-sans",
//   display: "swap",
// });

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Green_Penny - Smart Finance Management",
  description:
    "Track expenses, manage bills, and grow your wealth with intelligent insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${suse.variable} ${jetbrainsMono.variable}`}>
      <body className="font-sans antialiased bg-app-gradient">
        <ToastProvider>{children}</ToastProvider>
      </body>
    </html>
  );
}
