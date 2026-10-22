
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, ShoppingCart, AlertTriangle, IndianRupee } from "lucide-react"
import { Link } from "react-router-dom"

const stats = [
  { label: "Total Revenue", value: "₹4,82,500", change: "+12%", icon: IndianRupee },
  { label: "Orders This Month", value: "124", change: "+8%", icon: ShoppingCart },
  { label: "Build Queue", value: "18", change: "3 urgent", icon: Package, urgent: true },
  { label: "Active Claims", value: "7", change: "2 new", icon: AlertTriangle, urgent: true },
]

export function AdminDashboardPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Overview of Revara operations</p>
        </div>
        <Badge variant="secondary">Last updated 5 min ago</Badge>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Card key={stat.label} className={stat.urgent ? "border-warning/50" : ""}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{stat.label}</CardTitle>
                <Icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className={`text-xs ${stat.urgent ? "text-orange-600" : "text-muted-foreground"} mt-1`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="font-display">Recent Orders</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {[
              { id: "RVR-1042", customer: "John Doe", total: "₹12,499", status: "Building" },
              { id: "RVR-1041", customer: "Priya S.", total: "₹9,850", status: "Paid" },
              { id: "RVR-1040", customer: "Amit K.", total: "₹15,200", status: "Shipped" },
            ].map((order) => (
              <div key={order.id} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                <div>
                  <p className="font-mono text-sm">{order.id}</p>
                  <p className="text-xs text-muted-foreground">{order.customer}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">{order.total}</p>
                  <Badge variant={order.status === "Building" ? "warning" : order.status === "Paid" ? "secondary" : "success"} className="text-xs mt-1">
                    {order.status}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="font-display">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Link to="/admin/build-queue" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50">
              <span className="font-medium">View build queue</span>
              <Badge variant="warning">18 items</Badge>
            </Link>
            <Link to="/admin/orders" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50">
              <span className="font-medium">Manage orders</span>
              <Badge variant="secondary">124 this month</Badge>
            </Link>
            <Link to="/admin/claims" className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50">
              <span className="font-medium">Review claims</span>
              <Badge variant="destructive">7 active</Badge>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}