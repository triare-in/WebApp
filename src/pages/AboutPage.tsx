
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
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
import { KeyboardPreview } from "@/components/app/KeyboardPreview"

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
              <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-full rounded-2xl bg-muted p-4" />
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

      {/* Brand story */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 gap-x-8 md:grid-cols-3">
          {brandStory.map((story, index) => (
            <article key={story.title} className="border-t border-border py-5">
              <div className="flex items-center gap-3">
                <story.icon className="h-5 w-5 text-primary" aria-hidden="true" />
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h2 className="mt-4 font-display text-xl font-semibold">{story.title}</h2>
              <p className="mt-2 leading-relaxed text-muted-foreground">{story.description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* Principles */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Our principles</h2>
        <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
          {principles.map((principle) => (
            <article key={principle.title} className="border-t border-border py-5">
              <div className="flex items-start gap-3">
                <principle.icon className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-display font-medium">{principle.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{principle.description}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-secondary px-6 py-14 text-center sm:px-10 lg:py-20">
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Your keyboard, minus the mystery.
            </h2>
            <p className="text-secondary-foreground text-lg mb-6 max-w-2xl mx-auto">
              Built to order, shipped from India, repairable for years.
            </p>
            <Button size="lg" asChild className="h-12 px-8">
              <Link to="/customize">Start a build</Link>
            </Button>
        </div>
      </section>
    </div>
  )
}