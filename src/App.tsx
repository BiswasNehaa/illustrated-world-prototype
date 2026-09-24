import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import OpeningScene from "./scenes/OpeningScene";
import VillageScene from "./scenes/VillageScene";

// Phase 2: the opening scene now hands off into Neha's World — the village map.
// Destinations (house/studio/lab/archive/theatre) are placeholders only for now.
// See src/scenes/WorldStage.tsx and friends for the earlier SVG-based prototype,
// kept around unwired for reference.
type Phase = "opening" | "village";

function App() {
  const [phase, setPhase] = useState<Phase>("opening");

  return (
    <>
      <AnimatePresence>
        {phase === "opening" && (
          <motion.div key="opening" exit={{ opacity: 0 }} transition={{ duration: 1 }} className="fixed inset-0 z-10">
            <OpeningScene onArrived={() => setPhase("village")} />
          </motion.div>
        )}
      </AnimatePresence>

      {phase === "village" && <VillageScene />}
    </>
  );
}

export default App;
