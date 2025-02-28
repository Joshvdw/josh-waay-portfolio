import { useState, useEffect } from "react";
import { useSpring, animated } from "@react-spring/web";

const BlackMobileOverlay = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  // Smooth transition using react-spring
  const styles = useSpring({
    opacity: scrollProgress,
    config: { tension: 200, friction: 30 },
  });

  useEffect(() => {
    const updateOpacity = () => {
      // Get scroll position
      const scrollTop = window.scrollY;
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;

      // Log scroll values for debugging
      console.log("ScrollTop:", scrollTop);
      console.log("ScrollHeight:", scrollHeight);
      console.log("ClientHeight:", clientHeight);

      // Prevent division by zero
      const progress =
        scrollHeight > clientHeight
          ? scrollTop / (scrollHeight - clientHeight)
          : 0;

      setScrollProgress(progress);

      // Log the scroll progress after calculation
      console.log("Scroll Progress:", progress);
    };

    // Initial update
    updateOpacity();

    // Add event listener to track scroll
    window.addEventListener("scroll", updateOpacity, { passive: true });

    // Cleanup on component unmount
    return () => window.removeEventListener("scroll", updateOpacity);
  }, []);

  return (
    <animated.div style={styles} className="mobile-laptop-mask__wrapper" />
  );
};

export default BlackMobileOverlay;
