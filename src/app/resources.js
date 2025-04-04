"use client";

import ReactDOM from "react-dom";

// Page load assets
export function PreloadCriticalResources() {
  ReactDOM.preload("/images/preloader_bg.jpg", { as: "image" });
  ReactDOM.preload("/images/cta_bg.png", { as: "image" });
  ReactDOM.preload("/svg/josh_waay_logo.svg", { as: "image" });
  ReactDOM.preload("/lotties/hero_star.json", {
    as: "fetch",
    crossOrigin: "anonymous",
  });
  ReactDOM.preload("/lotties/preloader_star.json", {
    as: "fetch",
    crossOrigin: "anonymous",
  });
  return null;
}

export function preloadNonCriticalResources() {
  ReactDOM.preload("/lotties/skip_lottie.json", {
    as: "fetch",
    crossOrigin: "anonymous",
  });
  ReactDOM.preload("/lotties/play-pause_lottie.json", {
    as: "fetch",
    crossOrigin: "anonymous",
  });
}
