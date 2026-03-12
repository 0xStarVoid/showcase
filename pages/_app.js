import "@/styles/globals.css";
import { useBrand } from "@/hooks/useBrand";
import { useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

function initReveal() {
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("revealed");
          io.unobserve(e.target);
        }
      });
    },
    { rootMargin: "0px 0px 60px 0px" },
  );
  document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => io.observe(el));
  return io;
}

export default function App({ Component, pageProps }) {
  const dark = useBrand((s) => s.dark);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
    const rid = requestIdleCallback(() => {
      const io = initReveal();
      const mo = new MutationObserver(() => initReveal());
      mo.observe(document.body, { childList: true, subtree: true });
      return () => {
        io.disconnect();
        mo.disconnect();
      };
    });
    return () => cancelIdleCallback(rid);
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
