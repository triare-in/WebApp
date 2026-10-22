
import { Link, useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"

const statusSteps = [
  { label: "Placed", completed: true },
  { label: "Paid", completed: true },
  { label: "Building", completed: false, current: true },
  { label: "Shipped", completed: false },
  { label: "Delivered", completed: false },
]

export function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="flex flex-col bg-background font-body">

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="font-display text-2xl font-bold tracking-tight">Order {id}</h1>
              <p className="text-muted-foreground text-sm mt-1">12 Oct 2026</p>
            </div>
            <Badge variant="warning" className="text-sm">Building</Badge>
          </div>

          {/* Status stepper */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex items-center">
                {statusSteps.map((step, index) => (
                  <div key={step.label} className="flex items-center flex-1">
                    <div className="flex items-center gap-2">
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium",
                        step.completed ? "bg-success text-white" :
                        step.current ? "bg-primary text-primary-foreground" :
                        "bg-muted text-muted-foreground"
                      )}>
                        {step.completed ? <Check className="h-4 w-4" /> : index + 1}
                      </div>
                      <span className={cn(
                        "text-sm font-medium hidden sm:block",
                        step.completed ? "text-success" :
                        step.current ? "text-primary" :
                        "text-muted-foreground"
                      )}>
                        {step.label}
                      </span>
                    </div>
                    {index < statusSteps.length - 1 && (
                      <div className={cn(
                        "flex-1 h-0.5 mx-2",
                        step.completed ? "bg-success" : "bg-muted"
                      )} />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Order details grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Items */}
            <Card>
              <CardHeader>
                <CardTitle className="font-display">Items</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4 p-4 rounded-lg border border-border">
                  <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                    <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-full h-full" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-display font-medium">75% Lilac Aluminium</h3>
                    <p className="text-sm text-muted-foreground">Aluminium case · Lilac · Ivory keycaps · Bluetooth wireless</p>
                    <p className="text-sm font-medium tabular-nums mt-2">₹12,499</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Shipping & Payment */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Shipping address</CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic text-sm text-muted-foreground space-y-1">
                    <p>John Doe</p>
                    <p>123 Keyboard Lane</p>
                    <p>Bangalore, Karnataka 560001</p>
                    <p>India</p>
                    <p className="mt-2">+91 98765 43210</p>
                  </address>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Payment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <p><span className="font-medium">Subtotal:</span> <span className="tabular-nums">₹12,499</span></p>
                  <p><span className="font-medium">Shipping:</span> <span className="tabular-nums">₹150</span></p>
                  <p><span className="font-medium">Discount:</span> <span className="tabular-nums">₹0</span></p>
                  <Separator />
                  <p className="font-medium"><span className="font-medium">Total:</span> <span className="tabular-nums text-primary">₹12,649</span></p>
                  <p className="text-muted-foreground">Paid via Razorpay (Credit Card)</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Warranty</CardTitle>
                </CardHeader>
                <CardContent>
                  <Badge variant="success" className="text-sm mb-2">Active until 12 Oct 2027</Badge>
                  <p className="text-sm text-muted-foreground">
                    1-year warranty on this product. <Link to="/support/claim" className="text-primary underline">Raise a claim</Link> if needed.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}