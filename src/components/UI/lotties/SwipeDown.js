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

    return () => {
      animation.current.destroy();
    };
  }, []);

  return <div className="swipe-down__lottie" ref={container}></div>;
};

export default SwipeDown;
