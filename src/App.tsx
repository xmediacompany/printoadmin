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
import ProductEditor from "./pages/ProductEditor";
import PrintingServices from "./pages/PrintingServices";
import HomePageEditor from "./pages/HomePageEditor";
import HelpCenter from "./pages/HelpCenter";
import MultilingualContent from "./pages/MultilingualContent";
import Workstations from "./pages/Workstations";
import Fulfillment from "./pages/Fulfillment";
import Customers from "./pages/Customers";
import Finance from "./pages/Finance";
import Marketing from "./pages/Marketing";
import Settings from "./pages/Settings";
import SmartReports from "./pages/SmartReports";
import AIOrderBot from "./pages/AIOrderBot";
import SupportTeam from "./pages/SupportTeam";
import LiveChatDashboard from "./pages/LiveChatDashboard";
import FAQManagement from "./pages/FAQManagement";
import Inventory from "./pages/Inventory";
import B2BCorporate from "./pages/B2BCorporate";
import AllCorporateAccounts from "./pages/AllCorporateAccounts";
import AllBulkOrders from "./pages/AllBulkOrders";
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
          <Route path="/cms/products" element={<AppLayout><ProductEditor /></AppLayout>} />
          <Route path="/cms/printing-services" element={<AppLayout><PrintingServices /></AppLayout>} />
          <Route path="/cms/home-page" element={<AppLayout><HomePageEditor /></AppLayout>} />
          <Route path="/cms/help-center" element={<AppLayout><HelpCenter /></AppLayout>} />
          <Route path="/cms/multilingual" element={<AppLayout><MultilingualContent /></AppLayout>} />
          <Route path="/workstations" element={<AppLayout><Workstations /></AppLayout>} />
          <Route path="/fulfillment" element={<AppLayout><Fulfillment /></AppLayout>} />
          <Route path="/inventory" element={<AppLayout><Inventory /></AppLayout>} />
          <Route path="/b2b-corporate" element={<AppLayout><B2BCorporate /></AppLayout>} />
          <Route path="/b2b-corporate/accounts" element={<AppLayout><AllCorporateAccounts /></AppLayout>} />
          <Route path="/b2b-corporate/orders" element={<AppLayout><AllBulkOrders /></AppLayout>} />
          <Route path="/customers" element={<AppLayout><Customers /></AppLayout>} />
          <Route path="/customer-service" element={<AppLayout><SupportTeam /></AppLayout>} />
          <Route path="/customer-service/live-chat" element={<AppLayout><LiveChatDashboard /></AppLayout>} />
          <Route path="/customer-service/faq" element={<AppLayout><FAQManagement /></AppLayout>} />
          <Route path="/ai-order-bot" element={<AppLayout><AIOrderBot /></AppLayout>} />
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
