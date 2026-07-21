export const processSvgMarkup = (rawSvg, { strokeColor, fillColor, strokeWidth, strokeLinecap, strokeLinejoin }) => {
  let svg = rawSvg;
  svg = svg.replace(/stroke="[^"]*"/g, `stroke="${strokeColor}"`);
  svg = svg.replace(/fill="[^"]*"/g, `fill="${fillColor}"`);
  svg = svg.replace(/stroke-width="[^"]*"/g, `stroke-width="${strokeWidth}"`);
  svg = svg.replace(/stroke-linecap="[^"]*"/g, `stroke-linecap="${strokeLinecap}"`);
  svg = svg.replace(/stroke-linejoin="[^"]*"/g, `stroke-linejoin="${strokeLinejoin}"`);

  if (!svg.includes('stroke=')) svg = svg.replace('<svg', `<svg stroke="${strokeColor}"`);
  if (!svg.includes('fill=')) svg = svg.replace('<svg', `<svg fill="${fillColor}"`);
  if (!svg.includes('stroke-width=')) svg = svg.replace('<svg', `<svg stroke-width="${strokeWidth}"`);

  return svg;
};

export const generateAnimationCSS = ({ isPlaying, animType, animDuration, animEasing, strokeColor }) => {
  if (!isPlaying || animType === 'none') return '';

  if (animType === 'draw') {
    return `
      @keyframes pcDraw {
        0% { stroke-dasharray: 1000; stroke-dashoffset: 1000; }
        100% { stroke-dasharray: 1000; stroke-dashoffset: 0; }
      }
      .pc-animated path, .pc-animated line, .pc-animated polyline, .pc-animated circle, .pc-animated rect {
        animation: pcDraw ${animDuration}s ${animEasing} infinite alternate;
      }
    `;
  }

  if (animType === 'pulse') {
    return `
      @keyframes pcPulse {
        0% { filter: drop-shadow(0 0 2px ${strokeColor}); opacity: 0.7; }
        100% { filter: drop-shadow(0 0 18px ${strokeColor}); opacity: 1; }
      }
      .pc-animated {
        animation: pcPulse ${animDuration}s ${animEasing} infinite alternate;
      }
    `;
  }

  if (animType === 'spin') {
    return `
      @keyframes pcSpin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
      .pc-animated {
        animation: pcSpin ${animDuration}s ${animEasing} infinite;
        transform-origin: center;
      }
    `;
  }

  if (animType === 'breathe') {
    return `
      @keyframes pcBreathe {
        0% { transform: scale(0.85); }
        100% { transform: scale(1.1); }
      }
      .pc-animated {
        animation: pcBreathe ${animDuration}s ${animEasing} infinite alternate;
        transform-origin: center;
      }
    `;
  }

  return '';
};
