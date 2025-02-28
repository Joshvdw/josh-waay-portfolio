import {
  setAudioRefs,
  reduceVolume,
  isMuted,
  muteAllSounds,
  unMuteAllSounds,
} from "@/utils/sound";
import { useEffect, useRef, memo } from "react";

function Audio() {
  const bgMusic = useRef(null);
  const enterSound = useRef(null);
  const hoverSound = useRef(null);
  const hoverSound2 = useRef(null);
  const hoverOutSound = useRef(null);
  const clickSound = useRef(null);
  const clickSound2 = useRef(null);
  const transitionSound1 = useRef(null);
  const transitionSound2 = useRef(null);
  const swishSound = useRef(null);

  useEffect(() => {
    setAudioRefs([
      bgMusic,
      enterSound,
      hoverSound,
      hoverSound2,
      hoverOutSound,
      clickSound,
      clickSound2,
      transitionSound1,
      transitionSound2,
      swishSound,
    ]);
    reduceVolume("bgMusic", 0.15);
    reduceVolume("enterSound", 0.4);
    reduceVolume("hoverSound", 0.2);
    reduceVolume("hoverSound2", 0.05);
    reduceVolume("hoverOutSound", 0.2);
    reduceVolume("clickSound", 0.05);
    reduceVolume("clickSound2", 0.05);
    reduceVolume("transitionSound1", 0.5);
    reduceVolume("transitionSound2", 0.5);
    // reduceVolume("swishSound", 0.9);
  }, []);

  // mute / unmute if user moves away from active tab
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!isMuted()) {
        if (document.hidden) {
          muteAllSounds();
        } else {
          unMuteAllSounds();
        }
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <>
      <audio
        src="/audio/background-music-v2.mp3"
        ref={bgMusic}
        id="bgMusic"
        loop
      />
      <audio src="/audio/enter.mp3" ref={enterSound} id="enterSound" />
      <audio src="/audio/hover.mp3" ref={hoverSound} id="hoverSound" />
      <audio src="/audio/hover2.mp3" ref={hoverSound2} id="hoverSound2" />
      <audio
        src="/audio/hover_reverse.mp3"
        ref={hoverOutSound}
        id="hoverOutSound"
      />
      <audio src="/audio/click_1.mp3" ref={clickSound} id="clickSound" />
      <audio src="/audio/click_2.mp3" ref={clickSound2} id="clickSound2" />
      <audio
        src="/audio/transition1.mp3"
        ref={transitionSound1}
        id="transitionSound1"
      />
      <audio
        src="/audio/transition2.mp3"
        ref={transitionSound2}
        id="transitionSound2"
      />
      <audio src="/audio/swoosh.mp3" ref={swishSound} id="swishSound" />
    </>
  );
}

export default memo(Audio);
