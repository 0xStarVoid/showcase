"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { AnimatePresence, motion } from "framer-motion";
import { Layers, Check, Link2 } from "lucide-react";
import Nav from "@/components/Nav";
import Stage from "@/components/Stage";
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
  // Responsive collapse state - start collapsed on smaller screens
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);

  const { sel, setSel, color, play, font, dark, device, setColor, setPlay, setFont } = useBrand();

  // Auto-collapse on small screens
  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) {
        setNavCollapsed(true);
        setControlsCollapsed(true);
      } else if (window.innerWidth < 1024) {
        setNavCollapsed(false);
        setControlsCollapsed(true);
      } else {
        setNavCollapsed(false);
        setControlsCollapsed(false);
      }
    };
    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  // Load state from URL on mount - set ready AFTER parsing to prevent race condition
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
    // Only set ready after URL parsing is complete
    setReady(true);
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
        {/* Left Nav - Always visible, collapsible */}
        <Nav collapsed={navCollapsed} onToggleCollapse={() => setNavCollapsed(!navCollapsed)} />

        <main className="flex-1 flex flex-col h-screen bg-[#0f172a] overflow-hidden relative">
          <header className="h-14 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-cyan-400" />
                <span className="font-medium text-white hidden sm:inline">Playground</span>
              </div>
              {comp && (
                <>
                  <span className="text-slate-600 hidden sm:inline">/</span>
                  <span className="text-slate-400 text-sm sm:text-base truncate max-w-[120px] sm:max-w-none">
                    {comp.name}
                  </span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Share Setup Button */}
              <button
                onClick={copyLink}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm transition-colors"
                title="Copy a link with these brand settings and component"
                aria-label={copied ? "Link copied" : "Copy share link"}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-green-400" />
                    <span className="text-green-400 hidden sm:inline">Copied!</span>
                  </>
                ) : (
                  <>
                    <Link2 className="w-4 h-4" />
                    <span className="hidden sm:inline">Share</span>
                  </>
                )}
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
          </div>
        </main>

        {/* Right Controls - Always visible, collapsible */}
        <Controls
          onPreview={() => setShowQR(true)}
          onExport={() => setShowCode(true)}
          collapsed={controlsCollapsed}
          onToggleCollapse={() => setControlsCollapsed(!controlsCollapsed)}
        />

        <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>
      </div>
    </>
  );
}
