import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { Smile, Frown, Angry, AlertCircle, Zap, Meh } from "lucide-react";

const emotions = [
  { name: "Happy", icon: Smile, color: "bg-emotion-happy", percentage: 78 },
  { name: "Neutral", icon: Meh, color: "bg-emotion-neutral", percentage: 12 },
  { name: "Surprise", icon: Zap, color: "bg-emotion-surprise", percentage: 5 },
  { name: "Sad", icon: Frown, color: "bg-emotion-sad", percentage: 3 },
  { name: "Angry", icon: Angry, color: "bg-emotion-angry", percentage: 1 },
  { name: "Fear", icon: AlertCircle, color: "bg-emotion-fear", percentage: 1 },
];

const EmotionPreview = () => {
  const [currentEmotion, setCurrentEmotion] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentEmotion((prev) => (prev + 1) % emotions.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const emotion = emotions[currentEmotion];
  const EmotionIcon = emotion.icon;

  return (
    <div className="relative">
      {/* Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-glow-secondary/20 rounded-3xl blur-3xl" />
      
      <div className="relative card-glass p-6 rounded-3xl">
        {/* Wellbeing Snapshot (Demo) */}
        <h4 className="text-sm font-semibold mb-2">Wellbeing Snapshot</h4>
        <div className="relative aspect-video bg-secondary rounded-2xl overflow-hidden mb-6">
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Face Detection Overlay */}
            <motion.div
              key={currentEmotion}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="relative"
            >
              {/* Simulated Face Box */}
              <div className="w-40 h-48 border-2 border-primary rounded-xl relative animate-pulse-glow">
                <div className="absolute -top-2 -left-2 w-4 h-4 border-t-2 border-l-2 border-primary" />
                <div className="absolute -top-2 -right-2 w-4 h-4 border-t-2 border-r-2 border-primary" />
                <div className="absolute -bottom-2 -left-2 w-4 h-4 border-b-2 border-l-2 border-primary" />
                <div className="absolute -bottom-2 -right-2 w-4 h-4 border-b-2 border-r-2 border-primary" />
                
                {/* Face Icon */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <EmotionIcon className="w-16 h-16 text-primary" />
                </div>
              </div>

              {/* Emotion Label */}
              <motion.div
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 px-4 py-2 glass rounded-full flex items-center gap-2"
              >
                <div className={`w-3 h-3 rounded-full ${emotion.color}`} />
                <span className="font-medium text-foreground">{emotion.name}</span>
                <span className="text-primary font-bold">{emotion.percentage}%</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Camera UI Elements */}
          <div className="absolute top-4 left-4 flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-destructive animate-pulse" />
            <span className="text-xs text-muted-foreground">DEMO</span>
          </div>
          <div className="absolute top-4 right-4 text-xs text-muted-foreground">
            1080p @ 30fps
          </div>
        </div>

        {/* Mood Indicators */}
        <div className="space-y-3">
          {emotions.slice(0, 4).map((e, i) => (
            <motion.div
              key={e.name}
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex items-center gap-3"
            >
              <e.icon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span className="text-xs text-muted-foreground w-16">{e.name}</span>
              <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${e.percentage}%` }}
                  transition={{ duration: 1, delay: 0.5 + i * 0.1 }}
                  className={`h-full ${e.color} rounded-full`}
                />
              </div>
              <span className="text-xs font-medium text-foreground w-10 text-right">
                {e.percentage}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EmotionPreview;
