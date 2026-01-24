import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ColorSwatchProps {
  color: string;
  isSelected: boolean;
  onClick: () => void;
  size?: "sm" | "md" | "lg";
  label?: string;
}

const ColorSwatch = ({ color, isSelected, onClick, size = "md", label }: ColorSwatchProps) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-10 h-10",
    lg: "w-12 h-12",
  };

  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "rounded-full relative transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        sizeClasses[size],
        isSelected && "ring-2 ring-offset-2 ring-primary scale-110"
      )}
      style={{ backgroundColor: color }}
      whileHover={{ scale: isSelected ? 1.1 : 1.15 }}
      whileTap={{ scale: 0.95 }}
      aria-label={label || `Select color ${color}`}
      aria-pressed={isSelected}
    >
      {isSelected && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <svg 
            className="w-5 h-5 drop-shadow-md" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke={color === "#FFFFFF" || color === "#FFE4C4" || color === "#F5DEB3" ? "#1F2937" : "white"}
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </motion.div>
      )}
    </motion.button>
  );
};

export default ColorSwatch;
