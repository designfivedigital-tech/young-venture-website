import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import SiteChrome from "./components/SiteChrome";

const barlow = localFont({
  src: [
    { path: "../public/fonts/BarlowCondensedSquared-Thin.ttf", weight: "100", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-ThinItalic.ttf", weight: "100", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-ExtraLight.ttf", weight: "200", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-ExtraLightItalic.ttf", weight: "200", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-Light.ttf", weight: "300", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-LightItalic.ttf", weight: "300", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-Regular.ttf", weight: "400", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-Italic.ttf", weight: "400", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-Medium.ttf", weight: "500", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-MediumItalic.ttf", weight: "500", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-SemiBoldItalic.ttf", weight: "600", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-Bold.ttf", weight: "700", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-BoldItalic.ttf", weight: "700", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-ExtraBold.ttf", weight: "800", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-ExtraBoldItalic.ttf", weight: "800", style: "italic" },
    { path: "../public/fonts/BarlowCondensedSquared-Black.ttf", weight: "900", style: "normal" },
    { path: "../public/fonts/BarlowCondensedSquared-BlackItalic.ttf", weight: "900", style: "italic" },
  ],
  variable: "--font-barlow",
});

const playfair = localFont({
  src: [
    { path: "../public/fonts/PlayfairDisplay-VariableFont_wght.ttf", weight: "400 900", style: "normal" },
  ],
  variable: "--font-playfair",
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
      <body className={`${barlow.variable} ${playfair.variable} ${barlow.className}`}>
        <SiteChrome>{children}</SiteChrome>
      </body>
    </html>
  );
}