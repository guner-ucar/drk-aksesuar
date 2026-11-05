import { useEffect, useId, useRef } from "react";

// DRK logosu: harfler, ortadaki yatay çizgi ve iki kırmızı uç. Çizgi markanın
// "uçtan uca" mesajını taşır: kaydırdıkça soldaki kırmızı uçtan çıkan sinyal
// çizgi boyunca ilerler ve sayfa sonunda sağdaki kırmızı uca bağlanır.
// Yalnızca küçük bir SVG'nin transform/opacity değerleri değişir; düzen hesabı yok.

const LETTERS = ['m29.86 3.43v12.18c0 3.51 1.29 6 3.26 7.65 1.54 1.26 3.56 2.08 5.18 2.3v0.15h-8.41v4.25h8.37v1.74c0 1.05-0.28 1.84-0.84 2.23l-7.52 5.65v5.93l8.28-6.28c0 4.04 2.4 6.61 5.64 6.61 3.63 0 6.22-2.79 6.22-6.46v-15l-4.89 3.71 0.27 10.87c0.05 1.64-0.82 2.35-1.86 2.35-1.09-0.05-1.84-0.62-1.84-1.88v-13.2c2.01-0.99 4.13-2.15 5.53-3.38 1.87-1.67 2.91-4.35 2.91-7.24v-12.18h-20.3zm4.3 4.22h11.7c0.07 3.21 0.03 6.56-0.18 9.08-0.1 2.07-2.43 3.43-3.99 3.82h-3.35c-1.71-0.52-3.69-1.87-3.86-3.88-0.27-3.06-0.35-6.24-0.32-9.02z', 'm38.34 41.12v6.26h-8.45v4.23h8.33v1.7l-8.22 8.37v7.29l9.98-11.16 10.03 11.16v-7.1l-8.15-8.56-0.03-1.7h8.32v-4.23h-8.47l0.06-1.93c-1.82-0.7-3.04-2.35-3.4-4.33z', 'm38.27 53.26-8.27 8.42v7.26l9.98-11.13 10.02 11.13v-7.07l-8.17-8.59-3.56-0.02z'];
const LEFT_LINE = "m38.36 9.49v25.77l3.35 1.59v-27.36h-3.35z";
const RIGHT_LINE = "m38.36 57.71v18.86h3.33v-18.86l-1.71-0.2-1.62 0.2z";

// Döndürülmüş (yatay) koordinatlarda çizgi: sol kırmızı ucun bittiği yerden
// sağ kırmızı ucun başladığı yere.
const TRACK_X = 14.63;
const TRACK_Y = 38.31;
const TRACK_W = 56.03;
const TRACK_H = 3.33;
const END_X = 70.66;
const END_W = 5.9;

export default function DrkLogo({ tone = "light", mode = "static" }) {
  const ref = useRef(null);
  const uid = useId().replace(/:/g, "");

  useEffect(() => {
    const el = ref.current;
    if (!el || mode === "static") return undefined;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return undefined;

    if (mode === "scroll") {
      let frame = 0;
      const update = () => {
        frame = 0;
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
        el.style.setProperty("--p", p.toFixed(4));
        el.style.setProperty("--head", p > 0.004 && p < 0.985 ? "1" : "0");
        if (p >= 0.985) el.setAttribute("data-connected", "");
        else el.removeAttribute("data-connected");
      };
      const onScroll = () => {
        if (!frame) frame = window.requestAnimationFrame(update);
      };
      update();
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", onScroll);
      // Sayfa değişince yükseklik değişir; sinyal hemen yeni orana geçsin.
      const resize = typeof ResizeObserver === "function" ? new ResizeObserver(onScroll) : null;
      resize?.observe(document.body);
      // İlk açılışta sinyal bir kez uçtan uca koşar (oturum başına bir kez).
      let introTimer = 0;
      let seen = false;
      try { seen = window.sessionStorage.getItem("drk-logo-intro") === "1"; } catch { /* depolama kapalı */ }
      if (!seen && window.scrollY < 8) {
        el.classList.add("is-intro");
        introTimer = window.setTimeout(() => el.classList.remove("is-intro"), 1900);
        try { window.sessionStorage.setItem("drk-logo-intro", "1"); } catch { /* yok say */ }
      }
      return () => {
        if (frame) window.cancelAnimationFrame(frame);
        window.clearTimeout(introTimer);
        window.removeEventListener("scroll", onScroll);
        window.removeEventListener("resize", onScroll);
        resize?.disconnect();
      };
    }

    // "reveal": logo ekrana girince bağlantı bir kez kurulur.
    let timer = 0;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        el.classList.add("is-intro");
        timer = window.setTimeout(() => el.classList.remove("is-intro"), 1900);
        observer.disconnect();
      },
      { threshold: 0.8 },
    );
    observer.observe(el);
    return () => {
      observer.disconnect();
      window.clearTimeout(timer);
    };
  }, [mode]);

  const ink = tone === "dark" ? "#1f2345" : "#ffffff";
  return (
    <svg
      ref={ref}
      className={`drk-logo drk-logo--${mode} drk-logo--${tone}`}
      viewBox="2.6 29 74.8 21.95"
      preserveAspectRatio="xMinYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id={`${uid}-trail`} x1="0" x2="1" y1="0" y2="0">
          <stop offset="0" stopColor="#b5151a" />
          <stop offset="0.82" stopColor="#e2262b" />
          <stop offset="1" stopColor="#ff5a5e" />
        </linearGradient>
        <radialGradient id={`${uid}-head`} cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="0.35" stopColor="#ffd2d3" stopOpacity="0.95" />
          <stop offset="0.7" stopColor="#ff3b40" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ff3b40" stopOpacity="0" />
        </radialGradient>
      </defs>
      <g transform="rotate(-90 40 40)">
        {LETTERS.map((d, i) => <path key={i} d={d} fill={ink} />)}
        <path d={RIGHT_LINE} fill={ink} />
        <path d={LEFT_LINE} fill={ink} />
        <rect x="38.36" y="70.66" width="3.332" height="5.897" fill="#D61F23" />
        <rect x="38.36" y="9.494" width="3.332" height="5.135" fill="#CE1D21" />
      </g>
      {mode !== "static" && (
        <g className="drk-logo__signal">
          <rect className="drk-logo__trail" x={TRACK_X} y={TRACK_Y} width={TRACK_W} height={TRACK_H} fill={`url(#${uid}-trail)`} />
          <rect className="drk-logo__end" x={END_X} y={TRACK_Y} width={END_W} height={TRACK_H} fill="#ff4247" />
          <ellipse className="drk-logo__head" cx={TRACK_X} cy={TRACK_Y + TRACK_H / 2} rx="3.6" ry="3.1" fill={`url(#${uid}-head)`} />
        </g>
      )}
    </svg>
  );
}
