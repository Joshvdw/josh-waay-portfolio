import Logo from "./UI/svgs/LogoSVG";
import { useSlideInTop, useOpacityShift } from "@/hooks/useSpring";
import { useState, useContext } from "react";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";
import { playSound } from "@/utils/sound";

const Menu = () => {
  const [isHovered, setIsHovered] = useState(false);

  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity, preventSpam, isDisabled } = useContext(UnityContext);

  const slideIn = useSlideInTop(sceneState, 100);
  const opacityShifter = useOpacityShift(isHovered, "gentle", 0.7, 1);

  // reset to hero
  const handleClick = () => {
    //spam prevention
    if (isDisabled) return;
    preventSpam();

    playSound("clickSound2");
    setTimeout(() => {
      playSound("swishSound");
    }, 50);
    updateScene("hero");
    msgUnity("SetHeroScene");
  };

  const handleHover = () => {
    playSound("hoverSound2");
    setIsHovered(true);
  };

  return (
    <animated.div className="side-menu__wrapper" style={slideIn}>
      <animated.div
        onClick={handleClick}
        className="pointer"
        onMouseEnter={handleHover}
        onMouseLeave={() => setIsHovered(false)}
        style={opacityShifter}
      >
        <Logo isPreloader={false} />
      </animated.div>
    </animated.div>
  );
};

export default Menu;
