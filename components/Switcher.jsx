"use client";

import { motion } from "framer-motion";
import { Sun, Moon, Monitor, Tablet, Smartphone } from "lucide-react";
import { useBrand } from "@/hooks/useBrand";

const opts = [
  { type: "desktop", icon: Monitor, label: "Desktop" },
  { type: "tablet", icon: Tablet, label: "Tablet" },
  { type: "mobile", icon: Smartphone, label: "Mobile" },
];

export default function Switcher() {
  const { dark, toggleDark, device, setDevice } = useBrand();

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-lg p-1">
        {opts.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setDevice(type)}
            className={`relative p-1.5 rounded transition-colors ${
              device === type ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
            }`}
            title={label}
          >
            {device === type && (
              <motion.div
                layoutId="device-indicator"
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
        className="p-1.5 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
      >
        {dark ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
      </button>
    </div>
  );
}
