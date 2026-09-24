import { motion } from "framer-motion";
import { locations, type LocationId } from "../data/locations";

export default function PlaceholderInterior({ id, onReturn }: { id: LocationId; onReturn: () => void }) {
  const loc = locations.find((l) => l.id === id)!;
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.7 }}
      className="fixed inset-0 z-30 bg-charcoal flex flex-col items-center justify-center text-center px-6"
    >
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold/70 mb-4">{loc.label}</p>
      <p className="font-display text-3xl md:text-5xl text-cream mb-3">Not built in this prototype</p>
      <p className="text-cream/60 max-w-md">
        This location is part of the world map but its scene isn't drawn yet — this prototype only fleshes
        out The House and The Theatre.
      </p>
      <button
        onClick={onReturn}
        className="focus-ring mt-10 font-display italic text-cream/70 hover:text-cream text-base"
      >
        &larr; Return to world
      </button>
    </motion.div>
  );
}
