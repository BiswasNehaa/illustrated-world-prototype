import { useRef, useState, type PointerEvent } from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { villageLocations, type VillageLocationId } from "../data/villageLocations";
import VillageHotspot from "./VillageHotspot";
import DestinationPlaceholder from "./DestinationPlaceholder";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { useIsTouch } from "../hooks/useIsTouch";

type Stage = "entering" | "idle" | "zooming" | "destination" | "returning";

export default function VillageScene() {
  const [stage, setStage] = useState<Stage>("entering");
  const [zoomTarget, setZoomTarget] = useState<VillageLocationId | null>(null);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();
  const containerRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const driftX = useTransform(px, [-1, 1], [-8, 8]);
  const driftY = useTransform(py, [-1, 1], [-5, 5]);

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (isTouch || reducedMotion || stage !== "idle") return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    px.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    py.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const handleSelect = (id: VillageLocationId) => {
    setZoomTarget(id);
    setStage("zooming");
  };

  const handleReturn = () => {
    setStage("returning");
  };

  const target = zoomTarget ? villageLocations.find((l) => l.id === zoomTarget) : null;
  const origin = target ? `${target.x}% ${target.y}%` : "50% 50%";
  const zoomedIn = stage === "zooming" || stage === "destination";

  return (
    <div
      ref={containerRef}
      onPointerMove={onPointerMove}
      className="fixed inset-0 bg-black overflow-hidden"
    >
      <motion.div
        className="absolute inset-0"
        style={{ transformOrigin: origin }}
        initial={{ opacity: 0, scale: 1.03 }}
        animate={
          zoomedIn
            ? { opacity: 1, scale: 1.55, filter: "blur(1px)" }
            : { opacity: 1, scale: 1, filter: "blur(0px)" }
        }
        transition={
          stage === "zooming" || stage === "returning"
            ? { duration: reducedMotion ? 0.25 : 0.95, ease: [0.65, 0, 0.35, 1] }
            : { duration: reducedMotion ? 0.3 : 1.7, ease: [0.16, 1, 0.3, 1] }
        }
        onAnimationComplete={() => {
          if (stage === "entering") setStage("idle");
          if (stage === "zooming") setStage("destination");
          if (stage === "returning") {
            setStage("idle");
            setZoomTarget(null);
          }
        }}
      >
        <motion.img
          src="/images/village-scene.webp"
          alt=""
          aria-hidden="true"
          fetchPriority="high"
          style={{
            position: "absolute",
            inset: -20,
            width: "calc(100% + 40px)",
            height: "calc(100% + 40px)",
            objectFit: "cover",
            objectPosition: "50% 42%",
            x: reducedMotion || isTouch ? 0 : driftX,
            y: reducedMotion || isTouch ? 0 : driftY,
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: zoomedIn
            ? `radial-gradient(ellipse at ${origin}, transparent 25%, rgba(0,0,0,0.5) 100%)`
            : "linear-gradient(to bottom, rgba(0,0,0,0.18) 0%, transparent 18%, transparent 75%, rgba(0,0,0,0.22) 100%)",
          transition: "background 1s ease",
        }}
      />

      {stage === "idle" &&
        villageLocations.map((loc) => (
          <VillageHotspot key={loc.id} id={loc.id} onSelect={handleSelect} disabled={false} isTouch={isTouch} />
        ))}

      {stage === "destination" && zoomTarget && (
        <DestinationPlaceholder id={zoomTarget} onReturn={handleReturn} />
      )}
    </div>
  );
}
