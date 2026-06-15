"use client";

import { ReactNode, useEffect, useRef } from "react";

type LogoStep = 1 | 2 | 3;

type IntroSnapProps = {
  children: ReactNode;
  logoStep: LogoStep;
  setLogoStep: (step: LogoStep) => void;
};

export default function IntroSnap({
  children,
  logoStep,
  setLogoStep,
}: IntroSnapProps) {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const isAnimatingRef = useRef(false);
  const logoStepRef = useRef<LogoStep>(logoStep);

  useEffect(() => {
    logoStepRef.current = logoStep;
  }, [logoStep]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const introSections = Array.from(
      wrapper.querySelectorAll("section")
    ) as HTMLElement[];

    const logoSection = document.querySelector(
      ".sl-scroll-section"
    ) as HTMLElement | null;

    const commitmentsSection =
      logoSection?.nextElementSibling as HTMLElement | null;

    const sloganSection = document.querySelector(
      ".payoff-section"
    ) as HTMLElement | null;

    const footer = document.querySelector("footer") as HTMLElement | null;

    if (introSections.length < 2 || !logoSection) return;

    const getTop = (el: HTMLElement) =>
      el.getBoundingClientRect().top + window.scrollY;

    const getBottom = (el: HTMLElement) => getTop(el) + el.offsetHeight;

    const animateTo = (targetTop: number) => {
      isAnimatingRef.current = true;

      const startTop = window.scrollY;
      const distance = targetTop - startTop;
      const duration = 950;
      const startTime = performance.now();

      const easeOutExpo = (t: number) =>
        t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

      const animate = (time: number) => {
        const progress = Math.min((time - startTime) / duration, 1);
        const eased = easeOutExpo(progress);

        window.scrollTo(0, startTop + distance * eased);

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          window.scrollTo(0, targetTop);

          window.setTimeout(() => {
            isAnimatingRef.current = false;
          }, 120);
        }
      };

      requestAnimationFrame(animate);
    };

    const lockStep = () => {
      isAnimatingRef.current = true;

      window.setTimeout(() => {
        isAnimatingRef.current = false;
      }, 720);
    };

    const getClosestIntroIndex = () => {
      const scrollY = window.scrollY;

      return introSections.reduce((closest, section, index) => {
        const currentDistance = Math.abs(scrollY - getTop(section));
        const closestDistance = Math.abs(
          scrollY - getTop(introSections[closest])
        );

        return currentDistance < closestDistance ? index : closest;
      }, 0);
    };

    const onWheel = (event: WheelEvent) => {
      const direction = Math.sign(event.deltaY);
      if (direction === 0) return;

      if (isAnimatingRef.current) {
        event.preventDefault();
        return;
      }

      const scrollY = window.scrollY;

      const firstIntro = introSections[0];
      const lastIntro = introSections[introSections.length - 1];

      const firstIntroTop = getTop(firstIntro);
      const lastIntroTop = getTop(lastIntro);
      const lastIntroBottom = getBottom(lastIntro);

      const logoTop = getTop(logoSection);
      const logoBottom = getBottom(logoSection);

      const commitmentsTop = commitmentsSection
        ? getTop(commitmentsSection)
        : 0;

      const commitmentsBottom = commitmentsSection
        ? commitmentsTop + commitmentsSection.offsetHeight
        : 0;

      const sloganTop = sloganSection ? getTop(sloganSection) : 0;
      const sloganBottom = sloganSection ? getBottom(sloganSection) : 0;
      const sloganEndScroll = sloganBottom - window.innerHeight;

      const footerTop = footer ? getTop(footer) : 0;

      const isInsideIntro =
        scrollY >= firstIntroTop - 4 && scrollY < lastIntroBottom - 4;

      const isNearLastIntro =
        Math.abs(scrollY - lastIntroTop) < window.innerHeight * 0.55;

      const isLogoActive =
        scrollY >= logoTop - 12 && scrollY < logoBottom - 12;

      const isInsideCommitments =
        commitmentsSection &&
        scrollY >= commitmentsTop - 8 &&
        scrollY < commitmentsBottom - window.innerHeight * 0.25;

      const isNearSloganTop =
        sloganSection &&
        scrollY >= sloganTop - 8 &&
        scrollY <= sloganTop + window.innerHeight * 0.25;

      const isInsideSlogan =
        sloganSection &&
        scrollY >= sloganTop - 8 &&
        scrollY < sloganEndScroll - 8;

      const isNearSloganBottom =
        sloganSection &&
        scrollY >= sloganEndScroll - 8 &&
        scrollY <= sloganEndScroll + window.innerHeight * 0.25;

      const isNearFooterTop =
        footer &&
        scrollY >= footerTop - 8 &&
        scrollY <= footerTop + window.innerHeight * 0.4;

      /*
        1. HERO / ABOUT / KPI
      */
      if (isInsideIntro || isNearLastIntro) {
        const currentIndex = getClosestIntroIndex();
        const isFirst = currentIndex === 0;
        const isLast = currentIndex === introSections.length - 1;

        if (isFirst && direction < 0) return;

        if (isLast && direction > 0) {
          event.preventDefault();

          logoStepRef.current = 1;
          setLogoStep(1);

          animateTo(logoTop);
          return;
        }

        const targetIndex = direction > 0 ? currentIndex + 1 : currentIndex - 1;
        const target = introSections[targetIndex];

        if (!target) return;

        event.preventDefault();
        animateTo(getTop(target));
        return;
      }

      /*
        2. SEZIONE LOGO
      */
      if (isLogoActive) {
        const currentStep = logoStepRef.current;

        if (direction > 0) {
          if (currentStep < 3) {
            event.preventDefault();

            const nextStep = (currentStep + 1) as LogoStep;
            logoStepRef.current = nextStep;
            setLogoStep(nextStep);

            lockStep();
            return;
          }

          if (commitmentsSection) {
            event.preventDefault();
            animateTo(commitmentsTop);
            return;
          }
        }

        if (direction < 0) {
          if (currentStep > 1) {
            event.preventDefault();

            const previousStep = (currentStep - 1) as LogoStep;
            logoStepRef.current = previousStep;
            setLogoStep(previousStep);

            lockStep();
            return;
          }

          event.preventDefault();
          animateTo(lastIntroTop);
          return;
        }
      }

      /*
        3. COMMITMENTS
        Giù: snap verso Slogan
        Su: snap verso SezioneLogo step 3
      */
      if (isInsideCommitments) {
        if (direction > 0 && sloganSection) {
          event.preventDefault();
          animateTo(sloganTop);
          return;
        }

        if (direction < 0) {
          event.preventDefault();

          logoStepRef.current = 3;
          setLogoStep(3);

          animateTo(logoTop);
          return;
        }
      }

      /*
        4. TOP SLOGAN
        Su: snap verso Commitments
        Giù: scroll normale interno
      */
      if (isNearSloganTop && direction < 0 && commitmentsSection) {
        event.preventDefault();
        animateTo(commitmentsTop);
        return;
      }

      /*
        5. DENTRO SLOGAN
        Scroll libero per animare il testo
      */
      if (isInsideSlogan) return;

      /*
        6. BOTTOM SLOGAN
        Giù: snap verso Footer
      */
      if (isNearSloganBottom && direction > 0 && footer) {
        event.preventDefault();
        animateTo(footerTop);
        return;
      }

      /*
        7. FOOTER
        Su: snap verso fondo Slogan
      */
      if (isNearFooterTop && direction < 0 && sloganSection) {
        event.preventDefault();
        animateTo(sloganEndScroll);
        return;
      }
    };

    window.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, [setLogoStep]);

  return (
    <div ref={wrapperRef} className="intro-snap">
      {children}
    </div>
  );
}