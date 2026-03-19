import Head from "next/head";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { cats, all } from "@/lib/items";
import VantiveBrand from "@/components/ui/VantiveBrand";
import Button from "@/components/ui/Button";

export default function Components() {
  return (
    <>
      <Head>
        <title>Components</title>
      </Head>

      <div className="min-h-screen bg-[#fafafa] dark:bg-[#0a0a0a] architect-grid">
        <header className="border-b border-neutral-100 dark:border-neutral-800 bg-white/80 dark:bg-neutral-900/80 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <VantiveBrand size={22} color="#38bdf8" suffix="UI" />
            </Link>
            <Button
              href="/playground"
              size="sm"
              gradient="linear-gradient(135deg, #06b6d4, #22d3ee)"
            >
              Open Playground
            </Button>
          </div>
        </header>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div data-reveal className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4 font-serif">
                Component Library
              </h1>
              <p className="text-lg text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                {all.length} production-ready components across {cats.length} categories. Each component responds to
                your brand DNA settings.
              </p>
            </div>

            <div className="space-y-12">
              {cats.map((cat, i) => (
                <section key={cat.id} data-reveal style={{ animationDelay: `${i * 0.1}s` }}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900/50 dark:to-indigo-900/50 flex items-center justify-center">
                      <span className="text-lg">
                        {cat.id === "marketing" && "📣"}
                        {cat.id === "commerce" && "🛒"}
                        {cat.id === "forms" && "📝"}
                      </span>
                    </div>
                    <div>
                      <h2 className="text-xl font-bold text-neutral-900 dark:text-white">{cat.name}</h2>
                      <p className="text-sm text-neutral-500">
                        {cat.subs.reduce((a, s) => a + s.items.length, 0)} components
                      </p>
                    </div>
                  </div>

                  {cat.subs.map((sub) => (
                    <div key={sub.id} className="mb-8">
                      <h3 className="text-sm font-semibold text-neutral-600 dark:text-neutral-400 uppercase tracking-wider mb-4">
                        {sub.name}
                      </h3>
                      <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                        {sub.items.map((c) => (
                          <Link
                            key={c.id}
                            href={`/playground?component=${c.id}`}
                            className="group p-5 bg-white dark:bg-neutral-800 rounded-2xl border border-neutral-100 dark:border-neutral-700 hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-lg transition-colors"
                          >
                            <div className="flex items-start justify-between mb-3">
                              <h4 className="font-semibold text-neutral-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                                {c.name}
                              </h4>
                              <ChevronRight className="w-4 h-4 text-neutral-400 group-hover:text-blue-500 group-hover:translate-x-1 transition-transform" />
                            </div>
                            <p className="text-sm text-neutral-600 dark:text-neutral-400 mb-3 line-clamp-2">{c.desc}</p>
                            <div className="flex flex-wrap gap-1.5">
                              {c.tags.slice(0, 3).map((t) => (
                                <span
                                  key={t}
                                  className="px-2 py-0.5 bg-neutral-100 dark:bg-neutral-700 rounded-md text-xs text-neutral-600 dark:text-neutral-400"
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
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 px-6 border-t border-neutral-100 dark:border-neutral-800">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4">Ready to customize?</h2>
            <p className="text-neutral-600 dark:text-neutral-400 mb-8">
              Open the playground to start tweaking brand DNA and see components come to life.
            </p>
            <Button
              href="/playground"
              size="lg"
              icon={ArrowRight}
              gradient="linear-gradient(135deg, #06b6d4, #22d3ee)"
            >
              Enter Playground
            </Button>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-neutral-100 dark:border-neutral-800">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <VantiveBrand size={16} color="#38bdf8" suffix="UI" />
            <p className="text-neutral-500 dark:text-neutral-500 text-sm">
              Built with Next.js, Tailwind CSS, and Framer Motion
            </p>
          </div>
        </footer>
      </div>
    </>
  );
}
