import { useState } from 'react';

export function useSvgState(initialSvg) {
  const [rawSvg, setRawSvg] = useState(initialSvg);
  const [strokeColor, setStrokeColor] = useState('#818cf8');
  const [fillColor, setFillColor] = useState('none');
  const [strokeWidth, setStrokeWidth] = useState(2);
  const [strokeLinecap, setStrokeLinecap] = useState('round');
  const [strokeLinejoin, setStrokeLinejoin] = useState('round');
  const [strokeDasharray, setStrokeDasharray] = useState(0);
  const [strokeDashoffset, setStrokeDashoffset] = useState(0);

  return {
    rawSvg, setRawSvg,
    strokeColor, setStrokeColor,
    fillColor, setFillColor,
    strokeWidth, setStrokeWidth,
    strokeLinecap, setStrokeLinecap,
    strokeLinejoin, setStrokeLinejoin,
    strokeDasharray, setStrokeDasharray,
    strokeDashoffset, setStrokeDashoffset,
  };
}
