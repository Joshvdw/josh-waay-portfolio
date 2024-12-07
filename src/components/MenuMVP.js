import Logo from "./UI/svgs/Logo";
import { useSlideInTop } from "@/hooks/useSpring";
import { useContext } from "react";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { animated } from "@react-spring/web";

const Menu = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const slideIn = useSlideInTop(sceneState, 100);

  // reset to hero
  const handleClick = () => {
    updateScene("hero");
    msgUnity("SetHeroScene");
  };

  return (
    <animated.div className="side-menu__wrapper" style={slideIn}>
      <div onClick={handleClick} className="pointer">
        <Logo isPreloader={false} />
      </div>
    </animated.div>
  );
};

export default Menu;
