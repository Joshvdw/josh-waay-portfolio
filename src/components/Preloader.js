import { useFadeIn, usePreloaderFadeOut } from "@/hooks/useSpring";
import Logo from "./UI/Logo";
import { useEffect, useState, useRef } from "react";
import { animated } from "@react-spring/web";
import lottie from "lottie-web";

const Preloader = ({ isLoading }) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  const container = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    animation.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lotties/preloader_star.json",
    });

    animation.current.addEventListener("DOMLoaded", () => {
      setAnimationLoaded(true);
    });

    return () => {
      animation.current.destroy();
    };
  }, []);

  const fadeIn = useFadeIn(animationLoaded);
  const fadeOut = usePreloaderFadeOut(isLoading);

  return (
    <animated.div className="preloader-wrapper" style={fadeOut}>
      <animated.div className="preloader_lottie--wrapper" style={fadeIn}>
        <div
          ref={container}
          className="lottie-container preloader_lottie"
        ></div>
        {animationLoaded && <Logo />}
      </animated.div>
    </animated.div>
  );
};

export default Preloader;
