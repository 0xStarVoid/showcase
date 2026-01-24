"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
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

/**
 * Theme utility - consistent dark mode colors across all components
 * Use this instead of mixing dark: Tailwind variants with darkMode prop
 */
const useTheme = (darkMode) => ({
  // Backgrounds
  bg: darkMode ? "bg-slate-900" : "bg-white",
  bgAlt: darkMode ? "bg-slate-800" : "bg-slate-50",
  bgInput: darkMode ? "bg-slate-800" : "bg-neutral-100",
  bgCard: darkMode ? "bg-slate-800" : "bg-white",
  // Text
  text: darkMode ? "text-white" : "text-slate-900",
  textMuted: darkMode ? "text-slate-400" : "text-slate-600",
  textDim: darkMode ? "text-slate-500" : "text-slate-400",
  // Borders
  border: darkMode ? "border-slate-700" : "border-slate-200",
  borderDim: darkMode ? "border-slate-800" : "border-slate-100",
  // Dividers
  divider: darkMode ? "bg-slate-800" : "bg-slate-100",
  // Interactive
  hoverBg: darkMode ? "hover:bg-slate-700" : "hover:bg-slate-50",
  // Raw values for inline styles
  raw: {
    bg: darkMode ? "#0f172a" : "#ffffff",
    text: darkMode ? "#ffffff" : "#0f172a",
    muted: darkMode ? "#94a3b8" : "#64748b",
  },
});

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

  // Create theme object for consistent styling
  const theme = useTheme(dark);

  const renderComponent = () => {
    switch (id) {
      case "pricing-card":
        return (
          <PricingCard
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "hero-centered":
        return (
          <HeroCentered
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "hero-split":
        return (
          <HeroSplit
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "hero-gradient":
        return (
          <HeroGradient
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "testimonial-card":
        return (
          <TestimonialCard
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "testimonial-carousel":
        return (
          <TestimonialCarousel
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "product-card-minimal":
        return (
          <ProductCard
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "product-card-detailed":
        return (
          <ProductCardDetailed
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "input-text":
        return (
          <TextInput
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "input-email":
        return (
          <NewsletterSignup
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "toggle-switch":
        return (
          <ToggleSwitch
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "feature-grid-icons":
        return (
          <FeatureGrid
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "feature-bento":
        return (
          <BentoGrid
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "cart-item":
        return (
          <CartItem
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "cart-drawer":
        return (
          <CartDrawer
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "pricing-table":
        return (
          <PricingTable
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "input-search":
        return (
          <SearchInput
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "checkbox-group":
        return (
          <CheckboxGroup
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "radio-group":
        return (
          <RadioGroup
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "wizard-steps":
        return (
          <StepIndicator
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
      case "wizard-form":
        return (
          <MultiStepForm
            styles={css}
            primaryColor={color}
            cornerRadius={r}
            playfulness={play}
            darkMode={dark}
            theme={theme}
          />
        );
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
function PricingCard({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const features = [
    "Unlimited projects",
    "Advanced analytics",
    "Priority support",
    "Custom integrations",
    "Team collaboration",
  ];

  const isPlayful = playfulness > 0.5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-sm mx-auto p-6"
      style={styles}
    >
      <div
        className={`relative overflow-hidden p-8 ${
          darkMode ? "bg-slate-900 border-slate-700" : "bg-white border-slate-200"
        } border shadow-xl`}
        style={{
          borderRadius: `${cornerRadius}px`,
          boxShadow: isPlayful ? `0 20px 40px -10px ${primaryColor}20` : `0 4px 6px -1px rgba(0,0,0,0.1)`,
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
          className="inline-flex items-center px-3 py-1 text-xs font-bold tracking-wide text-white mb-6 uppercase"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius / (isPlayful ? 1 : 2)}px`,
          }}
        >
          Most Popular
        </div>

        {/* Plan Name */}
        <div className="flex justify-between items-start mb-2">
          <h3
            className={`text-2xl ${darkMode ? "text-white" : "text-slate-900"}`}
            style={{ fontWeight: isPlayful ? 800 : 600 }}
          >
            Professional
          </h3>
          {isPlayful && <Star className="w-6 h-6 text-yellow-400 fill-yellow-400 animate-pulse" />}
        </div>

        <p className={`text-sm mb-6 ${darkMode ? "text-slate-400" : "text-slate-500"}`}>
          Perfect for growing teams and startups.
        </p>

        {/* Price */}
        <div className="flex items-baseline gap-1 mb-8">
          <span className={`text-5xl font-bold ${darkMode ? "text-white" : "text-slate-900"}`}>$49</span>
          <span className={darkMode ? "text-slate-500" : "text-slate-400"}>/month</span>
        </div>

        {/* Divider */}
        <div className={`h-px w-full mb-8 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`} />

        {/* Features */}
        <ul className="space-y-4 mb-8">
          {features.map((feature, index) => (
            <motion.li
              key={feature}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`flex items-center gap-3 ${darkMode ? "text-slate-300" : "text-slate-600"}`}
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
            </motion.li>
          ))}
        </ul>

        {/* CTA Button */}
        <motion.button
          whileHover={{ scale: isPlayful ? 1.03 : 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="w-full py-4 text-white font-bold transition-all relative overflow-hidden group"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
          }}
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </span>
          {isPlayful && (
            <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          )}
        </motion.button>

        <p className={`text-center text-xs mt-4 ${darkMode ? "text-slate-500" : "text-slate-400"}`}>
          14-day free trial • No credit card required
        </p>
      </div>
    </motion.div>
  );
}

// Component: Hero Centered
function HeroCentered({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const isPlayful = playfulness > 0.5;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={`text-center px-8 py-16 relative overflow-visible ${darkMode ? "text-white" : "text-slate-900"}`}
      style={styles}
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

      <motion.div
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
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight text-transparent bg-clip-text"
        style={{
          backgroundImage: darkMode
            ? `linear-gradient(to bottom, white 40%, ${primaryColor} 150%)`
            : `linear-gradient(to bottom, #0f172a 40%, ${primaryColor} 150%)`,
        }}
      >
        Build beautiful products
        <br />
        <span style={{ color: primaryColor }}>faster than ever</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${darkMode ? "text-slate-400" : "text-slate-600"}`}
      >
        The modern toolkit for creating stunning user interfaces. Ship products that users love with our comprehensive
        design system.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-4 justify-center"
      >
        <motion.button
          whileHover={{ scale: isPlayful ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-8 py-4 text-white font-bold inline-flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-all"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
            boxShadow: `0 10px 25px -5px ${primaryColor}40`,
          }}
        >
          Start Building
          <ArrowRight className="w-5 h-5" />
        </motion.button>

        <motion.button
          whileHover={{ scale: isPlayful ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className={`px-8 py-4 font-semibold border transition-colors ${darkMode ? "text-white hover:bg-white/5" : "text-slate-900 hover:bg-slate-50"}`}
          style={{
            borderColor: darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
            borderRadius: `${cornerRadius}px`,
          }}
        >
          View Documentation
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// Component: Hero Split
function HeroSplit({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-2 gap-12 items-center px-8 py-12"
      style={styles}
    >
      <div>
        <motion.span
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
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className={`text-3xl md:text-4xl font-bold mb-4 leading-tight ${darkMode ? "text-white" : "text-slate-900"}`}
        >
          Transform your workflow with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className={`mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}
        >
          Automate repetitive tasks and focus on what matters. Our intelligent platform learns your patterns.
        </motion.p>

        <motion.button
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          whileHover={{ scale: playfulness > 0.5 ? 1.05 : 1.02 }}
          className="px-6 py-3 text-white font-semibold inline-flex items-center gap-2"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
          }}
        >
          Try it Free
          <ArrowRight className="w-4 h-4" />
        </motion.button>
      </div>

      <motion.div
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
          <rect width="400" height="400" fill={darkMode ? "#1e293b" : "#f1f5f9"} rx={cornerRadius * 1.5} />

          {/* Decorative grid */}
          <g stroke={darkMode ? "#334155" : "#e2e8f0"} strokeWidth="1" opacity="0.5">
            {[80, 160, 240, 320].map((x) => (
              <line key={`v${x}`} x1={x} y1="0" x2={x} y2="400" />
            ))}
            {[80, 160, 240, 320].map((y) => (
              <line key={`h${y}`} x1="0" y1={y} x2="400" y2={y} />
            ))}
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
          {[
            { cx: 200, cy: 60, icon: "M195 55 L200 50 L205 55 L205 65 L200 70 L195 65 Z" },
            { cx: 340, cy: 200, icon: "M335 195 L345 195 L345 205 L335 205 Z" },
            { cx: 200, cy: 340, icon: "M192 340 A8 8 0 1 1 208 340 A8 8 0 1 1 192 340" },
            { cx: 60, cy: 200, icon: "M52 200 L60 192 L68 200 L60 208 Z" },
            { cx: 305, cy: 95, icon: "M300 90 L310 90 L310 100 L300 100 Z" },
            { cx: 95, cy: 305, icon: "M87 305 A8 8 0 1 1 103 305 A8 8 0 1 1 87 305" },
          ].map((node, i) => (
            <g key={i}>
              <circle cx={node.cx} cy={node.cy} r="24" fill="url(#heroGrad2)" />
              <path d={node.icon} fill="white" />
            </g>
          ))}

          {/* Floating particles */}
          {playfulness > 0.3 && (
            <g fill={primaryColor} opacity="0.4">
              <circle cx="150" cy="120" r="4" />
              <circle cx="280" cy="150" r="3" />
              <circle cx="120" cy="270" r="5" />
              <circle cx="300" cy="280" r="4" />
              <circle cx="340" cy="130" r="3" />
              <circle cx="70" cy="130" r="4" />
            </g>
          )}
        </svg>
      </motion.div>
    </motion.div>
  );
}

// Component: Testimonial Card
function TestimonialCard({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div
        className={`p-8 border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-current" style={{ color: primaryColor }} />
          ))}
        </div>

        {/* Quote */}
        <blockquote className={`text-lg mb-6 leading-relaxed ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
          "This product has completely transformed how our team works. The attention to detail is remarkable, and the
          support is world-class."
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <img
            src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
            alt="Sarah Johnson"
            className="w-12 h-12 object-cover"
            loading="lazy"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          />
          <div>
            <div className={`font-semibold ${darkMode ? "text-white" : "text-slate-900"}`}>Sarah Johnson</div>
            <div className="text-sm text-slate-500">CEO, TechStart Inc.</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Component: Product Card
function ProductCard({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-xs mx-auto p-6"
      style={styles}
    >
      <div
        className={`overflow-hidden border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop"
            alt="Premium Desk Lamp"
            className="w-full h-full object-cover"
            loading="lazy"
          />
          <motion.button
            whileHover={{ scale: 1.1 }}
            className={`absolute top-4 right-4 w-10 h-10 flex items-center justify-center shadow-lg ${darkMode ? "bg-slate-800" : "bg-white"}`}
            style={{ borderRadius: `${cornerRadius / 2}px` }}
            aria-label="Add to favorites"
          >
            <Heart className="w-5 h-5 text-slate-400" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-xs text-slate-500 mb-1">MINIMALIST DESIGN</div>
          <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>Premium Desk Lamp</h3>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold" style={{ color: primaryColor }}>
              $129.00
            </span>
            <motion.button
              whileHover={{ scale: playfulness > 0.5 ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 flex items-center justify-center text-white"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Component: Text Input
function TextInput({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-6 p-6"
      style={styles}
    >
      <div>
        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: primaryColor }} />
          <input
            type="text"
            placeholder="Enter your name"
            className={`w-full pl-12 pr-4 py-3 placeholder:text-slate-500 focus:outline-none transition-all border-2 border-transparent ${darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"}`}
            style={{
              borderRadius: `${cornerRadius}px`,
            }}
            onFocus={(e) => (e.target.style.borderColor = primaryColor)}
            onBlur={(e) => (e.target.style.borderColor = "transparent")}
          />
        </div>
      </div>

      <div>
        <label className={`block text-sm font-medium mb-2 ${darkMode ? "text-slate-300" : "text-slate-700"}`}>
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: primaryColor }} />
          <input
            type="password"
            placeholder="Enter your password"
            className={`w-full pl-12 pr-4 py-3 placeholder:text-slate-500 focus:outline-none transition-all border-2 border-transparent ${darkMode ? "bg-slate-800 text-white" : "bg-slate-100 text-slate-900"}`}
            style={{
              borderRadius: `${cornerRadius}px`,
            }}
            onFocus={(e) => (e.target.style.borderColor = primaryColor)}
            onBlur={(e) => (e.target.style.borderColor = "transparent")}
          />
        </div>
        <p className="text-xs text-slate-500 mt-1.5">Must be at least 8 characters</p>
      </div>
    </motion.div>
  );
}

// Component: Newsletter Signup
function NewsletterSignup({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto text-center p-6"
      style={styles}
    >
      <h3 className={`text-2xl font-bold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>Stay in the loop</h3>
      <p className={`mb-6 ${darkMode ? "text-slate-400" : "text-slate-600"}`}>
        Subscribe to our newsletter for the latest updates and exclusive offers.
      </p>

      <div
        className={`flex gap-2 p-2 ${darkMode ? "bg-slate-800" : "bg-slate-100"}`}
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        <div className="flex-1 relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="email"
            placeholder="Enter your email"
            className={`w-full pl-12 pr-4 py-3 bg-transparent placeholder:text-slate-500 focus:outline-none ${darkMode ? "text-white" : "text-slate-900"}`}
          />
        </div>
        <motion.button
          whileHover={{ scale: playfulness > 0.5 ? 1.05 : 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 text-white font-semibold shrink-0"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius - 4}px`,
          }}
        >
          Subscribe
        </motion.button>
      </div>

      <p className="text-xs text-neutral-500 mt-3">No spam, unsubscribe anytime.</p>
    </motion.div>
  );
}

// Component: Toggle Switch
function ToggleSwitch({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [toggles, setToggles] = useState({
    email: true,
    push: false,
    marketing: false,
  });

  const toggle = (key) => setToggles((prev) => ({ ...prev, [key]: !prev[key] }));

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-4 p-6"
      style={styles}
    >
      {[
        { id: "email", label: "Email notifications", sublabel: "Receive email updates" },
        { id: "push", label: "Push notifications", sublabel: "Get push alerts on your device" },
        { id: "marketing", label: "Marketing emails", sublabel: "Receive promotional content" },
      ].map((item) => (
        <div
          key={item.id}
          className={`flex items-center justify-between p-4 ${darkMode ? "bg-slate-800" : "bg-slate-50"}`}
          style={{ borderRadius: `${cornerRadius}px` }}
        >
          <div>
            <div className={`font-medium ${darkMode ? "text-white" : "text-slate-900"}`}>{item.label}</div>
            <div className="text-sm text-slate-500">{item.sublabel}</div>
          </div>
          <button onClick={() => toggle(item.id)} className="rounded-full focus:outline-none">
            <motion.div
              initial={false}
              animate={{
                backgroundColor: toggles[item.id] ? primaryColor : "#d1d5db",
              }}
              className="relative w-12 h-7 rounded-full transition-colors"
              style={{ backgroundColor: toggles[item.id] ? primaryColor : undefined }}
            >
              <motion.div
                initial={false}
                animate={{ x: toggles[item.id] ? 22 : 2 }}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
              />
            </motion.div>
          </button>
        </div>
      ))}
    </motion.div>
  );
}

// Component: Feature Grid
function FeatureGrid({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const features = [
    { icon: Zap, title: "Lightning Fast", description: "Optimized for speed and performance" },
    { icon: Shield, title: "Secure by Default", description: "Enterprise-grade security built in" },
    { icon: Heart, title: "Made with Care", description: "Crafted with attention to detail" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid md:grid-cols-3 gap-6 p-6"
      style={styles}
    >
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className={`p-6 border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
          style={{ borderRadius: `${cornerRadius}px` }}
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
          <h3 className={`font-semibold mb-2 ${darkMode ? "text-white" : "text-slate-900"}`}>{feature.title}</h3>
          <p className={`text-sm ${darkMode ? "text-slate-400" : "text-slate-600"}`}>{feature.description}</p>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Component: Cart Item
function CartItem({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div
        className={`p-4 flex flex-col sm:flex-row gap-4 border ${darkMode ? "bg-slate-800 border-slate-700" : "bg-white border-slate-200"}`}
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image */}
        <img
          src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop"
          alt="Premium Wireless Headphones"
          className="w-full sm:w-24 h-24 object-cover shrink-0"
          loading="lazy"
          style={{ borderRadius: `${cornerRadius / 2}px` }}
        />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className={`font-semibold truncate ${darkMode ? "text-white" : "text-slate-900"}`}>
            Premium Wireless Headphones
          </h4>
          <p className="text-sm text-slate-500 mb-2">Color: Matte Black</p>

          <div className="flex items-center justify-between">
            <span className="font-bold" style={{ color: primaryColor }}>
              $299.00
            </span>

            {/* Quantity Controls */}
            <div
              className={`flex items-center gap-2 ${darkMode ? "bg-slate-700" : "bg-slate-100"}`}
              style={{ borderRadius: `${cornerRadius / 2}px` }}
            >
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-l-lg ${darkMode ? "text-slate-300 hover:bg-slate-600" : "text-slate-600 hover:bg-slate-200"}`}
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className={`w-8 text-center text-sm font-medium ${darkMode ? "text-white" : "text-slate-900"}`}>
                2
              </span>
              <button
                className={`w-8 h-8 flex items-center justify-center rounded-r-lg ${darkMode ? "text-slate-300 hover:bg-slate-600" : "text-slate-600 hover:bg-slate-200"}`}
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Component: Hero Gradient
function HeroGradient({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  // Platinum Standard: Use color-mix with 45%/65% ratios for proper contrast
  // Matches Portfolio Nav.module.css swatch pattern
  const accentLight = `color-mix(in srgb, ${primaryColor} 45%, #ffffff)`;
  const accentDark = `color-mix(in srgb, ${primaryColor} 65%, #020617)`;
  const accentStrong = `color-mix(in srgb, ${primaryColor} 74%, #020617)`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-16 sm:py-20 lg:py-24 text-center overflow-hidden px-4"
      style={styles}
    >
      {/* Dark Background with subtle accent glow */}
      <div className="absolute inset-0" style={{ background: "#0b1120" }} />
      <motion.div
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
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div
            className="px-4 py-2 backdrop-blur-sm font-medium rounded-full border"
            style={{
              background: `color-mix(in srgb, ${primaryColor} 20%, transparent)`,
              borderColor: `color-mix(in srgb, #ffffff 30%, transparent)`,
              color: "#ffffff",
            }}
          >
            ✨ Introducing our newest innovation
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black mb-6 leading-tight"
          style={{ color: "#ffffff" }}
        >
          The Future is
          <br />
          <span
            className="bg-clip-text text-transparent"
            style={{ backgroundImage: `linear-gradient(135deg, ${accentLight}, ${primaryColor}, ${accentDark})` }}
          >
            Bright & Bold
          </span>
        </motion.h1>

        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto mb-8 px-4"
        >
          Experience the next generation of design with our revolutionary platform that transforms ideas into reality.
        </motion.p>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center px-4"
        >
          {/* Primary CTA - Accent gradient bg, dark text (Diamond Standard) */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 font-bold rounded-full shadow-2xl transition-shadow w-full sm:w-auto"
            style={{
              background: `linear-gradient(135deg, ${accentLight}, ${accentDark})`,
              color: "#0b1120",
              boxShadow: `0 25px 50px -12px color-mix(in srgb, ${primaryColor} 50%, transparent)`,
            }}
          >
            Get Started Free
          </motion.button>
          {/* Secondary CTA - Ghost style */}
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 backdrop-blur-sm font-semibold rounded-full border-2 transition-colors w-full sm:w-auto"
            style={{
              background: `color-mix(in srgb, #ffffff 10%, transparent)`,
              color: "#ffffff",
              borderColor: `color-mix(in srgb, #ffffff 30%, transparent)`,
            }}
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements with accent color */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-16 h-16 backdrop-blur-sm rounded-2xl hidden md:block"
        style={{ background: `color-mix(in srgb, ${primaryColor} 25%, transparent)` }}
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-24 h-24 backdrop-blur-sm rounded-full hidden md:block"
        style={{ background: `color-mix(in srgb, ${primaryColor} 20%, transparent)` }}
      />
    </motion.div>
  );
}

// Component: Bento Grid
function BentoGrid({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-4"
      style={styles}
    >
      {/* Large Feature - Takes 2 columns on lg, full width on mobile */}
      <motion.div
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
          <Zap className="w-12 h-12 text-white mb-4" />
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-3">Lightning Fast Performance</h3>
          <p className="text-white/80 text-sm sm:text-base">
            Built for speed with cutting-edge optimization techniques that deliver instant results.
          </p>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
      </motion.div>

      {/* Medium Feature */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="col-span-1 sm:col-span-1 lg:col-span-2 p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        <Shield className="w-10 h-10 mb-3" style={{ color: primaryColor }} />
        <h4 className="text-lg font-bold text-neutral-900 dark:text-white mb-2">Enterprise Security</h4>
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          Bank-level encryption and compliance certifications.
        </p>
      </motion.div>

      {/* Small Feature */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3 }}
        className="col-span-1 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        <Heart className="w-8 h-8 mb-2 text-rose-500" />
        <h4 className="font-bold text-neutral-900 dark:text-white text-sm sm:text-base">User Focused</h4>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400">Built with love</p>
      </motion.div>

      {/* Small Feature */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4 }}
        className="col-span-1 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-800 dark:to-neutral-700"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        <div className="text-3xl sm:text-4xl font-black mb-2" style={{ color: primaryColor }}>
          99.9%
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 font-medium">Uptime Guarantee</p>
      </motion.div>
    </motion.div>
  );
}

// Component: Testimonial Carousel
function TestimonialCarousel({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [index, setIndex] = useState(0);

  const testimonials = [
    {
      quote: "This tool has revolutionized our workflow. The efficiency gains are remarkable!",
      author: "Alex Rivera",
      role: "CTO, TechFlow",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    {
      quote: "Best investment we've made this year. The ROI was immediate.",
      author: "Sam Chen",
      role: "Founder, StartupX",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    {
      quote: "The attention to detail and customization options are unparalleled.",
      author: "Jordan Lee",
      role: "Product Lead, DesignCo",
      rating: 5,
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
  ];

  const current = testimonials[index];

  const next = () => setIndex((i) => (i + 1) % testimonials.length);
  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto p-6" style={styles}>
      <div className="relative">
        <div className="flex items-center gap-4">
          <button
            onClick={prev}
            className="hidden sm:flex p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronLeft className="w-6 h-6 text-neutral-400" />
          </button>

          <div className="flex-1 relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="p-6 sm:p-10 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
                style={{ borderRadius: `${cornerRadius * 1.5}px` }}
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
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className="w-5 h-5 sm:w-6 sm:h-6 fill-current transition-colors duration-300"
                      style={{ color: primaryColor }}
                    />
                  ))}
                </div>

                {/* Quote Text */}
                <blockquote className="text-xl sm:text-3xl font-medium text-neutral-900 dark:text-white mb-8 leading-relaxed">
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
                    <div className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg">
                      {current.author}
                    </div>
                    <div className="text-sm sm:text-base text-neutral-500">{current.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={next}
            className="hidden sm:flex p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-6 h-6 text-neutral-400" />
          </button>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-300"
              style={{
                backgroundColor: i === index ? primaryColor : undefined,
                opacity: i === index ? 1 : 0.3,
                className: i === index ? "" : "bg-neutral-900 dark:bg-neutral-100",
              }}
            >
              {i !== index && <div className="w-full h-full bg-neutral-400 dark:bg-neutral-600 rounded-full" />}
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

// Component: Product Card Detailed
function ProductCardDetailed({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-sm mx-auto p-6"
      style={styles}
    >
      <div
        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image with Badge */}
        <div className="aspect-square relative overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop"
            alt="Designer Leather Bag"
            className="w-full h-full object-cover"
          />
          <div className="absolute top-4 left-4 px-3 py-1 bg-red-500 text-white text-xs font-bold rounded-full">
            -25% OFF
          </div>
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-neutral-700 flex items-center justify-center shadow-lg"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          >
            <Heart className="w-5 h-5 text-neutral-400 dark:text-neutral-300" />
          </motion.button>

          {/* Quick View Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <button
              className="w-full py-2 bg-white/90 dark:bg-neutral-800/90 backdrop-blur-sm text-neutral-900 dark:text-white text-sm font-semibold"
              style={{ borderRadius: `${cornerRadius / 2}px` }}
            >
              Quick View
            </button>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-2">
            <div>
              <div className="text-xs text-neutral-500 mb-1">PREMIUM COLLECTION</div>
              <h3 className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg">Designer Leather Bag</h3>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className="w-4 h-4 fill-current"
                  style={{ color: star <= 4 ? primaryColor : "#d1d5db" }}
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">(128 reviews)</span>
          </div>

          {/* Features */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-md">
              Free Shipping
            </span>
            <span className="px-2 py-1 bg-neutral-100 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 text-xs rounded-md">
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
                <span className="text-sm text-neutral-400 line-through">$239</span>
              </div>
              <div className="text-xs text-neutral-500">or $15/month</div>
            </div>
            <motion.button
              whileHover={{ scale: playfulness > 0.5 ? 1.1 : 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-12 h-12 flex items-center justify-center text-white"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
              }}
            >
              <ShoppingCart className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Component: Cart Drawer
function CartDrawer({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const items = [
    {
      name: "Wireless Headphones",
      price: 299,
      qty: 1,
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    },
    {
      name: "Smart Watch",
      price: 399,
      qty: 2,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    },
  ];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      <div className="bg-white dark:bg-neutral-800 shadow-2xl" style={{ borderRadius: `${cornerRadius}px` }}>
        {/* Header */}
        <div className="p-6 border-b border-neutral-200 dark:border-neutral-700">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-neutral-900 dark:text-white">Shopping Cart</h2>
            <div
              className="w-8 h-8 flex items-center justify-center text-white text-sm font-bold"
              style={{
                backgroundColor: primaryColor,
                borderRadius: "50%",
              }}
            >
              {items.reduce((sum, item) => sum + item.qty, 0)}
            </div>
          </div>
        </div>

        {/* Items */}
        <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-20 h-20 object-cover shrink-0"
                style={{ borderRadius: `${cornerRadius / 2}px` }}
              />
              <div className="flex-1">
                <h4 className="font-semibold text-neutral-900 dark:text-white text-sm">{item.name}</h4>
                <p className="text-xs text-neutral-500 mb-2">Color: Black</p>
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm" style={{ color: primaryColor }}>
                    ${item.price}
                  </span>
                  <div className="flex items-center gap-2 text-xs">
                    <button className="w-6 h-6 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 rounded">
                      -
                    </button>
                    <span className="font-medium text-neutral-900 dark:text-white">{item.qty}</span>
                    <button className="w-6 h-6 flex items-center justify-center bg-neutral-100 dark:bg-neutral-700 rounded">
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-neutral-200 dark:border-neutral-700">
          <div className="flex justify-between mb-4">
            <span className="text-neutral-600 dark:text-neutral-400">Subtotal</span>
            <span className="font-bold text-neutral-900 dark:text-white">${subtotal}</span>
          </div>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 text-white font-bold flex items-center justify-center gap-2"
            style={{
              backgroundColor: primaryColor,
              borderRadius: `${cornerRadius}px`,
            }}
          >
            Checkout
            <ChevronRight className="w-5 h-5" />
          </motion.button>
          <p className="text-center text-xs text-neutral-500 mt-3">Free shipping on orders over $100</p>
        </div>
      </div>
    </motion.div>
  );
}

// Component: Pricing Table
function PricingTable({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const plans = [
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 p-4"
      style={styles}
    >
      {plans.map((plan, idx) => (
        <motion.div
          key={plan.name}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className={`p-6 sm:p-8 bg-white dark:bg-neutral-800 border relative ${
            plan.popular ? "border-2 scale-105 shadow-xl" : "border-neutral-200 dark:border-neutral-700"
          }`}
          style={{
            borderColor: plan.popular ? primaryColor : undefined,
            borderRadius: `${cornerRadius}px`,
          }}
        >
          {plan.popular && (
            <div
              className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 text-xs font-bold text-white whitespace-nowrap"
              style={{
                backgroundColor: primaryColor,
                borderRadius: `${cornerRadius / 2}px`,
              }}
            >
              MOST POPULAR
            </div>
          )}

          <h3 className="text-lg sm:text-xl font-bold text-neutral-900 dark:text-white mb-2">{plan.name}</h3>
          <div className="flex items-baseline gap-1 mb-6">
            <span className="text-3xl sm:text-4xl font-black text-neutral-900 dark:text-white">${plan.price}</span>
            <span className="text-neutral-500 text-sm">/mo</span>
          </div>

          <ul className="space-y-3 mb-8">
            {plan.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-neutral-600 dark:text-neutral-300">
                <Check className="w-5 h-5 shrink-0" style={{ color: primaryColor }} />
                {feature}
              </li>
            ))}
          </ul>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={`w-full py-3 font-bold ${
              plan.popular ? "text-white" : "border-2 text-neutral-700 dark:text-neutral-300"
            }`}
            style={{
              backgroundColor: plan.popular ? primaryColor : "transparent",
              borderColor: plan.popular ? "transparent" : primaryColor,
              borderRadius: `${cornerRadius}px`,
            }}
          >
            {plan.popular ? "Get Started" : "Choose Plan"}
          </motion.button>
        </motion.div>
      ))}
    </motion.div>
  );
}

// Component: Search Input
function SearchInput({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto p-6"
      style={styles}
    >
      <div className="relative">
        <input
          type="search"
          placeholder="Search for anything..."
          className="w-full pl-14 pr-12 py-5 text-lg bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-400 border-2 border-neutral-200 dark:border-neutral-700 focus:outline-none focus:border-opacity-100 transition-all shadow-lg"
          style={{
            borderRadius: `${cornerRadius * 1.5}px`,
            borderColor: `${primaryColor}00`,
          }}
          onFocus={(e) => {
            e.target.style.borderColor = primaryColor;
            e.target.style.boxShadow = `0 0 0 3px ${primaryColor}20`;
          }}
          onBlur={(e) => {
            e.target.style.borderColor = darkMode ? "#404040" : "#e5e7eb";
            e.target.style.boxShadow = "0 10px 15px -3px rgba(0,0,0,0.1)";
          }}
        />
        <div className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2 text-white font-semibold"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
          }}
        >
          Search
        </motion.button>
      </div>

      {/* Popular Searches */}
      <div className="mt-4 flex flex-wrap gap-2 items-center">
        <span className="text-sm text-neutral-500">Popular:</span>
        {["Design", "Development", "Marketing", "Analytics"].map((term) => (
          <button
            key={term}
            className="px-3 py-1 text-sm bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          >
            {term}
          </button>
        ))}
      </div>
    </motion.div>
  );
}

// Component: Checkbox Group
function CheckboxGroup({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [checked, setChecked] = useState({ notifications: true, updates: false, marketing: false });

  const options = [
    { id: "notifications", label: "Push notifications", desc: "Receive alerts on your device" },
    { id: "updates", label: "Product updates", desc: "Get notified about new features" },
    { id: "marketing", label: "Marketing emails", desc: "Receive promotional content" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 space-y-4"
      style={styles}
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Notification Preferences</h3>
      {options.map((option) => (
        <label
          key={option.id}
          className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
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
            <span className="text-sm font-medium text-neutral-900 dark:text-white">{option.label}</span>
            <p className="text-xs text-neutral-500 mt-0.5">{option.desc}</p>
          </div>
        </label>
      ))}
    </motion.div>
  );
}

// Component: Radio Group
function RadioGroup({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [selected, setSelected] = useState("standard");

  const options = [
    { id: "economy", label: "Economy", price: "$4.99", time: "5-7 days" },
    { id: "standard", label: "Standard", price: "$9.99", time: "3-5 days" },
    { id: "express", label: "Express", price: "$19.99", time: "1-2 days" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6 space-y-3"
      style={styles}
    >
      <h3 className="text-lg font-semibold text-neutral-900 dark:text-white mb-4">Shipping Method</h3>
      {options.map((option) => (
        <label
          key={option.id}
          className={`flex items-center gap-3 p-4 rounded-lg cursor-pointer border-2 transition-all ${
            selected === option.id ? "border-current" : "border-neutral-200 dark:border-neutral-700"
          }`}
          style={{
            borderRadius: `${cornerRadius}px`,
            borderColor: selected === option.id ? primaryColor : undefined,
            backgroundColor: selected === option.id ? `${primaryColor}10` : undefined,
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
            <span className="text-sm font-medium text-neutral-900 dark:text-white">{option.label}</span>
            <p className="text-xs text-neutral-500">{option.time}</p>
          </div>
          <span className="text-sm font-semibold" style={{ color: primaryColor }}>
            {option.price}
          </span>
        </label>
      ))}
    </motion.div>
  );
}

// Component: Step Indicator
function StepIndicator({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [currentStep, setCurrentStep] = useState(2);
  const steps = ["Account", "Details", "Payment", "Confirm"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-lg mx-auto p-6"
      style={styles}
    >
      <div className="flex items-center justify-between mb-8">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center">
            <div className="flex flex-col items-center">
              <motion.div
                className="w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm cursor-pointer"
                style={{
                  backgroundColor: i <= currentStep ? primaryColor : "#374151",
                  color: i <= currentStep ? "#fff" : "#9ca3af",
                }}
                whileHover={{ scale: 1.1 }}
                onClick={() => setCurrentStep(i)}
              >
                {i < currentStep ? <Check className="w-5 h-5" /> : i + 1}
              </motion.div>
              <span className={`text-xs mt-2 ${i <= currentStep ? "text-white" : "text-neutral-500"}`}>{step}</span>
            </div>
            {i < steps.length - 1 && (
              <div
                className="w-12 sm:w-20 h-1 mx-2"
                style={{ backgroundColor: i < currentStep ? primaryColor : "#374151" }}
              />
            )}
          </div>
        ))}
      </div>
      <div className="text-center">
        <p className="text-neutral-400 text-sm">Click on steps to navigate</p>
      </div>
    </motion.div>
  );
}

// Component: Multi-step Form
function MultiStepForm({ styles, primaryColor, cornerRadius, playfulness, darkMode }) {
  const [step, setStep] = useState(0);
  const steps = ["Personal Info", "Contact", "Review"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto p-6"
      style={styles}
    >
      {/* Progress */}
      <div className="flex gap-2 mb-6">
        {steps.map((s, i) => (
          <div
            key={s}
            className="flex-1 h-1.5 rounded-full"
            style={{ backgroundColor: i <= step ? primaryColor : "#374151" }}
          />
        ))}
      </div>
      <p className="text-sm text-neutral-500 mb-4">
        Step {step + 1} of {steps.length}: {steps[step]}
      </p>

      <AnimatePresence mode="wait">
        <motion.div
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
                className="w-full px-4 py-3 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none border-2 border-transparent"
                style={{ borderRadius: `${cornerRadius}px` }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
              <input
                type="text"
                placeholder="Last Name"
                className="w-full px-4 py-3 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none border-2 border-transparent"
                style={{ borderRadius: `${cornerRadius}px` }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            </>
          )}
          {step === 1 && (
            <>
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-4 py-3 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none border-2 border-transparent"
                style={{ borderRadius: `${cornerRadius}px` }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-4 py-3 bg-neutral-800 text-white placeholder:text-neutral-500 focus:outline-none border-2 border-transparent"
                style={{ borderRadius: `${cornerRadius}px` }}
                onFocus={(e) => (e.target.style.borderColor = primaryColor)}
                onBlur={(e) => (e.target.style.borderColor = "transparent")}
              />
            </>
          )}
          {step === 2 && (
            <div className="p-4 bg-neutral-800 rounded-lg text-center">
              <Check className="w-12 h-12 mx-auto mb-3" style={{ color: primaryColor }} />
              <p className="text-white font-medium">Ready to submit!</p>
              <p className="text-neutral-400 text-sm mt-1">Review your info and confirm</p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex gap-3 mt-6">
        {step > 0 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 px-4 py-2.5 bg-neutral-700 text-white font-medium hover:bg-neutral-600 transition-colors"
            style={{ borderRadius: `${cornerRadius}px` }}
          >
            Back
          </button>
        )}
        <button
          onClick={() => (step < 2 ? setStep(step + 1) : null)}
          className="flex-1 px-4 py-2.5 text-white font-medium transition-colors"
          style={{ backgroundColor: primaryColor, borderRadius: `${cornerRadius}px` }}
        >
          {step === 2 ? "Submit" : "Continue"}
        </button>
      </div>
    </motion.div>
  );
}
