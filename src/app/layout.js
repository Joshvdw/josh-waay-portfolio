import { Bai_Jamjuree, Poppins } from "next/font/google";
import { meta } from "@/data/personalData";
import { Analytics } from "@vercel/analytics/next"
import { SpeedInsights } from "@vercel/speed-insights/next";

// Fonts
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const baj_jamjuree = Bai_Jamjuree({
  subsets: ["latin"],
  variable: "--font-baj_jamjuree",
  weight: ["400", "700"],
  display: "swap",
});

// Site image and base URL
const siteUrl =  meta.domain;
const ogImage = `${siteUrl}/openGraphPreview.webp`;

export const metadata = {
  title: meta.title,
  description: meta.description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: meta.title,
    description: meta.description,
    url: siteUrl,
    siteName: meta.title,
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 597,
        alt: meta.title,
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: meta.title,
    description: meta.description,
    images: [ogImage]
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.className} ${baj_jamjuree.variable}`}>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
