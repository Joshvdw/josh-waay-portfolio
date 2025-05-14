import HeroFlipText from "../UI/HeroFlipText";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";
import { useContext } from "react";
import { useFadeIn, useSlideIn } from "@/hooks/useSpring";
import { heroText } from "@/data/personalData";
import { isMuted, muteToggle, playSound, restartSound } from "@/utils/sound";
import {
  useDebouncedScrollClickSimulate,
  useIsSmallScreen,
} from "@/hooks/utilityHooks";
import { enableGyro, isTouchDevice } from "@/utils/utilityFunctions";

const Hero = () => {
  const runGyroCheck = useIsSmallScreen() && isTouchDevice();
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity, preventSpam, isDisabled } = useContext(UnityContext);

  const handleStartClick = async () => {
    //spam prevention
    if (isDisabled) return;
    preventSpam();
    if (runGyroCheck) await enableGyro(); // enable gyro on ios
    updateScene("work");
    msgUnity("StartExperience");
    if (isMuted() === true) {
      // if wanting sound to always active on start:
      // muteToggle();
      // restartSound("bgMusic");
      // restartSound("enterSound");
    } else {
      playSound("enterSound");
      setTimeout(() => {
        playSound("bgMusic");
      }, 200);
    }
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
        <animated.div
          style={slideIn3}
          onMouseEnter={() => playSound("hoverOutSound")}
          // onClick={() => playSound("clickSound2")}
        >
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
