"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import {
  MousePointer,
  Box,
  Truck,
  Wrench,
  Star,
  ChevronRight,
} from "lucide-react"

const features = [
  {
    icon: MousePointer,
    step: "Step 1",
    title: "Configure your build",
    description: "Pick a layout, case, switches and keycaps. The price updates as you go.",
  },
  {
    icon: Box,
    step: "Step 2",
    title: "We build and test it",
    description: "Assembled and tested key by key in India, then shipped to your door.",
  },
  {
    icon: Wrench,
    step: "Step 3",
    title: "You repair it when you need to",
    description: "Open the case with the included tool and swap any part. No glue, no solder.",
  },
]

const popularBuilds = [
  {
    name: "75% Lilac Aluminium",
    subtitle: "84 keys · aluminium case",
    price: "₹12,499",
    caseColor: "#B9A6E8",
    keycapColor: "#F3EEE3",
    layout: "75",
    badge: "Best seller",
  },
  {
    name: "65% Sakura Polycarbonate",
    subtitle: "78 keys · polycarbonate case",
    price: "₹8,999",
    caseColor: "#F4C9DA",
    keycapColor: "#F3EEE3",
    layout: "65",
  },
  {
    name: "100% Ivory Polycarbonate",
    subtitle: "100 keys · polycarbonate case",
    price: "₹12,999",
    caseColor: "#F3EEE3",
    keycapColor: "#B9A6E8",
    layout: "100",
  },
]

const repairabilityParts = [
  { name: "Case", icon: <Box className="h-5 w-5" /> },
  { name: "Sockets", icon: <MousePointer className="h-5 w-5" /> },
  { name: "Switches", icon: <Wrench className="h-5 w-5" /> },
  { name: "Keycaps", icon: <Star className="h-5 w-5" /> },
  { name: "Battery", icon: <Truck className="h-5 w-5" /> },
]

const firmwareFeatures = [
  "Bluetooth 5.2 · pairs with 3 devices",
  "Remap any key, any layer, no software to install",
  "Firmware updates over USB-C",
]

export function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          <div className="flex-1 flex flex-col gap-4 text-center lg:text-left">
            <span className="text-sm font-medium text-muted-foreground">Wireless · hot-swap · repairable</span>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight">
              Keyboards you can fix yourself.
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto lg:mx-0">
              Built to order in India from parts you can swap. No glue, no soldering, no e-waste.
            </p>
            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" asChild className="w-full sm:w-auto h-12 px-8">
                <Link to="/customize">Start a build</Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="w-full sm:w-auto h-12 px-8">
                <Link to="/keyboards">Browse presets</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 rounded-2xl bg-muted p-8">
            <div className="relative">
              <KeyboardPreview
                layout="75"
                caseColor="#B9A6E8"
                keycapColor="#F3EEE3"
                className="w-full"
              />
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

      {/* How it works */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-12 text-center">How it works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardContent className="flex flex-col h-full p-6 gap-4">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-primary">
                    <feature.icon className="h-5 w-5" />
                  </span>
                  <span className="text-xs font-medium text-muted-foreground">{feature.step}</span>
                </div>
                <h3 className="font-display text-xl font-semibold">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Popular builds */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-10">Popular builds</h2>
        <Card className="overflow-hidden">
          <div className="divide-y divide-border">
            {popularBuilds.map((build) => (
              <Link
                key={build.name}
                to={`/customize/${build.layout}`}
                className="flex items-center gap-6 p-5 hover:bg-accent/50 transition-colors"
              >
                <div className="relative w-44 shrink-0 rounded-lg bg-muted p-2">
                  <KeyboardPreview
                    layout={build.layout as "65" | "75" | "100"}
                    caseColor={build.caseColor}
                    keycapColor={build.keycapColor}
                    className="w-full"
                  />
                  {build.badge && (
                    <Badge className="absolute left-2 top-2 bg-primary text-primary-foreground">
                      {build.badge}
                    </Badge>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-display text-lg font-semibold truncate">{build.name}</h3>
                  <p className="text-sm text-muted-foreground">{build.subtitle}</p>
                </div>
                <div className="flex shrink-0 items-center gap-4">
                  <span className="font-display text-xl font-bold tabular-nums">{build.price}</span>
                  <span className="text-sm font-medium text-primary flex items-center gap-1">
                    Customize
                    <ChevronRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </Card>
      </section>

      {/* Repairability band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col gap-6">
              <h2 className="font-display text-3xl font-bold tracking-tight">Every part is swappable</h2>
              <p className="text-muted-foreground max-w-2xl">
                Case, sockets, switches, keycaps, battery — designed to come out, so the keyboard outlives its parts.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {repairabilityParts.map((part) => (
                  <div
                    key={part.name}
                    className="flex flex-col items-center gap-2 rounded-lg bg-muted p-4"
                  >
                    <span className="text-primary">{part.icon}</span>
                    <span className="text-sm font-medium">{part.name}</span>
                  </div>
                ))}
              </div>
              <Link
                to="/repairability"
                className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                Read the repairability guide
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Firmware band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Open firmware, your shortcuts</h2>
            <ul className="flex flex-col gap-4">
              {firmwareFeatures.map((feature) => (
                <li key={feature} className="flex items-center gap-3 text-base">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-success/10 text-success shrink-0">
                    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <path d="m9 12 2 2 4-4" />
                    </svg>
                  </span>
                  {feature}
                </li>
              ))}
            </ul>
            <Link
              to="/firmware"
              className="mt-6 flex items-center gap-2 text-sm font-medium text-primary hover:underline"
            >
              See the firmware docs
              <ChevronRight className="h-4 w-4" />
            </Link>
          </CardContent>
        </Card>
      </section>

      {/* Proof band */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="flex flex-col lg:flex-row items-center gap-8">
              <div className="flex flex-col items-center gap-2 lg:w-1/4">
                <span className="font-display text-5xl font-bold leading-none">4.7</span>
                <div className="flex items-center gap-1 text-warning">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current" />
                  ))}
                </div>
                <span className="text-xs text-muted-foreground">212 ratings</span>
              </div>
              <Separator orientation="vertical" className="h-24 lg:h-auto w-full lg:w-px" />
              <div className="flex-1">
                <Badge variant="secondary" className="mb-3">
                  Verified buyer
                </Badge>
                <p className="text-lg leading-relaxed mb-2">
                  "No soldering, no prying. Popped the plate off, pulled out the old sockets, dropped in tactile switches. The tool they include actually fits."
                </p>
                <span className="text-xs text-muted-foreground">75% · Lilac aluminium</span>
              </div>
              <Link
                to="/keyboards"
                className="flex shrink-0 items-center gap-2 text-sm font-medium text-primary hover:underline"
              >
                All reviews
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Closing CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-secondary overflow-hidden">
          <CardContent className="p-8 lg:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Your keyboard, minus the mystery.
            </h2>
            <p className="text-secondary-foreground text-lg mb-8 max-w-2xl mx-auto">
              Built to order, shipped from India, repairable for years.
            </p>
            <Button variant="secondary" size="lg" asChild className="h-12 px-10">
              <Link to="/customize">Start a build</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}