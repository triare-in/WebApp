"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Eye } from "lucide-react"

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
          <div className="flex items-center justify-between">
            <CardTitle className="font-display">All customers</CardTitle>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search customers..." className="pl-9 w-64" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {customers.map((customer) => (
              <div key={customer.id} className="flex items-center justify-between p-4 rounded-lg border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                    <span className="text-sm font-medium">{customer.name.split(" ").map(n => n[0]).join("")}</span>
                  </div>
                  <div>
                    <p className="font-medium">{customer.name}</p>
                    <p className="text-sm text-muted-foreground">{customer.email}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{customer.orders} orders · {customer.total}</p>
                  <p className="text-xs text-muted-foreground">Joined {customer.joined}</p>
                </div>
                <div className="flex items-center gap-2">
                  {customer.verified && <Badge variant="success">Verified</Badge>}
                  <Button variant="ghost" size="icon">
                    <Eye className="h-4 w-4" />
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