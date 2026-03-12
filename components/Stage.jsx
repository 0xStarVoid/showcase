"use client";

import { motion } from "framer-motion";
import { useBrand, dims, getStyles } from "@/hooks/useBrand";
import dynamic from "next/dynamic";
const Render = dynamic(() => import("./Render"), { ssr: false });

export default function Stage({ id, dev }) {
  const { color, play, font, dark } = useBrand();

  const d = dims[dev];
  const styles = getStyles({ color, play, font });

  const getW = () => {
    switch (dev) {
      case "mobile":
        return "max-w-[400px]";
      case "tablet":
        return "max-w-[800px]";
      default:
        return "max-w-[1200px]";
    }
  };

  // Desktop: No device frame, just the content
  if (dev === "desktop") {
    return (
      <div
        className="w-full min-h-full pt-6 pb-4 transition-colors duration-300"
        style={{
          backgroundImage: "radial-gradient(var(--borderDim) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          backgroundColor: "var(--bg)",
          colorScheme: dark ? "dark" : "light",
        }}
      >
        <div className={`${getW()} mx-auto px-4`}>
          <motion.div
            layout
            className="rounded-lg overflow-hidden ring-1 ring-white/10"
            style={{
              ...styles,
              backgroundColor: "var(--bg)",
              color: "var(--text)",
            }}
          >
            <Render id={id} styles={{ color, play, font, dark }} />
          </motion.div>

          <motion.div
            layout
            className="flex items-center justify-center gap-2 mt-4 pb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ color: "var(--textMuted)" }}
          >
            <div
              className="px-3 py-1 rounded-full border text-xs font-mono"
              style={{
                backgroundColor: "var(--surface)",
                borderColor: "var(--borderDim)",
              }}
            >
              {d.width}px
            </div>
            <span className="text-xs font-medium uppercase tracking-wider">{d.label}</span>
          </motion.div>
        </div>
      </div>
    );
  }

  // Tablet/Mobile: With device frame
  return (
    <div
      className="w-full min-h-full flex justify-center py-4 transition-colors duration-300"
      style={{
        backgroundImage: "radial-gradient(var(--borderDim) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
        backgroundColor: "var(--bg)",
        colorScheme: dark ? "dark" : "light",
      }}
    >
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 200, damping: 25 }}
        className={`${getW()} w-full z-10`}
      >
        <motion.div
          layout
          className={`
            relative shadow-2xl ring-1 ring-white/10
            ${dev === "mobile" ? "rounded-[3rem] p-2 border-[6px]" : "rounded-[2rem] p-2 border-[4px]"}
          `}
          style={{
            ...styles,
            backgroundColor: "#1e293b", // Slate-800 for device frame
            borderColor: "#334155", // Slate-700
          }}
        >
          {dev === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-16 h-1 bg-slate-700 rounded-full" />
            </div>
          )}

          <motion.div
            layout
            className={`
              overflow-hidden relative
              ${dev === "mobile" ? "rounded-[2.2rem] min-h-[650px]" : "rounded-[1.5rem] min-h-[500px]"}
            `}
            style={{
              backgroundColor: "var(--bg)",
              color: "var(--text)",
            }}
          >
            {dev === "mobile" && (
              <div
                className="h-10 w-full flex justify-between items-center px-6 text-[10px] font-medium select-none z-10 absolute top-0 left-0"
                style={{ color: "var(--text)" }}
              >
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2.5 bg-current rounded-[1px]" />
                </div>
              </div>
            )}

            <div
              className={
                dev === "mobile"
                  ? "h-full pt-10 overflow-y-auto custom-scrollbar"
                  : "h-full overflow-y-auto custom-scrollbar"
              }
            >
              <Render id={id} styles={{ color, play, font, dark }} />
            </div>
          </motion.div>

          {dev === "mobile" && (
            <div className="flex justify-center pt-3 pb-1">
              <div className="w-32 h-1 bg-slate-600/50 rounded-full" />
            </div>
          )}
        </motion.div>

        <motion.div
          layout
          className="flex items-center justify-center gap-2 mt-4 text-slate-500"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="px-3 py-1 bg-slate-800/50 rounded-full border border-slate-700/50 text-xs font-mono">
            {d.width}px
          </div>
          <span className="text-xs font-medium uppercase tracking-wider text-slate-600">{d.label}</span>
        </motion.div>
      </motion.div>
    </div>
  );
}
