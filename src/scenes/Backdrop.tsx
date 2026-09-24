import { motion, useTransform, type MotionValue } from "framer-motion";

export default function Backdrop({
  px,
  py,
  disableParallax,
}: {
  px: MotionValue<number>;
  py: MotionValue<number>;
  disableParallax: boolean;
}) {
  const layer = (depth: number) => {
    if (disableParallax) return { x: 0, y: 0 };
    return {
      x: useTransform(px, [-1, 1], [-depth, depth]),
      y: useTransform(py, [-1, 1], [-depth * 0.35, depth * 0.35]),
    };
  };

  const sky = layer(4);
  const far = layer(14);
  const mid = layer(28);
  const near = layer(46);

  return (
    <svg
      viewBox="0 0 1600 900"
      preserveAspectRatio="xMidYMid slice"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#f4ecd8" />
          <stop offset="55%" stopColor="#f2dcaa" />
          <stop offset="100%" stopColor="#eab875" />
        </linearGradient>
        <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff3d6" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#f8d894" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#f8d894" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="seaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#e8b968" />
          <stop offset="18%" stopColor="#3f7a74" />
          <stop offset="100%" stopColor="#204c4c" />
        </linearGradient>
        <linearGradient id="hillFar" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8fa06f" />
          <stop offset="100%" stopColor="#79905f" />
        </linearGradient>
        <linearGradient id="hillMid" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#6f8a52" />
          <stop offset="100%" stopColor="#5c7844" />
        </linearGradient>
        <linearGradient id="hillNear" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#4f6a3c" />
          <stop offset="100%" stopColor="#3c5430" />
        </linearGradient>
        <filter id="soften" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="6" />
        </filter>
      </defs>

      {/* sky */}
      <motion.g style={sky}>
        <rect x="0" y="0" width="1600" height="620" fill="url(#skyGrad)" />
        <circle cx="1150" cy="330" r="260" fill="url(#sunGlow)" />
      </motion.g>

      {/* sea */}
      <motion.g style={far}>
        <rect x="0" y="470" width="1600" height="150" fill="url(#seaGrad)" />
      </motion.g>

      {/* far hill */}
      <motion.g style={far}>
        <path
          d="M0,560 C220,500 420,540 640,505 C880,468 1080,520 1300,480 C1420,458 1520,470 1600,455 L1600,900 L0,900 Z"
          fill="url(#hillFar)"
          opacity="0.85"
          filter="url(#soften)"
        />
      </motion.g>

      {/* mid hill */}
      <motion.g style={mid}>
        <path
          d="M0,650 C260,600 460,640 700,605 C940,570 1140,615 1360,580 C1460,565 1540,575 1600,560 L1600,900 L0,900 Z"
          fill="url(#hillMid)"
        />
      </motion.g>

      {/* near hill / ground */}
      <motion.g style={near}>
        <path
          d="M0,760 C180,715 340,745 520,720 C760,690 900,745 1140,715 C1320,692 1460,725 1600,700 L1600,900 L0,900 Z"
          fill="url(#hillNear)"
        />
        {/* winding path */}
        <path
          d="M660,900 C620,820 520,780 470,730 C420,682 480,640 560,610 C660,575 760,560 860,540"
          stroke="#e9dcb8"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
        <path
          d="M660,900 C620,820 520,780 470,730 C420,682 480,640 560,610 C660,575 760,560 860,540"
          stroke="#d8c79a"
          strokeWidth="34"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
          strokeDasharray="2 26"
        />

        {/* scattered flowers */}
        {[
          [180, 800], [260, 840], [340, 790], [980, 820], [1080, 780],
          [1200, 830], [140, 700], [1360, 760], [1460, 800], [760, 860],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r={i % 2 === 0 ? 6 : 4.5} fill={i % 3 === 0 ? "#e8b968" : "#c1683f"} opacity="0.85" />
        ))}
      </motion.g>
    </svg>
  );
}
