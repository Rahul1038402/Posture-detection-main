# 🧠 PostureAI – Rule-Based Posture Detection App

PostureAI is a full-stack web application that analyzes human posture using video input or live webcam feed. It uses rule-based logic with pose estimation (MediaPipe + OpenCV) to flag incorrect postures during exercises like squats or while sitting at a desk.

---

## 📸 Features

- 🎥 **Video Upload**: Analyze uploaded videos for posture issues.
- 📷 **Live Webcam Mode**: Get real-time feedback during squats or desk work.
- ⚙️ **Rule-Based Detection**:
  - For **Squats**:
    - Back angle less than 150° is flagged.
    - Knee going beyond the toe is flagged.
  - For **Desk Sitting**:
    - Back not straight (<165°) is flagged.
    - Neck bent forward (<150°) is flagged.
- 🖼️ Feedback displayed per frame or as a summary.

---

## 🏗️ Tech Stack

### 🖥 Frontend

- React + TypeScript + Vite
- TailwindCSS for UI
- MediaPipe for in-browser pose estimation

### 🚀 Backend

- FastAPI (Python)
- OpenCV + MediaPipe for frame-level posture logic
- Handles video uploads and returns feedback

---

## 🚀 Getting Started

### 📦 Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate      # Windows
# or
source venv/bin/activate   # macOS/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload
```
### 🌐 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```
## 📁 Project Structure

├── backend/

│   ├── app/

│   │   ├── main.py

│   │   └── services/

│   │       └── video_analysis.py

│   ├── requirements.txt

│   └── ...

│

├── frontend/

│   ├── public/

│   ├── src/

│   │   ├── components/

│   │   └── pages/

│   ├── index.html

│   └── ...

└── README.md


## 🧪 Sample Usage

Upload a video showing your squat or desk sitting.

Or switch to Live Webcam Mode.

Select Squat or Desk Sitting mode.

View posture issues flagged on screen.

## 📌 Future Enhancements

- Auto-classify posture type.

- Graph-based posture trends over time.

- AI/ML model to improve accuracy over rule-based methods.

## 👤 Author

Rahul Kumar Mall
PostureAI – 2025