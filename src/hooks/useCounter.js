import { useEffect, useState } from "react";

/**
 * Animates from 0 up to the numeric part of `target` (e.g. "41,000+" or "8+")
 * once `active` becomes true. Returns the formatted display string.
 */
export function useCounter(target, active, duration = 1200) {
  const [display, setDisplay] = useState(() => {
    const match = String(target).match(/^(\D*)([\d,]+)(\D*)$/);
    return match ? `${match[1]}0${match[3]}` : target;
  });

  useEffect(() => {
    if (!active) return;
    const match = String(target).match(/^(\D*)([\d,]+)(\D*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }
    const prefix = match[1];
    const suffix = match[3];
    const finalNum = parseInt(match[2].replace(/,/g, ""), 10);
    let startTime = null;
    let raf;

    function step(ts) {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const val = Math.floor(finalNum * eased);
      setDisplay(prefix + val.toLocaleString() + suffix);
      if (progress < 1) raf = requestAnimationFrame(step);
      else setDisplay(prefix + finalNum.toLocaleString() + suffix);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, duration]);

  return display;
}
