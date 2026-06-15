import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header/Header";
import CustomCursor from "./components/CustomCursor";
import Footer from "./components/Footer/Footer";
import ScrollToTop from "./components/ScrollToTop";

const youngVenturesFont = localFont({
  src: [
    {
      path: "../public/fonts/YV-font-y-normal.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/YoungVenturesFont-Grassetto.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "../public/fonts/YoungVenturesFont-Corsivo.ttf",
      weight: "400",
      style: "italic",
    },
  ],
});

export const metadata: Metadata = {
  title: "Young Ventures",
  description: "Young Ventures website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={youngVenturesFont.className}>
      <div className="site-shell">
        <CustomCursor />
        <Header />

        <main className="site-main">
          {children}
        </main>
        <ScrollToTop/>
        <Footer/>
      </div>
    </body>
    </html>
  );
}