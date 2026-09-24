import { useState } from "react";
import { motion } from "framer-motion";
import type { VillageLocationId } from "../data/villageLocations";
import { villageLocations } from "../data/villageLocations";

export default function VillageHotspot({
  id,
  onSelect,
  disabled,
  isTouch,
}: {
  id: VillageLocationId;
  onSelect: (id: VillageLocationId) => void;
  disabled: boolean;
  isTouch: boolean;
}) {
  const loc = villageLocations.find((l) => l.id === id)!;
  const [active, setActive] = useState(false);

  return (
    <motion.button
      onClick={() => !disabled && onSelect(id)}
      onMouseEnter={() => !isTouch && setActive(true)}
      onMouseLeave={() => !isTouch && setActive(false)}
      onTouchStart={() => setActive(true)}
      disabled={disabled}
      aria-label={`${loc.label} — ${loc.subtitle}`}
      className="focus-ring absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
      style={{ left: `${loc.x}%`, top: `${loc.y}%`, width: "9%", height: "9%" }}
    >
      {/* glow behind the marker, strengthens on hover */}
      <motion.span
        animate={{
          boxShadow: active
            ? "0 0 30px 12px rgba(255,244,210,0.28)"
            : "0 0 14px 4px rgba(255,244,210,0.12)",
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full"
      />

      {/* persistent marker — always visible so the location reads as clickable */}
      <motion.span
        animate={{
          scale: active ? 1.35 : [1, 1.12, 1],
          opacity: active ? 1 : 0.9,
        }}
        transition={
          active
            ? { duration: 0.3 }
            : { duration: 2.2, repeat: Infinity, ease: "easeInOut" }
        }
        className="relative w-2.5 h-2.5 rounded-full bg-white"
        style={{ boxShadow: "0 0 6px 2px rgba(255,255,255,0.9)" }}
      />
      <span className="absolute w-5 h-5 rounded-full border border-white/70" />

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute bottom-full mb-3 whitespace-nowrap text-center"
      >
        <p className="font-mono text-sm md:text-base font-bold uppercase tracking-[0.25em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)]">
          {loc.label}
        </p>
        <p className="font-display font-semibold not-italic text-sm md:text-base text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.95)] -mt-0.5">
          {loc.subtitle}
        </p>
      </motion.div>
    </motion.button>
  );
}
