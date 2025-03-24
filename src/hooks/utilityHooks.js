import { mobileSwitchSize, ipadSwitchSize } from "@/data/globalVariables";
import { getMobileContentHeight } from "@/utils/utilityFunctions";
import { useState, useEffect, useCallback, useContext, useRef } from "react";
import UnityContext from "@/hooks/unityContext";

export const useClickPrevention = (timeout = 1000) => {
  const [isDisabled, setIsDisabled] = useState(false);

  const handleClick = useCallback(
    (callback) => {
      if (isDisabled) return;

      setIsDisabled(true); // Prevent further clicks
      callback(); // Execute the actual click logic

      // Re-enable clicking after the timeout
      setTimeout(() => setIsDisabled(false), timeout);
    },
    [isDisabled, timeout]
  );

  return [isDisabled, handleClick];
};

export const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmall(window.innerWidth <= mobileSwitchSize);
      };

      handleResize();

      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  return isSmall;
};

export const useDebouncedScrollClickSimulate = (clickEvent, delay = 300) => {
  const isSmallScreen = useIsSmallScreen();

  const debounce = (func, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => func(...args), delay);
    };
  };

  const handleScroll = useCallback(
    (event) => {
      if (clickEvent.name === "handleStartClick") {
        clickEvent(); // hero start
        return;
      }

      const isScrollingDown = event.deltaY > 0;
      if (clickEvent) {
        if (isScrollingDown) {
          clickEvent("down"); // Simulate the "Next" action
        } else {
          clickEvent("up"); // Simulate the "Previous" action
        }
      }
    },
    [clickEvent]
  );

  const debouncedScrollHandler = debounce(handleScroll, delay);

  // Return the no-op function if on a small screen, otherwise the debounced scroll handler.
  return isSmallScreen ? () => {} : debouncedScrollHandler;
};

export const useIsIOS = () => {
  const [isIOS, setIsIOS] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined") {
      const userAgent = navigator.userAgent.toLowerCase();
      setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    }
  }, []);

  return isIOS;
};

export const useAdjustViewportHeight = (isIOS) => {
  useEffect(() => {
    if (isIOS) {
      const adjustHeight = () => {
        const viewportHeight = window.innerHeight;
        document.documentElement.style.height = `${viewportHeight}px`;
      };

      adjustHeight();
      window.addEventListener("resize", adjustHeight);
      return () => {
        window.removeEventListener("resize", adjustHeight);
      };
    }
  }, [isIOS]);
};

export const useAdjustDivHeight = (isIOS, ref) => {
  useEffect(() => {
    if (isIOS && ref.current) {
      const adjustHeight = () => {
        const viewportHeight = window.innerHeight;
        ref.current.style.height = `${viewportHeight}px`;
      };

      adjustHeight();
      window.addEventListener("resize", adjustHeight);
      return () => {
        window.removeEventListener("resize", adjustHeight);
      };
    }
  }, [isIOS, ref]);
};

export const useShowScrollIndicator = () => {
  const [showIndicator, setShowIndicator] = useState(false);
  const [shouldRender, setShouldRender] = useState(false);
  const isSmallScreen = useIsSmallScreen();

  // Function to calculate the combined height of the elements
  const calculateHeights = () => {
    const combinedHeight = getMobileContentHeight();
    const viewportHeight = window.innerHeight;
    const shouldShow = combinedHeight > viewportHeight && isSmallScreen;
    setShowIndicator(shouldShow);
    setShouldRender(shouldShow);
  };

  // Function to hide the scroll indicator on scroll or swipe with animation
  const hideScrollIndicator = () => {
    setShowIndicator(false); // Trigger fade out animation
    setTimeout(() => {
      setShouldRender(false); // Actually remove from DOM after animation
    }, 500); // Match this with your animation duration
  };

  // Add event listeners for scroll, touch, resize, and load
  useEffect(() => {
    calculateHeights(); // Initial calculation
    window.addEventListener("scroll", hideScrollIndicator);
    window.addEventListener("touchmove", hideScrollIndicator);
    window.addEventListener("resize", calculateHeights);
    window.addEventListener("load", calculateHeights);

    // Cleanup event listeners on component unmount
    return () => {
      window.removeEventListener("scroll", hideScrollIndicator);
      window.removeEventListener("touchmove", hideScrollIndicator);
      window.removeEventListener("resize", calculateHeights);
      window.removeEventListener("load", calculateHeights);
    };
  }, [isSmallScreen]); // Re-run effect when isSmallScreen changes

  return { showIndicator, shouldRender };
};

export const useIsTabletSize = () => {
  const [isTablet, setIsTablet] = useState(false);
  const { msgUnity } = useContext(UnityContext);
  const prevIsTabletRef = useRef(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        const width = window.innerWidth;
        const isTabletSize =
          width > mobileSwitchSize && width <= ipadSwitchSize;

        // Only update state and send message if there's a change
        if (isTabletSize !== prevIsTabletRef.current) {
          setIsTablet(isTabletSize);
          prevIsTabletRef.current = isTabletSize;

          // Send message for both entering and exiting tablet mode
          msgUnity("isTabletSize", `${isTabletSize}`);
        }
      };

      handleResize();
      window.addEventListener("resize", handleResize);
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, [msgUnity]);

  return isTablet;
};
