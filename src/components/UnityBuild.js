"use client";

import {
  useCallback,
  useEffect,
  forwardRef,
  useState,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";

const UnityBuild = forwardRef((ref) => {
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    isLoaded,
    loadingProgression,
    initialisationError,
  } = useUnityContext({
    loaderUrl: "/Build/testLappy.loader.js",
    dataUrl: "/Build/testLappy.data.gz",
    frameworkUrl: "/Build/testLappy.framework.js.gz",
    codeUrl: "/Build/testLappy.wasm.gz",
  });

  function msgUnity(functionName) {
    console.log(`msg sent to unity: '${functionName}'`);
    sendMessage("UnityFromReact", functionName);
  }

  const processUnityMsg = useCallback((fnc) => {
    console.log(`msg received from unity: '${fnc}'`);
    setSceneState(fnc);
  }, []);

  useEffect(() => {
    addEventListener("UnityToFrontend", (functionName) =>
      processUnityMsg(functionName)
    );
    return () => {
      removeEventListener("UnityToFrontend", (functionName) =>
        processUnityMsg(functionName)
      );
    };
  }, [addEventListener, removeEventListener, processUnityMsg]);

  useEffect(() => {
    if (initialisationError) console.log(initialisationError);
  }, [initialisationError]);

  return (
    <div>
      <Unity unityProvider={unityProvider} className="unity_canvas" />
    </div>
  );
});

UnityBuild.displayName = "UnityBuild";

export default UnityBuild;
