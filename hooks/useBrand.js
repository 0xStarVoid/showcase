import { create } from "zustand";

const def = {
  color: "#818cf8", // Purple (Diamond Standard default)
  play: 0.5,
  font: "modern",
  dark: true,
  device: "desktop",
  sel: "pricing-card",
};

export const useBrand = create((set) => ({
  ...def,
  setColor: (c) => set({ color: c }),
  setPlay: (v) => set({ play: Math.max(0, Math.min(1, v)) }),
  setFont: (s) => set({ font: s }),
  toggleDark: () => set((s) => ({ dark: !s.dark })),
  setDevice: (d) => set({ device: d }),
  setSel: (id) => set({ sel: id }),
  reset: () => set(def),
}));

export function getStyles(s) {
  const r = Math.round(s.play * 24);
  const dur = 0.2 + s.play * 0.3;
  const sh = 0.05 + s.play * 0.1;
  const hw = s.play > 0.5 ? 600 : 700;
  const bw = s.play > 0.5 ? 400 : 500;
  return {
    "--brand-primary": s.color,
    "--corner-radius": `${r}px`,
    "--animation-duration": `${dur}s`,
    "--shadow-intensity": sh,
    "--heading-weight": hw,
    "--body-weight": bw,
    "--font-family": s.font === "modern" ? "var(--font-sans)" : "var(--font-serif)",
  };
}

export const dims = {
  desktop: { width: 1200, label: "Desktop" },
  tablet: { width: 768, label: "Tablet" },
  mobile: { width: 375, label: "Mobile" },
};
