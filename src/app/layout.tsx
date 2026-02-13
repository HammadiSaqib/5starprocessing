import type { Metadata } from "next";
import type React from "react";
import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import { getApplicationTheme } from "@/lib/db";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "5 Star Processing",
  description: "Authentication demo",
  icons: {
    icon: "/favicon.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = await getApplicationTheme();
  const htmlStyle = {
    ["--db-brand-50" as string]: theme[50],
    ["--db-brand-100" as string]: theme[100],
    ["--db-brand-200" as string]: theme[200],
    ["--db-brand-300" as string]: theme[300],
    ["--db-brand-400" as string]: theme[400],
    ["--db-brand-500" as string]: theme[500],
    ["--db-brand-600" as string]: theme[600],
    ["--db-brand-700" as string]: theme[700],
    ["--db-brand-800" as string]: theme[800],
    ["--db-brand-900" as string]: theme[900],
    ["--db-brand-950" as string]: theme[950],
  } as React.CSSProperties;
  return (
    <html lang="en" data-scroll-behavior="smooth" style={htmlStyle}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
