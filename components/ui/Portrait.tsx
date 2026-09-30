"use client";

import { useEffect, useState } from "react";

const SIZES = {
  table: "size-10",
  card: "size-14",
  side: "size-12",
} as const;

export function portraitSrc(id: string) {
  return /^p\d{2}$/.test(id) ? `/portraits/${id}.png` : "/portraits/invited.png";
}

export function Portrait({
  id,
  name,
  size = "table",
}: {
  id: string;
  name: string;
  size?: keyof typeof SIZES;
}) {
  const [src, setSrc] = useState(() => portraitSrc(id));

  useEffect(() => {
    setSrc(portraitSrc(id));
  }, [id]);

  return (
    <img
      src={src}
      alt=""
      width={size === "card" ? 56 : size === "side" ? 48 : 40}
      height={size === "card" ? 56 : size === "side" ? 48 : 40}
      onError={() => {
        if (!src.endsWith("/invited.png")) setSrc("/portraits/invited.png");
      }}
      className={`${SIZES[size]} shrink-0 rounded-full object-cover ring-2 ring-white shadow-[0_0_0_1px_#E3EEF3]`}
    />
  );
}
