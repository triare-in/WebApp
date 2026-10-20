"use client"

import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent } from "@/components/ui/sheet"
import { ShoppingCart, Sun, Moon, LogIn, User, Menu, X } from "lucide-react"
import { useTheme } from "@/hooks/use-theme"
import { cn } from "@/lib/utils"

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
  const [cartCount, setCartCount] = React.useState(0)

  React.useEffect(() => {
    const refreshCartCount = () => {
      try {
        const cart: unknown = JSON.parse(localStorage.getItem("triare-cart") ?? "[]")
        setCartCount(Array.isArray(cart) ? cart.length : 0)
      } catch (error) {
        console.error("Could not read cart count", error)
        setCartCount(0)
      }
    }
    refreshCartCount()
    window.addEventListener("storage", refreshCartCount)
    window.addEventListener("triare-cart-updated", refreshCartCount)
    return () => {
      window.removeEventListener("storage", refreshCartCount)
      window.removeEventListener("triare-cart-updated", refreshCartCount)
    }
  }, [])

  return (
    <header className="h-16 shrink-0 border-b border-border bg-background/90 backdrop-blur-md sticky top-0 z-50">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Triare home">
          <svg viewBox="0 0 264 264" width="32" height="32" role="img" aria-label="Triare mark" className="text-primary">
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
          <span className="font-display text-xl font-semibold tracking-tight">Triare</span>
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
              <span className="font-display text-lg font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setMobileMenuOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
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