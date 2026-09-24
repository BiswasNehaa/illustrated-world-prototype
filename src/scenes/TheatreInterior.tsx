import { motion } from "framer-motion";

export default function TheatreInterior({ onReturn }: { onReturn: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.9 }}
      className="fixed inset-0 z-30 overflow-hidden bg-[#0c0906]"
    >
      <svg viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 w-full h-full" aria-hidden="true">
        <defs>
          <radialGradient id="screenGlow" cx="50%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#f8dfa0" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#c1683f" stopOpacity="0.25" />
          </radialGradient>
          <linearGradient id="curtain" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3a1414" />
            <stop offset="100%" stopColor="#1c0a0a" />
          </linearGradient>
        </defs>
        <rect width="1600" height="900" fill="#0c0906" />
        <rect x="0" y="0" width="220" height="900" fill="url(#curtain)" />
        <rect x="1380" y="0" width="220" height="900" fill="url(#curtain)" />
        <rect x="380" y="140" width="840" height="480" rx="6" fill="url(#screenGlow)" />
        <rect x="380" y="140" width="840" height="480" rx="6" fill="none" stroke="#1c130c" strokeWidth="14" />
        {Array.from({ length: 6 }).map((_, i) => (
          <rect key={i} x={340 + i * 20} y={700} width="920" height="8" fill="#1c130c" opacity={0.4 + i * 0.08} />
        ))}
      </svg>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute inset-0 flex flex-col items-center justify-center text-center px-6"
      >
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/80 mb-4">A prototype transition</p>
        <p className="font-display text-4xl md:text-6xl text-cream mb-8">The Story of Neha</p>
        <div className="w-full max-w-xl aspect-video rounded-lg border border-cream/15 bg-black/40 flex items-center justify-center">
          <span className="font-mono text-xs uppercase tracking-widest text-cream/40">Film goes here</span>
        </div>
      </motion.div>

      <button
        onClick={onReturn}
        className="focus-ring absolute bottom-8 left-8 md:left-20 z-10 font-display italic text-cream/60 hover:text-cream text-base"
      >
        &larr; Return to world
      </button>
    </motion.div>
  );
}
