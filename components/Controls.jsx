"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  RotateCcw,
  Type,
  Palette,
  Code2,
  ChevronDown,
  ChevronUp,
  Copy,
  Check,
  Sun,
  Moon,
  Monitor,
  Tablet,
  Smartphone,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useBrand } from "@/hooks/useBrand";

const deviceOpts = [
  { type: "desktop", icon: Monitor, label: "Desktop" },
  { type: "tablet", icon: Tablet, label: "Tablet" },
  { type: "mobile", icon: Smartphone, label: "Mobile" },
];

export default function Controls({ onPreview, onExport, collapsed, onToggleCollapse }) {
  const { color, play, font, dark, device, setColor, setPlay, setFont, toggleDark, setDevice, reset } = useBrand();
  const [showTokens, setShowTokens] = useState(true);
  const [tokensCopied, setTokensCopied] = useState(false);

  const label = play < 0.33 ? "Corporate" : play < 0.66 ? "Balanced" : "Playful";

  // Collapsed view - just icons
  if (collapsed) {
    return (
      <aside className="w-12 border-l border-slate-800 bg-[#0f172a] flex flex-col shrink-0">
        <div className="p-2 border-b border-slate-800">
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Expand controls panel"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 p-2 space-y-2">
          {/* Device buttons stacked */}
          {deviceOpts.map(({ type, icon: Icon, label }) => (
            <button
              key={type}
              onClick={() => setDevice(type)}
              className={`w-full p-2 rounded-lg transition-colors ${
                device === type ? "bg-cyan-500/20 text-cyan-400" : "hover:bg-slate-800 text-slate-400"
              }`}
              title={label}
              aria-label={`Switch to ${label} view`}
            >
              <Icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
          <div className="border-t border-slate-700 my-2" />
          <button
            onClick={toggleDark}
            className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={dark ? "Light Mode" : "Dark Mode"}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Moon className="w-4 h-4 mx-auto" /> : <Sun className="w-4 h-4 mx-auto" />}
          </button>
          <button
            onClick={reset}
            className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors"
            title="Reset to defaults"
            aria-label="Reset settings"
          >
            <RotateCcw className="w-4 h-4 mx-auto" />
          </button>
        </div>
      </aside>
    );
  }

  // Computed tokens
  const r = Math.round(play * 24);
  const dur = (0.2 + play * 0.3).toFixed(2);
  const hw = play > 0.5 ? 600 : 700;

  return (
    <aside className="w-72 border-l border-slate-800 bg-[#0f172a] flex flex-col shrink-0">
      {/* Header with collapse button */}
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            {onToggleCollapse && (
              <button
                onClick={onToggleCollapse}
                className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors"
                aria-label="Collapse controls panel"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
            <div>
              <h2 className="font-semibold text-white">Brand DNA</h2>
              <p className="text-xs text-slate-400 mt-0.5">Customize styling</p>
            </div>
          </div>
          <button
            onClick={reset}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors"
            title="Reset to defaults"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* Device & Theme Switcher - always visible here */}
        <div className="flex items-center justify-between gap-2 p-2 rounded-lg bg-slate-800/30 border border-slate-700/50">
          <div className="flex items-center gap-1">
            {deviceOpts.map(({ type, icon: Icon, label }) => (
              <button
                key={type}
                onClick={() => setDevice(type)}
                className={`relative p-2 rounded transition-colors ${
                  device === type ? "text-cyan-400" : "text-slate-400 hover:text-slate-300"
                }`}
                title={label}
                aria-label={`Switch to ${label} view`}
              >
                {device === type && (
                  <motion.div
                    layoutId="device-indicator-controls"
                    className="absolute inset-0 bg-slate-700/50 rounded"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                <Icon className="w-4 h-4 relative z-10" />
              </button>
            ))}
          </div>
          <button
            onClick={toggleDark}
            className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-white transition-colors"
            title={dark ? "Light Mode" : "Dark Mode"}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Controls */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        {/* Playfulness Slider */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <label className="text-sm font-medium text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-violet-400" />
              Playfulness
            </label>
            <span className="text-xs px-2 py-1 rounded bg-slate-800 text-slate-400">{label}</span>
          </div>

          <div className="space-y-4">
            <div className="relative h-6 flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={play}
                onChange={(e) => setPlay(parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer"
                style={{ accentColor: color }}
              />
            </div>

            <div className="flex justify-between text-xs font-medium text-slate-400 uppercase tracking-wider">
              <span>Corporate</span>
              <span>Playful</span>
            </div>
          </div>

          {/* Visual Indicator */}
          <div className="mt-4 flex items-center gap-3">
            <motion.div
              animate={{
                borderRadius: `${4 + play * 20}px`,
                backgroundColor: `hsl(${220 + play * 30}, ${50 + play * 30}%, ${50 + play * 10}%)`,
              }}
              transition={{ duration: 0.3 }}
              className="w-12 h-12 flex items-center justify-center"
            >
              <span className="text-white text-lg font-semibold">A</span>
            </motion.div>
            <div className="text-xs text-slate-400">
              <p>Radius: {Math.round(play * 24)}px</p>
              <p>Animation: {play > 0.5 ? "Bouncy" : "Subtle"}</p>
            </div>
          </div>
        </div>

        {/* Primary Color */}
        <div>
          <label className="text-sm font-medium text-white flex items-center gap-2 mb-3">
            <Palette className="w-4 h-4 text-cyan-400" />
            Brand Color
          </label>

          <div className="flex items-center gap-3">
            <input type="color" value={color} onChange={(e) => setColor(e.target.value)} className="cursor-pointer" />
            <div className="flex-1">
              <input
                type="text"
                value={color.toUpperCase()}
                onChange={(e) => {
                  const v = e.target.value;
                  if (/^#[0-9A-Fa-f]{0,6}$/.test(v)) setColor(v);
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm font-mono text-white focus:outline-none focus:border-cyan-500/50"
              />
            </div>
          </div>

          {/* Quick Color Presets */}
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { color: "#38bdf8", name: "Blue" },
              { color: "#fb923c", name: "Orange" },
              { color: "#eab308", name: "Yellow" },
              { color: "#4ade80", name: "Green" },
              { color: "#fb7185", name: "Rose" },
              { color: "#818cf8", name: "Purple" },
            ].map((p) => (
              <button
                key={p.color}
                onClick={() => {
                  setColor(p.color);
                  // Update data-accent attribute
                  const accentName = p.name.toLowerCase();
                  document.documentElement.setAttribute("data-accent", accentName);
                }}
                className={`w-7 h-7 rounded-md transition-transform hover:scale-110 ${
                  color.toLowerCase() === p.color.toLowerCase() ? "ring-2 ring-white/30" : ""
                }`}
                style={{ backgroundColor: p.color }}
                title={p.name}
              />
            ))}
          </div>
        </div>

        {/* Typography Toggle */}
        <div>
          <label className="text-sm font-medium text-white flex items-center gap-2 mb-3">
            <Type className="w-4 h-4 text-teal-400" />
            Typography
          </label>

          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "modern", label: "Modern", sample: "Aa" },
              { id: "classic", label: "Classic", sample: "Aa" },
            ].map((o) => (
              <button
                key={o.id}
                onClick={() => setFont(o.id)}
                className={`p-3 rounded-lg border transition-all ${
                  font === o.id
                    ? "border-cyan-500/50 bg-cyan-500/10"
                    : "border-slate-700/50 hover:border-slate-600 bg-slate-800/30"
                }`}
              >
                <div
                  className={`text-xl mb-1 ${o.id === "modern" ? "font-sans" : "font-serif"} ${
                    font === o.id ? "text-cyan-400" : "text-slate-400"
                  }`}
                >
                  {o.sample}
                </div>
                <div className={`text-xs ${font === o.id ? "text-cyan-400" : "text-slate-400"}`}>{o.label}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Live Tokens Panel */}
        <div>
          <button
            onClick={() => setShowTokens(!showTokens)}
            className="w-full flex items-center justify-between text-sm font-medium text-white mb-3"
          >
            <span className="flex items-center gap-2">
              <Code2 className="w-4 h-4 text-emerald-400" />
              Live Tokens
            </span>
            {showTokens ? (
              <ChevronUp className="w-4 h-4 text-slate-400" />
            ) : (
              <ChevronDown className="w-4 h-4 text-slate-400" />
            )}
          </button>

          <AnimatePresence>
            {showTokens && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className="overflow-hidden"
              >
                <div className="bg-slate-950 rounded-lg p-3 space-y-2 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-400">--brand</span>
                    <span className="text-cyan-400">{color}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">--radius</span>
                    <span className="text-emerald-400">{r}px</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">--duration</span>
                    <span className="text-amber-400">{dur}s</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">--font</span>
                    <span className="text-violet-400">{font}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">--heading-wt</span>
                    <span className="text-rose-400">{hw}</span>
                  </div>
                  <button
                    onClick={async () => {
                      const css = `:root {\n  --brand: ${color};\n  --radius: ${r}px;\n  --duration: ${dur}s;\n  --font: ${font};\n  --heading-wt: ${hw};\n}`;
                      await navigator.clipboard.writeText(css);
                      setTokensCopied(true);
                      setTimeout(() => setTokensCopied(false), 2000);
                    }}
                    className="mt-3 w-full flex items-center justify-center gap-1.5 py-1.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white text-xs transition-colors"
                  >
                    {tokensCopied ? <Check className="w-3 h-3 text-green-400" /> : <Copy className="w-3 h-3" />}
                    {tokensCopied ? "Copied!" : "Copy Tokens"}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-4 border-t border-slate-800 space-y-2">
        {onExport && (
          <button
            onClick={onExport}
            className="w-full py-2.5 px-4 rounded-lg border border-slate-700 bg-slate-800/50 hover:bg-slate-800 text-white font-medium text-sm transition-colors flex items-center justify-center gap-2"
          >
            <Code2 className="w-4 h-4" />
            Export Code
          </button>
        )}
        <button
          onClick={onPreview}
          className="w-full py-2.5 px-4 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <Sparkles className="w-4 h-4" />
          Preview Link
        </button>
      </div>
    </aside>
  );
}
