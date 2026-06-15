"use client";

import { useState } from "react";

import AboutSection from "./components/Home/About/AboutSection";
import CommitmentsSection from "./components/Home/Commitments/CommitmentsSection";
import Hero from "./components/Home/Hero/Hero";
import Kpi2Section from "./components/Home/KPI2/Kpi2Section";
import Slogan from "./components/Home/slogan/Slogan";
import SezioneLogo from "./components/Home/VerticalSection/SezioneLogo";
import IntroSnap from "./components/IntroSnap/IntroSnap";

export default function Home() {
  const [logoStep, setLogoStep] = useState<1 | 2 | 3>(1);

  return (
    <>
      <IntroSnap logoStep={logoStep} setLogoStep={setLogoStep}>
        <Hero />
        <AboutSection />
        <Kpi2Section />
      </IntroSnap>
      <SezioneLogo activeStep={logoStep} setActiveStep={setLogoStep} />
      <CommitmentsSection />
      <Slogan />
    </>
  );
}