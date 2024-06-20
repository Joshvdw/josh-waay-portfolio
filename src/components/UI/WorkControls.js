import UnityContext from "@/hooks/unityContext";
import { useContext } from "react";

const WorkControls = () => {
  const { msgUnity } = useContext(UnityContext);

  const handleClick = (msg) => {
    msgUnity("VideoController", msg);
  };
  return (
    <div>
      <div onClick={() => handleClick("NextVideo")}>
        <button>Next</button>
      </div>
      <div onClick={() => handleClick("PreviousVideo")}>
        <button>Previous</button>
      </div>
      <div onClick={() => handleClick("PauseVideo")}>
        <button>Pause</button>
      </div>
      <div onClick={() => handleClick("PlayVideo")}>
        <button>Play</button>
      </div>
    </div>
  );
};

export default WorkControls;
