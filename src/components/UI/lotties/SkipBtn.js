import { useEffect, useState, useRef } from "react";
import { animated } from "@react-spring/web";
import { useBtnSlide } from "@/hooks/useSpring";
import lottie from "lottie-web";

const SkipBtn = ({
  handleNavigation,
  isNext,
  handleClick,
  interval
}) => {
  const [isHovered, setIsHovered] = useState(false);

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

  return (
    <div
      className="control-btn"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
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
