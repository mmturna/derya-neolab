// Drawing version: condensed technical lettering for an engineering drawing.
import { Barlow_Semi_Condensed } from "next/font/google";

const type = Barlow_Semi_Condensed({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--drawing-font" });

export default function DrawingLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <div className={type.variable}>{children}</div>;
}
