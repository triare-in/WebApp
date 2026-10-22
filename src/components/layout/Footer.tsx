
import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Sun, Moon } from "lucide-react"
import { RevaraMark } from "@/components/brand/RevaraMark"

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
    { name: "Shipping", href: "/policies/shipping" },
    { name: "Returns and refunds", href: "/policies/returns" },
  ],
  Legal: [
    { name: "Privacy", href: "/policies/privacy" },
    { name: "Terms", href: "/policies/terms" },
  ],
}

const copyrightYear = new Date().getFullYear()

export function Footer() {
  const { theme, setTheme } = useTheme()

  return (
    <footer className="shrink-0 border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 pb-10">
          <div className="flex flex-col">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Shop</h3>
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
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Learn</h3>
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
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Support</h3>
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
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Legal</h3>
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
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <RevaraMark size={28} />
              <span className="font-display text-lg font-semibold tracking-tight">Revara</span>
            </div>
            <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Repairable, wireless-first mechanical keyboards you can fix yourself.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="mt-3 w-fit h-8 px-3"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
              <span className="flex items-center gap-1.5">
                {theme === "dark" ? <Sun className="h-3.5 w-3.5" /> : <Moon className="h-3.5 w-3.5" />}
                {theme === "dark" ? "Light" : "Dark"}
              </span>
            </Button>
          </div>
        </div>
        <div className="border-t border-border pt-4">
          <p className="mx-auto max-w-7xl px-4 text-sm text-muted-foreground text-center">
            © {copyrightYear} Revara
          </p>
        </div>
      </div>
    </footer>
  )
}