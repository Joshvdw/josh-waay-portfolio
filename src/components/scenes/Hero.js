import HeroFlipText from "../UI/HeroFlipText";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { useFadeIn, useSlideIn } from "@/hooks/useSpring";
import { heroText } from "@/data/personalData";

const Hero = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const handleStartClick = () => {
    updateScene("work");
    msgUnity("StartExperience");
  };

  const fadeIn = useFadeIn(sceneState);
  const slideIn1 = useSlideIn(sceneState, 10);
  const slideIn2 = useSlideIn(sceneState, 20);
  const slideIn3 = useSlideIn(sceneState, 30);

  return (
    <animated.div className="hero" style={fadeIn}>
      <div className="hero__wrapper">
        <animated.div style={slideIn1}>
          <HeroFlipText />
        </animated.div>
        <animated.p
          className="hero__paragraph optimise-font"
          style={slideIn2}
        >
          {heroText.paragraph}
        </animated.p>
        <animated.div style={slideIn3}>
          <div className="hero__cta--wrapper">
            <span class="right-slanted" onClick={handleStartClick}>
              <div class="hero__cta optimise-font">
                <p>Start</p>
              </div>
            </span>
          </div>
        </animated.div>
      </div>
    </animated.div>
  );
};

export default Hero;
