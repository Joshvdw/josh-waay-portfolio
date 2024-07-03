import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const SelectorBtn = ({ isHovered, isActive }) => {
  const container = useRef(null);
  const animation = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    animation.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: false,
      path: "/lotties/selector_bounce.json",
    });

    animation.current.setSpeed(1.5);

    return () => {
      animation.current.destroy();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  useEffect(() => {
    const anim = animation.current;
    if (anim) {
      if (isHovered && !isActive) {
        anim.goToAndStop(0, true);
        anim.pause();
      } else {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          anim.setSpeed(1.5);
          anim.play();
        }, 500);
      }
    }
    return () => clearTimeout(timeoutRef.current);
  }, [isHovered, isActive]);

  return (
    <div
      style={isHovered && !isActive ? { opacity: "0.6" } : { opacity: "1" }}
      className="selector-btn"
      ref={container}
    ></div>
  );
};

export default SelectorBtn;
