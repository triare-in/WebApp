"use client"


export function WarrantyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Warranty policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Coverage period</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                All Triare keyboards include a 1-year warranty from date of delivery covering manufacturing defects in case, PCB, switches, and wireless module.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">What's covered</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Manufacturing defects including faulty switches, PCB issues, wireless connectivity problems, and case defects. Normal wear and tear is not covered.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Making a claim</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Raise a claim through your account within the warranty period. Provide photos and description of the issue. Most claims are resolved in 2-3 business days.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Limitations</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Warranty does not cover damage from misuse, drops, spills, unauthorized modifications, or cosmetic wear. Keycaps and switches may be user-replaceable parts outside warranty coverage.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}