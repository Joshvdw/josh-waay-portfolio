"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/images/preloader_bg.jpg", { as: "image" });
  ReactDOM.preload("/images/cta_bg.png", { as: "image" });
  return null;
}
