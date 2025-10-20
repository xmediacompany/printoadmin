import { LayoutDashboard, Package, DollarSign, ShoppingCart, FileCheck, Truck, Boxes, Headphones, Receipt, BarChart3, Settings, Globe, MonitorCog, Users, Megaphone } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarHeader } from "@/components/ui/sidebar";
const navigationItems = [{
  title: "Dashboard",
  url: "/",
  icon: LayoutDashboard
}, {
  title: "Orders & Production",
  url: "/orders",
  icon: ShoppingCart
}, {
  title: "Catalog & Templates",
  url: "/catalog",
  icon: Package
}, {
  title: "Website CMS Console",
  url: "/cms",
  icon: Globe
}, {
  title: "Workstations",
  url: "/workstations",
  icon: MonitorCog
}, {
  title: "Pricing Engine",
  url: "/pricing",
  icon: DollarSign
}, {
  title: "Prepress & QA",
  url: "/prepress",
  icon: FileCheck
}, {
  title: "Fulfillment & Shipping",
  url: "/fulfillment",
  icon: Truck
}, {
  title: "Inventory",
  url: "/inventory",
  icon: Boxes
}, {
  title: "Customers",
  url: "/customers",
  icon: Users
}, {
  title: "Support Team",
  url: "/customer-service",
  icon: Headphones
}, {
  title: "Marketing",
  url: "/marketing",
  icon: Megaphone
}, {
  title: "Finance",
  url: "/finance",
  icon: Receipt
}, {
  title: "Smart Reports",
  url: "/analytics",
  icon: BarChart3
}, {
  title: "Settings",
  url: "/settings",
  icon: Settings
}];
export function AppSidebar() {
  return <Sidebar>
      <SidebarHeader className="border-b border-sidebar-border p-4 bg-fuchsia-200">
        <div className="flex items-center gap-2 bg-fuchsia-200">
          <div className="w-8 h-8 rounded-lg bg-sidebar-primary flex items-center justify-center">
            <span className="text-sidebar-primary-foreground font-bold text-sm">P</span>
          </div>
          <div>
            <h2 className="text-sidebar-foreground font-semibold text-base">PRINTO</h2>
            <p className="text-sidebar-foreground/70 text-xs">Admin Portal</p>
          </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup className="bg-fuchsia-200">
          <SidebarGroupLabel className="text-sidebar-foreground/70">Main Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map(item => <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end={item.url === "/"} className={({
                  isActive
                }) => isActive ? "bg-sidebar-accent text-sidebar-accent-foreground" : ""}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>)}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>;
}