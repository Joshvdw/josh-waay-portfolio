import { useEffect, useRef } from "react";
import lottie from "lottie-web";

const SwipeDown = ({}) => {
  const container = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    animation.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "/lotties/swipe-down_lottie.json",
    });
    // animation.current.goToAndStop(0, true);

    return () => {
      animation.current.destroy();
    };
  }, []);

  // useImperativeHandle(ref, () => ({
  //   play: () => {
  //     if (animation.current) {
  //       animation.current.setSpeed(1.5);
  //       animation.current.goToAndPlay(0, true);
  //     }
  //   },
  // }));

  return <div className="swipe-down__lottie" ref={container}></div>;
};

// HeroStar.displayName = "HeroStar";

export default SwipeDown;
