import { useSpring, config } from "@react-spring/web";
import { useEffect, useContext } from "react";
import SceneContext from "@/hooks/sceneContext";

// FADE IN
export const useFadeIn = (state) => {
  const [pageFade, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { opacity: 0 },
  }));

  useEffect(() => {
    api.start({
      opacity: state ? 1 : 0,
    });
  }, [state, api]);

  return pageFade;
};

// SLIDE IN FROM LEFT
export const useSlideIn = (state, translateAmount) => {
  const [slide, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { transform: `translateX(-${translateAmount}%)` },
  }));

  useEffect(() => {
    api.start({
      transform: state ? "translateX(0%)" : `translateX(-${translateAmount}%)`,
    });
  }, [state, api]);

  return slide;
};

// OPACITY SHIFTER
export const useOpacityShift = (state, from, to) => {
  const [opacityShift, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { opacity: from },
  }));

  useEffect(() => {
    api.start({
      opacity: state ? to : from,
    });
  }, [state, api]);

  return opacityShift;
};

// FADE PRELOADER OUT
export const usePreloaderFadeOut = (state) => {
  const { updateScene } = useContext(SceneContext);

  const [pageFade, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: { opacity: 1 },
  }));

  useEffect(() => {
    setTimeout(() => {
      api.start({
        opacity: !state ? 0 : 1,
        onRest: () => {
          setTimeout(() => {
            updateScene("hero");
          }, 100); // delay for hero fading in
        },
      });
    }, 1000); // delay fade in slightly to avoid load-in jank
  }, [state, api]);

  return pageFade;
};

// GROW IN
export const useGrowIn = (state) => {
  const [growIn, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { transform: "scale(0.001)" },
  }));

  useEffect(() => {
    api.start({
      transform: state ? "scale(1)" : "scale(0.01)",
    });
  }, [state, api]);

  return growIn;
};

// GROW OUT
export const useGrowOut = (state) => {
  const [growOut, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { transform: "scale(1)" },
  }));

  useEffect(() => {
    api.start({
      transform: !state ? "scale(0.2)" : "scale(1)",
    });
  }, [state, api]);

  return growOut;
};
