import ProgressBar from "../UI/ProgressBar";
import WorkTimeline from "../UI/WorkTimeline";
import WorkContent from "./WorkContent";
import WorkControls from "../UI/WorkControls";
import { useProjectVideoControls } from "@/hooks/videoControlsHook";
import { useEffect, useMemo } from "react";

const Work = () => {
  const {
    progressBarRef,
    animateProgress,
    progress,
    transition,
    pauseProjects,
    resumeProjects,
    handleNavigation,
    counter,
  } = useProjectVideoControls();

  const progressBarProps = useMemo(
    () => ({
      progressBarRef,
      progress,
      transition,
    }),
    [progressBarRef, progress, transition]
  );

  const workControlsProps = useMemo(
    () => ({
      pauseProjects,
      resumeProjects,
      handleNavigation,
    }),
    [pauseProjects, resumeProjects, handleNavigation]
  );

  useEffect(() => {
    // start progressbar animation on render
    animateProgress();
  }, []);

  return (
    <div>
      <WorkContent counter={counter} />
      <ProgressBar {...progressBarProps} />
      <WorkControls {...workControlsProps} />
      <WorkTimeline counter={counter} />
    </div>
  );
};

export default Work;
