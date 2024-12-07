import ProgressBar from "../UI/ProgressBar";
import WorkContent from "./WorkContent";
import { useProjectVideoControls } from "@/hooks/videoControlsHook";
import { useEffect, useMemo } from "react";
import { animated } from "@react-spring/web";
import { useFadeIn } from "@/hooks/useSpring";
import { useContext } from "react";
import SceneContext from "@/hooks/sceneContext";

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

  const workProps = useMemo(
    () => ({
      pauseProjects,
      resumeProjects,
      handleNavigation,
      counter,
    }),
    [pauseProjects, resumeProjects, handleNavigation, counter]
  );

  useEffect(() => {
    // start progressbar animation on render
    animateProgress();
  }, []);

  const { sceneState, updateScene } = useContext(SceneContext);
  const fadeIn = useFadeIn(sceneState, true);

  return (
    <animated.div style={fadeIn}>
      <WorkContent {...workProps} />
      <ProgressBar {...progressBarProps} />
    </animated.div>
  );
};

export default Work;
