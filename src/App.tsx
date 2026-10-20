import { BrowserRouter, Routes, Route } from "react-router-dom"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/hooks/use-theme"
import { MainLayout } from "@/components/layout/MainLayout"
import { AdminLayout } from "@/components/layout/AdminLayout"
import './index.css'

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

// Admin pages
import { AdminDashboardPage } from "@/pages/admin/AdminDashboardPage"
import { AdminOrdersPage } from "@/pages/admin/AdminOrdersPage"
import { AdminOrderDetailPage } from "@/pages/admin/AdminOrderDetailPage"
import { AdminBuildQueuePage } from "@/pages/admin/AdminBuildQueuePage"
import { AdminCatalogPage } from "@/pages/admin/AdminCatalogPage"
import { AdminDiscountsPage } from "@/pages/admin/AdminDiscountsPage"
import { AdminReviewsPage } from "@/pages/admin/AdminReviewsPage"
import { AdminClaimsPage } from "@/pages/admin/AdminClaimsPage"
import { AdminCustomersPage } from "@/pages/admin/AdminCustomersPage"
import { AdminSettingsPage } from "@/pages/admin/AdminSettingsPage"

export default function App() {
  return (
    <TooltipProvider>
      <ThemeProvider>
        <BrowserRouter>
          <div className="min-h-screen bg-background font-body">
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
              </Route>

              {/* Admin routes with admin layout */}
              <Route element={<AdminLayout />}>
                <Route path="/admin" element={<AdminDashboardPage />} />
                <Route path="/admin/orders" element={<AdminOrdersPage />} />
                <Route path="/admin/orders/:id" element={<AdminOrderDetailPage />} />
                <Route path="/admin/build-queue" element={<AdminBuildQueuePage />} />
                <Route path="/admin/catalog" element={<AdminCatalogPage />} />
                <Route path="/admin/discounts" element={<AdminDiscountsPage />} />
                <Route path="/admin/reviews" element={<AdminReviewsPage />} />
                <Route path="/admin/claims" element={<AdminClaimsPage />} />
                <Route path="/admin/customers" element={<AdminCustomersPage />} />
                <Route path="/admin/settings" element={<AdminSettingsPage />} />
              </Route>

              {/* 404 */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </div>
          <Toaster position="bottom-right" richColors />
        </BrowserRouter>
      </ThemeProvider>
    </TooltipProvider>
  )
}