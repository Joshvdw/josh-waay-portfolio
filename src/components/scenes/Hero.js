import HeroFlipText from "../UI/HeroFlipText";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";
import { useContext, useCallback } from "react";
import { useFadeIn, useSlideIn } from "@/hooks/useSpring";
import { heroText } from "@/data/personalData";
import { playSound } from "@/utils/sound";
import { useDebouncedScrollClickSimulate } from "@/hooks/utilityHooks";

const Hero = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const handleStartClick = () => {
    updateScene("work");
    msgUnity("StartExperience");
    playSound("bgMusic");
  };

  const debouncedHandleScroll =
    useDebouncedScrollClickSimulate(handleStartClick);

  const fadeIn = useFadeIn(sceneState, false);
  const slideIn1 = useSlideIn(sceneState, 10);
  const slideIn2 = useSlideIn(sceneState, 20);
  const slideIn3 = useSlideIn(sceneState, 30);

  return (
    <animated.div
      className="hero"
      style={fadeIn}
      onTouchMove={debouncedHandleScroll}
      onWheel={debouncedHandleScroll}
    >
      <div className="hero__wrapper">
        <animated.div style={slideIn1}>
          <HeroFlipText />
        </animated.div>
        <animated.p className="hero__paragraph optimise-font" style={slideIn2}>
          {heroText.paragraph}
        </animated.p>
        <animated.div style={slideIn3}>
          <div className="hero__cta--wrapper">
            <span className="right-slanted" onClick={handleStartClick}>
              <div className="hero__cta optimise-font">
                <p>View Portfolio</p>
              </div>
            </span>
          </div>
        </animated.div>
      </div>
    </animated.div>
  );
};

export default Hero;
