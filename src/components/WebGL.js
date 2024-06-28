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
  const { unityProvider, sendMessage, initialisationError, isLoaded } =
    useUnityContext({
      loaderUrl: "/Assets/Laptop/Build/Laptop.loader.js",
      dataUrl: "/Assets/Laptop/Build/Laptop.data.gz",
      frameworkUrl: "/Assets/Laptop/Build/Laptop.framework.js.gz",
      codeUrl: "/Assets/Laptop/Build/Laptop.wasm.gz",
    });

  const { sceneState } = useContext(SceneContext);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      setTimeout(() => {
        sendMessage("UnityFromReact", "HasLoaded");
      }, [1500]);
    }
  }, [isLoaded]);

  useImperativeHandle(ref, () => ({
    sendMessage(functionName, argument) {
      console.log(`msg sent to unity: '${functionName}' argument: ${argument}`);
      sendMessage("UnityFromReact", functionName, argument);
    },
  }));

  useEffect(() => {
    if (initialisationError) console.log(initialisationError);
  }, [initialisationError]);

  return (
    <div>
      {sceneState == "loading" && <Preloader isLoading={isLoading} />}
      <Unity unityProvider={unityProvider} className="unity_canvas" />
    </div>
  );
});

WebGL.displayName = "UnityBuild";

export default WebGL;
