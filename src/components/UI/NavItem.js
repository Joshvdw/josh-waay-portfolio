import { useState } from "react";
import SelectorBtn from "./lotties/SelectorBtn";

const NavItem = ({ navItem, handleClick, sceneState }) => {
  const [isHovered, setIsHovered] = useState(false);

  const isActive = sceneState == navItem.toLowerCase();

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => handleClick(navItem)}
      className="flex nav-item"
    >
      {(isActive || isHovered) && (
        <SelectorBtn isHovered={isHovered} isActive={isActive} />
      )}
      <p className={`${isActive ? "is-active" : "is-inactive"}`}>{navItem}</p>
    </div>
  );
};

export default NavItem;
