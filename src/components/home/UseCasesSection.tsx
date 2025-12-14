import { motion } from "framer-motion";
import { GraduationCap, HeartPulse, Users, Microscope } from "lucide-react";

const useCases = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Support student wellbeing and engagement during online learning with non-intrusive insights.",
  },
  {
    icon: HeartPulse,
    title: "Mental Health",
    description: "Track mood patterns and progress over time to provide helpful context for care and self-monitoring.",
  },
  {
    icon: Users,
    title: "HR & Interviews",
    description: "Provide wellbeing-aware insights to support fairer, more empathetic remote interactions.",
  },
  {
    icon: Microscope,
    title: "Research",
    description: "Collect anonymized wellbeing insights for behavioral and mental health research.",
  },
];

const UseCasesSection = () => {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="section-title mb-4">
            Built for Wellbeing
          </h2>
          <p className="section-subtitle">
            From education to healthcare, MindFuse supports mental wellbeing with practical, non-clinical insights.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {useCases.map((useCase, i) => (
            <motion.div
              key={useCase.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="card-glass group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-xl gradient-bg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <useCase.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {useCase.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {useCase.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesSection;
