import { useState, useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";
import { getMobileContentHeight } from "@/utils/utilityFunctions";
import { useIsSmallScreen } from "@/hooks/utilityHooks";

const BlackMobileOverlay = ({ laptopSpacerRef, scrollContainerRef }) => {
  const [opacity, setOpacity] = useState(0);
  const isSmallScreen = useIsSmallScreen();
  const combinedHeight = getMobileContentHeight();

  useEffect(() => {
    if (isSmallScreen) document.body.style.height = `${combinedHeight}px`;
  }, []);

  useEffect(() => {
    const laptopSpacer = laptopSpacerRef.current;
    const scrollContainer = scrollContainerRef?.current;

    console.log("Laptop Spacer Element:", laptopSpacer); // Debugging log
    console.log("Scroll Container:", scrollContainer); // Debugging log

    if (!laptopSpacer || !scrollContainer) return;

    // Touch event handler for touch-based scrolling
    const handleTouchMove = (e) => {
      console.log("handle touch move triggered");

      const rect = laptopSpacer.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Calculate the visible height of the laptopSpacer element
      const visibleHeight =
        Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);

      // Calculate the opacity based on the visible height
      const newOpacity = 1 - visibleHeight / rect.height;
      console.log("Rect:", rect);
      console.log("Viewport Height:", viewportHeight);
      console.log("Visible Height:", visibleHeight);
      console.log("New Opacity:", newOpacity);
      setOpacity(newOpacity);
    };

    // Add touch event listener to the scrollable container
    scrollContainer.addEventListener("touchmove", handleTouchMove);

    // Initial calculation
    handleTouchMove();

    // Cleanup
    return () =>
      scrollContainer.removeEventListener("touchmove", handleTouchMove);
  }, [laptopSpacerRef, scrollContainerRef]);

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
          height: `${combinedHeight}px`,
          backgroundColor: "#111111",
          pointerEvents: "none", // Allows clicks through the overlay
          ...springs, // Apply animated opacity
        }}
      />
    </>
  );
};

export default BlackMobileOverlay;
