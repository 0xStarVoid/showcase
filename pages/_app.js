import "@/styles/globals.css";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    let unsub;
    import("@/hooks/useBrand").then(({ useBrand }) => {
      const sync = (s) => {
        if (s.dark) document.documentElement.classList.add("dark");
        else document.documentElement.classList.remove("dark");
      };
      sync(useBrand.getState());
      unsub = useBrand.subscribe(sync);
    });
    return () => unsub?.();
  }, []);

  return <Component {...pageProps} />;
}
