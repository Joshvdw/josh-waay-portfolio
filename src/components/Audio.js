import { setAudioRefs, reduceVolume } from "@/utils/sound";
import { useEffect, useRef, memo } from "react";

function Audio() {
  const bgMusic = useRef(null);
  const hoverSound = useRef(null);
  const clickSound = useRef(null);
  const swishSound = useRef(null);

  useEffect(() => {
    setAudioRefs([bgMusic, hoverSound, clickSound, swishSound]);
    reduceVolume("bgMusic", 0.4);
    reduceVolume("hoverSound", 0.2);
    reduceVolume("clickSound", 0.2);
    reduceVolume("swishSound", 0.2);
  }, []);

  return (
    <>
      <audio
        src="https://general-client-assets.sfo3.cdn.digitaloceanspaces.com/Mosaic/ui-sound/pathways.mp3"
        ref={bgMusic}
        id="bgMusic"
      />
      <audio
        src="https://general-client-assets.sfo3.cdn.digitaloceanspaces.com/Mosaic/ui-sound/hover_btns.mp3"
        ref={hoverSound}
        id="hoverSound"
      />
      <audio
        src="https://general-client-assets.sfo3.cdn.digitaloceanspaces.com/Mosaic/ui-sound/click2.mp3"
        ref={clickSound}
        id="clickSound"
      />
      <audio
        src="https://general-client-assets.sfo3.cdn.digitaloceanspaces.com/Mosaic/ui-sound/modals.mp3"
        ref={swishSound}
        id="swishSound"
      />
    </>
  );
}

export default memo(Audio);
