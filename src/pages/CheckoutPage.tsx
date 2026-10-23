import { useState } from "react"
import { Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Check, CreditCard, Landmark, ShieldCheck, Smartphone, Wallet } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Field } from "@/components/app/Field"
import { OrderSummary } from "@/components/app/OrderSummary"
import { PageContainer } from "@/components/app/PageContainer"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, SHIPPING_FEE } from "@/lib/catalog"
import { INDIAN_STATES_AND_UTS } from "@/lib/india"

const checkoutSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().refine((value) => value.replace(/\D/g, "").length >= 10, "Enter a valid phone number."),
  address: z.string().trim().min(1, "Enter your delivery address."),
  pin: z.string().regex(/^\d{6}$/, "Enter a 6-digit PIN code."),
  state: z.string().min(1, "Choose your state."),
})

type CheckoutFields = z.infer<typeof checkoutSchema>

const steps = [
  { title: "Contact", description: "Your email and phone" },
  { title: "Shipping", description: "Delivery address" },
  { title: "Payment", description: "Secure payment options" },
  { title: "Review", description: "Confirm your order" },
]

export function CheckoutPage() {
  const [step, setStep] = useState(1)
  const { items } = useCart()
  const [acceptedNoReturns, setAcceptedNoReturns] = useState(false)
  const [attemptedPayment, setAttemptedPayment] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState("")
  const {
    register,
    getValues,
    watch,
    setValue,
    trigger,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutFields>({
    resolver: zodResolver(checkoutSchema),
    mode: "onTouched",
    defaultValues: { email: "", phone: "", address: "", pin: "", state: "" },
  })

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const shipping = items.length ? SHIPPING_FEE : 0
  const total = subtotal + shipping

  const goToStep = async (target: number) => {
    if (target > step) {
      for (let current = step; current < target; current += 1) {
        if (current === 1 && !(await trigger(["email", "phone"]))) return
        if (current === 2 && !(await trigger(["address", "pin", "state"]))) return
      }
    }
    setStep(target)
  }

  const submitPayment = handleSubmit(() => {
    setAttemptedPayment(true)
    setPaymentMessage("")
    if (!acceptedNoReturns) return
    setPaymentMessage("Online payment is not connected in this preview. No order was placed.")
  })

  if (items.length === 0) {
    return (
      <PageContainer>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
        <div className="mt-8 border-y border-border py-12">
          <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Add a keyboard build before checkout.</p>
          <Button className="mt-5" asChild><Link to="/keyboards">Browse keyboards</Link></Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <h1 className="mb-6 font-display text-3xl font-bold tracking-tight sm:text-4xl">Checkout</h1>
      <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0 max-w-2xl">
          <section className="mb-6">
            <h2 className="sr-only">Checkout progress</h2>
            <ol className="grid gap-3 sm:grid-cols-4">
              {steps.map((item, index) => {
                const currentStep = index + 1
                const complete = currentStep < step
                const current = currentStep === step
                return (
                  <li key={item.title} aria-current={current ? "step" : undefined} className="relative">
                    <button
                      type="button"
                      onClick={() => void goToStep(currentStep)}
                      className="flex w-full items-start gap-3 rounded-md text-left focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring sm:flex-col"
                    >
                      <span className={`flex size-8 shrink-0 items-center justify-center rounded-full text-sm font-semibold ${
                        complete ? "bg-success text-success-foreground" :
                          current ? "bg-primary text-primary-foreground" :
                            "bg-muted text-muted-foreground"
                      }`}>
                        {complete ? <Check className="size-4" aria-hidden="true" /> : currentStep}
                      </span>
                      <span>
                        <span className="block font-medium">{item.title}</span>
                        <span className="block text-xs text-muted-foreground">{item.description}</span>
                      </span>
                    </button>
                    {index < steps.length - 1 && (
                      <span aria-hidden="true" className="absolute left-8 top-4 hidden h-px w-[calc(100%-2rem)] bg-border sm:block" />
                    )}
                  </li>
                )
              })}
            </ol>
          </section>

          <section className="mb-6 lg:hidden">
            <h2 className="sr-only">Order summary</h2>
            <Accordion type="single" collapsible defaultValue="summary" className="rounded-xl border border-border bg-card px-4">
              <AccordionItem value="summary" className="border-0">
                <AccordionTrigger>
                  <span>Order summary · {formatPrice(total)}</span>
                </AccordionTrigger>
                <AccordionContent>
                  <OrderSummary items={items} shipping={shipping} discount={0} showTitle={false} />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          <h2 className="mb-4 font-display text-xl font-bold tracking-tight">{steps[step - 1].title}</h2>
          <form
            className="space-y-6"
            noValidate
            onSubmit={(event) => {
              if (step < 4) {
                event.preventDefault()
                void goToStep(step + 1)
                return
              }
              void submitPayment(event)
            }}
          >
            {step === 1 && (
              <section className="space-y-4" aria-label="Contact details">
                <Field id="email" label="Email" error={errors.email?.message}>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    {...register("email")}
                    placeholder="you@example.com"
                    required
                  />
                </Field>
                <Field id="phone" label="Phone" error={errors.phone?.message}>
                  <Input
                    id="phone"
                    type="tel"
                    autoComplete="tel"
                    aria-invalid={Boolean(errors.phone)}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    {...register("phone")}
                    placeholder="+91 98765 43210"
                    required
                  />
                </Field>
                <div className="flex justify-end">
                  <Button type="submit">Next</Button>
                </div>
              </section>
            )}

            {step === 2 && (
              <section className="space-y-4" aria-label="Shipping details">
                <Field id="address" label="Delivery address" error={errors.address?.message}>
                  <Input
                    id="address"
                    autoComplete="street-address"
                    aria-invalid={Boolean(errors.address)}
                    aria-describedby={errors.address ? "address-error" : undefined}
                    {...register("address")}
                    placeholder="Street, landmark, etc."
                    required
                  />
                </Field>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field id="pin" label="PIN code" error={errors.pin?.message}>
                    <Input
                      id="pin"
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]{6}"
                      maxLength={6}
                      autoComplete="postal-code"
                      aria-invalid={Boolean(errors.pin)}
                      aria-describedby={errors.pin ? "pin-error" : undefined}
                      {...register("pin")}
                      placeholder="110001"
                      required
                    />
                  </Field>
                  <Field id="state" label="State" error={errors.state?.message}>
                    <Select
                      value={watch("state")}
                      onValueChange={(state) => setValue("state", state, { shouldValidate: true, shouldTouch: true })}
                    >
                      <SelectTrigger
                        id="state"
                        className="w-full"
                        aria-invalid={Boolean(errors.state)}
                        aria-describedby={errors.state ? "state-error" : undefined}
                      >
                        <SelectValue placeholder="Select state or union territory" />
                      </SelectTrigger>
                      <SelectContent>
                        {INDIAN_STATES_AND_UTS.map((state) => <SelectItem key={state} value={state}>{state}</SelectItem>)}
                      </SelectContent>
                    </Select>
                  </Field>
                </div>
                <div className="flex justify-between gap-2">
                  <Button type="button" variant="outline" onClick={() => void goToStep(1)}>Previous</Button>
                  <Button type="submit">Next</Button>
                </div>
              </section>
            )}

            {step === 3 && (
              <section aria-label="Payment methods">
                <Alert>
                  <ShieldCheck aria-hidden="true" />
                  <AlertTitle>You'll pay in Razorpay's secure window</AlertTitle>
                  <AlertDescription>
                    The payment provider will show its available methods when you continue.
                  </AlertDescription>
                </Alert>
                <div className="mt-4 flex flex-wrap gap-2" aria-label="Payment methods shown by Razorpay">
                  <Badge variant="secondary"><CreditCard aria-hidden="true" />Card</Badge>
                  <Badge variant="secondary"><Smartphone aria-hidden="true" />UPI</Badge>
                  <Badge variant="secondary"><Landmark aria-hidden="true" />Net banking</Badge>
                  <Badge variant="secondary"><Wallet aria-hidden="true" />Wallet</Badge>
                </div>
                <div className="mt-6 flex justify-between gap-2">
                  <Button type="button" variant="outline" onClick={() => void goToStep(2)}>Previous</Button>
                  <Button type="submit">Review order</Button>
                </div>
              </section>
            )}

            {step === 4 && (
              <section>
                <div className="mb-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <h3 className="mb-2 font-display font-medium">Contact</h3>
                    <p className="text-sm text-muted-foreground">{getValues("email")}</p>
                    <p className="text-sm text-muted-foreground">{getValues("phone")}</p>
                  </div>
                  <div>
                    <h3 className="mb-2 font-display font-medium">Shipping</h3>
                    <p className="text-sm text-muted-foreground">{getValues("address")}</p>
                    <p className="text-sm text-muted-foreground">{getValues("pin")}, {getValues("state")}</p>
                  </div>
                </div>
                <div className="mb-6">
                  <h3 className="mb-2 font-display font-medium">Items</h3>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    {items.map((item) => (
                      <li key={item.id}>
                        {item.layout}% {item.case} · {item.keycaps} keycaps{item.switch ? ` · ${item.switch} switches` : ""}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="rounded-lg border border-border p-4">
                  <div className="flex items-start gap-3">
                    <Checkbox
                      id="no-returns-acknowledgement"
                      checked={acceptedNoReturns}
                      onCheckedChange={(checked) => setAcceptedNoReturns(checked === true)}
                      aria-invalid={attemptedPayment && !acceptedNoReturns}
                      aria-describedby={attemptedPayment && !acceptedNoReturns ? "no-returns-error" : undefined}
                    />
                    <Label htmlFor="no-returns-acknowledgement" className="cursor-pointer text-sm leading-relaxed">
                      I understand that custom-built keyboards cannot be returned or exchanged, subject to applicable consumer rights and the claims policy.
                    </Label>
                  </div>
                  {attemptedPayment && !acceptedNoReturns && (
                    <p id="no-returns-error" role="alert" className="mt-2 text-sm text-destructive">
                      Acknowledge the custom-build returns policy to continue.
                    </p>
                  )}
                </div>
                <div className="mt-6 flex justify-between gap-2">
                  <Button type="button" variant="outline" onClick={() => void goToStep(3)}>Previous</Button>
                  <Button type="submit">Pay {formatPrice(total)}</Button>
                </div>
                {paymentMessage && (
                  <Alert className="mt-4">
                    <ShieldCheck aria-hidden="true" />
                    <AlertTitle>Payment is not connected</AlertTitle>
                    <AlertDescription>{paymentMessage}</AlertDescription>
                  </Alert>
                )}
              </section>
            )}
          </form>
        </div>

        <aside className="sticky top-24 hidden rounded-xl border border-border bg-card p-5 lg:block">
          <OrderSummary items={items} shipping={shipping} discount={0} />
        </aside>
      </div>
    </PageContainer>
  )
}
