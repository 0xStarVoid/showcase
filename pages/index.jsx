import { useRef, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Palette, Smartphone, Sparkles, Zap, Code2, Eye, Layers } from "lucide-react";
import VantiveLogo from "@/components/ui/VantiveLogo";
import VantiveBrand from "@/components/ui/VantiveBrand";
import Button from "@/components/ui/Button";

/* ── mouse-follow glow card row (ported from legacy CardRow) ── */
function GlowGrid({ children, className = "" }) {
  const ref = useRef(null);

  const onMove = useCallback((e) => {
    if (!ref.current) return;
    const cards = ref.current.querySelectorAll("[data-glow]");
    cards.forEach((card) => {
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    });
  }, []);

  return (
    <div ref={ref} className={className} onMouseMove={onMove}>
      {children}
    </div>
  );
}

/* ── feature data ── */
const features = [
  {
    icon: VantiveLogo,
    title: "21 Production Components",
    desc: "Hero sections, pricing tables, auth forms, dashboards — all tested and accessible.",
    isLogo: true,
  },
  {
    icon: Palette,
    title: "Live Brand Theming",
    desc: "Change colors, radius, typography, and playfulness — every component updates instantly.",
  },
  {
    icon: Smartphone,
    title: "Responsive by Default",
    desc: "Preview on desktop, tablet, and mobile frames with real device emulation.",
  },
  {
    icon: Sparkles,
    title: "Export-Ready Code",
    desc: "Copy JSX, CSS tokens, or Tailwind config — generated from your exact brand settings.",
  },
];

const categories = [
  {
    name: "Marketing UI",
    count: 7,
    gradient: "from-orange-500 to-amber-500",
    desc: "Hero sections, feature grids, testimonials, CTAs, and pricing.",
    items: ["Hero Gradient", "Feature Grid", "Testimonials", "CTA Banner"],
  },
  {
    name: "Commerce UI",
    count: 6,
    gradient: "from-cyan-500 to-blue-500",
    desc: "Product cards, shopping carts, pricing tables, and checkout flows.",
    items: ["Pricing Card", "Product Gallery", "Cart Drawer", "Checkout"],
  },
  {
    name: "Application UI",
    count: 8,
    gradient: "from-violet-500 to-purple-500",
    desc: "Login forms, dashboards, settings panels, and data tables.",
    items: ["Login Form", "Dashboard", "Settings Panel", "Data Table"],
  },
];

const stats = [
  { value: "21", label: "Components" },
  { value: "3", label: "Categories" },
  { value: "100", label: "Lighthouse" },
  { value: "0", label: "Dependencies*" },
];

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

      <div className="min-h-screen bg-[#0a0f1a] text-slate-200 selection:bg-cyan-500/30">
        {/* ── Navbar ── */}
        <nav
          className="sticky top-0 z-50 backdrop-blur-xl border-b border-white/[0.06]"
          style={{ backgroundColor: "rgba(10, 15, 26, 0.85)" }}
          aria-label="Main navigation"
        >
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="group" aria-label="Vantive UI home">
              <VantiveBrand
                size={22}
                color="#38bdf8"
                suffix="UI"
                className="transition-transform group-hover:scale-105"
              />
            </Link>
            <div className="flex items-center gap-3">
              <Link
                href="/components"
                className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white transition-colors"
              >
                Components
              </Link>
              <Button
                href="/playground"
                size="sm"
                icon={ArrowRight}
                gradient="linear-gradient(135deg, #06b6d4, #3b82f6)"
                color="#0a0f1a"
                background="#0a0f1a"
              >
                Playground
              </Button>
            </div>
          </div>
        </nav>

        <main>
          {/* ── Hero ── */}
          <section className="relative pt-24 pb-32 px-6 overflow-hidden">
            {/* Ambient glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
              style={{
                background: "radial-gradient(ellipse at center, rgba(56,189,248,0.08) 0%, transparent 70%)",
              }}
              aria-hidden="true"
            />
            {/* Grid pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-[0.03]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
                backgroundSize: "64px 64px",
              }}
              aria-hidden="true"
            />

            <div style={{ maxWidth: "56rem", margin: "0 auto", textAlign: "center", position: "relative" }}>
              <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.375rem 0.75rem", borderRadius: "9999px", background: "rgba(6,182,212,0.1)", border: "1px solid rgba(6,182,212,0.2)", color: "#22d3ee", fontSize: "0.75rem", fontWeight: 600, marginBottom: "2rem" }}>
                <Zap style={{ width: "0.875rem", height: "0.875rem" }} aria-hidden="true" />
                <span>Component System</span>
              </div>

              <h1
                style={{ color: "#fff", fontWeight: 700, lineHeight: 1.1, letterSpacing: "-0.025em", fontSize: "clamp(3rem, 5vw, 4.5rem)", marginBottom: "1.5rem" }}
              >
                Build interfaces
                <br />
                <span
                  style={{ backgroundImage: "linear-gradient(to right, #22d3ee, #38bdf8, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}
                >
                  that feel right.
                </span>
              </h1>

              <p style={{ color: "#94a3b8", fontSize: "1.125rem", lineHeight: 1.75, maxWidth: "42rem", margin: "0 auto 2.5rem", textAlign: "center" }}>
                21 production-ready components with live brand customization.
                <br />
                Adjust colors, typography, and radius — preview instantly on any device.
              </p>

              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
                <Button
                  href="/playground"
                  size="lg"
                  icon={ArrowRight}
                  gradient="linear-gradient(135deg, #06b6d4, #3b82f6)"
                  color="#0a0f1a"
                  background="#0a0f1a"
                >
                  Open Playground
                </Button>
                <Button
                  href="/components"
                  variant="outline"
                  size="lg"
                  gradient="linear-gradient(135deg, #06b6d4, #3b82f6)"
                  color="#0a0f1a"
                  background="#0a0f1a"
                >
                  Browse Components
                </Button>
              </div>

              {/* Stats bar */}
              <div className="mt-16 flex items-center justify-center gap-8 md:gap-12">
                {stats.map((s) => (
                  <div key={s.label} className="text-center">
                    <div className="text-2xl md:text-3xl font-bold text-white">{s.value}</div>
                    <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider">{s.label}</div>
                  </div>
                ))}
              </div>
              <p className="text-[10px] text-slate-500 mt-3">*No runtime dependencies beyond React</p>
            </div>
          </section>

          {/* ── Features Grid (with mouse-follow glow) ── */}
          <section className="py-20 px-6 border-y border-white/[0.04]" style={{ backgroundColor: "rgba(15, 23, 42, 0.5)" }}>
            <div className="max-w-7xl mx-auto">
              <h2 className="sr-only">Features</h2>
              <GlowGrid className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {features.map((f) => (
                  <article
                    key={f.title}
                    data-glow
                    className="relative p-6 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden group"
                  >
                    {/* Mouse-follow glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(300px circle at var(--mx) var(--my), rgba(56,189,248,0.08), transparent 60%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      {f.isLogo ? (
                        <f.icon size={28} className="text-cyan-400 mb-4" />
                      ) : (
                        <f.icon className="w-7 h-7 text-cyan-400 mb-4" aria-hidden="true" />
                      )}
                      <h3 className="text-base font-bold text-white mb-2 leading-snug">{f.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                    </div>
                  </article>
                ))}
              </GlowGrid>
            </div>
          </section>

          {/* ── How it works ── */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">How it works</h2>
                <p className="text-slate-400 text-lg max-w-xl mx-auto">
                  Three steps from browsing to shipping branded components.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    icon: Eye,
                    title: "Browse & select",
                    desc: "Pick from 21 components across marketing, commerce, and application categories.",
                  },
                  {
                    step: "02",
                    icon: Palette,
                    title: "Customize brand",
                    desc: "Adjust colors, typography, corner radius, and playfulness. Preview on any device frame.",
                  },
                  {
                    step: "03",
                    icon: Code2,
                    title: "Export code",
                    desc: "Copy production-ready JSX, CSS design tokens, or Tailwind config — all generated live.",
                  },
                ].map((s) => (
                  <div key={s.step} className="relative">
                    <span className="text-6xl font-black text-white/[0.03] absolute -top-4 -left-2 select-none" aria-hidden="true">
                      {s.step}
                    </span>
                    <div className="relative z-10 pt-4">
                      <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center mb-4">
                        <s.icon className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                      </div>
                      <h3 className="text-lg font-bold text-white mb-2">{s.title}</h3>
                      <p className="text-slate-400 text-sm leading-relaxed">{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Component Categories ── */}
          <section className="py-24 px-6 border-y border-white/[0.04]" style={{ backgroundColor: "rgba(15, 23, 42, 0.3)" }}>
            <div className="max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                    <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">Library</span>
                  </div>
                  <h2 className="text-3xl font-bold text-white mb-2">Explore Categories</h2>
                  <p className="text-slate-400">Browse our collection of adaptive, themeable components.</p>
                </div>
                <Button
                  href="/playground"
                  size="sm"
                  variant="outline"
                  icon={ArrowRight}
                  gradient="linear-gradient(135deg, #06b6d4, #3b82f6)"
                  color="#0a0f1a"
                  background="rgba(15, 23, 42, 0.3)"
                  className="hidden md:inline-flex"
                >
                  View all
                </Button>
              </div>

              <GlowGrid className="grid md:grid-cols-3 gap-6">
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/playground?category=${cat.name.toLowerCase()}`}
                    prefetch={false}
                    data-glow
                    className="group relative block p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-300 overflow-hidden"
                  >
                    {/* Mouse-follow glow */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                      style={{
                        background:
                          "radial-gradient(400px circle at var(--mx) var(--my), rgba(56,189,248,0.06), transparent 60%)",
                      }}
                      aria-hidden="true"
                    />
                    <div className="relative z-10">
                      <div className={`w-12 h-1 bg-gradient-to-r ${cat.gradient} rounded-full mb-6`} />
                      <div className="flex justify-between items-center mb-3">
                        <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                          {cat.name}
                        </h3>
                        <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.06] text-xs font-semibold text-slate-300">
                          {cat.count}
                        </span>
                      </div>
                      <p className="text-slate-400 text-sm mb-4">{cat.desc}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {cat.items.map((item) => (
                          <span
                            key={item}
                            className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-400 bg-white/[0.05] border border-white/[0.06]"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </Link>
                ))}
              </GlowGrid>
            </div>
          </section>

          {/* ── Bottom CTA ── */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto rounded-3xl border border-cyan-500/10 p-12 md:p-16 text-center relative overflow-hidden">
              {/* Gradient bg */}
              <div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(ellipse at 30% 50%, rgba(56,189,248,0.06) 0%, transparent 50%), radial-gradient(ellipse at 70% 50%, rgba(139,92,246,0.04) 0%, transparent 50%)",
                }}
                aria-hidden="true"
              />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to build?
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
                  Open the playground, pick a component, customize your brand — ship in minutes.
                </p>
                <Button
                  href="/playground"
                  size="lg"
                  icon={ArrowRight}
                  gradient="linear-gradient(135deg, #06b6d4, #3b82f6)"
                  color="#0a0f1a"
                  background="#0a0f1a"
                >
                  Open Playground
                </Button>
              </div>
            </div>
          </section>
        </main>

        {/* ── Footer ── */}
        <footer className="border-t border-white/[0.04] py-10 px-6" role="contentinfo">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <VantiveBrand size={20} color="#38bdf8" suffix="UI" />
            <p className="text-slate-400 text-sm">&copy; 2026 Vantive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
