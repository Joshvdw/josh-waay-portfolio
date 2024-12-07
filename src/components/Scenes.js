import Hero from "./scenes/Hero";
import Work from "./scenes/Work";
import About from "../not-mvp/scenes/About";
import Services from "../not-mvp/scenes/Services";
import Music from "../not-mvp/scenes/Music";
import Contact from "../not-mvp/scenes/Contact";
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
