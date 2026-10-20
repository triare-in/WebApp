"use client"

import { Outlet, useLocation } from "react-router-dom"
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarMenu, SidebarMenuItem, SidebarMenuButton, SidebarProvider } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"
import {
  LayoutDashboard,
  Package,
  ClipboardList,
  Boxes,
  Tag,
  Star,
  FileText,
  Users,
  Settings,
  Sun,
  Moon,
  ShoppingBag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"

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
  const [collapsed, setCollapsed] = useState(false)

  return (
    <SidebarProvider>
    <div className="flex h-screen bg-background font-body">
      <Sidebar>
        <SidebarContent className={cn("transition-all duration-200", collapsed ? "w-16" : "w-64")}>
          <div className="flex h-16 items-center justify-between px-4 border-b">
            {!collapsed && (
              <Link to="/admin" className="flex items-center gap-2">
                <svg viewBox="0 0 264 264" width="28" height="28" role="img" aria-label="Triare mark" className="text-primary">
                  <g>
                    <polygon points="34.7,214.5 132.2,250.3 132.2,226.3 34.7,190.5" fill="#4F3892" stroke="#4F3892" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,250.3 229.6,214.5 229.6,190.5 132.2,226.3" fill="#3F2F73" stroke="#3F2F73" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,154.6 229.6,190.5 132.2,226.3 34.7,190.5" fill="#5B41A5" stroke="#5B41A5" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="88.7,154.5 132.2,170.5 132.2,160.5 88.7,144.5" fill="#CBBBF0" stroke="#CBBBF0" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,170.5 175.7,154.5 175.7,144.5 132.2,160.5" fill="#AF9AE6" stroke="#AF9AE6" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,128.5 175.7,144.5 132.2,160.5 88.7,144.5" fill="#E4DAF8" stroke="#E4DAF8" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="76.5,144.5 132.2,165 132.2,141 76.5,120.5" fill="#CBBBF0" stroke="#CBBBF0" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,165 187.8,144.5 187.8,120.5 132.2,141" fill="#AF9AE6" stroke="#AF9AE6" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,100 187.8,120.5 132.2,141 76.5,120.5" fill="#E4DAF8" stroke="#E4DAF8" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="55.6,80.5 132.2,108.6 132.2,55 76.5,34.5" fill="#6B4FBB" stroke="#6B4FBB" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,108.6 208.7,80.5 187.8,34.5 132.2,55" fill="#4F3892" stroke="#4F3892" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,14 187.8,34.5 132.2,55 76.5,34.5" fill="#A58BF0" stroke="#A58BF0" strokeWidth="3.5" strokeLinejoin="round" />
                    <polygon points="132.2,22.2 165.6,34.5 132.2,46.8 98.8,34.5" fill="#9479E8" stroke="#9479E8" strokeWidth="3.5" strokeLinejoin="round" />
                  </g>
                </svg>
                <span className="font-display text-lg font-semibold">Triare Admin</span>
              </Link>
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setCollapsed(!collapsed)}
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              className="h-8 w-8"
            >
              {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
          </div>

          <SidebarGroup>
            <SidebarGroupLabel className={cn("px-4 py-2", collapsed && "hidden")}>Navigation</SidebarGroupLabel>
            <SidebarMenu>
              {adminNavigation.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      "gap-3",
                      collapsed && "justify-center px-2",
                      location.pathname === item.href && "bg-primary text-primary-foreground"
                    )}
                    tooltip={collapsed ? item.name : undefined}
                  >
                    <Link to={item.href} className="flex w-full items-center gap-3">
                      <item.icon className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <div className="flex-1" />

          <div className="border-t p-4">
            <div className={cn("flex items-center gap-3", collapsed && "justify-center")}>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className={cn("flex-1 justify-start", collapsed && "justify-center px-2")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {!collapsed && <span>{theme === "dark" ? "Light" : "Dark"}</span>}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                asChild
                className={cn("flex-1 justify-start", collapsed && "justify-center px-2")}
              >
                <Link to="/">
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {!collapsed && <span>View store</span>}
                </Link>
              </Button>
            </div>
          </div>
        </SidebarContent>
      </Sidebar>

      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="h-16 border-b bg-background px-6 flex items-center justify-between">
          <h1 className="font-display text-xl font-semibold">Admin</h1>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" onClick={() => setTheme(theme === "dark" ? "light" : "dark")}>
              {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link to="/">View store</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1 overflow-auto p-6">
          <Outlet />
        </div>
      </div>
    </div>
    </SidebarProvider>
  )
}