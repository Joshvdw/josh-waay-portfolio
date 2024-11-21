import SceneContext from "@/hooks/sceneContext";
import { useState, useContext } from "react";
import WorkTimeline from "../UI/WorkTimeline";
import SkipBtn from "./lotties/SkipBtn";
import PauseBtn from "./lotties/PauseBtn";

const WorkControls = ({
  pauseProjects,
  resumeProjects,
  handleNavigation,
  counter,
}) => {
  return (
    <>
      <div className="work-body__left">
        <div className="controls-bg"> </div>
        <div className="controls-wrapper">
          <div className="controls-inner">
            <SkipBtn handleNavigation={handleNavigation} isNext={false} />
            <PauseBtn
              resumeProjects={resumeProjects}
              pauseProjects={pauseProjects}
            />
            <SkipBtn handleNavigation={handleNavigation} isNext={true} />
          </div>
          <WorkTimeline counter={counter} />
        </div>
      </div>
    </>
  );
};

export default WorkControls;
