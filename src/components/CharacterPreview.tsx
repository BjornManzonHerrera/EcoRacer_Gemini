import { motion } from "framer-motion";

interface CharacterPreviewProps {
  gender: "boy" | "girl";
  skinTone: string;
  hairStyle: string;
}

const CharacterPreview = ({ gender, skinTone, hairStyle }: CharacterPreviewProps) => {
  // Map skinTone id to image path
  const getSkinImage = () => {
    const prefix = gender === "boy" ? "male" : "female";
    const basePath = gender === "boy" ? "/assets/avatar/male" : "/assets/avatar";
    return `${basePath}/${prefix}-${skinTone}.png`;
  };

  // Map hairStyle id to image path
  const getHairImage = () => {
    const prefix = gender === "boy" ? "male" : "female";
    const basePath = gender === "boy" ? "/assets/avatar/male" : "/assets/avatar";
    return `${basePath}/${prefix}-${hairStyle}-hair.png`;
  };

  return (
    <motion.div
      className="relative w-full max-w-xs mx-auto"
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className="relative aspect-square rounded-3xl overflow-hidden bg-gradient-to-br from-eco-light/30 to-accent-light/30"
        style={{ filter: "drop-shadow(0 10px 20px rgba(0,0,0,0.15))" }}
      >
        {/* Base layer: Skin tone */}
        <motion.img
          key={`skin-${gender}-${skinTone}`}
          src={getSkinImage()}
          alt="Character base"
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        />

        {/* Middle layer: Hair style */}
        <motion.img
          key={`hair-${gender}-${hairStyle}`}
          src={getHairImage()}
          alt="Character hair"
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.1 }}
        />

        {/* Top layer: Helmet */}
        <motion.img
          src="/assets/avatar/helmet.png"
          alt="Helmet"
          className="absolute inset-0 w-full h-full object-contain"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, delay: 0.2 }}
          style={{
            transform: `translateY(${gender === 'girl' ? '8%' : '0%'}) scale(0.65)`,
            transformOrigin: "top center"
          }}
        />
      </div>
    </motion.div>
  );
};

export default CharacterPreview;
