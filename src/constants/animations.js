import { Activity, Flame, RotateCw, Sparkles, Move, Zap } from 'lucide-react';

export const ANIMATION_TYPES = [
  { id: 'draw', label: 'Path Draw', icon: Activity, desc: 'Classic stroke tracing effect' },
  { id: 'pulse', label: 'Glow Pulse', icon: Flame, desc: 'Rhythmic opacity and stroke glow' },
  { id: 'spin', label: '360° Rotate', icon: RotateCw, desc: 'Continuous smooth spin' },
  { id: 'breathe', label: 'Breathe Scale', icon: Sparkles, desc: 'Subtle scaling heartbeat' },
  { id: 'bounce', label: 'Vertical Bounce', icon: Move, desc: 'Playful spring animation' },
  { id: 'float', label: 'Hover Float', icon: Zap, desc: 'Gentle floating levitation' },
];

export const EASING_OPTIONS = [
  { label: 'Smooth Ease', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { label: 'Linear', value: 'linear' },
  { label: 'Bounce Out', value: 'cubic-bezier(0.34, 1.56, 0.64, 1)' },
  { label: 'Ease In Out', value: 'ease-in-out' },
];
