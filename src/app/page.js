"use client";

import { useContext } from "react";
import "../styles/globals.scss";
import { PreloadResources } from "./resources";
import Audio from "@/components/Audio";
import Scenes from "@/components/Scenes";
import MenuMVP from "@/components/MenuMVP";
import WebGL from "@/components/WebGL";
import SoundWave from "@/components/UI/lotties/SoundBtn";
import ErrorBoundary from "@/components/errors/ErrorBoundary";
import ErrorMessage from "../components/errors/ErrorModal";
import SceneContext, { SceneProvider } from "@/hooks/sceneContext";
import UnityContext, { UnityProvider } from "@/hooks/unityContext";
import Socials from "@/components/UI/Socials";
import { playSound } from "@/utils/sound";

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

  return (
    <ErrorBoundary fallback={<ErrorMessage />}>
      <main onClick={() => playSound("bgMusic")}>
        <WebGL ref={unityBuild} />
        <PreloadResources />
        <Audio />
        {LoadFinished && <Scenes />}
        {!HeroShowing && <MenuMVP />}
        {!HeroShowing && <Socials />}
        {!HeroShowing && <SoundWave />}
      </main>
    </ErrorBoundary>
  );
};
