import SceneContext from "@/hooks/sceneContext";
import { useContext } from "react";
import { animated } from "@react-spring/web";
import { useSlideIn } from "@/hooks/useSpring";
import PauseBtn from "../lotties/PauseBtn";

const WorkControls = ({ pauseProjects, resumeProjects, handleNavigation }) => {
  const { sceneState } = useContext(SceneContext);

  const slideIn = useSlideIn(sceneState, -500);

  return (
    <animated.div className="work-controls__wrapper" style={slideIn}>
      <div className="work-controls">
        {/* <div onClick={() => handleNavigation("Next")}>
          <button>Next</button>
        </div>
        <PauseBtn />
        <div onClick={pauseProjects}>
          <button>Pause</button>
        </div>
        <div onClick={resumeProjects}>
          <button>Play</button>
        </div>
        <div onClick={() => handleNavigation("Previous")}>
          <button>Previous</button>
        </div> */}
      </div>
    </animated.div>
  );
};

export default WorkControls;
