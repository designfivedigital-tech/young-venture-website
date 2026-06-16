"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import "./PageTransition.css";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="page-transition-root">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          className="page-slide-motion"
          initial={{ x: "100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{
            duration: 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="page-slide-card">{children}</div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}