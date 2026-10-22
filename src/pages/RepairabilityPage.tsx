
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { DEFAULT_BATTERY_CAPACITY_MAH, formatPrice, getLayoutSpec } from "@/lib/catalog"
import {
  Check,
  Wrench,
  MousePointer,
  Smile,
  Box,
  PlugZap,
  Battery,
} from "lucide-react"

const swapSteps = [
  {
    title: "1. Open the case",
    description: "Use the included tool to pop the plate off and access the sockets.",
    icon: Wrench,
    bg: "bg-primary/10",
    border: "border-primary",
  },
  {
    title: "2. Remove old parts",
    description: "Gently pull out old sockets, switches, or keycaps as needed.",
    icon: MousePointer,
    bg: "bg-warning/10",
    border: "border-warning",
  },
  {
    title: "3. Insert new parts",
    description: "Drop in new sockets, switches, or keycaps. They snap in place.",
    icon: Check,
    bg: "bg-success/10",
    border: "border-success",
  },
  {
    title: "4. Test and enjoy",
    description: "Make sure everything works. Swap again anytime.",
    icon: Smile,
    bg: "bg-info/10",
    border: "border-info",
  },
]

const partInfo = [
  {
    name: "Case",
    icon: Box,
    description: `The outer shell protects the keyboard internals. Available in Aluminium (+${formatPrice(getLayoutSpec("75").aluminiumUpgrade)}) or Polycarbonate (included).`,
    swapDifficulty: "Easy",
    tools: ["Included tool"],
  },
  {
    name: "Sockets",
    icon: PlugZap,
    description: "Hot-swap sockets let you change switches without soldering. Compatible with MX-style switches.",
    swapDifficulty: "Easy",
    tools: ["Included tool"],
  },
  {
    name: "Switches",
    icon: Wrench,
    description: "Mechanical switches that type the sound you love. Choose tactile, linear, or clicky.",
    swapDifficulty: "Easy",
    tools: ["Included tool"],
  },
  {
    name: "Keycaps",
    icon: MousePointer,
    description: "Replace keycaps to change the look and feel. Cherry profile, OEM, or custom sets.",
    swapDifficulty: "Easy",
    tools: ["Fingers"],
  },
  {
    name: "Battery",
    icon: Battery,
    description: `${DEFAULT_BATTERY_CAPACITY_MAH} mAh battery provides hours of wireless use. User-replaceable when depleted.`,
    swapDifficulty: "Medium",
    tools: ["Phillips screwdriver"],
  },
]

export function RepairabilityPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 lg:w-1/2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Every part is swappable
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              Case, sockets, switches, keycaps, battery — designed to come out, so the keyboard outlives its parts.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/customize">Start a build</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 lg:w-1/2 flex items-center justify-center">
            <div className="relative">
              <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-full" />
              <div className="absolute left-2 top-2 flex items-center gap-2 rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                2 · Case
              </div>
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Preview is illustrative. Final product may vary slightly.
            </p>
          </div>
        </div>
      </section>

      {/* 3-Step Swap Process */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-12 text-center">How to swap parts</h2>
        <div className="grid grid-cols-1 divide-y divide-border md:grid-cols-3 md:divide-x md:divide-y-0">
          {swapSteps.map((step, index) => (
            <article key={step.title} className="py-5 first:pt-0 md:px-6 md:first:pl-0 md:first:pt-5">
              <div className={`flex h-10 w-10 items-center justify-center rounded-full ${step.bg} ${step.border}`}>
                <step.icon className="h-5 w-5" />
              </div>
              <p className="mt-4 font-mono text-xs text-muted-foreground">0{index + 1}</p>
              <h3 className="mt-2 font-display text-xl font-semibold">{step.title.replace(/^\d+\.\s*/, "")}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{step.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Parts table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="mb-6 font-display text-3xl font-bold tracking-tight">Replaceable parts</h2>
        <div className="divide-y divide-border border-y border-border">
          {partInfo.map((part) => (
            <article key={part.name} className="grid gap-3 py-5 sm:grid-cols-[11rem_minmax(0,1fr)_10rem] sm:items-center">
              <div className="flex items-center gap-3">
                <part.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-display font-semibold">{part.name}</h3>
                  <p className="text-xs text-muted-foreground">{part.swapDifficulty} to replace</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">{part.description}</p>
              <p className="text-xs text-muted-foreground">{part.tools.join(" · ")}</p>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-secondary px-6 py-14 text-center sm:px-10 lg:py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Repair, don't replace.
            </h2>
            <p className="text-secondary-foreground text-lg mb-6 max-w-2xl mx-auto">
              Open the case with the included tool and swap any part. No glue, no solder.
            </p>
            <Button size="lg" asChild className="h-12 px-8">
              <Link to="/customize">Start a build</Link>
            </Button>
            <Separator className="my-6" />
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/support">Need help?</Link>
              </Button>
              <Button variant="ghost" size="sm" asChild>
                <Link to="/support">Ask about repairs</Link>
              </Button>
            </div>
          </div>
      </section>
    </div>
  )
}