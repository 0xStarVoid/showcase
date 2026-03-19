import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Palette, Smartphone, Code2, Layers } from "lucide-react";
import VantiveLogo from "@/components/ui/VantiveLogo";
import VantiveBrand from "@/components/ui/VantiveBrand";

export default function Home() {
  return (
    <>
      <Head>
        <title>Vantive UI</title>
        <meta
          name="description"
          content="Themeable UI component library with live customization. Adjust brand colors, typography, and spacing in real time."
        />
      </Head>

      <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30 flex flex-col">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/95 border-b border-slate-800" aria-label="Main navigation">
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between" style={{ padding: "0 calc(12px + 1.5vw)", height: "calc(48px + 1.5vw)" }}>
            <Link href="/" aria-label="Vantive UI home">
              <VantiveBrand size={20} color="#38bdf8" suffix="UI" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-3">
              <Link
                href="/components"
                prefetch={false}
                className="hidden sm:inline text-sm text-slate-400 hover:text-white transition-colors"
                style={{ padding: "6px 12px" }}
              >
                Components
              </Link>
              <Link
                href="/playground"
                prefetch={false}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-sm font-bold text-slate-950 transition-colors"
                style={{ padding: "8px calc(10px + 0.6vw)" }}
              >
                Playground
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {/* Hero - compact */}
          <section style={{ padding: "calc(32px + 3vw) calc(12px + 1.5vw) calc(38px + 4vw)" }}>
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold" style={{ padding: "6px 12px", marginBottom: "calc(16px + 1.5vw)" }}>
                <VantiveLogo size={14} color="#22d3ee" />
                <span>21 Production Components</span>
              </div>

              <h1 className="font-bold text-white tracking-tight" style={{ fontSize: "calc(1.5rem + 2vw)", lineHeight: 1.15, marginBottom: "calc(10px + 1vw)" }}>
                Build interfaces{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  that feel right.
                </span>
              </h1>

              <p className="text-slate-400 mx-auto" style={{ fontSize: "calc(12px + 0.5vw)", maxWidth: "480px", lineHeight: 1.6, marginBottom: "calc(20px + 1.5vw)" }}>
                21 themeable components with live customization. Adjust colors, typography, and spacing, then export production-ready code.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center" style={{ gap: "calc(6px + 0.5vw)" }}>
                <Link
                  href="/playground"
                  prefetch={false}
                  className="w-full sm:w-auto rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors inline-flex items-center justify-center gap-2"
                  style={{ padding: "calc(8px + 0.5vw) calc(16px + 1.5vw)", fontSize: "calc(13px + 0.3vw)" }}
                >
                  Open Playground
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/components"
                  prefetch={false}
                  className="w-full sm:w-auto rounded-full border border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 font-medium transition-colors inline-flex items-center justify-center"
                  style={{ padding: "calc(8px + 0.5vw) calc(16px + 1.5vw)", fontSize: "calc(13px + 0.3vw)" }}
                >
                  Browse Components
                </Link>
              </div>
            </div>
          </section>

          {/* Compact features - single row on desktop */}
          <section className="border-y border-slate-800/50 bg-slate-900/50" style={{ padding: "calc(24px + 3vw) calc(12px + 1.5vw)" }}>
            <div className="max-w-5xl mx-auto">
              <h2 className="sr-only">Features</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4" style={{ gap: "calc(10px + 1vw)" }}>
                {[
                  { icon: VantiveLogo, title: "21 Components", desc: "Marketing, commerce, and application UI.", isLogo: true },
                  { icon: Palette, title: "Live Theming", desc: "Colors, radius, typography update instantly." },
                  { icon: Smartphone, title: "Responsive", desc: "Preview desktop, tablet, and mobile." },
                  { icon: Code2, title: "Export Code", desc: "Copy JSX, CSS tokens, or Tailwind config." },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl bg-slate-800/30 border border-slate-700/50" style={{ padding: "calc(12px + 1.2vw)" }}>
                    {f.isLogo ? (
                      <f.icon size={24} className="text-cyan-400" style={{ marginBottom: "8px" }} />
                    ) : (
                      <f.icon className="w-6 h-6 text-cyan-400" aria-hidden="true" style={{ marginBottom: "8px" }} />
                    )}
                    <h3 className="text-sm font-bold text-white" style={{ marginBottom: "4px" }}>{f.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories - compact */}
          <section style={{ padding: "calc(32px + 3vw) calc(12px + 1.5vw)" }}>
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2" style={{ marginBottom: "calc(12px + 1.2vw)" }}>
                <Layers className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                <h2 className="text-lg font-bold text-white">Explore Categories</h2>
              </div>

              <div className="grid sm:grid-cols-3" style={{ gap: "calc(10px + 0.6vw)" }}>
                {[
                  { name: "Marketing UI", count: 7, color: "bg-orange-500", items: ["Hero", "Features", "Testimonials", "CTA"] },
                  { name: "Commerce UI", count: 6, color: "bg-cyan-500", items: ["Pricing", "Products", "Cart", "Checkout"] },
                  { name: "Application UI", count: 8, color: "bg-violet-500", items: ["Login", "Dashboard", "Settings", "Tables"] },
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/playground?category=${cat.name.toLowerCase()}`}
                    prefetch={false}
                    className="group block rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
                    style={{ padding: "calc(12px + 1.2vw)" }}
                  >
                    <div className={`w-8 h-0.5 ${cat.color} rounded-full`} style={{ marginBottom: "calc(10px + 0.6vw)" }} />
                    <div className="flex justify-between items-center" style={{ marginBottom: "8px" }}>
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
                      <span className="rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300" style={{ padding: "2px 8px" }}>{cat.count}</span>
                    </div>
                    <div className="flex flex-wrap" style={{ gap: "4px" }}>
                      {cat.items.map((item) => (
                        <span key={item} className="rounded text-[10px] text-slate-300 bg-slate-800/50 border border-slate-700/50" style={{ padding: "1px 6px" }}>
                          {item}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-[#0f172a]" style={{ padding: "calc(20px + 1.5vw) calc(12px + 1.5vw)" }} role="contentinfo">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <VantiveBrand size={18} color="#38bdf8" suffix="UI" />
            <p className="text-slate-300 text-xs">&copy; 2026 Vantive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
