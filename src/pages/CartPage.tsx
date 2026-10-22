import { Link } from "react-router-dom"
import { useState } from "react"
import { toast } from "sonner"
import { X } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/hooks/use-cart"
import { formatPrice, SHIPPING_FEE } from "@/lib/catalog"

export function CartPage() {
  const { items, removeItem } = useCart()
  const [discountCode, setDiscountCode] = useState("")
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const shipping = items.length > 0 ? SHIPPING_FEE : 0
  const total = subtotal + shipping

  const handleApplyCode = () => {
    if (!discountCode.trim()) {
      toast.error("Enter a discount code first.")
      return
    }
    toast.info("Discount codes cannot be verified in this preview.")
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
      <header className="mb-8 flex items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Review your build before checkout</p>
          <h1 className="font-display text-3xl font-bold tracking-tight">Your cart</h1>
        </div>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {items.length} {items.length === 1 ? "build" : "builds"}
        </span>
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div>
          {items.length ? (
            <ul className="divide-y divide-border border-y border-border">
              {items.map((item) => (
                <li key={item.id} className="grid grid-cols-[6rem_minmax(0,1fr)_auto] items-center gap-4 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_auto]">
                  <div className="rounded-lg bg-muted/60 p-2">
                    <KeyboardPreview layout={item.layout} caseColor={item.caseColor} keycapColor={item.keycapColor} />
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-display font-semibold">{item.layout}% {item.case}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.keycaps} keycaps{item.switch ? ` · ${item.switch} switches` : ""}
                    </p>
                    <p className="mt-2 font-medium tabular-nums">{formatPrice(item.price)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Remove ${item.layout}% ${item.case} build`}
                    onClick={() => {
                      if (!removeItem(item.id)) toast.error("Could not update your cart.")
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </li>
              ))}
            </ul>
          ) : (
            <div className="border-y border-border py-12">
              <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
              <p className="mt-2 text-muted-foreground">Choose a keyboard or start with a custom build.</p>
              <Button className="mt-5" asChild><Link to="/keyboards">Browse keyboards</Link></Button>
            </div>
          )}

          <div className="mt-8 max-w-md">
            <Label htmlFor="discount-code">Discount code</Label>
            <div className="mt-2 flex gap-2">
              <Input
                id="discount-code"
                value={discountCode}
                onChange={(event) => setDiscountCode(event.target.value)}
                autoComplete="off"
                placeholder="Enter a code"
              />
              <Button variant="outline" onClick={handleApplyCode}>Apply</Button>
            </div>
          </div>
        </div>

        <aside className="border-t border-border pt-5 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <h2 className="font-display text-xl font-semibold">Order summary</h2>
          <dl className="mt-5 space-y-3 text-sm">
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Subtotal</dt>
              <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-muted-foreground">Shipping within India</dt>
              <dd className="font-medium tabular-nums">{formatPrice(shipping)}</dd>
            </div>
          </dl>
          <div className="mt-5 flex justify-between border-t border-border pt-4">
            <span className="font-semibold">Total</span>
            <span className="font-display text-lg font-bold tabular-nums">{formatPrice(total)}</span>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Flat-rate delivery within India. Final charges are shown before payment.
          </p>
          <Button className="mt-5 w-full" size="lg" disabled={!items.length} asChild={Boolean(items.length)}>
            {items.length ? <Link to="/checkout">Continue to checkout</Link> : "Continue to checkout"}
          </Button>
          <Link to="/keyboards" className="mt-4 block text-center text-sm text-primary hover:underline">
            Continue browsing
          </Link>
        </aside>
      </div>
    </section>
  )
}
