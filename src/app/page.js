"use client";

import { useContext } from "react";
import "../styles/globals.scss";
import { PreloadResources } from "./resources";
import Audio from "@/components/Audio";
import Scenes from "@/components/Scenes";
import MenuMVP from "@/components/MenuMVP";
import WebGL from "@/components/WebGL";
import SoundWave from "@/not-mvp/lotties/SoundBtn";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import ErrorMessage from "../components/errors/ErrorModal";
import SceneContext, { SceneProvider } from "@/hooks/sceneContext";
import UnityContext, { UnityProvider } from "@/hooks/unityContext";
import Socials from "@/components/UI/Socials";
import { customLogStatement } from "@/utils/utilityFunctions";
import { useIsTabletSize } from "@/hooks/utilityHooks";

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

  customLogStatement();
  useIsTabletSize();

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <main>
        <WebGL ref={unityBuild} />
        <PreloadResources />
        <Audio />
        {LoadFinished && <Scenes />}
        {!HeroShowing && <MenuMVP />}
        {!HeroShowing && <Socials />}
      </main>
    </ErrorBoundary>
  );
};
