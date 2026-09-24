import { motion } from "framer-motion";

export default function IntroOverlay({ onEnter }: { onEnter: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="absolute inset-0 z-20 flex flex-col items-center text-center px-6 pt-20 md:pt-28 pointer-events-none"
    >
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="font-display text-4xl md:text-6xl text-cream drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)]"
      >
        Neha Biswas
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="font-display italic text-lg md:text-xl text-cream/85 mt-3 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]"
      >
        A digital world of things I build
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2 }}
        onClick={onEnter}
        className="focus-ring pointer-events-auto mt-10 px-8 py-3.5 rounded-full border border-cream/50 text-cream font-display italic text-lg hover:bg-cream/10 hover:border-cream transition-colors backdrop-blur-sm"
      >
        Enter &rarr;
      </motion.button>
    </motion.div>
  );
}
