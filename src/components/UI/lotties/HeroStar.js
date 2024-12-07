import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import lottie from "lottie-web";

const HeroStar = forwardRef((props, ref) => {
  const container = useRef(null);
  const animation = useRef(null);

  useEffect(() => {
    animation.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lotties/hero_star.json",
    });
    animation.current.goToAndStop(0, true);

    return () => {
      animation.current.destroy();
    };
  }, []);

  useImperativeHandle(ref, () => ({
    play: () => {
      if (animation.current) {
        animation.current.setSpeed(1.5);
        animation.current.goToAndPlay(0, true);
      }
    },
  }));

  return <div className="heroStar_inner" ref={container}></div>;
});

HeroStar.displayName = "HeroStar";

export default HeroStar;
