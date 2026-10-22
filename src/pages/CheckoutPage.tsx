
import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, SHIPPING_FEE } from "@/lib/catalog"

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet"
const paymentMethods: PaymentMethod[] = ["card", "upi", "netbanking", "wallet"]

const checkoutSchema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
  phone: z.string().refine((value) => value.replace(/\D/g, "").length >= 10, "Enter a valid phone number."),
  address: z.string().trim().min(1, "Enter your delivery address."),
  pin: z.string().regex(/^\d{6}$/, "Enter a 6-digit PIN code."),
  state: z.string().min(1, "Choose your state."),
})

type CheckoutFields = z.infer<typeof checkoutSchema>

export function CheckoutPage() {
  const [step, setStep] = useState(1)
  const { items } = useCart()
  const [payment, setPayment] = useState<PaymentMethod>("card")
  const [acceptedNoReturns, setAcceptedNoReturns] = useState(false)
  const [validationMessage, setValidationMessage] = useState("")
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

  const steps = [
    { title: "Contact", description: "Enter your email and phone" },
    { title: "Shipping", description: "Delivery address and options" },
    { title: "Payment", description: "Choose a payment method" },
    { title: "Review", description: "Review your order before paying" },
  ]

  const goToStep = async (target: number) => {
    if (target > step) {
      for (let current = step; current < target; current += 1) {
        if (current === 1 && !(await trigger(["email", "phone"]))) return
        if (current === 2 && !(await trigger(["address", "pin", "state"]))) return
      }
    }
    setValidationMessage("")
    setStep(target)
  }

  const submitPayment = handleSubmit(() => {
    setPaymentMessage("")
    if (!acceptedNoReturns) {
      setValidationMessage("Please acknowledge the custom-build returns policy.")
      return
    }
    setPaymentMessage("Online payment is not connected in this preview. No order was placed.")
  })

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const shippingCost = items.length ? SHIPPING_FEE : 0
  const discount = 0
  const total = subtotal - discount + shippingCost

  return (
    <div className="flex flex-col bg-background font-body">
      <div className="flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h1 className="mb-4 font-display text-3xl font-bold tracking-tight">Checkout</h1>
          {/* Stepper */}
          <section className="mb-8">
            <div className="flex items-center gap-2">
              {steps.map((item, index) => (
                <div key={item.title} className="flex flex-1 items-center gap-2">
                  <button
                    type="button"
                    aria-current={index === step - 1 ? "step" : undefined}
                    onClick={() => void goToStep(index + 1)}
                    className={cn(
                      "flex h-8 flex-1 items-center justify-center rounded-full text-xs",
                      index < step - 1 && "bg-primary text-primary-foreground",
                      index === step - 1 && "bg-primary/50 text-primary",
                      index >= step && "bg-muted/50 text-muted-foreground",
                    )}
                  >
                    {item.title}
                  </button>
                  {index < steps.length - 1 && <Separator className="h-px w-3 bg-muted/50" />}
                </div>
              ))}
            </div>
            <div className="flex-1">
              <p className="text-sm text-muted-foreground">{steps[step - 1].description}</p>
              <h2 className="font-display text-xl font-bold tracking-tight mb-4">{steps[step - 1].title}</h2>
            </div>
          </section>

          {/* Form steps */}
          {step === 1 && (
            <section className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  aria-invalid={Boolean(errors.email)}
                  {...register("email")}
                  placeholder="you@example.com"
                  required
                />
                {errors.email && <p role="alert" className="mt-1 text-sm text-destructive">{errors.email.message}</p>}
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={Boolean(errors.phone)}
                  {...register("phone")}
                  placeholder="+91 98765 43210"
                  required
                />
                {errors.phone && <p role="alert" className="mt-1 text-sm text-destructive">{errors.phone.message}</p>}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => void goToStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => void goToStep(2)}>
                  Next
                </Button>
              </div>
            </section>
          )}

          {step === 2 && (
            <section className="space-y-4">
              <div>
                <Label htmlFor="address">Delivery address</Label>
                <Input
                  id="address"
                  autoComplete="street-address"
                  aria-invalid={Boolean(errors.address)}
                  {...register("address")}
                  placeholder="Street, Landmark, etc."
                  required
                />
                {errors.address && <p role="alert" className="mt-1 text-sm text-destructive">{errors.address.message}</p>}
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pin">PIN code</Label>
                  <Input
                    id="pin"
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]{6}"
                    maxLength={6}
                    autoComplete="postal-code"
                    aria-invalid={Boolean(errors.pin)}
                    {...register("pin")}
                    placeholder="110001"
                    required
                  />
                  {errors.pin && <p role="alert" className="mt-1 text-sm text-destructive">{errors.pin.message}</p>}
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={watch("state")}
                    onValueChange={(state) => setValue("state", state, { shouldValidate: true, shouldTouch: true })}
                  >
                    <SelectTrigger>
                      <SelectValue className="w-full placeholder:text-muted-foreground" placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="Delhi">Delhi</SelectItem>
                      <SelectItem value="Karnataka">Karnataka</SelectItem>
                      <SelectItem value="Tamil Nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="West Bengal">West Bengal</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.state && <p role="alert" className="mt-1 text-sm text-destructive">{errors.state.message}</p>}
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => void goToStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => void goToStep(3)}>
                  Next
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Payment of {formatPrice(total)} via Razorpay (INR)</p>
              <RadioGroup value={payment} onValueChange={(value) => setPayment(value as PaymentMethod)} className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {paymentMethods.map((method) => (
                  <Label key={method} htmlFor={`payment-${method}`} className="flex cursor-pointer items-center gap-3 rounded-lg border border-border p-4 transition-colors hover:bg-accent/50">
                    <RadioGroupItem id={`payment-${method}`} value={method} />
                    <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border">
                      {method === "card" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="1" y="2" width="20" height="20" rx="4" ry="4" />
                          <path d="M8 6L8 6M8 12l6 4L8 12M8 18l6-4L8 18" />
                        </svg>
                      )}
                      {method === "upi" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="3" />
                          <path d="M8 12l4-3L3 15a3.5 3.5 0 0 0 0 4.5L17 4.5" />
                        </svg>
                      )}
                      {method === "netbanking" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <circle cx="15.5" cy="15.5" r="1.5" />
                        </svg>
                      )}
                      {method === "wallet" && (
                        <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 2L2 7l10 5 10-5-10-5z" />
                          <path d="M2 7l10 5 10-5" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm font-medium">
                      {method === "card" ? "Credit/Debit Card" : method === "upi" ? "UPI" : method === "netbanking" ? "Net Banking" : "Wallet"}
                    </span>
                  </Label>
                ))}
              </RadioGroup>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => void goToStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => void goToStep(4)}>
                  Review and pay
                </Button>
              </div>
            </section>
          )}

          {step === 4 && (
            <section className="p-8">
              <h2 className="font-display text-2xl font-bold tracking-tight mb-6">Review order</h2>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-display font-medium mb-4">Contact</h3>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Email:</span> {getValues("email")}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Phone:</span> {getValues("phone")}</p>
                </div>
                <div>
                  <h3 className="font-display font-medium mb-4">Shipping</h3>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Address:</span> {getValues("address") || "Not provided"}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">PIN:</span> {getValues("pin") || "Not provided"}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">State:</span> {getValues("state") || "Not provided"}</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h3 className="font-display font-medium mb-4">Items</h3>
                  {items.length ? items.map((item) => (
                    <p key={item.id} className="text-muted-foreground text-sm">
                      {item.layout}% {item.case} · {item.keycaps}
                    </p>
                  )) : (
                    <p className="text-muted-foreground text-sm">Your cart is empty.</p>
                  )}
                </div>
                <div className="text-right">
                  <p className="font-display font-medium tabular-nums">{formatPrice(subtotal)}</p>
                  <p className="text-xs text-muted-foreground">Subtotal</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <p className="text-xs text-muted-foreground">Shipping</p>
                  <p className="font-medium tabular-nums">{formatPrice(shippingCost)}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Discount</p>
                  <p className="font-medium">{formatPrice(discount)}</p>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <p className="font-display font-medium tabular-nums text-primary">{formatPrice(total)}</p>
                <p className="text-xs text-muted-foreground">Total</p>
              </div>
              <div className="mt-6 flex items-start gap-3 rounded-lg border border-border p-4">
                <Checkbox
                  id="no-returns-acknowledgement"
                  checked={acceptedNoReturns}
                  onCheckedChange={(checked) => setAcceptedNoReturns(checked === true)}
                />
                <Label htmlFor="no-returns-acknowledgement" className="cursor-pointer text-sm leading-relaxed">
                  I understand that custom-built keyboards cannot be returned or exchanged, subject to applicable consumer rights and the claims policy.
                </Label>
              </div>
            </section>
          )}

          {/* Submit button at bottom */}
          {step === 4 && (
            <>
              <div className="mt-8 flex flex-wrap justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => void goToStep(3)}>
                  Prev
                </Button>
                <Button onClick={() => void submitPayment()} className="h-12 w-full px-6 sm:w-auto" disabled={!items.length}>
                  Pay {formatPrice(total)}
                </Button>
              </div>
              {paymentMessage && (
                <p role="status" className="mt-3 text-sm text-warning">{paymentMessage}</p>
              )}
              {validationMessage && <p role="alert" className="mt-4 text-sm text-destructive">{validationMessage}</p>}
            </>
          )}
        </div>
      </div>

    </div>
  )
}