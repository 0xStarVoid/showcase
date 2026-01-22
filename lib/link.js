export function encode(c) {
  return new URLSearchParams({
    c: c.id,
    bc: c.color.replace("#", ""),
    p: c.play.toString(),
    f: c.font,
    d: c.dark ? "1" : "0",
  }).toString();
}

export function decode(s) {
  try {
    const p = new URLSearchParams(s);
    return {
      id: p.get("c") || "pricing-card",
      color: `#${p.get("bc") || "2563eb"}`,
      play: parseFloat(p.get("p") || "0.5"),
      font: p.get("f") || "modern",
      dark: p.get("d") === "1",
    };
  } catch {
    return null;
  }
}

export function genUrl(base, c) {
  return `${base}/preview?${encode(c)}`;
}

export function genId() {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let r = "";
  for (let i = 0; i < 8; i++) r += chars.charAt(Math.floor(Math.random() * chars.length));
  return r;
}
