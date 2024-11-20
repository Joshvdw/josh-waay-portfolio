import { useEffect, useState, useRef, memo } from "react";
import { isTouchDevice } from "@/utils/utilityFunctions";
import lottie from "lottie-web";

const SkipBtn = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [initialMount, setInitialMount] = useState(true);

  const container = useRef(null);
  const animationRef = useRef(null);

  const enterFrame = 0;
  const holdFrame = 5;
  const endFrame = 12;

  useEffect(() => {
    if (!container.current) return;

    animationRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lotties/skip_lottie.json",
    });
    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!initialMount && !isTouchDevice()) {
      // animationRef.current.setDirection(isHovered ? 1 : -1);
      animationRef.current.playSegments(
        [
          isHovered ? enterFrame : holdFrame,
          isHovered ? holdFrame : enterFrame,
        ],
        true
      );
    }
    setInitialMount(false);
  }, [isHovered]);

  const handleClick = () => {
    if (!isTouchDevice()) {
      animationRef.current.playSegments([holdFrame, endFrame], true);
    } else {
      animationRef.current.playSegments([enterFrame, endFrame], true);
    }
    // const closeDelay = !isTouchDevice() ? 150 : 300;
    // setTimeout(() => {
    //   handleClose();
    // }, closeDelay);
  };

  return (
    <div
      className="skip-lottie"
      ref={container}
      onMouseEnter={() => {
        setIsHovered(true);
      }}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => {
        handleClick();
      }}
    ></div>
  );
};

export default SkipBtn;
