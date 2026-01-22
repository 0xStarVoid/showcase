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
          },
          {
            id: "hero-split",
            name: "Split Hero",
            cat: "marketing",
            sub: "heroes",
            desc: "Hero with content on left and image/illustration on right",
            tags: ["hero", "split", "image", "landing"],
          },
          {
            id: "hero-gradient",
            name: "Gradient Hero",
            cat: "marketing",
            sub: "heroes",
            desc: "Bold gradient background hero with animated elements",
            tags: ["hero", "gradient", "animated", "bold"],
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
          },
          {
            id: "feature-bento",
            name: "Bento Grid",
            cat: "marketing",
            sub: "features",
            desc: "Modern bento-style feature layout",
            tags: ["features", "bento", "modern", "grid"],
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
          },
          {
            id: "testimonial-carousel",
            name: "Testimonial Carousel",
            cat: "marketing",
            sub: "testimonials",
            desc: "Sliding carousel of customer testimonials",
            tags: ["testimonial", "carousel", "slider", "reviews"],
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
          },
          {
            id: "product-card-detailed",
            name: "Detailed Product Card",
            cat: "commerce",
            sub: "products",
            desc: "Product card with ratings, badges, and quick actions",
            tags: ["product", "card", "detailed", "ratings"],
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
          },
          {
            id: "pricing-table",
            name: "Pricing Comparison",
            cat: "commerce",
            sub: "pricing",
            desc: "Full pricing table comparing multiple tiers",
            tags: ["pricing", "table", "comparison", "plans"],
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
          },
          {
            id: "cart-item",
            name: "Cart Item Row",
            cat: "commerce",
            sub: "cart",
            desc: "Individual cart line item with quantity controls",
            tags: ["cart", "item", "quantity", "line item"],
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
          },
          {
            id: "input-search",
            name: "Search Input",
            cat: "forms",
            sub: "inputs",
            desc: "Search field with icon and clear button",
            tags: ["input", "search", "field", "filter"],
          },
          {
            id: "input-email",
            name: "Newsletter Signup",
            cat: "forms",
            sub: "inputs",
            desc: "Email input with inline submit button",
            tags: ["input", "email", "newsletter", "signup", "subscribe"],
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
          },
          {
            id: "checkbox-group",
            name: "Checkbox Group",
            cat: "forms",
            sub: "controls",
            desc: "Group of checkboxes with labels",
            tags: ["checkbox", "group", "multi-select", "form"],
          },
          {
            id: "radio-group",
            name: "Radio Group",
            cat: "forms",
            sub: "controls",
            desc: "Radio button group for single selection",
            tags: ["radio", "group", "single-select", "form"],
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
          },
          {
            id: "wizard-form",
            name: "Multi-step Form",
            cat: "forms",
            sub: "wizards",
            desc: "Complete multi-step form with validation",
            tags: ["wizard", "form", "multi-step", "validation"],
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
