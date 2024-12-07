import { useState, useEffect, useCallback } from "react";

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

export const useDebouncedScrollClickSimulate = (clickEvent, delay = 300) => {
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

  return debounce(handleScroll, delay);
};

export const useIsSmallScreen = () => {
  const [isSmall, setIsSmall] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmall(window.innerWidth <= 806);
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
