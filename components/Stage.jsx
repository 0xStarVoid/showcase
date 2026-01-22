"use client";

import { motion } from "framer-motion";
import { useBrand, dims, getStyles } from "@/hooks/useBrand";
import Render from "./Render";

export default function Stage({ id, dev }) {
  const { color, play, font, dark } = useBrand();

  const d = dims[dev];
  const styles = getStyles({ color, play, font });

  const getW = () => {
    switch (dev) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "max-w-[1200px]";
    }
  };

  return (
    <div
      className="w-full h-full flex items-center justify-center p-8 relative overflow-hidden"
      style={{
        backgroundImage: "radial-gradient(rgba(148, 163, 184, 0.1) 1px, transparent 1px)",
        backgroundSize: "24px 24px",
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
            relative bg-slate-800 shadow-2xl ring-1 ring-white/10
            ${dev === "mobile" ? "rounded-[3rem] p-3 border-[6px] border-slate-700" : dev === "tablet" ? "rounded-[2rem] p-3 border-[4px] border-slate-700" : "rounded-xl border border-slate-700"}
          `}
          style={styles}
        >
          {dev === "mobile" && (
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-xl z-20 flex items-center justify-center">
              <div className="w-16 h-1 bg-slate-700 rounded-full" />
            </div>
          )}

          <motion.div
            layout
            className={`
              bg-slate-900 overflow-hidden relative
              ${dev === "mobile" ? "rounded-[2.2rem] min-h-[650px]" : dev === "tablet" ? "rounded-[1.5rem] min-h-[500px]" : "rounded-lg min-h-[400px]"}
            `}
          >
            {/* Status Bar for Mobile */}
            {dev === "mobile" && (
              <div className="h-10 w-full flex justify-between items-center px-6 text-[10px] text-white font-medium select-none z-10 absolute top-0 left-0">
                <span>9:41</span>
                <div className="flex gap-1">
                  <div className="w-4 h-2.5 bg-white rounded-[1px]" />
                </div>
              </div>
            )}

            <div className={`h-full ${dev === "mobile" ? "pt-12 px-4 pb-8" : "p-8"} overflow-y-auto custom-scrollbar`}>
              <Render id={id} styles={{ color, play, font, dark }} />
            </div>
          </motion.div>

          {dev === "mobile" && (
            <div className="flex justify-center pt-4 pb-1">
              <div className="w-32 h-1 bg-slate-600/50 rounded-full" />
            </div>
          )}
        </motion.div>

        <motion.div
          layout
          className="flex items-center justify-center gap-2 mt-6 text-slate-500"
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
