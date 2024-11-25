"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/images/preloader_bg.jpg", { as: "image" });
  ReactDOM.preload("/images/cta_bg.png", { as: "image" });
  // ReactDOM.preload("/images/menu_bg.png", { as: "image" });
  // ReactDOM.preload("/images/controls_bg.png", { as: "image" });
  ReactDOM.preload("/lotties/hero_star.json", { as: "fetch" });
  ReactDOM.preload("/lotties/preloader_star.json", { as: "fetch" });
  ReactDOM.preload("/lotties/skip_lottie.json", { as: "fetch" });
  ReactDOM.preload("/lotties/play-pause_lottie.json", { as: "fetch" });
  return null;
}
