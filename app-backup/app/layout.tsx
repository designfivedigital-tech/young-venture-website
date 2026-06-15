import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "./components/Header/Header";
import CustomCursor from "./components/CustomCursor";

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
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}