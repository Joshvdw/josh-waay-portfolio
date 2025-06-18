import { useEffect, useState, useRef, useContext } from "react";
import { animated } from "@react-spring/web";
import { useBtnSlide } from "@/hooks/useSpring";
import lottie from "lottie-web";
import { playSound } from "@/utils/sound";
import UnityContext from "@/hooks/unityContext";

const SkipBtn = ({ handleNavigation, isNext, handleClick, interval }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [hasHoveredOut, setHasHoveredOut] = useState(true);
  const { msgUnity, preventSpam, isDisabled } = useContext(UnityContext);

  const slide = useBtnSlide(isHovered, isNext);

  const skipBtn = useRef(null);
  const container = useRef(null);
  const animationRef = useRef(null);

  const enterFrame = 0;
  const endFrame = 24;

  useEffect(() => {
    if (!container.current) return;

    animationRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lotties/skip_lottie.json",
    });
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  const handleSkip = () => {
    //spam prevention
    if (isDisabled) return;
    preventSpam();

    playSound("clickSound");
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    handleNavigation(isNext ? "Next" : "Previous");
    animationRef.current.setSpeed(2);
    animationRef.current.playSegments([enterFrame, endFrame], true);
  };

  // SKIP ON ARROW KEY PRESS
  const handleKeypress = (event) => {
    switch (event.code) {
      case "ArrowLeft":
        if (!isNext) skipBtn.current.click();
        break;
      case "ArrowRight":
        if (isNext) skipBtn.current.click();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeypress);
    return () => {
      document.removeEventListener("keydown", handleKeypress);
    };
  }, []);

  const handleHover = () => {
    if (hasHoveredOut) playSound("hoverSound");
    setIsHovered(true);
    setHasHoveredOut(false);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
    setHasHoveredOut(true);
  };

  return (
    <div
      className="control-btn"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onClick={() => handleClick(handleSkip)}
      ref={skipBtn}
    >
      <animated.div style={slide}>
        <div
          className={`skip-lottie ${isNext ? "next-lottie" : "prev-lottie"}`}
          ref={container}
        ></div>
      </animated.div>
      <p>{isNext ? "Next" : "Prev"}</p>
    </div>
  );
};

export default SkipBtn;
