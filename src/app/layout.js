import { Bai_Jamjuree, Poppins } from "next/font/google";

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
  title: "Josh Waay | Portfolio",
  description: `
    Hi there 👋 I'm a creative developer who specialises in frontend web development 
    and creating immersive digital experiences. I can bring any design idea to life, 
    as well as enhance your online presence through bespoke, innovative web-solutions. 
    I strive to make each project visually captivating, memorable, and engaging for 
    users worldwide. Let's build something cool together!
  `,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${baj_jamjuree.variable}`}>
      <body>
        <link rel="icon" href="/images/logos/star.png" sizes="any" />
        {children}
      </body>
    </html>
  );
}
