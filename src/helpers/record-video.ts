import { RefObject } from "react";

const startRecording = async (
  duration: number,
  canvasRef: RefObject<HTMLCanvasElement> | null,
  audio: File | null
) => {
  const mediaStream: MediaStream = await navigator.mediaDevices.getDisplayMedia(
    { video: true }
  );
  const videoElement: HTMLVideoElement = document.createElement("video");

  const canvas = canvasRef?.current!;
  const boundary = canvas.getBoundingClientRect();
  const width = boundary.width || canvas.width;
  const height = boundary.height || canvas.height;

  videoElement.srcObject = canvas?.captureStream();
  videoElement.play();

  const chunks: Blob[] = [];
  const mediaRecorder = new MediaRecorder(mediaStream, {
    mimeType: "video/webm; codecs=h264",
  });

  mediaRecorder.addEventListener("dataavailable", (event: BlobEvent) => {
    if (event.data.size > 0) {
      chunks.push(event.data);
    }
  });

  mediaRecorder.start();

  const renderFrame = () => {
    canvas?.getContext("2d")?.drawImage(videoElement, 0, 0, width, height);
  };

  const frameInterval = 1000 / 30;
  setInterval(() => {
    renderFrame();
  }, frameInterval);

  setTimeout(() => {
    stopRecording(mediaRecorder, mediaStream, chunks, audio);
  }, duration * 1000);
};

const stopRecording = (
  mediaRecorder: MediaRecorder,
  mediaStream: MediaStream,
  chunks: Blob[],
  audio: File | null
) => {
  mediaRecorder.stop();
  mediaStream.getVideoTracks()[0].stop();

  const completeRecording = () => {
    const blob = new Blob(chunks, { type: "video/webm" });
    const videoUrl = URL.createObjectURL(blob);

    const downloadLink = document.createElement("a");
    downloadLink.href = videoUrl;
    downloadLink.download = `${audio?.name}.mp4`;
    downloadLink.click();

    URL.revokeObjectURL(videoUrl);
  };

  mediaRecorder.addEventListener("stop", completeRecording);
};

const recordVideo = async (
  duration: number,
  canvasRef: RefObject<HTMLCanvasElement> | null,
  audio: File | null
) => {
  startRecording(duration, canvasRef, audio);
};

export default recordVideo;
