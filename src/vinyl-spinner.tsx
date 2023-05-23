import { FC } from "react";

const VinylSpinner: FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen min-w-screen bg-[#0076E9]">
      <img
        id="vinyl"
        className="max-h-screen max-w-screen animate-spin"
        src="/vinyl.png"
        alt="vinyl"
      />
      <img
        className={`absolute inset-0 m-auto rounded-full object-cover w-[calc(100vh/3)] max-w-[calc(100vw/3)] aspect-square animate-spin`}
        src="/logo.png"
        alt="logo"
      />
    </div>
  );
};

export default VinylSpinner;
