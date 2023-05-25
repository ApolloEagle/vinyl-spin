import { FC, useContext } from "react";
import FileUpload from "./file-upload";
import { VinylContext } from "../App";

const VinylSpinner: FC = () => {
  const { backgroundColor, audio, image, canvasRef } = useContext(VinylContext);

  return (
    <div
      className={`flex justify-center items-center min-h-screen min-w-screen bg-[${backgroundColor}] overflow-hidden`}
    >
      <canvas ref={canvasRef} className="hidden" />
      {audio ? (
        <>
          <img
            id="vinyl"
            className="max-h-screen max-w-screen animate-spin"
            src="./vinyl.png"
            alt="vinyl"
          />
          {image ? (
            <img
              className={`absolute inset-0 m-auto rounded-full object-cover w-[calc(100vh/3)] max-w-[calc(100vw/3)] aspect-square animate-spin`}
              src={URL.createObjectURL(image)}
              alt="logo"
            />
          ) : (
            <FileUpload type="image" />
          )}
        </>
      ) : (
        <FileUpload type="audio" />
      )}
    </div>
  );
};

export default VinylSpinner;
