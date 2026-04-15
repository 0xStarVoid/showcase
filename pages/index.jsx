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
          <div className="w-full max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6 lg:px-8 h-16 sm:h-20">
            <Link href="/" aria-label="Vantive UI home">
              <VantiveBrand size={20} color="#38bdf8" suffix="UI" />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/components"
                prefetch={false}
                className="hidden sm:inline text-sm font-medium text-slate-400 hover:text-white transition-colors px-3 py-2"
              >
                Components
              </Link>
              <Link
                href="/playground"
                prefetch={false}
                className="flex items-center gap-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-sm font-bold text-slate-950 transition-colors px-4 py-2 sm:px-5 sm:py-2.5"
              >
                Playground
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </nav>

        <main className="flex-1">
          {/* Hero */}
          <section className="px-4 py-12 sm:py-20 lg:py-28 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold px-4 py-2 mb-6 sm:mb-8">
                <VantiveLogo size={14} color="#22d3ee" />
                <span>21 Production Components</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6">
                Build interfaces{" "}
                <span className="bg-gradient-to-r from-cyan-400 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                  that feel right.
                </span>
              </h1>

              <p className="text-base sm:text-lg lg:text-xl text-slate-400 mx-auto max-w-lg leading-relaxed mb-8 sm:mb-10">
                21 themeable components with live customization. Adjust colors, typography, and spacing, then export production-ready code.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
                <Link
                  href="/playground"
                  prefetch={false}
                  className="w-full sm:w-auto rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors inline-flex items-center justify-center gap-2 px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base"
                >
                  Open Playground
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/components"
                  prefetch={false}
                  className="w-full sm:w-auto rounded-full border border-slate-600 text-slate-300 hover:border-cyan-500 hover:text-cyan-400 font-medium transition-colors inline-flex items-center justify-center px-6 py-3 sm:px-8 sm:py-3.5 text-sm sm:text-base"
                >
                  Browse Components
                </Link>
              </div>
            </div>
          </section>

          {/* Features */}
          <section className="border-y border-slate-800/50 bg-slate-900/50 px-4 py-10 sm:py-16 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <h2 className="sr-only">Features</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
                {[
                  { icon: VantiveLogo, title: "21 Components", desc: "Marketing, commerce, and application UI.", isLogo: true },
                  { icon: Palette, title: "Live Theming", desc: "Colors, radius, typography update instantly." },
                  { icon: Smartphone, title: "Responsive", desc: "Preview desktop, tablet, and mobile." },
                  { icon: Code2, title: "Export Code", desc: "Copy JSX, CSS tokens, or Tailwind config." },
                ].map((f) => (
                  <div key={f.title} className="rounded-xl bg-slate-800/30 border border-slate-700/50 p-5 sm:p-6">
                    {f.isLogo ? (
                      <f.icon size={24} className="text-cyan-400 mb-3" />
                    ) : (
                      <f.icon className="w-6 h-6 text-cyan-400 mb-3" aria-hidden="true" />
                    )}
                    <h3 className="text-sm font-bold text-white mb-1.5">{f.title}</h3>
                    <p className="text-slate-400 text-xs leading-relaxed">{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Categories */}
          <section className="px-4 py-12 sm:py-20 lg:px-8">
            <div className="max-w-5xl mx-auto">
              <div className="flex items-center gap-2 mb-6 sm:mb-8">
                <Layers className="w-5 h-5 text-cyan-400" aria-hidden="true" />
                <h2 className="text-lg font-bold text-white">Explore Categories</h2>
              </div>

              <div className="grid sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { name: "Marketing UI", count: 7, color: "bg-orange-500", items: ["Hero", "Features", "Testimonials", "CTA"] },
                  { name: "Commerce UI", count: 6, color: "bg-cyan-500", items: ["Pricing", "Products", "Cart", "Checkout"] },
                  { name: "Application UI", count: 8, color: "bg-violet-500", items: ["Login", "Dashboard", "Settings", "Tables"] },
                ].map((cat) => (
                  <Link
                    key={cat.name}
                    href={`/playground?category=${cat.name.toLowerCase()}`}
                    prefetch={false}
                    className="group block rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-slate-600 transition-colors p-5 sm:p-6"
                  >
                    <div className={`w-8 h-1 ${cat.color} rounded-full mb-4 sm:mb-5`} />
                    <div className="flex justify-between items-center mb-3">
                      <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">{cat.name}</h3>
                      <span className="rounded-full bg-slate-800 border border-slate-700 text-[10px] font-semibold text-slate-300 px-2.5 py-0.5">{cat.count}</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {cat.items.map((item) => (
                        <span key={item} className="rounded text-[10px] text-slate-300 bg-slate-800/50 border border-slate-700/50 px-2 py-0.5">
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
        <footer className="border-t border-slate-800 bg-[#0f172a] px-4 py-8 sm:py-12 lg:px-8" role="contentinfo">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <VantiveBrand size={18} color="#38bdf8" suffix="UI" />
            <p className="text-slate-400 text-xs sm:text-sm">&copy; 2026 Vantive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
