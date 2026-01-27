import { motion } from "framer-motion";
import { Code, Info } from "lucide-react";

/**
 * PropsTable - Displays component prop documentation
 * @param {Object} props
 * @param {Array} props.props - Array of prop definitions [{name, type, default, desc}]
 * @param {string} props.componentName - Name of the component (optional)
 */
export default function PropsTable({ props = [], componentName = "" }) {
  if (!props || props.length === 0) {
    return (
      <div className="p-4 rounded-xl bg-slate-800/50 border border-slate-700 text-center">
        <Info className="w-5 h-5 text-slate-500 mx-auto mb-2" />
        <p className="text-sm text-slate-400">No props documentation available for this component.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl overflow-hidden border border-slate-700 bg-slate-800/50"
    >
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-700 flex items-center gap-2 bg-slate-800/80">
        <Code className="w-4 h-4 text-cyan-400" />
        <span className="text-sm font-semibold text-white">{componentName ? `${componentName} Props` : "Props"}</span>
        <span className="text-xs text-slate-500 ml-auto">{props.length} props</span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-slate-700 bg-slate-800/40">
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Prop
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Type
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Default
              </th>
              <th className="px-4 py-2 text-left text-xs font-semibold text-slate-400 uppercase tracking-wider">
                Description
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700/50">
            {props.map((prop, i) => (
              <motion.tr
                key={prop.name}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
                className="hover:bg-slate-700/30 transition-colors"
              >
                <td className="px-4 py-3">
                  <code className="text-cyan-400 font-mono text-xs bg-cyan-500/10 px-1.5 py-0.5 rounded">
                    {prop.name}
                  </code>
                </td>
                <td className="px-4 py-3">
                  <span className="text-purple-400 font-mono text-xs">{prop.type}</span>
                </td>
                <td className="px-4 py-3">
                  <code className="text-amber-400 font-mono text-xs">{prop.default}</code>
                </td>
                <td className="px-4 py-3 text-slate-300 text-xs">{prop.desc}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}
