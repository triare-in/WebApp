import { useState } from "react"
import { toast } from "sonner"
import { Field } from "@/components/app/Field"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Settings, Webhook } from "lucide-react"

export function AdminSettingsPage() {
  const [orderConfirmations, setOrderConfirmations] = useState(true)
  const [buildUpdates, setBuildUpdates] = useState(true)

  return (
    <div className="max-w-4xl space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Settings className="size-5" aria-hidden="true" />
            Store settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field id="store-name" label="Store name"><Input id="store-name" defaultValue="Revara" /></Field>
            <Field id="default-currency" label="Default currency"><Input id="default-currency" defaultValue="INR" /></Field>
            <Field id="support-email" label="Support email"><Input id="support-email" type="email" placeholder="Set before launch" /></Field>
            <Field id="support-phone" label="Support phone"><Input id="support-phone" type="tel" placeholder="Set before launch" /></Field>
            <Field id="support-hours" label="Support hours"><Input id="support-hours" placeholder="Set before launch" /></Field>
            <Field id="shipping-rate" label="Flat shipping rate (INR)"><Input id="shipping-rate" type="number" min="0" defaultValue="150" /></Field>
            <Field id="build-time" label="Estimated build time"><Input id="build-time" defaultValue="10–14 days" /></Field>
          </div>
          <Field id="returns-address" label="Returns address">
            <Textarea id="returns-address" placeholder="Add the approved returns address before launch." />
          </Field>
          <div>
            <h2 className="mb-3 text-sm font-medium">Grievance officer details</h2>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Field id="grievance-name" label="Name"><Input id="grievance-name" placeholder="Set before launch" /></Field>
              <Field id="grievance-email" label="Email"><Input id="grievance-email" type="email" placeholder="Set before launch" /></Field>
              <Field id="grievance-phone" label="Phone"><Input id="grievance-phone" type="tel" placeholder="Set before launch" /></Field>
            </div>
          </div>
          <Button onClick={() => toast.info("Settings are not connected in this preview.")}>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Mail className="size-5" aria-hidden="true" />
            Email notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Label htmlFor="order-confirmations" className="flex cursor-pointer items-center justify-between gap-4 py-2">
            <span>
              <span className="block font-medium">Order confirmations</span>
              <span id="order-confirmations-description" className="block text-sm font-normal text-muted-foreground">Send email when orders are placed</span>
            </span>
            <Switch
              id="order-confirmations"
              aria-describedby="order-confirmations-description"
              checked={orderConfirmations}
              onCheckedChange={setOrderConfirmations}
            />
          </Label>
          <Separator />
          <Label htmlFor="build-updates" className="flex cursor-pointer items-center justify-between gap-4 py-2">
            <span>
              <span className="block font-medium">Build updates</span>
              <span id="build-updates-description" className="block text-sm font-normal text-muted-foreground">Send email on build status changes</span>
            </span>
            <Switch
              id="build-updates"
              aria-describedby="build-updates-description"
              checked={buildUpdates}
              onCheckedChange={setBuildUpdates}
            />
          </Label>
          <p className="text-sm text-muted-foreground">Notification preferences are preview-only and are not saved.</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-display">
            <Webhook className="size-5" aria-hidden="true" />
            Connections
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Payment processing</p>
              <p className="text-sm text-muted-foreground">Checkout is a preview and does not process payments.</p>
            </div>
            <Badge variant="outline">Not connected</Badge>
          </div>
          <Separator />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="font-medium">Store data and authentication</p>
              <p className="text-sm text-muted-foreground">Orders and accounts are not connected to a backend.</p>
            </div>
            <Badge variant="outline">Not connected</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
