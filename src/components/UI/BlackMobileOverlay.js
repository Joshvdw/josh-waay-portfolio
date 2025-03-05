import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { getMobileContentHeight } from "@/utils/utilityFunctions";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

const BlackMobileOverlay = ({ laptopSpacerRef, scrollContainerRef }) => {
  const [opacity, setOpacity] = useState(0);
  const [height, setHeight] = useState(0);
  const isSmallScreen = useIsSmallScreen();

  // Update height when content changes
  useEffect(() => {
    if (!isSmallScreen) return;

    const updateHeight = () => {
      const newHeight = getMobileContentHeight();
      setHeight(newHeight);
      document.body.style.height = `${newHeight}px`;
    };

    // Initial calculation
    updateHeight();

    // Create a MutationObserver to watch for content changes
    const observer = new MutationObserver(updateHeight);

    // Observe the work body elements for changes
    const workBodyLeft = document.querySelector(".work-body__left");
    const workBodyRight = document.querySelector(".work-body__right");

    if (workBodyLeft) {
      observer.observe(workBodyLeft, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    if (workBodyRight) {
      observer.observe(workBodyRight, {
        childList: true,
        subtree: true,
        characterData: true,
      });
    }

    // Cleanup
    return () => observer.disconnect();
  }, [isSmallScreen]);

  useEffect(() => {
    const laptopSpacer = laptopSpacerRef.current;
    const scrollContainer = scrollContainerRef?.current;

    if (!laptopSpacer || !scrollContainer) return;

    const calculateOpacity = () => {
      const rect = laptopSpacer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate how much of the element is visible
      const elementTop = rect.top;
      const elementBottom = rect.bottom;

      // If the element is completely above the viewport
      if (elementBottom <= 0) {
        setOpacity(1);
        return;
      }

      // If the element is completely below the viewport
      if (elementTop >= viewportHeight) {
        setOpacity(0);
        return;
      }

      // Calculate the visible height
      const visibleHeight =
        Math.min(elementBottom, viewportHeight) - Math.max(elementTop, 0);

      // Calculate opacity based on how much of the element is visible
      // Multiply by 1.25 to reach black 25% sooner
      const newOpacity = (1 - visibleHeight / rect.height) * 1.25;

      // Ensure opacity stays between 0 and 1
      setOpacity(Math.max(0, Math.min(1, newOpacity)));
    };

    // Handle all touch events
    const handleTouchStart = () => {
      requestAnimationFrame(calculateOpacity);
    };

    const handleTouchMove = () => {
      requestAnimationFrame(calculateOpacity);
    };

    const handleTouchEnd = () => {
      requestAnimationFrame(calculateOpacity);
    };

    const handleScroll = () => {
      requestAnimationFrame(calculateOpacity);
    };

    // Add event listeners
    scrollContainer.addEventListener("touchstart", handleTouchStart);
    scrollContainer.addEventListener("touchmove", handleTouchMove);
    scrollContainer.addEventListener("touchend", handleTouchEnd);
    scrollContainer.addEventListener("scroll", handleScroll);

    // Initial calculation
    calculateOpacity();

    // Cleanup
    return () => {
      scrollContainer.removeEventListener("touchstart", handleTouchStart);
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
      scrollContainer.removeEventListener("touchend", handleTouchEnd);
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [laptopSpacerRef, scrollContainerRef]);

  // Use react-spring to animate the opacity with smoother transitions
  const springs = useSpring({
    opacity,
    config: { tension: 120, friction: 20 },
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
