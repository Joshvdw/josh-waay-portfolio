/* @jsxImportSource react */
"use client";

import { useState, useEffect, useRef } from "react";
import "../styles/HeroFlipText.css";

const HeroFlipText = ({ msgUnity }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const elRef = useRef(null);

  useEffect(() => {
    next();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => next(), 2500);
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

  const handleStartClick = () => {
    msgUnity("StartExperience");
  };

  return (
    <div ref={elRef}>
      <h1>
        <span id="flipper" className="flip">
          <span className="step set">Frontend</span>
          <span className="step">Creative</span>
          <span className="step">Frontend</span>
          <span className="step">Creative</span>
        </span>
      </h1>
      <h1>Web Developer</h1>
      {/* <p>
        Crafting visually captivating and intuitive web experiences with
        creativity, innovation, and a dedication to pixel perfect finesse.
      </p> */}
      <div onClick={handleStartClick}>
        <button>Start</button>
      </div>
    </div>
  );
};

export default HeroFlipText;
