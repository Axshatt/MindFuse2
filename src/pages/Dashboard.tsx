import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Brain, LogOut, Play, Square, RefreshCw, User } from "lucide-react";

import { useWebcam } from "@/hooks/useWebcam";
import { useEmotionDetector } from "@/hooks/useEmotionDetector";

import WebcamView from "@/components/dashboard/WebcamView";
import CurrentEmotionDisplay from "@/components/dashboard/CurrentEmotionDisplay";
import ChatPanel from "@/components/dashboard/ChatPanel";
import EmotionChart from "@/components/dashboard/EmotionChart";
import EmotionSummary from "@/components/dashboard/EmotionSummary";
import ReportGenerator from "@/components/dashboard/ReportGenerator";
import Chatbot from "@/components/Chatbot";

const Dashboard = () => {
  const {
    videoRef,
    isActive,
    isLoading: cameraLoading,
    error: cameraError,
    startCamera,
    stopCamera,
  } = useWebcam();

  const {
    isLoading: modelLoading,
    isModelLoaded,
    isDetecting,
    currentEmotion,
    error: modelError,
    startDetection,
    stopDetection,
    getEmotionHistory,
    clearHistory,
  } = useEmotionDetector(videoRef);

  const [emotionHistory, setEmotionHistory] = useState(getEmotionHistory());

  // Update emotion history
  useEffect(() => {
    if (isDetecting) {
      const interval = setInterval(() => {
        setEmotionHistory(getEmotionHistory());
      }, 500);

      return () => clearInterval(interval);
    }
  }, [isDetecting, getEmotionHistory]);

  const handleStartCamera = async () => {
    await startCamera();
  };

  const handleStopCamera = () => {
    stopDetection();
    stopCamera();
  };

  const handleStartDetection = () => {
    if (isModelLoaded && isActive) {
      startDetection();
    }
  };

  const handleStopDetection = () => {
    stopDetection();
  };

  const handleReset = () => {
    stopDetection();
    clearHistory();
    setEmotionHistory([]);
  };

  return (
    <div className="min-h-screen bg-background neural-grid">
      {/* Header */}
      <header className="border-b border-border glass-strong sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <Brain className="w-8 h-8 text-primary" />
              <span className="text-xl font-bold gradient-text">MindFuse</span>
            </Link>

            <div className="flex items-center gap-4">
              {/* Desktop Controls */}
              <div className="hidden md:flex items-center gap-2">
                {!isDetecting ? (
                  <button
                    onClick={handleStartDetection}
                    disabled={!isActive || !isModelLoaded}
                    className="btn-primary text-sm disabled:opacity-50"
                  >
                    <Play className="w-4 h-4" />
                    Start Detection
                  </button>
                ) : (
                  <button
                    onClick={handleStopDetection}
                    className="btn-secondary text-sm"
                  >
                    <Square className="w-4 h-4" />
                    Stop Detection
                  </button>
                )}

                <button
                  onClick={handleReset}
                  className="btn-secondary text-sm"
                >
                  <RefreshCw className="w-4 h-4" />
                </button>
              </div>

              {/* User */}
              <div className="flex items-center gap-2 pl-4 border-l border-border">
                <div className="w-8 h-8 rounded-full gradient-bg flex items-center justify-center">
                  <User className="w-4 h-4 text-primary-foreground" />
                </div>
                <Link
                  to="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="container mx-auto px-4 py-6">
        {/* Mobile Controls */}
        <div className="md:hidden flex gap-2 mb-6">
          {!isDetecting ? (
            <button
              onClick={handleStartDetection}
              disabled={!isActive || !isModelLoaded}
              className="btn-primary flex-1 justify-center text-sm disabled:opacity-50"
            >
              <Play className="w-4 h-4" />
              Start Detection
            </button>
          ) : (
            <button
              onClick={handleStopDetection}
              className="btn-secondary flex-1 justify-center text-sm"
            >
              <Square className="w-4 h-4" />
              Stop Detection
            </button>
          )}
          <button onClick={handleReset} className="btn-secondary text-sm">
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <WebcamView
                videoRef={videoRef}
                isActive={isActive}
                isLoading={cameraLoading}
                isDetecting={isDetecting}
                isModelLoading={modelLoading}
                currentEmotion={currentEmotion}
                error={cameraError || modelError}
                onStart={handleStartCamera}
                onStop={handleStopCamera}
              />
            </motion.div>

            {/* Chart */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
            >
              <ChatPanel
                emotionHistory={emotionHistory}
                currentEmotion={currentEmotion}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <EmotionChart emotionHistory={emotionHistory} />
            </motion.div>
          </div>

          {/* Right */}
          <div className="space-y-6">
            <CurrentEmotionDisplay
              currentEmotion={currentEmotion}
              isDetecting={isDetecting}
            />
            <EmotionSummary emotionHistory={emotionHistory} />
            <ReportGenerator
              emotionHistory={emotionHistory}
              isDisabled={emotionHistory.length === 0}
            />
          </div>
        </div>
      </main>

      {/* ✅ Floating Chatbot */}
      <Chatbot />
    </div>
  );
};

export default Dashboard;
