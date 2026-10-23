
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Eye, User } from "lucide-react"

const customers = [
  { id: "C-001", name: "John Doe", email: "john@example.com", orders: 3, total: "₹34,249", joined: "Aug 2026", verified: true },
  { id: "C-002", name: "Priya S.", email: "priya@example.com", orders: 1, total: "₹9,850", joined: "Oct 2026", verified: true },
  { id: "C-003", name: "Amit K.", email: "amit@example.com", orders: 2, total: "₹27,199", joined: "Jul 2026", verified: false },
]

export function AdminCustomersPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-display text-3xl font-bold tracking-tight">Customers</h1>

      <Card>
        <CardHeader>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <CardTitle className="font-display">All customers</CardTitle>
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
              <Input aria-label="Search customers" placeholder="Search customers..." className="w-full pl-9" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div key={customer.id} className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex min-w-0 items-center gap-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-muted">
                    <User className="size-5 text-muted-foreground" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="break-all text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="sm:text-right">
                  <p className="text-sm font-medium">{customer.orders} orders · {customer.total}</p>
                  <p className="text-xs text-muted-foreground">Joined {customer.joined}</p>
                </div>
                <div className="flex items-center gap-2 self-end sm:self-auto">
                  {customer.verified && <Badge variant="success">Verified</Badge>}
                  <Button variant="ghost" size="icon" aria-label={`View ${customer.name}`}>
                    <Eye className="size-4" aria-hidden="true" />
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