
import { useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { KeyboardPreview } from "@/components/app/KeyboardPreview"
import { MapPin, CreditCard, Printer, ArrowLeft } from "lucide-react"
import { Link } from "react-router-dom"

export function AdminOrderDetailPage() {
  const { id } = useParams<{ id: string }>()

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/admin/orders">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-display text-3xl font-bold tracking-tight">Order {id}</h1>
          <Badge variant="warning">Building</Badge>
        </div>
        <Button>
          <Printer className="h-4 w-4 mr-2" />
          Print label
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display">Build details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-6">
                <KeyboardPreview layout="75" caseColor="#B9A6E8" keycapColor="#F3EEE3" className="w-48 h-32" />
                <div className="space-y-2">
                  <h3 className="font-display font-semibold text-lg">75% Lilac Aluminium</h3>
                  <p className="text-sm text-muted-foreground">Case: Aluminium Lilac · Keycaps: Ivory · Switches: Boba U4T</p>
                  <p className="text-sm text-muted-foreground">Wireless: Bluetooth · Firmware: ZMK</p>
                  <Badge variant="secondary" className="mt-2">Build started: 13 Oct 2026</Badge>
                </div>
              </div>
              <Separator />
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Build stages</p>
                  <p className="font-medium">PCB assembly → Switch soldering → Case assembly → QC</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Assigned to</p>
                  <p className="font-medium">Ravi K.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Timeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { status: "Order placed", date: "12 Oct 2026 10:30 AM", completed: true },
                  { status: "Payment confirmed", date: "12 Oct 2026 10:35 AM", completed: true },
                  { status: "Build started", date: "13 Oct 2026 09:00 AM", completed: true },
                  { status: "QC pending", date: "—", completed: false },
                  { status: "Shipped", date: "—", completed: false },
                ].map((item) => (
                  <div key={item.status} className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${item.completed ? 'bg-success' : 'bg-muted'}`} />
                    <div className="flex-1">
                      <p className={`font-medium ${item.completed ? '' : 'text-muted-foreground'}`}>{item.status}</p>
                      <p className="text-xs text-muted-foreground">{item.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Customer
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p className="font-medium">John Doe</p>
              <p className="text-muted-foreground">john@example.com</p>
              <p className="text-muted-foreground">+91 98765 43210</p>
              <Separator />
              <address className="not-italic text-muted-foreground">
                123 Keyboard Lane<br />
                Bangalore, Karnataka 560001<br />
                India
              </address>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <p><span className="text-muted-foreground">Subtotal:</span> <span className="font-medium">₹12,499</span></p>
              <p><span className="text-muted-foreground">Shipping:</span> <span className="font-medium">₹150</span></p>
              <Separator />
              <p><span className="text-muted-foreground">Total:</span> <span className="font-medium">₹12,649</span></p>
              <p className="text-muted-foreground text-xs pt-2">Paid via Razorpay</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="font-display">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button className="w-full" variant="outline">Mark as shipped</Button>
              <Button className="w-full" variant="outline">Contact customer</Button>
              <Button className="w-full" variant="outline">Add notes</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}