import { useRef, type PointerEvent } from "react";
import { motion, useMotionValue } from "framer-motion";
import Backdrop from "./Backdrop";
import LocationMarker from "./LocationMarker";
import type { LocationId } from "../data/locations";
import { locations } from "../data/locations";

export default function WorldStage({
  zoomTarget,
  entered,
  interactive,
  onSelect,
  reducedMotion,
  isTouch,
}: {
  zoomTarget: LocationId | null;
  entered: boolean;
  interactive: boolean;
  onSelect: (id: LocationId) => void;
  reducedMotion: boolean;
  isTouch: boolean;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const px = useMotionValue(0);
  const py = useMotionValue(0);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const target = zoomTarget ? locations.find((l) => l.id === zoomTarget) : null;
  const scale = target ? 2.3 : entered ? 1.12 : 1;
  const origin = target ? `${target.x}% ${target.y}%` : "50% 65%";

  return (
    <div ref={containerRef} onPointerMove={onPointerMove} className="absolute inset-0 overflow-hidden bg-charcoal">
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: origin }}
        animate={{ scale: reducedMotion ? (target ? 1.4 : 1) : scale }}
        transition={{ duration: reducedMotion ? 0.3 : target ? 1.0 : 1.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <Backdrop px={px} py={py} disableParallax={isTouch || reducedMotion} />

        {locations.map((loc) => (
          <LocationMarker
            key={loc.id}
            id={loc.id}
            onSelect={onSelect}
            disabled={!interactive}
            isTouch={isTouch}
          />
        ))}
      </motion.div>

      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-charcoal/25 via-transparent to-charcoal/40" />
    </div>
  );
}
