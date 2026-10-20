"use client"


export function PrivacyPolicyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">Privacy policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8">
            <div>
              <h2 className="font-display text-2xl font-semibold">Data we collect</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                We collect account information, shipping address, order details, and payment data to process your purchases. We do not sell personal data.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">How we use your data</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Data is used to process orders, provide support, communicate about your order, and improve our services. Marketing emails may be sent with opt-out option.
              </p>
            </div>
            <div>
              <h2 className="font-display text-2xl font-semibold">Data retention</h2>
              <p className="text-muted-foreground leading-relaxed mt-3">
                Personal data is retained for the duration required for order fulfillment and warranty support, plus 3 years for legal compliance.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}