import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/contexts/GameContext";
import CharacterPreview from "@/components/CharacterPreview";
import ColorSwatch from "@/components/ColorSwatch";
import GenderToggle from "@/components/GenderToggle";
import CustomizationSection from "@/components/CustomizationSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SKIN_TONES = [
  { id: "light", color: "#FFE4C4", label: "Light" },
  { id: "medium-light", color: "#F5DEB3", label: "Medium Light" },
  { id: "medium", color: "#DEB887", label: "Medium" },
  { id: "medium-dark", color: "#CD853F", label: "Medium Dark" },
  { id: "dark", color: "#8B4513", label: "Dark" },
  { id: "very-dark", color: "#5D3A1A", label: "Very Dark" },
];

const HELMET_COLORS = [
  { id: "red", color: "#EF4444", label: "Red" },
  { id: "blue", color: "#3B82F6", label: "Blue" },
  { id: "green", color: "#10B981", label: "Green" },
  { id: "yellow", color: "#F59E0B", label: "Yellow" },
  { id: "purple", color: "#8B5CF6", label: "Purple" },
  { id: "orange", color: "#F97316", label: "Orange" },
  { id: "pink", color: "#EC4899", label: "Pink" },
  { id: "black", color: "#1F2937", label: "Black" },
  { id: "white", color: "#FFFFFF", label: "White" },
  { id: "silver", color: "#9CA3AF", label: "Silver" },
];

const CharacterCustomization = () => {
  const { user, saveCharacter } = useGame();
  const [character, setCharacter] = useState({
    gender: user.gender,
    skinTone: user.skinTone,
    helmetColor: user.helmetColor,
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setCharacter({
      gender: user.gender,
      skinTone: user.skinTone,
      helmetColor: user.helmetColor,
    });
  }, [user]);


  const handleRandomize = () => {
    const randomGender = Math.random() > 0.5 ? "boy" : "girl";
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].color;
    const randomHelmet = HELMET_COLORS[Math.floor(Math.random() * HELMET_COLORS.length)].color;
    
    setCharacter({
      gender: randomGender,
      skinTone: randomSkin,
      helmetColor: randomHelmet,
    });
    
    toast("🎲 Random character generated!", {
      duration: 2000,
    });
  };

  const handleSave = async () => {
    await saveCharacter(character);
    
    setIsSaved(true);
    toast.success("Your eco-racer is ready! 🚴‍♂️", {
      description: "Character saved successfully",
      duration: 3000,
    });
    
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.header 
        className="sticky top-0 z-10 bg-background/80 backdrop-blur-lg border-b border-border/50"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="container max-w-md mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-foreground">Create Your Racer</h1>
              <p className="text-xs text-muted-foreground">EcoLap Challenge</p>
            </div>
            <motion.button
              onClick={handleRandomize}
              className="p-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              aria-label="Randomize character"
            >
              <svg className="w-5 h-5 text-secondary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Main content */}
      <main className="container max-w-md mx-auto px-4 py-6 pb-32">
        {/* Character Preview */}
        <motion.div 
          className="mb-8"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-b from-eco-light/30 to-accent-light/30 rounded-3xl blur-2xl" />
            <div className="relative bg-gradient-to-br from-eco-light/50 to-accent-light/50 rounded-3xl p-6 border border-border/30">
              <CharacterPreview
                gender={character.gender}
                skinTone={character.skinTone}
                helmetColor={character.helmetColor}
              />
            </div>
          </div>
        </motion.div>

        {/* Customization Options */}
        <div className="space-y-4">
          {/* Gender Selection */}
          <CustomizationSection
            title="Character Type"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            }
          >
            <GenderToggle value={character.gender} onChange={(gender) => setCharacter(c => ({ ...c, gender }))} />
          </CustomizationSection>

          {/* Skin Tone */}
          <CustomizationSection
            title="Skin Tone"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {SKIN_TONES.map((tone) => (
                <ColorSwatch
                  key={tone.id}
                  color={tone.color}
                  isSelected={character.skinTone === tone.color}
                  onClick={() => setCharacter(c => ({ ...c, skinTone: tone.color }))}
                  label={tone.label}
                  size="lg"
                />
              ))}
            </div>
          </CustomizationSection>

          {/* Helmet Color */}
          <CustomizationSection
            title="Helmet Color"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
          >
            <div className="flex flex-wrap gap-3 justify-center">
              {HELMET_COLORS.map((color) => (
                <ColorSwatch
                  key={color.id}
                  color={color.color}
                  isSelected={character.helmetColor === color.color}
                  onClick={() => setCharacter(c => ({ ...c, helmetColor: color.color }))}
                  label={color.label}
                  size="md"
                />
              ))}
            </div>
          </CustomizationSection>
        </div>
      </main>

      {/* Fixed bottom button */}
      <motion.div 
        className="fixed bottom-0 left-0 right-0 p-4 bg-background/80 backdrop-blur-lg border-t border-border/50"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="container max-w-md mx-auto">
          <Button
            onClick={handleSave}
            size="lg"
            className="w-full h-14 text-base font-semibold rounded-2xl shadow-lg shadow-primary/20"
            disabled={isSaved}
          >
            <AnimatePresence mode="wait">
              {isSaved ? (
                <motion.span
                  key="saved"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Saved!
                </motion.span>
              ) : (
                <motion.span
                  key="save"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Save Character
                </motion.span>
              )}
            </AnimatePresence>
          </Button>
        </div>
      </motion.div>
    </div>
  );
};


export default CharacterCustomization;
