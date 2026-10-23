import { useState } from "react"
import { Link, useLocation } from "react-router-dom"
import { useTheme } from "next-themes"
import { ChevronDown, LogIn, Moon, ShoppingCart, Sun, User, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import { useCart } from "@/hooks/use-cart"
import { RevaraMark } from "@/components/brand/RevaraMark"

const navigation = [
  { name: "Keyboards", href: "/keyboards" },
  { name: "Customize", href: "/customize" },
  { name: "Repairability", href: "/repairability" },
  { name: "Firmware", href: "/firmware" },
]

const accountLinks = [
  { name: "Account", href: "/account" },
  { name: "Orders", href: "/orders" },
  { name: "Saved designs", href: "/account/designs" },
  { name: "Warranty claims", href: "/support/claim" },
  { name: "Sign in", href: "/auth" },
]

const isActivePath = (pathname: string, href: string) =>
  pathname === href || pathname.startsWith(`${href}/`)

export function Header() {
  const location = useLocation()
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { items: cartItems } = useCart()
  const cartCount = cartItems.length

  return (
    <header className="sticky top-0 z-50 h-16 shrink-0 border-b border-border bg-background/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2.5" aria-label="Revara home">
          <RevaraMark size={32} />
          <span className="font-display text-xl font-semibold tracking-tight">Revara</span>
        </Link>

        <nav className="hidden flex-1 items-center justify-center gap-6 lg:flex" aria-label="Primary navigation">
          {navigation.map((item) => {
            const active = isActivePath(location.pathname, item.href)
            return (
              <Link
                key={item.name}
                to={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative flex h-16 items-center text-sm font-medium transition-colors after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:scale-x-0 after:bg-primary after:transition-transform",
                  active
                    ? "text-primary after:scale-x-100"
                    : "text-muted-foreground hover:text-primary",
                )}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="ml-auto flex items-center gap-2 lg:ml-0">
          <Button
            variant="ghost"
            className="hidden h-10 gap-1.5 px-2.5 sm:flex"
            onClick={() => setTheme(isDark ? "light" : "dark")}
            aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{isDark ? "Light" : "Dark"}</span>
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

          {/* TODO(auth): Show signed-in account state when authentication is connected. */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="hidden h-10 px-3 sm:flex">
                <User aria-hidden="true" />
                Account
                <ChevronDown aria-hidden="true" className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {accountLinks.slice(0, -1).map((item) => (
                <DropdownMenuItem key={item.href} asChild>
                  <Link to={item.href}>{item.name}</Link>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link to="/auth">Sign in</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
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
            <div className="flex h-16 items-center justify-between border-b px-4">
              <SheetTitle className="font-display text-lg">Menu</SheetTitle>
              <SheetDescription className="sr-only">Site navigation and account links</SheetDescription>
            </div>
            <nav className="flex-1 space-y-2 px-4 py-4" aria-label="Mobile navigation">
              {navigation.map((item) => {
                const active = isActivePath(location.pathname, item.href)
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-colors",
                      active
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-accent hover:text-primary",
                    )}
                  >
                    {item.name}
                  </Link>
                )
              })}
              <hr className="my-4 border-border" />
              {accountLinks.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  aria-current={isActivePath(location.pathname, item.href) ? "page" : undefined}
                  className="flex items-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-primary"
                >
                  {item.name === "Sign in" ? <LogIn className="h-4 w-4" /> : null}
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="border-t p-4">
              <Button
                variant="ghost"
                className="h-10 w-full justify-start gap-2"
                onClick={() => setTheme(isDark ? "light" : "dark")}
              >
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? "Light mode" : "Dark mode"}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
