"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
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
} from "lucide-react";

export default function Render({ id, styles: s }) {
  const { color, play, font, dark } = s;

  const r = Math.round(play * 24);
  const ff = font === "modern" ? "var(--font-sans)" : "var(--font-serif)";
  const hw = play > 0.5 ? 600 : 700;
  const bounce = play > 0.5 ? 1.05 : 1.02;

  const css = useMemo(
    () => ({
      "--primary": color,
      "--radius": `${r}px`,
      "--font": ff,
      fontFamily: ff,
    }),
    [color, r, ff],
  );

  const renderComponent = () => {
    switch (id) {
      case "pricing-card":
        return <PricingCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "hero-centered":
        return <HeroCentered styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "hero-split":
        return <HeroSplit styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "hero-gradient":
        return <HeroGradient styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "testimonial-card":
        return (
          <TestimonialCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />
        );
      case "testimonial-carousel":
        return (
          <TestimonialCarousel styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />
        );
      case "product-card-minimal":
        return <ProductCard styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "product-card-detailed":
        return (
          <ProductCardDetailed styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />
        );
      case "input-text":
        return <TextInput styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "input-email":
        return (
          <NewsletterSignup styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />
        );
      case "toggle-switch":
        return <ToggleSwitch styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "feature-grid-icons":
        return <FeatureGrid styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "feature-bento":
        return <BentoGrid styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "cart-item":
        return <CartItem styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "cart-drawer":
        return <CartDrawer styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "pricing-table":
        return <PricingTable styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      case "input-search":
        return <SearchInput styles={css} primaryColor={color} cornerRadius={r} playfulness={play} darkMode={dark} />;
      default:
        return (
          <div className="text-center p-8 bg-neutral-100 dark:bg-neutral-800 rounded-lg">
            <p className="text-neutral-600 dark:text-neutral-400">Component "{id}" not yet implemented</p>
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
      className="w-full max-w-sm mx-auto"
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
      className={`text-center py-16 relative overflow-visible ${darkMode ? "text-white" : "text-slate-900"}`}
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
      className="grid md:grid-cols-2 gap-12 items-center py-8"
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
          className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-4 leading-tight"
        >
          Transform your workflow with AI
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="text-neutral-600 dark:text-neutral-400 mb-6"
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
        className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 flex items-center justify-center"
        style={{ borderRadius: `${cornerRadius * 1.5}px` }}
      >
        <div
          className="w-16 h-16 flex items-center justify-center text-white"
          style={{
            backgroundColor: primaryColor,
            borderRadius: `${cornerRadius}px`,
          }}
        >
          <Zap className="w-8 h-8" />
        </div>
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
      className="max-w-md mx-auto"
      style={styles}
    >
      <div
        className="p-8 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Stars */}
        <div className="flex gap-1 mb-4">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star key={star} className="w-5 h-5 fill-current" style={{ color: primaryColor }} />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-lg text-neutral-700 dark:text-neutral-300 mb-6 leading-relaxed">
          "This product has completely transformed how our team works. The attention to detail is remarkable, and the
          support is world-class."
        </blockquote>

        {/* Author */}
        <div className="flex items-center gap-4">
          <div
            className="w-12 h-12 bg-gradient-to-br from-neutral-300 to-neutral-400 flex items-center justify-center text-white font-semibold"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          >
            SJ
          </div>
          <div>
            <div className="font-semibold text-neutral-900 dark:text-white">Sarah Johnson</div>
            <div className="text-sm text-neutral-500">CEO, TechStart Inc.</div>
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
      className="max-w-xs mx-auto"
      style={styles}
    >
      <div
        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image */}
        <div className="aspect-square bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 relative">
          <motion.button
            whileHover={{ scale: 1.1 }}
            className="absolute top-4 right-4 w-10 h-10 bg-white dark:bg-neutral-800 flex items-center justify-center shadow-lg"
            style={{ borderRadius: `${cornerRadius / 2}px` }}
          >
            <Heart className="w-5 h-5 text-neutral-400" />
          </motion.button>
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="text-xs text-neutral-500 mb-1">MINIMALIST DESIGN</div>
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">Premium Desk Lamp</h3>
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
      className="max-w-md mx-auto space-y-6"
      style={styles}
    >
      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Full Name</label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="text"
            placeholder="Enter your name"
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 transition-all"
            style={{
              borderRadius: `${cornerRadius}px`,
              "--tw-ring-color": `${primaryColor}50`,
            }}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2">Password</label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full pl-12 pr-4 py-3 bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none focus:ring-2 transition-all"
            style={{
              borderRadius: `${cornerRadius}px`,
            }}
          />
        </div>
        <p className="text-xs text-neutral-500 mt-1.5">Must be at least 8 characters</p>
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
      className="max-w-lg mx-auto text-center"
      style={styles}
    >
      <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-2">Stay in the loop</h3>
      <p className="text-neutral-600 dark:text-neutral-400 mb-6">
        Subscribe to our newsletter for the latest updates and exclusive offers.
      </p>

      <div className="flex gap-2 p-2 bg-neutral-100 dark:bg-neutral-800" style={{ borderRadius: `${cornerRadius}px` }}>
        <div className="flex-1 relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <input
            type="email"
            placeholder="Enter your email"
            className="w-full pl-12 pr-4 py-3 bg-transparent text-neutral-900 dark:text-white placeholder:text-neutral-500 focus:outline-none"
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
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-md mx-auto space-y-4"
      style={styles}
    >
      {[
        { label: "Email notifications", sublabel: "Receive email updates", defaultOn: true },
        { label: "Push notifications", sublabel: "Get push alerts on your device", defaultOn: false },
        { label: "Marketing emails", sublabel: "Receive promotional content", defaultOn: false },
      ].map((item, index) => (
        <div
          key={item.label}
          className="flex items-center justify-between p-4 bg-neutral-50 dark:bg-neutral-800"
          style={{ borderRadius: `${cornerRadius}px` }}
        >
          <div>
            <div className="font-medium text-neutral-900 dark:text-white">{item.label}</div>
            <div className="text-sm text-neutral-500">{item.sublabel}</div>
          </div>
          <motion.button
            initial={{ backgroundColor: item.defaultOn ? primaryColor : "#d1d5db" }}
            whileTap={{ scale: 0.95 }}
            className="relative w-12 h-7 rounded-full transition-colors"
            style={{ backgroundColor: item.defaultOn ? primaryColor : undefined }}
          >
            <motion.div
              initial={{ x: item.defaultOn ? 22 : 2 }}
              className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-sm"
            />
          </motion.button>
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
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid md:grid-cols-3 gap-6" style={styles}>
      {features.map((feature, index) => (
        <motion.div
          key={feature.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
          className="p-6 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700"
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
          <h3 className="font-semibold text-neutral-900 dark:text-white mb-2">{feature.title}</h3>
          <p className="text-sm text-neutral-600 dark:text-neutral-400">{feature.description}</p>
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
      className="max-w-md mx-auto"
      style={styles}
    >
      <div
        className="p-4 bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row gap-4"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image */}
        <div
          className="w-full sm:w-24 h-24 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 shrink-0"
          style={{ borderRadius: `${cornerRadius / 2}px` }}
        />

        {/* Details */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-neutral-900 dark:text-white truncate">Premium Wireless Headphones</h4>
          <p className="text-sm text-neutral-500 mb-2">Color: Matte Black</p>

          <div className="flex items-center justify-between">
            <span className="font-bold" style={{ color: primaryColor }}>
              $299.00
            </span>

            {/* Quantity Controls */}
            <div
              className="flex items-center gap-2 bg-neutral-100 dark:bg-neutral-700"
              style={{ borderRadius: `${cornerRadius / 2}px` }}
            >
              <button className="w-8 h-8 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-l-lg">
                -
              </button>
              <span className="w-8 text-center text-sm font-medium text-neutral-900 dark:text-white">2</span>
              <button className="w-8 h-8 flex items-center justify-center text-neutral-600 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-600 rounded-r-lg">
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
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="relative py-16 sm:py-20 lg:py-24 text-center overflow-hidden px-4"
      style={styles}
    >
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 opacity-90" />
      <motion.div
        animate={{
          backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 bg-gradient-to-tr from-blue-600 via-violet-600 to-pink-600 opacity-60"
        style={{ backgroundSize: "200% 200%" }}
      />

      {/* Content */}
      <div className="relative z-10">
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="inline-block mb-6"
        >
          <div className="px-4 py-2 bg-white/20 backdrop-blur-sm text-white font-medium rounded-full border border-white/30">
            ✨ Introducing our newest innovation
          </div>
        </motion.div>

        <motion.h1
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-7xl font-black text-white mb-6 leading-tight"
        >
          The Future is
          <br />
          <span className="bg-gradient-to-r from-yellow-200 to-pink-200 bg-clip-text text-transparent">
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
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white text-purple-600 font-bold rounded-full shadow-2xl hover:shadow-white/50 transition-shadow w-full sm:w-auto"
          >
            Get Started Free
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-full border-2 border-white/30 hover:bg-white/20 transition-colors w-full sm:w-auto"
          >
            Watch Demo
          </motion.button>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute top-20 left-10 w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl hidden md:block"
      />
      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 5, repeat: Infinity }}
        className="absolute bottom-20 right-10 w-24 h-24 bg-white/20 backdrop-blur-sm rounded-full hidden md:block"
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
  const testimonials = [
    {
      quote: "This tool has revolutionized our workflow. The efficiency gains are remarkable!",
      author: "Alex Rivera",
      role: "CTO, TechFlow",
      rating: 5,
    },
    {
      quote: "Best investment we've made this year. The ROI was immediate.",
      author: "Sam Chen",
      role: "Founder, StartupX",
      rating: 5,
    },
  ];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="max-w-4xl mx-auto px-4" style={styles}>
      <div className="relative">
        {/* Main Testimonial */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 sm:p-10 bg-gradient-to-br from-white to-neutral-50 dark:from-neutral-800 dark:to-neutral-900 border border-neutral-200 dark:border-neutral-700"
          style={{ borderRadius: `${cornerRadius * 1.5}px` }}
        >
          {/* Quote Icon */}
          <div
            className="w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center mb-6 text-2xl sm:text-3xl font-serif text-white"
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
              <Star key={star} className="w-5 h-5 sm:w-6 sm:h-6 fill-current" style={{ color: primaryColor }} />
            ))}
          </div>

          {/* Quote Text */}
          <blockquote className="text-xl sm:text-3xl font-medium text-neutral-900 dark:text-white mb-8 leading-relaxed">
            {testimonials[0].quote}
          </blockquote>

          {/* Author */}
          <div className="flex items-center gap-4">
            <div
              className="w-14 h-14 sm:w-16 sm:h-16 bg-gradient-to-br flex items-center justify-center text-white text-lg sm:text-xl font-bold"
              style={{
                backgroundImage: `linear-gradient(135deg, ${primaryColor}, ${primaryColor}dd)`,
                borderRadius: `${cornerRadius}px`,
              }}
            >
              {testimonials[0].author
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
            <div>
              <div className="font-bold text-neutral-900 dark:text-white text-base sm:text-lg">
                {testimonials[0].author}
              </div>
              <div className="text-sm sm:text-base text-neutral-500">{testimonials[0].role}</div>
            </div>
          </div>
        </motion.div>

        {/* Navigation Dots */}
        <div className="flex justify-center gap-2 mt-6">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: primaryColor }} />
          <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
          <div className="w-2 h-2 rounded-full bg-neutral-300 dark:bg-neutral-600" />
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
      className="max-w-sm mx-auto"
      style={styles}
    >
      <div
        className="bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 overflow-hidden"
        style={{ borderRadius: `${cornerRadius}px` }}
      >
        {/* Image with Badge */}
        <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 dark:from-blue-900 dark:to-purple-900 relative">
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
    { name: "Wireless Headphones", price: 299, qty: 1 },
    { name: "Smart Watch", price: 399, qty: 2 },
  ];
  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="max-w-md mx-auto bg-white dark:bg-neutral-800 shadow-2xl"
      style={{ ...styles, borderRadius: `${cornerRadius}px` }}
    >
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
          <div key={idx} className="flex gap-4 pb-4 border-b border-neutral-100 dark:border-neutral-700 last:border-0">
            <div
              className="w-20 h-20 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-700 dark:to-neutral-600 shrink-0"
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
      className="max-w-2xl mx-auto"
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
