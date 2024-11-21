import { useEffect, useState, useRef } from "react";
import { isTouchDevice } from "@/utils/utilityFunctions";
import { animated } from "@react-spring/web";
import { useBtnSlide, useBtnFade } from "@/hooks/useSpring";
import lottie from "lottie-web";

const PauseBtn = ({ resumeProjects, pauseProjects }) => {
  const [paused, setPaused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const slide = useBtnSlide(isHovered);
  const fade = useBtnFade(isHovered);

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

  const handleClick = () => {
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

  return (
    <div
      className="control-btn pause-btn"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick()}
    >
      <animated.div className="btn-bg" style={fade}></animated.div>
      <animated.div>
        <div className="skip-lottie pause-lottie" ref={container}></div>
      </animated.div>
      <p>{paused ? "Play" : "Pause"}</p>
    </div>
  );
};

export default PauseBtn;
