import { useEffect } from "react";
import { motion } from "framer-motion";

export default function Loading({ onDone }: { onDone: () => void }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1100);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 bg-charcoal flex items-center justify-center"
    >
      <motion.p
        animate={{ opacity: [0.35, 1, 0.35] }}
        transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
        className="font-display italic text-lg text-cream/70 tracking-wide"
      >
        entering a world&hellip;
      </motion.p>
    </motion.div>
  );
}
