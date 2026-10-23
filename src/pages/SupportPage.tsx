
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import {
  Shield,
  FileText,
  Wrench,
  ChevronRight,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "sonner"
import { Field } from "@/components/app/Field"
import { PageContainer } from "@/components/app/PageContainer"

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
  },
  {
    title: "Raise a claim",
    description:
      "Tell us what happened and include proof so your claim can be reviewed.",
    icon: FileText,
    href: "/support/claim",
  },
  {
    title: "Repairs",
    description:
      "Open the case with the included tool and swap any part. No glue, no soldering required.",
    icon: Wrench,
    href: "/repairability",
  },
]

const contactDetails: { label: string; value: string }[] = []
// TODO(launch): Add verified support contact details.

export function SupportPage() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <PageContainer as="section" className="py-10">
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Support</h1>
        <p className="mt-4 max-w-xl text-lg text-muted-foreground">
          Need help with an order, repair, or keyboard setup? Browse the answers or contact us below.
        </p>
      </PageContainer>

      {/* FAQ */}
      <PageContainer as="section" className="py-16">
        <h2 className="font-display text-3xl font-bold tracking-tight mb-8">Frequently asked questions</h2>
        <Accordion type="single" collapsible>
          {faqItems.map((faq, index) => (
            <AccordionItem key={index} value={`faq-${index}`} className="border-b">
              <AccordionTrigger className="text-foreground">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="pt-2">
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </PageContainer>

      {/* Support links */}
      <PageContainer as="section" className="py-16">
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
      </PageContainer>

      <PageContainer as="section" className="py-10">
        <h2 className="font-display text-2xl font-semibold">Contact details</h2>
        <dl className="mt-4 space-y-2">
          {contactDetails.map((detail) => (
            <div key={detail.label} className="flex flex-wrap gap-2 text-sm">
              <dt className="font-medium">{detail.label}</dt>
              <dd className="text-muted-foreground">{detail.value}</dd>
            </div>
          ))}
        </dl>
      </PageContainer>

      {/* Contact form */}
      <PageContainer as="section" className="py-16">
        <div className="border-y border-border py-8 lg:py-12">
            <h2 className="font-display text-3xl font-bold tracking-tight mb-6">Contact us</h2>
            <p className="text-muted-foreground text-lg mb-6">
              This contact form is a preview and does not send messages yet. Support contact details will be published before launch.
            </p>
            <form className="space-y-4" onSubmit={(event) => {
              event.preventDefault()
              toast.info("The contact form is not connected in this preview.")
            }}>
              <Field id="support-name" label="Name">
                <Input id="support-name" name="name" autoComplete="name" placeholder="Your name" required />
              </Field>
              <Field id="support-email" label="Email">
                <Input id="support-email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required />
              </Field>
              <Field id="support-subject" label="Subject">
                <Input id="support-subject" name="subject" placeholder="Subject" />
              </Field>
              <Field id="support-message" label="Message">
                <Textarea id="support-message" name="message" rows={4} placeholder="Describe your issue or question..." required />
              </Field>
              <Button type="submit" className="w-full h-12 px-4">
                Send message
              </Button>
            </form>
        </div>
      </PageContainer>
    </div>
  )
}