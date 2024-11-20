import SceneContext from "@/hooks/sceneContext";
import { useState, useContext } from "react";
import WorkTimeline from "../UI/WorkTimeline";
import SkipBtn from "./lotties/SkipBtn";

const WorkControls = ({
  pauseProjects,
  resumeProjects,
  handleNavigation,
  counter,
}) => {
  const [paused, setPaused] = useState(false);
  const { sceneState } = useContext(SceneContext);
  const handlePauseResume = () => {
    if (paused) {
      resumeProjects();
      setPaused(false);
    } else {
      pauseProjects();
      setPaused(true);
    }
  };

  return (
    <>
      <div className="work-body__left">
        <div className="controls-bg"> </div>
        <div className="controls-wrapper">
          <div className="controls-inner">
            <div
              className="arrow-btn prev-btn"
              onClick={() => handleNavigation("Previous")}
            >
              <div className="btn-bg"></div>
              <img src="/svg/chevron.svg" alt="" />
              <p>Prev</p>
            </div>
            <div className="arrow-btn pause-btn" onClick={handlePauseResume}>
              <div className="btn-bg"></div>
              <img src="/svg/pause.svg" alt="" />
              <p>{paused ? "Play" : "Pause"}</p>
            </div>
            <div
              className="arrow-btn next-btn"
              onClick={() => handleNavigation("Next")}
            >
              <div className="btn-bg"></div>
              {/* <img src="/svg/chevron.svg" alt="" /> */}
              <SkipBtn />
              <p>Next</p>
            </div>
          </div>
          <WorkTimeline counter={counter} />
        </div>
      </div>
    </>
  );
};

export default WorkControls;
