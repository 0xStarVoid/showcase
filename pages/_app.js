import "@/styles/globals.css";
import { useBrand } from "@/hooks/useBrand";
import { useEffect } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";

export default function App({ Component, pageProps }) {
  const dark = useBrand((s) => s.dark);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  useEffect(() => {
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

    const scan = () =>
      document.querySelectorAll("[data-reveal]:not(.revealed)").forEach((el) => io.observe(el));

    const idle = window.requestIdleCallback || ((cb) => setTimeout(cb, 1));
    let pending = idle(scan);

    const mo = new MutationObserver(() => {
      (window.cancelIdleCallback || clearTimeout)(pending);
      pending = idle(scan);
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      (window.cancelIdleCallback || clearTimeout)(pending);
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return (
    <ErrorBoundary>
      <Component {...pageProps} />
    </ErrorBoundary>
  );
}
