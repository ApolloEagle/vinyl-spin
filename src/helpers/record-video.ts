const recordVideo = async (duration: number) => {
  try {
    const mediaStream: MediaStream =
      await navigator.mediaDevices.getDisplayMedia({
        video: true,
      });

    const mediaRecorder: MediaRecorder = new MediaRecorder(mediaStream, {
      mimeType: "video/webm",
    });

    const recordedChunks: Blob[] = [];
    mediaRecorder.addEventListener("dataavailable", (e) => {
      recordedChunks.push(e.data);
    });

    mediaRecorder.addEventListener("stop", function () {
      const blob = new Blob(recordedChunks, {
        type: "video/webm",
      });

      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "video.webm";
      a.click();
    });

    setTimeout(() => {
      mediaRecorder.stop();
    }, duration * 1000);

    mediaRecorder.start();
  } catch (error) {
    console.log("Denied bruv: ", error);
  }
};

export default recordVideo;
