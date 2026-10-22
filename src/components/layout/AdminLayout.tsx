import { Link, Outlet, useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import {
  Boxes,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Moon,
  Package,
  Settings,
  Star,
  Sun,
  Tag,
  Users,
} from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { RevaraMark } from "@/components/brand/RevaraMark"

const adminNavigation = [
  { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
  { name: "Orders", href: "/admin/orders", icon: Package },
  { name: "Build queue", href: "/admin/build-queue", icon: ClipboardList },
  { name: "Catalog", href: "/admin/catalog", icon: Boxes },
  { name: "Discounts", href: "/admin/discounts", icon: Tag },
  { name: "Reviews", href: "/admin/reviews", icon: Star },
  { name: "Claims", href: "/admin/claims", icon: FileText },
  { name: "Customers", href: "/admin/customers", icon: Users },
  { name: "Settings", href: "/admin/settings", icon: Settings },
]

export function AdminLayout() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()

  return (
    <SidebarProvider>
      <Sidebar collapsible="icon" variant="inset">
        <SidebarContent>
          <div className="flex h-16 items-center gap-2 border-b px-4">
            <Link to="/admin" aria-label="Revara admin dashboard" className="flex min-w-0 items-center gap-2">
              <RevaraMark size={28} />
              <span className="truncate font-display text-lg font-semibold group-data-[collapsible=icon]:hidden">Revara</span>
            </Link>
          </div>
          <SidebarGroup>
            <SidebarGroupLabel>Store management</SidebarGroupLabel>
            <SidebarMenu>
              {adminNavigation.map((item) => {
                const active = item.href === "/admin"
                  ? location.pathname === item.href
                  : location.pathname === item.href || location.pathname.startsWith(`${item.href}/`)
                return (
                  <SidebarMenuItem key={item.href}>
                    <SidebarMenuButton asChild isActive={active} tooltip={item.name}>
                      <Link to={item.href}>
                        <item.icon aria-hidden="true" />
                        <span>{item.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      <SidebarInset className="min-w-0">
        <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-border bg-background/90 px-4 backdrop-blur sm:px-6">
          <div className="flex items-center gap-3">
            <SidebarTrigger aria-label="Toggle admin navigation" />
            <span className="font-medium text-muted-foreground">Store administration</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" aria-label="Toggle theme" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun /> : <Moon />}
            </Button>
            <Button variant="outline" size="sm" asChild>
              <Link to="/">View store</Link>
            </Button>
          </div>
        </header>
        <a
          href="#admin-content"
          className="sr-only z-[100] rounded-md bg-primary px-4 py-2 text-primary-foreground focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          Skip to content
        </a>
        <main id="admin-content" className="flex-1 overflow-auto p-4 sm:p-6">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
