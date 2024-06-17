import { createContext, useRef } from "react";

const UnityContext = createContext();

export const UnityProvider = ({ children }) => {
  const unityBuild = useRef();

  const msgUnity = (functionName) => {
    return unityBuild.current?.sendMessage(functionName);
  };

  return (
    <UnityContext.Provider value={{ unityBuild, msgUnity }}>
      {children}
    </UnityContext.Provider>
  );
};

export default UnityContext;
