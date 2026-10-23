import { lazy, Suspense } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
import { MainLayout } from "@/components/layout/MainLayout"
import { RouteEffects } from "@/components/layout/RouteEffects"

const HomePage = lazy(() => import("@/pages/HomePage").then((module) => ({ default: module.HomePage })))
const KeyboardsPage = lazy(() => import("@/pages/KeyboardsPage").then((module) => ({ default: module.KeyboardsPage })))
const ConfiguratorPage = lazy(() => import("@/pages/ConfiguratorPage").then((module) => ({ default: module.ConfiguratorPage })))
const RepairabilityPage = lazy(() => import("@/pages/RepairabilityPage").then((module) => ({ default: module.RepairabilityPage })))
const FirmwarePage = lazy(() => import("@/pages/FirmwarePage").then((module) => ({ default: module.FirmwarePage })))
const CartPage = lazy(() => import("@/pages/CartPage").then((module) => ({ default: module.CartPage })))
const CheckoutPage = lazy(() => import("@/pages/CheckoutPage").then((module) => ({ default: module.CheckoutPage })))
const AuthPage = lazy(() => import("@/pages/AuthPage").then((module) => ({ default: module.AuthPage })))
const OrdersPage = lazy(() => import("@/pages/OrdersPage").then((module) => ({ default: module.OrdersPage })))
const OrderDetailPage = lazy(() => import("@/pages/OrderDetailPage").then((module) => ({ default: module.OrderDetailPage })))
const SavedDesignsPage = lazy(() => import("@/pages/SavedDesignsPage").then((module) => ({ default: module.SavedDesignsPage })))
const AccountPage = lazy(() => import("@/pages/AccountPage").then((module) => ({ default: module.AccountPage })))
const AboutPage = lazy(() => import("@/pages/AboutPage").then((module) => ({ default: module.AboutPage })))
const SupportPage = lazy(() => import("@/pages/SupportPage").then((module) => ({ default: module.SupportPage })))
const ClaimPage = lazy(() => import("@/pages/ClaimPage").then((module) => ({ default: module.ClaimPage })))
const ShippingPolicyPage = lazy(() => import("@/pages/ShippingPolicyPage").then((module) => ({ default: module.ShippingPolicyPage })))
const ReturnsPolicyPage = lazy(() => import("@/pages/ReturnsPolicyPage").then((module) => ({ default: module.ReturnsPolicyPage })))
const WarrantyPolicyPage = lazy(() => import("@/pages/WarrantyPolicyPage").then((module) => ({ default: module.WarrantyPolicyPage })))
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage").then((module) => ({ default: module.PrivacyPolicyPage })))
const TermsPolicyPage = lazy(() => import("@/pages/TermsPolicyPage").then((module) => ({ default: module.TermsPolicyPage })))
const NotFoundPage = lazy(() => import("@/pages/NotFoundPage").then((module) => ({ default: module.NotFoundPage })))

const AdminLayout = lazy(() => import("@/components/layout/AdminLayout").then((module) => ({ default: module.AdminLayout })))
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
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <BrowserRouter>
          <div className="min-h-dvh bg-background">
            <RouteEffects />
            <Suspense fallback={<p role="status" className="p-6 text-sm text-muted-foreground">Loading page…</p>}>
            <Routes>
              {/* Public routes with main layout */}
              <Route element={<MainLayout />}>
                <Route path="/" element={<HomePage />} />
                <Route path="/keyboards" element={<KeyboardsPage />} />
                <Route path="/customize" element={<ConfiguratorPage />} />
                <Route path="/customize/preset/:slug" element={<ConfiguratorPage />} />
                <Route path="/customize/design/:designId" element={<ConfiguratorPage />} />
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
            </Suspense>
          </div>
          <Toaster position="bottom-right" richColors />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  )
}