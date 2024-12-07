import { Bai_Jamjuree, Poppins } from "next/font/google";
import { meta } from "@/data/personalData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
});

const baj_jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-baj_jamjuree",
  weight: ["400", "700"],
});

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${baj_jamjuree.variable}`}>
      <body>
        {children}
      </body>
    </html>
  );
}
