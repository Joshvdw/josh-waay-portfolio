export const metadata = {
  title: "Josh Waay Portfolio",
  description: "Creative Frontend Web Developer",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
