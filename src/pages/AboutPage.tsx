"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Grid } from "@/components/ui/grid"
import {
  Shield,
  Zap,
  Cloud,
  Eye,
  Heart,
  Wrench,
  ClipboardCheck,
  Check,
} from "lucide-react"

export function AboutPage() {
  const brandStory = [
    {
      title: "Repairable",
      description:
        "Every part of our boards can be swapped, so it keeps working long after a normal keyboard would be thrown away.",
      icon: Shield,
      bg: "bg-primary/10",
      border: "border-primary",
    },
    {
      title: "Wireless-first",
      description:
        "Bluetooth 5.2 · pairs with 3 devices. No dongles, no lag. Firmware updates over USB-C.",
      icon: Zap,
      bg: "bg-info/10",
      border: "border-info",
    },
    {
      title: "India-made",
      description:
        "Built to order in India from parts you can swap. No glue, no soldering, no e-waste.",
      icon: Cloud,
      bg: "bg-success/10",
      border: "border-success",
    },
  ]

  const principles = [
    { title: "Product first", description: "UI recedes; the keyboard preview and swatches carry the colour.", icon: Eye },
    { title: "Calm by default", description: "One accent, soft surfaces, generous space, no gradients on UI chrome.", icon: Heart },
    { title: "Repairable = legible", description: "Parts, compatibility, and prices are always explicit. No hidden steps.", icon: Wrench },
    { title: "Honest", description: "Say 'Final product may vary slightly' next to the preview. Never fake urgency.", icon: ClipboardCheck },
    { title: "Few decisions per screen", description: "One primary action per view.", icon: Check },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 lg:w-1/2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Keyboards you can fix yourself.
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              Built to order in India from parts you can swap. No glue, no soldering, no e-waste.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/customize">Start a build</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 lg:w-1/2 flex items-center justify-center">
            <div className="relative">
              <svg viewBox="0 0 520 190" className="w-full rounded-2xl overflow-hidden bg-muted">
                <rect x="3" y="3" width="514" height="184" rx="14" />
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

      {/* Brand story cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Grid className="grid-cols-1 md:grid-cols-3 gap-6">
          {brandStory.map((story, index) => (
            <Card key={index} className="p-6">
              <CardContent className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${story.bg} ${story.border} flex items-center justify-center shrink-0`}>
                    <story.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground capitalize-first">{index + 1}</span>
                </div>
                <h3 className="font-display font-medium mb-2">{story.title}</h3>
                <p className="text-muted-foreground flex-1 line-clamp-2">{story.description}</p>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Our principles</h2>
        <Grid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {principles.map((principle, index) => (
            <Card key={index} className="p-4">
              <CardContent>
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0">
                    <principle.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display font-medium mb-1">{principle.title}</h3>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {principle.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="bg-secondary overflow-hidden">
          <CardContent className="p-8 lg:p-16 text-center">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Your keyboard, minus the mystery.
            </h2>
            <p className="text-secondary-foreground text-lg mb-6 max-w-2xl mx-auto">
              Built to order, shipped from India, repairable for years.
            </p>
            <Button variant="secondary" size="lg" asChild className="h-12 px-8">
              <Link to="/customize">Start a build</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}