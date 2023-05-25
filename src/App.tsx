import { useState, useRef, createContext, RefObject, useEffect } from "react";
import { VinylSpinner } from "./components";

interface VinylContextProps {
  image: File | null;
  setImage: (image: File) => void;
  audio: File | null;
  setAudio: (audio: File) => void;
  duration: number | null;
  setDuration: (duration: number) => void;
  backgroundColor: string;
  setBackgroundColor: (backgroundColor: string) => void;
  canvasRef: RefObject<HTMLCanvasElement> | undefined;
}

const VinylContext = createContext<VinylContextProps>({
  image: null,
  setImage: () => null,
  audio: null,
  setAudio: () => null,
  duration: null,
  setDuration: (duration: number) => null,
  backgroundColor: "#ffffff",
  setBackgroundColor: () => null,
  canvasRef: undefined,
});

const App = () => {
  const [image, setImage] = useState<File | null>(null);
  const [audio, setAudio] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
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
      }}
    >
      <VinylSpinner />
    </VinylContext.Provider>
  );
};

export default App;
export { VinylContext };