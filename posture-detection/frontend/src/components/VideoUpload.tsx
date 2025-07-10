import React, { useState } from 'react';
import { Upload, Video, Loader2, CheckCircle } from 'lucide-react';

type FeedbackItem = {
  frame: number;
  message: string;
};

type AnalysisResponse = FeedbackItem[] | { feedback: FeedbackItem[] };

const sendVideoForAnalysis = async (file: File, postureType: string): Promise<AnalysisResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("posture_type", postureType);

  const res = await fetch("http://localhost:8000/analyze-video/", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("Failed to analyze video");
  }

  return res.json();
};



const VideoUpload = ({ setFeedback }: { setFeedback: (data: any[]) => void }) => {
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [postureType, setPostureType] = useState<'squat' | 'desk'>('squat');

  const handleSubmit = async () => {
    if (!videoFile) return;

    setIsAnalyzing(true);
    try {
      const response = await sendVideoForAnalysis(videoFile, postureType);
      console.log("📬 Raw response from server:", response);

      // If it's wrapped in an object like { feedback: [...] }
      const finalData = Array.isArray(response) ? response : response.feedback || [];
      setFeedback(finalData);
    } catch (error) {
      console.error('❌ Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };


  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type.startsWith('video/')) {
      setVideoFile(files[0]);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 px-6 py-4">
          <h3 className="text-white font-semibold text-lg flex items-center gap-2">
            <Video className="w-5 h-5" />
            Video Analysis
          </h3>
          <p className="text-purple-100 text-sm mt-1">
            Upload your video for AI-powered analysis
          </p>
        </div>

        <div className="p-6 space-y-4">
          <div
            className={`
              relative border-2 border-dashed rounded-lg p-8 text-center transition-all duration-200
              ${isDragOver
                ? 'border-purple-400 bg-purple-50'
                : videoFile
                  ? 'border-green-300 bg-green-50'
                  : 'border-gray-300 bg-gray-50 hover:border-purple-300 hover:bg-purple-50'
              }
            `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <input
              type="file"
              accept="video/*"
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
              disabled={isAnalyzing}
            />

            <div className="flex flex-col items-center space-y-3">
              {videoFile ? (
                <CheckCircle className="w-12 h-12 text-green-500" />
              ) : (
                <Upload className={`w-12 h-12 ${isDragOver ? 'text-purple-500' : 'text-gray-400'}`} />
              )}

              <div>
                <p className="text-sm font-medium text-gray-700">
                  {videoFile ? 'Video Selected' : 'Drop your video here'}
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  {videoFile ? 'Click to change' : 'or click to browse'}
                </p>
              </div>
            </div>
          </div>


          {videoFile && (
            <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Video className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-900 truncate max-w-32">
                      {videoFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {formatFileSize(videoFile.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setVideoFile(null)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  disabled={isAnalyzing}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Select Posture Type</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="postureType"
                  value="squat"
                  checked={postureType === 'squat'}
                  onChange={() => setPostureType('squat')}
                />
                Squat
              </label>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="postureType"
                  value="desk"
                  checked={postureType === 'desk'}
                  onChange={() => setPostureType('desk')}
                />
                Desk Sitting
              </label>
            </div>
          </div>

          <button
            onClick={handleSubmit}
            disabled={!videoFile || isAnalyzing}
            className={`
              w-full py-3 px-4 rounded-lg font-medium transition-all duration-200 flex items-center justify-center space-x-2
              ${!videoFile || isAnalyzing
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl transform hover:-translate-y-0.5'
              }
            `}
          >
            {isAnalyzing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Analyzing Video...</span>
              </>
            ) : (
              <>
                <Video className="w-5 h-5" />
                <span>Analyze Video</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoUpload;
