import type { CartItem } from "@/hooks/use-cart"
import { formatPrice } from "@/lib/catalog"

interface OrderSummaryProps {
  items: readonly CartItem[]
  shipping: number
  discount: number
  showTitle?: boolean
}

export function OrderSummary({ items, shipping, discount, showTitle = true }: OrderSummaryProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const total = subtotal + shipping - discount

  return (
    <section
      aria-labelledby={showTitle ? "order-summary-title" : undefined}
      aria-label={showTitle ? undefined : "Order totals"}
    >
      {showTitle && <h2 id="order-summary-title" className="font-display text-xl font-semibold">Order summary</h2>}
      <ul className="mt-4 divide-y divide-border border-y border-border">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4 py-3 text-sm">
            <span className="min-w-0 text-muted-foreground">
              {item.layout}% {item.case} · {item.keycaps}
              {item.switch ? ` · ${item.switch}` : ""}
            </span>
            <span className="shrink-0 font-medium tabular-nums">{formatPrice(item.price)}</span>
          </li>
        ))}
      </ul>
      <dl className="mt-4 space-y-3 text-sm">
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Subtotal</dt>
          <dd className="font-medium tabular-nums">{formatPrice(subtotal)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Shipping within India</dt>
          <dd className="font-medium tabular-nums">{formatPrice(shipping)}</dd>
        </div>
        <div className="flex justify-between gap-4">
          <dt className="text-muted-foreground">Discount</dt>
          <dd className="font-medium tabular-nums">−{formatPrice(discount)}</dd>
        </div>
        <div className="flex justify-between gap-4 border-t border-border pt-4">
          <dt className="font-semibold">Total</dt>
          <dd className="font-display text-lg font-bold tabular-nums">{formatPrice(total)}</dd>
        </div>
      </dl>
    </section>
  )
}
