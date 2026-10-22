
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, MessageCircle, Package, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"

export function ClaimPage() {
  const [dragOver, setDragOver] = useState(false)

  return (
    <div className="flex flex-col bg-background font-body">

      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="max-w-4xl">
            <h1 className="font-display text-3xl font-bold tracking-tight mb-2">Raise a warranty claim</h1>
            <p className="text-muted-foreground mb-8">Get free diagnosis and repair for any issues within warranty period</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Order details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-lg border border-border">
                      <div className="w-20 h-20 bg-muted rounded-lg flex items-center justify-center shrink-0">
                        <Package className="h-10 w-10 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium">RVR-1042 – 75% Lilac Aluminium</h4>
                        <p className="text-sm text-muted-foreground">Delivered on 12 Oct 2026</p>
                        <Badge variant="success" className="mt-2">Under warranty</Badge>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Claim type</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select an issue" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="switch-issue">Switch not working</SelectItem>
                            <SelectItem value="case-damage">Case damage</SelectItem>
                            <SelectItem value="keycap-stuck">Keycap stuck/missing</SelectItem>
                            <SelectItem value="battery-issue">Battery/Wireless issue</SelectItem>
                            <SelectItem value="visual-defect">Visual defect</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="space-y-2">
                        <Label>Severity</Label>
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="How bad is it?" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="minor">Minor – cosmetic</SelectItem>
                            <SelectItem value="moderate">Moderate – affects use</SelectItem>
                            <SelectItem value="critical">Critical – keyboard unusable</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Describe the issue</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="description">What happened?</Label>
                      <Textarea
                        id="description"
                        placeholder="Describe the issue in detail..."
                        className="min-h-32"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Upload photos or videos</Label>
                      <div
                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${dragOver ? "border-primary bg-primary/5" : "border-border hover:border-primary"}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false) }}
                      >
                        <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-3" />
                        <p className="font-medium mb-1">Drag files here or click to upload</p>
                        <p className="text-sm text-muted-foreground">PNG, JPG up to 10MB each</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">How would you like us to proceed?</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <label className="relative flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:border-primary transition-colors">
                        <input type="radio" name="preference" className="mt-0.5" defaultChecked />
                        <div>
                          <h4 className="font-medium">Repair at Revara</h4>
                          <p className="text-sm text-muted-foreground">Send keyboard to us, we'll repair and ship back</p>
                        </div>
                      </label>
                      <label className="relative flex cursor-pointer items-start gap-3 rounded-xl border border-border p-4 hover:border-primary transition-colors">
                        <input type="radio" name="preference" className="mt-0.5" />
                        <div>
                          <h4 className="font-medium">DIY guide</h4>
                          <p className="text-sm text-muted-foreground">Get step-by-step repair guide and parts</p>
                        </div>
                      </label>
                    </div>
                    <Button className="w-full">Submit claim</Button>
                  </CardContent>
                </Card>
              </div>

              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="font-display">Need help deciding?</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      Most issues can be fixed by replacing a single part. Check if it's a switch or keycap issue first.
                    </p>
                    <Button variant="outline" className="w-full">
                      <MessageCircle className="h-4 w-4 mr-2" />
                      Chat with support
                    </Button>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="font-display flex items-center gap-2">
                      <AlertCircle className="h-5 w-5" />
                      Warranty info
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Warranty valid until</span>
                      <span className="font-medium">12 Oct 2027</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Coverage</span>
                      <span className="font-medium">1 year</span>
                    </div>
                    <Separator />
                    <p className="text-xs text-muted-foreground">
                      Claims usually processed in 2-3 business days
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </div>

    </div>
  )
}