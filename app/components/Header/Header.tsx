"use client";

import { useEffect, useRef, useState } from "react";
import "./Header.css";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  { label: "About Us", href: "/about-us" },
  { label: "Team", href: "/team" },
  { label: "Commitments", href: "/commitments" },
  { label: "University Network", href: "/university-network" },
  { label: "Noise", href: "/noise" },
  { label: "Contacts", href: "/contacts" },
];

export default function Header() {
  const pathname = usePathname();

  const [menuOpen, setMenuOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [headerTheme, setHeaderTheme] = useState<"dark" | "light">("dark");
  const [isHero, setIsHero] = useState(true);

  const lastScrollYRef = useRef(0);
  const hideTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const isHeaderHoveredRef = useRef(false);
  const isHeroRef = useRef(true);
  const menuOpenRef = useRef(false);

  const mobilePanelRef = useRef<HTMLElement | null>(null);
  const mobileToggleRef = useRef<HTMLButtonElement | null>(null);

  const closeMenu = () => setMenuOpen(false);

  const clearHideTimer = () => {
    if (hideTimerRef.current) {
      clearTimeout(hideTimerRef.current);
      hideTimerRef.current = null;
    }
  };

  const startHideTimer = (insideHero: boolean) => {
    clearHideTimer();

    if (insideHero || menuOpenRef.current || isHeaderHoveredRef.current) return;

    hideTimerRef.current = setTimeout(() => {
      if (
        isHeroRef.current ||
        menuOpenRef.current ||
        isHeaderHoveredRef.current
      ) {
        return;
      }

      setHidden(true);
    }, 3000);
  };

  useEffect(() => {
    menuOpenRef.current = menuOpen;
  }, [menuOpen]);

  useEffect(() => {
    isHeroRef.current = isHero;
  }, [isHero]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!menuOpenRef.current) return;

      const target = event.target as Node;

      const clickedInsidePanel = mobilePanelRef.current?.contains(target);
      const clickedToggle = mobileToggleRef.current?.contains(target);

      if (!clickedInsidePanel && !clickedToggle) {
        closeMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const updateHeaderState = () => {
      const sections = Array.from(
        document.querySelectorAll<HTMLElement>("[data-header-theme]")
      );

      const pointY = 90;

      const currentSection = sections.find((section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= pointY && rect.bottom >= pointY;
      });

      if (!currentSection) {
        setHeaderTheme("dark");
        setIsHero(false);
        isHeroRef.current = false;
        startHideTimer(false);
        return;
      }

      const theme = currentSection.getAttribute("data-header-theme");
      const insideHero = currentSection.hasAttribute("data-header-hero");

      if (theme === "light" || theme === "dark") {
        setHeaderTheme(theme);
      }

      setIsHero(insideHero);
      isHeroRef.current = insideHero;

      if (insideHero) {
        setHidden(false);
        clearHideTimer();
      } else {
        startHideTimer(false);
      }
    };

    updateHeaderState();

    window.addEventListener("scroll", updateHeaderState, { passive: true });
    window.addEventListener("resize", updateHeaderState);

    return () => {
      window.removeEventListener("scroll", updateHeaderState);
      window.removeEventListener("resize", updateHeaderState);
      clearHideTimer();
    };
  }, [pathname]);

  useEffect(() => {
    let ticking = false;
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollingUp = currentScrollY < lastScrollYRef.current;

          if (menuOpenRef.current || currentScrollY <= 80 || isHeroRef.current) {
            setHidden(false);
            clearHideTimer();
          } else if (scrollingUp) {
            setHidden(false);
            startHideTimer(false);
          } else if (!isHeaderHoveredRef.current) {
            setHidden(true);
          }

          lastScrollYRef.current = currentScrollY;
          ticking = false;
        });

        ticking = true;
      }
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  useEffect(() => {
    setHidden(false);
    setMenuOpen(false);
    menuOpenRef.current = false;
    isHeaderHoveredRef.current = false;
    clearHideTimer();
  }, [pathname]);

  useEffect(() => {
    menuOpenRef.current = menuOpen;

    if (menuOpen) {
      setHidden(false);
      clearHideTimer();
      document.body.classList.add("mobile-menu-is-open");
    } else {
      document.body.classList.remove("mobile-menu-is-open");
      startHideTimer(isHeroRef.current);
    }

    return () => {
      document.body.classList.remove("mobile-menu-is-open");
    };
  }, [menuOpen]);

  return (
    <header
      className={`site-header header-${headerTheme} ${
        hidden ? "site-header-hidden" : ""
      } ${menuOpen ? "site-header-menu-open" : ""}`}
    >
      <div
        className="site-header-inner"
        onMouseEnter={() => {
          isHeaderHoveredRef.current = true;
          setHidden(false);
          clearHideTimer();
        }}
        onMouseLeave={() => {
          isHeaderHoveredRef.current = false;
          startHideTimer(isHeroRef.current);
        }}
      >
        <Link
          href="/"
          prefetch={false}
          aria-label="Go to homepage"
          className="site-logo"
          onClick={closeMenu}
        >
          <Image
            src="/images/logo-young-ventures.svg"
            alt="Young Ventures"
            width={120}
            height={32}
            priority
            className="site-logo-img"
          />
        </Link>

        <nav
          onMouseEnter={() => document.body.classList.add("nav-hovered")}
          onMouseLeave={() => document.body.classList.remove("nav-hovered")}
          className="site-nav desktop-nav"
        >
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                prefetch={false}
                className={`menu-link ${isActive ? "menu-link-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <button
          ref={mobileToggleRef}
          type="button"
          className="mobile-menu-toggle"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
        >
          Menu
        </button>
      </div>

      <aside
        ref={mobilePanelRef}
        className={`mobile-menu-panel ${
          menuOpen ? "mobile-menu-panel-open" : ""
        }`}
      >
        <div className="mobile-menu-panel-inner">
          <div className="mobile-menu-top">
            <Image
              src="/images/logo-young-ventures.svg"
              alt="Young Ventures"
              width={120}
              height={32}
              className="mobile-menu-logo"
            />

            <button
              type="button"
              className="mobile-menu-close"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          <nav className="mobile-nav">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
  key={item.href}
  href={item.href}
  prefetch={false}
  onClick={closeMenu}
  className={`mobile-menu-link ${
    isActive ? "mobile-menu-link-active" : ""
  }`}
>
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>
    </header>
  );
}