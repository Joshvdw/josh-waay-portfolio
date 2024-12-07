import WorkTimeline from "../UI/WorkTimeline";
import SkipBtn from "./lotties/SkipBtn";
import PauseBtn from "./lotties/PauseBtn";

const WorkControls = ({
  pauseProjects,
  resumeProjects,
  handleNavigation,
  counter,
  handleClick,
  interval,
}) => {
  return (
    <>
      <div className="work-body__left">
        <div className="controls-wrapper">
          <div className="controls-inner">
            <SkipBtn
              handleNavigation={handleNavigation}
              isNext={false}
              handleClick={handleClick}
              interval={interval}
            />
            <PauseBtn
              resumeProjects={resumeProjects}
              pauseProjects={pauseProjects}
              handleClick={handleClick}
            />
            <SkipBtn
              handleNavigation={handleNavigation}
              isNext={true}
              handleClick={handleClick}
              interval={interval}
            />
          </div>
          <WorkTimeline counter={counter} />
        </div>
      </div>
    </>
  );
};

export default WorkControls;
