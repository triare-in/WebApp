"use client"

import { cn } from "@/lib/utils"
import ansi65 from "../../../ansi-65.json"
import ansi75 from "../../../ansi-75.json"
import ansi100 from "../../../ansi-100.json"

interface KeyboardPreviewProps {
  layout: "65" | "75" | "100"
  caseColor?: string
  keycapColor?: string
  className?: string
}

const layouts = {
  "65": ansi65,
  "75": ansi75,
  "100": ansi100,
} as const

export function KeyboardPreview({ layout, caseColor = "#B9A6E8", keycapColor = "#F3EEE3", className }: KeyboardPreviewProps) {
  const keyboard = layouts[layout]
  const unit = 32
  const gap = 2
  const width = keyboard.width_u * unit
  const height = keyboard.height_u * unit
  const fillForRole: Record<string, string> = {
    alpha: keycapColor,
    mod: "var(--modifier-key, #E8E1F2)",
    accent: "var(--accent-key, #D5C8F2)",
  }

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className={cn("w-full h-auto", className)}
      role="img"
      aria-label={`${layout}% ANSI keyboard with ${keyboard.key_count} keys`}
      style={{ "--case-color": caseColor, "--key-color": keycapColor } as React.CSSProperties}
    >
      <rect
        x="1"
        y="1"
        width={width - 2}
        height={height - 2}
        rx="14"
        fill="var(--case-color)"
        stroke="var(--ring)"
        strokeWidth="3"
      />
      {keyboard.keys.map((key) => {
        const x = key.x * unit + gap / 2
        const y = key.y * unit + gap / 2
        const keyWidth = key.w * unit - gap
        const keyHeight = key.h * unit - gap
        return (
          <g key={key.id}>
            <rect
              x={x}
              y={y}
              width={keyWidth}
              height={keyHeight}
              rx="4"
              fill={fillForRole[key.role] ?? "var(--key-color)"}
              stroke="#2A2233"
              strokeOpacity="0.18"
              strokeWidth="1.5"
            />
            {key.label && (
              <text
                x={x + keyWidth / 2}
                y={y + keyHeight / 2}
                fill="#2A2233"
                fontSize={Math.min(10, keyWidth / 4)}
                textAnchor="middle"
                dominantBaseline="central"
              >
                {key.label}
              </text>
            )}
          </g>
        )
      })}
    </svg>
  )
}