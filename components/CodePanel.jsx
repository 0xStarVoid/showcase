"use client";

import { useState, useEffect } from "react";
import { m } from "framer-motion";
import { X, Copy, Check, Code2, Palette, Settings } from "lucide-react";
import { useBrand, getStyles } from "@/hooks/useBrand";
import { getById } from "@/lib/items";

export default function CodePanel({ onClose }) {
  const [activeTab, setActiveTab] = useState("jsx");

  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);
  const [copied, setCopied] = useState(false);

  const { sel, color, play, font, dark } = useBrand();
  const comp = sel ? getById(sel) : null;
  const styles = getStyles({ color, play, font });

  const handleCopy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const r = Math.round(play * 24);
  const dur = (0.2 + play * 0.3).toFixed(2);
  const hw = play > 0.5 ? 600 : 700;

  // Generate JSX code
  const jsxCode = `// ${comp?.name || "Component"} with Brand DNA
import { motion } from "framer-motion";

export function ${comp?.name?.replace(/\s+/g, "") || "Component"}() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-8 ${dark ? "bg-slate-900" : "bg-white"} rounded-[${r}px]"
      style={{
        "--brand": "${color}",
        "--radius": "${r}px",
        fontFamily: "${font === "modern" ? "var(--font-sans)" : "var(--font-serif)"}",
      }}
    >
      {/* Your component content */}
      <button
        className="px-6 py-3 text-white font-semibold"
        style={{
          backgroundColor: "${color}",
          borderRadius: "${r}px",
        }}
      >
        Get Started
      </button>
    </motion.div>
  );
}`;

  // Generate CSS tokens
  const cssTokens = `:root {
  /* Brand Colors */
  --brand-primary: ${color};
  --brand-primary-light: color-mix(in srgb, ${color} 70%, white);
  --brand-primary-dark: color-mix(in srgb, ${color} 80%, black);
  
  /* Design Tokens */
  --corner-radius: ${r}px;
  --corner-radius-sm: ${Math.max(4, r - 8)}px;
  --corner-radius-lg: ${r + 8}px;
  
  /* Typography */
  --font-family: ${font === "modern" ? '"Inter", system-ui, sans-serif' : '"Merriweather", Georgia, serif'};
  --heading-weight: ${hw};
  --body-weight: ${play > 0.5 ? 400 : 500};
  
  /* Animation */
  --animation-duration: ${dur}s;
  --animation-timing: ${play > 0.5 ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "ease-out"};
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, ${(0.05 + play * 0.05).toFixed(2)});
  --shadow-md: 0 4px 6px -1px rgba(0, 0, 0, ${(0.1 + play * 0.05).toFixed(2)});
  --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, ${(0.1 + play * 0.05).toFixed(2)});
  --shadow-brand: 0 20px 40px -10px ${color}33;
  
  /* Theme */
  --bg: ${dark ? "#0f172a" : "#ffffff"};
  --text: ${dark ? "#f8fafc" : "#0f172a"};
  --text-muted: ${dark ? "#94a3b8" : "#64748b"};
}`;

  // Generate Tailwind config snippet
  const tailwindConfig = `// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "${color}",
          light: "color-mix(in srgb, ${color} 70%, white)",
          dark: "color-mix(in srgb, ${color} 80%, black)",
        },
      },
      borderRadius: {
        brand: "${r}px",
        "brand-sm": "${Math.max(4, r - 8)}px",
        "brand-lg": "${r + 8}px",
      },
      fontFamily: {
        brand: ${font === "modern" ? '["Inter", "system-ui", "sans-serif"]' : '["Merriweather", "Georgia", "serif"]'},
      },
      fontWeight: {
        heading: "${hw}",
        body: "${play > 0.5 ? 400 : 500}",
      },
      transitionDuration: {
        brand: "${Math.round(parseFloat(dur) * 1000)}ms",
      },
      boxShadow: {
        brand: "0 20px 40px -10px ${color}33",
      },
    },
  },
};`;

  const tabs = [
    { id: "jsx", label: "JSX", icon: Code2 },
    { id: "tokens", label: "CSS Tokens", icon: Palette },
    { id: "tailwind", label: "Tailwind", icon: Settings },
  ];

  const codeContent = {
    jsx: jsxCode,
    tokens: cssTokens,
    tailwind: tailwindConfig,
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <m.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl w-full max-w-3xl max-h-[80vh] flex flex-col overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="code-panel-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-slate-800">
          <div>
            <h2 id="code-panel-title" className="text-lg font-semibold text-white">Export Code</h2>
            <p className="text-sm text-slate-400">Copy code for {comp?.name || "component"}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Close code panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-800" role="tablist" aria-label="Code export formats">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls={`tabpanel-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium transition-colors relative ${
                activeTab === tab.id ? "text-cyan-400" : "text-slate-400 hover:text-slate-300"
              }`}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
              {activeTab === tab.id && (
                <m.div layoutId="activeTab" className="absolute bottom-0 left-0 right-0 h-0.5 bg-cyan-400" />
              )}
            </button>
          ))}
        </div>

        {/* Code Content */}
        <div className="flex-1 overflow-auto p-4" role="tabpanel" id={`tabpanel-${activeTab}`} aria-label={activeTab}>
          <div className="relative">
            <pre className="text-sm font-mono text-slate-300 bg-slate-950 rounded-lg p-4 overflow-x-auto">
              <code>{codeContent[activeTab]}</code>
            </pre>
            <button
              onClick={() => handleCopy(codeContent[activeTab])}
              className="absolute top-2 right-2 flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-400" />
                  <span className="text-slate-400">Copy</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-900/50">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <div className="flex items-center gap-4">
              <span>
                Brand:{" "}
                <span className="text-white" style={{ color }}>
                  {color}
                </span>
              </span>
              <span>
                Radius: <span className="text-white">{r}px</span>
              </span>
              <span>
                Font: <span className="text-white capitalize">{font}</span>
              </span>
            </div>
            <span>Tip: Adjust settings in the sidebar, code updates live</span>
          </div>
        </div>
      </m.div>
    </m.div>
  );
}
