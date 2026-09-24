# Illustrated World — Prototype

A visual/interaction prototype for Neha Biswas's portfolio: instead of a generated 3D environment,
this tests whether a full-screen illustrated 2D scene can feel spatial using layered parallax,
cursor depth, and cinematic zoom transitions — built with React, TypeScript, Framer Motion, and CSS/SVG.
No Three.js.

**This is intentionally incomplete.** It exists to evaluate the visual direction before deciding
whether to build the rest of the portfolio around it.

## The flow

Loading → intro title over the world → **Enter** → an illustrated coastal landscape with four
clickable locations (House, Studio, Archive, Theatre) → click a location → the "camera" zooms
toward it → crossfade into an interior scene → **Return to world** → click Theatre → zoom → dark
cinema interior with a placeholder screen.

Only **The House** (about) and **The Theatre** (finale) have real interior scenes built out. Studio
and Archive show an honest "not built in this prototype" placeholder — the point of this pass is
the interaction model, not full content.

## What's real vs. a stand-in

- The interaction system (parallax, hover labels, zoom-to-location, scene crossfades, tap support
  on touch devices, `prefers-reduced-motion` handling) is fully implemented and testable.
- The artwork is hand-built layered SVG in the target palette (cream / sage / teal / terracotta /
  gold), not the AI-illustrated art originally requested. Real illustrated images were generated
  for reference (a landscape, a house interior, a theatre interior) but couldn't be pulled into
  this codebase at full resolution — swap them in once available and the interaction layer
  underneath doesn't need to change.

## Getting started

```bash
npm install
npm run dev
```

## Known rough edges

- Mobile composition needs its own tuned layout — the current scene is a straight aspect-ratio
  reflow of the desktop version, not a purpose-built mobile framing.
- Location marker positions are percentage-based against the viewport, so they can drift slightly
  out of alignment with the backdrop art at aspect ratios far from 16:9.
