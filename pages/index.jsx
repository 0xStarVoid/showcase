import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Palette, Smartphone, Sparkles, Zap, Code2, Eye, Layers } from "lucide-react";
import VantiveLogo from "@/components/ui/VantiveLogo";
import VantiveBrand from "@/components/ui/VantiveBrand";
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

      <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/95 border-b border-slate-800" aria-label="Main navigation">
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
              <Link
                href="/playground"
                prefetch={false}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-sm font-bold text-slate-950 transition-all"
              >
                Playground
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </nav>

        <main>
          {/* Hero */}
          <section className="pt-24 pb-32 px-6">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8">
                <Zap className="w-3.5 h-3.5" />
                <span>Component System</span>
              </div>

              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
                Build interfaces
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  that feel right.
                </span>
              </h1>

              <p className="text-lg text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
                21 production-ready components with live brand customization.
                <br />
                Adjust colors, typography, and radius -preview instantly on any device.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link
                  href="/playground"
                  prefetch={false}
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-base sm:text-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5 inline-flex items-center justify-center gap-2"
                >
                  Open Playground
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/components"
                  className="w-full sm:w-auto px-6 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-base sm:text-lg border border-slate-700 hover:border-slate-600 transition-all inline-flex items-center justify-center"
                >
                  Browse Components
                </Link>
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
              <p className="text-[10px] text-slate-400 mt-3">*No runtime dependencies beyond React</p>
            </div>
          </section>

          {/* Features Grid */}
          <section className="py-20 px-6 border-y border-slate-800/50 bg-slate-900/50">
            <div className="max-w-7xl mx-auto">
              <h2 className="sr-only">Features</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                  {
                    icon: VantiveLogo,
                    title: "21 Production Components",
                    desc: "Hero sections, pricing tables, auth forms, dashboards -all tested and accessible.",
                    isLogo: true,
                  },
                  {
                    icon: Palette,
                    title: "Live Brand Theming",
                    desc: "Change colors, radius, typography, and playfulness -every component updates instantly.",
                  },
                  {
                    icon: Smartphone,
                    title: "Responsive by Default",
                    desc: "Preview on desktop, tablet, and mobile frames with real device emulation.",
                  },
                  {
                    icon: Sparkles,
                    title: "Export-Ready Code",
                    desc: "Copy JSX, CSS tokens, or Tailwind config -generated from your exact brand settings.",
                  },
                ].map((f) => (
                  <div
                    key={f.title}
                    className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
                  >
                    {f.isLogo ? (
                      <f.icon size={32} className="text-cyan-400 mb-4" />
                    ) : (
                      <f.icon className="w-8 h-8 text-cyan-400 mb-4" aria-hidden="true" />
                    )}
                    <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How it works */}
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
                    desc: "Copy production-ready JSX, CSS design tokens, or Tailwind config -all generated live.",
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

          {/* Component Categories */}
          <section className="py-24 px-6 border-y border-slate-800/50 bg-slate-900/30">
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
                <Link
                  href="/playground"
                  prefetch={false}
                  className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
                >
                  View all <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Marketing UI",
                    count: 7,
                    color: "bg-orange-500",
                    desc: "Hero sections, feature grids, testimonials, CTAs, and pricing.",
                    items: ["Hero Gradient", "Feature Grid", "Testimonials", "CTA Banner"],
                  },
                  {
                    name: "Commerce UI",
                    count: 6,
                    color: "bg-cyan-500",
                    desc: "Product cards, shopping carts, pricing tables, and checkout flows.",
                    items: ["Pricing Card", "Product Gallery", "Cart Drawer", "Checkout"],
                  },
                  {
                    name: "Application UI",
                    count: 8,
                    color: "bg-violet-500",
                    desc: "Login forms, dashboards, settings panels, and data tables.",
                    items: ["Login Form", "Dashboard", "Settings Panel", "Data Table"],
                  },
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/playground?category=${cat.name.toLowerCase()}`}
                    prefetch={false}
                    className="group block p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 transition-all"
                  >
                    <div className={`w-12 h-1 ${cat.color} rounded-full mb-6`} />
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {cat.name}
                      </h3>
                      <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                        {cat.count}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm mb-4">{cat.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span
                          key={item}
                          className="px-2 py-0.5 rounded text-[10px] font-medium text-slate-400 bg-slate-800/50 border border-slate-700/50"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="py-24 px-6">
            <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 p-12 md:p-16 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-cyan-500/5" />
              <div className="relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  Ready to build?
                </h2>
                <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
                  Open the playground, pick a component, customize your brand -ship in minutes.
                </p>
                <Link
                  href="/playground"
                  prefetch={false}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-all shadow-lg shadow-cyan-500/20"
                >
                  Open Playground
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-[#0f172a] py-12 px-6" role="contentinfo">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <VantiveBrand size={20} color="#38bdf8" suffix="UI" />
            <p className="text-slate-400 text-sm">&copy; 2026 Vantive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
