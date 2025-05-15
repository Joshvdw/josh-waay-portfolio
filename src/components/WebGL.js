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
  const isSmallScreen = useIsSmallScreen();
  // unity to react
  useEffect(() => {
    if (typeof window === "undefined") return; // SSR safe

    // Define a function to open the project link
    window.openCurrentProject = () => {
      const currentProject = workData[currentCounter.current];
      if (sceneState === "work" && currentProject?.link) {
        if (currentProject.removeLiveLinkFromMobile && isSmallScreen) return;
        window.open(currentProject.link, "_blank");
      }
    };

    // Define the global dispatch function Unity calls
    window.dispatchReactUnityEvent = (eventName, data) => {
      if (eventName === "UnityToFrontend") {
        // data is your message string from Unity
        if (data === "LAPTOP_CLICKED") {
          window.openCurrentProject();
        }
        // handle other message strings here if needed
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
      />
    </div>
  );
});

WebGL.displayName = "UnityBuild";

export default WebGL;
