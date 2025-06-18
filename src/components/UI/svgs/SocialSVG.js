import { useOpacityShift } from "@/hooks/useSpring";
import { useState } from "react";
import { animated } from "@react-spring/web";
import { playSound } from "@/utils/sound";

const SocialSVG = ({ icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const opacityShifter = useOpacityShift(isHovered, "gentle", 0.6, 1);

  const handleHover = () => {
    playSound("hoverSound2");
    setIsHovered(true);
  };

  const handleHoverOut = () => {
    setIsHovered(false);
  };

  return (
    <animated.div
      className="social-icon"
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverOut}
      onClick={() => playSound("clickSound")}
      style={opacityShifter}
    >
      <a href={link} target="_blank">
        <img src={`/svg/${icon}.svg`} alt="" />
      </a>
    </animated.div>
  );
};

export default SocialSVG;
