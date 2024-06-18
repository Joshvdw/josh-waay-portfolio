"use client";

import ReactDOM from "react-dom";

export function PreloadResources() {
  ReactDOM.preload("/images/preloader_bg.jpg", { as: "image" });
  return null;
}
