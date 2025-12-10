import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Truck, Navigation, Package, CheckCircle2, Plus, CalendarIcon, MapPin } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";

interface Route {
  id: string;
  driver: string;
  stops: number;
  completed: number;
  status: string;
  cod: string;
  date?: Date;
  area?: string;
}

const drivers = [
  "Ahmed Ali",
  "Sarah Hassan",
  "Mohammed Khalid",
  "Fatima Rashid",
  "Omar Abdullah",
  "Layla Ibrahim",
];

const kuwaitAreas = [
  "Shuwaikh Industrial",
  "Sharq District",
  "Hawally Area",
  "Salwa Complex",
  "Salmiya",
  "Farwaniya",
  "Jahra",
  "Ahmadi",
  "Mangaf",
  "Fahaheel",
];

const Fulfillment = () => {
  const [routes, setRoutes] = useState<Route[]>([
    { id: "R-001", driver: "Ahmed Ali", stops: 12, completed: 8, status: "in-progress", cod: "125.50" },
    { id: "R-002", driver: "Sarah Hassan", stops: 8, completed: 8, status: "completed", cod: "89.25" },
    { id: "R-003", driver: "Mohammed Khalid", stops: 15, completed: 3, status: "in-progress", cod: "0.00" },
    { id: "R-004", driver: "Fatima Rashid", stops: 10, completed: 0, status: "pending", cod: "0.00" },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    driver: "",
    stops: "",
    invoiceAmount: "",
    status: "pending",
    date: undefined as Date | undefined,
    area: "",
  });

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

  const generateRouteId = () => {
    const maxId = routes.reduce((max, route) => {
      const num = parseInt(route.id.replace("R-", ""));
      return num > max ? num : max;
    }, 0);
    return `R-${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleCreateRoute = () => {
    if (!newRoute.driver || !newRoute.stops || !newRoute.date || !newRoute.area) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const route: Route = {
      id: generateRouteId(),
      driver: newRoute.driver,
      stops: parseInt(newRoute.stops),
      completed: 0,
      status: newRoute.status,
      cod: newRoute.invoiceAmount || "0.00",
      date: newRoute.date,
      area: newRoute.area,
    };

    setRoutes([...routes, route]);
    setCreateDialogOpen(false);
    setNewRoute({
      driver: "",
      stops: "",
      invoiceAmount: "",
      status: "pending",
      date: undefined,
      area: "",
    });

    toast({
      title: "Route Created",
      description: `Route ${route.id} has been created successfully.`,
    });
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
            <Button onClick={() => setCreateDialogOpen(true)}>
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
                <TableHead>Status</TableHead>
                <TableHead>Invoice Amount</TableHead>
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium">Active Routes</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Truck className="h-8 w-8 text-primary" />
              <div className="text-2xl font-bold">{routes.length}</div>
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
              <div className="text-2xl font-bold">{routes.reduce((sum, r) => sum + (r.stops - r.completed), 0)}</div>
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
              <div className="text-2xl font-bold">{routes.reduce((sum, r) => sum + r.completed, 0)}</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Create Route Dialog */}
      <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create New Route</DialogTitle>
            <DialogDescription>
              Set up a new delivery route with driver assignment and stops.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="driver">Driver *</Label>
              <Select
                value={newRoute.driver}
                onValueChange={(value) => setNewRoute({ ...newRoute, driver: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a driver" />
                </SelectTrigger>
                <SelectContent>
                  {drivers.map((driver) => (
                    <SelectItem key={driver} value={driver}>
                      {driver}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="area">Delivery Area *</Label>
              <Select
                value={newRoute.area}
                onValueChange={(value) => setNewRoute({ ...newRoute, area: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery area" />
                </SelectTrigger>
                <SelectContent>
                  {kuwaitAreas.map((area) => (
                    <SelectItem key={area} value={area}>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-4 w-4 text-muted-foreground" />
                        {area}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Route Date *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !newRoute.date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {newRoute.date ? format(newRoute.date, "PPP") : "Select date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={newRoute.date}
                    onSelect={(date) => setNewRoute({ ...newRoute, date })}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="stops">Number of Stops *</Label>
                <Input
                  id="stops"
                  type="number"
                  min="1"
                  placeholder="e.g., 10"
                  value={newRoute.stops}
                  onChange={(e) => setNewRoute({ ...newRoute, stops: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="invoiceAmount">Invoice Amount (KD)</Label>
                <Input
                  id="invoiceAmount"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newRoute.invoiceAmount}
                  onChange={(e) => setNewRoute({ ...newRoute, invoiceAmount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="status">Initial Status</Label>
              <Select
                value={newRoute.status}
                onValueChange={(value) => setNewRoute({ ...newRoute, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                      Pending
                    </div>
                  </SelectItem>
                  <SelectItem value="in-progress">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      In Progress
                    </div>
                  </SelectItem>
                  <SelectItem value="completed">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-green-600" />
                      Completed
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateRoute}>
              <Plus className="h-4 w-4 mr-2" />
              Create Route
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Fulfillment;