import SocialSVG from "./svgs/SocialSVG";
import { socialLinks } from "@/data/personalData";
import { animated } from "@react-spring/web";
import { useSlideInTop } from "@/hooks/useSpring";
import { useContext } from "react";
import SceneContext from "@/hooks/sceneContext";

const Socials = () => {
  const { sceneState, updateScene } = useContext(SceneContext);

  const slideIn = useSlideInTop(sceneState, 100);
  return (
    <animated.div className="socials-wrapper" style={slideIn}>
      <SocialSVG icon="mail" link={socialLinks.mail} />
      <SocialSVG icon="linkedin" link={socialLinks.linkedin} />
      <SocialSVG icon="github" link={socialLinks.github} />
    </animated.div>
  );
};

export default Socials;
