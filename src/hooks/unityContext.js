import { createContext, useRef, useMemo } from "react";
import { useSpamPrevention } from "./useSpamPrevention";

const UnityContext = createContext();

export const UnityProvider = ({ children }) => {
  const spamPreventionState = useSpamPrevention();

  const unityBuild = useRef();
  const currentCounter = useRef(0);

  const msgUnity = (functionName, argument) => {
    return unityBuild.current?.sendMessage(functionName, argument);
  };

  // Memoize the context value to prevent unnecessary rerenders
  const contextValue = useMemo(
    () => ({
      unityBuild,
      msgUnity,
      preventSpam: spamPreventionState.preventSpam,
      isDisabled: spamPreventionState.isDisabled,
      currentCounter,
    }),
    [msgUnity, spamPreventionState.preventSpam, spamPreventionState.isDisabled]
  );

  return (
    <UnityContext.Provider value={contextValue}>
      {children}
    </UnityContext.Provider>
  );
};

export default UnityContext;
