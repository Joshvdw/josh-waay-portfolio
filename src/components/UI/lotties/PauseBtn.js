import { useEffect, useState, useRef } from "react";
import { useClickPrevention } from "@/hooks/utilityHooks";
import { animated } from "@react-spring/web";
import { useBtnSlide, useBtnFade } from "@/hooks/useSpring";
import lottie from "lottie-web";
import { muteAllSounds, muteToggle, unMuteAllSounds } from "@/utils/sound";

const PauseBtn = ({ resumeProjects, pauseProjects }) => {
  const [isDisabled, handleClick] = useClickPrevention(250);

  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const slide = useBtnSlide(isHovered);
  const fade = useBtnFade(isHovered);

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

  return (
    <div
      className="control-btn pause-btn"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(handlePause)}
      ref={pauseBtn}
    >
      {/* <animated.div className="btn-bg"></animated.div> */}
      <animated.div style={slide}>
        <div className="skip-lottie pause-lottie" ref={container}></div>
      </animated.div>
      <p>{paused ? "Play" : "Pause"}</p>
    </div>
  );
};

export default PauseBtn;
