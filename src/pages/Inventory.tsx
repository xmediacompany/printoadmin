import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Package, AlertTriangle, TrendingUp, TrendingDown } from "lucide-react";

export default function Inventory() {
  const stats = [
    {
      label: "Total Items",
      value: "1,234",
      change: "+5.2%",
      trend: "up",
      icon: Package,
    },
    {
      label: "Low Stock Items",
      value: "23",
      change: "-2 from yesterday",
      trend: "warning",
      icon: AlertTriangle,
    },
  ];

  const stockItems = [
    {
      id: "INV-001",
      name: "Premium Paper Stock A4",
      category: "Paper",
      quantity: 5000,
      unit: "sheets",
      reorderLevel: 1000,
      status: "In Stock",
      lastRestocked: "2024-01-10",
    },
    {
      id: "INV-002",
      name: "Black Toner Cartridge",
      category: "Consumables",
      quantity: 450,
      unit: "units",
      reorderLevel: 500,
      status: "Low Stock",
      lastRestocked: "2024-01-05",
    },
    {
      id: "INV-003",
      name: "Glossy Photo Paper",
      category: "Paper",
      quantity: 2500,
      unit: "sheets",
      reorderLevel: 500,
      status: "In Stock",
      lastRestocked: "2024-01-12",
    },
    {
      id: "INV-004",
      name: "Binding Coils 12mm",
      category: "Binding",
      quantity: 150,
      unit: "boxes",
      reorderLevel: 200,
      status: "Low Stock",
      lastRestocked: "2023-12-28",
    },
  ];

  const purchaseOrders = [
    {
      id: "PO-2024-001",
      vendor: "Al-Wazzan Trading Co.",
      items: "Paper Stock, Envelopes",
      amount: "KD 2,450.00",
      status: "Pending",
      expectedDate: "2024-01-20",
    },
    {
      id: "PO-2024-002",
      vendor: "Gulf Supplies LLC",
      items: "Toner Cartridges",
      amount: "KD 1,200.00",
      status: "Shipped",
      expectedDate: "2024-01-18",
    },
    {
      id: "PO-2024-003",
      vendor: "Kuwait Office Solutions",
      items: "Binding Materials",
      amount: "KD 850.00",
      status: "Delivered",
      expectedDate: "2024-01-15",
    },
  ];

  const vendors = [
    {
      name: "Al-Wazzan Trading Co.",
      category: "Paper Supplier",
      contact: "+965 2222 3333",
      email: "info@alwazzan.com.kw",
      status: "Active",
      orders: 24,
    },
    {
      name: "Gulf Supplies LLC",
      category: "Consumables",
      contact: "+965 2222 4444",
      email: "sales@gulfsupplies.com",
      status: "Active",
      orders: 18,
    },
    {
      name: "Kuwait Office Solutions",
      category: "General Supplies",
      contact: "+965 2222 5555",
      email: "orders@kos.com.kw",
      status: "Active",
      orders: 32,
    },
  ];

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPOStatusBadge = (status: string) => {
    switch (status) {
      case "Delivered":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Delivered</Badge>;
      case "Shipped":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Shipped</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Pending</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory & Procurement</h1>
        <p className="text-muted-foreground">Stock levels, purchase orders, and vendor management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${
                stat.trend === "up" ? "text-emerald-600" : 
                stat.trend === "warning" ? "text-yellow-600" : "text-red-600"
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.trend === "up" ? "text-emerald-600" : 
                stat.trend === "warning" ? "text-yellow-600" : "text-muted-foreground"
              }`}>
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="stock-levels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stock-levels">Stock Levels</TabsTrigger>
          <TabsTrigger value="purchase-orders">Purchase Orders</TabsTrigger>
          <TabsTrigger value="vendors">Vendor Management</TabsTrigger>
        </TabsList>

        <TabsContent value="stock-levels" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Monitor inventory levels and reorder points
            </p>
            <Button>Add Item</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Item ID</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead>Reorder Level</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Restocked</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {stockItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.id}</TableCell>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.quantity.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell>{item.reorderLevel.toLocaleString()}</TableCell>
                      <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastRestocked}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="purchase-orders" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Track and manage purchase orders
            </p>
            <Button>Create PO</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>PO Number</TableHead>
                    <TableHead>Vendor</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Expected Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {purchaseOrders.map((po) => (
                    <TableRow key={po.id}>
                      <TableCell className="font-medium">{po.id}</TableCell>
                      <TableCell>{po.vendor}</TableCell>
                      <TableCell>{po.items}</TableCell>
                      <TableCell className="font-medium">{po.amount}</TableCell>
                      <TableCell>{getPOStatusBadge(po.status)}</TableCell>
                      <TableCell>{po.expectedDate}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="vendors" className="space-y-4">
          <div className="flex justify-between items-center">
            <p className="text-sm text-muted-foreground">
              Manage supplier relationships and contacts
            </p>
            <Button>Add Vendor</Button>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Vendor Name</TableHead>
                    <TableHead>Category</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {vendors.map((vendor) => (
                    <TableRow key={vendor.name}>
                      <TableCell className="font-medium">{vendor.name}</TableCell>
                      <TableCell>{vendor.category}</TableCell>
                      <TableCell>{vendor.contact}</TableCell>
                      <TableCell>{vendor.email}</TableCell>
                      <TableCell>
                        <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">
                          {vendor.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{vendor.orders}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
