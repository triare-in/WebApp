
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

type ClaimStatus = "Submitted" | "Needs more info" | "Approved" | "Replacement shipped" | "Return received" | "Refunded" | "Rejected"

const claims = [
  { id: "C-1024", orderId: "RVR-0977", customer: "John Doe", issue: "Switch not working", date: "12 Oct 2026", status: "Submitted" },
  { id: "C-1023", orderId: "RVR-0951", customer: "Priya S.", issue: "Keycap stuck", date: "11 Oct 2026", status: "Needs more info" },
  { id: "C-1022", orderId: "RVR-0945", customer: "Amit K.", issue: "Battery drain", date: "10 Oct 2026", status: "Replacement shipped" },
] satisfies readonly { id: string; orderId: string; customer: string; issue: string; date: string; status: ClaimStatus }[]

const claimStatusVariant: Record<ClaimStatus, "secondary" | "warning" | "success" | "destructive"> = {
  Submitted: "secondary",
  "Needs more info": "warning",
  Approved: "success",
  "Replacement shipped": "success",
  "Return received": "secondary",
  Refunded: "success",
  Rejected: "destructive",
}

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
              <div key={claim.id} className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-3">
                    <p className="font-mono font-medium">{claim.id}</p>
                    <Badge variant={claimStatusVariant[claim.status]}>{claim.status}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Order {claim.orderId} · {claim.customer} · {claim.date}</p>
                  <p className="mt-1 text-sm">{claim.issue}</p>
                </div>
                <div className="flex gap-2 self-end sm:self-auto">
                  <Button variant="ghost" size="icon" aria-label={`View claim ${claim.id}`}>
                    <Eye className="size-4" aria-hidden="true" />
                  </Button>
                  {claim.status === "Submitted" && (
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