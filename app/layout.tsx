// Root layout: fonts and metadata for the single-page Derya site.
import type { Metadata } from "next";
import { Geist_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";

const serif = Source_Serif_4({ subsets: ["latin"], variable: "--font-serif", weight: ["400", "500", "600"], style: ["normal", "italic"] });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "Derya",
  description: "Derya is a research lab building agents for the commercial work of industrial manufacturers.",
  metadataBase: new URL("https://derya.ai"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${serif.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
