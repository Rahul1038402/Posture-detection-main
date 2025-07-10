import React, { useState } from 'react';
import { Upload, Video, Activity, FileVideo, Zap, Sparkles, Menu, X, } from 'lucide-react';
import VideoUpload from './VideoUpload';
import LivePoseFeedback from './LivePoseFeedback';
import FeedbackDisplay from './FeedbackDisplay';
import '../App.css'
import { Link } from "react-router-dom";
import Particles from '../ui/Particles';

const Dashboard: React.FC = () => {
    const [mode, setMode] = useState<'upload' | 'webcam' | null>(null);
    const [feedback, setFeedback] = useState<any[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <>
            <nav className="sticky top-0 w-full z-50 bg-purple-950 backdrop-blur-md border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center">
                            <div className="flex-shrink-0 flex items-center">
                                <Activity className="w-8 h-8 text-indigo-500 mr-2" />
                                <span className="text-xl font-bold text-white">PostureAI</span>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                <Link to="/" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Home
                                </Link>
                                <Link to="/dashboard" className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">
                                    Dashboard
                                </Link>
                            </div>
                        </div>

                        <div className="hidden md:block">
                            <Link to="/">
                                <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-200 transform hover:scale-105">
                                    Get Started
                                </button>
                            </Link>
                        </div>

                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-white p-2"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="md:hidden">
                        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-slate-900/95 backdrop-blur-md border-t border-white/10">
                            <Link to="/" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
                            <Link to="/dashboard" className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Dashboard</Link>
                        </div>
                    </div>
                )}
            </nav>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
                {/* Animated Background Elements */}
                <div className="fixed inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-green-400/20 to-blue-600/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
                </div>

                {/* Main Content */}
                <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                    {/* Hero Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full mb-6">
                            <Sparkles className="h-5 w-5 text-blue-600" />
                            <span className="text-sm font-medium text-blue-800">AI-Powered Analysis</span>
                        </div>
                        <h2 className="text-5xl font-bold text-gray-400 mb-6 leading-tight">
                            Perfect Your Posture with
                            <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                Advanced AI Technology
                            </span>
                        </h2>
                        <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Get real-time posture analysis and personalized feedback using cutting-edge computer vision technology.
                            Choose your preferred method and start improving your posture today.
                        </p>
                    </div>

                    {/* Mode Selection */}
                    <div className="flex flex-col lg:flex-row items-center justify-center gap-8 mb-16">
                        {/* Upload Mode Card */}
                        <div className="group relative w-full max-w-md">
                            <div className={`absolute inset-0 rounded-3xl transform transition-all duration-500 ${mode === 'upload'
                                ? 'scale-105 opacity-100 rotate-1'
                                : 'scale-100 opacity-0 group-hover:opacity-20 group-hover:scale-105'
                                }`}></div>
                            <button
                                onClick={() => setMode('upload')}
                                className={`relative w-full bg-gradient-to-br from-indigo-900 via-purple-800 to-black p-10 rounded-3xl shadow-2xl border-2 transition-all duration-500 hover:shadow-3xl ${mode === 'upload'
                                    ? 'border-blue-500 transform scale-105 shadow-blue-200/50 -rotate-1'
                                    : 'border-gray-200 hover:border-blue-300 group-hover:scale-105'
                                    }`}
                            >
                                <div className="absolute inset-0 z-0">
                                    <Particles
                                        particleColors={['#ffffff', '#ffffff']}
                                        particleCount={500}
                                        particleSpread={20}
                                        speed={0.2}
                                        particleBaseSize={60}
                                        moveParticlesOnHover={true}
                                        alphaParticles={false}
                                        disableRotation={false}
                                    />
                                </div>
                                <div className="text-center z-1">
                                    <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${mode === 'upload'
                                        ? 'bg-gradient-to-r from-blue-500 to-blue-600 shadow-lg'
                                        : 'bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-blue-100 group-hover:to-blue-200'
                                        }`}>
                                        <FileVideo className={`h-10 w-10 ${mode === 'upload' ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-indigo-500 mb-3">Upload Video</h3>
                                    <p className="text-gray-300 mb-6 text-lg">Analyze posture from your recorded videos</p>
                                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                                        <Upload className="h-4 w-4" />
                                        <span className='text-gray-400'>MP4, AVI, MOV supported</span>
                                    </div>
                                    {mode === 'upload' && (
                                        <div className="mt-4 flex items-center justify-center space-x-2 text-blue-600">
                                            <div className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium">Active</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Webcam Mode Card */}
                        <div className="group relative w-full max-w-md">
                            <div className={`absolute inset-0 bg-gradient-to-r from-green-500 to-green-600 rounded-3xl transform transition-all duration-500 ${mode === 'webcam'
                                ? 'scale-105 opacity-100 -rotate-1'
                                : 'scale-100 opacity-0 group-hover:opacity-20 group-hover:scale-105'
                                }`}></div>
                            <button
                                onClick={() => setMode('webcam')}
                                className={`relative w-full bg-gradient-to-br from-indigo-900 via-purple-800 to-black p-10 rounded-3xl shadow-2xl border-2 transition-all duration-500 hover:shadow-3xl ${mode === 'webcam'
                                    ? 'border-green-500 transform scale-105 shadow-green-200/50 rotate-1'
                                    : 'border-gray-200 hover:border-green-300 group-hover:scale-105'
                                    }`}
                            >
                                <div className="absolute inset-0 z-0">
                                    <Particles
                                        particleColors={['#ffffff', '#ffffff']}
                                        particleCount={500}
                                        particleSpread={20}
                                        speed={0.2}
                                        particleBaseSize={60}
                                        moveParticlesOnHover={true}
                                        alphaParticles={false}
                                        disableRotation={false}
                                    />
                                </div>
                                <div className="text-center z-1">
                                    <div className={`mx-auto w-20 h-20 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300 ${mode === 'webcam'
                                        ? 'bg-gradient-to-r from-green-500 to-green-600 shadow-lg'
                                        : 'bg-gradient-to-r from-gray-100 to-gray-200 group-hover:from-green-100 group-hover:to-green-200'
                                        }`}>
                                        <Video className={`h-10 w-10 ${mode === 'webcam' ? 'text-white' : 'text-gray-600 group-hover:text-green-600'}`} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-indigo-500 mb-3">Live Webcam</h3>
                                    <p className="text-gray-300 mb-6 text-lg">Real-time posture monitoring and feedback</p>
                                    <div className="flex items-center justify-center space-x-3 text-sm text-gray-500">
                                        <Zap className="h-4 w-4" />
                                        <span className='text-gray-400'>Instant AI feedback</span>
                                    </div>
                                    {mode === 'webcam' && (
                                        <div className="mt-4 flex items-center justify-center space-x-2 text-green-600">
                                            <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-medium">Active</span>
                                        </div>
                                    )}
                                </div>
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-3">
                            {mode === 'upload' && (
                                <div className="animate-fadeIn">
                                    <VideoUpload setFeedback={setFeedback} />
                                </div>
                            )}
                            {mode === 'webcam' && (
                                <div className="animate-fadeIn">
                                    <LivePoseFeedback setFeedback={setFeedback} />
                                </div>
                            )}

                            {!mode && (
                                <div className="bg-purple-800 backdrop-blur-sm rounded-3xl shadow-2xl p-16 text-center border border-white/20">
                                    <div className="bg-gradient-to-r from-blue-100 via-purple-100 to-indigo-100 rounded-full w-32 h-32 flex items-center justify-center mx-auto mb-8">
                                        <Activity className="h-16 w-16 text-blue-600" />
                                    </div>
                                    <h3 className="text-3xl font-bold text-black mb-6">
                                        Choose Your Analysis Method
                                    </h3>
                                    <p className="text-lg text-gray-400 mb-8 max-w-2xl mx-auto">
                                        Select either video upload for analyzing recorded content or live webcam for real-time posture monitoring.
                                        Our AI will provide instant feedback and suggestions.
                                    </p>
                                    <div className="flex items-center justify-center space-x-8 text-sm text-gray-500">
                                        <div className="flex items-center space-x-2">
                                            <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
                                            <span className='text-gray-300'>Video Analysis</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
                                            <span className='text-gray-300'>Live Monitoring</span>
                                        </div>
                                        <div className="flex items-center space-x-2">
                                            <div className="h-2 w-2 bg-purple-500 rounded-full"></div>
                                            <span className='text-gray-300'>AI Feedback</span>
                                        </div>
                                    </div>
                                </div>
                            )}
                            <div className='pt-6'>
                                {/* Feedback Display */}
                                {mode === 'upload' && feedback.length > 0 && (
                                    <FeedbackDisplay feedback={feedback} />
                                )}
                            </div>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Status Card */}
                            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                                <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center">
                                    <Activity className="h-5 w-5 mr-2" />
                                    System Status
                                </h3>
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Current Mode</span>
                                        <span className={`px-3 py-2 rounded-full text-sm font-bold ${mode === 'upload' ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white' :
                                            mode === 'webcam' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white' :
                                                'bg-gray-100 text-gray-600'
                                            }`}>
                                            {mode === 'upload' ? 'Video Upload' :
                                                mode === 'webcam' ? 'Live Webcam' : 'Not Selected'}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">AI Engine</span>
                                        <span className="flex items-center space-x-2">
                                            <div className="h-3 w-3 bg-gradient-to-r from-green-400 to-green-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-bold text-green-600">Online</span>
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-gray-600 font-medium">Processing</span>
                                        <span className="flex items-center space-x-2">
                                            <div className="h-3 w-3 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full animate-pulse"></div>
                                            <span className="text-sm font-bold text-blue-600">Ready</span>
                                        </span>
                                    </div>
                                </div>
                            </div>


                            {/* Tips Card */}
                            <div className="moving-gradient rounded-2xl p-6 border border-blue-100">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <span className="text-2xl mr-2">💡</span>
                                    <p className='text-indigo-400'>Pro Tips</p>
                                </h3>
                                <ul className="space-y-3 text-sm text-gray-700">
                                    <li className="flex items-start space-x-3">
                                        <div className="h-2 w-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className='text-gray-400'>Ensure bright, even lighting for optimal detection accuracy</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <div className="h-2 w-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className='text-gray-400'>Position yourself 3-6 feet away from the camera</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <div className="h-2 w-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className='text-gray-400'>Keep your entire body visible in the frame</span>
                                    </li>
                                    <li className="flex items-start space-x-3">
                                        <div className="h-2 w-2 bg-indigo-500 rounded-full mt-2 flex-shrink-0"></div>
                                        <span className='text-gray-400'>Use a stable surface to avoid camera shake</span>
                                    </li>
                                </ul>
                            </div>

                            {/* Performance Metrics */}
                            <div className="moving-gradient backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/20">
                                <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center">
                                    <Zap className='mr-2' />
                                    <p className='text-indigo-400'>Performanace</p>
                                </h3>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Accuracy</span>
                                            <span className="font-bold text-green-600">98.5%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-green-400 to-green-500 h-2 rounded-full" style={{ width: '98.5%' }}></div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-2">
                                            <span className="text-gray-400">Processing Speed</span>
                                            <span className="font-bold text-blue-600">Real-time</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div className="bg-gradient-to-r from-blue-400 to-blue-500 h-2 rounded-full animate-pulse" style={{ width: '95%' }}></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;