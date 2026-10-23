import { Badge } from "@/components/ui/badge"

export type OrderStatus =
  | "Building"
  | "Paid"
  | "Shipped"
  | "Delivered"
  | "Payment failed"
  | "Cancelled"
  | "Return requested"
  | "Return received"
  | "Refunded"

const statusVariants: Record<OrderStatus, "default" | "secondary" | "destructive" | "success" | "warning"> = {
  Building: "warning",
  Paid: "secondary",
  Shipped: "default",
  Delivered: "success",
  "Payment failed": "destructive",
  Cancelled: "destructive",
  "Return requested": "warning",
  "Return received": "secondary",
  Refunded: "success",
}

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return <Badge variant={statusVariants[status]}>{status}</Badge>
}
