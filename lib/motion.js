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

// WeakMap cache: avoids recomputing styles for the same animate object reference
const styleCache = new WeakMap();

function resolveAnimateStyle(animate) {
  if (!animate || typeof animate !== "object" || Array.isArray(animate)) return null;

  const cached = styleCache.get(animate);
  if (cached) return cached;

  const s = {};
  let hasTransform = false;
  let tx = "", ty = "", rot = "", sc = "";

  for (const k in animate) {
    const v = animate[k];
    if (Array.isArray(v)) continue;
    switch (k) {
      case "x":
        tx = `translateX(${typeof v === "number" ? v + "px" : v})`;
        hasTransform = true;
        break;
      case "y":
        ty = `translateY(${typeof v === "number" ? v + "px" : v})`;
        hasTransform = true;
        break;
      case "rotate":
        rot = `rotate(${v}deg)`;
        hasTransform = true;
        break;
      case "scale":
        sc = `scale(${v})`;
        hasTransform = true;
        break;
      default:
        s[k] = v;
    }
  }

  if (hasTransform) {
    // Build transform string only from non-empty parts
    let t = "";
    if (tx) t = tx;
    if (ty) t = t ? t + " " + ty : ty;
    if (rot) t = t ? t + " " + rot : rot;
    if (sc) t = t ? t + " " + sc : sc;
    s.transform = t;
  }

  // Only cache if we produced something
  const result = Object.keys(s).length ? s : null;
  styleCache.set(animate, result);
  return result;
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
    if (animStyle) {
      clean.style = clean.style ? { ...clean.style, ...animStyle } : animStyle;
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
      return cache[tag] || (cache[tag] = createMotionComponent(tag));
    },
  },
);

// `m` is the tree-shakeable alias for `motion` in framer-motion
export const m = motion;

export function AnimatePresence({ children }) {
  return children;
}

// LazyMotion + domAnimation stubs — just render children
export function LazyMotion({ children }) {
  return children;
}
export const domAnimation = {};
