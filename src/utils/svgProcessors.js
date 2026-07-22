// Applies stroke, fill, width, cap, and join parameters
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

// Keyframe CSS Generator Engine
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

// SVG Cleaner & Optimizer Engine
export const optimizeSvgMarkup = (svgString) => {
  if (!svgString) return { optimized: '', rawBytes: 0, optBytes: 0, reduction: '0%' };

  const rawBytes = new Blob([svgString]).size;
  let optimized = svgString
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/\s+/g, ' ')
    .replace(/>\s+</g, '><')
    .replace(/d="([^"]+)"/g, (match, pathData) => {
      const rounded = pathData.replace(/(\d+\.\d{3,})/g, (num) => parseFloat(num).toFixed(2));
      return `d="${rounded}"`;
    })
    .trim();

  const optBytes = new Blob([optimized]).size;
  const reduction = rawBytes > 0
    ? (((rawBytes - optBytes) / rawBytes) * 100).toFixed(1) + '%'
    : '0%';

  return { optimized, rawBytes, optBytes, reduction };
};

// Path Segment & Commands Inspector Parser
export const parseSvgPaths = (svgString) => {
  const pathRegex = /<path[^>]*d="([^"]+)"[^>]*>/gi;
  const paths = [];
  let match;

  while ((match = pathRegex.exec(svgString)) !== null) {
    const rawData = match[1];
    const commands = [];
    const cmdRegex = /([a-zA-Z])([\s,\-0-9.]+)/g;
    let cmdMatch;

    while ((cmdMatch = cmdRegex.exec(rawData)) !== null) {
      const type = cmdMatch[1];
      const args = cmdMatch[2].trim().split(/[\s,]+/).filter(Boolean);
      commands.push({ type, args, raw: `${type} ${args.join(' ')}` });
    }

    if (commands.length === 0) {
      const simpleRegex = /([a-zA-Z])([^a-zA-Z]*)/g;
      let simpleMatch;
      while ((simpleMatch = simpleRegex.exec(rawData)) !== null) {
        const type = simpleMatch[1];
        const args = simpleMatch[2].trim().split(/[\s,]+/).filter(Boolean);
        if (args.length > 0 || type.match(/[MmLlZz]/)) {
          commands.push({ type, args, raw: `${type} ${args.join(' ')}` });
        }
      }
    }

    paths.push({ rawData, commands });
  }

  return paths;
};
