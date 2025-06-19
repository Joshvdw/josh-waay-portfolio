import { useSpring, config } from "@react-spring/web";
import { useState, useEffect, useContext, useCallback } from "react";
import SceneContext from "@/hooks/sceneContext";
import { useIsSmallScreen } from "@/hooks/utilityHooks";
// FADE IN
export const useFadeIn = (state, isWorkText) => {
  const [pageFade, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { opacity: 0 },
  }));

  const delay = isWorkText ? 500 : 0;
  useEffect(() => {
    setTimeout(() => {
      api.start({
        opacity: state ? 1 : 0,
      });
    }, delay);
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

// SLIDE IN FROM TOP
export const useSlideInTop = (state, translateAmount) => {
  const [slide, api] = useSpring(() => ({
    config: { ...config.molasses },
    from: { transform: `translateY(-${translateAmount}%)` },
  }));

  useEffect(() => {
    api.start({
      transform: state ? "translateY(0%)" : `translateY(-${translateAmount}%)`,
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
      width: "100%",
    },
  }));

  useEffect(() => {
    api.start({
      transform: state
        ? `${
            isNext == undefined
              ? "translateX(0%)"
              : `translateX(${isNext ? "" : "-"}10%)`
          }`
        : "translateX(0%)",
      width: state ? `${isNext == undefined ? "105%" : "100%"}` : "100%",
    });
  }, [state, api]);

  return slide;
};

// bg button fades
export const useBtnFade = (state) => {
  const [fade, api] = useSpring(() => ({
    config: { ...config.gentle },
    from: { opacity: "20%" },
  }));

  useEffect(() => {
    api.start({
      opacity: state ? "50%" : "20%",
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
  const isSmallScreen = useIsSmallScreen(); // Starts as `true` (your requirement)
  const [animationLoaded, setAnimationLoaded] = useState(false);

  useEffect(() => {
    if (state) {
      setTimeout(() => {
        setAnimationLoaded(true);
      }, 200);
    } else {
      setAnimationLoaded(false);
    }
  }, [state]);

  const [growIn, api] = useSpring(() => ({
    config: {
      duration: 2000,
      tension: 220,
      friction: 126,
    },
    from: { transform: "scale(0.001)" },
  }));

  const startPulsation = useCallback(() => {
    api.start({
      to: [
        {
          transform: isSmallScreen ? "scale(0.1)" : "scale(0.4)",
          config: { duration: 700, immediate: true },
        },
        {
          transform: isSmallScreen ? "scale(1.5)" : "scale(0.7)",
          config: { duration: 700, immediate: true },
        },
        {
          transform: isSmallScreen ? "scale(0.2)" : "scale(0.5)",
          config: { duration: 700, immediate: true },
        },
        {
          transform: isSmallScreen ? "scale(1.2)" : "scale(0.6)",
          config: { duration: 700, immediate: true },
        },
      ],
      onRest: startPulsation, // This makes it loop by calling itself when animation completes
    });
  }, [api, isSmallScreen]);

  useEffect(() => {
    if (animationLoaded) {
      // Initial grow animation
      api.start({
        transform: isSmallScreen ? "scale(1.2)" : "scale(0.4)",
        config: { immediate: true },
        onRest: startPulsation, // Start pulsation after initial growth
      });
    } else {
      // Stop any ongoing animations and reset
      api.stop();
      api.start({ transform: "scale(0.001)" });
    }
  }, [animationLoaded, api, startPulsation, isSmallScreen]);

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

// WORK CONTENT TEXT TRANSITIONS
export const useWorkTextTransition = (
  currentProject,
  setCurrentProject,
  counter
) => {
  const [textTransition, springApi] = useSpring(() => ({
    opacity: 1,
    transform: "translateY(0px)",
    config: { tension: 200, friction: 20 },
  }));

  useEffect(() => {
    springApi.start({ opacity: 0, transform: "translateY(-10px)" });

    const timeout = setTimeout(() => {
      setCurrentProject(currentProject);
      springApi.start({ opacity: 1, transform: "translateY(0px)" });
    }, 300);

    return () => clearTimeout(timeout);
  }, [counter, springApi]);

  return textTransition;
};
