"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { QRCodeSVG } from "qrcode.react";
import { X, Copy, Check, ExternalLink, Smartphone } from "lucide-react";
import { useBrand } from "@/hooks/useBrand";
import { genUrl } from "@/lib/link";

export default function QRModal({ onClose }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  const { sel, color, play, font, dark } = useBrand();

  useEffect(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "";
    const u = genUrl(base, {
      id: sel || "pricing-card",
      color,
      play,
      font,
      dark,
    });
    setUrl(u);
  }, [sel, color, play, font, dark]);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  };

  const onClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClick}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-neutral-900 border border-white/10 rounded-3xl max-w-md w-full p-8 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-white">Preview on Device</h2>
            <p className="text-sm text-neutral-500 mt-1">Scan to view on your phone</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-neutral-500 transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex justify-center mb-6">
          <div className="p-6 bg-white rounded-2xl shadow-inner">
            <QRCodeSVG value={url} size={200} level="M" includeMargin={false} fgColor="#1a1a1a" bgColor="#ffffff" />
          </div>
        </div>

        <div className="flex items-center gap-3 p-4 bg-cyan-500/10 border border-cyan-500/20 rounded-xl mb-6">
          <Smartphone className="w-10 h-10 text-cyan-400 shrink-0" />
          <div>
            <p className="text-sm font-medium text-cyan-300">Open your camera app</p>
            <p className="text-xs text-cyan-400/70">Point it at the QR code to preview the component on your device</p>
          </div>
        </div>

        <div className="mb-6">
          <label className="text-xs font-medium text-neutral-500 uppercase tracking-wider mb-2 block">
            Preview URL
          </label>
          <div className="flex gap-2">
            <div className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/5 rounded-xl text-sm text-neutral-400 truncate font-mono">
              {url}
            </div>
            <button
              onClick={copy}
              className={`px-4 py-3 rounded-xl flex items-center gap-2 text-sm font-medium transition-all ${
                copied
                  ? "bg-teal-500/10 text-teal-400 border border-teal-500/20"
                  : "bg-white/[0.03] border border-white/5 text-neutral-300 hover:bg-white/5"
              }`}
            >
              {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              {copied ? "Copied" : "Copy"}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
