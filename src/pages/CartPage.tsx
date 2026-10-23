import { useState } from "react"
import { Link } from "react-router-dom"
import { toast } from "sonner"
import { X } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { OrderSummary } from "@/components/app/OrderSummary"
import { PageContainer } from "@/components/app/PageContainer"
import { Button } from "@/components/ui/button"
import { Field } from "@/components/app/Field"
import { Input } from "@/components/ui/input"
import { useCart } from "@/hooks/use-cart"
import { SHIPPING_FEE } from "@/lib/catalog"

export function CartPage() {
  const { items, removeItem } = useCart()
  const [discountCode, setDiscountCode] = useState("")

  const handleApplyCode = () => {
    if (!discountCode.trim()) {
      toast.error("Enter a discount code first.")
      return
    }
    toast.info("Discount codes cannot be verified in this preview.")
  }

  if (items.length === 0) {
    return (
      <PageContainer>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your cart</h1>
        <div className="mt-8 border-y border-border py-12">
          <h2 className="font-display text-xl font-semibold">Your cart is empty</h2>
          <p className="mt-2 text-muted-foreground">Choose a keyboard or start with a custom build.</p>
          <Button className="mt-5" asChild><Link to="/keyboards">Browse keyboards</Link></Button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <header className="mb-8 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="mb-2 text-sm text-muted-foreground">Review your build before checkout</p>
          <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Your cart</h1>
        </div>
        <span className="text-sm text-muted-foreground" aria-live="polite">
          {items.length} {items.length === 1 ? "build" : "builds"}
        </span>
      </header>

      <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <div className="min-w-0">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((item) => (
              <li key={item.id} className="grid grid-cols-[5rem_minmax(0,1fr)_2.5rem] items-center gap-3 py-5 sm:grid-cols-[8rem_minmax(0,1fr)_2.5rem] sm:gap-4">
                <div className="rounded-lg bg-muted/60 p-2">
                  <KeyboardPreview layout={item.layout} caseColor={item.caseColor} keycapColor={item.keycapColor} />
                </div>
                <div className="min-w-0">
                  <h2 className="font-display font-semibold">{item.layout}% {item.case}</h2>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.keycaps} keycaps{item.switch ? ` · ${item.switch} switches` : ""}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <span className="text-sm font-medium tabular-nums">{`₹${new Intl.NumberFormat("en-IN").format(item.price)}`}</span>
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
                </div>
              </li>
            ))}
          </ul>

          <div className="mt-8 max-w-md">
            <Field id="discount-code" label="Discount code">
              <div className="flex gap-2">
                <Input
                  id="discount-code"
                  value={discountCode}
                  onChange={(event) => setDiscountCode(event.target.value)}
                  autoComplete="off"
                  placeholder="Enter a code"
                />
                <Button variant="outline" onClick={handleApplyCode}>Apply</Button>
              </div>
            </Field>
          </div>
        </div>

        <aside className="border-t border-border pt-5 lg:sticky lg:top-24 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <OrderSummary items={items} shipping={SHIPPING_FEE} discount={0} />
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            Flat-rate delivery within India. Final charges are shown before payment.
          </p>
          <Button className="mt-5 w-full" size="lg" asChild>
            <Link to="/checkout">Continue to checkout</Link>
          </Button>
          <Link to="/keyboards" className="mt-4 block text-center text-sm text-primary hover:underline">
            Continue browsing
          </Link>
        </aside>
      </div>
    </PageContainer>
  )
}
