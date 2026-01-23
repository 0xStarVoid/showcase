"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Check, Link2, Menu, SlidersHorizontal, X } from "lucide-react";
import Nav from "@/components/Nav";
import Stage from "@/components/Stage";
import Switcher from "@/components/Switcher";
import Controls from "@/components/Controls";
import QRModal from "@/components/QRModal";
import { useBrand, getStyles } from "@/hooks/useBrand";
import { getById } from "@/lib/items";
import { encode, decode } from "@/lib/link";

export default function Playground() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [showControls, setShowControls] = useState(false);

  const { sel, setSel, color, play, font, dark, device, setColor, setPlay, setFont } = useBrand();

  // Load state from URL on mount
  useEffect(() => {
    if (!router.isReady) return;
    const search = window.location.search.slice(1);
    if (search) {
      const cfg = decode(search);
      if (cfg) {
        setSel(cfg.id);
        setColor(cfg.color);
        setPlay(cfg.play);
        setFont(cfg.font);
      }
    } else if (router.query.component) {
      setSel(router.query.component);
    }
  }, [router.isReady, router.query.component, setSel, setColor, setPlay, setFont]);

  // Debounced URL sync
  useEffect(() => {
    if (!ready) return;
    const timeout = setTimeout(() => {
      const params = encode({ id: sel || "pricing-card", color, play, font, dark });
      const newUrl = `${window.location.pathname}?${params}`;
      window.history.replaceState({}, "", newUrl);
    }, 300);
    return () => clearTimeout(timeout);
  }, [sel, color, play, font, dark, ready]);

  useEffect(() => setReady(true), []);

  const copyLink = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (e) {
      console.error("Failed to copy:", e);
    }
  }, []);

  const comp = sel ? getById(sel) : null;
  const styles = getStyles({ color, play, font });

  if (!ready) return null;

  return (
    <>
      <Head>
        <title>{comp?.name || "Playground"}</title>
      </Head>

      <div className={`h-screen flex overflow-hidden ${dark ? "dark" : ""}`} style={styles}>
        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {showNav && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowNav(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
            >
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                onClick={(e) => e.stopPropagation()}
                className="absolute left-0 top-0 bottom-0 w-64 bg-[#0f172a] border-r border-slate-800"
              >
                <div className="absolute top-4 right-4 z-10">
                  <button onClick={() => setShowNav(false)} className="text-slate-400">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Nav />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Desktop Nav */}
        <div className="hidden md:block h-full">
          <Nav />
        </div>

        <main className="flex-1 flex flex-col h-screen bg-[#0f172a] overflow-hidden relative">
          <header className="h-14 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
            <div className="flex items-center gap-3">
              <button onClick={() => setShowNav(true)} className="md:hidden p-2 -ml-2 text-slate-400 hover:text-white">
                <Menu className="w-5 h-5" />
              </button>
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="font-medium text-white hidden sm:inline">Playground</span>
              </div>
              {comp && (
                <>
                  <span className="text-slate-600 hidden sm:inline">/</span>
                  <span className="text-slate-400 text-sm sm:text-base truncate max-w-[100px] sm:max-w-none">
                    {comp.name}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Share Setup Button */}
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors hidden sm:flex"
                title="Copy a link with these brand settings and component"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span>Share Setup</span>
                  </>
                )}
              </button>
              <Switcher />
              {/* Mobile Controls Toggle */}
              <button
                onClick={() => setShowControls(true)}
                className="md:hidden p-2 -mr-2 text-slate-400 hover:text-white"
              >
                <SlidersHorizontal className="w-5 h-5" />
              </button>
            </div>
          </header>

          <div className="flex-1 flex overflow-hidden">
            <div className="flex-1 overflow-auto bg-slate-900/30">
              <AnimatePresence mode="wait">
                {comp ? (
                  <motion.div
                    key={sel}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-full"
                  >
                    <Stage id={sel} dev={device} />
                  </motion.div>
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="h-full flex flex-col items-center justify-center text-center"
                  >
                    <div className="w-16 h-16 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4">
                      <Layers className="w-8 h-8 text-slate-500" />
                    </div>
                    <h2 className="text-lg font-semibold text-white mb-2">Select a component</h2>
                    <p className="text-slate-500 text-sm max-w-xs">Choose from the sidebar to preview and customize.</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Desktop Controls */}
            <div className="hidden md:flex h-full">
              <Controls onPreview={() => setShowQR(true)} onExport={() => setShowCode(true)} />
            </div>
          </div>
        </main>

        {/* Mobile Controls Overlay */}
        <AnimatePresence>
          {showControls && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowControls(false)}
              className="fixed inset-0 bg-black/50 z-50 md:hidden backdrop-blur-sm"
            >
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                onClick={(e) => e.stopPropagation()}
                className="absolute right-0 top-0 bottom-0 w-72 bg-[#0f172a] border-l border-slate-800"
              >
                <div className="absolute top-4 right-4 z-20">
                  <button
                    onClick={() => setShowControls(false)}
                    className="p-1 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <Controls onPreview={() => setShowQR(true)} onExport={() => setShowCode(true)} />
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>
      </div>
    </>
  );
}
