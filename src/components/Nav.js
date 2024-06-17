import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/UnityContext";
import { useContext } from "react";

const Nav = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);

  const handleClick = (navItem) => {
    updateScene(navItem.toLowerCase());
    msgUnity(`Set${navItem}Scene`);
  };

  return (
    <div className="nav-wrapper">
      <div onClick={() => handleClick("Work")}>
        <button>Work</button>
      </div>
      <div onClick={() => handleClick("About")}>
        <button>About</button>
      </div>
      <div onClick={() => handleClick("Services")}>
        <button>Services</button>
      </div>
      <div onClick={() => handleClick("Music")}>
        <button>Music</button>
      </div>
      <div onClick={() => handleClick("Contact")}>
        <button>Contact</button>
      </div>
      {/* add to their own components */}
    </div>
  );
};

export default Nav;
