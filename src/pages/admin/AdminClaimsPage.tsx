
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const claims = [
  { id: "C-1024", orderId: "RVR-0977", customer: "John Doe", issue: "Switch not working", date: "12 Oct 2026", status: "Open" },
  { id: "C-1023", orderId: "RVR-0951", customer: "Priya S.", issue: "Keycap stuck", date: "11 Oct 2026", status: "In progress" },
  { id: "C-1022", orderId: "RVR-0945", customer: "Amit K.", issue: "Battery drain", date: "10 Oct 2026", status: "Resolved" },
]

export function AdminClaimsPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Warranty claims</h1>

      <Card>
        <CardHeader>
          <CardTitle className="font-display">Active claims</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {claims.map((claim) => (
              <div key={claim.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <p className="font-mono font-medium">{claim.id}</p>
                    <Badge variant={claim.status === "Open" ? "destructive" : claim.status === "In progress" ? "warning" : "success"}>{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Order {claim.orderId} · {claim.customer} · {claim.date}</p>
                  <p className="text-sm mt-1">{claim.issue}</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
                  </Button>
                  {claim.status === "Open" && (
                    <>
                      <Button size="sm" variant="outline">Assign</Button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}