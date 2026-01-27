export const cats = [
  {
    id: "marketing",
    name: "Marketing",
    icon: "Megaphone",
    subs: [
      {
        id: "heroes",
        name: "Hero Sections",
        items: [
          {
            id: "hero-centered",
            name: "Centered Hero",
            cat: "marketing",
            sub: "heroes",
            desc: "A classic centered hero with headline, subtext, and CTA buttons",
            tags: ["hero", "landing", "headline", "cta"],
            props: [
              { name: "headline", type: "string", default: '"Welcome to Brand"', desc: "Main headline text" },
              { name: "subtext", type: "string", default: '"Start your journey..."', desc: "Supporting description" },
              { name: "ctaLabel", type: "string", default: '"Get Started"', desc: "Primary CTA button text" },
              { name: "ctaHref", type: "string", default: '"#"', desc: "Primary CTA link destination" },
              {
                name: "secondaryLabel",
                type: "string",
                default: '"Learn More"',
                desc: "Secondary button text (optional)",
              },
            ],
          },
          {
            id: "hero-split",
            name: "Split Hero",
            cat: "marketing",
            sub: "heroes",
            desc: "Hero with content on left and image/illustration on right",
            tags: ["hero", "split", "image", "landing"],
            props: [
              { name: "headline", type: "string", default: '"Build faster"', desc: "Main headline text" },
              { name: "subtext", type: "string", default: '""', desc: "Supporting paragraph" },
              { name: "imageSrc", type: "string", default: '"/hero.png"', desc: "Right-side image URL" },
              { name: "imageAlt", type: "string", default: '"Hero illustration"', desc: "Image alt text" },
              { name: "reverse", type: "boolean", default: "false", desc: "Flip layout (image on left)" },
            ],
          },
          {
            id: "hero-gradient",
            name: "Gradient Hero",
            cat: "marketing",
            sub: "heroes",
            desc: "Bold gradient background hero with animated elements",
            tags: ["hero", "gradient", "animated", "bold"],
            props: [
              { name: "headline", type: "string", default: '"Make an Impact"', desc: "Bold headline" },
              { name: "gradientFrom", type: "string", default: '"#38bdf8"', desc: "Gradient start color" },
              { name: "gradientTo", type: "string", default: '"#818cf8"', desc: "Gradient end color" },
              { name: "animated", type: "boolean", default: "true", desc: "Enable floating animations" },
            ],
          },
        ],
      },
      {
        id: "features",
        name: "Feature Grids",
        items: [
          {
            id: "feature-grid-icons",
            name: "Icon Feature Grid",
            cat: "marketing",
            sub: "features",
            desc: "Grid of features with icons and descriptions",
            tags: ["features", "grid", "icons", "benefits"],
            props: [
              { name: "features", type: "array", default: "[]", desc: "Array of {icon, title, desc} objects" },
              { name: "columns", type: "number", default: "3", desc: "Number of grid columns (1-4)" },
              { name: "iconStyle", type: "string", default: '"filled"', desc: '"filled" | "outline" | "duotone"' },
            ],
          },
          {
            id: "feature-bento",
            name: "Bento Grid",
            cat: "marketing",
            sub: "features",
            desc: "Modern bento-style feature layout",
            tags: ["features", "bento", "modern", "grid"],
            props: [
              { name: "items", type: "array", default: "[]", desc: "Array of {title, desc, span} objects" },
              { name: "gap", type: "number", default: "16", desc: "Gap between cells in pixels" },
            ],
          },
        ],
      },
      {
        id: "testimonials",
        name: "Testimonials",
        items: [
          {
            id: "testimonial-card",
            name: "Testimonial Card",
            cat: "marketing",
            sub: "testimonials",
            desc: "Single testimonial with avatar, quote, and attribution",
            tags: ["testimonial", "quote", "review", "social proof"],
            props: [
              { name: "quote", type: "string", default: '""', desc: "Testimonial quote text" },
              { name: "author", type: "string", default: '"Jane Doe"', desc: "Author name" },
              { name: "role", type: "string", default: '"CEO"', desc: "Author role/title" },
              { name: "avatar", type: "string", default: '""', desc: "Avatar image URL" },
              { name: "rating", type: "number", default: "5", desc: "Star rating (1-5)" },
            ],
          },
          {
            id: "testimonial-carousel",
            name: "Testimonial Carousel",
            cat: "marketing",
            sub: "testimonials",
            desc: "Sliding carousel of customer testimonials",
            tags: ["testimonial", "carousel", "slider", "reviews"],
            props: [
              { name: "testimonials", type: "array", default: "[]", desc: "Array of testimonial objects" },
              { name: "autoPlay", type: "boolean", default: "true", desc: "Auto-advance slides" },
              { name: "interval", type: "number", default: "5000", desc: "Auto-play interval in ms" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "commerce",
    name: "Commerce",
    icon: "ShoppingBag",
    subs: [
      {
        id: "products",
        name: "Product Cards",
        items: [
          {
            id: "product-card-minimal",
            name: "Minimal Product Card",
            cat: "commerce",
            sub: "products",
            desc: "Clean product card with image, title, and price",
            tags: ["product", "card", "minimal", "ecommerce"],
            props: [
              { name: "image", type: "string", default: '""', desc: "Product image URL" },
              { name: "title", type: "string", default: '"Product Name"', desc: "Product title" },
              { name: "price", type: "number", default: "29.99", desc: "Product price" },
              { name: "currency", type: "string", default: '"$"', desc: "Currency symbol" },
              { name: "onClick", type: "function", default: "undefined", desc: "Click handler callback" },
            ],
          },
          {
            id: "product-card-detailed",
            name: "Detailed Product Card",
            cat: "commerce",
            sub: "products",
            desc: "Product card with ratings, badges, and quick actions",
            tags: ["product", "card", "detailed", "ratings"],
            props: [
              { name: "image", type: "string", default: '""', desc: "Product image URL" },
              { name: "title", type: "string", default: '"Product"', desc: "Product title" },
              { name: "price", type: "number", default: "0", desc: "Current price" },
              { name: "originalPrice", type: "number", default: "undefined", desc: "Original price for sale display" },
              { name: "rating", type: "number", default: "4.5", desc: "Star rating (0-5)" },
              { name: "reviews", type: "number", default: "0", desc: "Number of reviews" },
              { name: "badge", type: "string", default: '""', desc: '"new" | "sale" | "bestseller"' },
            ],
          },
        ],
      },
      {
        id: "pricing",
        name: "Pricing Tables",
        items: [
          {
            id: "pricing-card",
            name: "Pricing Card",
            cat: "commerce",
            sub: "pricing",
            desc: "Single pricing tier card with features list",
            tags: ["pricing", "card", "subscription", "tier"],
            props: [
              { name: "name", type: "string", default: '"Pro"', desc: "Plan name" },
              { name: "price", type: "number", default: "29", desc: "Monthly price" },
              { name: "period", type: "string", default: '"/month"', desc: "Billing period text" },
              { name: "features", type: "array", default: "[]", desc: "Array of feature strings" },
              { name: "highlighted", type: "boolean", default: "false", desc: "Highlight as recommended" },
              { name: "ctaLabel", type: "string", default: '"Get Started"', desc: "CTA button text" },
            ],
          },
          {
            id: "pricing-table",
            name: "Pricing Comparison",
            cat: "commerce",
            sub: "pricing",
            desc: "Full pricing table comparing multiple tiers",
            tags: ["pricing", "table", "comparison", "plans"],
            props: [
              { name: "plans", type: "array", default: "[]", desc: "Array of plan objects" },
              { name: "billingToggle", type: "boolean", default: "true", desc: "Show monthly/yearly toggle" },
              { name: "yearlyDiscount", type: "number", default: "20", desc: "Yearly discount percentage" },
            ],
          },
        ],
      },
      {
        id: "cart",
        name: "Cart & Checkout",
        items: [
          {
            id: "cart-drawer",
            name: "Cart Drawer",
            cat: "commerce",
            sub: "cart",
            desc: "Slide-out cart drawer with item list and totals",
            tags: ["cart", "drawer", "sidebar", "checkout"],
            props: [
              { name: "isOpen", type: "boolean", default: "false", desc: "Drawer open state" },
              { name: "onClose", type: "function", default: "undefined", desc: "Close handler" },
              { name: "items", type: "array", default: "[]", desc: "Array of cart item objects" },
              { name: "onCheckout", type: "function", default: "undefined", desc: "Checkout button handler" },
            ],
          },
          {
            id: "cart-item",
            name: "Cart Item Row",
            cat: "commerce",
            sub: "cart",
            desc: "Individual cart line item with quantity controls",
            tags: ["cart", "item", "quantity", "line item"],
            props: [
              { name: "image", type: "string", default: '""', desc: "Product thumbnail URL" },
              { name: "title", type: "string", default: '""', desc: "Product name" },
              { name: "price", type: "number", default: "0", desc: "Unit price" },
              { name: "quantity", type: "number", default: "1", desc: "Item quantity" },
              { name: "onQuantityChange", type: "function", default: "undefined", desc: "Quantity change handler" },
              { name: "onRemove", type: "function", default: "undefined", desc: "Remove item handler" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "forms",
    name: "Forms",
    icon: "FormInput",
    subs: [
      {
        id: "inputs",
        name: "Input Fields",
        items: [
          {
            id: "input-text",
            name: "Text Input",
            cat: "forms",
            sub: "inputs",
            desc: "Standard text input with label and validation states",
            tags: ["input", "text", "field", "form"],
            props: [
              { name: "label", type: "string", default: '"Label"', desc: "Input label text" },
              { name: "placeholder", type: "string", default: '""', desc: "Placeholder text" },
              { name: "value", type: "string", default: '""', desc: "Controlled input value" },
              { name: "onChange", type: "function", default: "undefined", desc: "Change handler" },
              { name: "error", type: "string", default: '""', desc: "Error message to display" },
              { name: "disabled", type: "boolean", default: "false", desc: "Disable input" },
            ],
          },
          {
            id: "input-search",
            name: "Search Input",
            cat: "forms",
            sub: "inputs",
            desc: "Search field with icon and clear button",
            tags: ["input", "search", "field", "filter"],
            props: [
              { name: "placeholder", type: "string", default: '"Search..."', desc: "Placeholder text" },
              { name: "value", type: "string", default: '""', desc: "Search query value" },
              { name: "onChange", type: "function", default: "undefined", desc: "Change handler" },
              { name: "onClear", type: "function", default: "undefined", desc: "Clear button handler" },
              { name: "onSubmit", type: "function", default: "undefined", desc: "Submit/Enter handler" },
            ],
          },
          {
            id: "input-email",
            name: "Newsletter Signup",
            cat: "forms",
            sub: "inputs",
            desc: "Email input with inline submit button",
            tags: ["input", "email", "newsletter", "signup", "subscribe"],
            props: [
              { name: "placeholder", type: "string", default: '"Enter your email"', desc: "Input placeholder" },
              { name: "buttonText", type: "string", default: '"Subscribe"', desc: "Submit button text" },
              { name: "onSubmit", type: "function", default: "undefined", desc: "Form submission handler" },
              { name: "loading", type: "boolean", default: "false", desc: "Show loading state" },
            ],
          },
        ],
      },
      {
        id: "controls",
        name: "Toggles & Controls",
        items: [
          {
            id: "toggle-switch",
            name: "Toggle Switch",
            cat: "forms",
            sub: "controls",
            desc: "On/off toggle switch with smooth animation",
            tags: ["toggle", "switch", "boolean", "control"],
            props: [
              { name: "checked", type: "boolean", default: "false", desc: "Toggle state" },
              { name: "onChange", type: "function", default: "undefined", desc: "Change handler" },
              { name: "label", type: "string", default: '""', desc: "Associated label text" },
              { name: "disabled", type: "boolean", default: "false", desc: "Disable toggle" },
            ],
          },
          {
            id: "checkbox-group",
            name: "Checkbox Group",
            cat: "forms",
            sub: "controls",
            desc: "Group of checkboxes with labels",
            tags: ["checkbox", "group", "multi-select", "form"],
            props: [
              { name: "options", type: "array", default: "[]", desc: "Array of {value, label} objects" },
              { name: "selected", type: "array", default: "[]", desc: "Array of selected values" },
              { name: "onChange", type: "function", default: "undefined", desc: "Selection change handler" },
              { name: "orientation", type: "string", default: '"vertical"', desc: '"vertical" | "horizontal"' },
            ],
          },
          {
            id: "radio-group",
            name: "Radio Group",
            cat: "forms",
            sub: "controls",
            desc: "Radio button group for single selection",
            tags: ["radio", "group", "single-select", "form"],
            props: [
              { name: "options", type: "array", default: "[]", desc: "Array of {value, label} objects" },
              { name: "selected", type: "string", default: '""', desc: "Currently selected value" },
              { name: "onChange", type: "function", default: "undefined", desc: "Selection change handler" },
              { name: "name", type: "string", default: '"radio-group"', desc: "Input name attribute" },
            ],
          },
        ],
      },
      {
        id: "wizards",
        name: "Multi-step Wizards",
        items: [
          {
            id: "wizard-steps",
            name: "Step Indicator",
            cat: "forms",
            sub: "wizards",
            desc: "Visual step progress indicator",
            tags: ["wizard", "steps", "progress", "multi-step"],
            props: [
              { name: "steps", type: "array", default: "[]", desc: "Array of step label strings" },
              { name: "currentStep", type: "number", default: "0", desc: "Current step index (0-based)" },
              { name: "onStepClick", type: "function", default: "undefined", desc: "Step click handler (optional)" },
            ],
          },
          {
            id: "wizard-form",
            name: "Multi-step Form",
            cat: "forms",
            sub: "wizards",
            desc: "Complete multi-step form with validation",
            tags: ["wizard", "form", "multi-step", "validation"],
            props: [
              { name: "steps", type: "array", default: "[]", desc: "Array of step config objects" },
              { name: "onComplete", type: "function", default: "undefined", desc: "Form completion handler" },
              { name: "validateOnNext", type: "boolean", default: "true", desc: "Validate before proceeding" },
            ],
          },
        ],
      },
    ],
  },
];

export const all = cats.flatMap((c) => c.subs.flatMap((s) => s.items));

export function search(q) {
  const lq = q.toLowerCase().trim();
  if (!lq) return [];
  return all.filter(
    (i) =>
      i.name.toLowerCase().includes(lq) ||
      i.desc.toLowerCase().includes(lq) ||
      i.tags.some((t) => t.toLowerCase().includes(lq)),
  );
}

export function getById(id) {
  return all.find((i) => i.id === id);
}
