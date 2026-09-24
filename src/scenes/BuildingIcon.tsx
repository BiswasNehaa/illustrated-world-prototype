import type { LocationId } from "../data/locations";

export default function BuildingIcon({ id }: { id: LocationId }) {
  switch (id) {
    case "house":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]">
          <polygon points="30,95 100,45 170,95 155,95 155,170 45,170 45,95" fill="#3a2a1e" />
          <polygon points="30,98 100,50 170,98 100,58" fill="#c1683f" />
          <rect x="55" y="110" width="40" height="34" fill="#f0c26b" opacity="0.95" />
          <rect x="112" y="120" width="26" height="50" fill="#241a12" />
        </svg>
      );
    case "studio":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]">
          <rect x="30" y="60" width="140" height="110" fill="#20302f" />
          <rect x="45" y="80" width="110" height="70" fill="#e8b968" opacity="0.85" />
          <rect x="30" y="52" width="140" height="10" fill="#173534" />
        </svg>
      );
    case "archive":
      return (
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-[0_10px_14px_rgba(0,0,0,0.35)]">
          <rect x="40" y="95" width="120" height="75" fill="#cbb98c" />
          <circle cx="100" cy="95" r="60" fill="#a6926a" />
          <rect x="85" y="120" width="30" height="50" fill="#3a2a1e" />
        </svg>
      );
    case "theatre":
      return (
        <svg viewBox="0 0 200 260" className="w-full h-full drop-shadow-[0_10px_18px_rgba(0,0,0,0.4)]">
          <rect x="35" y="90" width="130" height="150" fill="#1c1712" />
          <rect x="92" y="10" width="16" height="95" fill="#e8b968" />
          <polygon points="35,90 165,90 150,60 50,60" fill="#241a12" />
          <rect x="60" y="150" width="80" height="10" fill="#e8b968" opacity="0.9" />
        </svg>
      );
  }
}
