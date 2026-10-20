"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"

const orders = [
  { id: "RVR-1042", date: "12 Oct 2026", customer: "John Doe", total: "₹12,499", status: "Building", layout: "75%" },
  { id: "RVR-1041", date: "11 Oct 2026", customer: "Priya S.", total: "₹9,850", status: "Paid", layout: "65%" },
  { id: "RVR-1040", date: "10 Oct 2026", customer: "Amit K.", total: "₹15,200", status: "Shipped", layout: "100%" },
  { id: "RVR-1039", date: "09 Oct 2026", customer: "Sara M.", total: "₹11,999", status: "Delivered", layout: "75%" },
  { id: "RVR-1038", date: "08 Oct 2026", customer: "Rahul P.", total: "₹18,500", status: "Building", layout: "100%" },
]

export function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search orders..." className="pl-9 w-64" />
          </div>
          <Button>Export CSV</Button>
        </div>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Layout</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-mono font-medium">{order.id}</TableCell>
                  <TableCell>{order.date}</TableCell>
                  <TableCell>{order.customer}</TableCell>
                  <TableCell>{order.layout}</TableCell>
                  <TableCell className="tabular-nums">{order.total}</TableCell>
                  <TableCell>
                    <Badge variant={order.status === "Building" ? "warning" : order.status === "Paid" ? "secondary" : order.status === "Shipped" ? "default" : "success"}>
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm" asChild>
                      <Link to={`/admin/orders/${order.id}`}>
                        <Eye className="h-4 w-4 mr-1" />
                        View
                      </Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}