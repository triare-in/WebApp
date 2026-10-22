
import { cn } from "@/lib/utils"
import { KEYBOARD_LAYOUTS, type Layout } from "@/lib/catalog"

interface KeyboardPreviewProps {
  layout: Layout
  caseColor?: string
  keycapColor?: string
  className?: string
}

export function KeyboardPreview({ layout, caseColor = "#B9A6E8", keycapColor = "#F3EEE3", className }: KeyboardPreviewProps) {
  const keyboard = KEYBOARD_LAYOUTS[layout]
  const unit = 32
  const gap = 2
  const inset = 12
  const width = keyboard.width_u * unit + inset * 2
  const height = keyboard.height_u * unit + inset * 2
  const fillForRole: Record<string, string> = {
    alpha: keycapColor,
    mod: "var(--secondary)",
    accent: "var(--primary)",
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
        const x = key.x * unit + inset + gap / 2
        const y = key.y * unit + inset + gap / 2
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
                fill={key.role === "accent" ? "var(--primary-foreground)" : "var(--foreground)"}
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