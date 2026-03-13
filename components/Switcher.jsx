"use client";

import { m } from "framer-motion";
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
    <div className="flex items-center gap-2">
      {/* Device Switcher */}
      <div className="flex items-center bg-slate-800/50 border border-slate-700/50 rounded-lg p-1 gap-0.5">
        {opts.map(({ type, icon: Icon, label }) => (
          <button
            key={type}
            onClick={() => setDevice(type)}
            className={`relative p-2 rounded transition-colors ${
              device === type ? "text-cyan-400" : "text-slate-500 hover:text-slate-300"
            }`}
            title={label}
          >
            {device === type && (
              <m.div
                layoutId="device-indicator"
                className="absolute inset-0 bg-slate-700/50 rounded"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            )}
            <Icon className="w-5 h-5 relative z-10" />
          </button>
        ))}
      </div>

      {/* Dark Mode Toggle */}
      <button
        onClick={toggleDark}
        className="p-2 rounded-lg hover:bg-slate-800/50 text-slate-400 hover:text-white transition-colors"
        title={dark ? "Light Mode" : "Dark Mode"}
      >
        {dark ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
      </button>
    </div>
  );
}
