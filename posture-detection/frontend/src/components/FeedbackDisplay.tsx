import { AlertTriangle, CheckCircle, ClipboardList } from 'lucide-react';

interface FeedbackItem {
  frame: number;
  timestamp: number;
  issues?: string[];
}

interface FeedbackDisplayProps {
  feedback: FeedbackItem[];
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  // Create a map to store the first occurrence of each issue
  const issueMap = new Map<string, { frame: number; timestamp: number }>();

  feedback.forEach((item) => {
    (item.issues || []).forEach((issue) => {
      if (!issueMap.has(issue)) {
        issueMap.set(issue, { frame: item.frame, timestamp: item.timestamp });
      }
    });
  });

  // Convert map to an array for rendering
  const issuesWithMetadata = Array.from(issueMap.entries()).map(
    ([issue, meta]) => ({
      issue,
      frame: meta.frame,
      timestamp: meta.timestamp
    })
  );

  function formatTimestamp(seconds?: number) {
    if (seconds === undefined) return 'Unknown';
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  }

  return (
<div className="bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 border-gray-200 rounded-xl pt-8 px-6 sm:px-8">
  <div className="max-w-4xl mx-auto">
    <div className="flex items-center justify-between mb-8">
      <h2 className="text-2xl font-bold text-white flex items-center gap-3">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-500 rounded-xl flex items-center justify-center shadow-lg ring-2 ring-purple-300/20">
          <ClipboardList className="text-white w-6 h-6" />
        </div>
        <span className="bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
          Posture Analysis Results
        </span>
      </h2>
    </div>

    {issuesWithMetadata.length === 0 ? (
      <div className="bg-gradient-to-r from-emerald-50 to-green-50 border border-emerald-200 rounded-2xl p-8 text-center shadow-lg backdrop-blur-sm">
        <div className="flex flex-col items-center space-y-5">
          <div className="w-20 h-20 bg-gradient-to-br from-emerald-400 via-emerald-500 to-green-500 rounded-full flex items-center justify-center shadow-xl ring-4 ring-emerald-100">
            <CheckCircle className="text-white w-10 h-10" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-emerald-800 mb-3">
              Excellent Posture! 🎉
            </h3>
            <p className="text-emerald-700 text-base max-w-md leading-relaxed">
              No posture issues detected in the video. Keep up the great work maintaining proper alignment!
            </p>
          </div>
        </div>
      </div>
    ) : (
      <div className="pb-8 space-y-6">
        <div className="bg-gradient-to-r from-violet-100 via-purple-100 to-indigo-100 border border-violet-300 rounded-2xl p-6 mb-8 shadow-lg backdrop-blur-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <AlertTriangle className="text-white w-6 h-6" />
            </div>
            <div>
              <h3 className="text-violet-800 font-bold text-lg">
                Areas for Improvement
              </h3>
              <p className="text-violet-700 text-sm mt-1 leading-relaxed">
                We've identified some posture concerns that may benefit from attention.
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 text-white text-xl justify-center mb-6">
          <span className="font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent text-2xl">
            {issuesWithMetadata.length}
          </span>
          <span className="text-purple-100 font-semibold">
            {issuesWithMetadata.length === 1 ? 'Issue' : 'Issues'} Detected
          </span>
        </div>

        <div className="grid gap-6">
          {issuesWithMetadata.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden bg-white/95 backdrop-blur-sm border border-purple-200 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-purple-300 hover:-translate-y-1"
            >
              {/* Subtle gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-indigo-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Content */}
              <div className="relative flex items-start gap-5">
                {/* Icon container */}
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl group-hover:scale-105 transition-all duration-300 ring-2 ring-purple-200">
                  <AlertTriangle className="text-white w-6 h-6" />
                </div>
                
                {/* Main content */}
                <div className="flex-1 min-w-0 space-y-4">
                  {/* Header with badges */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="inline-flex items-center gap-2 text-sm font-bold text-purple-800 bg-gradient-to-r from-purple-100 to-indigo-100 px-4 py-2 rounded-full border border-purple-200 shadow-sm">
                      <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                      Frame {item.frame}
                    </span>
                    <span className="inline-flex items-center gap-2 text-sm text-gray-700 bg-gray-100 px-4 py-2 rounded-full border border-gray-200 shadow-sm">
                      <span className="text-gray-500">⏱️</span>
                      {formatTimestamp(item.timestamp)}
                    </span>
                  </div>
                  
                  {/* Issue description */}
                  <p className="text-gray-800 text-base leading-relaxed font-medium">
                    {item.issue}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-2xl shadow-lg backdrop-blur-sm">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0 shadow-lg">
              <span className="text-white text-lg">💡</span>
            </div>
            <div>
              <h4 className="text-indigo-800 font-bold text-lg mb-2">
                Improvement Tip
              </h4>
              <p className="text-indigo-700 text-sm leading-relaxed">
                Regular posture checks and targeted exercises can help address these issues. Consider consulting with a healthcare professional for personalized guidance.
              </p>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>
</div>
  );
};

export default FeedbackDisplay;
