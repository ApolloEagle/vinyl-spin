import { FC, DragEvent, useState, useContext } from "react";
import { VinylContext } from "../App";
import { extractDuration, extractBackgroundColor } from "../helpers";

const FileUpload: FC<{ type: string }> = ({ type }) => {
  const [dragging, setDragging] = useState(false);
  const { setImage, setAudio, setDuration, setBackgroundColor, canvasRef } =
    useContext(VinylContext);

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

    if (type === "image") {
      setImage(file);
      extractBackgroundColor(file, canvasRef, setBackgroundColor);
    } else {
      setAudio(file);
      extractDuration(file, setDuration);
    }
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
      <p>
        {type === "audio"
          ? "Drag and drop audio here"
          : "Drag and drop image here"}
      </p>
    </div>
  );
};

export default FileUpload;
