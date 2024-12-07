import SceneContext from "@/hooks/sceneContext";
import UnityContext from "@/hooks/unityContext";
import { useContext } from "react";
import NavItem from "./ui/NavItem";
import { useEffect, useState } from "react";

const Nav = () => {
  const { sceneState, updateScene } = useContext(SceneContext);
  const { msgUnity } = useContext(UnityContext);
  const [] = useState();

  useEffect(() => {}, [sceneState]);

  const handleClick = (navItem) => {
    const newScene = navItem.toLowerCase();
    if (newScene !== sceneState) msgUnity(`Set${navItem}Scene`);
    updateScene(newScene);
  };

  return (
    <div className="nav-wrapper">
      <NavItem
        navItem="Work"
        handleClick={handleClick}
        sceneState={sceneState}
      />
      <NavItem
        navItem="About"
        handleClick={handleClick}
        sceneState={sceneState}
      />
      <NavItem
        navItem="Services"
        handleClick={handleClick}
        sceneState={sceneState}
      />
      <NavItem
        navItem="Music"
        handleClick={handleClick}
        sceneState={sceneState}
      />
      <NavItem
        navItem="Contact"
        handleClick={handleClick}
        sceneState={sceneState}
      />
      {/* <div onClick={() => handleClick("About")} className="flex">
        <p>About</p>
      </div>
      <div onClick={() => handleClick("Services")} className="flex">
        <p>Services</p>
      </div>
      <div onClick={() => handleClick("Music")} className="flex">
        <p>Music</p>
      </div>
      <div onClick={() => handleClick("Contact")} className="flex">
        <p>Contact</p>
      </div> */}
      {/* add to their own components */}
    </div>
  );
};

export default Nav;
