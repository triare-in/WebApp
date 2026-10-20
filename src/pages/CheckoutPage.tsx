"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

type PaymentMethod = "card" | "upi" | "netbanking" | "wallet"
interface CheckoutItem {
  id: string
  layout: string
  case: string
  keycaps: string
  price: number
}

const paymentMethods: PaymentMethod[] = ["card", "upi", "netbanking", "wallet"]
const formatPrice = (price: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(price)}`

export function CheckoutPage() {
  const [step, setStep] = useState(1)
  const [items] = useState<CheckoutItem[]>(() => {
    const saved = localStorage.getItem("triare-cart")
    if (!saved) return []
    try {
      const parsed: unknown = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed as CheckoutItem[] : []
    } catch (error) {
      console.error("Could not load checkout cart", error)
      return []
    }
  })
  const [contact, setContact] = useState({ email: "", phone: "" })
  const [shipping, setShipping] = useState({ address: "", pin: "", state: "" })
  const [payment, setPayment] = useState<PaymentMethod>("card")
  const [loading, setLoading] = useState(false)
  const [paymentMessage, setPaymentMessage] = useState("")

  const steps = [
    { title: "Contact", description: "Enter your email and phone" },
    { title: "Shipping", description: "Delivery address and options" },
    { title: "Payment", description: "Pay with Razorpay" },
    { title: "Review", description: "Review your order before paying" },
  ]

  const handleSubmit = async () => {
    setLoading(true)
    setPaymentMessage("")
    await new Promise((resolve) => setTimeout(resolve, 300))
    setLoading(false)
    setPaymentMessage("Online payment is not connected in this preview. No order was placed.")
  }

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const shippingCost = items.length ? 150 : 0
  const discount = 0
  const total = subtotal - discount + shippingCost

  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
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
                    onClick={() => setStep(index + 1)}
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
                  value={contact.email}
                  onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  placeholder="you@example.com"
                  required
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={contact.phone}
                  onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  placeholder="+91 98765 43210"
                  required
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => setStep(2)}>
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
                  value={shipping.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                  placeholder="Street, Landmark, etc."
                  required
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="pin">PIN code</Label>
                  <Input
                    id="pin"
                    type="number"
                    value={shipping.pin}
                    onChange={(e) => setShipping({ ...shipping, pin: e.target.value })}
                    placeholder="110001"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State</Label>
                  <Select
                    value={shipping.state}
                    onValueChange={(state) => setShipping({ ...shipping, state })}
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
                </div>
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => setStep(3)}>
                  Next
                </Button>
              </div>
            </section>
          )}

          {step === 3 && (
            <section className="space-y-4">
              <p className="text-sm text-muted-foreground mb-4">Payment of {formatPrice(total)} via Razorpay (INR)</p>
              <div className="grid grid-cols-2 gap-4">
                {paymentMethods.map((method) => (
                  <label key={method} className="flex items-center gap-3 rounded-md border-border px-4 py-3 cursor-pointer hover:bg-primary/5 transition-colors">
                    <input
                      type="radio"
                      value={method}
                      checked={payment === method}
                      onChange={() => setPayment(method)}
                      className="hidden peer"
                    />
                    <div className="w-8 h-8 rounded-md border border-border flex items-center justify-center flex-shrink-0 peer-checked:bg-primary peer-checked:text-primary-foreground transition-colors">
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
                  </label>
                ))}
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="outline" size="sm" onClick={() => setStep(Math.max(1, step - 1))}>
                  Prev
                </Button>
                <Button size="sm" onClick={() => setStep(4)}>
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
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Email:</span> {contact.email}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Phone:</span> {contact.phone}</p>
                </div>
                <div>
                  <h3 className="font-display font-medium mb-4">Shipping</h3>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">Address:</span> {shipping.address || "Not provided"}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">PIN:</span> {shipping.pin || "Not provided"}</p>
                  <p className="text-muted-foreground text-sm"><span className="font-medium">State:</span> {shipping.state || "Not provided"}</p>
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
            </section>
          )}

          {/* Submit button at bottom */}
          {step === 4 && (
            <div className="mt-8 flex justify-end gap-2">
              <Button variant="outline" size="sm" onClick={() => setStep(3)}>
                Prev
              </Button>
              <Button onClick={handleSubmit} className="w-full h-12 px-6" disabled={loading || !items.length}>
                {loading ? (
                  <span className="flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" />Processing...</span>
                ) : (
                  <span>Pay {formatPrice(total)}</span>
                )}
              </Button>
              {paymentMessage && (
                <p role="status" className="mt-3 text-sm text-warning">{paymentMessage}</p>
              )}
            </div>
          )}
        </div>
      </div>

    </div>
  )
}