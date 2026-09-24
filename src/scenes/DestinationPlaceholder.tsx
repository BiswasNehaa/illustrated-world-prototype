import { motion } from "framer-motion";
import { villageLocations, type VillageLocationId } from "../data/villageLocations";

export default function DestinationPlaceholder({
  id,
  onReturn,
}: {
  id: VillageLocationId;
  onReturn: () => void;
}) {
  const loc = villageLocations.find((l) => l.id === id)!;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-40 bg-black flex flex-col items-center justify-center text-center px-6"
    >
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="font-mono text-[11px] uppercase tracking-[0.35em] text-white/60 mb-4"
      >
        Coming next
      </motion.p>
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="font-display italic text-3xl md:text-5xl text-white"
      >
        The {loc.label}
      </motion.p>

      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.8 }}
        onClick={onReturn}
        className="focus-ring mt-12 font-display italic text-white/70 hover:text-white text-base inline-flex items-center gap-2"
      >
        &larr; Back to the world
      </motion.button>
    </motion.div>
  );
}
