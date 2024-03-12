/* @jsxImportSource react */
"use client";

import { useState, useEffect, useRef } from "react";
import "../styles/HeroFlipText.css";

const HeroFlipText = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const elRef = useRef(null);

  useEffect(() => {
    next();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => next(), 3000);
    return () => clearInterval(interval);
  });

  const next = () => {
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
  };

  return (
    <div ref={elRef}>
      <h1>
        <span id="flipper" className="flip">
          <span className="step step0 set">Frontend</span>
          <span className="step step1">Creative</span>
          <span className="step step2">Full-stack</span>
        </span>
      </h1>
      <h1>Web Developer</h1>
    </div>
  );
};

export default HeroFlipText;
