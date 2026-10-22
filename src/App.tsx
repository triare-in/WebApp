import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
import { MainLayout } from "@/components/layout/MainLayout"
import { AdminLayout } from "@/components/layout/AdminLayout"
import { AppErrorBoundary } from "@/components/layout/AppErrorBoundary"
import { RouteEffects } from "@/components/layout/RouteEffects"

// Customer pages
import { HomePage } from "@/pages/HomePage"
import { KeyboardsPage } from "@/pages/KeyboardsPage"
import { ConfiguratorPage } from "@/pages/ConfiguratorPage"
import { RepairabilityPage } from "@/pages/RepairabilityPage"
import { FirmwarePage } from "@/pages/FirmwarePage"
import { CartPage } from "@/pages/CartPage"
import { CheckoutPage } from "@/pages/CheckoutPage"
import { AuthPage } from "@/pages/AuthPage"
import { OrdersPage } from "@/pages/OrdersPage"
import { OrderDetailPage } from "@/pages/OrderDetailPage"
import { SavedDesignsPage } from "@/pages/SavedDesignsPage"
import { AccountPage } from "@/pages/AccountPage"
import { AboutPage } from "@/pages/AboutPage"
import { SupportPage } from "@/pages/SupportPage"
import { ClaimPage } from "@/pages/ClaimPage"
import { ShippingPolicyPage } from "@/pages/ShippingPolicyPage"
import { ReturnsPolicyPage } from "@/pages/ReturnsPolicyPage"
import { WarrantyPolicyPage } from "@/pages/WarrantyPolicyPage"
import { PrivacyPolicyPage } from "@/pages/PrivacyPolicyPage"
import { TermsPolicyPage } from "@/pages/TermsPolicyPage"
import { NotFoundPage } from "@/pages/NotFoundPage"

const AdminDashboardPage = lazy(() => import("@/pages/admin/AdminDashboardPage").then((module) => ({ default: module.AdminDashboardPage })))
const AdminOrdersPage = lazy(() => import("@/pages/admin/AdminOrdersPage").then((module) => ({ default: module.AdminOrdersPage })))
const AdminOrderDetailPage = lazy(() => import("@/pages/admin/AdminOrderDetailPage").then((module) => ({ default: module.AdminOrderDetailPage })))
const AdminBuildQueuePage = lazy(() => import("@/pages/admin/AdminBuildQueuePage").then((module) => ({ default: module.AdminBuildQueuePage })))
const AdminCatalogPage = lazy(() => import("@/pages/admin/AdminCatalogPage").then((module) => ({ default: module.AdminCatalogPage })))
const AdminDiscountsPage = lazy(() => import("@/pages/admin/AdminDiscountsPage").then((module) => ({ default: module.AdminDiscountsPage })))
const AdminReviewsPage = lazy(() => import("@/pages/admin/AdminReviewsPage").then((module) => ({ default: module.AdminReviewsPage })))
const AdminClaimsPage = lazy(() => import("@/pages/admin/AdminClaimsPage").then((module) => ({ default: module.AdminClaimsPage })))
const AdminCustomersPage = lazy(() => import("@/pages/admin/AdminCustomersPage").then((module) => ({ default: module.AdminCustomersPage })))
const AdminSettingsPage = lazy(() => import("@/pages/admin/AdminSettingsPage").then((module) => ({ default: module.AdminSettingsPage })))

export default function App() {
  return (
    <TooltipProvider>
      <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
        <BrowserRouter>
          <div className="min-h-screen bg-background font-body">
            <RouteEffects />
            <AppErrorBoundary>
            <Routes>
              {/* Public routes with main layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/keyboards" element={<KeyboardsPage />} />
                <Route path="/customize" element={<ConfiguratorPage />} />
                <Route path="/customize/:layout" element={<ConfiguratorPage />} />
                <Route path="/repairability" element={<RepairabilityPage />} />
                <Route path="/firmware" element={<FirmwarePage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/orders" element={<OrdersPage />} />
                <Route path="/orders/:id" element={<OrderDetailPage />} />
                <Route path="/account/designs" element={<SavedDesignsPage />} />
                <Route path="/account" element={<AccountPage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/support" element={<SupportPage />} />
                <Route path="/support/claim" element={<ClaimPage />} />
                <Route path="/policies/shipping" element={<ShippingPolicyPage />} />
                <Route path="/policies/returns" element={<ReturnsPolicyPage />} />
                <Route path="/policies/warranty" element={<WarrantyPolicyPage />} />
                <Route path="/policies/privacy" element={<PrivacyPolicyPage />} />
                <Route path="/policies/terms" element={<TermsPolicyPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Route>

              {/* Admin routes with admin layout */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminDashboardPage /></Suspense>} />
                <Route path="/admin/orders" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminOrdersPage /></Suspense>} />
                <Route path="/admin/orders/:id" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminOrderDetailPage /></Suspense>} />
                <Route path="/admin/build-queue" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminBuildQueuePage /></Suspense>} />
                <Route path="/admin/catalog" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminCatalogPage /></Suspense>} />
                <Route path="/admin/discounts" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminDiscountsPage /></Suspense>} />
                <Route path="/admin/reviews" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminReviewsPage /></Suspense>} />
                <Route path="/admin/claims" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminClaimsPage /></Suspense>} />
                <Route path="/admin/customers" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminCustomersPage /></Suspense>} />
                <Route path="/admin/settings" element={<Suspense fallback={<p role="status">Loading admin…</p>}><AdminSettingsPage /></Suspense>} />
              </Route>

            </Routes>
            </AppErrorBoundary>
          </div>
          <Toaster position="bottom-right" richColors />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  )
}