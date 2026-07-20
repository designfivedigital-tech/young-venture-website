"use client";

import { usePathname } from "next/navigation";
import Header from "./Header/Header";
import CustomCursor from "./CustomCursor";
import Footer from "./Footer/Footer";
import ScrollToTop from "./ScrollToTop";
import PageTransition from "./PageTransition";

// Routes that render as fully standalone pages (their own nav/footer/theme)
// and should not be wrapped in the main site chrome.
const STANDALONE_ROUTES = ["/startup-valuation-tool"];

export default function SiteChrome({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (STANDALONE_ROUTES.includes(pathname)) {
    return <>{children}</>;
  }

  return (
    <div className="site-shell">
      <CustomCursor />
      <Header />

      <PageTransition>
        <main className="site-main">{children}</main>
      </PageTransition>
      <ScrollToTop />
      <Footer />
    </div>
  );
}
