import ansi65 from "../../ansi-65.json"
import ansi75 from "../../ansi-75.json"
import ansi100 from "../../ansi-100.json"

export type Layout = "65" | "75" | "100"

export interface LayoutSpec {
  id: Layout
  label: `${Layout}%`
  basePrice: number
  keyCount: number
  aluminiumUpgrade: number
  linearSwitchUpgrade: number
}

export const KEYBOARD_LAYOUTS = {
  "65": ansi65,
  "75": ansi75,
  "100": ansi100,
} as const

export const LAYOUTS: LayoutSpec[] = [
  { id: "65", label: "65%", basePrice: 6_499, keyCount: KEYBOARD_LAYOUTS["65"].key_count, aluminiumUpgrade: 2_400, linearSwitchUpgrade: 2_500 },
  { id: "75", label: "75%", basePrice: 9_999, keyCount: KEYBOARD_LAYOUTS["75"].key_count, aluminiumUpgrade: 2_400, linearSwitchUpgrade: 2_500 },
  { id: "100", label: "100%", basePrice: 10_499, keyCount: KEYBOARD_LAYOUTS["100"].key_count, aluminiumUpgrade: 2_400, linearSwitchUpgrade: 2_500 },
]

export const CASE_COLORS = [
  { label: "Lilac", color: "#B9A6E8" },
  { label: "Sakura", color: "#F4C9DA" },
  { label: "Graphite", color: "#3B3744" },
  { label: "Ivory", color: "#F3EEE3" },
] as const

export const DEFAULT_BATTERY_CAPACITY_MAH = 2_000
export const SHIPPING_FEE = 150

export const KEYBOARD_PRESETS = [
  {
    id: "lilac-aluminium-75",
    name: "75% Lilac Aluminium",
    layout: "75",
    case: "Aluminium",
    switch: "Linear",
    caseColor: "#B9A6E8",
    keycapColor: "#F3EEE3",
    badge: "Best seller",
  },
  {
    id: "sakura-polycarbonate-65",
    name: "65% Sakura Polycarbonate",
    layout: "65",
    case: "Polycarbonate",
    switch: "Linear",
    caseColor: "#F4C9DA",
    keycapColor: "#F3EEE3",
  },
  {
    id: "ivory-polycarbonate-100",
    name: "100% Ivory Polycarbonate",
    layout: "100",
    case: "Polycarbonate",
    switch: "Linear",
    caseColor: "#F3EEE3",
    keycapColor: "#B9A6E8",
  },
] as const satisfies readonly {
  id: string
  name: string
  layout: Layout
  case: "Aluminium" | "Polycarbonate"
  switch: "Linear"
  caseColor: string
  keycapColor: string
  badge?: string
}[]

export function getLayoutSpec(layout: Layout): LayoutSpec {
  const spec = LAYOUTS.find((item) => item.id === layout)
  if (!spec) throw new Error(`Unsupported keyboard layout: ${layout}`)
  return spec
}

export function getPresetPrice(layout: Layout, caseType: "Aluminium" | "Polycarbonate"): number {
  const spec = getLayoutSpec(layout)
  return spec.basePrice
    + (caseType === "Aluminium" ? spec.aluminiumUpgrade : 0)
    + spec.linearSwitchUpgrade
}

export function formatPrice(price: number): string {
  return `₹${new Intl.NumberFormat("en-IN").format(price)}`
}
