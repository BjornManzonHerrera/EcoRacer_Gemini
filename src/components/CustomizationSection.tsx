import type { ReactNode } from "react";
import { motion } from "framer-motion";

interface CustomizationSectionProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
}

const CustomizationSection = ({ title, icon, children }: CustomizationSectionProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-card rounded-2xl p-4 shadow-sm border border-border/50"
    >
      <div className="flex items-center gap-2 mb-3">
        {icon && <span className="text-primary">{icon}</span>}
        <h3 className="font-semibold text-sm text-foreground">{title}</h3>
      </div>
      {children}
    </motion.div>
  );
};

export default CustomizationSection;
