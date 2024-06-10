"use client";

import HeroFlipText from "../components/HeroFlipText";
import Preloader from "@/components/Preloader";
import ErrorBoundary from "../components/errors/ErrorBoundary";
import ErrorMessage from "../components/errors/ErrorModal";
import { useCallback, useEffect, useState } from "react";
import { Unity, useUnityContext } from "react-unity-webgl";
import "../styles/globals.scss";
import Nav from "@/components/Nav";

export default function Home() {
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

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoaded) setIsLoading(false);
  }, [isLoaded]);

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
    <ErrorBoundary fallback={<ErrorMessage />}>
      <main>
        {/* <Context.Provider value={msgUnity}> */}
        {isLoading && <Preloader />}

        <HeroFlipText msgUnity={msgUnity} />
        <br />
        <Nav msgUnity={msgUnity} />
        <Unity unityProvider={unityProvider} className="unity_canvas" />
        {/* </Context.Provider> */}
      </main>
    </ErrorBoundary>
  );
}
