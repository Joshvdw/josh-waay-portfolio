import { useContext, useState, useEffect } from "react";
import SceneContext from "@/hooks/sceneContext";
const CustomCursor = () => {
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [cursorBorderPos, setCursorBorderPos] = useState({ x: 0, y: 0 });

  const { sceneState } = useContext(SceneContext);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
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

  const loadFinished = sceneState !== "loading";

  const cursorStyle = {
    transform: `translate(${cursorPos.x}px, ${cursorPos.y}px)`,
    display: loadFinished ? "block" : "none",
  };

  const cursorBorderStyle = {
    transform: `translate(${cursorBorderPos.x}px, ${cursorBorderPos.y}px)`,
    display: loadFinished ? "block" : "none",
  };

  return (
    <>
      <div id="cursor" style={cursorStyle}></div>
      <div id="cursor-border" style={cursorBorderStyle}></div>
    </>
  );
};

export default CustomCursor;
