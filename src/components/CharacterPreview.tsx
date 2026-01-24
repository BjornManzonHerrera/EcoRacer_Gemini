import { motion } from "framer-motion";

interface CharacterPreviewProps {
  gender: "boy" | "girl";
  skinTone: string;
  helmetColor: string;
}

const CharacterPreview = ({ gender, skinTone, helmetColor }: CharacterPreviewProps) => {
  const jerseyColor = "#10B981";
  // const shortsColor = "#1F2937";
  const bikeColor = "#374151";
  
  return (
    <motion.div 
      className="relative w-full max-w-xs mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <svg
        viewBox="0 0 200 200"
        className="w-full h-auto drop-shadow-xl"
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }}
      >
        {/* Background circle */}
        <circle cx="100" cy="100" r="95" fill="url(#bgGradient)" />
        
        {/* Gradient definitions */}
        <defs>
          <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
          <linearGradient id="helmetGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={helmetColor} />
            <stop offset="100%" stopColor={helmetColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>
        
        {/* Bike */}
        <g transform="translate(30, 85)">
          {/* Back wheel */}
          <circle cx="25" cy="70" r="22" fill="none" stroke={bikeColor} strokeWidth="4" />
          <circle cx="25" cy="70" r="3" fill={bikeColor} />
          {/* Spokes */}
          <line x1="25" y1="48" x2="25" y2="92" stroke={bikeColor} strokeWidth="1" />
          <line x1="3" y1="70" x2="47" y2="70" stroke={bikeColor} strokeWidth="1" />
          
          {/* Front wheel */}
          <circle cx="115" cy="70" r="22" fill="none" stroke={bikeColor} strokeWidth="4" />
          <circle cx="115" cy="70" r="3" fill={bikeColor} />
          {/* Spokes */}
          <line x1="115" y1="48" x2="115" y2="92" stroke={bikeColor} strokeWidth="1" />
          <line x1="93" y1="70" x2="137" y2="70" stroke={bikeColor} strokeWidth="1" />
          
          {/* Frame */}
          <path d="M25 70 L60 35 L95 70 L60 35 L60 70 L25 70" fill="none" stroke={bikeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="95" y1="70" x2="115" y2="70" stroke={bikeColor} strokeWidth="4" />
          
          {/* Handlebars */}
          <path d="M95 35 Q105 30 115 35" fill="none" stroke={bikeColor} strokeWidth="3" strokeLinecap="round" />
          <line x1="60" y1="35" x2="95" y2="35" stroke={bikeColor} strokeWidth="4" />
          
          {/* Seat */}
          <ellipse cx="45" cy="28" rx="12" ry="5" fill="#1F2937" />
          <line x1="45" y1="33" x2="60" y2="35" stroke={bikeColor} strokeWidth="3" />
          
          {/* Pedals */}
          <circle cx="60" cy="70" r="8" fill="none" stroke={bikeColor} strokeWidth="3" />
          <rect x="48" y="58" width="8" height="4" rx="1" fill={bikeColor} transform="rotate(30, 52, 60)" />
          <rect x="68" y="78" width="8" height="4" rx="1" fill={bikeColor} transform="rotate(30, 72, 80)" />
        </g>
        
        {/* Character body */}
        <g transform="translate(60, 45)">
          {/* Legs */}
          <motion.g
            key={skinTone}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left leg */}
            <path d="M30 55 Q25 70 18 85" fill="none" stroke={skinTone} strokeWidth="8" strokeLinecap="round" />
            {/* Right leg */}
            <path d="M45 55 Q55 70 48 85" fill="none" stroke={skinTone} strokeWidth="8" strokeLinecap="round" />
            {/* Shoes */}
            <ellipse cx="18" cy="88" rx="6" ry="4" fill="#1F2937" />
            <ellipse cx="48" cy="88" rx="6" ry="4" fill="#1F2937" />
          </motion.g>
          
          {/* Torso with jersey */}
          <ellipse cx="38" cy="45" rx="18" ry="20" fill={jerseyColor} />
          {/* Jersey stripes */}
          <path d="M22 40 Q38 35 54 40" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
          <path d="M24 50 Q38 45 52 50" fill="none" stroke="white" strokeWidth="2" opacity="0.6" />
          
          {/* Arms */}
          <motion.g
            key={skinTone + "-arms"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          >
            {/* Left arm */}
            <path d="M24 35 Q10 45 55 25" fill="none" stroke={skinTone} strokeWidth="6" strokeLinecap="round" />
            {/* Right arm */}
            <path d="M52 35 Q65 40 75 25" fill="none" stroke={skinTone} strokeWidth="6" strokeLinecap="round" />
            {/* Gloves */}
            <circle cx="55" cy="25" r="5" fill="#1F2937" />
            <circle cx="75" cy="25" r="5" fill="#1F2937" />
          </motion.g>
          
          {/* Neck */}
          <motion.rect 
            x="33" 
            y="18" 
            width="10" 
            height="8" 
            rx="3" 
            fill={skinTone}
            key={skinTone + "-neck"}
            initial={{ opacity: 0.5 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          
          {/* Head */}
          <motion.g
            key={gender + skinTone}
            initial={{ opacity: 0.5, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
          >
            <ellipse cx="38" cy="10" rx="16" ry="15" fill={skinTone} />
            
            {/* Face features */}
            <ellipse cx="32" cy="8" rx="2" ry="2.5" fill="#1F2937" />
            <ellipse cx="44" cy="8" rx="2" ry="2.5" fill="#1F2937" />
            <path d="M34 16 Q38 20 42 16" fill="none" stroke="#1F2937" strokeWidth="2" strokeLinecap="round" />
            
            {/* Cheeks */}
            <circle cx="26" cy="12" r="3" fill="#FBBF24" opacity="0.3" />
            <circle cx="50" cy="12" r="3" fill="#FBBF24" opacity="0.3" />
            
            {/* Hair based on gender */}
            {gender === "girl" ? (
              <>
                <path d="M22 0 Q38 -8 54 0 Q58 10 54 5 Q38 -2 22 5 Q18 10 22 0" fill="#8B5CF6" />
                <path d="M20 5 Q18 15 22 25" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
                <path d="M56 5 Q58 15 54 25" fill="none" stroke="#8B5CF6" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <path d="M24 -2 Q38 -10 52 -2 Q55 5 52 2 Q38 -5 24 2 Q21 5 24 -2" fill="#1F2937" />
            )}
          </motion.g>
          
          {/* Helmet */}
          <motion.g
            key={helmetColor}
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.15 }}
          >
            <ellipse cx="38" cy="-2" rx="20" ry="12" fill="url(#helmetGradient)" />
            <path d="M18 -2 Q18 -15 38 -15 Q58 -15 58 -2" fill={helmetColor} />
            {/* Helmet vents */}
            <ellipse cx="30" cy="-8" rx="3" ry="5" fill="white" opacity="0.3" />
            <ellipse cx="38" cy="-10" rx="3" ry="5" fill="white" opacity="0.3" />
            <ellipse cx="46" cy="-8" rx="3" ry="5" fill="white" opacity="0.3" />
            {/* Helmet strap */}
            <path d="M22 5 Q20 12 25 18" fill="none" stroke={helmetColor} strokeWidth="2" opacity="0.8" />
            <path d="M54 5 Q56 12 51 18" fill="none" stroke={helmetColor} strokeWidth="2" opacity="0.8" />
          </motion.g>
        </g>
        
        {/* Speed lines */}
        <g opacity="0.4">
          <line x1="10" y1="100" x2="25" y2="100" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <line x1="5" y1="110" x2="20" y2="110" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
          <line x1="10" y1="120" x2="22" y2="120" stroke="#10B981" strokeWidth="2" strokeLinecap="round" />
        </g>
      </svg>
    </motion.div>
  );
};

export default CharacterPreview;
