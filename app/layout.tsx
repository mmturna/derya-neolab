// Root layout: font and metadata for the single-page Derya site.
import type { Metadata } from "next";
import { Newsreader } from "next/font/google";
import "./globals.css";

const serif = Newsreader({ subsets: ["latin"], variable: "--font-serif", weight: ["300", "400", "500"], style: ["normal", "italic"] });

export const metadata: Metadata = {
  title: "Derya",
  description: "Intelligence for the companies that build the physical world.",
  metadataBase: new URL("https://derya.ai"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={serif.variable}>
      <body>{children}</body>
    </html>
  );
}
