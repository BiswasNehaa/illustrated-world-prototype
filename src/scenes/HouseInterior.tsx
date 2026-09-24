import { motion } from "framer-motion";
import { profile } from "../data/profile";

export default function HouseInterior({ onReturn }: { onReturn: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-30 overflow-hidden"
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <linearGradient id="roomWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#5a4230" />
            <stop offset="100%" stopColor="#2c2015" />
          </linearGradient>
          <radialGradient id="windowGlow" cx="50%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#f8dfa0" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#c1683f" stopOpacity="0.5" />
          </radialGradient>
        </defs>
        <rect width="1600" height="900" fill="url(#roomWall)" />
        <rect x="950" y="120" width="500" height="560" rx="8" fill="url(#windowGlow)" />
        <rect x="950" y="120" width="500" height="560" rx="8" fill="none" stroke="#1c130c" strokeWidth="18" />
        <rect x="1195" y="120" width="10" height="560" fill="#1c130c" />
        <rect x="950" y="395" width="500" height="10" fill="#1c130c" />
        <rect x="120" y="620" width="420" height="18" fill="#241a12" />
        <rect x="150" y="480" width="120" height="140" fill="#3a2a1c" />
        <rect x="290" y="560" width="220" height="60" fill="#241a12" />
      </svg>

      <div className="absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-charcoal/30" />

      <div className="relative z-10 h-full flex flex-col items-start justify-center px-8 md:px-20 max-w-2xl">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-display text-4xl md:text-6xl text-cream mb-2"
        >
          {profile.name}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="font-display italic text-lg md:text-2xl text-gold mb-1"
        >
          {profile.role}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="text-cream/70 text-sm md:text-base mb-6"
        >
          {profile.roleLine}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-cream/85 leading-relaxed max-w-lg"
        >
          {profile.intro}
        </motion.p>
      </div>

      <button
        onClick={onReturn}
        className="focus-ring absolute bottom-8 left-8 md:left-20 z-10 font-display italic text-cream/70 hover:text-cream text-base flex items-center gap-2"
      >
        &larr; Return to world
      </button>
    </motion.div>
  );
}
