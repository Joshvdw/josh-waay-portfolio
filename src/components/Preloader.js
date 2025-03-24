import {
  useFadeIn,
  usePreloaderFadeOut,
  // useGrowIn,
  // useGrowOut,
} from "@/hooks/useSpring";
import Logo from "./UI/svgs/LogoSVG";
import { useEffect, useState, useRef } from "react";
import { animated } from "@react-spring/web";
import lottie from "lottie-web";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

const Preloader = ({ isLoading }) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);

  const isSmallScreen = useIsSmallScreen();

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

  const fadeIn = useFadeIn(animationLoaded, false);
  const fadeOut = usePreloaderFadeOut(isLoading);
  // const growIn = useGrowIn(animationLoaded);
  // const growOut = useGrowOut(isLoading);

  return (
    <animated.div className="preloader-wrapper" style={fadeOut}>
      <animated.div className="preloader_lottie--wrapper" style={fadeIn}>
        <div
          ref={container}
          className="lottie-container preloader_lottie"
        ></div>
        {animationLoaded && <Logo isPreloader={true} />}
        {/* SMALL SCREEN NOTICE OPTION BELOW */}
        {/* {isSmallScreen && (
          <div className="mobile-notice__wrapper">
            <p className="mobile-notice">
              This website is best viewed on a larger screen
            </p>
          </div>
        )} */}
        {/* <animated.div style={growOut} className="preloader-gradient__wrapper">
          <animated.div style={growIn} className="preloader-gradient" />
        </animated.div> */}
      </animated.div>
    </animated.div>
  );
};

export default Preloader;
