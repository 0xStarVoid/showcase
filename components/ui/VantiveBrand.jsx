import VantiveLogo from "./VantiveLogo";

export default function VantiveBrand({ color = "currentColor", suffix = "", size = 16, className = "" }) {
  return (
    <span className={`inline-flex items-center ${className}`} aria-label={`Vantive${suffix ? ` ${suffix}` : ""}`}>
      <VantiveLogo size={size} className="-mr-px" style={{ color }} />
      <span className="font-bold text-white" style={{ fontSize: size * 0.75 }}>
        antive
      </span>
      {suffix && (
        <span className="font-bold text-white ml-1" style={{ fontSize: size * 0.75 }}>
          {suffix}
        </span>
      )}
    </span>
  );
}
