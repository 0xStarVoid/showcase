import Head from "next/head";
import Link from "next/link";
import { ArrowRight, ChevronRight, Megaphone, ShoppingBag, FormInput } from "lucide-react";
import { cats, all } from "@/lib/items";
import VantiveBrand from "@/components/ui/VantiveBrand";
import Button from "@/components/ui/Button";

const catIcons = {
  marketing: Megaphone,
  commerce: ShoppingBag,
  forms: FormInput,
};

export default function Components() {
  return (
    <>
      <Head>
        <title>Components</title>
      </Head>

      <div className="min-h-screen bg-[#0f172a] text-slate-200 flex flex-col">
        <header className="sticky top-0 z-50 bg-[#0f172a] border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <a href="/" aria-label="Reload Vantive UI" className="flex items-center">
              <VantiveBrand size={20} color="#38bdf8" suffix="UI" />
            </a>
            <Button
              href="/playground"
              size="sm"
              gradient="linear-gradient(135deg, #06b6d4, #22d3ee)"
            >
              Open Playground
            </Button>
          </div>
        </header>

        <main className="flex-1">
          <section className="px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 sm:mb-10">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight mb-3">
                  Component Library
                </h1>
                <p className="text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
                  {all.length} production-ready components across {cats.length} categories. Each component responds to
                  your brand DNA settings.
                </p>
              </div>

              <div className="space-y-8 sm:space-y-10">
                {cats.map((cat) => {
                  const Icon = catIcons[cat.id] || Megaphone;
                  const total = cat.subs.reduce((a, s) => a + s.items.length, 0);
                  return (
                    <section key={cat.id}>
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-9 h-9 rounded-lg bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
                          <Icon className="w-4 h-4 text-cyan-400" aria-hidden="true" />
                        </div>
                        <div>
                          <h2 className="text-lg font-bold text-white">{cat.name}</h2>
                          <p className="text-xs text-slate-500">{total} components</p>
                        </div>
                      </div>

                      {cat.subs.map((sub) => (
                        <div key={sub.id} className="mb-5 last:mb-0">
                          <h3 className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider mb-3">
                            {sub.name}
                          </h3>
                          <div className="grid gap-3 sm:gap-4 grid-cols-[repeat(auto-fill,minmax(220px,1fr))]">
                            {sub.items.map((c) => (
                              <Link
                                key={c.id}
                                href={`/playground?component=${c.id}`}
                                prefetch={false}
                                className="group rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/50 hover:bg-slate-800/50 transition-colors p-4"
                              >
                                <div className="flex items-start justify-between mb-2 gap-2">
                                  <h4 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors">
                                    {c.name}
                                  </h4>
                                  <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-transform shrink-0" />
                                </div>
                                <p className="text-xs text-slate-400 mb-3 line-clamp-2 leading-relaxed">{c.desc}</p>
                                <div className="flex flex-wrap gap-1">
                                  {c.tags.slice(0, 3).map((t) => (
                                    <span
                                      key={t}
                                      className="rounded text-[10px] text-slate-300 bg-slate-800/50 border border-slate-700/50 px-1.5 py-0.5"
                                    >
                                      {t}
                                    </span>
                                  ))}
                                </div>
                              </Link>
                            ))}
                          </div>
                        </div>
                      ))}
                    </section>
                  );
                })}
              </div>
            </div>
          </section>

          <section className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 border-t border-slate-800/50 bg-slate-900/30">
            <div className="max-w-md mx-auto flex flex-col items-center text-center gap-3">
              <h2 className="text-lg sm:text-xl font-bold text-white">Ready to customize?</h2>
              <p className="text-xs sm:text-sm text-slate-400">
                Open the playground to start tweaking brand DNA and see components come to life.
              </p>
              <Button
                href="/playground"
                size="md"
                icon={ArrowRight}
                gradient="linear-gradient(135deg, #06b6d4, #22d3ee)"
              >
                Enter Playground
              </Button>
            </div>
          </section>
        </main>

        <footer className="border-t border-slate-800 bg-[#0f172a] px-4 py-6 sm:py-8 lg:px-8" role="contentinfo">
          <div className="max-w-5xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <a
              href="https://vantive.studio/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Vantive Studio"
              className="transition-opacity hover:opacity-80"
            >
              <VantiveBrand size={18} color="#ffffff" suffix="Studio" />
            </a>
            <p className="text-slate-400 text-xs sm:text-sm">&copy; 2026 Vantive. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </>
  );
}
