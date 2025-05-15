"use client";

import {
  useEffect,
  forwardRef,
  useImperativeHandle,
  useState,
  useRef,
  useContext,
} from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import Preloader from "./Preloader";
import SceneContext from "@/hooks/sceneContext";
import { playTransitionSound } from "@/utils/sound";
import { workData } from "@/data/workData";
import { useProjectVideoControls } from "@/hooks/videoControlsHook";

const WebGL = forwardRef((props, ref) => {
  const { unityProvider, sendMessage, initialisationError, isLoaded } =
    useUnityContext({
      loaderUrl: "/Assets/Laptop/Build/Laptop.loader.js",
      dataUrl: "/Assets/Laptop/Build/Laptop.data.gz",
      frameworkUrl: "/Assets/Laptop/Build/Laptop.framework.js.gz",
      codeUrl: "/Assets/Laptop/Build/Laptop.wasm.gz",
      companyName: "Josh Waay",
      productName: "Developer Portfolio",
      productVersion: "1.0",
    });

  const { sceneState } = useContext(SceneContext);

  const [isLoading, setIsLoading] = useState(true);
  const hiddenBtn = useRef(null);

  const { progress, counter } = useProjectVideoControls();
  const currentProject = workData[counter];

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      setTimeout(() => {
        // document.body.style.cursor = "none"; // turn off cursor
        // sendMessage("UnityFromReact", "HasLoaded"); // broken in new unity update for some reason
        hiddenBtn.current.click(); // simulate hidden button click instead (seems to work)
      }, [1500]);
    }
  }, [isLoaded]);

  useImperativeHandle(ref, () => ({
    sendMessage(functionName, argument) {
      playTransitionSound(argument);
      if (isLoaded) {
        console.log(
          `msg sent to unity: '${functionName}' argument: ${argument}`
        );
        sendMessage("UnityFromReact", functionName, argument);
      }
    },
  }));

  useEffect(() => {
    if (initialisationError) console.log(initialisationError);
  }, [initialisationError]);

  const canvasID = "react-unity-webgl-canvas";

  // unity to react
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.openCurrentProject = () => {
      if (sceneState === "work") {
        window.open(currentProject.link, "_blank");
      }
    };

    window.dispatchReactUnityEvent = function (eventName) {
      console.log("Event from Unity:", eventName);
      if (eventName === "LAPTOP_CLICKED") {
        window.openCurrentProject();
      }
    };
  }, [sceneState, currentProject]);

  // window.dispatchReactUnityEvent = function (eventName, data) {
  //   console.log("Event from Unity:", eventName, data);
  //   if (eventName === "LAPTOP_CLICKED") {
  //     openCurrentProject();
  //   }
  // };

  // const openCurrentProject = () => {
  //   if (sceneState === "work") {
  //     window.open(currentProject.link, "_blank");
  //   }
  // };

  return (
    <div>
      <button
        style={{ visibility: "hidden", position: "absolute" }}
        ref={hiddenBtn}
        onClick={() => sendMessage("UnityFromReact", "HasLoaded")}
      ></button>
      {sceneState == "loading" && <Preloader isLoading={isLoading} />}
      <Unity
        unityProvider={unityProvider}
        className="unity_canvas"
        id={canvasID}
      />
    </div>
  );
});

WebGL.displayName = "UnityBuild";

export default WebGL;
