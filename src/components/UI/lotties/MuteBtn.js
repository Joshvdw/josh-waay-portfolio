import { useEffect, useState, useRef } from "react";
import lottie from "lottie-web";
import { isMuted as getIsMuted, muteToggle, playSound } from "@/utils/sound";
import { useOpacityShift } from "@/hooks/useSpring";
import { animated } from "@react-spring/web";

export const MuteBtn = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const opacityShifter = useOpacityShift(isHovered, "gentle", 0.4, 1);

  const container = useRef(null);
  const animationRef = useRef(null);

  const enterFrame = 0;
  const holdFrame = 57;
  const endFrame = 88;

  useEffect(() => {
    if (!container.current) return;
    animationRef.current = lottie.loadAnimation({
      container: container.current,
      renderer: "svg",
      loop: false,
      autoplay: false,
      path: "/lotties/mute_lottie.json",
    });
    animationRef.current.setSpeed(1.5);

    const soundIsMuted = getIsMuted();

    if (soundIsMuted) {
      animationRef.current.goToAndStop(holdFrame, true);
    }

    return () => {
      if (animationRef.current) {
        animationRef.current.destroy();
      }
    };
  }, []);

  function playLottie(start, end, animation) {
    return animation.playSegments([start, end], true);
  }

  const handleClick = () => {
    muteToggle();
    const newMuteState = getIsMuted();
    if (newMuteState !== isMuted) {
      if (newMuteState) {
        playLottie(enterFrame, holdFrame, animationRef.current);
      } else {
        playLottie(holdFrame, endFrame, animationRef.current);
      }
      setIsMuted(newMuteState);
    }
  };

  const handleHover = () => {
    playSound("hoverSound2");
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    // playSound("hoverOutSound");
    setIsHovered(false);
  };
  return (
    <animated.div
      className="mute-btn"
      ref={container}
      onClick={handleClick}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      style={opacityShifter}
    ></animated.div>
  );
};
