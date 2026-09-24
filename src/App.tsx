import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import type { LocationId } from "./data/locations";
import { useReducedMotion } from "./hooks/useReducedMotion";
import { useIsTouch } from "./hooks/useIsTouch";
import Loading from "./scenes/Loading";
import IntroOverlay from "./scenes/IntroOverlay";
import WorldStage from "./scenes/WorldStage";
import HouseInterior from "./scenes/HouseInterior";
import TheatreInterior from "./scenes/TheatreInterior";
import PlaceholderInterior from "./scenes/PlaceholderInterior";

type Phase = "loading" | "intro" | "world";

function App() {
  const [phase, setPhase] = useState<Phase>("loading");
  const [zoomTarget, setZoomTarget] = useState<LocationId | null>(null);
  const [interiorOpen, setInteriorOpen] = useState(false);
  const reducedMotion = useReducedMotion();
  const isTouch = useIsTouch();

  const handleSelect = (id: LocationId) => {
    setZoomTarget(id);
    const delay = reducedMotion ? 250 : 950;
    setTimeout(() => setInteriorOpen(true), delay);
  };

  const handleReturn = () => {
    setInteriorOpen(false);
    setZoomTarget(null);
  };

  return (
    <div className="fixed inset-0 bg-charcoal">
      <AnimatePresence>{phase === "loading" && <Loading onDone={() => setPhase("intro")} />}</AnimatePresence>

      {phase !== "loading" && (
        <WorldStage
          zoomTarget={zoomTarget}
          entered={phase === "world"}
          interactive={phase === "world" && !interiorOpen}
          onSelect={handleSelect}
          reducedMotion={reducedMotion}
          isTouch={isTouch}
        />
      )}

      <AnimatePresence>
        {phase === "intro" && <IntroOverlay onEnter={() => setPhase("world")} />}
      </AnimatePresence>

      <AnimatePresence>
        {interiorOpen && zoomTarget === "house" && <HouseInterior onReturn={handleReturn} />}
        {interiorOpen && zoomTarget === "theatre" && <TheatreInterior onReturn={handleReturn} />}
        {interiorOpen && (zoomTarget === "studio" || zoomTarget === "archive") && (
          <PlaceholderInterior id={zoomTarget} onReturn={handleReturn} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
