import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import '@rainbow-me/rainbowkit/styles.css'; // rainbowkit styles
import { Providers } from "@/app/providers"; // providers
import Navbar from "./components/navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// declearing the metadata for the app
export const metadata: Metadata = {
  title: "BeraDapp",
  description: "Bera Chain Dapp",
  icons: ["https://avatars.githubusercontent.com/u/96059542"]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Providers>
            <Navbar></Navbar>
            {children}
          </Providers>
      </body>
    </html>
  );
}
