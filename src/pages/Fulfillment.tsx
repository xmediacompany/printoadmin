import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Truck, Package, CheckCircle2, Plus, CalendarIcon, MapPin, UserPlus, X, MoreVertical, Pencil, Trash2, Phone, ShoppingBag, Clock, Eye } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Route {
  id: string;
  driver: string;
  stops: number;
  completed: number;
  status: string;
  cod: string;
  date?: Date;
  areas?: string[];
}

interface DriverOrder {
  orderId: string;
  customer: string;
  product: string;
  status: string;
  deliveryAddress: string;
  deadline: string;
  value: string;
}

interface DriverAssignment {
  driverName: string;
  phone: string;
  totalOrders: number;
  completedOrders: number;
  status: "on-route" | "available" | "off-duty";
  orders: DriverOrder[];
}

const initialDrivers = [
  "Ahmed Ali",
  "Sarah Hassan",
  "Mohammed Khalid",
  "Fatima Rashid",
  "Omar Abdullah",
  "Layla Ibrahim",
];

const initialAreas = [
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

const initialDriverAssignments: DriverAssignment[] = [
  {
    driverName: "Ahmed Ali",
    phone: "+965 9876 5432",
    totalOrders: 4,
    completedOrders: 2,
    status: "on-route",
    orders: [
      { orderId: "ORD-10232", customer: "Design Studio", product: "Posters A3 (50pcs)", status: "In Transit", deliveryAddress: "Hawally Area, Building 7", deadline: "Today 5PM", value: "KD 1,560" },
      { orderId: "ORD-10245", customer: "Quick Print", product: "Flyers (500pcs)", status: "Pending Pickup", deliveryAddress: "Salmiya, Block 3", deadline: "Today 6PM", value: "KD 320" },
      { orderId: "ORD-10251", customer: "Media Corp", product: "Brochures (100pcs)", status: "Delivered", deliveryAddress: "Sharq, Tower 5", deadline: "Completed", value: "KD 450" },
      { orderId: "ORD-10248", customer: "Event Pro", product: "Banners (3pcs)", status: "Delivered", deliveryAddress: "Hawally, Street 12", deadline: "Completed", value: "KD 780" },
    ]
  },
  {
    driverName: "Sarah Hassan",
    phone: "+965 9123 4567",
    totalOrders: 3,
    completedOrders: 3,
    status: "available",
    orders: [
      { orderId: "ORD-10230", customer: "Print Plus", product: "Banners (5x3ft)", status: "Delivered", deliveryAddress: "Farwaniya, Street 5", deadline: "Completed", value: "KD 3,200" },
      { orderId: "ORD-10238", customer: "Tech Hub", product: "Business Cards (1000pcs)", status: "Delivered", deliveryAddress: "Shuwaikh, Block 2", deadline: "Completed", value: "KD 180" },
      { orderId: "ORD-10241", customer: "Startup Inc", product: "Stickers (500pcs)", status: "Delivered", deliveryAddress: "Sharq District", deadline: "Completed", value: "KD 95" },
    ]
  },
  {
    driverName: "Mohammed Khalid",
    phone: "+965 9234 5678",
    totalOrders: 5,
    completedOrders: 1,
    status: "on-route",
    orders: [
      { orderId: "ORD-10255", customer: "Retail Store", product: "Price Tags (2000pcs)", status: "In Transit", deliveryAddress: "Jahra, Mall Area", deadline: "Today 4PM", value: "KD 120" },
      { orderId: "ORD-10256", customer: "Office Corp", product: "Letterheads (500pcs)", status: "Pending Pickup", deliveryAddress: "Ahmadi, Industrial", deadline: "Today 5PM", value: "KD 210" },
      { orderId: "ORD-10257", customer: "Design Lab", product: "Posters A2 (25pcs)", status: "Pending Pickup", deliveryAddress: "Mangaf, Block 1", deadline: "Today 6PM", value: "KD 375" },
      { orderId: "ORD-10258", customer: "Marketing Agency", product: "Flyers A4 (1000pcs)", status: "Pending Pickup", deliveryAddress: "Fahaheel Center", deadline: "Tomorrow 10AM", value: "KD 290" },
      { orderId: "ORD-10250", customer: "Local Shop", product: "Business Cards (250pcs)", status: "Delivered", deliveryAddress: "Salmiya, Complex A", deadline: "Completed", value: "KD 65" },
    ]
  },
  {
    driverName: "Fatima Rashid",
    phone: "+965 9345 6789",
    totalOrders: 2,
    completedOrders: 0,
    status: "on-route",
    orders: [
      { orderId: "ORD-10260", customer: "Cafe Central", product: "Menu Cards (50pcs)", status: "In Transit", deliveryAddress: "Sharq, Food Court", deadline: "Today 3PM", value: "KD 185" },
      { orderId: "ORD-10261", customer: "Gym Plus", product: "Membership Cards (200pcs)", status: "Pending Pickup", deliveryAddress: "Salmiya, Sports Complex", deadline: "Today 5PM", value: "KD 240" },
    ]
  },
];

const Fulfillment = () => {
  const [routes, setRoutes] = useState<Route[]>([
    { id: "R-001", driver: "Ahmed Ali", stops: 12, completed: 8, status: "in-progress", cod: "125.50" },
    { id: "R-002", driver: "Sarah Hassan", stops: 8, completed: 8, status: "completed", cod: "89.25" },
    { id: "R-003", driver: "Mohammed Khalid", stops: 15, completed: 3, status: "in-progress", cod: "0.00" },
    { id: "R-004", driver: "Fatima Rashid", stops: 10, completed: 0, status: "pending", cod: "0.00" },
  ]);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedRoute, setSelectedRoute] = useState<Route | null>(null);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [areas, setAreas] = useState(initialAreas);
  const [showCustomDriverInput, setShowCustomDriverInput] = useState(false);
  const [showCustomAreaInput, setShowCustomAreaInput] = useState(false);
  const [showEditCustomDriverInput, setShowEditCustomDriverInput] = useState(false);
  const [showEditCustomAreaInput, setShowEditCustomAreaInput] = useState(false);
  const [customDriverName, setCustomDriverName] = useState("");
  const [customAreaName, setCustomAreaName] = useState("");
  const [driverAssignments] = useState<DriverAssignment[]>(initialDriverAssignments);
  const [selectedDriverForView, setSelectedDriverForView] = useState<DriverAssignment | null>(null);
  const [viewOrdersDialogOpen, setViewOrdersDialogOpen] = useState(false);
  const [newRoute, setNewRoute] = useState({
    driver: "",
    stops: "",
    invoiceAmount: "",
    status: "pending",
    date: undefined as Date | undefined,
    selectedAreas: [] as string[],
  });
  const [editRoute, setEditRoute] = useState({
    id: "",
    driver: "",
    stops: "",
    invoiceAmount: "",
    status: "pending",
    date: undefined as Date | undefined,
    selectedAreas: [] as string[],
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
      case "delivered":
      case "Delivered":
        return "default";
      case "in-progress":
      case "in-transit":
      case "In Transit":
        return "secondary";
      case "pending":
      case "pending-pickup":
      case "Pending Pickup":
        return "outline";
      default:
        return "outline";
    }
  };

  const getDriverStatusColor = (status: string) => {
    switch (status) {
      case "on-route": return "bg-blue-500/20 text-blue-600 border-blue-500/30";
      case "available": return "bg-green-500/20 text-green-600 border-green-500/30";
      case "off-duty": return "bg-gray-500/20 text-gray-600 border-gray-500/30";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const handleViewDriverOrders = (driver: DriverAssignment) => {
    setSelectedDriverForView(driver);
    setViewOrdersDialogOpen(true);
  };

  const generateRouteId = () => {
    const maxId = routes.reduce((max, route) => {
      const num = parseInt(route.id.replace("R-", ""));
      return num > max ? num : max;
    }, 0);
    return `R-${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleCreateRoute = () => {
    if (!newRoute.driver || !newRoute.stops || !newRoute.date || newRoute.selectedAreas.length === 0) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields including at least one delivery area.",
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
      areas: newRoute.selectedAreas,
    };

    setRoutes([...routes, route]);
    setCreateDialogOpen(false);
    setNewRoute({
      driver: "",
      stops: "",
      invoiceAmount: "",
      status: "pending",
      date: undefined,
      selectedAreas: [],
    });
    setShowCustomDriverInput(false);
    setShowCustomAreaInput(false);
    setCustomDriverName("");
    setCustomAreaName("");

    toast({
      title: "Route Created",
      description: `Route ${route.id} has been created successfully.`,
    });
  };

  const handleEditClick = (route: Route) => {
    setSelectedRoute(route);
    setEditRoute({
      id: route.id,
      driver: route.driver,
      stops: route.stops.toString(),
      invoiceAmount: route.cod,
      status: route.status,
      date: route.date,
      selectedAreas: route.areas || [],
    });
    setEditDialogOpen(true);
  };

  const handleEditRoute = () => {
    if (!editRoute.driver || !editRoute.stops) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setRoutes(routes.map((route) =>
      route.id === editRoute.id
        ? {
            ...route,
            driver: editRoute.driver,
            stops: parseInt(editRoute.stops),
            status: editRoute.status,
            cod: editRoute.invoiceAmount || "0.00",
            date: editRoute.date,
            areas: editRoute.selectedAreas,
          }
        : route
    ));
    setEditDialogOpen(false);
    setShowEditCustomDriverInput(false);
    setShowEditCustomAreaInput(false);
    toast({
      title: "Route Updated",
      description: `Route ${editRoute.id} has been updated successfully.`,
    });
  };

  const handleDeleteClick = (route: Route) => {
    setSelectedRoute(route);
    setDeleteDialogOpen(true);
  };

  const handleDeleteRoute = () => {
    if (selectedRoute) {
      setRoutes(routes.filter((route) => route.id !== selectedRoute.id));
      setDeleteDialogOpen(false);
      toast({
        title: "Route Deleted",
        description: `Route ${selectedRoute.id} has been deleted.`,
      });
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
                <TableHead className="w-[50px]">Actions</TableHead>
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
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEditClick(route)}>
                          <Pencil className="h-4 w-4 mr-2" />
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteClick(route)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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

      {/* Driver Order Assignments Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="h-5 w-5 text-primary" />
                Driver Order Assignments
              </CardTitle>
              <CardDescription>Track which driver is handling which orders</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {driverAssignments.map((driver) => (
              <Card 
                key={driver.driverName} 
                className={`border-l-4 ${
                  driver.status === "on-route" 
                    ? "border-l-blue-500" 
                    : driver.status === "available" 
                    ? "border-l-green-500" 
                    : "border-l-gray-400"
                }`}
              >
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/20 text-primary font-semibold">
                          {driver.driverName.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold">{driver.driverName}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {driver.phone}
                        </p>
                      </div>
                    </div>
                    <Badge className={`${getDriverStatusColor(driver.status)} border`}>
                      {driver.status === "on-route" ? "On Route" : driver.status === "available" ? "Available" : "Off Duty"}
                    </Badge>
                  </div>

                  <Separator className="my-4" />

                  <div className="grid grid-cols-3 gap-2 text-center mb-4">
                    <div className="p-2 rounded-lg bg-muted/50">
                      <p className="text-2xl font-bold text-primary">{driver.totalOrders}</p>
                      <p className="text-xs text-muted-foreground">Total Orders</p>
                    </div>
                    <div className="p-2 rounded-lg bg-green-500/10">
                      <p className="text-2xl font-bold text-green-600">{driver.completedOrders}</p>
                      <p className="text-xs text-muted-foreground">Completed</p>
                    </div>
                    <div className="p-2 rounded-lg bg-orange-500/10">
                      <p className="text-2xl font-bold text-orange-600">{driver.totalOrders - driver.completedOrders}</p>
                      <p className="text-xs text-muted-foreground">Pending</p>
                    </div>
                  </div>

                  {/* Recent Orders Preview */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Recent Orders</p>
                    {driver.orders.slice(0, 2).map((order) => (
                      <div key={order.orderId} className="flex items-center justify-between p-2 rounded-lg bg-muted/30 text-sm">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{order.orderId}</span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground truncate max-w-[120px]">{order.customer}</span>
                        </div>
                        <Badge variant={getStatusColor(order.status)} className="text-xs">
                          {order.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <Button 
                    variant="outline" 
                    className="w-full mt-4"
                    onClick={() => handleViewDriverOrders(driver)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View All Orders ({driver.orders.length})
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* View Driver Orders Dialog */}
      <Dialog open={viewOrdersDialogOpen} onOpenChange={setViewOrdersDialogOpen}>
        <DialogContent className="sm:max-w-[700px] max-h-[85vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3">
              {selectedDriverForView && (
                <>
                  <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-primary/20 text-primary">
                      {selectedDriverForView.driverName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <span>{selectedDriverForView.driverName}'s Orders</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      {selectedDriverForView.phone}
                    </p>
                  </div>
                </>
              )}
            </DialogTitle>
            <DialogDescription>
              All orders assigned to this driver
            </DialogDescription>
          </DialogHeader>

          {selectedDriverForView && (
            <div className="space-y-4">
              {/* Driver Stats */}
              <div className="grid grid-cols-4 gap-3">
                <div className="p-3 rounded-lg bg-primary/10 text-center">
                  <p className="text-xl font-bold text-primary">{selectedDriverForView.totalOrders}</p>
                  <p className="text-xs text-muted-foreground">Total</p>
                </div>
                <div className="p-3 rounded-lg bg-green-500/10 text-center">
                  <p className="text-xl font-bold text-green-600">{selectedDriverForView.completedOrders}</p>
                  <p className="text-xs text-muted-foreground">Delivered</p>
                </div>
                <div className="p-3 rounded-lg bg-blue-500/10 text-center">
                  <p className="text-xl font-bold text-blue-600">
                    {selectedDriverForView.orders.filter(o => o.status === "In Transit").length}
                  </p>
                  <p className="text-xs text-muted-foreground">In Transit</p>
                </div>
                <div className="p-3 rounded-lg bg-orange-500/10 text-center">
                  <p className="text-xl font-bold text-orange-600">
                    {selectedDriverForView.orders.filter(o => o.status === "Pending Pickup").length}
                  </p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
              </div>

              {/* Orders List */}
              <ScrollArea className="h-[400px] pr-4">
                <div className="space-y-3">
                  {selectedDriverForView.orders.map((order) => (
                    <Card key={order.orderId} className="p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold">{order.orderId}</span>
                            <Badge variant={getStatusColor(order.status)}>
                              {order.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">{order.customer}</p>
                        </div>
                        <span className="font-semibold text-primary">{order.value}</span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Package className="h-3 w-3" /> Product
                          </p>
                          <p className="font-medium">{order.product}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" /> Deadline
                          </p>
                          <p className={`font-medium ${order.deadline.includes("Today") ? "text-orange-600" : ""}`}>
                            {order.deadline}
                          </p>
                        </div>
                        <div className="col-span-2">
                          <p className="text-muted-foreground flex items-center gap-1">
                            <MapPin className="h-3 w-3" /> Delivery Address
                          </p>
                          <p className="font-medium">{order.deliveryAddress}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setViewOrdersDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              {showCustomDriverInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter driver name"
                    value={customDriverName}
                    onChange={(e) => setCustomDriverName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customDriverName.trim()) {
                        setDrivers([...drivers, customDriverName.trim()]);
                        setNewRoute({ ...newRoute, driver: customDriverName.trim() });
                        setCustomDriverName("");
                        setShowCustomDriverInput(false);
                        toast({
                          title: "Driver Added",
                          description: `${customDriverName.trim()} has been added to the list.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomDriverInput(false);
                      setCustomDriverName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Select
                  value={newRoute.driver}
                  onValueChange={(value) => {
                    if (value === "__add_custom__") {
                      setShowCustomDriverInput(true);
                    } else {
                      setNewRoute({ ...newRoute, driver: value });
                    }
                  }}
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
                    <SelectItem value="__add_custom__">
                      <div className="flex items-center gap-2 text-primary">
                        <UserPlus className="h-4 w-4" />
                        Add Custom Driver
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Delivery Areas * ({newRoute.selectedAreas.length} selected)</Label>
              <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                {areas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`area-${area}`}
                      checked={newRoute.selectedAreas.includes(area)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRoute({
                            ...newRoute,
                            selectedAreas: [...newRoute.selectedAreas, area],
                          });
                        } else {
                          setNewRoute({
                            ...newRoute,
                            selectedAreas: newRoute.selectedAreas.filter((a) => a !== area),
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={`area-${area}`}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {area}
                    </label>
                  </div>
                ))}
              </div>
              {showCustomAreaInput ? (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter area name"
                    value={customAreaName}
                    onChange={(e) => setCustomAreaName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customAreaName.trim()) {
                        const newArea = customAreaName.trim();
                        setAreas([...areas, newArea]);
                        setNewRoute({
                          ...newRoute,
                          selectedAreas: [...newRoute.selectedAreas, newArea],
                        });
                        setCustomAreaName("");
                        setShowCustomAreaInput(false);
                        toast({
                          title: "Area Added",
                          description: `${newArea} has been added and selected.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomAreaInput(false);
                      setCustomAreaName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowCustomAreaInput(true)}
                  className="w-fit"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Area
                </Button>
              )}
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

      {/* Edit Route Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Route {editRoute.id}</DialogTitle>
            <DialogDescription>
              Update the route details below.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Driver *</Label>
              {showEditCustomDriverInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter driver name"
                    value={customDriverName}
                    onChange={(e) => setCustomDriverName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customDriverName.trim()) {
                        setDrivers([...drivers, customDriverName.trim()]);
                        setEditRoute({ ...editRoute, driver: customDriverName.trim() });
                        setCustomDriverName("");
                        setShowEditCustomDriverInput(false);
                        toast({
                          title: "Driver Added",
                          description: `${customDriverName.trim()} has been added.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowEditCustomDriverInput(false);
                      setCustomDriverName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Select
                  value={editRoute.driver}
                  onValueChange={(value) => {
                    if (value === "__add_custom__") {
                      setShowEditCustomDriverInput(true);
                    } else {
                      setEditRoute({ ...editRoute, driver: value });
                    }
                  }}
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
                    <SelectItem value="__add_custom__">
                      <div className="flex items-center gap-2 text-primary">
                        <UserPlus className="h-4 w-4" />
                        Add Custom Driver
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Delivery Areas ({editRoute.selectedAreas.length} selected)</Label>
              <div className="border rounded-md p-3 max-h-48 overflow-y-auto space-y-2">
                {areas.map((area) => (
                  <div key={area} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-area-${area}`}
                      checked={editRoute.selectedAreas.includes(area)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setEditRoute({
                            ...editRoute,
                            selectedAreas: [...editRoute.selectedAreas, area],
                          });
                        } else {
                          setEditRoute({
                            ...editRoute,
                            selectedAreas: editRoute.selectedAreas.filter((a) => a !== area),
                          });
                        }
                      }}
                    />
                    <label
                      htmlFor={`edit-area-${area}`}
                      className="flex items-center gap-2 text-sm cursor-pointer"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      {area}
                    </label>
                  </div>
                ))}
              </div>
              {showEditCustomAreaInput ? (
                <div className="flex gap-2 mt-2">
                  <Input
                    placeholder="Enter area name"
                    value={customAreaName}
                    onChange={(e) => setCustomAreaName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customAreaName.trim()) {
                        const newArea = customAreaName.trim();
                        setAreas([...areas, newArea]);
                        setEditRoute({
                          ...editRoute,
                          selectedAreas: [...editRoute.selectedAreas, newArea],
                        });
                        setCustomAreaName("");
                        setShowEditCustomAreaInput(false);
                        toast({
                          title: "Area Added",
                          description: `${newArea} has been added and selected.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowEditCustomAreaInput(false);
                      setCustomAreaName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowEditCustomAreaInput(true)}
                  className="w-fit"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Custom Area
                </Button>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Number of Stops *</Label>
                <Input
                  type="number"
                  min="1"
                  value={editRoute.stops}
                  onChange={(e) => setEditRoute({ ...editRoute, stops: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Invoice Amount (KD)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={editRoute.invoiceAmount}
                  onChange={(e) => setEditRoute({ ...editRoute, invoiceAmount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Status</Label>
              <Select
                value={editRoute.status}
                onValueChange={(value) => setEditRoute({ ...editRoute, status: value })}
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
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditRoute}>
              <Pencil className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Route</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete route {selectedRoute?.id}? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteRoute} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Fulfillment;