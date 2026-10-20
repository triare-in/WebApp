"use client"

import { Link } from "react-router-dom"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { X } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { cn } from "@/lib/utils"

interface CartItem {
  id: string
  layout: string
  case: string
  keycaps: string
  price: number
  caseColor?: string
  keycapColor?: string
}

const formatPrice = (price: number) =>
  `₹${new Intl.NumberFormat("en-IN").format(price)}`

export function CartPage() {
  const [items, setItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("triare-cart")
    if (!saved) return []
    try {
      const parsed: unknown = JSON.parse(saved)
      return Array.isArray(parsed) ? parsed as CartItem[] : []
    } catch (error) {
      console.error("Could not load saved cart", error)
      return []
    }
  })
  const [discountCode, setDiscountCode] = useState("")
  const [showSignInPrompt, setShowSignInPrompt] = useState(false)

  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const discount = discountCode === "WELCOME10" ? Math.floor(subtotal * 0.1) : 0
  const shipping = items.length > 0 ? 150 : 0
  const total = subtotal - discount + shipping

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id)
    setItems(updated)
    localStorage.setItem("triare-cart", JSON.stringify(updated))
    window.dispatchEvent(new Event("triare-cart-updated"))
  }

  return (
      <div className="flex min-h-screen flex-col bg-background font-body">
        <div className="flex-1">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            {/* Cart items */}
            <section className="mb-8">
              <h1 className="font-display text-2xl font-bold tracking-tight mb-6">Cart</h1>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Items list (left) */}
                <div className="lg:col-span-2 space-y-6">
                  {items.map((item) => (
                    <Card key={item.id} className="p-4 border-b">
                      <CardContent className="flex items-start gap-4">
                        <div className="relative w-24 shrink-0">
                          <KeyboardPreview
                            layout={item.layout as "65" | "75" | "100"}
                            caseColor={item.caseColor}
                            keycapColor={item.keycapColor}
                            className="w-full h-24"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-display font-medium text-primary">{item.case} {item.keycaps}</h3>
                          <p className="text-sm text-muted-foreground">{item.layout} layout</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="ml-4 flex h-6 w-6 items-center justify-center rounded-md"
                          onClick={() => removeItem(item.id)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                  {items.length === 0 ? (
                    <div className="p-8 text-center">
                      <h3 className="text-xl font-medium text-muted-foreground mb-2">
                        Your cart is empty
                      </h3>
                      <p className="text-muted-foreground">
                        Pick a layout to start building your keyboard.
                      </p>
                      <Button asChild>
                        <Link to="/customize/75">Start a build</Link>
                      </Button>
                    </div>
                  ) : null}
                </div>

                {/* Summary (right) */}
                <div className="lg:col-span-1 space-y-4 p-6 rounded-xl bg-card">
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <span className="text-xs text-muted-foreground">Subtotal</span>
                      <span className="font-display font-medium tabular-nums">{formatPrice(subtotal)}</span>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground">Shipping</span>
                      <span className="font-medium">{formatPrice(shipping)}</span>
                    </div>
                  </div>
                  <Separator />
                  <div>
                    <span className="text-xs text-muted-foreground">Discount</span>
                    <span className="text-sm">
                      {discountCode ? (
                        <span className="text-primary">-{formatPrice(discount)}</span>
                      ) : (
                        <span className="text-muted-foreground">None</span>
                      )}
                    </span>
                  </div>
                  <div className="border-t border-border pt-4 pb-2">
                    <span className="font-display font-medium text-primary tabular-nums">{formatPrice(total)}</span>
                    <span className="text-xs text-muted-foreground ml-2">Total</span>
                  </div>
                  {items.length ? (
                  <Button size="lg" className="w-full h-12 px-6" asChild>
                    <Link to="/checkout">Checkout</Link>
                  </Button>
                  ) : (
                  <Button variant="outline" size="lg" className="w-full h-12 px-6" asChild>
                    <Link to="/keyboards">Browse keyboards</Link>
                  </Button>
                  )}
                </div>
              </div>
            </section>

            {/* Discount code field */}
            <section className="mb-8">
              <div className="rounded-xl bg-card p-4">
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className={cn(
                      "w-full rounded-md border-border px-3 py-2 text-body focus:outline-none focus:border-primary",
                      "placeholder:text-muted-foreground"
                    )}
                    placeholder="Apply discount code"
                  />
                  <Button variant="outline" size="sm" onClick={() => {
                    if (discountCode === "WELCOME10") {
                      window.alert("Discount applied: 10% off!")
                    } else if (discountCode) {
                      window.alert("Invalid discount code")
                    } else {
                      window.alert("Enter a discount code")
                    }
                  }}>
                    <span className="self-center text-sm">Apply</span>
                  </Button>
                </div>
              </div>
            </section>

            {/* Sign in prompt for saving design */}
            {showSignInPrompt && (
              <section className="mb-8">
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center">
                  <div className="bg-white rounded-2xl p-8 max-w-sm w-full border-border">
                    <h3 className="font-display font-medium text-primary mb-4">
                      Sign in to save your design
                    </h3>
                    <p className="text-muted-foreground text-sm mb-6">
                      Your design will be lost if you leave without signing in.
                    </p>
                    <div className="flex gap-3">
                      <Button variant="outline" size="sm" onClick={() => setShowSignInPrompt(false)}>
                        Not now
                      </Button>
                      <Button size="sm" onClick={() => setShowSignInPrompt(false)}>
                        Sign in
                      </Button>
                    </div>
                  </div>
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
  )
}