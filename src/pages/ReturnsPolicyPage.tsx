"use client"


export function ReturnsPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Returns and refunds</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Custom builds</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Because each keyboard is custom-assembled, custom configurations generally cannot be returned for refund. If there is a manufacturing defect, contact support for a warranty claim within 30 days.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Preset keyboards</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Preset keyboards may be returned within 7 days of delivery in original condition for a full refund. Customer pays return shipping.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Refund process</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Refunds are issued to the original payment method within 5–7 business days of receiving the returned item. Refund amounts exclude shipping.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}