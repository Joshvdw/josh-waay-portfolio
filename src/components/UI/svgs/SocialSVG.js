import { useOpacityShift } from "@/hooks/useSpring";
import { useState } from "react";
import { animated } from "@react-spring/web";

const SocialSVG = ({ icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);

  const opacityShifter = useOpacityShift(isHovered, "gentle", 0.4, 1);

  return (
    <animated.div
      className="social-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={opacityShifter}
    >
      <a href={link} target="_blank">
        <img src={`/svg/${icon}.svg`} alt="" />
      </a>
    </animated.div>
  );
};

export default SocialSVG;
