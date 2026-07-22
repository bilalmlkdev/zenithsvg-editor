// Convert SVG string to PNG data URL
export const svgToPngDataUrl = (svgString, width = 512, height = 512) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);
    img.onload = () => {
      ctx.drawImage(img, 0, 0, width, height);
      URL.revokeObjectURL(url);
      resolve(canvas.toDataURL('image/png'));
    };
    img.onerror = (err) => {
      URL.revokeObjectURL(url);
      reject(err);
    };
    img.src = url;
  });
};

// Wrap PNG data URL into ICO blob
export const createIcoBlob = async (pngDataUrl) => {
  const response = await fetch(pngDataUrl);
  const pngBuffer = await response.arrayBuffer();

  const header = new Uint8Array(6);
  new DataView(header.buffer).setUint16(0, 0, true);
  new DataView(header.buffer).setUint16(2, 1, true);
  new DataView(header.buffer).setUint16(4, 1, true);

  const dir = new Uint8Array(16);
  const dirView = new DataView(dir.buffer);
  dirView.setUint8(0, 256);
  dirView.setUint8(1, 256);
  dirView.setUint8(2, 0);
  dirView.setUint8(3, 0);
  dirView.setUint16(4, 1, true);
  dirView.setUint16(6, 32, true);
  dirView.setUint32(8, pngBuffer.byteLength, true);
  dirView.setUint32(12, 22, true);

  return new Blob([header, dir, pngBuffer], { type: 'image/x-icon' });
};

export const triggerDownload = (url, filename) => {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
