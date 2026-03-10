"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Layers,
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Megaphone,
  ShoppingBag,
  FormInput,
  X,
} from "lucide-react";
import { cats, search } from "@/lib/items";
import { useBrand } from "@/hooks/useBrand";

const icons = {
  marketing: Megaphone,
  commerce: ShoppingBag,
  forms: FormInput,
};

export default function Nav({ collapsed, onToggleCollapse }) {
  const [q, setQ] = useState("");
  const [expCats, setExpCats] = useState(["marketing", "commerce", "forms"]);
  const [expSubs, setExpSubs] = useState([]);

  const { sel, setSel } = useBrand();

  const results = useMemo(() => (q.trim() ? search(q) : []), [q]);

  const toggleCat = (id) => {
    setExpCats((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const toggleSub = (id) => {
    setExpSubs((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  };

  const select = (c) => {
    setSel(c.id);
    setQ("");
  };

  // Collapsed view - just icons for quick navigation
  if (collapsed) {
    return (
      <aside className="w-12 h-screen border-r border-slate-800 bg-[#0f172a] flex flex-col shrink-0">
        <div className="p-2 border-b border-slate-800">
          <button
            onClick={onToggleCollapse}
            className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            aria-label="Expand navigation"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 p-2 space-y-2">
          <Link
            href="/"
            className="block p-2 rounded-lg hover:bg-slate-800 text-cyan-400 transition-colors"
            aria-label="Home"
          >
            <Layers className="w-4 h-4 mx-auto" />
          </Link>
          <div className="border-t border-slate-700 my-2" />
          {Object.entries(icons).map(([id, Icon]) => (
            <button
              key={id}
              onClick={() => {
                setExpCats([id]);
                onToggleCollapse?.();
              }}
              className="w-full p-2 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors"
              title={id.charAt(0).toUpperCase() + id.slice(1)}
              aria-label={`Open ${id} category`}
            >
              <Icon className="w-4 h-4 mx-auto" />
            </button>
          ))}
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-64 h-screen border-r border-slate-800 bg-[#0f172a] flex flex-col shrink-0">
      <div className="p-4 border-b border-slate-800">
        <div className="flex items-center gap-2 mb-4">
          {onToggleCollapse && (
            <button
              onClick={onToggleCollapse}
              className="p-1.5 rounded-lg hover:bg-slate-800 text-slate-400 hover:text-slate-300 transition-colors"
              aria-label="Collapse navigation"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
          )}
          <Link href="/" className="flex items-center gap-3 flex-1">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-cyan-400 to-blue-500 flex items-center justify-center">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <div>
              <span className="font-semibold text-white block leading-tight">Showcase</span>
              <span className="text-xs text-slate-400">Component Library</span>
            </div>
          </Link>
        </div>

        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search..."
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className="w-full pl-9 pr-8 py-2 rounded-lg bg-slate-800/50 border border-slate-700/50 text-sm text-white placeholder:text-slate-400 focus:outline-none focus:border-cyan-500/50"
            aria-label="Search components"
          />
          {q && (
            <button
              onClick={() => setQ("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <AnimatePresence mode="wait">
          {q ? (
            <motion.div
              key="search"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {results.length > 0 ? (
                <>
                  <p className="px-3 py-2 text-xs font-medium text-slate-400 uppercase tracking-wider">
                    {results.length} result{results.length !== 1 ? "s" : ""}
                  </p>
                  {results.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => select(c)}
                      className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                        sel === c.id ? "bg-cyan-500/10 text-cyan-400" : "hover:bg-slate-800 text-slate-300"
                      }`}
                    >
                      <div className="font-medium text-sm">{c.name}</div>
                      <div className="text-xs text-slate-400 mt-0.5 capitalize">
                        {c.cat} / {c.sub}
                      </div>
                    </button>
                  ))}
                </>
              ) : (
                <div className="text-center py-8">
                  <p className="text-slate-400 text-sm">No components found</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="categories"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-1"
            >
              {cats.map((cat) => {
                const Icon = icons[cat.id] || Layers;
                const exp = expCats.includes(cat.id);

                return (
                  <div key={cat.id}>
                    <button
                      onClick={() => toggleCat(cat.id)}
                      className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800/50 transition-colors"
                    >
                      <Icon className="w-4 h-4 text-slate-400" />
                      <span className="flex-1 text-left font-medium text-sm text-white">{cat.name}</span>
                      <motion.div animate={{ rotate: exp ? 0 : -90 }} transition={{ duration: 0.2 }}>
                        <ChevronDown className="w-4 h-4 text-slate-400" />
                      </motion.div>
                    </button>

                    <AnimatePresence>
                      {exp && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden"
                        >
                          <div className="ml-4 pl-3 border-l border-slate-700 space-y-0.5 py-1">
                            {cat.subs.map((sub) => {
                              const subExp = expSubs.includes(sub.id);
                              return (
                                <div key={sub.id}>
                                  <button
                                    onClick={() => toggleSub(sub.id)}
                                    className="w-full flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-slate-800/50 transition-colors text-sm text-slate-400"
                                  >
                                    <motion.div animate={{ rotate: subExp ? 90 : 0 }} transition={{ duration: 0.15 }}>
                                      <ChevronRight className="w-3.5 h-3.5" />
                                    </motion.div>
                                    <span className="flex-1 text-left">{sub.name}</span>
                                    <span className="text-xs text-slate-600">{sub.items.length}</span>
                                  </button>

                                  <AnimatePresence>
                                    {subExp && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.15 }}
                                        className="overflow-hidden"
                                      >
                                        <div className="space-y-0.5 py-1">
                                          {sub.items.map((c) => (
                                            <button
                                              key={c.id}
                                              onClick={() => select(c)}
                                              className={`w-full text-left px-4 py-1.5 rounded-lg text-sm transition-colors ${
                                                sel === c.id
                                                  ? "bg-cyan-500/10 text-cyan-400"
                                                  : "text-slate-400 hover:bg-slate-800/50 hover:text-slate-300"
                                              }`}
                                            >
                                              {c.name}
                                            </button>
                                          ))}
                                        </div>
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="flex items-center gap-2 text-xs text-slate-400">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Production ready</span>
        </div>
      </div>
    </aside>
  );
}
