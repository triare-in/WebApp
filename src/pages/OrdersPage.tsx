"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { ChevronRight } from "lucide-react"

const orders = [
  { id: "RVR-1042", date: "12 Oct 2026", status: "Building", total: "₹12,499" },
  { id: "RVR-0977", date: "28 Aug 2026", status: "Delivered", total: "₹9,850" },
  { id: "RVR-0951", date: "14 Aug 2026", status: "Payment failed", total: "₹4,200" },
]

export function OrdersPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background font-body">
      <div className="flex-1">
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="font-display text-3xl font-bold tracking-tight mb-8">My orders</h1>
          <Card className="overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-accent/50 cursor-pointer">
                    <TableCell className="font-mono">{order.id}</TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell>
                      <Badge variant={order.status === "Delivered" ? "success" : order.status === "Building" ? "warning" : "destructive"}>
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right tabular-nums">{order.total}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/orders/${order.id}`}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </section>
      </div>

    </div>
  )
}