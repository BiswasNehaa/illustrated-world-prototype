import { useState } from "react";
import { motion } from "framer-motion";
import type { LocationId } from "../data/locations";
import { locations } from "../data/locations";
import BuildingIcon from "./BuildingIcon";

export default function LocationMarker({
  id,
  onSelect,
  disabled,
  isTouch,
}: {
  id: LocationId;
  onSelect: (id: LocationId) => void;
  disabled: boolean;
  isTouch: boolean;
}) {
  const loc = locations.find((l) => l.id === id)!;
  const [hovered, setHovered] = useState(false);
  const showLabel = isTouch ? hovered : hovered;

  const scale = id === "theatre" ? 0.9 : id === "house" ? 1.15 : 1;
  const width = id === "theatre" ? "6.5%" : "8.5%";

  return (
    <motion.button
      onClick={() => !disabled && onSelect(id)}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)}
      disabled={disabled}
      className="focus-ring absolute -translate-x-1/2 -translate-y-full"
      style={{ left: `${loc.x}%`, top: `${loc.y}%`, width }}
      animate={{ scale: hovered && !disabled ? scale * 1.06 : scale }}
      transition={{ type: "spring", stiffness: 260, damping: 18 }}
      aria-label={`${loc.label} — ${loc.prompt}`}
    >
      <BuildingIcon id={id} />
      {showLabel && (
        <motion.span
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 -top-9 whitespace-nowrap font-display italic text-sm md:text-base text-cream drop-shadow-[0_2px_6px_rgba(0,0,0,0.6)]"
        >
          {loc.label} — {loc.prompt}
        </motion.span>
      )}
    </motion.button>
  );
}
