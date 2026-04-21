/**
 * App — Root component with routing and global providers.
 *
 * ROUTING OVERVIEW:
 * /                  → Homepage (hero, products, about)
 * /collection        → Full product grid with category filters
 * /product/:slug     → Individual product detail page
 * /about             → About us / our story
 * /care              → Care guide for ceramic jewelry
 *
 * STATE MANAGEMENT:
 * - CartProvider wraps all routes so cart state persists across pages.
 * - useCart() hook gives any component access to cart actions.
 */

import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { CartProvider } from "./context/CartContext";
import Index from "./pages/Index";
import Collection from "./pages/Collection";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import CareGuide from "./pages/CareGuide";
import Delivery from "./pages/Delivery";
import Checkout from "./pages/Checkout";
import OrderConfirmation from "./pages/OrderConfirmation";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();
const AdminStudio = lazy(() => import("./pages/AdminStudio"));

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <CartProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/collection" element={<Collection />} />
              <Route path="/product/:slug" element={<ProductDetail />} />
              <Route path="/about" element={<About />} />
              <Route path="/care" element={<CareGuide />} />
              <Route path="/delivery" element={<Delivery />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order-confirmation" element={<OrderConfirmation />} />
              <Route
                path="/admin/*"
                element={
                  <Suspense
                    fallback={
                      <div className="flex min-h-screen items-center justify-center bg-background text-foreground">
                        Завантаження адмінки...
                      </div>
                    }
                  >
                    <AdminStudio />
                  </Suspense>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
