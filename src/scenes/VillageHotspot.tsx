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
      <motion.span
        animate={{
          opacity: active ? 1 : 0,
          scale: active ? 1 : 0.85,
          boxShadow: active ? "0 0 26px 10px rgba(255,244,210,0.22)" : "0 0 0px 0px rgba(255,244,210,0)",
        }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 rounded-full"
      />

      <motion.div
        initial={false}
        animate={{ opacity: active ? 1 : 0, y: active ? 0 : 6 }}
        transition={{ duration: 0.3 }}
        className="pointer-events-none absolute bottom-full mb-2 whitespace-nowrap text-center"
      >
        <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
          {loc.label}
        </p>
        <p className="font-display italic text-[11px] text-white/85 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] -mt-0.5">
          {loc.subtitle}
        </p>
      </motion.div>
    </motion.button>
  );
}
