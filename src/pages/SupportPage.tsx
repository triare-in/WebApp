"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Grid } from "@/components/ui/grid"
import {
  Shield,
  Folder,
  MousePointer,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"

const faqItems = [
  {
    question: "How do I place an order?",
    answer:
      "Select your layout, case, switches, and keycaps in the configurator, add to cart, and checkout with Razorpay (INR).",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "No, we currently ship within India only. International shipping may be added in future versions.",
  },
  {
    question: "What is the build time?",
    answer:
      "Every keyboard is made to order. Please allow 10–14 days for building, then 2–5 days for delivery.",
  },
  {
    question: "Can I cancel my order?",
    answer:
      "You can cancel until your order moves to Building. After building starts, an order can't be cancelled.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "Razorpay (INR) - card, UPI, netbanking, and wallet. We don't store your card or bank details.",
  },
  {
    question: "How does the warranty work?",
    answer:
      "1-year warranty on admin-selected products. Manufacturing defects and failures under normal use are covered.",
  },
]

const supportCards = [
  {
    title: "Warranty",
    description:
      "1-year warranty on selected products. Manufacturing defects covered. Free replacement parts with genuine proof.",
    icon: Shield,
    href: "/policies/warranty",
    bg: "bg-primary/10",
  },
  {
    title: "Parts plan",
    description:
      "Buy replacement parts (sockets, switches, keycaps, battery) separately when you need them.",
    icon: Folder,
    href: "/repairability",
    bg: "bg-secondary",
  },
  {
    title: "Repairs",
    description:
      "Open the case with the included tool and swap any part. No glue, no soldering required.",
    icon: MousePointer,
    href: "/repairability",
    bg: "bg-accent",
  },
]

export function SupportPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
        <div className="flex flex-col lg:flex-row items-center gap-8">
          <div className="flex-1 lg:w-1/2">
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Support
            </h1>
            <p className="text-lg text-muted-foreground mt-4 max-w-xl">
              Need help? We're here for you.
            </p>
          </div>
          <div className="flex-1 lg:w-1/2 flex items-center justify-center">
            <svg viewBox="0 0 520 190" className="w-full rounded-2xl overflow-hidden bg-muted">
              <rect x="3" y="3" width="514" height="184" rx="14" />
            </svg>
            <p className="mt-3 text-xs text-muted-foreground text-center">
              Preview is illustrative. Final product may vary slightly.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {faqItems.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-b">
              <AccordionTrigger>
                <span className="flex items-center justify-between w-full">
                  <span className="font-display font-medium text-primary cursor-pointer">
                    {faq.question}
                  </span>
                  <ChevronRight className="h-4 w-4 opacity-60 transition-transform" />
                </span>
              </AccordionTrigger>
              <AccordionContent className="pt-2 line-clamp-3">
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Support cards */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {supportCards.map((card, index) => (
            <Card key={index} className="p-6 hover:bg-accent/50 transition-colors">
              <CardContent className="flex flex-col h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-lg ${card.bg || "bg-muted/50"} flex items-center justify-center shrink-0`}>
                    <card.icon className="h-5 w-5" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground capitalize-first">0{index + 1}</span>
                </div>
                <h3 className="font-display font-medium mb-2">{card.title}</h3>
                <p className="text-muted-foreground line-clamp-2">{card.description}</p>
                <div className="mt-3">
                  <Button variant="outline" size="sm" asChild>
                    <Link to={card.href} className="text-primary hover:underline">
                      Learn more
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </section>

      {/* Contact form */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <Card className="overflow-hidden">
          <CardContent className="p-8 lg:p-12">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Contact us</h2>
            <p className="text-muted-foreground text-lg mb-6">
              Have a question that's not covered above? Fill out the form and we'll get back to you within 48 hours.
            </p>
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Name
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full rounded-md border-border px-3 py-2 text-body",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="Your name"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Email
                </label>
                <input
                  type="email"
                  className={cn(
                    "w-full rounded-md border-border px-3 py-2 text-body",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  className={cn(
                    "w-full rounded-md border-border px-3 py-2 text-body",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="Subject"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-muted-foreground mb-2">
                  Message
                </label>
                <textarea
                  rows={4}
                  className={cn(
                    "w-full rounded-md border-border px-3 py-2 text-body resize-y",
                    "focus:outline-none focus:border-primary"
                  )}
                  placeholder="Describe your issue or question..."
                  required
                />
              </div>
              <Button type="submit" className="w-full h-12 px-4">
                Send message
              </Button>
            </form>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}