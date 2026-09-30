"use client";

import { useState } from "react";
import { CASH_SERIES, type CashPoint, type CashRange } from "@/lib/charts";
import { useWorkspace } from "@/lib/workspace-context";

type ChartRange = "live" | CashRange;

const W = 640;
const H = 228;
const PAD = { l: 46, r: 12, t: 16, b: 28 };
const Y_MIN = 16;
const Y_MAX = 20;

function xAt(index: number, count: number) {
  if (count <= 1) return PAD.l;
  return PAD.l + (index / (count - 1)) * (W - PAD.l - PAD.r);
}

function yAt(value: number, yMin: number, yMax: number) {
  return PAD.t + (1 - (value - yMin) / (yMax - yMin)) * (H - PAD.t - PAD.b);
}

export function CashChart() {
  const { liveSeries } = useWorkspace();
  const [range, setRange] = useState<ChartRange>("live");
  const [hover, setHover] = useState<number | null>(null);
  const points: CashPoint[] = range === "live" ? liveSeries : CASH_SERIES[range];
  const values = points.map((point) => point.value);
  const yMin = range === "live" ? Math.min(...values) - 0.12 : Y_MIN;
  const yMax = range === "live" ? Math.max(...values) + 0.12 : Y_MAX;
  const yTicks = range === "live" ? [yMin + (yMax - yMin) * 0.15, (yMin + yMax) / 2, yMax - (yMax - yMin) * 0.12] : [16, 18, 20];
  const line = points.map((point, index) => `${index === 0 ? "M" : "L"} ${xAt(index, points.length)} ${yAt(point.value, yMin, yMax)}`).join(" ");
  const baseline = yAt(yMin, yMin, yMax);
  const area = `${line} L ${xAt(points.length - 1, points.length)} ${baseline} L ${xAt(0, points.length)} ${baseline} Z`;
  const active = hover === null ? null : points[hover];
  const activeX = hover === null ? 0 : xAt(hover, points.length);

  function nearest(clientX: number, svg: SVGSVGElement) {
    const rect = svg.getBoundingClientRect();
    const px = ((clientX - rect.left) / rect.width) * W;
    let best = 0;
    let bestDist = Infinity;
    points.forEach((_, index) => {
      const dist = Math.abs(xAt(index, points.length) - px);
      if (dist < bestDist) {
        best = index;
        bestDist = dist;
      }
    });
    setHover(best);
  }

  return (
    <section className="rounded-2xl border border-hairline bg-white p-5 shadow-card">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-[15px] font-semibold text-ink">Cash over time</h2>
          <p className="mt-0.5 text-[13px] text-secondary">
            {range === "live" ? "Updating as cash moves on the desk" : "Northwind operating cash, USD millions"}
          </p>
        </div>
        <div role="group" aria-label="Chart range" className="flex rounded-xl bg-paper p-1">
          {(["live", "7d", "30d", "90d"] as const).map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={range === item}
              onClick={() => {
                setRange(item);
                setHover(null);
              }}
              className={`h-8 cursor-pointer rounded-lg px-3 text-[13px] font-semibold ${range === item ? "bg-white text-ink shadow-card" : "text-secondary hover:text-ink"}`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>
      <div className="relative mt-3">
        <svg
          viewBox={`0 0 ${W} ${H}`}
          className="h-[220px] w-full"
          role="img"
          aria-label={`Cash from ${points[0]?.date} to ${points[points.length - 1]?.date}`}
          onMouseMove={(event) => nearest(event.clientX, event.currentTarget)}
          onMouseLeave={() => setHover(null)}
        >
          {yTicks.map((tick) => (
            <g key={tick}>
              <line x1={PAD.l} x2={W - PAD.r} y1={yAt(tick, yMin, yMax)} y2={yAt(tick, yMin, yMax)} stroke="#E3EEF3" />
              <text x={PAD.l - 8} y={yAt(tick, yMin, yMax) + 4} textAnchor="end" fill="#5C7380" fontSize="11" fontFamily="var(--font-plex), monospace">
                {tick.toFixed(1)}m
              </text>
            </g>
          ))}
          <line x1={PAD.l} x2={W - PAD.r} y1={baseline} y2={baseline} stroke="#14343C" strokeOpacity="0.35" />
          <g key={range}>
            <path d={area} fill="#0E9B8A" fillOpacity="0.16" className="chart-area" />
            <path d={line} fill="none" stroke="#0E9B8A" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pathLength={1} className="chart-line" />
          </g>
          {points.map((point, index) => (
            <circle
              key={`${range}-${index}`}
              cx={xAt(index, points.length)}
              cy={yAt(point.value, yMin, yMax)}
              r={hover === index ? 5 : 3}
              fill={hover === index ? "#0E9B8A" : "#FFFFFF"}
              stroke="#0E9B8A"
              strokeWidth="2"
            />
          ))}
          {hover !== null ? (
            <line x1={activeX} x2={activeX} y1={PAD.t} y2={baseline} stroke="#0E9B8A" strokeDasharray="3 3" strokeOpacity="0.7" />
          ) : null}
          <rect x={PAD.l} y={PAD.t} width={W - PAD.l - PAD.r} height={H - PAD.t - PAD.b} fill="transparent" />
          {points.filter((_, index) => index === 0 || index === points.length - 1 || index === Math.floor(points.length / 2)).map((point) => {
            const index = points.indexOf(point);
            return (
              <text key={`${range}-label-${index}`} x={xAt(index, points.length)} y={H - 6} textAnchor="middle" fill="#5C7380" fontSize="11" fontFamily="var(--font-plex), monospace">
                {point.date}
              </text>
            );
          })}
        </svg>
        {active && hover !== null ? (
          <div
            className="pointer-events-none absolute z-10 rounded-xl border border-hairline bg-white px-3 py-2 shadow-card"
            style={{
              left: `${(activeX / W) * 100}%`,
              top: 8,
              transform: activeX > W * 0.72 ? "translateX(-110%)" : "translateX(8px)",
            }}
          >
            <p className="font-mono text-[11px] text-secondary">{active.date}</p>
            <p className="text-[14px] font-semibold text-ink">${active.value.toFixed(1)}m</p>
          </div>
        ) : null}
      </div>
    </section>
  );
}
