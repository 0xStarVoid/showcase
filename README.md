# Showcase

A React component gallery where the brand is a set of live controls. Move a
slider and every component in the catalogue re-renders: corner radius, motion,
colour and type all follow from a few variables rather than from per-component
overrides.

Live: [ui.vantive.studio](https://ui.vantive.studio)

## Status

Today this runs as a Next.js application: a gallery you browse, tune and preview.
The components are not yet published as an installable package. Extracting them
is the work in progress, and the roadmap below says what that means.

## What it does

- **33 components** across three categories: Marketing (heroes, feature grids,
  testimonials), Commerce (product cards, pricing tables, cart and checkout) and
  Forms (inputs, toggles, multi-step wizards).
- **Brand variables as controls.** Playfulness drives corner radius and motion
  intensity. Primary colour drives accents. Typography switches the pairing.
  Every component reads the same variables, so the catalogue stays coherent
  instead of drifting per component.
- **Props tables and code output** per component, generated from the catalogue
  metadata in `lib/items.js` rather than written by hand.
- **Device preview** at desktop, tablet and phone widths, and a QR code that
  opens the current configuration on a real phone.
- **Dark mode** across the whole catalogue.

## The motion shim

`lib/motion.js` is a hand-written replacement for framer-motion, aliased in
`next.config.js` so component code keeps the familiar API:

```js
config.resolve.alias["framer-motion"] = path.resolve(__dirname, "lib/motion.js");
```

It renders plain elements and applies animation values as inline styles,
restricted to transform and opacity so the compositor does the work. The
gallery therefore ships no animation dependency at all.

## Stack

| | |
|---|---|
| Framework | Next.js 14.2 (Pages Router) |
| Language | JavaScript with JSX |
| UI | React 18.2 |
| Styling | Tailwind CSS 3.4 |
| State | Zustand 5 |
| Icons | lucide-react |
| QR | qrcode.react |
| Animation | none, see the motion shim above |

## Run it

Requires Node 18 or newer.

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build && npm start
```

## Structure

```
components/
  Render.jsx       every component in the catalogue, rendered from metadata
  Controls.jsx     the brand variable panel
  Nav.jsx          category and component navigation
  Stage.jsx        the preview surface with device framing
  CodePanel.jsx    generated usage code
  PropsTable.jsx   generated props documentation
  QRModal.jsx      phone handoff
  Switcher.jsx     dark mode and device toggles
  ErrorBoundary.jsx
  ui/              the shell's own components
hooks/
  useBrand.js      the brand variable store
  useFocusTrap.js
  useReveal.js
lib/
  items.js         the component catalogue: categories, props, tags
  motion.js        the framer-motion shim
  link.js          preview link encoding
pages/
  index.jsx        landing
  playground.jsx   the gallery
  components.jsx   catalogue browser
  preview.jsx      standalone preview for the QR handoff
```

## Roadmap

1. **Split `Render.jsx`.** It is 2,000 lines holding every component in the
   catalogue. One module per component, exported individually.
2. **Publish as a package.** A build that emits consumable components, so the
   gallery becomes a demo of the library rather than the library itself.
3. **Adapters for other libraries.** Drive Material UI and other component sets
   from the same brand variables, so one set of controls themes more than one
   catalogue.
4. **Tailwind preset export.** Emit the current brand variables as a real
   `tailwind.config` preset for use in other projects.

## License

MIT. See [LICENSE](LICENSE).
