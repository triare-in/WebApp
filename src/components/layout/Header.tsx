
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet"
import { ShoppingCart, Sun, Moon, LogIn, User, Menu } from "lucide-react"
import { useTheme } from "next-themes"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { RevaraMark } from "@/components/brand/RevaraMark"

const navigation = [
  { name: "Keyboards", href: "/keyboards" },
  { name: "Customize", href: "/customize" },
  { name: "Repairability", href: "/repairability" },
  { name: "Firmware", href: "/firmware" },
]

export function Header() {
  const location = useLocation()
  const { theme, setTheme } = useTheme()
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const { items: cartItems } = useCart()
  const cartCount = cartItems.length

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Revara home">
          <RevaraMark size={32} />
          <span className="font-display text-xl font-semibold tracking-tight">Revara</span>
        </Link>

        <nav className="hidden md:flex flex-1 items-center justify-center gap-6" aria-label="Primary navigation">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={cn(
                "text-sm font-medium transition-colors",
                (location.pathname === item.href || location.pathname.startsWith(`${item.href}/`))
                  ? "text-primary border-b-2 border-primary pb-0.5"
                  : "text-muted-foreground hover:text-primary"
              )}
            >
              {item.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2.5 gap-1.5 hidden sm:flex"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"}</span>
          </Button>

          <Button variant="ghost" size="icon" className="relative" asChild>
            <Link to="/cart" aria-label={`Cart, ${cartCount} items`}>
              <ShoppingCart className="h-5 w-5" />
              {cartCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-medium text-primary-foreground">
                  {cartCount}
                </span>
              )}
            </Link>
          </Button>

          <Button variant="outline" size="sm" className="hidden sm:flex h-10 px-4" asChild>
            <Link to="/auth">Sign in</Link>
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
        <SheetContent side="right" className="w-72 p-0">
          <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between px-4 border-b">
              <SheetTitle className="font-display text-lg">Menu</SheetTitle>
            </div>
            <nav className="flex-1 py-4 px-4 space-y-2" aria-label="Mobile navigation">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors",
                    location.pathname === item.href
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-primary"
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <hr className="my-4 border-border" />
              <Link
                to="/auth"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <LogIn className="h-4 w-4" />
                Sign in
              </Link>
              <Link
                to="/account"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-sm font-medium text-muted-foreground hover:text-primary"
              >
                <User className="h-4 w-4" />
                Account
              </Link>
            </nav>
            <div className="p-4 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start gap-2"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}

import React from "react"