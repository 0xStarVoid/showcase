const fs = require("fs");
const path = require("path");

const polyfillPath = path.join(
  __dirname,
  "..",
  "node_modules",
  "next",
  "dist",
  "build",
  "polyfills",
  "polyfill-module.js",
);

if (fs.existsSync(polyfillPath)) {
  fs.writeFileSync(polyfillPath, "/* modern browsers only */");
}
