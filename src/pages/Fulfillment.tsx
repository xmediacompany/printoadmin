import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Navigation, Banknote, Package, CheckCircle2, Plus } from "lucide-react";

const Fulfillment = () => {
  // Mock data for routes
  const routes = [
    { id: "R-001", driver: "Ahmed Ali", stops: 12, completed: 8, status: "in-progress", cod: "125.50" },
    { id: "R-002", driver: "Sarah Hassan", stops: 8, completed: 8, status: "completed", cod: "89.25" },
    { id: "R-003", driver: "Mohammed Khalid", stops: 15, completed: 3, status: "in-progress", cod: "0.00" },
    { id: "R-004", driver: "Fatima Rashid", stops: 10, completed: 0, status: "pending", cod: "0.00" },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
        return "default";
      case "in-progress":
      case "in-transit":
        return "secondary";
      case "pending":
      case "pending-pickup":
        return "outline";
      default:
        return "outline";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Delivery Drivers</h1>
        <p className="text-muted-foreground">First/last-mile handoff with proof of delivery</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Active Routes</CardTitle>
              <CardDescription>Manage delivery routes and driver assignments</CardDescription>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Create Route
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Route ID</TableHead>
                <TableHead>Driver</TableHead>
                <TableHead>Stops</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>COD Total</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {routes.map((route) => (
                <TableRow key={route.id}>
                  <TableCell className="font-medium">{route.id}</TableCell>
                  <TableCell>{route.driver}</TableCell>
                  <TableCell>{route.stops} stops</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-primary"
                          style={{ width: `${(route.completed / route.stops) * 100}%` }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">{route.completed}/{route.stops}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(route.status)}>
                      {route.status.replace("-", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell className="font-medium">KD {route.cod}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Navigation className="h-4 w-4 mr-1" />
                        Track
                      </Button>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">4</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Pending Deliveries</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Package className="h-8 w-8 text-secondary" />
              <div className="text-2xl font-bold">27</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
              <div className="text-2xl font-bold">19</div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">COD Collected</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Banknote className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">KD 215</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Fulfillment;