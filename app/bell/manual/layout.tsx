// Manual version: a Times-style face for a typeset manual page.
import { Tinos } from "next/font/google";

const type = Tinos({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--manual-font" });

export default function ManualLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={type.variable}>{children}</div>;
}
