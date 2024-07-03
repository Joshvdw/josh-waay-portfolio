import { useOpacityShift } from "@/hooks/useSpring";
import { useState } from "react";
import { animated } from "@react-spring/web";

const SocialSVG = ({ icon }) => {
  const [isHovered, setIsHovered] = useState(false);

  const links = {
    mail: "",
    linkedin: "",
    github: "",
  };

  const opacityShifter = useOpacityShift(isHovered, 0.4, 1);
  return (
    <animated.div
      className="social-icon"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={opacityShifter}
    >
      <a href={links[icon]}>
        <img src={`/svg/${icon}.svg`} alt="" />
      </a>
    </animated.div>
  );
};

export default SocialSVG;
