from fastapi import FastAPI, File, UploadFile, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import os
import traceback  

from app.services.video_analysis import analyze_video

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Set to frontend domain in production
    allow_methods=["*"],
    allow_headers=["*"]
)

UPLOAD_DIR = "app/static/uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@app.get("/")
def root():
    return {"message": "Backend running"}

@app.post("/analyze-video/")
async def analyze_video_endpoint(
    file: UploadFile = File(...),
    posture_type: str = Form(...)
):
    print(f"📥 Received video: {file.filename}")
    file_path = os.path.join(UPLOAD_DIR, file.filename)
    
    try:
        with open(file_path, "wb") as f:
            f.write(await file.read())

        print(f"🧠 Running analysis with posture_type: {posture_type}")

        feedback = analyze_video(file_path, posture_type)

        print("✅ Analysis complete")
        return JSONResponse(content={"status": "success", "feedback": feedback})
    
    except Exception as e:
        print("❌ An error occurred:")
        traceback.print_exc()
        return JSONResponse(
            status_code=500,
            content={"error": str(e)}
        )
