import { useEffect, useRef, useState } from "react";
import { SealWatermark } from "./Seal";

const FALLBACK_SLIDES = [
  { id: "family", imagePath: "assets/hero-family.jpg" },
  { id: "crowd", imagePath: "assets/hero-crowd.jpg" },
];

export default function HeroSlideshow({ children }) {
  const [slides, setSlides] = useState(FALLBACK_SLIDES);
  const [active, setActive] = useState(0);
  const timerRef = useRef(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL || "http://localhost:3000"}/api/slides`)
      .then((response) => {
        if (!response.ok) throw new Error("Unable to load slides");
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data) && data.length) {
          setSlides(data);
          setActive(0);
        }
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setActive((i) => (i + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [slides.length]);

  function goTo(i) {
    setActive(i);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setActive((j) => (j + 1) % slides.length), 6000);
  }

  return (
    <section className="hero">
      <div className="hero-slides">
        {slides.map((slide, i) => (
          <div key={slide.id || slide.imagePath || i} className={`hero-slide${i === active ? " active" : ""}`} style={{ backgroundImage: `url('${slide.imageUrl || slide.photo || slide.imagePath}')` }} />
        ))}
      </div>
      <div className="hero-dots">
        {slides.map((slide, i) => (
          <button key={slide.id || slide.imagePath || i} className={i === active ? "active" : ""} aria-label={`Show slide ${i + 1}`} onClick={() => goTo(i)} />
        ))}
      </div>
      <SealWatermark style={{ top: -40, right: -40, "--sz": "420px", width: 420, height: 420, opacity: 0.14, zIndex: 2, animation: "rotateSlow 90s linear infinite" }} />
      <div className="wrap hero-grid">{children}</div>
    </section>
  );
}
