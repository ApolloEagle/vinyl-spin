import {
  FC,
  useState,
  useRef,
  createContext,
  RefObject,
  useEffect,
} from "react";
import FileUpload from "./file-upload";

interface VinylContextProps {
  setFile: (file: File) => void;
  setBackgroundColor: (backgroundColor: string) => void;
  canvasRef: RefObject<HTMLCanvasElement> | undefined;
}

const VinylContext = createContext<VinylContextProps>({
  setFile: () => null,
  setBackgroundColor: () => null,
  canvasRef: undefined,
});

const VinylSpinner: FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [backgroundColor, setBackgroundColor] = useState<string>("#ffffff");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor;
    return () => {
      document.body.style.backgroundColor = "";
    };
  }, [backgroundColor]);

  return (
    <VinylContext.Provider value={{ setFile, setBackgroundColor, canvasRef }}>
      <div
        className={`flex justify-center items-center min-h-screen min-w-screen bg-[${backgroundColor}] overflow-hidden`}
      >
        <canvas ref={canvasRef} className="hidden" />
        <img
          id="vinyl"
          className="max-h-screen max-w-screen animate-spin"
          src="./vinyl.png"
          alt="vinyl"
        />
        {file ? (
          <img
            className={`absolute inset-0 m-auto rounded-full object-cover w-[calc(100vh/3)] max-w-[calc(100vw/3)] aspect-square animate-spin`}
            src={URL.createObjectURL(file)}
            alt="logo"
          />
        ) : (
          <FileUpload />
        )}
      </div>
    </VinylContext.Provider>
  );
};

export default VinylSpinner;
export { VinylContext };
