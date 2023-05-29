import {
  FC,
  DragEvent,
  useState,
  useContext,
  useRef,
  ChangeEvent,
} from "react";
import { VinylContext } from "../App";
import { extractDuration, extractBackgroundColor } from "../helpers";

const FileUpload: FC<{ type: string }> = ({ type }) => {
  const [dragging, setDragging] = useState(false);
  const {
    setImage,
    setAudio,
    setDuration,
    setBackgroundColor,
    canvasRef,
    prompt,
    setPrompt,
  } = useContext(VinylContext);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
      if (file.type.includes("image")) {
        setImage(file);
        extractBackgroundColor(file, canvasRef, setBackgroundColor);
      } else {
        setPrompt("Images only");
      }
    } else {
      if (file.type.includes("audio")) {
        setAudio(file);
        extractDuration(file, setDuration);
        setPrompt("Drag and drop an image");
      } else {
        setPrompt("Please drop audio only");
      }
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event?.target?.files?.[0];
    console.log(file);
    if (type === "image") {
      if (file?.type.includes("image")) {
        setImage(file);
        extractBackgroundColor(file, canvasRef, setBackgroundColor);
      } else {
        setPrompt("Images only");
      }
    } else {
      if (file?.type.includes("audio")) {
        console.log("BOOM");
        setAudio(file);
        extractDuration(file, setDuration);
        setPrompt("Drag and drop an image");
      } else {
        setPrompt("Please drop audio only");
      }
    }
  };

  const handleClick = () => {
    console.log(fileInputRef);
    fileInputRef?.current?.click();
  };

  return (
    <div
      className={`drop-area fixed ${
        dragging ? "dragging" : ""
      } w-[calc(100vh/3)] max-w-[calc(100vw/3)] aspect-square flex justify-center items-center ${
        type === "audio"
          ? "border rounded-2xl border-slate-300 hover:bg-slate-50"
          : "border-0"
      }`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        onChange={(e) => handleFileChange(e)}
        style={{ display: "none" }}
      />
      <button className="w-full h-full" onClick={handleClick}>
        {prompt}
      </button>
    </div>
  );
};

export default FileUpload;
