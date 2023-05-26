import { RefObject } from "react";

const componentToHex = (color: number) => {
  const hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const extractBackgroundColor = (
  file: File,
  canvasRef: RefObject<HTMLCanvasElement> | null,
  setBackgroundColor: (backgroundColor: string) => void
) => {
  const reader = new FileReader();
  reader.onload = (e) => {
    const img = new Image();
    img.onload = () => {
      const container = canvasRef?.current;
      if (!container) return;

      container.width = img.width;
      container.height = img.height;

      const ctx = container.getContext("2d");
      if (!ctx) return;

      ctx.drawImage(img, 0, 0);
      const pixelData = ctx.getImageData(0, 0, img.width, img.height).data;
      const color = `#${componentToHex(pixelData[0])}${componentToHex(
        pixelData[1]
      )}${componentToHex(pixelData[2])}`;
      setBackgroundColor(color);
    };

    img.src = e.target?.result as string;
  };

  reader.readAsDataURL(file);
};

export default extractBackgroundColor;
