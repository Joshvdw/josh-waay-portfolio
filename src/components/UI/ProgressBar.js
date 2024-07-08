import { projectChangeTime } from "@/data/globalVariables";

const ProgressBar = ({ progressBarRef, progress, transition }) => {
  return (
    <>
      <div className="progress-bar">
        <div
          className="progress-fill"
          ref={progressBarRef}
          style={{
            transform: `scaleX(${progress})`,
            transition: transition
              ? `transform ${projectChangeTime / 1000}s linear`
              : "none",
          }}
        ></div>
      </div>
    </>
  );
};

export default ProgressBar;
