import { FC, useContext } from "react";
import { VinylContext } from "../App";
import { recordVideo } from "../helpers";

const Record: FC = () => {
  const { setRecord, duration, canvasRef, audio } = useContext(VinylContext);

  const handleRecording = () => {
    setRecord(true);
    recordVideo(duration, canvasRef, audio);
  };

  return (
    <>
      <div className="flex flex-row justify-center items-center fixed w-full h-full z-10 bg-slate-400 opacity-50" />
      <button
        className="fixed z-20 bg-rose-500 p-4 rounded-xl text-slate-100 shadow-lg hover:bg-rose-400 active:bg-rose-300"
        onClick={() => handleRecording()}
      >
        Record
      </button>
    </>
  );
};

export default Record;
