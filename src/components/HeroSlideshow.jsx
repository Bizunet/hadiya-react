import { useEffect, useRef, useState } from "react";
import { SealWatermark } from "./Seal";

const SLIDES = ["assets/hero-family.jpg", "assets/hero-crowd.jpg"];

export default function HeroSlideshow({ children }) {
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % SLIDES.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, []);

  function goTo(i) {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((j) => (j + 1) % SLIDES.length), 6000);
  }

  return (
    <section className="hero">
      <div className="hero-slides">
        {SLIDES.map((src, i) => (
          <div key={src} className={`hero-slide${i === active ? " active" : ""}`} style={{ backgroundImage: `url('${src}')` }} />
        ))}
      </div>
      <div className="hero-dots">
        {SLIDES.map((src, i) => (
          <button key={src} className={i === active ? "active" : ""} aria-label={`Show slide ${i + 1}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <SealWatermark style={{ top: -40, right: -40, "--sz": "420px", width: 420, height: 420, opacity: 0.14, zIndex: 2, animation: "rotateSlow 90s linear infinite" }} />
      <div className="wrap hero-grid">{children}</div>
    </section>
  );
}
