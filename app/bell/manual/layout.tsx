// Manual version: a condensed monospace face and the colour theme shell for the CLI-style manual.
import { Martian_Mono } from "next/font/google";
import { ThemeShell } from "./theme";

const type = Martian_Mono({ subsets: ["latin"], axes: ["wdth"], variable: "--manual-font" });

export default function ManualLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <ThemeShell className={type.variable}>{children}</ThemeShell>;
}
