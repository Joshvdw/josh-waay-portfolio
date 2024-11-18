import Logo from "./UI/Logo";
import Socials from "./UI/Socials";
import SoundBtn from "./UI/lotties/SoundBtn";
import { useSlideIn } from "@/hooks/useSpring";
import { useContext } from "react";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";

const Menu = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const slideIn = useSlideIn(sceneState, 200);

  const handleClick = () => {
    updateScene("hero");
    msgUnity("SetHeroScene");
  };

  return (
    <animated.div className="side-menu__wrapper" style={slideIn}>
      <div onClick={handleClick} className="pointer">
        <Logo />
      </div>
      <Socials />
      <SoundBtn />
    </animated.div>
  );
};

export default Menu;
