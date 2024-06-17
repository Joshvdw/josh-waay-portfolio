import { createContext, useState } from "react";

const SceneContext = createContext();

export const SceneProvider = ({ children }) => {
  const [sceneState, setSceneState] = useState("loading");

  const updateScene = (scene) => {
    setSceneState(scene);
  };

  return (
    <SceneContext.Provider value={{ sceneState, updateScene }}>
      {children}
    </SceneContext.Provider>
  );
};

export default SceneContext;
