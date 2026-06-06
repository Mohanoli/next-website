'use client';

import { DonutChartProps } from "@/lib/types/GlobalTypes";
import { useEffect, useRef, useState } from "react";

function describeArc(
  cx: number,
  cy: number,
  outerR: number,
  innerR: number,
  startAngle: number,
  endAngle: number
): string {
  const toRad = (deg: number) => ((deg - 90) * Math.PI) / 180;
  const s = toRad(startAngle);
  const e = toRad(endAngle);
  const largeArc = endAngle - startAngle > 180 ? 1 : 0;

  const x1 = cx + outerR * Math.cos(s);
  const y1 = cy + outerR * Math.sin(s);
  const x2 = cx + outerR * Math.cos(e);
  const y2 = cy + outerR * Math.sin(e);
  const x3 = cx + innerR * Math.cos(e);
  const y3 = cy + innerR * Math.sin(e);
  const x4 = cx + innerR * Math.cos(s);
  const y4 = cy + innerR * Math.sin(s);

  return `M ${x1} ${y1}
          A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
          L ${x3} ${y3}
          A ${innerR} ${innerR} 0 ${largeArc} 0 ${x4} ${y4}
          Z`;
}

export function DonutChart({
  primary,
  secondary,
  gap = 0,
  outerRadius = 148,
  innerRadius = 69,
  size = 300,
}: DonutChartProps) {
  const total = primary.value + secondary.value;
  if (!total) return null;

  const cx = size / 2;
  const cy = size / 2;

  // 🎯 Animated states
  const [animatedOuter, setAnimatedOuter] = useState(outerRadius);
  const [animatedInner, setAnimatedInner] = useState(innerRadius);
  const [animatedDeg, setAnimatedDeg] = useState(0);

  const animationRef = useRef<number | undefined>(undefined);

  const targetDeg = (primary.value / total) * 360;

  useEffect(() => {
    let debounce: NodeJS.Timeout;

    debounce = setTimeout(() => {
      const startTime = performance.now();

      const startOuter = animatedOuter;
      const startInner = animatedInner;
      const startDeg = animatedDeg;

      const duration = 1200;

      const animate = (time: number) => {
        const elapsed = time - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // 🔥 Smooth easing
        const ease =
          progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        // Animate radius
        setAnimatedOuter(startOuter + (outerRadius - startOuter) * ease);
        setAnimatedInner(startInner + (innerRadius - startInner) * ease);

        // 🎯 Animate angle (KEY IMPROVEMENT)
        setAnimatedDeg(startDeg + (targetDeg - startDeg) * ease);

        if (progress < 1) {
          animationRef.current = requestAnimationFrame(animate);
        }
      };

      animationRef.current = requestAnimationFrame(animate);
    }, 250); // debounce

    return () => {
      clearTimeout(debounce);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [primary.value, secondary.value, outerRadius, innerRadius]);

  const primaryEnd = Math.max(animatedDeg - gap, 1);
  const secondaryStart = animatedDeg + gap;

  const pct = animatedDeg / 360;

  return (
    <div className="flex flex-col items-center gap-4">
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="drop-shadow-lg"
      >
        {/* Primary */}
        <path
          d={describeArc(cx, cy, animatedOuter, animatedInner, 0, primaryEnd)}
          fill={primary.color}
          style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}
        />

        {/* Secondary */}
        {secondary.value > 0 && (
          <path
            d={describeArc(cx, cy, animatedOuter, animatedInner, secondaryStart, 360)}
            fill={secondary.color}
            style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))' }}
          />
        )}

        {/* Center Text */}
        <text x={cx} y={cy - 8} textAnchor="middle" fill="#6b7280" fontSize="11" fontWeight="600">
          Total
        </text>
        <text x={cx} y={cy + 8} textAnchor="middle" fill="#1f2937" fontSize="13" fontWeight="700">
          {(pct * 100).toFixed(1)}%
        </text>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="#9ca3af" fontSize="9">
          {primary.label}
        </text>
      </svg>

      {/* Legend */}
      <div className="flex items-center gap-6">
        {[secondary, primary].map(seg => (
          <span key={seg.label} className="flex items-center gap-2">
            <span
              className="inline-block w-3 h-3 rounded-sm"
              style={{ backgroundColor: seg.color }}
            />
            <span className="text-gray-600 text-xs font-medium">{seg.label}</span>
          </span>
        ))}
      </div>
    </div>
  );
}