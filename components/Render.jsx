"use client";

import { m, AnimatePresence } from "framer-motion";
import { useMemo, useState, memo } from "react";
import {
  Check,
  Star,
  ShoppingCart,
  ArrowRight,
  Mail,
  User,
  Lock,
  ChevronRight,
  Zap,
  Shield,
  Heart,
  ChevronLeft,
} from "lucide-react";
import Button from "@/components/ui/Button";

/**
 * Theme utility - CSS variable-based theming
 * Uses light-dark() for automatic theme switching
 * No darkMode param needed - respects colorScheme from Stage
 */
// Pre-computed constants for SVG grids (avoid .map() allocation on every render)
const GRID_COORDS = [80, 160, 240, 320];
const GRID_LINES_V = GRID_COORDS.map((x) => (
  <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
));
const GRID_LINES_H = GRID_COORDS.map((y) => (
  <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
));

// Static data arrays extracted to module scope (avoid re-creation per render)
const STAR_KEYS = [1, 2, 3, 4, 5];
const HERO_SPLIT_NODES = [
  { cx: 200, cy: 60, icon: "M195 55 L200 50 L205 55 L205 65 L200 70 L195 65 Z" },
  { cx: 340, cy: 200, icon: "M335 195 L345 195 L345 205 L335 205 Z" },
  { cx: 200, cy: 340, icon: "M192 340 A8 8 0 1 1 208 340 A8 8 0 1 1 192 340" },
  { cx: 60, cy: 200, icon: "M52 200 L60 192 L68 200 L60 208 Z" },
  { cx: 305, cy: 95, icon: "M300 90 L310 90 L310 100 L300 100 Z" },
  { cx: 95, cy: 305, icon: "M87 305 A8 8 0 1 1 103 305 A8 8 0 1 1 87 305" },
];
const FLOATING_PARTICLES = [
  { cx: 150, cy: 120, r: 4 },
  { cx: 280, cy: 150, r: 3 },
  { cx: 120, cy: 270, r: 5 },
  { cx: 300, cy: 280, r: 4 },
  { cx: 340, cy: 130, r: 3 },
  { cx: 70, cy: 130, r: 4 },
];
const PRICING_FEATURES = [
  "Unlimited projects",
  "Advanced analytics",
  "Priority support",
  "Custom integrations",
  "Team collaboration",
];
const FEATURE_GRID_DATA = [
  { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
  { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security built in" },
  { icon: Heart, title: "Made with Care", description: "Crafted with attention to detail" },
];
const TOGGLE_ITEMS = [
  { id: "email", label: "Email notifications", sublabel: "Receive email updates" },
  { id: "push", label: "Push notifications", sublabel: "Get push alerts on your device" },
  { id: "marketing", label: "Marketing emails", sublabel: "Receive promotional content" },
];
const TESTIMONIALS = [
  {
    quote: "This tool has revolutionized our workflow. The efficiency gains are remarkable!",
    author: "Alex Rivera",
    role: "CTO, TechFlow",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
  },
  {
    quote: "Best investment we've made this year. The ROI was immediate.",
    author: "Sam Chen",
    role: "Founder, StartupX",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
  },
  {
    quote: "The attention to detail and customization options are unparalleled.",
    author: "Jordan Lee",
    role: "Product Lead, DesignCo",
    rating: 5,
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&h=100&fit=crop",
  },
];
const CART_ITEMS = [
  {
    name: "Wireless Headphones",
    price: 299,
    qty: 1,
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop",
  },
  {
    name: "Smart Watch",
    price: 399,
    qty: 2,
    image: "https://images.unsplash.com/photo-1546868871-af0de0ae72be?w=200&h=200&fit=crop",
  },
];
const PRICING_PLANS = [
  { name: "Starter", price: 19, features: ["5 Projects", "10 GB Storage", "Email Support"] },
  {
    name: "Pro",
    price: 49,
    features: ["Unlimited Projects", "100 GB Storage", "Priority Support", "Advanced Analytics"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: 99,
    features: ["Unlimited Everything", "Custom Integration", "Dedicated Manager", "SLA"],
  },
];
const POPULAR_SEARCH_TERMS = ["Design", "Development", "Marketing", "Analytics"];
const CHECKBOX_OPTIONS = [
  { id: "notifications", label: "Push notifications", desc: "Receive alerts on your device" },
  { id: "updates", label: "Product updates", desc: "Get notified about new features" },
  { id: "marketing", label: "Marketing emails", desc: "Receive promotional content" },
];
const RADIO_OPTIONS = [
  { id: "economy", label: "Economy", price: "$4.99", time: "5-7 days" },
  { id: "standard", label: "Standard", price: "$9.99", time: "3-5 days" },
  { id: "express", label: "Express", price: "$19.99", time: "1-2 days" },
];
const WIZARD_STEPS = ["Account", "Details", "Payment", "Confirm"];
const FORM_STEPS = ["Personal Info", "Contact", "Review"];

const themeStyles = {
  // Background styles (use as style prop)
  bg: { backgroundColor: "var(--bg)" },
  bgAlt: { backgroundColor: "var(--surface)" },
  bgInput: { backgroundColor: "light-dark(#f5f5f5, #1e293b)" },
  bgCard: { backgroundColor: "var(--surface)" },
  // Text styles
  text: { color: "var(--text)" },
  textMuted: { color: "var(--textMuted)" },
  textDim: { color: "light-dark(#94a3b8, #64748b)" },
  // Border styles
  border: { borderColor: "var(--borderMain)" },
  borderDim: { borderColor: "var(--borderDim)" },
  // Dividers
  divider: { backgroundColor: "light-dark(#f1f5f9, #1e293b)" },
  // Raw values for inline styles
  raw: {
    bg: "var(--bg)",
    text: "var(--text)",
    muted: "var(--textMuted)",
  },
};

export default function Render({ id, styles: s }) {
  const { color, play, font, dark } = s;

  const r = Math.round(play * 24);
  const ff = font === "modern" ? "var(--font-sans)" : "var(--font-serif)";

  const css = useMemo(
    () => ({
      "--primary": color,
      "--radius": `${r}px`,
      "--font": ff,
      fontFamily: ff,
    }),
    [color, r, ff],
  );

  // Theme styles object for consistent styling (no darkMode needed)
  const theme = themeStyles;

  const renderComponent = () => {
    switch (id) {
      case "pricing-card":
        return <PricingCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "hero-centered":
        return <HeroCentered styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "hero-split":
        return <HeroSplit styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "hero-gradient":
        return <HeroGradient styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "testimonial-card":
        return <TestimonialCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "testimonial-carousel":
        return (
          <TestimonialCarousel styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />
        );
      case "product-card-minimal":
        return <ProductCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "product-card-detailed":
        return (
          <ProductCardDetailed styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />
        );
      case "input-text":
        return <TextInput styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "input-email":
        return <NewsletterSignup styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "toggle-switch":
        return <ToggleSwitch styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "feature-grid-icons":
        return <FeatureGrid styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "feature-bento":
        return <BentoGrid styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "cart-item":
        return <CartItem styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "cart-drawer":
        return <CartDrawer styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "pricing-table":
        return <PricingTable styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "input-search":
        return <SearchInput styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "checkbox-group":
        return <CheckboxGroup styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "radio-group":
        return <RadioGroup styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "wizard-steps":
        return <StepIndicator styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      case "wizard-form":
        return <MultiStepForm styles={css} primaryColor={color} cornerRadius={r} playfulness={play} theme={theme} />;
      default:
        return (
          <div className={`text-center p-8 rounded-lg ${theme.bgAlt} ${theme.textMuted}`}>
            <p>Component "{id}" not yet implemented</p>
          </div>
        );
    }
  };

  return <div style={css}>{renderComponent()}</div>;
}

// Component: Pricing Card
const PricingCard = memo(function PricingCard({ styles, primaryColor, cornerRadius, playfulness }) {
  const isPlayful = playfulness > 0.5;

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto p-6"
      style={styles}
    >
      <div
        className="relative overflow-hidden p-8 border shadow-xl transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          boxShadow: isPlayful ? `0 20px 40px -10px ${primaryColor}20` : `0 4px 6px -1px rgba(0,0,0,0.1)`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderMain)",
        }}
      >
        {/* Decorative background for playful mode */}
        {isPlayful && (
          <div
            className="absolute top-0 right-0 w-64 h-64 opacity-5 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
        )}

        {/* Badge */}
        <div
          className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wide mb-6 uppercase"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius / (isPlayful ? 1 : 2)}px`,
            color: "var(--bg)",
          }}
        >
          Most Popular
        </div>

        {/* Plan Name */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className="text-2xl transition-colors"
            style={{ fontWeight: isPlayful ? 800 : 600, color: "var(--text)" }}
          >
            Professional
          </h3>
          {isPlayful && <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />}
        </div>

        <p className="text-sm mb-6 transition-colors" style={{ color: "var(--textMuted)" }}>
          Perfect for growing teams and startups.
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-5xl font-bold transition-colors" style={{ color: "var(--text)" }}>
            $49
          </span>
          <span className="transition-colors" style={{ color: "var(--textMuted)" }}>
            /month
          </span>
        </div>

        {/* Divider */}
        <div className="h-px w-full mb-8" style={{ backgroundColor: "var(--borderDim)" }} />

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {PRICING_FEATURES.map((feature, index) => (
            <m.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-3 transition-colors"
              style={{ color: "var(--textMuted)" }}
            >
              <div
                className="w-5 h-5 flex items-center justify-center text-white shrink-0"
                style={{
                  backgroundColor: primaryColor,
                  borderRadius: isPlayful ? "50%" : "4px",
                }}
              >
                <Check className="w-3 h-3" strokeWidth={3} />
              </div>
              <span className="text-sm font-medium">{feature}</span>
            </m.li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button
          icon={ArrowRight}
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          style={{ "--btnRadius": `${cornerRadius}px`, width: "100%" }}
        >
          Get Started
        </Button>

        <p className="text-center text-xs mt-4 transition-colors" style={{ color: "var(--textMuted)" }}>
          14-day free trial • No credit card required
        </p>
      </div>
    </m.div>
  );
});

// Component: Hero Centered
const HeroCentered = memo(function HeroCentered({ styles, primaryColor, cornerRadius, playfulness }) {
  const isPlayful = playfulness > 0.5;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="text-center px-8 py-16 relative overflow-visible"
      style={{
        ...styles,
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Background Glows */}
      {isPlayful && (
        <>
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 opacity-10 blur-[100px] rounded-full pointer-events-none"
            style={{ backgroundColor: primaryColor }}
          />
        </>
      )}

      <m.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium mb-8 border"
        style={{
          borderColor: isPlayful ? "transparent" : `${primaryColor}30`,
          backgroundColor: isPlayful ? `${primaryColor}15` : "transparent",
          color: primaryColor,
          borderRadius: `${cornerRadius}px`,
        }}
      >
        <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: primaryColor }} />
        Introducing v2.0
      </m.div>

      <m.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-transparent bg-clip-text"
        style={{
          backgroundImage: `linear-gradient(to bottom, light-dark(#0f172a, white) 40%, ${primaryColor} 150%)`,
        }}
      >
        Build beautiful products
        <br />
        <span style={{ color: primaryColor }}>faster than ever</span>
      </m.h1>

      <m.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
        style={{ color: "var(--textMuted)" }}
      >
        The modern toolkit for creating stunning user interfaces. Ship products that users love with our comprehensive
        design system.
      </m.p>

      <m.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <Button
          size="lg"
          icon={ArrowRight}
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          style={{ "--btnRadius": `${cornerRadius}px` }}
        >
          Start Building
        </Button>

        <Button
          variant="outline"
          size="lg"
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          style={{ "--btnRadius": `${cornerRadius}px` }}
        >
          View Documentation
        </Button>
      </m.div>
    </m.div>
  );
});

// Component: Hero Split
const HeroSplit = memo(function HeroSplit({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 gap-12 items-center px-8 py-12"
      style={{
        ...styles,
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      <div>
        <m.span
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="inline-block px-3 py-1 text-xs font-semibold mb-4"
          style={{
            backgroundColor: `${primaryColor}20`,
            color: primaryColor,
            borderRadius: `${cornerRadius / 2}px`,
          }}
        >
          NEW RELEASE
        </m.span>

        <m.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="text-3xl md:text-4xl font-bold mb-4 leading-tight"
        >
          Transform your workflow with AI
        </m.h1>

        <m.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
          style={{ color: "var(--textMuted)" }}
        >
          Automate repetitive tasks and focus on what matters. Our intelligent platform learns your patterns.
        </m.p>

        <Button
          icon={ArrowRight}
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          style={{ "--btnRadius": `${cornerRadius}px` }}
        >
          Try it Free
        </Button>
      </div>

      <m.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative aspect-square overflow-hidden"
        style={{ borderRadius: `${cornerRadius * 1.5}px` }}
      >
        {/* Abstract AI/Workflow Illustration */}
        <svg viewBox="0 0 400 400" className="w-full h-full" aria-hidden="true">
          <defs>
            <linearGradient id="heroGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.2" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="heroGrad2" x1="0%" y1="100%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={primaryColor} stopOpacity="0.8" />
              <stop offset="100%" stopColor={primaryColor} stopOpacity="0.4" />
            </linearGradient>
          </defs>

          {/* Background */}
          <rect width="400" height="400" style={{ fill: "light-dark(#f1f5f9, #1e293b)" }} rx={cornerRadius * 1.5} />

          {/* Decorative grid (pre-computed) */}
          <g style={{ stroke: "light-dark(#e2e8f0, #334155)" }} strokeWidth="1" opacity="0.5">
            {GRID_LINES_V}
            {GRID_LINES_H}
          </g>

          {/* Central hub circle */}
          <circle cx="200" cy="200" r="60" fill="url(#heroGrad1)" stroke={primaryColor} strokeWidth="2" />
          <circle cx="200" cy="200" r="40" fill={primaryColor} opacity="0.9" />
          <path d="M185 200 L200 180 L215 200 L200 220 Z" fill="white" />

          {/* Orbiting nodes with connection lines */}
          <g stroke={primaryColor} strokeWidth="2" strokeDasharray={playfulness > 0.5 ? "8,4" : "0"} opacity="0.6">
            <line x1="200" y1="140" x2="200" y2="80" />
            <line x1="260" y1="200" x2="320" y2="200" />
            <line x1="200" y1="260" x2="200" y2="320" />
            <line x1="140" y1="200" x2="80" y2="200" />
            <line x1="243" y1="157" x2="290" y2="110" />
            <line x1="157" y1="243" x2="110" y2="290" />
          </g>

          {/* Outer nodes */}
          {HERO_SPLIT_NODES.map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r="24" fill="url(#heroGrad2)" />
              <path d={node.icon} fill="white" />
            </g>
          ))}

          {/* Floating particles */}
          {playfulness > 0.3 && (
            <g fill={primaryColor} opacity="0.4">
              {FLOATING_PARTICLES.map((p, i) => (
                <circle key={i} cx={p.cx} cy={p.cy} r={p.r} />
              ))}
            </g>
          )}
        </svg>
      </m.div>
    </m.div>
  );
});

// Component: Testimonial Card
const TestimonialCard = memo(function TestimonialCard({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div
        className="p-8 border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderMain)",
        }}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {STAR_KEYS.map((star) => (
            <Star key={star} className="w-5 h-5 fill-current" style={{ color: primaryColor }} />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg mb-6 leading-relaxed transition-colors" style={{ color: "var(--text)" }}>
          "This product has completely transformed how our team works. The attention to detail is remarkable, and the
          support is world-class."
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=100&h=100&fit=crop"
            alt="Sarah Johnson"
            className="w-12 h-12 object-cover"
            loading="lazy"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          />
          <div>
            <div className="font-semibold transition-colors" style={{ color: "var(--text)" }}>
              Sarah Johnson
            </div>
            <div className="text-sm" style={{ color: "var(--textMuted)" }}>
              CEO, TechStart Inc.
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
});

// Component: Product Card
const ProductCard = memo(function ProductCard({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xs mx-auto p-6"
      style={styles}
    >
      <div
        className="overflow-hidden border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderMain)",
        }}
      >
        {/* Image */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=400&h=400&fit=crop"
            alt="Premium Desk Lamp"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <m.button
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
            style={{
              borderRadius: `${cornerRadius / 2}px`,
              backgroundColor: "var(--surface)",
            }}
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5" style={{ color: "var(--textMuted)" }} />
          </m.button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-xs mb-1" style={{ color: "var(--textMuted)" }}>
            MINIMALIST DESIGN
          </div>
          <h3 className="font-semibold mb-2 transition-colors" style={{ color: "var(--text)" }}>
            Premium Desk Lamp
          </h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold" style={{ color: primaryColor }}>
              $129.00
            </span>
            <m.button
              whileHover={{ scale: playfulness > 0.5 ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
});

// Component: Text Input
const TextInput = memo(function TextInput({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6 p-6"
      style={styles}
    >
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: primaryColor }} />
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full pl-12 pr-4 py-3 focus:outline-none transition-all border-2 border-transparent"
            style={{
              borderRadius: `${cornerRadius}px`,
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--borderDim)",
            }}
            onFocus={(e) => (e.target.style.borderColor = primaryColor)}
            onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: "var(--text)" }}>
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: primaryColor }} />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full pl-12 pr-4 py-3 focus:outline-none transition-all border-2 border-transparent"
            style={{
              borderRadius: `${cornerRadius}px`,
              backgroundColor: "var(--surface)",
              color: "var(--text)",
              border: "1px solid var(--borderDim)",
            }}
            onFocus={(e) => (e.target.style.borderColor = primaryColor)}
            onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
          />
        </div>
        <p className="text-xs mt-1.5" style={{ color: "var(--textMuted)" }}>
          Must be at least 8 characters
        </p>
      </div>
    </m.div>
  );
});

// Component: Newsletter Signup
const NewsletterSignup = memo(function NewsletterSignup({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center p-6"
      style={styles}
    >
      <h3 className="text-2xl font-bold mb-2 transition-colors" style={{ color: "var(--text)" }}>
        Stay in the loop
      </h3>
      <p className="mb-6 transition-colors" style={{ color: "var(--textMuted)" }}>
        Subscribe to our newsletter for the latest updates and exclusive offers.
      </p>

      <div
        className="flex gap-2 p-2 transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
        }}
      >
        <div className="flex-1 relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "var(--textMuted)" }} />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 bg-transparent placeholder:text-slate-500 focus:outline-none transition-colors"
            style={{ color: "var(--text)" }}
          />
        </div>
        <Button
          size="sm"
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          className="shrink-0"
          style={{ "--btnRadius": `${Math.max(4, cornerRadius - 4)}px` }}
        >
          Subscribe
        </Button>
      </div>

      <p className="text-xs mt-3 transition-colors" style={{ color: "var(--textDim)" }}>
        No spam, unsubscribe anytime.
      </p>
    </m.div>
  );
});

// Component: Toggle Switch
const ToggleSwitch = memo(function ToggleSwitch({ styles, primaryColor, cornerRadius, playfulness }) {
  const [toggles, setToggles] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-4 p-6"
      style={styles}
    >
      {TOGGLE_ITEMS.map((item) => (
        <div
          key={item.id}
          className="flex items-center justify-between p-4 transition-colors"
          style={{
            borderRadius: `${cornerRadius}px`,
            backgroundColor: "var(--surface)",
            border: "1px solid var(--borderDim)",
          }}
        >
          <div>
            <div className="font-medium transition-colors" style={{ color: "var(--text)" }}>
              {item.label}
            </div>
            <div className="text-sm transition-colors" style={{ color: "var(--textMuted)" }}>
              {item.sublabel}
            </div>
          </div>
          <button onClick={() => toggle(item.id)} className="rounded-full focus:outline-none">
            <m.div
              initial={false}
              animate={{
                backgroundColor: toggles[item.id] ? primaryColor : "var(--borderMain)",
              }}
              className="relative w-12 h-7 rounded-full transition-colors"
              style={{
                backgroundColor: toggles[item.id] ? primaryColor : undefined,
              }}
            >
              <m.div
                initial={false}
                animate={{ x: toggles[item.id] ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </m.div>
          </button>
        </div>
      ))}
    </m.div>
  );
});

// Component: Feature Grid
const FeatureGrid = memo(function FeatureGrid({ styles, primaryColor, cornerRadius, playfulness }) {

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-3 gap-6 p-6"
      style={styles}
    >
      {FEATURE_GRID_DATA.map((feature, index) => (
        <m.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 border transition-colors"
          style={{
            borderRadius: `${cornerRadius}px`,
            backgroundColor: "var(--surface)",
            borderColor: "var(--borderMain)",
          }}
        >
          <div
            className="w-12 h-12 flex items-center justify-center mb-4"
            style={{
              backgroundColor: `${primaryColor}15`,
              color: primaryColor,
              borderRadius: `${cornerRadius / 2}px`,
            }}
          >
            <feature.icon className="w-6 h-6" />
          </div>
          <h3 className="font-semibold mb-2 transition-colors" style={{ color: "var(--text)" }}>
            {feature.title}
          </h3>
          <p className="text-sm transition-colors" style={{ color: "var(--textMuted)" }}>
            {feature.description}
          </p>
        </m.div>
      ))}
    </m.div>
  );
});

// Component: Cart Item
const CartItem = memo(function CartItem({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div
        className="p-4 flex flex-col sm:flex-row gap-4 border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderMain)",
        }}
      >
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1583394838336-acd977736f90?w=200&h=200&fit=crop"
          alt="Premium Wireless Headphones"
          className="w-full sm:w-24 h-24 object-cover shrink-0"
          loading="lazy"
          style={{ borderRadius: `${cornerRadius / 2}px` }}
        />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold truncate transition-colors" style={{ color: "var(--text)" }}>
            Premium Wireless Headphones
          </h4>
          <p className="text-sm mb-2" style={{ color: "var(--textMuted)" }}>
            Color: Matte Black
          </p>

          <div className="flex items-center justify-between">
            <span className="font-bold" style={{ color: primaryColor }}>
              $299.00
            </span>

            {/* Quantity Controls */}
            <div
              className="flex items-center gap-2 transition-colors"
              style={{
                borderRadius: `${cornerRadius / 2}px`,
                backgroundColor: "light-dark(#f1f5f9, #334155)",
              }}
            >
              <button
                className="w-8 h-8 flex items-center justify-center rounded-l-lg transition-colors"
                style={{ color: "var(--textMuted)" }}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="w-8 text-center text-sm font-medium transition-colors" style={{ color: "var(--text)" }}>
                2
              </span>
              <button
                className="w-8 h-8 flex items-center justify-center rounded-r-lg transition-colors"
                style={{ color: "var(--textMuted)" }}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </m.div>
  );
});

// Component: Hero Gradient
const HeroGradient = memo(function HeroGradient({ styles, primaryColor, cornerRadius, playfulness }) {
  // Platinum Standard: Use color-mix with 45%/65% ratios for proper contrast
  // Matches Portfolio Nav.module.css swatch pattern
  const accentLight = `color-mix(in srgb, ${primaryColor} 45%, #ffffff)`;
  const accentDark = `color-mix(in srgb, ${primaryColor} 65%, #020617)`;
  const accentStrong = `color-mix(in srgb, ${primaryColor} 74%, #020617)`;

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-16 sm:py-20 lg:py-24 text-center overflow-hidden px-4"
      style={{
        ...styles,
        backgroundColor: "var(--bg)",
        color: "var(--text)",
      }}
    >
      {/* Dark Background with subtle accent glow */}
      <div className="absolute inset-0" style={{ background: "var(--bg)" }} />
      <m.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-20"
        style={{
          backgroundSize: "200% 200%",
          background: `radial-gradient(ellipse at 50% 0%, ${primaryColor} 0%, transparent 60%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10">
        <m.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div
            className="px-4 py-2 backdrop-blur-sm font-medium rounded-full border"
            style={{
              background: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
              borderColor: `color-mix(in srgb, var(--text) 30%, transparent)`,
              color: "var(--text)",
            }}
          >
            ✨ Introducing our newest innovation
          </div>
        </m.div>

        <m.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight"
          style={{ color: "var(--text)" }}
        >
          The Future is
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, ${accentLight}, ${primaryColor}, ${accentDark})` }}
          >
            Bright & Bold
          </span>
        </m.h1>

        <m.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl max-w-2xl mx-auto mb-8 px-4"
          style={{ color: "var(--textMuted)" }}
        >
          Experience the next generation of design with our revolutionary platform that transforms ideas into reality.
        </m.p>

        <m.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-stretch px-4"
          style={{ width: "100%", maxWidth: "420px", margin: "0 auto" }}
        >
          {/* Primary CTA */}
          <Button
            size="lg"
            gradient={`linear-gradient(135deg, ${accentLight}, ${accentDark})`}
            color="var(--bg)"
            background="var(--bg)"
            className="w-full flex-1"
            style={{ "--btnRadius": `${cornerRadius}px` }}
          >
            Get Started Free
          </Button>
          {/* Secondary CTA */}
          <Button
            variant="outline"
            size="lg"
            gradient={`linear-gradient(135deg, ${accentLight}, ${accentDark})`}
            color="var(--bg)"
            background="var(--bg)"
            className="w-full flex-1"
            style={{ "--btnRadius": `${cornerRadius}px` }}
          >
            Watch Demo
          </Button>
        </m.div>
      </div>

      {/* Floating Elements with accent color */}
      <m.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-16 h-16 backdrop-blur-sm rounded-2xl hidden md:block"
        style={{ background: `color-mix(in srgb, ${primaryColor} 25%, transparent)` }}
      />
      <m.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-24 h-24 backdrop-blur-sm rounded-full hidden md:block"
        style={{ background: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
      />
    </m.div>
  );
});

// Component: Bento Grid
const BentoGrid = memo(function BentoGrid({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
      style={styles}
    >
      {/* Large Feature - Takes 2 columns on lg, full width on mobile */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.1 }}
        className="col-span-1 sm:col-span-2 row-span-2 p-8 relative overflow-hidden"
        style={{
          backgroundColor: primaryColor,
          borderRadius: `${cornerRadius}px`,
        }}
      >
        <div className="relative z-10">
          <Zap className="w-12 h-12 mb-4" style={{ color: "var(--bg)" }} />
          <h3 className="text-2xl sm:text-3xl font-bold mb-3" style={{ color: "var(--bg)" }}>
            Lightning Fast Performance
          </h3>
          <p
            className="text-sm sm:text-base"
            style={{ color: "light-dark(rgba(15,23,42,0.8), rgba(255,255,255,0.8))" }}
          >
            Built for speed with cutting-edge optimization techniques that deliver instant results.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </m.div>

      {/* Medium Feature */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="col-span-1 sm:col-span-1 lg:col-span-2 p-6 border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderDim)",
        }}
      >
        <Shield className="w-10 h-10 mb-3" style={{ color: primaryColor }} />
        <h4 className="text-lg font-bold mb-2 transition-colors" style={{ color: "var(--text)" }}>
          Enterprise Security
        </h4>
        <p className="text-sm transition-colors" style={{ color: "var(--textMuted)" }}>
          Bank-level encryption and compliance certifications.
        </p>
      </m.div>

      {/* Small Feature */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 p-6 border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderDim)",
        }}
      >
        <Heart className="w-8 h-8 mb-2 text-rose-500" />
        <h4 className="font-bold text-sm sm:text-base transition-colors" style={{ color: "var(--text)" }}>
          User Focused
        </h4>
        <p className="text-xs sm:text-sm transition-colors" style={{ color: "var(--textMuted)" }}>
          Built with love
        </p>
      </m.div>

      {/* Small Feature */}
      <m.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 p-6 border transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderDim)",
        }}
      >
        <div className="text-3xl sm:text-4xl font-black mb-2" style={{ color: primaryColor }}>
          99.9%
        </div>
        <p className="text-xs sm:text-sm font-medium transition-colors" style={{ color: "var(--textMuted)" }}>
          Uptime Guarantee
        </p>
      </m.div>
    </m.div>
  );
});

// Component: Testimonial Carousel
const TestimonialCarousel = memo(function TestimonialCarousel({ styles, primaryColor, cornerRadius, playfulness }) {
  const [index, setIndex] = useState(0);

  const current = TESTIMONIALS[index];

  const next = () => setIndex((i) => (i + 1) % TESTIMONIALS.length);
  const prev = () => setIndex((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <m.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6" style={styles}>
      <div className="relative">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="hidden sm:flex p-2 rounded-full transition-colors"
            style={{ backgroundColor: "light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.1))" }}
          >
            <ChevronLeft className="w-6 h-6" style={{ color: "var(--textMuted)" }} />
          </button>

          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <m.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10 border transition-colors"
                style={{
                  borderRadius: `${cornerRadius * 1.5}px`,
                  background:
                    "light-dark(linear-gradient(to bottom right, #ffffff, #f9fafb), linear-gradient(to bottom right, #262626, #171717))",
                  borderColor: "var(--borderMain)",
                }}
              >
                {/* Quote Icon */}
                <div
                  className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-6 text-2xl sm:text-3xl font-serif text-white transition-colors duration-300"
                  style={{
                    backgroundColor: primaryColor,
                    borderRadius: `${cornerRadius}px`,
                  }}
                >
                  "
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-6">
                  {STAR_KEYS.map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-colors duration-300"
                      style={{ color: primaryColor }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote
                  className="text-xl sm:text-3xl font-medium mb-8 leading-relaxed transition-colors"
                  style={{ color: "var(--text)" }}
                >
                  {current.quote}
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <img
                    src={current.avatar}
                    alt={current.author}
                    className="w-14 h-14 sm:w-16 sm:h-16 object-cover transition-all duration-300"
                    style={{ borderRadius: `${cornerRadius}px` }}
                  />
                  <div>
                    <div className="font-bold text-base sm:text-lg transition-colors" style={{ color: "var(--text)" }}>
                      {current.author}
                    </div>
                    <div className="text-sm sm:text-base" style={{ color: "var(--textMuted)" }}>
                      {current.role}
                    </div>
                  </div>
                </div>
              </m.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="hidden sm:flex p-2 rounded-full transition-colors"
            style={{ backgroundColor: "light-dark(rgba(0,0,0,0.05), rgba(255,255,255,0.1))" }}
          >
            <ChevronRight className="w-6 h-6" style={{ color: "var(--textMuted)" }} />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === index ? primaryColor : "var(--textMuted)",
                opacity: i === index ? 1 : 0.3,
              }}
            />
          ))}
        </div>
      </div>
    </m.div>
  );
});

// Component: Product Card Detailed
const ProductCardDetailed = memo(function ProductCardDetailed({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm mx-auto p-6"
      style={styles}
    >
      <div
        className="border overflow-hidden transition-colors"
        style={{
          borderRadius: `${cornerRadius}px`,
          backgroundColor: "var(--surface)",
          borderColor: "var(--borderMain)",
        }}
      >
        {/* Image with Badge */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1622560480605-d83c853bc5c3?w=400&h=400&fit=crop"
            alt="Designer Leather Bag"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -25% OFF
          </div>
          <m.button
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center shadow-lg transition-colors"
            style={{
              borderRadius: `${cornerRadius / 2}px`,
              backgroundColor: "var(--surface)",
            }}
          >
            <Heart className="w-5 h-5" style={{ color: "var(--textMuted)" }} />
          </m.button>

          {/* Quick View Button */}
          <m.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              className="w-full py-2 backdrop-blur-sm text-sm font-semibold transition-colors"
              style={{
                borderRadius: `${cornerRadius / 2}px`,
                backgroundColor: "light-dark(rgba(255,255,255,0.9), rgba(38,38,38,0.9))",
                color: "var(--text)",
              }}
            >
              Quick View
            </button>
          </m.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs mb-1" style={{ color: "var(--textMuted)" }}>
                PREMIUM COLLECTION
              </div>
              <h3 className="font-bold text-base sm:text-lg transition-colors" style={{ color: "var(--text)" }}>
                Designer Leather Bag
              </h3>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {STAR_KEYS.map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-current"
                  style={{ color: star <= 4 ? primaryColor : "#d1d5db" }}
                />
              ))}
            </div>
            <span className="text-xs" style={{ color: "var(--textMuted)" }}>
              (128 reviews)
            </span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span
              className="px-2 py-1 text-xs rounded-md transition-colors"
              style={{
                backgroundColor: "light-dark(#f5f5f5, #404040)",
                color: "var(--textMuted)",
              }}
            >
              Free Shipping
            </span>
            <span
              className="px-2 py-1 text-xs rounded-md transition-colors"
              style={{
                backgroundColor: "light-dark(#f5f5f5, #404040)",
                color: "var(--textMuted)",
              }}
            >
              In Stock
            </span>
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl sm:text-2xl font-bold" style={{ color: primaryColor }}>
                  $179
                </span>
                <span className="text-sm line-through" style={{ color: "var(--textMuted)" }}>
                  $239
                </span>
              </div>
              <div className="text-xs" style={{ color: "var(--textMuted)" }}>
                or $15/month
              </div>
            </div>
            <m.button
              whileHover={{ scale: playfulness > 0.5 ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center text-white"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </m.button>
          </div>
        </div>
      </div>
    </m.div>
  );
});

// Component: Cart Drawer
const CART_SUBTOTAL = CART_ITEMS.reduce((sum, item) => sum + item.price * item.qty, 0);
const CART_TOTAL_QTY = CART_ITEMS.reduce((sum, item) => sum + item.qty, 0);
const CartDrawer = memo(function CartDrawer({ styles, primaryColor, cornerRadius, playfulness }) {

  return (
    <m.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div
        className="shadow-2xl transition-colors"
        style={{ borderRadius: `${cornerRadius}px`, backgroundColor: "var(--surface)" }}
      >
        {/* Header */}
        <div className="p-6 border-b transition-colors" style={{ borderColor: "var(--borderMain)" }}>
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold transition-colors" style={{ color: "var(--text)" }}>
              Shopping Cart
            </h2>
            <div
              className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold"
              style={{
                backgroundColor: primaryColor,
                borderRadius: "50%",
              }}
            >
              {CART_TOTAL_QTY}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {CART_ITEMS.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 pb-4 border-b last:border-0 transition-colors"
              style={{ borderColor: "var(--borderDim)" }}
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover shrink-0"
                style={{ borderRadius: `${cornerRadius / 2}px` }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-sm transition-colors" style={{ color: "var(--text)" }}>
                  {item.name}
                </h4>
                <p className="text-xs mb-2" style={{ color: "var(--textMuted)" }}>
                  Color: Black
                </p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: primaryColor }}>
                    ${item.price}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded transition-colors"
                      style={{ backgroundColor: "light-dark(#f5f5f5, #404040)", color: "var(--text)" }}
                    >
                      -
                    </button>
                    <span className="font-medium transition-colors" style={{ color: "var(--text)" }}>
                      {item.qty}
                    </span>
                    <button
                      className="w-6 h-6 flex items-center justify-center rounded transition-colors"
                      style={{ backgroundColor: "light-dark(#f5f5f5, #404040)", color: "var(--text)" }}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t transition-colors" style={{ borderColor: "var(--borderMain)" }}>
          <div className="flex justify-between mb-4">
            <span className="transition-colors" style={{ color: "var(--textMuted)" }}>
              Subtotal
            </span>
            <span className="font-bold transition-colors" style={{ color: "var(--text)" }}>
              ${CART_SUBTOTAL}
            </span>
          </div>
          <Button
            icon={ChevronRight}
            gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
            color="var(--bg)"
            background="var(--bg)"
            style={{ "--btnRadius": `${cornerRadius}px`, width: "100%" }}
          >
            Checkout
          </Button>
          <p className="text-center text-xs mt-3" style={{ color: "var(--textMuted)" }}>
            Free shipping on orders over $100
          </p>
        </div>
      </div>
    </m.div>
  );
});

// Component: Pricing Table
const PricingTable = memo(function PricingTable({ styles, primaryColor, cornerRadius, playfulness }) {

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4"
      style={styles}
    >
      {PRICING_PLANS.map((plan, idx) => (
        <m.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`p-6 sm:p-8 border relative transition-colors ${plan.popular ? "border-2 scale-105 shadow-xl" : ""}`}
          style={{
            borderColor: plan.popular ? primaryColor : "var(--borderMain)",
            borderRadius: `${cornerRadius}px`,
            backgroundColor: "var(--surface)",
          }}
        >
          {plan.popular && (
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold whitespace-nowrap"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
                color: "var(--bg)",
              }}
            >
              MOST POPULAR
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-bold mb-2 transition-colors" style={{ color: "var(--text)" }}>
            {plan.name}
          </h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl sm:text-4xl font-black transition-colors" style={{ color: "var(--text)" }}>
              ${plan.price}
            </span>
            <span className="text-sm" style={{ color: "var(--textMuted)" }}>
              /mo
            </span>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li
                key={feature}
                className="flex items-center gap-3 text-sm transition-colors"
                style={{ color: "var(--textMuted)" }}
              >
                <Check className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                {feature}
              </li>
            ))}
          </ul>

          <Button
            variant={plan.popular ? "primary" : "outline"}
            gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
            color={plan.popular ? "var(--bg)" : "var(--text)"}
            background="var(--bg)"
            style={{ "--btnRadius": `${cornerRadius}px`, width: "100%" }}
          >
            {plan.popular ? "Get Started" : "Choose Plan"}
          </Button>
        </m.div>
      ))}
    </m.div>
  );
});

// Component: Search Input
const SearchInput = memo(function SearchInput({ styles, primaryColor, cornerRadius, playfulness }) {
  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
      style={styles}
    >
      <div className="relative">
        <input
          type="search"
          placeholder="Search for anything..."
          className="w-full pl-14 pr-12 py-5 text-lg focus:outline-none focus:border-opacity-100 transition-all shadow-lg"
          style={{
            borderRadius: `${cornerRadius * 1.5}px`,
            borderColor: `${primaryColor}00`,
            backgroundColor: "var(--surface)",
            color: "var(--text)",
            border: "2px solid var(--borderDim)",
          }}
          onFocus={(e) => {
            e.target.style.borderColor = primaryColor;
            e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = "var(--borderDim)";
            e.target.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
          }}
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2" style={{ color: "var(--textMuted)" }}>
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <m.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 font-semibold"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
            color: "var(--bg)",
          }}
        >
          Search
        </m.button>
      </div>

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm" style={{ color: "var(--textMuted)" }}>
          Popular:
        </span>
        {POPULAR_SEARCH_TERMS.map((term) => (
          <button
            key={term}
            className="px-3 py-1 text-sm transition-colors"
            style={{
              borderRadius: `${cornerRadius / 2}px`,
              backgroundColor: "light-dark(#f5f5f5, #262626)",
              color: "var(--textMuted)",
            }}
          >
            {term}
          </button>
        ))}
      </div>
    </m.div>
  );
});

// Component: Checkbox Group
const CheckboxGroup = memo(function CheckboxGroup({ styles, primaryColor, cornerRadius, playfulness }) {
  const [checked, setChecked] = useState({ notifications: true, updates: false, marketing: false });

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 space-y-4"
      style={styles}
    >
      <h3 className="text-lg font-semibold mb-4 transition-colors" style={{ color: "var(--text)" }}>
        Notification Preferences
      </h3>
      {CHECKBOX_OPTIONS.map((option) => (
        <label
          key={option.id}
          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer transition-colors"
          style={{ borderRadius: `${cornerRadius}px` }}
        >
          <div
            className="w-5 h-5 mt-0.5 rounded flex items-center justify-center border-2 transition-colors shrink-0 cursor-pointer"
            style={{
              borderColor: checked[option.id] ? primaryColor : "#6b7280",
              backgroundColor: checked[option.id] ? primaryColor : "transparent",
            }}
            onClick={() => setChecked({ ...checked, [option.id]: !checked[option.id] })}
          >
            {checked[option.id] && <Check className="w-3 h-3 text-white" />}
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium transition-colors" style={{ color: "var(--text)" }}>
              {option.label}
            </span>
            <p className="text-xs mt-0.5" style={{ color: "var(--textMuted)" }}>
              {option.desc}
            </p>
          </div>
        </label>
      ))}
    </m.div>
  );
});

// Component: Radio Group
const RadioGroup = memo(function RadioGroup({ styles, primaryColor, cornerRadius, playfulness }) {
  const [selected, setSelected] = useState("standard");

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 space-y-3"
      style={styles}
    >
      <h3 className="text-lg font-semibold mb-4 transition-colors" style={{ color: "var(--text)" }}>
        Shipping Method
      </h3>
      {RADIO_OPTIONS.map((option) => (
        <label
          key={option.id}
          className="flex items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all"
          style={{
            borderRadius: `${cornerRadius}px`,
            borderColor: selected === option.id ? primaryColor : "var(--borderMain)",
            backgroundColor: selected === option.id ? `${primaryColor}10` : "transparent",
          }}
          onClick={() => setSelected(option.id)}
        >
          <div
            className="w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0"
            style={{ borderColor: selected === option.id ? primaryColor : "#6b7280" }}
          >
            {selected === option.id && (
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: primaryColor }} />
            )}
          </div>
          <div className="flex-1">
            <span className="text-sm font-medium transition-colors" style={{ color: "var(--text)" }}>
              {option.label}
            </span>
            <p className="text-xs" style={{ color: "var(--textMuted)" }}>
              {option.time}
            </p>
          </div>
          <span className="text-sm font-semibold" style={{ color: primaryColor }}>
            {option.price}
          </span>
        </label>
      ))}
    </m.div>
  );
});

// Component: Step Indicator
const StepIndicator = memo(function StepIndicator({ styles, primaryColor, cornerRadius, playfulness }) {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-6"
      style={styles}
    >
      <div className="flex items-center justify-between mb-8">
        {WIZARD_STEPS.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <m.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer transition-colors"
                style={{
                  backgroundColor: i <= currentStep ? primaryColor : "var(--surface)",
                  color: i <= currentStep ? "#fff" : "var(--textMuted)",
                  border: i <= currentStep ? "none" : "1px solid var(--borderDim)",
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setCurrentStep(i)}
              >
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </m.div>
              <span
                className="text-xs mt-2 transition-colors"
                style={{ color: i <= currentStep ? "var(--text)" : "var(--textMuted)" }}
              >
                {step}
              </span>
            </div>
            {i < WIZARD_STEPS.length - 1 && (
              <div
                className="w-12 sm:w-20 h-1 mx-2 transition-colors"
                style={{ backgroundColor: i < currentStep ? primaryColor : "var(--borderDim)" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-neutral-400 text-sm">Click on steps to navigate</p>
      </div>
    </m.div>
  );
});

// Component: Multi-step Form (Wizard)
const MultiStepForm = memo(function MultiStepForm({ styles, primaryColor, cornerRadius, playfulness }) {
  const [step, setStep] = useState(0);

  return (
    <m.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {FORM_STEPS.map((s, i) => (
          <div
            key={s}
            className="flex-1 h-1.5 rounded-full"
            style={{ backgroundColor: i <= step ? primaryColor : "var(--borderDim)" }}
          />
        ))}
      </div>
      <p className="text-sm mb-4" style={{ color: "var(--textMuted)" }}>
        Step {step + 1} of {FORM_STEPS.length}: {FORM_STEPS[step]}
      </p>

      <AnimatePresence mode="wait">
        <m.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-4"
        >
          {step === 0 && (
            <>
              <input
                type="text"
                placeholder="First Name"
                className="w-full px-4 py-3 focus:outline-none border-2 border-transparent transition-colors"
                style={{
                  borderRadius: `${cornerRadius}px`,
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--borderDim)",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 focus:outline-none border-2 border-transparent transition-colors"
                style={{
                  borderRadius: `${cornerRadius}px`,
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--borderDim)",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
              />
            </>
          )}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 focus:outline-none border-2 border-transparent transition-colors"
                style={{
                  borderRadius: `${cornerRadius}px`,
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--borderDim)",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 focus:outline-none border-2 border-transparent transition-colors"
                style={{
                  borderRadius: `${cornerRadius}px`,
                  backgroundColor: "var(--surface)",
                  color: "var(--text)",
                  border: "1px solid var(--borderDim)",
                }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "var(--borderDim)")}
              />
            </>
          )}
          {step === 2 && (
            <div className="p-4 rounded-lg text-center" style={{ backgroundColor: "var(--surface)" }}>
              <Check className="w-12 h-12 mx-auto mb-3" style={{ color: primaryColor }} />
              <p className="font-medium" style={{ color: "var(--text)" }}>
                Ready to submit!
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--textMuted)" }}>
                Review your info and confirm
              </p>
            </div>
          )}
        </m.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <Button
            variant="outline"
            onClick={() => setStep(step - 1)}
            gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
            color="var(--bg)"
            background="var(--bg)"
            style={{ "--btnRadius": `${cornerRadius}px`, flex: 1 }}
          >
            Back
          </Button>
        )}
        <Button
          onClick={() => (step < 2 ? setStep(step + 1) : null)}
          gradient={`linear-gradient(135deg, ${primaryColor}, color-mix(in srgb, ${primaryColor} 65%, #020617))`}
          color="var(--bg)"
          background="var(--bg)"
          style={{ "--btnRadius": `${cornerRadius}px`, flex: 1 }}
        >
          {step === 2 ? "Submit" : "Continue"}
        </Button>
      </div>
    </m.div>
  );
});
