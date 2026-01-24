import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GenderToggleProps {
  value: "boy" | "girl";
  onChange: (value: "boy" | "girl") => void;
}

const GenderToggle = ({ value, onChange }: GenderToggleProps) => {
  return (
    <div className="flex gap-2 p-1 bg-muted rounded-xl">
      <motion.button
        onClick={() => onChange("boy")}
        className={cn(
          "flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-colors relative",
          value === "boy" 
            ? "text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        whileTap={{ scale: 0.98 }}
      >
        {value === "boy" && (
          <motion.div
            layoutId="genderBg"
            className="absolute inset-0 bg-primary rounded-lg"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="10" cy="14" r="5" />
            <path d="M19 5l-5.4 5.4M19 5h-5M19 5v5" />
          </svg>
          Boy
        </span>
      </motion.button>
      
      <motion.button
        onClick={() => onChange("girl")}
        className={cn(
          "flex-1 py-3 px-6 rounded-lg font-medium text-sm transition-colors relative",
          value === "girl" 
            ? "text-primary-foreground" 
            : "text-muted-foreground hover:text-foreground"
        )}
        whileTap={{ scale: 0.98 }}
      >
        {value === "girl" && (
          <motion.div
            layoutId="genderBg"
            className="absolute inset-0 bg-primary rounded-lg"
            initial={false}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
          />
        )}
        <span className="relative z-10 flex items-center justify-center gap-2">
          <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
            <circle cx="12" cy="8" r="5" />
            <path d="M12 13v8M9 18h6" />
          </svg>
          Girl
        </span>
      </motion.button>
    </div>
  );
};

export default GenderToggle;
