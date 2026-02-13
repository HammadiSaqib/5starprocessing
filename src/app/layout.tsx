import type { Metadata } from "next";
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
  const script = `
    (function(){
      var r = document.documentElement.style;
      r.setProperty('--db-brand-50','${theme[50]}');
      r.setProperty('--db-brand-100','${theme[100]}');
      r.setProperty('--db-brand-200','${theme[200]}');
      r.setProperty('--db-brand-300','${theme[300]}');
      r.setProperty('--db-brand-400','${theme[400]}');
      r.setProperty('--db-brand-500','${theme[500]}');
      r.setProperty('--db-brand-600','${theme[600]}');
      r.setProperty('--db-brand-700','${theme[700]}');
      r.setProperty('--db-brand-800','${theme[800]}');
      r.setProperty('--db-brand-900','${theme[900]}');
      r.setProperty('--db-brand-950','${theme[950]}');
    })();
  `;
  return (
    <html lang="en" data-scroll-behavior="smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script dangerouslySetInnerHTML={{ __html: script }} />
        {children}
      </body>
    </html>
  );
}
