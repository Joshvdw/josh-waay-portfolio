import { useEffect, useState, useRef } from "react";
import { isTouchDevice } from "@/utils/utilityFunctions";
import { animated } from "@react-spring/web";
import { useBtnSlide, useBtnFade } from "@/hooks/useSpring";
import lottie from "lottie-web";

const SkipBtn = ({ handleNavigation, isNext }) => {
  const [isHovered, setIsHovered] = useState(false);

  const slide = useBtnSlide(isHovered, isNext);
  const fade = useBtnFade(isHovered);

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

  const handleClick = () => {
    handleNavigation(isNext ? "Next" : "Previous");
    animationRef.current.setSpeed(2);
    animationRef.current.playSegments([enterFrame, endFrame], true);
  };

  return (
    <div
      className="control-btn"
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick()}
    >
      <animated.div className="btn-bg" style={fade}></animated.div>
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
