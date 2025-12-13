import { StatCard } from "@/components/dashboard/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  ShoppingCart, 
  Clock, 
  AlertCircle,
  CheckCircle2,
  Users
} from "lucide-react";

const recentOrders = [
  { id: "ORD-10234", customer: "Acme Corp", status: "In Production", priority: "High", value: "KD 2,340" },
  { id: "ORD-10233", customer: "TechStart Inc", status: "Prepress", priority: "Normal", value: "KD 890" },
  { id: "ORD-10232", customer: "Design Studio", status: "Ready to Ship", priority: "Urgent", value: "KD 1,560" },
  { id: "ORD-10231", customer: "Marketing Pro", status: "Quality Check", priority: "Normal", value: "KD 420" },
  { id: "ORD-10230", customer: "Print Plus", status: "Completed", priority: "Low", value: "KD 3,200" },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Total Revenue"
          value="KD 8,425"
          change="+12.5% from last month"
          changeType="positive"
          icon={DollarSign}
        />
        <StatCard
          title="Active Orders"
          value="156"
          change="+15.2% from last month"
          changeType="positive"
          icon={ShoppingCart}
        />
        <StatCard
          title="Total Customers"
          value="1,248"
          change="+8.3% from last month"
          changeType="positive"
          icon={Users}
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Recent Orders</span>
              <Badge variant="secondary" className="font-normal">Live</Badge>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between border-b pb-3 last:border-0 last:pb-0">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium text-sm">{order.id}</p>
                      {order.priority === "Urgent" && (
                        <AlertCircle className="h-3 w-3 text-destructive" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{order.customer}</p>
                  </div>
                  <div className="text-right space-y-1">
                    <Badge 
                      variant={order.status === "Completed" ? "default" : "secondary"}
                      className="text-xs"
                    >
                      {order.status}
                    </Badge>
                    <p className="text-sm font-medium">{order.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Notifications Alerts</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 rounded-lg bg-destructive/10">
                <AlertCircle className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Low Paper Stock Alert</p>
                  <p className="text-sm text-muted-foreground">Glossy A4 (300gsm) below minimum threshold</p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 rounded-lg bg-warning/10">
                <Clock className="h-5 w-5 text-warning flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">SLA Risk</p>
                  <p className="text-sm text-muted-foreground">3 orders approaching deadline in next 4 hours</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 rounded-lg bg-success/10">
                <CheckCircle2 className="h-5 w-5 text-success flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-medium text-sm">Batch Complete</p>
                  <p className="text-sm text-muted-foreground">Morning batch (45 orders) ready for dispatch</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
