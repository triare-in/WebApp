"use client"

import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/hooks/use-theme"
import { Sun, Moon } from "lucide-react"

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
              <span className="font-display text-lg font-semibold tracking-tight">Triare</span>
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
            © {new Date().getFullYear()} Triare
          </p>
        </div>
      </div>
    </footer>
  )
}