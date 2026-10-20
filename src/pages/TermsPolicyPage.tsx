"use client"


export function TermsPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Terms of service</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Use of service</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                You agree to use Triare website and services only for lawful purposes. Custom orders are final once production begins.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Product details</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Keyboard configurations are provided as-is. Colors may vary slightly due to manufacturing. Wireless range varies by environment.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Intellectual property</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Triare brand, logos, and designs are protected. Configurations created via configurator remain the user's design.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Limitation of liability</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Triare is not liable for indirect damages exceeding purchase price. Warranty terms supersede these terms for defects.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}