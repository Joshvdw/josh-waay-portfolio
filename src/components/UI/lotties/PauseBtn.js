import { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { muteToggle, playSound } from "@/utils/sound";

const PauseBtn = ({ resumeProjects, pauseProjects, handleClick }) => {
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const pauseBtn = useRef(null);
  const container = useRef(null);
  const animationRef = useRef(null);

  const enterFrame = 0;
  const holdFrame = 30;
  const endFrame = 59;

  useEffect(() => {
    if (!container.current) return;

    animationRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lotties/play-pause_lottie.json",
    });
    animationRef.current.goToAndStop(holdFrame, true);
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  const handlePause = () => {
    playSound("clickSound");
    muteToggle();
    animationRef.current.setSpeed(1.5);
    if (paused) {
      resumeProjects();
      setPaused(false);
      animationRef.current.playSegments([enterFrame, holdFrame], true);
    } else {
      pauseProjects();
      setPaused(true);
      animationRef.current.playSegments([holdFrame, endFrame], true);
    }
  };

  // PAUSE ON SPACE BAR PRESS
  const handleSpacebar = (event) => {
    if (event.code === "Space") {
      pauseBtn.current.click();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleSpacebar);
    return () => {
      document.removeEventListener("keydown", handleSpacebar);
    };
  }, []);

  const handleHover = () => {
    playSound("hoverOutSound");
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    // playSound("hoverOutSound");
    setIsHovered(false);
  };

  return (
    <div
      className="control-btn pause-btn"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onClick={() => handleClick(handlePause)}
      ref={pauseBtn}
    >
      <div className="skip-lottie pause-lottie" ref={container}></div>
      <p>{paused ? "Play" : "Pause"}</p>
    </div>
  );
};

export default PauseBtn;
