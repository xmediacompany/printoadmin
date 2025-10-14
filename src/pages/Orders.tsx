import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, Download, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const orders = [
  { 
    id: "ORD-10234", 
    customer: "Acme Corp", 
    product: "Business Cards (500pcs)", 
    status: "In Production", 
    priority: "High", 
    created: "2 hours ago",
    deadline: "Tomorrow 3PM",
    value: "KD 2,340" 
  },
  { 
    id: "ORD-10233", 
    customer: "TechStart Inc", 
    product: "Flyers A5 (1000pcs)", 
    status: "Prepress", 
    priority: "Normal", 
    created: "5 hours ago",
    deadline: "Dec 18, 2PM",
    value: "KD 890" 
  },
  { 
    id: "ORD-10232", 
    customer: "Design Studio", 
    product: "Posters A3 (50pcs)", 
    status: "Ready to Ship", 
    priority: "Urgent", 
    created: "1 day ago",
    deadline: "Today 5PM",
    value: "KD 1,560" 
  },
  { 
    id: "ORD-10231", 
    customer: "Marketing Pro", 
    product: "Brochures A4 (200pcs)", 
    status: "Quality Check", 
    priority: "Normal", 
    created: "1 day ago",
    deadline: "Dec 19, 10AM",
    value: "KD 420" 
  },
  { 
    id: "ORD-10230", 
    customer: "Print Plus", 
    product: "Banners (5x3ft)", 
    status: "Completed", 
    priority: "Low", 
    created: "2 days ago",
    deadline: "Completed",
    value: "KD 3,200" 
  },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Completed": return "default";
    case "Ready to Ship": return "default";
    case "In Production": return "secondary";
    case "Prepress": return "secondary";
    case "Quality Check": return "secondary";
    default: return "secondary";
  }
};

const Orders = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Orders & Production Queue</h1>
          <p className="text-muted-foreground">Manage and track all production orders</p>
        </div>
        <Button>
          New Order
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search by order ID, customer..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="prepress">Prepress</SelectItem>
                  <SelectItem value="production">In Production</SelectItem>
                  <SelectItem value="qa">Quality Check</SelectItem>
                  <SelectItem value="shipping">Ready to Ship</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
              
              <Select defaultValue="all">
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priority</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="normal">Normal</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>

              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
              
              <Button variant="outline" size="icon">
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Order ID</th>
                  <th className="text-left p-4 font-medium text-sm">Customer</th>
                  <th className="text-left p-4 font-medium text-sm">Product</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Priority</th>
                  <th className="text-left p-4 font-medium text-sm">Deadline</th>
                  <th className="text-left p-4 font-medium text-sm">Value</th>
                  <th className="text-left p-4 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4">
                      <span className="font-medium">{order.id}</span>
                      <p className="text-xs text-muted-foreground">{order.created}</p>
                    </td>
                    <td className="p-4">{order.customer}</td>
                    <td className="p-4">{order.product}</td>
                    <td className="p-4">
                      <Badge variant={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <Badge 
                        variant={order.priority === "Urgent" ? "destructive" : "secondary"}
                        className="font-normal"
                      >
                        {order.priority}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className={order.deadline.includes("Today") || order.deadline.includes("Tomorrow") ? "text-warning font-medium" : ""}>
                        {order.deadline}
                      </span>
                    </td>
                    <td className="p-4 font-medium">{order.value}</td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Update Status</DropdownMenuItem>
                          <DropdownMenuItem>Change Priority</DropdownMenuItem>
                          <DropdownMenuItem>Print Label</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Orders;
