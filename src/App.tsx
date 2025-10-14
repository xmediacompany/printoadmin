import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppLayout } from "./components/layout/AppLayout";
import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Catalog from "./pages/Catalog";
import CMS from "./pages/CMS";
import Workstations from "./pages/Workstations";
import Fulfillment from "./pages/Fulfillment";
import ComingSoon from "./pages/ComingSoon";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppLayout><Dashboard /></AppLayout>} />
          <Route path="/orders" element={<AppLayout><Orders /></AppLayout>} />
          <Route path="/catalog" element={<AppLayout><Catalog /></AppLayout>} />
          <Route path="/cms" element={<AppLayout><CMS /></AppLayout>} />
          <Route path="/workstations" element={<AppLayout><Workstations /></AppLayout>} />
          <Route path="/pricing" element={<AppLayout><ComingSoon title="Pricing Engine" description="Manage tiered pricing, bulk rules, and contract tables" /></AppLayout>} />
          <Route path="/prepress" element={<AppLayout><ComingSoon title="Prepress & QA" description="Manual preflight overrides and quality control" /></AppLayout>} />
          <Route path="/fulfillment" element={<AppLayout><Fulfillment /></AppLayout>} />
          <Route path="/inventory" element={<AppLayout><ComingSoon title="Inventory & Procurement" description="Stock levels, purchase orders, and vendor management" /></AppLayout>} />
          <Route path="/customer-service" element={<AppLayout><ComingSoon title="Customer Service Desk" description="Omni-inbox and support ticket management" /></AppLayout>} />
          <Route path="/finance" element={<AppLayout><ComingSoon title="Finance" description="Invoicing, payouts, and accounting exports" /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><ComingSoon title="Analytics" description="Sales, utilization, and performance metrics" /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><ComingSoon title="Settings" description="Roles, permissions, and system configuration" /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
