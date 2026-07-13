"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import styles from "./UniversityMapSection.module.css";

const POPUP_CLOSE_DURATION = 200;

const universities = [
  { name: "West-Coast", cx: 107.67, cy: 188.82, image: "/images/mappe/west-coast.png" },
  { name: "East-Coast", cx: 197.63, cy: 164.88, image: "/images/mappe/east-coast.png" },
  { name: "UK", cx: 287.18, cy: 153.68, image: "/images/mappe/mappa-eng.png" },
  { name: "Svizzera", cx: 305.41, cy: 166.46, image: "/images/mappe/mappa-svizzera.png" },
  { name: "Italia", cx: 312.82, cy: 178.50, image: "/images/mappe/mappa-italia.png" },
];

type PopupAnchor = {
  left: number;
  top: number;
};

export default function UniversityMapSection() {
  const [active, setActive] = useState<string | null>(null);
  const [popupImage, setPopupImage] = useState<string | null>(null);
  const [popupAnchor, setPopupAnchor] = useState<PopupAnchor | null>(null);
  const [isPopupClosing, setIsPopupClosing] = useState(false);
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const circleRefs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    circleRefs.current.forEach((circle) => {
      if (!circle) return;

      const blink = () => {
        circle.style.opacity = "0.15";
        circle.setAttribute("r", "2.2");

        timeouts.push(
          setTimeout(() => {
            circle.style.opacity = "1";
            circle.setAttribute("r", "4.5");

            timeouts.push(setTimeout(() => circle.setAttribute("r", "3"), 500));
          }, 450 + Math.random() * 300)
        );

        timeouts.push(setTimeout(blink, 1800 + Math.random() * 3200));
      };

      timeouts.push(setTimeout(blink, Math.random() * 2500));
    });

    return () => timeouts.forEach((t) => clearTimeout(t));
  }, []);

  const handleSelect = (
    university: (typeof universities)[number],
    event: React.MouseEvent<SVGGElement>
  ) => {
    setActive(university.name);
    if (university.image) {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }

      const rect = event.currentTarget.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      setPopupAnchor({
        left: x,
        top: y,
      });
      setPopupImage(university.image);
      setIsPopupClosing(false);
    }
  };

  const closePopup = () => {
    setIsPopupClosing(true);
    closeTimeoutRef.current = setTimeout(() => {
      setPopupImage(null);
      setPopupAnchor(null);
      setIsPopupClosing(false);
    }, POPUP_CLOSE_DURATION);
  };

  return (
    <section
      data-header-theme="light"
      className={`${styles.section} snap-section`}
    >
      <div className={styles.mapArea}>
        <Image
          src="/images/mappamondo.svg"
          alt="University network map"
          fill
          className={styles.mapImage}
          priority
        />

        <svg
          className={styles.network}
          viewBox="0 0 600 400"
          preserveAspectRatio="xMidYMid meet"
        >
          {universities.map((university, index) => {
            const isActive = active === university.name;

            return (
              <g
                key={university.name}
                className={styles.pointGroup}
                onClick={(event) => handleSelect(university, event)}
              >
                <circle
                  ref={(el) => {
                    circleRefs.current[index] = el;
                  }}
                  cx={university.cx}
                  cy={university.cy}
                  r={3}
                  className={`${styles.point} ${
                    isActive ? styles.activePoint : ""
                  }`}
                />
              </g>
            );
          })}
        </svg>
      </div>

      {popupImage &&
        popupAnchor &&
        createPortal(
          <div className={styles.popupOverlay} onClick={closePopup}>
            <div
              className={styles.popupContent}
              style={{
                left: popupAnchor.left,
                top: popupAnchor.top,
                transform: "translate(-50%, -50%)",
              }}
              onClick={(event) => event.stopPropagation()}
            >
              <div
                className={`${styles.popupInner} ${
                  isPopupClosing ? styles.popupInnerClosing : ""
                }`}
              >
                <button
                  type="button"
                  className={styles.popupClose}
                  onClick={closePopup}
                  aria-label="Close"
                >
                  ×
                </button>
                <img
                  src={popupImage}
                  alt="University map detail"
                  className={styles.popupImage}
                />
              </div>
            </div>
          </div>,
          document.body
        )}
    </section>
  );
}