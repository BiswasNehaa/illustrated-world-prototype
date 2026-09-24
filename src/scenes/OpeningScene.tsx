import { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useReducedMotion } from "../hooks/useReducedMotion";

// The path recedes toward roughly this point in the artwork — used as the
// zoom origin so "Enter" feels like walking forward into the scene.
const PATH_VANISHING_POINT = "54% 46%";

type Stage = "black" | "revealing" | "idle" | "entering" | "entered";

export default function OpeningScene() {
  const [stage, setStage] = useState<Stage>("black");
  const reducedMotion = useReducedMotion();
  const driftControls = useAnimation();
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setStage("revealing"), 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (stage !== "revealing") return;
    const t = setTimeout(() => setStage("idle"), reducedMotion ? 300 : 2600);
    return () => clearTimeout(t);
  }, [stage, reducedMotion]);

  // extremely subtle ambient drift once idle — a living-world feel, not a parallax gimmick
  useEffect(() => {
    if (stage !== "idle" || reducedMotion) return;
    driftControls.start({
      scale: [1, 1.012, 1],
      x: [0, -4, 0],
      transition: { duration: 26, repeat: Infinity, ease: "easeInOut" },
    });
  }, [stage, reducedMotion, driftControls]);

  const handleEnter = () => {
    driftControls.stop();
    setStage("entering");
  };

  return (
    <div className="fixed inset-0 bg-black overflow-hidden">
      <motion.img
        ref={imgRef}
        src="/images/enter-scene.webp"
        alt=""
        aria-hidden="true"
        fetchPriority="high"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={
          stage === "black"
            ? { opacity: 0, scale: 1.04 }
            : stage === "entering" || stage === "entered"
              ? { opacity: 1, scale: 1.22, filter: "blur(1.5px)" }
              : { opacity: 1, scale: 1 }
        }
        transition={
          stage === "entering" || stage === "entered"
            ? { duration: reducedMotion ? 0.4 : 2.1, ease: [0.65, 0, 0.35, 1] }
            : { duration: reducedMotion ? 0.3 : 2.4, ease: [0.16, 1, 0.3, 1] }
        }
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "56% 42%",
          transformOrigin: PATH_VANISHING_POINT,
        }}
        onAnimationComplete={() => {
          if (stage === "entering") setStage("entered");
        }}
      />

      {/* ambient drift layer, separate from the reveal/enter transforms */}
      {stage === "idle" && (
        <motion.div animate={driftControls} className="absolute inset-0 pointer-events-none" />
      )}

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            stage === "entering" || stage === "entered"
              ? "radial-gradient(ellipse at 54% 46%, transparent 30%, rgba(0,0,0,0.55) 100%)"
              : "linear-gradient(to bottom, rgba(0,0,0,0.15) 0%, transparent 20%, transparent 70%, rgba(0,0,0,0.2) 100%)",
          transition: "background 1.8s ease",
        }}
      />

      {(stage === "idle" || stage === "revealing") && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: stage === "idle" ? 1 : 0 }}
          exit={{ opacity: 0 }}
          className="absolute right-8 top-[16%] md:right-16 md:top-[18%] text-right max-w-xs md:max-w-sm px-4"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: stage === "idle" ? 1 : 0, y: stage === "idle" ? 0 : 10 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="font-display text-3xl md:text-5xl text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.45)] tracking-wide"
          >
            Neha Biswas
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: stage === "idle" ? 1 : 0, y: stage === "idle" ? 0 : 8 }}
            transition={{ duration: 1, delay: 0.7 }}
            className="font-mono text-[11px] md:text-xs uppercase tracking-[0.25em] text-white/85 mt-3 drop-shadow-[0_1px_6px_rgba(0,0,0,0.5)]"
          >
            AI Engineer &middot; RAG &amp; LLM Systems
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: stage === "idle" ? 1 : 0, y: stage === "idle" ? 0 : 8 }}
            transition={{ duration: 1, delay: 1.05 }}
            className="font-display italic text-sm md:text-base text-white/75 mt-4 leading-snug drop-shadow-[0_1px_8px_rgba(0,0,0,0.5)]"
          >
            Building systems,
            <br />
            exploring ideas.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: stage === "idle" ? 1 : 0, y: stage === "idle" ? 0 : 8 }}
            transition={{ duration: 1, delay: 1.5 }}
            onClick={handleEnter}
            disabled={stage !== "idle"}
            className="group focus-ring pointer-events-auto mt-8 font-display italic text-base md:text-lg text-white/90 hover:text-white inline-flex items-center gap-2"
          >
            <span className="border-b border-white/40 group-hover:border-white/90 transition-colors pb-0.5">
              Enter
            </span>
            <motion.span
              className="inline-block"
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              &rarr;
            </motion.span>
          </motion.button>
        </motion.div>
      )}

      {stage === "entered" && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <p className="font-display italic text-2xl md:text-3xl text-white drop-shadow-[0_2px_16px_rgba(0,0,0,0.6)]">
            Neha&rsquo;s World
          </p>
        </motion.div>
      )}
    </div>
  );
}
