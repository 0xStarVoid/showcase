# Showcase

A sophisticated Component Showcase / Design System built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Component Library**: Browse through a curated collection of UI components organized by category
- **Live Customization**: Adjust brand DNA variables (color, playfulness, typography) and watch components morph in real-time
- **Responsive Preview**: Toggle between desktop, tablet, and mobile views with smooth animations
- **Dark Mode**: Full dark mode support for all components
- **Export to Reality**: Generate QR codes for real-device preview

## Tech Stack

- **Framework**: Next.js 15 with Pages Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **QR Code**: qrcode.react

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
cd showcase
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Build

```bash
npm run build
npm start
```

## Project Structure

```
showcase/
├── components/           # React components
│   ├── BrandDNAControls.tsx    # Brand customization panel
│   ├── ComponentRenderer.tsx   # Dynamic component renderer
│   ├── ComponentStage.tsx      # Component display area
│   ├── ContextSwitcher.tsx     # Dark mode & device toggles
│   ├── QRCodeModal.tsx         # QR code generation modal
│   └── Sidebar.tsx             # Navigation sidebar
├── hooks/
│   └── useBrandDNA.ts    # Zustand store for brand settings
├── lib/
│   ├── components.ts     # Component metadata & search
│   └── previewLink.ts    # Preview URL utilities
├── pages/
│   ├── _app.tsx          # App wrapper
│   ├── _document.tsx     # Document setup
│   ├── index.tsx         # Landing page
│   ├── playground.tsx    # Main playground
│   ├── preview.tsx       # Standalone preview
│   └── api/
│       └── preview.ts    # Preview API endpoint
└── styles/
    └── globals.css       # Global styles & Tailwind
```

## Component Categories

### Marketing

- Hero Sections (Centered, Split, Gradient)
- Feature Grids (Icon Grid, Bento)
- Testimonials (Card, Carousel)

### Commerce

- Product Cards (Minimal, Detailed)
- Pricing Tables (Card, Comparison)
- Cart & Checkout (Drawer, Item Row)

### Forms

- Input Fields (Text, Search, Newsletter)
- Toggles & Controls (Switch, Checkbox, Radio)
- Multi-step Wizards (Steps, Form)

## Brand DNA Variables

- **Playfulness** (0-1): Controls corner radius, animation intensity, and visual style
- **Primary Color**: Main brand color applied to buttons, accents, and highlights
- **Typography**: Modern Sans or Classic Serif font pairing

## License

MIT
