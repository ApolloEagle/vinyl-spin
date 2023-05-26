import { useState, useRef, createContext, RefObject, useEffect } from "react";
import { VinylSpinner } from "./components";

interface VinylContextProps {
  image: File | null;
  setImage: (image: File) => void;
  audio: File | null;
  setAudio: (audio: File) => void;
  duration: number;
  setDuration: (duration: number) => void;
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  canvasRef: RefObject<HTMLCanvasElement> | null;
  prompt: string;
  setPrompt: (prompt: string) => void;
  record: boolean;
  setRecord: (record: boolean) => void;
}

const VinylContext = createContext<VinylContextProps>({
  image: null,
  setImage: () => null,
  audio: null,
  setAudio: () => null,
  duration: 0,
  setDuration: (duration: number) => null,
  backgroundColor: "#ffffff",
  setBackgroundColor: () => null,
  canvasRef: null,
  prompt: "Drag and drop an audo file",
  setPrompt: (prompt: string) => null,
  record: false,
  setRecord: (record: boolean) => null,
});

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [duration, setDuration] = useState<number>(0);
  const [record, setRecord] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>("Drag and drop an audo file");
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [backgroundColor]);

  return (
    <VinylContext.Provider
      value={{
        image,
        setImage,
        audio,
        setAudio,
        duration,
        setDuration,
        backgroundColor,
        setBackgroundColor,
        canvasRef,
        prompt,
        setPrompt,
        record,
        setRecord,
      }}
    >
      <VinylSpinner />
    </VinylContext.Provider>
  );
};

export default App;
export { VinylContext };
