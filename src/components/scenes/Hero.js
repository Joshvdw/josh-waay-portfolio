import HeroFlipText from "../UI/HeroFlipText";
import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/UnityContext";
import { useContext } from "react";

const Hero = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const handleStartClick = () => {
    updateScene("work");
    msgUnity("StartExperience");
  };

  return (
    <div>
      <HeroFlipText />
      {/* <p>
        Crafting visually captivating and intuitive web experiences with
        creativity, innovation, and a dedication to pixel perfect finesse.
      </p> */}
      <div onClick={handleStartClick}>
        <button>Start</button>
      </div>
    </div>
  );
};

export default Hero;
