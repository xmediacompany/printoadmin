import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Filter, Download, MoreVertical, Truck, User, UserPlus, X, Phone, MapPin, Clock, CheckCircle2, Pencil, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/hooks/use-toast";

interface Order {
  id: string;
  customer: string;
  product: string;
  status: string;
  priority: string;
  created: string;
  deadline: string;
  value: string;
  driver?: string;
  driverPhone?: string;
  deliveryAddress?: string;
}

const initialOrders: Order[] = [
  { 
    id: "ORD-10234", 
    customer: "Acme Corp", 
    product: "Business Cards (500pcs)", 
    status: "In Production", 
    priority: "High", 
    created: "2 hours ago",
    deadline: "Tomorrow 3PM",
    value: "KD 2,340",
    deliveryAddress: "Shuwaikh Industrial Area, Block 4"
  },
  { 
    id: "ORD-10233", 
    customer: "TechStart Inc", 
    product: "Flyers A5 (1000pcs)", 
    status: "Prepress", 
    priority: "Normal", 
    created: "5 hours ago",
    deadline: "Dec 18, 2PM",
    value: "KD 890",
    deliveryAddress: "Sharq District, Tower 12"
  },
  { 
    id: "ORD-10232", 
    customer: "Design Studio", 
    product: "Posters A3 (50pcs)", 
    status: "Ready to Ship", 
    priority: "Urgent", 
    created: "1 day ago",
    deadline: "Today 5PM",
    value: "KD 1,560",
    driver: "Ahmed Ali",
    driverPhone: "+965 9876 5432",
    deliveryAddress: "Hawally Area, Building 7"
  },
  { 
    id: "ORD-10231", 
    customer: "Marketing Pro", 
    product: "Brochures A4 (200pcs)", 
    status: "Quality Check", 
    priority: "Normal", 
    created: "1 day ago",
    deadline: "Dec 19, 10AM",
    value: "KD 420",
    deliveryAddress: "Salmiya, Block 2"
  },
  { 
    id: "ORD-10230", 
    customer: "Print Plus", 
    product: "Banners (5x3ft)", 
    status: "Completed", 
    priority: "Low", 
    created: "2 days ago",
    deadline: "Completed",
    value: "KD 3,200",
    driver: "Sarah Hassan",
    driverPhone: "+965 9123 4567",
    deliveryAddress: "Farwaniya, Street 5"
  },
];

const initialDrivers = [
  { name: "Ahmed Ali", phone: "+965 9876 5432", available: true, activeOrders: 3 },
  { name: "Sarah Hassan", phone: "+965 9123 4567", available: true, activeOrders: 2 },
  { name: "Mohammed Khalid", phone: "+965 9234 5678", available: false, activeOrders: 5 },
  { name: "Fatima Rashid", phone: "+965 9345 6789", available: true, activeOrders: 1 },
  { name: "Omar Abdullah", phone: "+965 9456 7890", available: true, activeOrders: 0 },
  { name: "Layla Ibrahim", phone: "+965 9567 8901", available: false, activeOrders: 4 },
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
  const [ordersList, setOrdersList] = useState<Order[]>(initialOrders);
  const [drivers, setDrivers] = useState(initialDrivers);
  const [assignDialogOpen, setAssignDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [selectedDriver, setSelectedDriver] = useState("");
  const [showCustomDriverInput, setShowCustomDriverInput] = useState(false);
  const [customDriverName, setCustomDriverName] = useState("");
  const [customDriverPhone, setCustomDriverPhone] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [orderToDelete, setOrderToDelete] = useState<Order | null>(null);

  const handleAssignDriver = (order: Order) => {
    setSelectedOrder(order);
    setSelectedDriver(order.driver || "");
    setAssignDialogOpen(true);
  };

  const handleConfirmAssignment = () => {
    if (!selectedOrder || !selectedDriver) {
      toast({
        title: "Select a Driver",
        description: "Please select a driver to assign to this order.",
        variant: "destructive",
      });
      return;
    }

    const driver = drivers.find(d => d.name === selectedDriver);
    
    setOrdersList(ordersList.map(order => 
      order.id === selectedOrder.id
        ? { 
            ...order, 
            driver: selectedDriver,
            driverPhone: driver?.phone || customDriverPhone,
          }
        : order
    ));

    setAssignDialogOpen(false);
    setSelectedOrder(null);
    setSelectedDriver("");
    setShowCustomDriverInput(false);
    setCustomDriverName("");
    setCustomDriverPhone("");

    toast({
      title: "Driver Assigned",
      description: `${selectedDriver} has been assigned to order ${selectedOrder.id}.`,
    });
  };

  const handleAddCustomDriver = () => {
    if (customDriverName.trim() && customDriverPhone.trim()) {
      const newDriver = {
        name: customDriverName.trim(),
        phone: customDriverPhone.trim(),
        available: true,
        activeOrders: 0,
      };
      setDrivers([...drivers, newDriver]);
      setSelectedDriver(newDriver.name);
      setShowCustomDriverInput(false);
      setCustomDriverName("");
      setCustomDriverPhone("");
      toast({
        title: "Driver Added",
        description: `${newDriver.name} has been added to the driver list.`,
      });
    }
  };

  const handleRemoveDriver = (orderId: string) => {
    setOrdersList(ordersList.map(order =>
      order.id === orderId
        ? { ...order, driver: undefined, driverPhone: undefined }
        : order
    ));
    toast({
      title: "Driver Removed",
      description: "Driver has been unassigned from the order.",
    });
  };

  const handleEditOrder = (order: Order) => {
    setEditingOrder({ ...order });
    setEditDialogOpen(true);
  };

  const handleSaveEdit = () => {
    if (!editingOrder) return;
    setOrdersList(ordersList.map(order =>
      order.id === editingOrder.id ? editingOrder : order
    ));
    setEditDialogOpen(false);
    setEditingOrder(null);
    toast({
      title: "Order Updated",
      description: `Order ${editingOrder.id} has been updated successfully.`,
    });
  };

  const handleDeleteOrder = (order: Order) => {
    setOrderToDelete(order);
    setDeleteDialogOpen(true);
  };

  const handleConfirmDelete = () => {
    if (!orderToDelete) return;
    setOrdersList(ordersList.filter(order => order.id !== orderToDelete.id));
    setDeleteDialogOpen(false);
    toast({
      title: "Order Deleted",
      description: `Order ${orderToDelete.id} has been deleted.`,
      variant: "destructive",
    });
    setOrderToDelete(null);
  };

  const assignedOrders = ordersList.filter(o => o.driver);
  const unassignedReadyOrders = ordersList.filter(o => !o.driver && (o.status === "Ready to Ship" || o.status === "Completed"));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Orders & Production Queue</h1>
        <p className="text-muted-foreground">Manage and track all production orders</p>
      </div>

      {/* Driver Assignment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Orders</p>
                <p className="text-2xl font-bold">{ordersList.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center">
                <Truck className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-green-500/10 to-green-500/5 border-green-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Driver Assigned</p>
                <p className="text-2xl font-bold">{assignedOrders.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-green-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 border-orange-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Needs Assignment</p>
                <p className="text-2xl font-bold">{unassignedReadyOrders.length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-orange-500/20 flex items-center justify-center">
                <Clock className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="bg-gradient-to-br from-blue-500/10 to-blue-500/5 border-blue-500/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Available Drivers</p>
                <p className="text-2xl font-bold">{drivers.filter(d => d.available).length}</p>
              </div>
              <div className="h-12 w-12 rounded-full bg-blue-500/20 flex items-center justify-center">
                <User className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>
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
                  <SelectValue placeholder="Deadline" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Deadlines</SelectItem>
                  <SelectItem value="today">Today</SelectItem>
                  <SelectItem value="tomorrow">Tomorrow</SelectItem>
                  <SelectItem value="this-week">This Week</SelectItem>
                  <SelectItem value="overdue">Overdue</SelectItem>
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
                  <th className="text-left p-4 font-medium text-sm">Driver</th>
                  <th className="text-left p-4 font-medium text-sm">Deadline</th>
                  <th className="text-left p-4 font-medium text-sm">Value</th>
                  <th className="text-left p-4 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {ordersList.map((order) => (
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
                      {order.driver ? (
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7">
                            <AvatarFallback className="text-xs bg-primary/20 text-primary">
                              {order.driver.split(' ').map(n => n[0]).join('')}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{order.driver}</p>
                            <p className="text-xs text-muted-foreground">{order.driverPhone}</p>
                          </div>
                        </div>
                      ) : (
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="text-xs"
                          onClick={() => handleAssignDriver(order)}
                        >
                          <UserPlus className="h-3 w-3 mr-1" />
                          Assign
                        </Button>
                      )}
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
                        <DropdownMenuContent align="end" className="bg-popover">
                          <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                            <Pencil className="h-4 w-4 mr-2" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleAssignDriver(order)}>
                            <Truck className="h-4 w-4 mr-2" />
                            {order.driver ? "Change Driver" : "Assign Driver"}
                          </DropdownMenuItem>
                          {order.driver && (
                            <DropdownMenuItem 
                              onClick={() => handleRemoveDriver(order.id)}
                              className="text-destructive"
                            >
                              <X className="h-4 w-4 mr-2" />
                              Remove Driver
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => handleDeleteOrder(order)}
                            className="text-destructive"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Order
                          </DropdownMenuItem>
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

      {/* Assign Driver Dialog */}
      <Dialog open={assignDialogOpen} onOpenChange={setAssignDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Assign Driver to Order
            </DialogTitle>
            <DialogDescription>
              Select a driver to deliver order {selectedOrder?.id} to {selectedOrder?.customer}
            </DialogDescription>
          </DialogHeader>

          {selectedOrder && (
            <div className="space-y-4">
              {/* Order Summary */}
              <Card className="bg-muted/50">
                <CardContent className="pt-4">
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-muted-foreground">Product</p>
                      <p className="font-medium">{selectedOrder.product}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Value</p>
                      <p className="font-medium">{selectedOrder.value}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> Delivery Address
                      </p>
                      <p className="font-medium">{selectedOrder.deliveryAddress || "Not specified"}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Driver Selection */}
              <div className="space-y-3">
                <Label>Select Driver</Label>
                {showCustomDriverInput ? (
                  <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                    <Input
                      placeholder="Driver Name"
                      value={customDriverName}
                      onChange={(e) => setCustomDriverName(e.target.value)}
                    />
                    <Input
                      placeholder="Phone Number"
                      value={customDriverPhone}
                      onChange={(e) => setCustomDriverPhone(e.target.value)}
                    />
                    <div className="flex gap-2">
                      <Button size="sm" onClick={handleAddCustomDriver}>
                        Add Driver
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setShowCustomDriverInput(false);
                          setCustomDriverName("");
                          setCustomDriverPhone("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                ) : (
                  <ScrollArea className="h-[250px] border rounded-lg">
                    <div className="p-2 space-y-2">
                      {drivers.map((driver) => (
                        <div
                          key={driver.name}
                          onClick={() => driver.available && setSelectedDriver(driver.name)}
                          className={`p-3 rounded-lg border cursor-pointer transition-all ${
                            selectedDriver === driver.name
                              ? "border-primary bg-primary/10"
                              : driver.available
                              ? "hover:border-primary/50 hover:bg-muted/50"
                              : "opacity-50 cursor-not-allowed"
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Avatar className="h-10 w-10">
                                <AvatarFallback className={`${driver.available ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"}`}>
                                  {driver.name.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{driver.name}</p>
                                <p className="text-xs text-muted-foreground flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {driver.phone}
                                </p>
                              </div>
                            </div>
                            <div className="text-right">
                              <Badge variant={driver.available ? "default" : "secondary"}>
                                {driver.available ? "Available" : "Busy"}
                              </Badge>
                              <p className="text-xs text-muted-foreground mt-1">
                                {driver.activeOrders} active orders
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                      <div
                        onClick={() => setShowCustomDriverInput(true)}
                        className="p-3 rounded-lg border border-dashed cursor-pointer hover:border-primary/50 hover:bg-muted/50 transition-all"
                      >
                        <div className="flex items-center gap-3 text-muted-foreground">
                          <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
                            <UserPlus className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">Add New Driver</p>
                            <p className="text-xs">Add a driver not in the list</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </ScrollArea>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setAssignDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleConfirmAssignment} disabled={!selectedDriver}>
              <Truck className="h-4 w-4 mr-2" />
              Assign Driver
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Pencil className="h-5 w-5" />
              Edit Order
            </DialogTitle>
            <DialogDescription>
              Modify order details for {editingOrder?.id}
            </DialogDescription>
          </DialogHeader>

          {editingOrder && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Customer</Label>
                <Input
                  value={editingOrder.customer}
                  onChange={(e) => setEditingOrder({ ...editingOrder, customer: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label>Product</Label>
                <Input
                  value={editingOrder.product}
                  onChange={(e) => setEditingOrder({ ...editingOrder, product: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={editingOrder.status}
                    onValueChange={(value) => setEditingOrder({ ...editingOrder, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Prepress">Prepress</SelectItem>
                      <SelectItem value="In Production">In Production</SelectItem>
                      <SelectItem value="Quality Check">Quality Check</SelectItem>
                      <SelectItem value="Ready to Ship">Ready to Ship</SelectItem>
                      <SelectItem value="Completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Priority</Label>
                  <Select
                    value={editingOrder.priority}
                    onValueChange={(value) => setEditingOrder({ ...editingOrder, priority: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Low">Low</SelectItem>
                      <SelectItem value="Normal">Normal</SelectItem>
                      <SelectItem value="High">High</SelectItem>
                      <SelectItem value="Urgent">Urgent</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Delivery Address</Label>
                <Input
                  value={editingOrder.deliveryAddress || ""}
                  onChange={(e) => setEditingOrder({ ...editingOrder, deliveryAddress: e.target.value })}
                  placeholder="Enter delivery address"
                />
              </div>
              <div className="space-y-2">
                <Label>Value</Label>
                <Input
                  value={editingOrder.value}
                  onChange={(e) => setEditingOrder({ ...editingOrder, value: e.target.value })}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveEdit}>
              <Pencil className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Order Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <Trash2 className="h-5 w-5" />
              Delete Order
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete order <span className="font-semibold">{orderToDelete?.id}</span>? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          {orderToDelete && (
            <Card className="bg-muted/50">
              <CardContent className="pt-4">
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Customer</span>
                    <span className="font-medium">{orderToDelete.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Product</span>
                    <span className="font-medium">{orderToDelete.product}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Value</span>
                    <span className="font-medium">{orderToDelete.value}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleConfirmDelete}>
              <Trash2 className="h-4 w-4 mr-2" />
              Delete Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Orders;
