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
import UnityContext from "@/hooks/unityContext";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

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
  const { currentCounter } = useContext(UnityContext);

  const [isLoading, setIsLoading] = useState(true);
  const hiddenBtn = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    if (isLoaded) {
      setIsLoading(false);
      setTimeout(() => {
        hiddenBtn.current.click();
      }, [1500]);
    }
  }, [isLoaded]);

  useImperativeHandle(ref, () => ({
    sendMessage(functionName, argument) {
      playTransitionSound(argument);
      if (isLoaded) {
        // console.log(
        //   `msg sent to unity: '${functionName}' argument: ${argument}`
        // );
        sendMessage("UnityFromReact", functionName, argument);
      }
    },
  }));

  useEffect(() => {
    if (initialisationError) {
      alert(initialisationError);
      console.log(initialisationError, "Please upgrade your OS and try again");
    }
  }, [initialisationError]);

  const canvasID = "react-unity-webgl-canvas";
  const isSmallScreen = useIsSmallScreen();
  // unity to react
  useEffect(() => {
    if (typeof window === "undefined") return;

    // Open the project link
    window.openCurrentProject = () => {
      const currentProject = workData[currentCounter.current];
      if (sceneState === "work" && currentProject?.link) {
        if (currentProject.removeLiveLinkFromMobile && isSmallScreen) return;
        window.open(currentProject.link, "_blank");
      }
    };

    // Dispatch function Unity calls
    window.dispatchReactUnityEvent = (eventName, data) => {
      if (eventName === "UnityToFrontend") {
        // Open project on laptop click
        if (data === "LAPTOP_CLICKED") {
          window.openCurrentProject();
        }
        // Change cursor to pointer on laptop hover
        if (data === "LAPTOP_HOVERED") {
          canvasRef.current.style.cursor = "pointer";
        }
        // Change cursor to default on laptop hover off
        if (data === "LAPTOP_HOVERED_OFF") {
          canvasRef.current.style.cursor = "default";
        }
      }
    };

    // Cleanup: remove these from window when component unmounts
    return () => {
      delete window.dispatchReactUnityEvent;
      delete window.openCurrentProject;
    };
  }, [sceneState, currentCounter]);

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
        ref={canvasRef}
      />
    </div>
  );
});

WebGL.displayName = "UnityBuild";

export default WebGL;
