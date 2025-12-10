import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Package, 
  Building2,
  Search, 
  Filter, 
  Eye, 
  Edit,
  Plus,
  ArrowLeft,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck
} from "lucide-react";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";

interface BulkOrder {
  id: string;
  product: string;
  quantity: string;
  company: string;
  amount: string;
  status: string;
  date: string;
  deliveryDate: string;
}

const AllBulkOrders = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [newOrderOpen, setNewOrderOpen] = useState(false);

  const [bulkOrders, setBulkOrders] = useState<BulkOrder[]>([
    {
      id: "BO-001",
      product: "Business Cards",
      quantity: "50,000 units",
      company: "Tech Solutions Inc.",
      amount: "8,500 KD",
      status: "In Production",
      date: "2024-01-15",
      deliveryDate: "2024-01-25",
    },
    {
      id: "BO-002",
      product: "Marketing Brochures",
      quantity: "25,000 units",
      company: "Global Marketing Group",
      amount: "12,300 KD",
      status: "Pending Approval",
      date: "2024-01-14",
      deliveryDate: "2024-01-28",
    },
    {
      id: "BO-003",
      product: "Custom Stationery",
      quantity: "10,000 units",
      company: "Design Studio Pro",
      amount: "4,200 KD",
      status: "Quote Sent",
      date: "2024-01-13",
      deliveryDate: "2024-01-30",
    },
    {
      id: "BO-004",
      product: "Corporate Letterheads",
      quantity: "30,000 units",
      company: "Tech Solutions Inc.",
      amount: "6,800 KD",
      status: "Completed",
      date: "2024-01-10",
      deliveryDate: "2024-01-20",
    },
    {
      id: "BO-005",
      product: "Promotional Flyers",
      quantity: "100,000 units",
      company: "Global Marketing Group",
      amount: "15,500 KD",
      status: "In Production",
      date: "2024-01-12",
      deliveryDate: "2024-01-22",
    },
    {
      id: "BO-006",
      product: "Product Catalogs",
      quantity: "5,000 units",
      company: "Design Studio Pro",
      amount: "9,200 KD",
      status: "Pending Approval",
      date: "2024-01-11",
      deliveryDate: "2024-01-26",
    },
  ]);

  const getOrderStatusIcon = (status: string) => {
    switch (status) {
      case "In Production": return <Package className="h-4 w-4 text-blue-500" />;
      case "Pending Approval": return <Clock className="h-4 w-4 text-amber-500" />;
      case "Completed": return <CheckCircle2 className="h-4 w-4 text-green-500" />;
      case "Quote Sent": return <FileCheck className="h-4 w-4 text-purple-500" />;
      default: return <AlertCircle className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getOrderStatusVariant = (status: string) => {
    switch (status) {
      case "In Production": return "default";
      case "Pending Approval": return "secondary";
      case "Completed": return "outline";
      case "Quote Sent": return "outline";
      default: return "secondary";
    }
  };

  const filteredOrders = bulkOrders.filter((order) => {
    const matchesSearch = order.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/b2b-corporate">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Package className="h-8 w-8 text-primary" />
              All Bulk Orders
            </h1>
            <p className="text-muted-foreground">View and manage all corporate bulk orders</p>
          </div>
        </div>
        <Button onClick={() => setNewOrderOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create New Order
        </Button>
      </div>

      <NewOrderDialog 
        open={newOrderOpen} 
        onOpenChange={setNewOrderOpen}
        onOrderCreated={() => {}}
      />

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by order ID, product, or company..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="In Production">In Production</SelectItem>
            <SelectItem value="Pending Approval">Pending Approval</SelectItem>
            <SelectItem value="Quote Sent">Quote Sent</SelectItem>
            <SelectItem value="Completed">Completed</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Orders Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Product</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Order Date</TableHead>
                <TableHead>Delivery Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Package className="h-4 w-4 text-muted-foreground" />
                        <span className="font-medium">{order.product}</span>
                      </div>
                    </TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-3 w-3 text-muted-foreground" />
                        {order.company}
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">{order.amount}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {order.date}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {order.deliveryDate}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getOrderStatusVariant(order.status) as any} className="flex items-center gap-1 w-fit">
                        {getOrderStatusIcon(order.status)}
                        {order.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                    No orders found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {filteredOrders.length} of {bulkOrders.length} orders
      </div>
    </div>
  );
};

export default AllBulkOrders;