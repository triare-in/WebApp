
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { User, MapPin, ShieldCheck } from "lucide-react"

export function AccountPage() {
  return (
    <div className="flex flex-col bg-background font-body">

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">My account</h1>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <Card className="lg:col-span-1">
              <CardHeader>
                <CardTitle className="font-display">Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-full bg-muted flex items-center justify-center">
                    <User className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-medium">John Doe</h3>
                    <p className="text-sm text-muted-foreground">john@example.com</p>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input id="name" defaultValue="John Doe" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="john@example.com" />
                </div>
                <Button>Save changes</Button>
              </CardContent>
            </Card>

            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Default shipping address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="line1">Address line 1</Label>
                      <Input id="line1" defaultValue="123 Keyboard Lane" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="line2">Address line 2</Label>
                      <Input id="line2" placeholder="Apartment, suite, etc." />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" defaultValue="Bangalore" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pincode">Pincode</Label>
                      <Input id="pincode" defaultValue="560001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" defaultValue="+91 98765 43210" />
                    </div>
                  </div>
                  <Button>Update address</Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display flex items-center gap-2">
                    <ShieldCheck className="h-5 w-5" />
                    Payment privacy
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    Revara does not store payment card, UPI or bank details. Payment methods are entered with the payment provider at checkout.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="font-display">Quick actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Link to="/orders" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <span className="font-medium">My orders history</span>
                    <span className="text-muted-foreground text-sm">View purchases →</span>
                  </Link>
                  <Link to="/account/designs" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <span className="font-medium">Saved designs</span>
                    <span className="text-muted-foreground text-sm">3 designs →</span>
                  </Link>
                  <Link to="/support/claim" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <span className="font-medium">Warranty claims</span>
                    <span className="text-muted-foreground text-sm">Manage claims →</span>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}