import Nav from "./Nav";
import Logo from "./UI/Logo";
import Socials from "./UI/Socials";
import { useSlideIn } from "@/hooks/useSpring";
import { useContext } from "react";
import SceneContext from "@/hooks/sceneContext";
import { animated } from "@react-spring/web";

const Menu = () => {
  const { sceneState } = useContext(SceneContext);

  const slideIn = useSlideIn(sceneState, 1000);

  return (
    <animated.div className="side-menu__wrapper" style={slideIn}>
      <Logo />
      <Nav />
      <Socials />
    </animated.div>
  );
};

export default Menu;
