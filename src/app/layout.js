import { Bai_Jamjuree, Poppins } from "next/font/google";
import { meta } from "@/data/personalData";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap", // Add this for better loading behavior
});

const baj_jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-baj_jamjuree",
  weight: ["400", "700"],
  display: "swap", // Add this
});

export const metadata = {
  title: meta.title,
  description: meta.description,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${baj_jamjuree.variable}`}>
      {/* <head>
        <link rel="prefetch" href="/lotties/preloader_star.json" as="fetch" />
        <link rel="prefetch" href="/lotties/hero_star.json" as="fetch" />
        <link rel="prefetch" href="/lotties/skip_lottie.json" as="fetch" />
        <link
          rel="prefetch"
          href="/lotties/play-pause_lottie.json"
          as="fetch"
        />
      </head> */}
      <body>{children}</body>
    </html>
  );
}
