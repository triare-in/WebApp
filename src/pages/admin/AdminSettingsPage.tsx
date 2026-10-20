"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Settings, Mail, Webhook } from "lucide-react"

export function AdminSettingsPage() {
  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="font-display text-3xl font-bold tracking-tight">Settings</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Store settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label>Store name</Label>
            <Input defaultValue="Triare" />
          </div>
          <div className="space-y-2">
            <Label>Support email</Label>
            <Input defaultValue="support@triare.in" />
          </div>
          <div className="space-y-2">
            <Label>Default currency</Label>
            <Input defaultValue="INR" />
          </div>
          <Button>Save changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Mail className="h-5 w-5" />
            Email notifications
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Order confirmations</p>
              <p className="text-sm text-muted-foreground">Send email when orders are placed</p>
            </div>
            <Button variant="outline" size="sm">Enabled</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="font-medium">Build updates</p>
              <p className="text-sm text-muted-foreground">Send email on build status changes</p>
            </div>
            <Button variant="outline" size="sm">Enabled</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="font-display flex items-center gap-2">
            <Webhook className="h-5 w-5" />
            Integrations
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Razorpay</p>
              <p className="text-sm text-muted-foreground">Payment processing</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Supabase</p>
              <p className="text-sm text-muted-foreground">Database & auth</p>
            </div>
            <Button variant="outline" size="sm">Configure</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}