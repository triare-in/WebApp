
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Plus, Copy, Trash2, Percent } from "lucide-react"

const discounts = [
  { code: "WELCOME10", percent: "10%", uses: "124", expires: "Dec 2026", active: true },
  { code: "TRIARE20", percent: "20%", uses: "45", expires: "Nov 2026", active: true },
  { code: "SUMMER15", percent: "15%", uses: "89", expires: "Sep 2026", active: false },
]

export function AdminDiscountsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Discount codes</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create code
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Active codes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="divide-y divide-border">
            {discounts.map((discount) => (
              <div key={discount.code} className="flex items-center justify-between py-4 first:pt-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Percent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-mono font-medium">{discount.code}</p>
                    <p className="text-sm text-muted-foreground">{discount.percent} off · {discount.uses} uses · Expires {discount.expires}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={discount.active ? "success" : "secondary"}>{discount.active ? "Active" : "Expired"}</Badge>
                  <Button variant="ghost" size="icon">
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}