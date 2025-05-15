"use client";

import { useContext, useEffect } from "react";
import "../styles/globals.scss";
import {
  PreloadCriticalResources,
  preloadNonCriticalResources,
} from "./resources";
import Audio from "@/components/Audio";
import Scenes from "@/components/Scenes";
import MenuMVP from "@/components/MenuMVP";
import WebGL from "@/components/WebGL";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import ErrorMessage from "../components/errors/ErrorModal";
import SceneContext, { SceneProvider } from "@/hooks/sceneContext";
import UnityContext, { UnityProvider } from "@/hooks/unityContext";
import Socials from "@/components/UI/Socials";
import { customLogStatement } from "@/utils/utilityFunctions";
// import { useIsTabletSize } from "@/hooks/utilityHooks";
import { MuteBtn } from "@/components/UI/lotties/MuteBtn";

export default function Home() {
  return (
    <UnityProvider>
      <SceneProvider>
        <App />
      </SceneProvider>
    </UnityProvider>
  );
}

const App = () => {
  const { sceneState } = useContext(SceneContext);
  const { unityBuild } = useContext(UnityContext);

  const LoadFinished = sceneState !== "loading";
  const HeroShowing = sceneState == "loading" || sceneState == "hero";

  // useIsTabletSize();

  useEffect(() => {
    // preloadNonCriticalResources(); // preload resources

    // overide webgl logs
    // const originalLog = console.log;
    // console.log = function () {
    //   customLogStatement(originalLog); // welcome log msg
    // };
    // return () => {
    //   console.log = originalLog;
    // };
  }, []);

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <main>
        <WebGL ref={unityBuild} />
        <PreloadCriticalResources />
        <Audio />
        {LoadFinished && <Scenes />}
        {!HeroShowing && (
          <>
            <MenuMVP />
            <Socials />
            <MuteBtn />
          </>
        )}
      </main>
    </ErrorBoundary>
  );
};
