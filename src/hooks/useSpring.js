import { useSpring, config } from "@react-spring/web";
import { useState, useEffect, useContext } from "react";
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
export const useOpacityShift = (state, preset, from, to) => {
  const [opacityShift, api] = useSpring(() => ({
    config: { ...config[preset] },
    from: { opacity: from },
  }));

  useEffect(() => {
    api.start({
      opacity: state ? to : from,
    });
  }, [state, api]);

  return opacityShift;
};

// COLOUR SHIFTER
export const useColourShift = (state, from, to) => {
  const [colourShift, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: { color: from },
  }));

  useEffect(() => {
    api.start({
      color: state ? to : from,
      fill: state ? to : from,
    });
  }, [state, api]);

  return colourShift;
};

// LINK SLIDE
export const useLinkSlide = (state, translateAmount, isLink) => {
  const [slide, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: { transform: "translateX(0%)" },
  }));

  useEffect(() => {
    if (isLink) {
      api.start({
        transform: state
          ? `translateX(${translateAmount}%) translateY(-${
              translateAmount * 0.75
            }%) scale(1.25)`
          : "translateX(0%) translateY(0%) scale(1)",
      });
    } else {
      api.start({
        transform: state
          ? `translateX(${translateAmount * 0.1}%) translateY(-${
              translateAmount * 2
            }%)`
          : "translateX(0%) translateY(0%)",
      });
    }
  }, [state, api]);

  return slide;
};

// button slide
export const useBtnSlide = (state, isNext) => {
  const [slide, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: {
      transform: "translateX(0%)",
      // width: "100%"
    },
  }));

  useEffect(() => {
    api.start({
      transform: state
        ? `translateX(${isNext ? "" : "-"}10%)`
        : "translateX(0%)",
      // width: state ? "110%" : "100%",
    });
  }, [state, api]);

  return slide;
};

// bg button fades
export const useBtnFade = (state) => {
  const [fade, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: { opacity: "50%" },
  }));

  useEffect(() => {
    api.start({
      opacity: state ? "70%" : "50%",
    });
  }, [state, api]);

  return fade;
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
    }, 250); // delay fade in slightly to avoid load-in jank
  }, [state, api]);

  return pageFade;
};

// GROW IN
export const useGrowIn = (state) => {
  const [animationLoaded, setAnimationLoaded] = useState(false);
  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setAnimationLoaded(true);
      }, [200]);
    }
  }, [state]);

  const [growIn, api] = useSpring(() => ({
    config: {
      duration: 3500, // Increase duration for slower animation (in milliseconds)
      // delay: 1500, // Delay before animation starts (in milliseconds)
      tension: 220, // Adjust tension for smoothness
      friction: 126, // Adjust friction for smoothness
    },
    from: { transform: "scale(0.001)" },
  }));

  useEffect(() => {
    api.start({
      transform: animationLoaded ? "scale(1)" : "scale(0.01)",
    });
  }, [animationLoaded, api]);

  return growIn;
};

// GROW OUT
export const useGrowOut = (state) => {
  const [growOut, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { transform: "scale(1)" },
  }));

  useEffect(() => {
    setTimeout(() => {
      api.start({
        transform: !state ? "scale(0.7)" : "scale(1)",
      });
    }, [1000]);
  }, [state, api]);

  return growOut;
};
