"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navItems = [
  {
    label: "Team",
    href: "/team",
    icon: "/images/icons/relationship.colorable.svg",
  },
  {
    label: "Commitments",
    href: "/commitments",
    icon: "/images/icons/link.colorable.svg",
  },
  {
    label: "University Network",
    href: "/university-network",
    icon: "/images/icons/graduation.colorable.svg",
  },
  {
    label: "Noise",
    href: "/noise",
    icon: "/images/icons/blog.colorable.svg",
  },
  {
    label: "Contacts",
    href: "/contacts",
    icon: "/images/icons/contact-book.colorable.svg",
  },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="fixed left-0 top-0 z-50 w-full bg-transparent px-6 py-6 md:px-10">
        <div className="flex items-center justify-end">
          <Link href="/contacts" prefetch className="group hidden md:flex">
            <span className="flex items-center overflow-hidden rounded border border-white/45 text-sm font-semibold uppercase tracking-wide text-white transition-all duration-300 group-hover:border-white group-hover:bg-white group-hover:text-black">
              <span className="px-6 py-3">Contattaci</span>
              <span className="border-l border-white/35 px-4 py-3 transition-colors duration-300 group-hover:border-black">
                ↗
              </span>
            </span>
          </Link>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className="text-sm font-medium tracking-wide text-neutral-300 transition-colors hover:text-white md:hidden"
          >
            Menu
          </button>
        </div>
      </header>

      <nav className="group fixed left-0 top-0 z-40 hidden h-screen w-18 bg-black/10 backdrop-blur-2xl transition-all duration-500 hover:w-55 hover:bg-black/30 md:block">
        <Link
          href="/"
          prefetch
          aria-label="Go to homepage"
          className="absolute left-0 top-6 flex w-18 justify-center"
        >
          <Image
            src="/images/logo-young-ventures.svg"
            alt="Young Ventures"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex h-full flex-col items-start justify-center border-r border-white/15">
          <div className="flex w-full flex-col gap-18">
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch
                  className="flex h-11 w-full items-center gap-4 overflow-hidden px-3"
                >
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border text-xl transition-all duration-300 ${
                      isActive
                        ? "border-white text-white"
                        : "border-transparent text-white/55 group-hover:text-white"
                    }`}
                  >
                    <Image
                      src={item.icon}
                      alt=""
                      width={45}
                      height={45}
                      className="h-9 w-9 opacity-90 invert transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </span>

                  <span className="whitespace-nowrap text-lg font-medium text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </nav>
 
      <div
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm transition-opacity duration-300 md:hidden ${
          menuOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setMenuOpen(false)}
      />

      <aside
        className={`fixed right-0 top-0 z-50 h-screen w-[82vw] max-w-sm bg-black px-8 py-6 text-white shadow-2xl transition-transform duration-500 ease-out md:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="mb-16 flex items-center justify-between">
          <Image
            src="/images/logo-young-ventures.svg"
            alt="Young Ventures"
            width={120}
            height={32}
            priority
            className="h-8 w-auto"
          />

          <button
            type="button"
            onClick={() => setMenuOpen(false)}
            className="text-sm text-neutral-400 transition-colors hover:text-white"
          >
            Close
          </button>
        </div>

        <nav className="flex flex-col gap-7">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              prefetch
              onClick={() => setMenuOpen(false)}
              className="text-3xl font-medium tracking-tight text-neutral-300 transition-colors duration-300 hover:text-white"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}