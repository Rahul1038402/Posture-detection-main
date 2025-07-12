import cv2
import mediapipe as mp
import numpy as np

mp_pose = mp.solutions.pose
pose = mp_pose.Pose()

def calculate_angle(a, b, c):
    """Angle between three points (in degrees)"""
    a = np.array(a)
    b = np.array(b)
    c = np.array(c)
    radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
    angle = np.abs(np.degrees(radians))
    return 360 - angle if angle > 180 else angle

def analyze_video(video_path: str, posture_type: str):
    print(f"🔍 Posture type selected by user: {posture_type}")
    cap = cv2.VideoCapture(video_path)
    feedback = []

    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    frame_idx = 0
    process_every_n_frames = 5  # Only analyze every 5th frame

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_idx += 1

        # Skip frames that are not multiples of N
        if frame_idx % process_every_n_frames != 0:
            continue

        timestamp = round(frame_idx / fps, 2)

        # 🔽 Resize frame to reduce processing load (e.g. 640x360)
        frame = cv2.resize(frame, (640, 360))

        # Convert to RGB for MediaPipe
        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if not results.pose_landmarks:
            continue

        lm = results.pose_landmarks.landmark

        # Extract keypoints
        shoulder = [lm[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    lm[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        hip = [lm[mp_pose.PoseLandmark.LEFT_HIP.value].x,
               lm[mp_pose.PoseLandmark.LEFT_HIP.value].y]
        knee = [lm[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                lm[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        ankle = [lm[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                 lm[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

        back_angle = calculate_angle(shoulder, hip, knee)
        knee_over_toe = ankle[0] > knee[0]

        issues = []

        if posture_type == "squat":
            if back_angle < 150:
                issues.append("Back angle too low")
            if knee_over_toe:
                issues.append("Knee goes beyond toe")

            feedback.append({
                "frame": frame_idx,
                "timestamp": timestamp,
                "back_angle": round(back_angle, 2),
                "knee_over_toe": knee_over_toe,
                "issues": issues
            })

        elif posture_type == "desk":
            ear = [lm[mp_pose.PoseLandmark.LEFT_EAR.value].x,
                   lm[mp_pose.PoseLandmark.LEFT_EAR.value].y]
            neck_angle = calculate_angle(ear, shoulder, hip)

            if back_angle < 165:
                issues.append("Back not straight")
            if neck_angle < 150:
                issues.append("Neck bent forward")

            feedback.append({
                "frame": frame_idx,
                "timestamp": timestamp,
                "back_angle": round(back_angle, 2),
                "neck_angle": round(neck_angle, 2),
                "issues": issues
            })

    cap.release()
    return feedback

    print(f"🔍 Posture type selected by user: {posture_type}")
    cap = cv2.VideoCapture(video_path)
    feedback = []

    fps = cap.get(cv2.CAP_PROP_FPS) or 30
    frame_idx = 0

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame_idx += 1
        timestamp = round(frame_idx / fps, 2)

        frame_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = pose.process(frame_rgb)

        if not results.pose_landmarks:
            continue

        lm = results.pose_landmarks.landmark

        # Extract keypoints
        shoulder = [lm[mp_pose.PoseLandmark.LEFT_SHOULDER.value].x,
                    lm[mp_pose.PoseLandmark.LEFT_SHOULDER.value].y]
        hip = [lm[mp_pose.PoseLandmark.LEFT_HIP.value].x,
               lm[mp_pose.PoseLandmark.LEFT_HIP.value].y]
        knee = [lm[mp_pose.PoseLandmark.LEFT_KNEE.value].x,
                lm[mp_pose.PoseLandmark.LEFT_KNEE.value].y]
        ankle = [lm[mp_pose.PoseLandmark.LEFT_ANKLE.value].x,
                 lm[mp_pose.PoseLandmark.LEFT_ANKLE.value].y]

        back_angle = calculate_angle(shoulder, hip, knee)
        knee_over_toe = ankle[0] > knee[0]

        issues = []

        if posture_type == "squat":
            if back_angle < 150:
                issues.append("Back angle too low")
            if knee_over_toe:
                issues.append("Knee goes beyond toe")

            feedback.append({
                "frame": frame_idx,
                "timestamp": timestamp,
                "back_angle": round(back_angle, 2),
                "knee_over_toe": knee_over_toe,
                "issues": issues
            })

        elif posture_type == "desk":
            ear = [lm[mp_pose.PoseLandmark.LEFT_EAR.value].x,
                   lm[mp_pose.PoseLandmark.LEFT_EAR.value].y]
            neck_angle = calculate_angle(ear, shoulder, hip)

            if back_angle < 165:
                issues.append("Back not straight")
            if neck_angle < 150:
                issues.append("Neck bent forward")

            feedback.append({
                "frame": frame_idx,
                "timestamp": timestamp,
                "back_angle": round(back_angle, 2),
                "neck_angle": round(neck_angle, 2),
                "issues": issues
            })

    cap.release()
    return feedback
