import { useContext, useState, useEffect } from "react";
import SceneContext from "@/hooks/sceneContext";

const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorBorderPos, setCursorBorderPos] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(true);

  const { sceneState } = useContext(SceneContext);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  useEffect(() => {
    const easting = 8;
    const updateCursorBorderPos = () => {
      setCursorBorderPos({
        x: cursorBorderPos.x + (cursorPos.x - cursorBorderPos.x) / easting,
        y: cursorBorderPos.y + (cursorPos.y - cursorBorderPos.y) / easting,
      });
    };

    const loop = () => {
      updateCursorBorderPos();
      requestAnimationFrame(loop);
    };

    requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(loop);
    };
  }, [cursorPos, cursorBorderPos]);

  const cursorStyle = {
    transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`
  };

  const cursorBorderStyle = {
    transform: `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`
  };

  return (
    <>
      <div
        id="cursor"
        style={cursorStyle}
        className={`${sceneState !== "loading" ? "block" : "hide"} ${
          isVisible ? "visible" : "invisible"
        }`}
      ></div>
      <div
        id="cursor-border"
        style={cursorBorderStyle}
        className={`${sceneState !== "loading" ? "block" : "hide"} ${
          isVisible ? "visible" : "invisible"
        }`}
      ></div>
    </>
  );
};

export default CustomCursor;
