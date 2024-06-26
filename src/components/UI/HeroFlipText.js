/* @jsxImportSource react */
"use client";

import { useState, useEffect, useRef } from "react";
import "@/styles/HeroFlipText.css";
import HeroStar from "./lotties/HeroStar";

const HeroFlipText = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [initialRender, setInitialRender] = useState(true);

  const elRef = useRef(null);
  const heroStarRef = useRef(null);

  useEffect(() => {
    next();
    setTimeout(() => {
      document.documentElement.style.setProperty("--delay", "5s");
    }, 2000); // change to 1000 for short version
  }, []);

  useEffect(() => {
    const interval = setInterval(() => next(), 3000);
    return () => clearInterval(interval);
  }, [currentStep]);

  const next = () => {
    // Trigger the Lottie animation
    if (heroStarRef.current) {
      if (!initialRender) heroStarRef.current.play();
      setInitialRender(false);
    }

    // Trigger hero flip
    setTimeout(() => {
      if (elRef != null) {
        const steps = elRef.current.querySelectorAll(".step");
        const totalSteps = steps.length;
        let nextStepNum = (currentStep + 1) % totalSteps;

        steps.forEach((step) => {
          step.classList.remove("set", "down");
        });

        if (currentStep >= 0) {
          const prevStepIndex = (currentStep - 1 + totalSteps) % totalSteps;
          steps[prevStepIndex].classList.add("down");
        }

        steps[currentStep].classList.add("set");
        setCurrentStep(nextStepNum);
      }
    }, 500);
  };

  return (
    <div ref={elRef}>
      <h1>
        <span id="flipper" className="flip">
          <span className="step set">Frontend</span>
          <span className="step">Creative</span>
          <span className="step">Fullstack</span>
        </span>
      </h1>
      <div className="heroStar__wrapper">
        <HeroStar ref={heroStarRef} />
        <h1>Developer</h1>
      </div>
    </div>
  );
};

export default HeroFlipText;
