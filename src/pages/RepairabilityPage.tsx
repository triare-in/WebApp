"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import { Separator } from "@/components/ui/separator"
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
    description: "The outer shell protects the keyboard internals. Available in Aluminium (+₹2,400) or Polycarbonate (included).",
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
    description: "5000 mAh battery provides hours of wireless use. User-replaceable when depleted.",
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
              <svg viewBox="0 0 520 190" className="w-full rounded-2xl overflow-hidden">
                <rect x="3" y="3" width="514" height="184" rx="14" fill="#F1EDF8" />
                <use href="#KK75" fill="#F3EEE3" stroke="#2A2233" strokeOpacity="0.18" strokeWidth="2" />
              </svg>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {swapSteps.map((step, index) => (
            <Card key={index} className="flex flex-col h-full p-6">
              <CardContent className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-12 h-12 rounded-full ${step.bg} ${step.border} flex items-center justify-center shrink-0`}>
                    <step.icon className="h-6 w-6" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground capitalize-first">{index + 1}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-2">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Parts table */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Replaceable parts</h2>
            <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
              {partInfo.map((part, index) => (
                <Card key={index} className="flex flex-col h-full p-4">
                  <CardContent className="flex flex-col h-full">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex h-8 w-8 items-center justify-center rounded bg-muted shrink-0">
                        <part.icon className="h-4 w-4" />
                      </span>
                      <div>
                        <h3 className="font-display font-medium">{part.name}</h3>
                        <p className="text-xs text-muted-foreground capitalize-first">{part.swapDifficulty}</p>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground flex-1 line-clamp-2">{part.description}</p>
                    <div className="mt-3 pt-3 border-t border-border">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="flex h-4 w-4 items-center justify-center rounded bg-muted shrink-0">
                          {part.tools.map((_, i) => (
                            <Wrench key={i} className="h-3 w-3" />
                          ))}
                        </span>
                        {part.tools.map((t) => (
                          <span key={t} className="ml-1 text-[10px] opacity-60">{t}</span>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </Grid>
          </CardContent>
        </Card>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-secondary overflow-hidden">
          <CardContent className="p-8 lg:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Repair, don't replace.
            </h2>
            <p className="text-secondary-foreground text-lg mb-6 max-w-2xl mx-auto">
              Open the case with the included tool and swap any part. No glue, no solder.
            </p>
            <Button variant="secondary" size="lg" asChild className="h-12 px-8">
              <Link to="/customize">Start a build</Link>
            </Button>
            <Separator className="my-6" />
            <div className="flex flex-col sm:flex-row gap-2 justify-center">
              <Button variant="ghost" size="sm" onClick={() => window.alert("Need help? Contact support")}>
                Need help?
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.alert("Repair guide coming soon")}>
                Repair guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}