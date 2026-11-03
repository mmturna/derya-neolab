// Root layout: fonts and metadata shared by every page of the Derya site.
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans", weight: ["300", "400", "500"] });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono", weight: ["400"] });

export const metadata: Metadata = {
  title: "Derya",
  description: "Intelligence for the companies that build the physical world.",
  metadataBase: new URL("https://derya.ai"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${sans.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
