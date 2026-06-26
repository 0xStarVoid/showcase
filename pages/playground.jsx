"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";
import { AnimatePresence, m, LazyMotion, domAnimation } from "framer-motion";
import { Check, Link2, FileCode, ChevronRight, ChevronLeft } from "lucide-react";
import VantiveLogo from "@/components/ui/VantiveLogo";
import VantiveBrand from "@/components/ui/VantiveBrand";
import Nav from "@/components/Nav";
import Stage from "@/components/Stage";
import Controls from "@/components/Controls";
const QRModal = dynamic(() => import("@/components/QRModal"), { ssr: false });
const PropsTable = dynamic(() => import("@/components/PropsTable"), { ssr: false });
import { useBrand, getStyles } from "@/hooks/useBrand";
import { getById } from "@/lib/items";
import { encode, decode } from "@/lib/link";

/* Pulse ring animation for guide hint on mobile arrow buttons */
const PulseRing = () => (
  <span className="absolute inset-0 rounded-lg pointer-events-none">
    <span className="absolute inset-0 rounded-lg animate-[pulseRing_2s_ease-out_infinite] border-2 border-cyan-400/60" />
  </span>
);

export default function Playground() {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [showProps, setShowProps] = useState(false);
  const [ready, setReady] = useState(false);
  const [copied, setCopied] = useState(false);
  // Responsive collapse state
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [controlsCollapsed, setControlsCollapsed] = useState(false);
  // Mobile overlay state: "left", "right", or null
  const [mobilePanel, setMobilePanel] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  // Track if user has interacted with panels (hide pulse guide after first use)
  const [hasUsedPanels, setHasUsedPanels] = useState(false);

  const { sel, setSel, color, play, font, dark, device, setColor, setPlay, setFont } = useBrand();

  // Auto-collapse on small screens (debounced resize)
  useEffect(() => {
    let timer;
    const checkWidth = () => {
      const w = window.innerWidth;
      if (w < 768) {
        setIsMobile(true);
        setNavCollapsed(true);
        setControlsCollapsed(true);
        setMobilePanel(null);
      } else if (w < 1024) {
        setIsMobile(false);
        setNavCollapsed(false);
        setControlsCollapsed(true);
        setMobilePanel(null);
      } else {
        setIsMobile(false);
        setNavCollapsed(false);
        setControlsCollapsed(false);
        setMobilePanel(null);
      }
    };
    const onResize = () => {
      clearTimeout(timer);
      timer = setTimeout(checkWidth, 150);
    };
    checkWidth();
    window.addEventListener("resize", onResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // Mobile toggle handlers
  const toggleMobileNav = useCallback(() => {
    setHasUsedPanels(true);
    if (isMobile) {
      setMobilePanel((prev) => (prev === "left" ? null : "left"));
    } else {
      setNavCollapsed((prev) => !prev);
    }
  }, [isMobile]);

  const toggleMobileControls = useCallback(() => {
    setHasUsedPanels(true);
    if (isMobile) {
      setMobilePanel((prev) => (prev === "right" ? null : "right"));
    } else {
      setControlsCollapsed((prev) => !prev);
    }
  }, [isMobile]);

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
    setReady(true);
  }, [router.isReady, router.query.component, setSel, setColor, setPlay, setFont]);

  // Debounced URL sync
  useEffect(() => {
    if (!ready) return;
    const timeout = setTimeout(() => {
      const params = encode({ id: sel || "hero-gradient", color, play, font, dark });
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

  const showPulse = isMobile && !hasUsedPanels;

  return (
    <>
      <Head>
        <title>{comp?.name ? `${comp.name} — Vantive UI Playground` : "Vantive UI Playground — Customize & Preview Components"}</title>
        <meta name="description" content="Customize Vantive UI components live. Tweak brand colors, typography, and spacing, then copy clean code or share a permalink to your exact configuration." />
      </Head>

      {/* Pulse ring keyframe */}
      <style jsx global>{`
        @keyframes pulseRing {
          0% { transform: scale(1); opacity: 0.7; }
          70% { transform: scale(1.5); opacity: 0; }
          100% { transform: scale(1.5); opacity: 0; }
        }
      `}</style>

      <LazyMotion features={domAnimation}>
        <div className={`h-screen flex overflow-hidden ${dark ? "dark" : ""}`} style={styles}>
          {/* Left Nav - slide overlay on mobile */}
          <AnimatePresence>
            {isMobile && mobilePanel === "left" && (
              <m.div
                key="nav-overlay"
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                className="fixed inset-0 z-50"
              >
                <Nav
                  collapsed={false}
                  onToggleCollapse={toggleMobileNav}
                  mobileOverlay
                  onMobileClose={() => setMobilePanel(null)}
                />
              </m.div>
            )}
          </AnimatePresence>

          {/* Desktop Nav */}
          {!isMobile && (
            <Nav
              collapsed={navCollapsed}
              onToggleCollapse={toggleMobileNav}
            />
          )}

          <main className="flex-1 flex flex-col h-screen bg-[#0f172a] overflow-hidden relative">
            <header className="h-14 border-b border-slate-800 bg-[#0f172a] flex items-center justify-between px-4 sm:px-6 shrink-0 z-30">
              <div className="flex items-center gap-3">
                {/* Mobile left arrow toggle — > when closed, < when open */}
                {isMobile && (
                  <button
                    onClick={toggleMobileNav}
                    className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    aria-label={mobilePanel === "left" ? "Close navigation" : "Open navigation"}
                  >
                    {mobilePanel === "left" ? (
                      <ChevronLeft className="w-5 h-5" />
                    ) : (
                      <ChevronRight className="w-5 h-5" />
                    )}
                    {showPulse && <PulseRing />}
                  </button>
                )}
                <VantiveBrand size={18} color="#38bdf8" suffix="Playground" className="hidden sm:inline-flex" />
                <VantiveLogo size={14} className="text-cyan-400 sm:hidden" />
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
                {/* Props Documentation Toggle — desktop only */}
                {!isMobile && comp?.props && comp.props.length > 0 && (
                  <button
                    onClick={() => setShowProps(!showProps)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      showProps ? "bg-cyan-500/20 text-cyan-400" : "bg-slate-800 hover:bg-slate-700 text-slate-300"
                    }`}
                    title="View component props documentation"
                    aria-label={showProps ? "Hide props" : "Show props"}
                    aria-pressed={showProps}
                  >
                    <FileCode className="w-4 h-4" />
                    <span className="hidden sm:inline">Props</span>
                  </button>
                )}
                {/* Share Button — desktop only */}
                {!isMobile && (
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
                )}
                {/* Mobile right arrow toggle — < when closed, > when open */}
                {isMobile && (
                  <button
                    onClick={toggleMobileControls}
                    className="relative p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                    aria-label={mobilePanel === "right" ? "Close controls" : "Open controls"}
                  >
                    {mobilePanel === "right" ? (
                      <ChevronRight className="w-5 h-5" />
                    ) : (
                      <ChevronLeft className="w-5 h-5" />
                    )}
                    {showPulse && <PulseRing />}
                  </button>
                )}
              </div>
            </header>

            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Props Table (collapsible) */}
              <AnimatePresence>
                {showProps && comp?.props && (
                  <m.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="shrink-0 border-b border-slate-800 overflow-hidden"
                  >
                    <div className="p-4 max-h-64 overflow-auto">
                      <PropsTable props={comp.props} componentName={comp.name} />
                    </div>
                  </m.div>
                )}
              </AnimatePresence>

              {/* Stage Area */}
              <div className="flex-1 overflow-auto bg-slate-900/30">
                <AnimatePresence mode="wait">
                  {comp ? (
                    <m.div
                      key={sel}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.98 }}
                      transition={{ duration: 0.3 }}
                      className="min-h-full"
                    >
                      <Stage id={sel} dev={device} />
                    </m.div>
                  ) : (
                    <m.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="h-full flex flex-col items-center justify-center text-center"
                    >
                      <div className="w-16 h-16 rounded-xl bg-slate-800/50 flex items-center justify-center mb-4">
                        <VantiveLogo size={32} className="text-slate-400" />
                      </div>
                      <h2 className="text-lg font-semibold text-white mb-2">Select a component</h2>
                      <p className="text-slate-400 text-sm max-w-xs">
                        Choose from the sidebar to preview and customize.
                      </p>
                    </m.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </main>

          {/* Right Controls - slide overlay on mobile */}
          <AnimatePresence>
            {isMobile && mobilePanel === "right" && (
              <m.div
                key="controls-overlay"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.25, ease: "easeInOut" }}
                className="fixed inset-0 z-50"
              >
                <Controls
                  onPreview={() => setShowQR(true)}
                  onExport={() => setShowCode(true)}
                  collapsed={false}
                  onToggleCollapse={toggleMobileControls}
                  mobileOverlay
                  onMobileClose={() => setMobilePanel(null)}
                />
              </m.div>
            )}
          </AnimatePresence>

          {/* Desktop Controls */}
          {!isMobile && (
            <Controls
              onPreview={() => setShowQR(true)}
              onExport={() => setShowCode(true)}
              collapsed={controlsCollapsed}
              onToggleCollapse={toggleMobileControls}
            />
          )}

          <AnimatePresence>{showQR && <QRModal onClose={() => setShowQR(false)} />}</AnimatePresence>
        </div>
      </LazyMotion>
    </>
  );
}
