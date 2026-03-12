/**
 * Lightweight framer-motion shim.
 * Renders plain HTML elements with animate values applied as inline styles.
 * Uses compositor-friendly properties (transform + opacity) for performance.
 */
import { forwardRef, createElement } from "react";

const MOTION_PROPS = new Set([
  "initial",
  "animate",
  "exit",
  "transition",
  "layout",
  "layoutId",
  "whileHover",
  "whileTap",
  "whileInView",
  "whileFocus",
  "whileDrag",
  "variants",
  "onAnimationComplete",
  "onAnimationStart",
  "drag",
  "dragConstraints",
  "dragElastic",
  "dragMomentum",
  "dragTransition",
]);

function resolveAnimateStyle(animate) {
  if (!animate || typeof animate !== "object" || Array.isArray(animate)) return {};
  const s = {};
  const transforms = [];
  for (const [k, v] of Object.entries(animate)) {
    if (Array.isArray(v)) continue;
    if (k === "x") transforms.push(`translateX(${typeof v === "number" ? v + "px" : v})`);
    else if (k === "y") transforms.push(`translateY(${typeof v === "number" ? v + "px" : v})`);
    else if (k === "rotate") transforms.push(`rotate(${v}deg)`);
    else if (k === "scale") transforms.push(`scale(${v})`);
    else s[k] = v;
  }
  if (transforms.length) s.transform = transforms.join(" ");
  return s;
}

function createMotionComponent(tag) {
  const Comp = forwardRef(function MotionShim(props, ref) {
    const clean = {};
    let animStyle = null;
    for (const k in props) {
      if (k === "animate") {
        animStyle = resolveAnimateStyle(props[k]);
      } else if (!MOTION_PROPS.has(k)) {
        clean[k] = props[k];
      }
    }
    if (animStyle && Object.keys(animStyle).length) {
      clean.style = { ...clean.style, ...animStyle };
    }
    clean.ref = ref;
    return createElement(tag, clean);
  });
  Comp.displayName = `motion.${tag}`;
  return Comp;
}

const cache = {};
export const motion = new Proxy(
  {},
  {
    get(_, tag) {
      if (!cache[tag]) cache[tag] = createMotionComponent(tag);
      return cache[tag];
    },
  },
);

export function AnimatePresence({ children }) {
  return children;
}
