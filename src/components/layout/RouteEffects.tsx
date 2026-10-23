import { useEffect, useRef } from "react"
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
  "/about": "About Triare",
  "/support": "Support",
  "/policies/shipping": "Shipping policy",
  "/policies/returns": "Returns and refunds",
  "/policies/warranty": "Warranty",
  "/policies/privacy": "Privacy policy",
  "/policies/terms": "Terms of use",
}

export function RouteEffects() {
  const { pathname, hash } = useLocation()
  const previousPathname = useRef(pathname)
  const scrollKey = pathname.startsWith("/customize") ? "/customize" : pathname

  useEffect(() => {
    if (!hash) window.scrollTo(0, 0)
  }, [scrollKey, hash])

  useEffect(() => {
    const navigated = previousPathname.current !== pathname
    previousPathname.current = pathname
    if (navigated && !hash) {
      document.querySelector<HTMLElement>("#main-content, #admin-content")?.focus({ preventScroll: true })
    }

    const title = pageTitles[pathname]
      ?? (pathname === "/support/claim" ? "Raise a claim"
        : pathname.startsWith("/auth/") ? "Sign in"
          : pathname.startsWith("/customize/") ? "Keyboard configurator"
        : pathname.startsWith("/orders/") ? "Order details"
          : pathname.startsWith("/admin") ? "Store administration"
            : "Page not found")
    document.title = `${title} | Triare`
  }, [pathname, hash])

  return null
}
