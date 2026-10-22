
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  Shield,
  Folder,
  MousePointer,
  ChevronRight,
} from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

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
            <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-full rounded-2xl bg-muted p-4" />
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

      {/* Support links */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="divide-y divide-border border-y border-border">
          {supportCards.map((card, index) => (
            <Link key={card.title} to={card.href} className="group flex items-start gap-4 py-5 hover:bg-accent/30 sm:gap-6 sm:px-3">
              <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              <card.icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
              <div className="flex-1">
                <h3 className="font-display font-semibold group-hover:text-primary">{card.title}</h3>
                <p className="mt-1 max-w-3xl text-sm leading-relaxed text-muted-foreground">{card.description}</p>
              </div>
              <ChevronRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
            </Link>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="border-y border-border py-8 lg:py-12">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Contact us</h2>
            <p className="text-muted-foreground text-lg mb-6">
              This contact form is a preview and does not send messages yet. Support contact details will be published before launch.
            </p>
            <form className="space-y-4" onSubmit={(event) => {
              event.preventDefault()
              toast.info("The contact form is not connected in this preview.")
            }}>
              <div>
                <Label htmlFor="support-name">Name</Label>
                <Input id="support-name" name="name" autoComplete="name" placeholder="Your name" required />
              </div>
              <div>
                <Label htmlFor="support-email">Email</Label>
                <Input id="support-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </div>
              <div>
                <Label htmlFor="support-subject">Subject</Label>
                <Input id="support-subject" name="subject" placeholder="Subject" />
              </div>
              <div>
                <Label htmlFor="support-message">Message</Label>
                <Textarea id="support-message" name="message" rows={4} placeholder="Describe your issue or question..." required />
              </div>
              <Button type="submit" className="w-full h-12 px-4">
                Send message
              </Button>
            </form>
        </div>
      </section>
    </div>
  )
}