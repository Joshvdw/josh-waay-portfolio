import { useState, useEffect, useRef } from "react";
import { animated, useSpring } from "@react-spring/web";
import { getMobileContentHeight } from "@/utils/utilityFunctions";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

const BlackMobileOverlay = ({ laptopSpacerRef }) => {
  const [opacity, setOpacity] = useState(0);
  const isSmallScreen = useIsSmallScreen();

  useEffect(() => {
    const combinedHeight = getMobileContentHeight();
    // if (isSmallScreen) document.body.style.height = `${combinedHeight}px`;
  }, []);

  useEffect(() => {
    const laptopSpacer = laptopSpacerRef.current;

    if (!laptopSpacer) return;

    const handleScroll = () => {
      console.log("handle scroll triggered");

      const rect = laptopSpacer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate the visible height of the laptopSpacer element
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      // Calculate the opacity based on the visible height
      const newOpacity = 1 - visibleHeight / rect.height;
      console.log(rect, viewportHeight, visibleHeight, newOpacity);
      setOpacity(newOpacity);
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);

    // Initial calculation
    handleScroll();

    // Cleanup
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Use react-spring to animate the opacity
  const springs = useSpring({
    opacity,
    config: { tension: 200, friction: 30 },
  });

  return (
    <>
      <animated.div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
          pointerEvents: "none", // Allows clicks through the overlay
          zIndex: 9999, // Ensure it's on top
          ...springs, // Apply animated opacity
        }}
      />
    </>
  );
};

export default BlackMobileOverlay;
