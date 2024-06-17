"use client";

import {
  useCallback,
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useContext,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Preloader from "./Preloader";
import SceneContext from "@/hooks/sceneContext";

const WebGL = forwardRef((props, ref) => {
  const {
    unityProvider,
    sendMessage,
    addEventListener,
    removeEventListener,
    initialisationError,
    isLoaded,
    loadingProgression,
  } = useUnityContext({
    loaderUrl: "/Build/laptop.loader.js",
    dataUrl: "/Build/laptop.data.gz",
    frameworkUrl: "/Build/laptop.framework.js.gz",
    codeUrl: "/Build/laptop.wasm.gz",
  });

  const { updateScene } = useContext(SceneContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      updateScene("hero");
      sendMessage("UnityFromReact", "HasLoaded");
    }
  }, [isLoaded]);

  useImperativeHandle(ref, () => ({
    sendMessage(functionName) {
      console.log(`msg sent to unity: '${functionName}'`);
      sendMessage("UnityFromReact", functionName);
    },
  }));

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
      {isLoading && <Preloader />}
      <Unity unityProvider={unityProvider} className="unity_canvas" />
    </div>
  );
});

export default WebGL;
