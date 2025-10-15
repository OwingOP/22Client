
import { useState, useEffect, useMemo, useCallback } from 'react';

export const useAudio = (url: string) => {
  const audio = useMemo(() => new Audio(url), [url]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.3);
  const [rate, setRate] = useState(1);

  audio.loop = true;

  const toggle = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  useEffect(() => {
    if (isPlaying) {
      audio.play().catch(e => console.error("Audio autoplay failed:", e));
    } else {
      audio.pause();
    }
  }, [isPlaying, audio]);

  useEffect(() => {
    audio.volume = volume;
  }, [volume, audio]);

  useEffect(() => {
    audio.playbackRate = rate;
  }, [rate, audio]);
  
  useEffect(() => {
    const handleEnded = () => setIsPlaying(false);
    audio.addEventListener('ended', handleEnded);
    return () => {
      audio.removeEventListener('ended', handleEnded);
    };
  }, [audio]);

  return { isPlaying, toggle, setVolume, setRate, volume, rate };
};
