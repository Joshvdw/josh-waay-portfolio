import { createContext, useRef } from "react";

const UnityContext = createContext();

export const UnityProvider = ({ children }) => {
  const unityBuild = useRef();

  const msgUnity = (functionName, argument) => {
    return unityBuild.current?.sendMessage(functionName, argument);
  };

  return (
    <UnityContext.Provider value={{ unityBuild, msgUnity }}>
      {children}
    </UnityContext.Provider>
  );
};

export default UnityContext;
