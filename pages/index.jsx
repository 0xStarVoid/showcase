import Head from "next/head";
import Link from "next/link";
import { ArrowRight, Layers, Palette, Smartphone, Sparkles, Zap } from "lucide-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Component Showcase</title>
      </Head>

      <div className="min-h-screen bg-[#0f172a] text-slate-200 selection:bg-cyan-500/30">
        {/* Navbar */}
        <nav className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center transition-transform group-hover:scale-110">
                <Layers className="w-5 h-5 text-white" />
              </div>
              <span className="font-bold text-white tracking-tight">Component Showcase</span>
            </Link>
            <Link
              href="/playground"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-sm font-medium text-white transition-all border border-slate-700 hover:border-slate-600"
            >
              Open Playground
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="pt-24 pb-32 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-8">
              <Zap className="w-3.5 h-3.5" />
              <span>Component System</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
              Production-Ready
              <br />
              <span className="text-cyan-400">UI Components</span>
            </h1>

            <p className="text-xl text-slate-400 max-w-2xl mx-auto mb-10 leading-relaxed">
              Themeable component library with live customization. Adjust brand colors, typography, and spacing in real
              time. Built for teams that need consistency at scale.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                href="/playground"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold text-lg transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 transform hover:-translate-y-0.5"
              >
                Open Playground
              </Link>
              <Link
                href="/components"
                className="w-full sm:w-auto px-6 py-3 md:px-8 md:py-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-lg border border-slate-700 hover:border-slate-600 transition-all"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 px-6 border-y border-slate-800/50 bg-slate-900/50">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: Layers, title: "Production-ready components", desc: "Production-ready UI elements" },
                { icon: Palette, title: "Global theming and shared tokens", desc: "Global style & branding controls" },
                { icon: Smartphone, title: "Fully responsive layouts", desc: "Optimized for all viewports" },
                { icon: Sparkles, title: "Built with React and modern CSS", desc: "React, Tailwind, Framer Motion" },
              ].map((f) => (
                <div
                  key={f.title}
                  className="p-6 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors"
                >
                  <f.icon className="w-8 h-8 text-cyan-400 mb-4" />
                  <h3 className="text-lg font-bold text-white mb-2">{f.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Component Categories */}
        <section className="py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">Explore Categories</h2>
                <p className="text-slate-400">Browse our collection of adaptive components</p>
              </div>
              <Link
                href="/playground"
                className="hidden md:flex items-center gap-2 text-cyan-400 hover:text-cyan-300 font-medium transition-colors"
              >
                View all <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: "Marketing UI", count: 7, color: "bg-orange-500", desc: "Hero sections, features, CTAs" },
                { name: "Commerce UI", count: 6, color: "bg-cyan-500", desc: "Products, carts, pricing tables" },
                { name: "Application UI", count: 8, color: "bg-violet-500", desc: "Forms, auth, dashboards" },
              ].map((cat) => (
                <Link
                  key={cat.name}
                  href={`/playground?category=${cat.name.toLowerCase()}`}
                  className="group block p-8 rounded-2xl bg-slate-800/30 border border-slate-700/50 hover:bg-slate-800/50 hover:border-slate-600 transition-all"
                >
                  <div className={`w-12 h-1 ${cat.color} rounded-full mb-6`} />
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-xs font-semibold text-slate-300">
                      {cat.count} items
                    </span>
                  </div>
                  <p className="text-slate-400 text-sm">{cat.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="py-24 px-6">
          <div className="max-w-5xl mx-auto rounded-3xl bg-gradient-to-br from-cyan-900/20 to-slate-900 border border-cyan-500/20 p-12 text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-cyan-500/5" />
            <div className="relative z-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Try the Playground</h2>
              <p className="text-slate-400 max-w-lg mx-auto mb-10 text-lg">
                Preview all components and test theme changes in real time.
              </p>
              <Link
                href="/playground"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-white font-bold transition-all shadow-lg shadow-cyan-500/20"
              >
                Open Playground
              </Link>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-800 bg-[#0f172a] py-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-500" />
              <span className="font-semibold text-white">Component Showcase</span>
            </div>
            <p className="text-slate-400 text-sm">© 2026 Vantive.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
