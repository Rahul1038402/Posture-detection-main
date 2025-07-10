import React, { useState, useEffect } from 'react';
import '../App.css';
import {
    Camera,
    Zap,
    Shield,
    TrendingUp,
    Play,
    Check,
    Star,
    Activity,
    Users,
    Award,
    Target,
    Eye,
    Smartphone,
    Clock,
    BarChart3
} from 'lucide-react';
import Layout from './Layout';
import { Link } from 'react-router-dom';

const Landing: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    const features = [
        {
            icon: <Camera className="w-8 h-8" />,
            title: "Real-Time Analysis",
            description: "Get instant feedback on your posture using your webcam or uploaded videos with advanced AI detection."
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Rule-Based Detection",
            description: "Precise posture analysis using proven biomechanical rules for squats, desk sitting, and more exercises."
        },
        {
            icon: <Shield className="w-8 h-8" />,
            title: "Prevent Injuries",
            description: "Catch bad posture habits before they lead to injuries. Protect your spine, knees, and joints."
        },
        {
            icon: <TrendingUp className="w-8 h-8" />,
            title: "Track Progress",
            description: "Monitor your improvement over time with detailed analytics and posture quality scores."
        }
    ];

    const steps = [
        {
            number: "1",
            title: "Upload or Stream",
            description: "Upload a video or use your webcam to start real-time posture analysis.",
            icon: <Smartphone className="w-6 h-6 text-indigo-400" />
        },
        {
            number: "2",
            title: "AI Analysis",
            description: "Our AI detects your pose keypoints and applies biomechanical rules to assess your posture.",
            icon: <Eye className="w-6 h-6 text-blue-500" />
        },
        {
            number: "3",
            title: "Get Feedback",
            description: "Receive instant feedback with visual overlays and actionable improvement suggestions.",
            icon: <Activity className="w-6 h-6 text-amber-500" />
        },
        {
            number: "4",
            title: "Improve",
            description: "Track your progress and develop better posture habits with continuous monitoring.",
            icon: <Target className="w-6 h-6 text-red-700" />
        }
    ];

    const stats = [
        {
            icon: <Users className="w-8 h-8" />,
            number: "50K+",
            label: "Active Users"
        },
        {
            icon: <Award className="w-8 h-8" />,
            number: "95%",
            label: "Accuracy Rate"
        },
        {
            icon: <Clock className="w-8 h-8" />,
            number: "24/7",
            label: "Real-time Analysis"
        },
        {
            icon: <BarChart3 className="w-8 h-8" />,
            number: "1M+",
            label: "Posture Checks"
        }
    ];

    const PoseVisualization = () => (
        <div className="relative w-full h-96 bg-gradient-to-br from-indigo-500/10 to-purple-600/10 rounded-2xl overflow-hidden backdrop-blur-sm border border-white/10">
            <div className="absolute inset-0 flex items-center justify-center">
                <div className="relative w-64 h-80">
                    {/* Skeleton joints */}
                    <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-16 left-20 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-16 right-20 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-28 left-12 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-28 right-12 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-40 left-8 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-40 right-8 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-44 left-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-44 right-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-60 left-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-60 right-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-72 left-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>
                    <div className="absolute top-72 right-24 w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></div>

                    {/* Skeleton lines */}
                    <div className="absolute top-12 left-1/2 w-0.5 h-8 bg-indigo-400 transform -translate-x-1/2"></div>
                    <div className="absolute top-16 left-20 w-20 h-0.5 bg-indigo-400"></div>
                    <div className="absolute top-22 left-16 w-0.5 h-12 bg-indigo-400"></div>
                    <div className="absolute top-22 right-16 w-0.5 h-12 bg-indigo-400"></div>
                    <div className="absolute top-34 left-12 w-0.5 h-12 bg-indigo-400"></div>
                    <div className="absolute top-34 right-12 w-0.5 h-12 bg-indigo-400"></div>
                    <div className="absolute top-44 left-24 w-0.5 h-16 bg-indigo-400"></div>
                    <div className="absolute top-44 right-24 w-0.5 h-16 bg-indigo-400"></div>
                    <div className="absolute top-60 left-24 w-0.5 h-12 bg-indigo-400"></div>
                    <div className="absolute top-60 right-24 w-0.5 h-12 bg-indigo-400"></div>

                    {/* Floating particles */}
                    <div className="absolute top-4 left-4 w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                    <div className="absolute top-12 right-8 w-1 h-1 bg-pink-400 rounded-full animate-pulse"></div>
                    <div className="absolute bottom-8 left-8 w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce"></div>
                    <div className="absolute bottom-16 right-4 w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                </div>
            </div>

            {/* Overlay effects */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent"></div>
        </div>
    );

    return (
        <Layout>
            <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

                {/* Hero Section */}
                <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                <div className="space-y-4">
                                    <div className="inline-flex items-center space-x-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-2">
                                        <Star className="w-4 h-4 text-indigo-400" />
                                        <span className="text-sm text-indigo-300">AI-Powered Posture Analysis</span>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                                        Perfect Your{' '}
                                        <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
                                            Posture
                                        </span>{' '}
                                        with AI 
                                    </h1>
                                    <p className="text-xl text-gray-300 max-w-xl">
                                        Real-time posture analysis powered by advanced computer vision. Get instant feedback on your squats, desk posture, and exercise form.
                                    </p>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <a href='/dashboard'>
                                        <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 rounded-full font-medium transition-all duration-200 transform hover:scale-105 flex items-center justify-center">
                                            <Camera className="w-5 h-5 mr-2" />
                                            Start Analysis
                                        </button>
                                    </a>
                                    <a href='https://drive.google.com/file/d/1R_VNLXgpnY7SaWoRIEmt6jDjhwp5mhjg/view?usp=sharing' target="_blank" rel="noopener noreferrer"> 
                                    <button className="border border-white/20 text-white px-8 py-4 rounded-full font-medium hover:bg-white/10 transition-all duration-200 flex items-center justify-center">
                                        <Play className="w-5 h-5 mr-2" />
                                        Watch Demo
                                    </button>
                                    </a>
                                </div>

                                <div className="flex items-center space-x-8 text-sm text-gray-400">
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 text-green-400 mr-2" />
                                        No installation required
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 text-green-400 mr-2" />
                                        Works in browser
                                    </div>
                                    <div className="flex items-center">
                                        <Check className="w-4 h-4 text-green-400 mr-2" />
                                        Real-time feedback
                                    </div>
                                </div>
                            </div>

                            <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
                                <PoseVisualization />
                            </div>
                        </div>
                    </div>
                </section>

                {/* Stats Section */}
                <section className="py-16 px-4 sm:px-6 lg:px-8 bg-slate-800/50">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                            {stats.map((stat, index) => (
                                <div key={index} className="text-center space-y-2">
                                    <div className="flex justify-center text-indigo-400">
                                        {stat.icon}
                                    </div>
                                    <div className="text-3xl font-bold text-white">{stat.number}</div>
                                    <div className="text-gray-400">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Features Section */}
                <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                Powerful Features for Perfect Posture
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Advanced AI technology meets practical posture correction tools to help you maintain better health and prevent injuries.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {features.map((feature, index) => (
                                <div key={index} className="bg-slate-800/50 backdrop-blur-sm border border-white/10 rounded-xl p-6 hover:bg-slate-800/70 transition-all duration-300 hover:scale-105">
                                    <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center text-white mb-4">
                                        {feature.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                                    <p className="text-gray-300">{feature.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How It Works Section */}
                <section id="how-it-works" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-800/30">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                How It Works
                            </h2>
                            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                                Get started with posture analysis in just four simple steps. Our AI does the heavy lifting while you focus on improvement.
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {steps.map((step, index) => (
                                <div key={index} className="text-center">
                                    <div className="mb-6 flex flex-col items-center space-y-2">
                                        {/* Step Number */}

                                        {/* Icon */}
                                        <div className="w-12 h-12 bg-indigo-500/20 rounded-full flex items-center justify-center">
                                            {step.icon}
                                        </div>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">{step.title}</h3>
                                    <p className="text-gray-300">{step.description}</p>
                                </div>

                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-500/20 to-purple-600/20">
                    <div className="max-w-4xl mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Ready to Perfect Your Posture?
                        </h2>
                        <p className="text-xl text-gray-300 mb-8">
                            Start your journey to better posture today. No credit card required.
                        </p>
                        <Link to="/dashboard">
                            <button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-12 py-4 rounded-full font-medium text-lg transition-all duration-200 transform hover:scale-105">
                                Get Started Free
                            </button>
                        </Link>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default Landing;