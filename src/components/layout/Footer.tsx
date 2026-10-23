
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { TriareMark } from "@/components/brand/TriareMark"

const footerLinks = {
  Shop: [
    { name: "Keyboards", href: "/keyboards" },
    { name: "Customize", href: "/customize" },
  ],
  Learn: [
    { name: "Repairability", href: "/repairability" },
    { name: "Firmware", href: "/firmware" },
    { name: "About", href: "/about" },
  ],
  Support: [
    { name: "Support", href: "/support" },
    { name: "Warranty", href: "/policies/warranty" },
    { name: "Raise a claim", href: "/support/claim" },
    { name: "Shipping", href: "/policies/shipping" },
    { name: "Returns and refunds", href: "/policies/returns" },
  ],
  Legal: [
    { name: "Privacy", href: "/policies/privacy" },
    { name: "Terms", href: "/policies/terms" },
  ],
}

const copyrightYear = new Date().getFullYear()
// TODO(legal): Add the grievance-officer and company details required by the ADR.

export function Footer() {
  const { resolvedTheme, setTheme } = useTheme()
  const isDark = resolvedTheme === "dark"

  return (
    <footer className="shrink-0 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 pb-10 md:grid-cols-5">
          <div className="col-span-2 flex flex-col md:col-span-1">
            <div className="flex items-center gap-2">
              <TriareMark size={28} />
              <span className="font-display text-lg font-semibold tracking-tight">Triare</span>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Repairable, wireless-first mechanical keyboards you can fix yourself.
            </p>
            <Button
              variant="outline"
              className="mt-3 h-10 w-fit px-3"
              onClick={() => setTheme(isDark ? "light" : "dark")}
              aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
            >
              <span className="flex items-center gap-1.5">
                {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                {isDark ? "Light" : "Dark"}
              </span>
            </Button>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Shop</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {footerLinks.Shop.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Learn</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {footerLinks.Learn.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Support</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {footerLinks.Support.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Legal</h2>
            <div className="mt-2 flex flex-col space-y-2">
              {footerLinks.Legal.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <p className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground text-center">
            © {copyrightYear} Triare
          </p>
        </div>
      </div>
    </footer>
  )
}