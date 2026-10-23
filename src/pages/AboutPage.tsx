
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import {
  Shield,
  Zap,
  MapPin,
  Heart,
  Recycle,
  Wrench,
} from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { PageContainer } from "@/components/app/PageContainer"

export function AboutPage() {
  const brandStory = [
    {
      title: "Repairable",
      description:
        "Every part of our boards can be swapped, so it keeps working long after a normal keyboard would be thrown away.",
      icon: Shield,
    },
    {
      title: "Wireless-first",
      description:
        "Wireless Bluetooth connectivity and firmware installation over USB.",
      icon: Zap,
    },
    {
      title: "India-made",
      description:
        "Built to order in India from parts you can swap. No glue, no soldering, no e-waste.",
      icon: MapPin,
    },
  ]

  const principles = [
    { title: "Built to be kept", description: "Our mission is to make custom keyboards that stay useful through repair and part replacement.", icon: Heart },
    { title: "Less waste through repair", description: "Extending the life of electronics is one practical way to reduce avoidable waste.", icon: Recycle },
    { title: "Repairs made approachable", description: "Open the case with the included tool, then replace compatible parts without glue or soldering.", icon: Wrench },
  ]

  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageContainer as="section" className="py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 lg:w-1/2">
            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight">
              A keyboard should outlast its parts.
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              Revara builds repairable mechanical keyboards in India, with replaceable parts and a clear path to repair.
            </p>
            <div className="mt-6">
              <Button asChild>
                <Link to="/customize">Start a build</Link>
              </Button>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center lg:w-1/2">
            <div className="w-full">
              <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-full rounded-xl bg-muted p-4" />
            </div>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Preview is illustrative. Final product may vary slightly.
            </p>
          </div>
        </div>
      </PageContainer>

      {/* Brand story */}
      <PageContainer as="section" className="py-16">
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
      </PageContainer>

      {/* Principles */}
      <PageContainer as="section" className="py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Our principles</h2>
        {/* TODO: sourced WHO e-waste stat */}
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
      </PageContainer>

      {/* CTA */}
      <PageContainer as="section" className="py-16">
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
      </PageContainer>
    </div>
  )
}