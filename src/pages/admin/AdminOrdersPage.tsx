
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Search, Eye } from "lucide-react"
import { OrderStatusBadge, type OrderStatus } from "@/components/app/OrderStatusBadge"

const orders = [
  { id: "RVR-1042", date: "12 Oct 2026", customer: "John Doe", total: "₹12,499", status: "Building", layout: "75%" },
  { id: "RVR-1041", date: "11 Oct 2026", customer: "Priya S.", total: "₹9,850", status: "Paid", layout: "65%" },
  { id: "RVR-1040", date: "10 Oct 2026", customer: "Amit K.", total: "₹15,200", status: "Shipped", layout: "100%" },
  { id: "RVR-1039", date: "09 Oct 2026", customer: "Sara M.", total: "₹11,999", status: "Delivered", layout: "75%" },
  { id: "RVR-1038", date: "08 Oct 2026", customer: "Rahul P.", total: "₹18,500", status: "Building", layout: "100%" },
] satisfies readonly { id: string; date: string; customer: string; total: string; status: OrderStatus; layout: string }[]

export function AdminOrdersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-display text-3xl font-bold tracking-tight">Orders</h1>
        <div className="flex flex-col gap-2 sm:flex-row">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" aria-hidden="true" />
            <Input aria-label="Search orders" placeholder="Search orders..." className="w-full pl-9" />
          </div>
          <Button className="w-full sm:w-auto">Export CSV</Button>
        </div>
      </div>

      <Card className="overflow-hidden py-0 gap-0">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Layout</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead><span className="sr-only">Actions</span></TableHead>
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
                      <OrderStatusBadge status={order.status} />
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="sm" asChild>
                        <Link to={`/admin/orders/${order.id}`}>
                          <Eye className="mr-1 size-4" aria-hidden="true" />
                          View
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}