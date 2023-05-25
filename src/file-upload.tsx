import React, { FC, DragEvent, RefObject, useState, useContext } from "react";
import { VinylContext } from "./vinyl-spinner";

const componentToHex = (color: number) => {
  const hex = color.toString(16);
  return hex.length === 1 ? "0" + hex : hex;
};

const extractBackgroundColor = (
  file: File,
  canvasRef: RefObject<HTMLCanvasElement> | undefined,
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

const FileUpload: FC = () => {
  const [dragging, setDragging] = useState(false);
  const { setFile, setBackgroundColor, canvasRef } = useContext(VinylContext);

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragging(false);

    const file = event.dataTransfer.files[0];
    setFile(file);
    extractBackgroundColor(file, canvasRef, setBackgroundColor);
  };

  return (
    <div
      className={`drop-area fixed ${
        dragging ? "dragging" : ""
      } w-[calc(100vh/3)] max-w-[calc(100vw/3)] aspect-square flex justify-center items-center`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <p>Drag and drop image here</p>
    </div>
  );
};

export default FileUpload;
