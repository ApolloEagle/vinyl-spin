const extractDuration = (
  file: File,
  setDuration: (duration: number) => void
) => {
  const reader = new FileReader();
  reader.onload = function (e) {
    const result = e.target?.result;
    if (typeof result === "string") {
      const audio = new Audio(result);
      audio.addEventListener("loadedmetadata", function () {
        const durationInSeconds = audio.duration;
        setDuration(durationInSeconds);
      });
    }
  };

  reader.readAsDataURL(file);
};

export default extractDuration;
