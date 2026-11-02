// Root layout: fonts, metadata and the film-grain overlay shared by every page.
import type { Metadata } from "next";
import { DM_Sans, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const display = DM_Sans({ subsets: ["latin"], variable: "--font-display", weight: ["300", "400", "500"] });
const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: { default: "Derya", template: "%s · Derya" },
  description: "Derya is a research lab building agents for the commercial work of industrial manufacturers.",
  metadataBase: new URL("https://derya.ai"),
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <body>
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
