"use client";

import { useEffect, useRef, useState } from "react";

export function useCountUp(target: number, duration = 800) {
  const fromRef = useRef(0);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      fromRef.current = target;
      setValue(target);
      return;
    }

    const from = fromRef.current;
    const start = performance.now();
    let frame = 0;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - (1 - t) ** 3;
      const next = from + (target - from) * eased;
      setValue(next);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        fromRef.current = target;
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target, duration]);

  return value;
}

export function CountUp({
  value,
  format,
}: {
  value: number;
  format?: (n: number) => string;
}) {
  const current = useCountUp(value);
  return <>{format ? format(current) : Math.round(current).toString()}</>;
}
