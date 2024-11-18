import { useState, useEffect, useContext, useRef, useCallback } from "react";
import { projectChangeTime } from "@/data/globalVariables";
import UnityContext from "@/hooks/unityContext";
import { workData } from "@/data/workData";

let pause = false; // variable set outside to persist value on hook call

export const useProjectVideoControls = () => {
  const [currentScaleX, setCurrentScaleX] = useState(1);
  const [progress, setProgress] = useState(0);
  const [hasResumed, setHasResumed] = useState(false);
  const [transition, setTransition] = useState(true);
  const [counter, setCounter] = useState(0);

  const progressBarRef = useRef(null);
  const timerRef = useRef(null);

  const progressBar = progressBarRef.current;
  const { msgUnity } = useContext(UnityContext);

  const animateProgress = useCallback(() => {
    if (!pause) {
      clearTimeout(timerRef.current);
      setProgress(1);
      setTransition(true);
      timerRef.current = setTimeout(() => {
        if (!pause) {
          navTo("Next");
        }
      }, projectChangeTime);
    }
  }, []);

  const resetProgressBar = () => {
    setProgress(0);
    setTransition(false);
  };

  const navTo = (direction) => {
    msgUnity("VideoController", `${direction}Video`);
    resetProgressBar();
    counterLogic(direction);
    setTimeout(() => {
      animateProgress();
    }, 20);
  };

  const pauseProjects = () => {
    setHasResumed(false);
    msgUnity("VideoController", "PauseVideo");
    clearTimeout(timerRef.current);
    pause = true;
    const computedStyle = window.getComputedStyle(progressBar);
    const scaleX = computedStyle.transform
      .split("(")[1]
      .split(")")[0]
      .split(",")[0];
    setCurrentScaleX(scaleX);
    progressBar.style.transform = `scaleX(${scaleX})`;
    progressBar.style.transition = "none";
  };

  const resumeProjects = () => {
    setHasResumed(true);
    msgUnity("VideoController", "PlayVideo");
    progressBar.style.transform = `scaleX(1)`;
    const remainingTime = (1 - currentScaleX) * projectChangeTime;
    clearTimeout(timerRef.current);
    progressBar.style.transition = `transform ${remainingTime / 1000}s linear`;
    const computedStyle = window.getComputedStyle(progressBar);
    const scaleX = computedStyle.transform
      .split("(")[1]
      .split(")")[0]
      .split(",")[0];
    if (scaleX == 0) {
      pause = false;
      animateProgress();
    } else {
      timerRef.current = setTimeout(() => {
        pause = false;
        navTo("Next");
      }, remainingTime);
    }
  };

  const counterLogic = (direction) => {
    if (direction === "Next") {
      setCounter((prevCounter) =>
        prevCounter + 1 === workData.length ? 0 : prevCounter + 1
      );
    } else {
      setCounter((prevCounter) =>
        prevCounter === 0 ? workData.length - 1 : prevCounter - 1
      );
    }
  };

  const handleNavigation = (direction) => {
    if (hasResumed) {
      pause = false;
      setHasResumed(false);
    }
    clearTimeout(timerRef.current);
    setCurrentScaleX(0);
    navTo(direction);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  return {
    progressBarRef,
    animateProgress,
    progress,
    transition,
    pauseProjects,
    resumeProjects,
    handleNavigation,
    counter,
  };
};
