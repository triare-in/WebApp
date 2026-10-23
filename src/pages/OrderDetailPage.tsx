import { Link, useParams } from "react-router-dom"
import { Check } from "lucide-react"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { PageContainer } from "@/components/app/PageContainer"
import { Badge } from "@/components/ui/badge"
import { OrderStatusBadge } from "@/components/app/OrderStatusBadge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const statusSteps = [
  { label: "Placed", completed: true },
  { label: "Paid", completed: true },
  { label: "Building", completed: false, current: true },
  { label: "Shipped", completed: false },
  { label: "Delivered", completed: false },
]

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const orderId = id ?? "Unknown"
  const isDelivered = orderId === "RVR-0977"
  const currentStep = isDelivered ? statusSteps.length - 1 : statusSteps.findIndex((step) => step.current)
  const orderDate = isDelivered ? "28 Aug 2026" : "12 Oct 2026"

  return (
    <PageContainer>
      <Link to="/orders" className="mb-5 inline-flex text-sm text-primary underline-offset-4 hover:underline">
        Back to orders
      </Link>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Order {orderId}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{orderDate}</p>
        </div>
        <OrderStatusBadge status={isDelivered ? "Delivered" : "Building"} />
      </div>

      <Card className="mb-8">
        <CardContent className="p-6">
          <ol aria-label="Order progress" className="flex items-center">
            {statusSteps.map((step, index) => {
              const completed = isDelivered ? index < currentStep : step.completed
              const current = isDelivered ? index === currentStep : step.current
              return (
              <li key={step.label} className="flex min-w-0 flex-1 items-center">
                <div className="flex min-w-0 items-center gap-2">
                  <span
                    className={cn(
                      "flex size-8 shrink-0 items-center justify-center rounded-full text-xs font-medium",
                      completed ? "bg-success text-success-foreground" :
                        current ? "bg-primary text-primary-foreground" :
                          "bg-muted text-muted-foreground"
                    )}
                    aria-current={current ? "step" : undefined}
                  >
                    {completed ? <Check className="size-4" aria-hidden="true" /> : index + 1}
                  </span>
                  <span className={cn(
                    "hidden truncate text-sm font-medium sm:block",
                    completed ? "text-success" : current ? "text-primary" : "text-muted-foreground"
                  )}>
                    {step.label}
                  </span>
                </div>
                {index < statusSteps.length - 1 && (
                  <span className={cn("mx-2 h-0.5 min-w-2 flex-1", completed ? "bg-success" : "bg-border")} aria-hidden="true" />
                )}
              </li>
              )
            })}
          </ol>
          <p className="mt-4 text-sm font-medium sm:hidden">
            Step {currentStep + 1} of {statusSteps.length}: {statusSteps[currentStep]?.label}
          </p>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle className="font-display">Items</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex min-w-0 items-start gap-4 rounded-lg border border-border p-4">
              <div className="w-28 shrink-0 rounded-lg bg-muted p-2">
                <KeyboardPreview
                  layout="75"
                  caseColor="#B9A6E8"
                  keycapColor="#F3EEE3"
                  caseName="Lilac"
                  keycapName="Ivory"
                />
              </div>
              <div className="min-w-0 flex-1">
                <h3 className="font-display font-medium">75% Lilac Aluminium</h3>
                <p className="mt-1 text-sm text-muted-foreground">Aluminium case · Lilac · Ivory keycaps · Bluetooth wireless</p>
                <p className="mt-2 text-sm font-medium tabular-nums">₹12,499</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader><CardTitle className="font-display">Shipping address</CardTitle></CardHeader>
            <CardContent>
              <address className="space-y-1 text-sm not-italic text-muted-foreground">
                <p>John Doe</p>
                <p>123 Keyboard Lane</p>
                <p>Bangalore, Karnataka 560001</p>
                <p>India</p>
                <p className="pt-2">+91 98765 43210</p>
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Payment</CardTitle></CardHeader>
            <CardContent className="space-y-3 text-sm">
              <dl className="space-y-3">
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Subtotal</dt><dd className="tabular-nums">₹12,499</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Shipping</dt><dd className="tabular-nums">₹150</dd></div>
                <div className="flex justify-between gap-4"><dt className="text-muted-foreground">Discount</dt><dd className="tabular-nums">₹0</dd></div>
                <div className="flex justify-between gap-4 border-t border-border pt-3 font-semibold"><dt>Total</dt><dd className="tabular-nums text-primary">₹12,649</dd></div>
              </dl>
              <p className="text-muted-foreground">Paid via Razorpay (Credit Card)</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader><CardTitle className="font-display">Warranty</CardTitle></CardHeader>
            <CardContent>
              {isDelivered ? (
                <Badge variant="success" className="mb-2">Active until 28 Aug 2027</Badge>
              ) : (
                <Badge variant="outline" className="mb-2">Starts on delivery</Badge>
              )}
              <p className="text-sm text-muted-foreground">
                12-month warranty coverage begins on delivery.{" "}
                <Link to={`/support/claim?order=${encodeURIComponent(orderId)}`} className="text-primary underline underline-offset-4">
                  Raise a claim
                </Link>{" "}
                if needed.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
      <p className="mt-8 text-sm text-muted-foreground">Custom-built keyboards can&apos;t be returned or exchanged.</p>
    </PageContainer>
  )
}
