// Layout for the Bell Labs terminal version: its monospace font and its own stylesheet.
import { IBM_Plex_Mono } from "next/font/google";
import "./bell.css";

const mono = IBM_Plex_Mono({ subsets: ["latin"], variable: "--font-bell", weight: ["400", "600"] });

export default function BellLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={`bell ${mono.variable}`}>{children}</div>;
}
