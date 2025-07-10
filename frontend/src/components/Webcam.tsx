// components/Webcam.tsx
import { useEffect, useRef, useImperativeHandle, forwardRef } from 'react';

export interface WebcamHandle {
  stream: MediaStream | null;
}

const Webcam = forwardRef<WebcamHandle, { className?: string }>((props, ref) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    const enableCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        streamRef.current = stream;
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error('🚫 Camera access denied:', err);
      }
    };

    enableCamera();

    return () => {
      streamRef.current?.getTracks().forEach(track => track.stop());
    };
  }, []);

  useImperativeHandle(ref, () => ({
    stream: streamRef.current,
  }));

  return (
    <video
      ref={videoRef}
      className={props.className || 'w-full h-auto'}
      autoPlay
      playsInline
      muted
    />
  );
});

export default Webcam;
