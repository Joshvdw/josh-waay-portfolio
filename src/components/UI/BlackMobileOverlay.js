import { useState, useEffect, useCallback } from "react";
import { animated, useSpring } from "@react-spring/web";
import { getMobileContentHeight } from "@/utils/utilityFunctions";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

const BlackMobileOverlay = ({ laptopSpacerRef, scrollContainerRef }) => {
  const [opacity, setOpacity] = useState(0);
  const [height, setHeight] = useState(0);
  const isSmallScreen = useIsSmallScreen();

  // Cleanup function to reset body height
  useEffect(() => {
    return () => {
      document.body.style.height = "";
    };
  }, []);

  // Debounced height update function
  const updateHeight = useCallback(() => {
    let timeoutId;
    return () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const newHeight = getMobileContentHeight();
        setHeight(newHeight);

        // Set body height on small screens
        if (isSmallScreen) {
          document.body.style.height = `${newHeight}px`;
        }
      }, 150); // 150ms debounce
    };
  }, [isSmallScreen]);

  // Update height when content changes
  useEffect(() => {
    if (!isSmallScreen) {
      document.body.style.height = "";
      return;
    }

    const debouncedUpdate = updateHeight();
    debouncedUpdate(); // Initial calculation

    // Create a MutationObserver to watch for content changes
    const observer = new MutationObserver(debouncedUpdate);

    // Observe the work body elements for changes
    const workBodyLeft = document.querySelector(".work-body__left");
    const workBodyRight = document.querySelector(".work-body__right");

    if (workBodyLeft) {
      observer.observe(workBodyLeft, {
        childList: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    if (workBodyRight) {
      observer.observe(workBodyRight, {
        childList: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
    }

    return () => {
      observer.disconnect();
      if (debouncedUpdate.timeoutId) {
        clearTimeout(debouncedUpdate.timeoutId);
      }
      document.body.style.height = "";
    };
  }, [isSmallScreen, updateHeight]);

  // Use Intersection Observer to track element visibility
  useEffect(() => {
    if (!isSmallScreen || !laptopSpacerRef.current) return;

    // Create intersection observer
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // When laptop-spacer is fully visible, opacity is 0
        // When it's 50% out of view, opacity reaches 1
        // Double the inverse ratio and clamp between 0 and 1
        const opacity = Math.min(1, (1 - entry.intersectionRatio) * 2);
        setOpacity(opacity);
      },
      {
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1], // Reduced threshold points for better performance
        rootMargin: "0px",
      }
    );

    observer.observe(laptopSpacerRef.current);

    return () => observer.disconnect();
  }, [isSmallScreen, laptopSpacerRef]);

  // Use react-spring to animate the opacity with smoother transitions
  const springs = useSpring({
    opacity,
    config: { tension: 180, friction: 24 }, // Adjusted for snappier transitions
  });

  return (
    <animated.div
      style={{
        position: "absolute",
        width: "100%",
        height: `${height}px`,
        backgroundColor: "#111111",
        pointerEvents: "none",
        ...springs,
      }}
    />
  );
};

export default BlackMobileOverlay;
