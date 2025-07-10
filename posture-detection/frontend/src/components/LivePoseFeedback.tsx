import React, { useRef, useEffect, useState, useCallback } from 'react';
import { Pose, POSE_CONNECTIONS, type Results } from '@mediapipe/pose';
import { drawConnectors, drawLandmarks } from '@mediapipe/drawing_utils';
import * as cam from '@mediapipe/camera_utils';

interface FeedbackItem {
  message: string;
}

interface LivePoseFeedbackProps {
  setFeedback: (data: FeedbackItem[]) => void;
}

const FRAME_THRESHOLD = 3;

const LivePoseFeedback: React.FC<LivePoseFeedbackProps> = ({ setFeedback }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const issueCounts = useRef<{ [key: string]: number }>({});
  const postureTypeRef = useRef<'squat' | 'desk'>('squat');
  const [localFeedback, setLocalFeedback] = useState<string[]>([]);
  const [postureType, setPostureType] = useState<'squat' | 'desk'>('squat');

  const calculateAngle = useCallback((a: number[], b: number[], c: number[]): number => {
    const radians =
      Math.atan2(c[1] - b[1], c[0] - b[0]) - Math.atan2(a[1] - b[1], a[0] - b[0]);
    let angle = Math.abs((radians * 180.0) / Math.PI);
    return angle > 180 ? 360 - angle : angle;
  }, []);

  const evaluatePosture = useCallback((landmarks: { x: number; y: number }[]) => {
    const shoulder = [landmarks[12].x, landmarks[12].y];
    const hip = [landmarks[24].x, landmarks[24].y];
    const knee = [landmarks[26].x, landmarks[26].y];
    const ankle = [landmarks[28].x, landmarks[28].y];
    const ear = [landmarks[8].x, landmarks[8].y];

    const backAngle = calculateAngle(shoulder, hip, knee);
    const neckAngle = calculateAngle(ear, shoulder, hip);
    const kneeOverToe = (ankle[0] - knee[0]) > 0.03;

    const issues: string[] = [];

    if (postureTypeRef.current === 'squat') {
      if (backAngle < 150) issues.push('Back angle too low');
      if (kneeOverToe) issues.push('Knee goes beyond toe');
    } else if (postureTypeRef.current === 'desk') {
      if (backAngle < 165) issues.push('Back not straight');
      if (neckAngle < 150) issues.push('Neck bent forward');
    }

    return issues;
  }, [calculateAngle]);

  useEffect(() => {
    const interval = setInterval(() => {
      issueCounts.current = {};
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const onResults = (results: Results) => {
    if (!results.poseLandmarks || !canvasRef.current || !videoRef.current) return;

    const canvasCtx = canvasRef.current.getContext('2d');
    if (!canvasCtx) return;

    canvasCtx.save();
    canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    canvasCtx.drawImage(results.image, 0, 0, canvasRef.current.width, canvasRef.current.height);

    drawConnectors(canvasCtx, results.poseLandmarks, POSE_CONNECTIONS, {
      color: '#00FF00',
      lineWidth: 4,
    });
    drawLandmarks(canvasCtx, results.poseLandmarks, {
      color: '#FF0000',
      lineWidth: 2,
    });

    canvasCtx.restore();

    const issues = evaluatePosture(results.poseLandmarks);
    const newFeedback: string[] = [];

    issues.forEach((issue) => {
      issueCounts.current[issue] = (issueCounts.current[issue] || 0) + 1;
      if (issueCounts.current[issue] >= FRAME_THRESHOLD) {
        newFeedback.push(issue);
      }
    });

    setLocalFeedback(newFeedback);
    setFeedback(newFeedback.map((msg) => ({ message: msg })));
  };

  useEffect(() => {
    let camera: cam.Camera;

    const initPose = async () => {
      const pose = new Pose({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      pose.onResults(onResults);

      if (videoRef.current) {
        camera = new cam.Camera(videoRef.current, {
          onFrame: async () => {
            await pose.send({ image: videoRef.current! });
          },
          width: 640,
          height: 480,
        });

        camera.start();
      }
    };

    initPose();

    return () => {
      camera && camera.stop();
    };
  }, []);

  return (
    <div className="relative w-fit mx-auto">
      <video ref={videoRef} className="hidden" playsInline muted />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="rounded-lg border border-gray-300"
      />

      {/* Toggle Posture Type */}
      <div className="flex justify-center mt-4 space-x-6">
        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="radio"
            name="posture"
            value="squat"
            checked={postureType === 'squat'}
            onChange={() => {
              setPostureType('squat');
              postureTypeRef.current = 'squat';
            }}
            className="accent-blue-600"
          />
          <span className='text-indigo-400 text-lg font-medium'>Squat</span>
        </label>
        <label className="flex items-center space-x-2 text-sm text-gray-700">
          <input
            type="radio"
            name="posture"
            value="desk"
            checked={postureType === 'desk'}
            onChange={() => {
              setPostureType('desk');
              postureTypeRef.current = 'desk';
            }}
            className="accent-blue-600"
          />
          <span className='text-indigo-400 text-lg font-medium'>Desk Sitting</span>
        </label>
      </div>

      {/* Feedback Display */}
      <div className="mt-4 bg-white rounded-lg shadow p-4 max-w-md mx-auto">
        <h3 className="font-semibold text-lg mb-2">Live Posture Feedback</h3>
        {localFeedback.length === 0 ? (
          <p className="text-gray-500">No issues detected ✅</p>
        ) : (
          <ul className="list-disc list-inside text-red-600">
            {localFeedback.map((msg, i) => (
              <li key={i}>{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default LivePoseFeedback;
