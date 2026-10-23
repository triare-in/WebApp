import { Link } from "react-router-dom"
import { ChevronRight } from "lucide-react"
import { PageContainer } from "@/components/app/PageContainer"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { OrderStatusBadge, type OrderStatus } from "@/components/app/OrderStatusBadge"

const orders = [
  { id: "RVR-1042", date: "12 Oct 2026", status: "Building", total: "₹12,499" },
  { id: "RVR-0977", date: "28 Aug 2026", status: "Delivered", total: "₹12,649" },
  { id: "RVR-0951", date: "14 Aug 2026", status: "Payment failed", total: "₹4,200" },
] satisfies readonly { id: string; date: string; status: OrderStatus; total: string }[]

export function OrdersPage() {
  return (
    <PageContainer>
      <h1 className="mb-8 font-display text-3xl font-bold tracking-tight">My orders</h1>

      {orders.length === 0 ? (
        <div className="border-y border-border py-12">
          <h2 className="font-display text-xl font-semibold">No orders yet</h2>
          <p className="mt-2 text-muted-foreground">Your keyboard orders will appear here.</p>
          <Button className="mt-5" asChild><Link to="/keyboards">Explore keyboards</Link></Button>
        </div>
      ) : (
        <>
          <div className="space-y-3 md:hidden">
            {orders.map((order) => (
              <Card key={order.id} className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <Link to={`/orders/${order.id}`} className="font-mono font-medium text-primary underline-offset-4 hover:underline">
                      {order.id}
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">{order.date}</p>
                  </div>
                  <OrderStatusBadge status={order.status} />
                </div>
                <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                  <span className="text-sm text-muted-foreground">Total</span>
                  <span className="font-medium tabular-nums">{order.total}</span>
                </div>
                <Button variant="outline" className="mt-3 w-full" asChild>
                  <Link to={`/orders/${order.id}`}>View order</Link>
                </Button>
              </Card>
            ))}
          </div>

          <Card className="hidden overflow-hidden py-0 gap-0 md:block">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                  <TableHead><span className="sr-only">Details</span></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id} className="hover:bg-accent/50">
                    <TableCell className="font-mono">
                      <Link to={`/orders/${order.id}`} className="text-primary underline-offset-4 hover:underline">
                        {order.id}
                      </Link>
                    </TableCell>
                    <TableCell>{order.date}</TableCell>
                    <TableCell><OrderStatusBadge status={order.status} /></TableCell>
                    <TableCell className="text-right tabular-nums">{order.total}</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" asChild>
                        <Link to={`/orders/${order.id}`} aria-label={`View order ${order.id}`}>
                          <ChevronRight className="size-4" aria-hidden="true" />
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </>
      )}
    </PageContainer>
  )
}
