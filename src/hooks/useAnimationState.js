import { useState } from 'react';

export function useAnimationState() {
  const [animType, setAnimType] = useState('draw');
  const [animDuration, setAnimDuration] = useState(2.5);
  const [animEasing, setAnimEasing] = useState('cubic-bezier(0.4, 0, 0.2, 1)');
  const [animDelay, setAnimDelay] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  return {
    animType, setAnimType,
    animDuration, setAnimDuration,
    animEasing, setAnimEasing,
    animDelay, setAnimDelay,
    isPlaying, setIsPlaying,
  };
}
