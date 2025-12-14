import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="card-glass p-12 relative overflow-hidden">
            {/* Glow Effects */}
            <div className="absolute -top-20 -left-20 w-40 h-40 bg-primary/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-glow-secondary/30 rounded-full blur-3xl" />
            
            <h2 className="section-title mb-4 relative">
              Ready to Prioritize Your Mental Wellbeing?
            </h2>
            <p className="text-muted-foreground text-lg mb-8 relative">
              Start receiving compassionate AI-assisted wellbeing support and insights. No setup required — create an account and begin your self-care journey.
            </p>
            <div className="flex flex-wrap justify-center gap-4 relative">
              <Link to="/register" className="btn-primary group">
                Get Started Free
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/dashboard" className="btn-secondary">
                Try Demo
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;
