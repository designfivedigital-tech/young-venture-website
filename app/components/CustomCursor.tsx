"use client";

import { useEffect, useState } from "react";

type CursorType = "youth" | "deep" | "clean" | null;

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const resetCursor = () => {
      delete document.body.dataset.cursor;
    };

    const moveCursor = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setVisible(true);

      const element = document.elementFromPoint(e.clientX, e.clientY);

      const target = element?.closest("[data-cursor]") as HTMLElement | null;
      const cursorType = target?.dataset.cursor as CursorType;

      if (cursorType === "youth" || cursorType === "clean" || cursorType === "deep") {
        document.body.dataset.cursor = cursorType;
      } else {
        resetCursor();
      }
    };

    const hideCursor = () => {
      setVisible(false);
      resetCursor();
    };

    const handleScroll = () => {
      resetCursor();
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseleave", hideCursor);
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseleave", hideCursor);
      window.removeEventListener("scroll", handleScroll);
      resetCursor();
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${visible ? "custom-cursor-visible" : ""}`}
      style={{
        transform: `translate(${position.x - 20}px, ${position.y - 20}px)`,
      }}
    />
  );
}