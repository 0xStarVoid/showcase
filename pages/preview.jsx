import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import Head from "next/head";
import dynamic from "next/dynamic";
import { Layers, ArrowLeft } from "lucide-react";
import Link from "next/link";
const Render = dynamic(() => import("@/components/Render"), { ssr: false });
import { decode } from "@/lib/link";
import { getById } from "@/lib/items";

export default function Preview() {
  useReveal();
  const router = useRouter();
  const [cfg, setCfg] = useState(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
    const p = new URLSearchParams(window.location.search);
    const s = p.toString();
    if (s) {
      const d = decode(s);
      if (d) {
        setCfg(d);
        if (d.dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      }
    }
  }, [router.query]);

  if (!ready) return null;

  const comp = cfg ? getById(cfg.id) : null;

  return (
    <>
      <Head>
        <title>{comp?.name || "Preview"}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div className={`min-h-screen ${cfg?.dark ? "dark" : ""}`}>
        <div className="min-h-screen bg-white dark:bg-neutral-900 architect-grid">
          <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-neutral-900/80 border-b border-neutral-100 dark:border-neutral-800">
            <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
                  <Layers className="w-4 h-4 text-white" />
                </div>
                <div>
                  <span className="font-semibold text-neutral-900 dark:text-white text-sm">
                    {comp?.name || "Component"} Preview
                  </span>
                  {cfg && (
                    <div className="flex items-center gap-2 mt-0.5">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: cfg.color }} />
                      <span className="text-xs text-neutral-500">Playfulness: {Math.round(cfg.play * 100)}%</span>
                    </div>
                  )}
                </div>
              </div>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Playground
              </Link>
            </div>
          </header>

          <main className="pt-24 pb-12 px-4">
            {cfg ? (
              <div data-reveal className="max-w-4xl mx-auto">
                <Render id={cfg.id} styles={{ color: cfg.color, play: cfg.play, font: cfg.font, dark: cfg.dark }} />
              </div>
            ) : (
              <div className="text-center py-20">
                <div className="w-16 h-16 rounded-2xl bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center mx-auto mb-4">
                  <Layers className="w-8 h-8 text-neutral-400" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2">Invalid Preview Link</h2>
                <p className="text-neutral-500 mb-6">The preview configuration could not be loaded.</p>
                <Link
                  href="/playground"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors"
                >
                  Go to Playground
                </Link>
              </div>
            )}
          </main>

          <footer className="fixed bottom-0 left-0 right-0 py-4 px-4 text-center bg-white/80 dark:bg-neutral-900/80 border-t border-neutral-100 dark:border-neutral-800">
            <p className="text-xs text-neutral-500">
              Built with <span className="font-semibold">Showcase</span>
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}
