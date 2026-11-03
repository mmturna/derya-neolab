// Memorandum version: typewriter face for a typed internal memo.
import { Courier_Prime } from "next/font/google";

const type = Courier_Prime({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--memo-font" });

export default function MemoLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={type.variable}>{children}</div>;
}
