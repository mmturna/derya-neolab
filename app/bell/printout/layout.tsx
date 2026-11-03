// Printout version: a monospaced face for line printer output.
import { IBM_Plex_Mono } from "next/font/google";

const type = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "600"], variable: "--printout-font" });

export default function PrintoutLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={type.variable}>{children}</div>;
}
