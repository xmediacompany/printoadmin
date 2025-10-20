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
import Customers from "./pages/Customers";
import Finance from "./pages/Finance";
import Marketing from "./pages/Marketing";
import Settings from "./pages/Settings";
import SmartReports from "./pages/SmartReports";
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
          <Route path="/fulfillment" element={<AppLayout><Fulfillment /></AppLayout>} />
          <Route path="/inventory" element={<AppLayout><ComingSoon title="Inventory & Procurement" description="Stock levels, purchase orders, and vendor management" /></AppLayout>} />
          <Route path="/customers" element={<AppLayout><Customers /></AppLayout>} />
          <Route path="/customer-service" element={<AppLayout><ComingSoon title="Support Team" description="Omni-inbox and support ticket management" /></AppLayout>} />
          <Route path="/marketing" element={<AppLayout><Marketing /></AppLayout>} />
          <Route path="/finance" element={<AppLayout><Finance /></AppLayout>} />
          <Route path="/analytics" element={<AppLayout><SmartReports /></AppLayout>} />
          <Route path="/settings" element={<AppLayout><Settings /></AppLayout>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
