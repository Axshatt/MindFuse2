import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Brain, Activity } from "lucide-react";
import EmotionPreview from "./EmotionPreview";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-glow-secondary/20 rounded-full blur-[128px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center gap-2 px-4 py-2 glass rounded-full">
                <Sparkles className="w-4 h-4 text-primary" />
                <span className="text-sm text-muted-foreground">AI-Powered Mental Wellness Support</span>
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
              Support Mental
              <span className="gradient-text text-glow">Wellbeing</span>
              in Real Time with AI
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              MindFuse provides AI-assisted mental wellbeing support, offering compassionate insights into mood patterns, reflective prompts, and practical self-care suggestions. Useful for individuals, educators, and professionals focused on mental health and wellbeing.
            </p>

            <div className="flex flex-wrap gap-4 mb-12">
              <Link to="/register" className="btn-primary group">
                Get Started
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/how-it-works" className="btn-secondary">
                See How It Works
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {[
                  { value: "24/7", label: "Support" },
                { value: "Real-time", label: "Insights" },
                { value: "Practical", label: "Guidance" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                >
                  <div className="text-2xl md:text-3xl font-bold gradient-text">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right - Live Demo Preview */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <EmotionPreview />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
