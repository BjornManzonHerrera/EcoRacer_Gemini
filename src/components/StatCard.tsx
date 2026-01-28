import { motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';

interface StatCardProps {
  icon?: LucideIcon;
  image?: string;
  label: string;
  value: string | number;
  unit?: string;
  delay?: number;
  gradient?: boolean;
}

export function StatCard({ icon: Icon, image, label, value, unit, delay = 0, gradient = false }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4 }}
      className={`racing-card ${gradient ? 'racing-card-glow' : ''}`}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-lg bg-primary/10">
          {image ? (
            <img src={image} alt={label} className="w-5 h-5 object-contain" />
          ) : (
            Icon && <Icon className="w-5 h-5 text-primary" />
          )}
        </div>
        <div>
          <p className="text-xs text-muted-foreground uppercase tracking-wider">{label}</p>
          <p className="text-xl font-display font-bold">
            {value}
            {unit && <span className="text-sm text-muted-foreground ml-1">{unit}</span>}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
