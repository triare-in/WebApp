"use client"


export function ShippingPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Shipping policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Delivery times</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Each Triare keyboard is hand-assembled to your specifications. Standard production takes 7–10 business days after order confirmation. Add 2–4 days for shipping within India, and 7–14 days for international orders.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Shipping methods</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We ship via Blue Dart and Delhivery for domestic orders. International orders ship via DHL. You will receive tracking information once your order ships.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Shipping costs</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Shipping is ₹150 for orders within India. International shipping is calculated at checkout based on destination. Free shipping on orders above ₹15,000.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Order modifications</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Contact us within 24 hours of placing your order to make changes. Once production begins, no modifications can be made.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}