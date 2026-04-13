import { useRef, useState, useEffect } from "react";
import apnaBanaLe from "@/assets/apna_bana_le.mp3";

const clamp = (val: number, min: number, max: number) => Math.max(min, Math.min(max, val));


const AudioPlayer = ({ volume = 0.6 }: { volume?: number }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = clamp(volume, 0, 1);
    }
  }, [volume]);

  // Start audio on first user interaction (works on mobile)
  useEffect(() => {
    const startAudio = () => {
      if (audioRef.current && !isPlaying) {
        audioRef.current.play()
          .then(() => setIsPlaying(true))
          .catch(() => {});
      }
    };

    // Multiple event types for better mobile support
    const events = ["click", "touchstart", "touchend", "scroll"];
    events.forEach(event => window.addEventListener(event, startAudio, { once: true, passive: true }));

    return () => {
      events.forEach(event => window.removeEventListener(event, startAudio));
    };
  }, [isPlaying]);

  // Pause when tab is hidden, resume when visible
  useEffect(() => {
    const handleVisibility = () => {
      if (!audioRef.current) return;
      if (document.hidden) {
        audioRef.current.pause();
      } else if (isPlaying) {
        audioRef.current.play().catch(() => {});
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);
    return () => document.removeEventListener("visibilitychange", handleVisibility);
  }, [isPlaying]);

  return (
    <audio
      ref={audioRef}
      src={apnaBanaLe}
      loop
      preload="auto"
      style={{ display: "none" }}
    />
  );
};

export default AudioPlayer;
