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
import { Truck, Package, CheckCircle2, Plus, CalendarIcon, MapPin, UserPlus, X, MoreVertical, Pencil, Trash2 } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
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
  areas?: string[];
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