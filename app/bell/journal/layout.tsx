// Journal version: a Caslon face for a mid-century technical journal.
import { Libre_Caslon_Text } from "next/font/google";

const type = Libre_Caslon_Text({ subsets: ["latin"], weight: ["400", "700"], style: ["normal", "italic"], variable: "--journal-font" });

export default function JournalLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={type.variable}>{children}</div>;
}
