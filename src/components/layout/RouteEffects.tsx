import { useEffect } from "react"
import { useLocation } from "react-router-dom"

const pageTitles: Record<string, string> = {
  "/": "Repairable keyboards, built to order",
  "/keyboards": "Keyboards",
  "/customize": "Keyboard configurator",
  "/repairability": "Repairability",
  "/firmware": "Firmware",
  "/cart": "Your cart",
  "/checkout": "Checkout",
  "/auth": "Sign in",
  "/orders": "Your orders",
  "/account/designs": "Saved designs",
  "/account": "Your account",
  "/about": "About Revara",
  "/support": "Support",
  "/policies/shipping": "Shipping policy",
  "/policies/returns": "Returns and refunds",
  "/policies/warranty": "Warranty",
  "/policies/privacy": "Privacy policy",
  "/policies/terms": "Terms of use",
}

export function RouteEffects() {
  const { pathname } = useLocation()

  useEffect(() => {
    window.scrollTo(0, 0)
    const title = pageTitles[pathname]
      ?? (pathname.startsWith("/customize/") ? "Keyboard configurator"
        : pathname.startsWith("/orders/") ? "Order details"
          : pathname.startsWith("/admin") ? "Store administration"
            : "Page not found")
    document.title = `${title} | Revara`
  }, [pathname])

  return null
}
