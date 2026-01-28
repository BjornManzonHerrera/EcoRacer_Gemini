import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useGame } from "@/contexts/GameContext";
import CharacterPreview from "@/components/CharacterPreview";
import CustomizationSection from "@/components/CustomizationSection";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const SKIN_TONES = [
  { id: "pale", label: "Pale" },
  { id: "light-brown", label: "Light Brown" },
  { id: "brown", label: "Brown" },
];

const HAIR_STYLES = [
  { id: "short", label: "Short Hair" },
  { id: "long", label: "Long Hair" },
];

const CharacterCustomization = () => {
  const { user, saveCharacter } = useGame();
  const [character, setCharacter] = useState({
    gender: user.gender,
    skinTone: user.skinTone || "pale",
    hairStyle: user.hairStyle || "short",
  });
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    setCharacter({
      gender: user.gender,
      skinTone: user.skinTone || "pale",
      hairStyle: user.hairStyle || "short",
    });
  }, [user]);

  const handleRandomize = () => {
    const randomGender = Math.random() > 0.5 ? "boy" : "girl";
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id;
    const randomHair = HAIR_STYLES[Math.floor(Math.random() * HAIR_STYLES.length)].id;

    setCharacter({
      gender: randomGender,
      skinTone: randomSkin,
      hairStyle: randomHair,
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

  // Get preview images for skin tone selection
  const getSkinPreviewImage = (skinId: string) => {
    const prefix = character.gender === "boy" ? "male" : "female";
    const basePath = character.gender === "boy" ? "/assets/avatar/male" : "/assets/avatar";
    return `${basePath}/${prefix}-${skinId}.png`;
  };

  // Get preview images for hair style selection
  const getHairPreviewImage = (hairId: string) => {
    const prefix = character.gender === "boy" ? "male" : "female";
    const basePath = character.gender === "boy" ? "/assets/avatar/male" : "/assets/avatar";
    return `${basePath}/${prefix}-${hairId}-hair.png`;
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
                hairStyle={character.hairStyle}
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
            <div className="flex gap-3 justify-center">
              {[
                { id: "boy", label: "Male", emoji: "👦" },
                { id: "girl", label: "Female", emoji: "👧" },
              ].map((option) => (
                <motion.button
                  key={option.id}
                  onClick={() => setCharacter(c => ({ ...c, gender: option.id as "boy" | "girl" }))}
                  className={`flex-1 p-4 rounded-xl border-2 transition-all ${character.gender === option.id
                      ? "border-primary bg-primary/10"
                      : "border-border bg-card hover:border-primary/50"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl mb-2 block">{option.emoji}</span>
                  <span className="text-sm font-medium">{option.label}</span>
                </motion.button>
              ))}
            </div>
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
            <div className="flex gap-3 justify-center">
              {SKIN_TONES.map((tone) => (
                <motion.button
                  key={tone.id}
                  onClick={() => setCharacter(c => ({ ...c, skinTone: tone.id }))}
                  className={`relative w-20 h-20 rounded-xl border-2 overflow-hidden transition-all ${character.skinTone === tone.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/50"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={getSkinPreviewImage(tone.id)}
                    alt={tone.label}
                    className="w-full h-full object-cover object-top"
                  />
                  {character.skinTone === tone.id && (
                    <motion.div
                      className="absolute inset-0 bg-primary/20 flex items-center justify-center"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
              ))}
            </div>
          </CustomizationSection>

          {/* Hair Style */}
          <CustomizationSection
            title="Hair Style"
            icon={
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            }
          >
            <div className="flex gap-3 justify-center">
              {HAIR_STYLES.map((style) => (
                <motion.button
                  key={style.id}
                  onClick={() => setCharacter(c => ({ ...c, hairStyle: style.id }))}
                  className={`relative w-24 h-24 rounded-xl border-2 overflow-hidden transition-all ${character.hairStyle === style.id
                      ? "border-primary ring-2 ring-primary/30"
                      : "border-border hover:border-primary/50"
                    }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <img
                    src={getHairPreviewImage(style.id)}
                    alt={style.label}
                    className="w-full h-full object-cover object-top"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-black/60 py-1">
                    <span className="text-xs text-white">{style.label}</span>
                  </div>
                  {character.hairStyle === style.id && (
                    <motion.div
                      className="absolute top-1 right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                    >
                      <svg className="w-3 h-3 text-primary-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </motion.div>
                  )}
                </motion.button>
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
