import Hero from "./scenes/Hero";
import Work from "./scenes/Work";
import About from "./scenes/not-mvp/About";
import Services from "./scenes/not-mvp/Services";
import Music from "./scenes/not-mvp/Music";
import Contact from "./scenes/not-mvp/Contact";
import SceneContext from "@/hooks/sceneContext";
import { useContext } from "react";

const Scenes = () => {
  const { sceneState } = useContext(SceneContext);
  const scenes = {
    hero: Hero,
    work: Work,
    about: About,
    services: Services,
    music: Music,
    contact: Contact,
  };

  const SelectedScene = scenes[sceneState];
  return <div>{SelectedScene && <SelectedScene />}</div>;
};

export default Scenes;
