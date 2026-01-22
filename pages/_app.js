import "@/styles/globals.css";
import { useBrand } from "@/hooks/useBrand";
import { useEffect } from "react";

export default function App({ Component, pageProps }) {
  const dark = useBrand((s) => s.dark);

  useEffect(() => {
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);

  return <Component {...pageProps} />;
}
