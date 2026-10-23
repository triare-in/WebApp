import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"
import { CASE_COLORS, KEYBOARD_LAYOUTS, type Layout } from "@/lib/catalog"

interface KeyboardPreviewProps {
  layout: Layout
  caseColor?: string
  keycapColor?: string
  caseName?: string
  keycapName?: string
  className?: string
}

function parseHex(hex: string): [number, number, number] {
  const value = hex.replace("#", "")
  if (!/^(?:[\da-f]{3}|[\da-f]{6})$/i.test(value)) {
    throw new Error(`Invalid product color: ${hex}`)
  }
  const normalized = value.length === 3
    ? value.split("").map((digit) => `${digit}${digit}`).join("")
    : value
  return [
    Number.parseInt(normalized.slice(0, 2), 16),
    Number.parseInt(normalized.slice(2, 4), 16),
    Number.parseInt(normalized.slice(4, 6), 16),
  ]
}

function relativeLuminance(hex: string) {
  const channels = parseHex(hex).map((channel) => {
    const value = channel / 255
    return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4
  })
  return channels[0] * 0.2126 + channels[1] * 0.7152 + channels[2] * 0.0722
}

function contrastRatio(first: number, second: number) {
  const lighter = Math.max(first, second)
  const darker = Math.min(first, second)
  return (lighter + 0.05) / (darker + 0.05)
}

function legendColor(fillHex: string) {
  const fillLuminance = relativeLuminance(fillHex)
  const darkContrast = contrastRatio(fillLuminance, relativeLuminance("#2A2233"))
  const lightContrast = contrastRatio(fillLuminance, 1)
  return darkContrast >= lightContrast ? "#2A2233" : "#FFFFFF"
}

function shade(hex: string, amount: number) {
  const channels = parseHex(hex)
  const adjusted = channels.map((channel) => {
    const target = amount > 0 ? 255 : 0
    return Math.round(channel + (target - channel) * Math.abs(amount))
  })
  return `#${adjusted.map((channel) => channel.toString(16).padStart(2, "0")).join("")}`
}

export function KeyboardPreview({
  layout,
  caseColor = "#B9A6E8",
  keycapColor = "#F3EEE3",
  caseName,
  keycapName,
  className,
}: KeyboardPreviewProps) {
  const keyboard = KEYBOARD_LAYOUTS[layout]
  const svgRef = useRef<SVGSVGElement>(null)
  const [renderedWidth, setRenderedWidth] = useState(0)
  const unit = 32
  const gap = 2
  const inset = 12
  const width = keyboard.width_u * unit + inset * 2
  const height = keyboard.height_u * unit + inset * 2
  const caseLabel = caseName ?? CASE_COLORS.find((item) => item.color.toLowerCase() === caseColor.toLowerCase())?.label ?? "Custom"
  const keycapLabel = keycapName ?? CASE_COLORS.find((item) => item.color.toLowerCase() === keycapColor.toLowerCase())?.label ?? "Custom"
  const smallestLegendSize = Math.min(
    ...keyboard.keys
      .filter((key) => key.label)
      .map((key) => Math.min(10, (key.w * unit - gap) / 3.2)),
  )
  const legendScale = renderedWidth / width
  const showLegends = renderedWidth > 0
    && 10 * legendScale >= 8
    && smallestLegendSize * legendScale >= 8
  const modColor = relativeLuminance(keycapColor) < 0.18
    ? shade(keycapColor, 0.08)
    : shade(keycapColor, -0.08)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    const observer = new ResizeObserver(([entry]) => {
      setRenderedWidth(entry.contentRect.width)
    })
    observer.observe(svg)
    return () => observer.disconnect()
  }, [width])

  const keys = keyboard.keys.map((key) => {
    const x = key.x * unit + inset + gap / 2
    const y = key.y * unit + inset + gap / 2
    const keyWidth = key.w * unit - gap
    const keyHeight = key.h * unit - gap
    const fill = key.role === "accent" ? caseColor : key.role === "mod" ? modColor : keycapColor
    return { key, x, y, keyWidth, keyHeight, fill }
  })

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${width} ${height}`}
      className={cn("h-auto w-full", className)}
      role="img"
      aria-label={`${layout}% ANSI keyboard, ${caseLabel} case, ${keycapLabel} keycaps, ${keyboard.key_count} keys`}
      style={{
        "--part-case": caseColor,
        "--part-keys": keycapColor,
        "--part-legend": "#2A2233",
        "--part-outline": "#2A2233",
      } as React.CSSProperties}
    >
      <g data-part="case">
        <rect
          x="1"
          y="1"
          width={width - 2}
          height={height - 2}
          rx="14"
          fill="var(--part-case)"
          stroke="var(--part-outline)"
          strokeOpacity="0.28"
          strokeWidth="3"
        />
      </g>
      <g data-part="keys">
        {keys.map(({ key, x, y, keyWidth, keyHeight, fill }) => (
          <rect
            key={key.id}
            x={x}
            y={y}
            width={keyWidth}
            height={keyHeight}
            rx="4"
            fill={fill}
            stroke="var(--part-outline)"
            strokeOpacity="0.18"
            strokeWidth="1.5"
          />
        ))}
      </g>
      {/* DESIGN.md recommends 12px; keep the smallest rendered legend at least 8px. */}
      {showLegends && (
        <g data-part="legends">
          {keys.map(({ key, x, y, keyWidth, keyHeight, fill }) => key.label && (
            <text
              key={key.id}
              x={x + keyWidth / 2}
              y={y + keyHeight / 2}
              fill={legendColor(fill)}
              fontSize={Math.min(10, keyWidth / 3.2)}
              textAnchor="middle"
              dominantBaseline="central"
            >
              {key.label}
            </text>
          ))}
        </g>
      )}
    </svg>
  )
}
