import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Truck, Navigation, Camera, FileSignature, Banknote, Package, MapPin, Clock, CheckCircle2, Search, Plus } from "lucide-react";

const Fulfillment = () => {
  // Mock data for routes
  const routes = [
    { id: "R-001", driver: "Ahmed Ali", stops: 12, completed: 8, status: "in-progress", cod: "125.50" },
    { id: "R-002", driver: "Sarah Hassan", stops: 8, completed: 8, status: "completed", cod: "89.25" },
    { id: "R-003", driver: "Mohammed Khalid", stops: 15, completed: 3, status: "in-progress", cod: "0.00" },
    { id: "R-004", driver: "Fatima Rashid", stops: 10, completed: 0, status: "pending", cod: "0.00" },
  ];

  // Mock data for deliveries
  const deliveries = [
    { id: "ORD-1234", customer: "Abdullah Trading Co.", address: "Shuwaikh Industrial", status: "pending-pickup", cod: "450.00", time: "09:30 AM" },
    { id: "ORD-1235", customer: "Print Solutions Ltd", address: "Sharq District", status: "in-transit", cod: "0.00", time: "10:15 AM" },
    { id: "ORD-1236", customer: "Al-Maha Graphics", address: "Hawally Area", status: "delivered", cod: "125.50", time: "11:00 AM" },
    { id: "ORD-1237", customer: "Kuwait Design Hub", address: "Salwa Complex", status: "pending-pickup", cod: "320.00", time: "02:00 PM" },
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
        <h1 className="text-3xl font-bold">Fulfillment & Shipping</h1>
        <p className="text-muted-foreground">First/last-mile handoff with proof of delivery</p>
      </div>

      <Tabs defaultValue="routes" className="space-y-6">
        <TabsList>
          <TabsTrigger value="routes">Route Management</TabsTrigger>
          <TabsTrigger value="deliveries">Delivery Queue</TabsTrigger>
          <TabsTrigger value="pod">Proof of Delivery</TabsTrigger>
          <TabsTrigger value="cod">COD Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="routes" className="space-y-4">
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
        </TabsContent>

        <TabsContent value="deliveries" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Delivery Queue</CardTitle>
                  <CardDescription>Scan orders for pickup and track delivery status</CardDescription>
                </div>
                <div className="flex gap-2">
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input placeholder="Search orders..." className="pl-8 w-64" />
                  </div>
                  <Button>
                    <Camera className="h-4 w-4 mr-2" />
                    Scan Order
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Delivery Address</TableHead>
                    <TableHead>Scheduled Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>COD Amount</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {deliveries.map((delivery) => (
                    <TableRow key={delivery.id}>
                      <TableCell className="font-medium">{delivery.id}</TableCell>
                      <TableCell>{delivery.customer}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {delivery.address}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          {delivery.time}
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getStatusColor(delivery.status)}>
                          {delivery.status.replace("-", " ")}
                        </Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {delivery.cod !== "0.00" ? `KD ${delivery.cod}` : "Paid"}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          {delivery.status === "pending-pickup" && (
                            <Button variant="outline" size="sm">
                              <Camera className="h-4 w-4 mr-1" />
                              Pickup
                            </Button>
                          )}
                          {delivery.status === "in-transit" && (
                            <Button variant="outline" size="sm">
                              <FileSignature className="h-4 w-4 mr-1" />
                              Deliver
                            </Button>
                          )}
                          {delivery.status === "delivered" && (
                            <Button variant="outline" size="sm">
                              View POD
                            </Button>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pod" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Photo Capture</CardTitle>
                <CardDescription>Capture delivery photos as proof of delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <Camera className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Capture photo of delivered package</p>
                  <Button>
                    <Camera className="h-4 w-4 mr-2" />
                    Open Camera
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order ID</label>
                  <Input placeholder="Scan or enter order ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Notes</label>
                  <Input placeholder="Optional delivery notes" />
                </div>
                <Button className="w-full">Submit Photo POD</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Signature Capture</CardTitle>
                <CardDescription>Collect customer signature for proof of delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-muted rounded-lg p-12 text-center">
                  <FileSignature className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-sm text-muted-foreground mb-4">Customer signature area</p>
                  <Button>
                    <FileSignature className="h-4 w-4 mr-2" />
                    Capture Signature
                  </Button>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order ID</label>
                  <Input placeholder="Scan or enter order ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Recipient Name</label>
                  <Input placeholder="Name of person receiving" />
                </div>
                <Button className="w-full">Submit Signature POD</Button>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent POD Records</CardTitle>
              <CardDescription>View recently submitted proof of delivery records</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Delivery Time</TableHead>
                    <TableHead>POD Type</TableHead>
                    <TableHead>Driver</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ORD-1236</TableCell>
                    <TableCell>Al-Maha Graphics</TableCell>
                    <TableCell>11:00 AM</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <Camera className="h-3 w-3 mr-1" />
                        Photo
                      </Badge>
                    </TableCell>
                    <TableCell>Sarah Hassan</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View POD</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">ORD-1230</TableCell>
                    <TableCell>Kuwait Design Hub</TableCell>
                    <TableCell>10:45 AM</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        <FileSignature className="h-3 w-3 mr-1" />
                        Signature
                      </Badge>
                    </TableCell>
                    <TableCell>Ahmed Ali</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View POD</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cod" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>COD Collection</CardTitle>
              <CardDescription>Capture cash on delivery payments</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Order ID</label>
                  <Input placeholder="Scan or enter order ID" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">COD Amount</label>
                  <Input placeholder="KD 0.00" type="number" step="0.01" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Payment Method</label>
                  <select className="w-full h-10 px-3 rounded-md border border-input bg-background">
                    <option>Cash</option>
                    <option>Card</option>
                    <option>KNET</option>
                  </select>
                </div>
              </div>
              <Button className="w-full">
                <Banknote className="h-4 w-4 mr-2" />
                Record COD Payment
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>COD Collection Summary</CardTitle>
              <CardDescription>Track cash collected per driver and route</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Driver</TableHead>
                    <TableHead>Route ID</TableHead>
                    <TableHead>Orders Delivered</TableHead>
                    <TableHead>COD Collected</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Ahmed Ali</TableCell>
                    <TableCell>R-001</TableCell>
                    <TableCell>8 orders</TableCell>
                    <TableCell className="font-bold">KD 125.50</TableCell>
                    <TableCell>
                      <Badge variant="secondary">Collecting</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Sarah Hassan</TableCell>
                    <TableCell>R-002</TableCell>
                    <TableCell>8 orders</TableCell>
                    <TableCell className="font-bold">KD 89.25</TableCell>
                    <TableCell>
                      <Badge variant="default">Remitted</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mohammed Khalid</TableCell>
                    <TableCell>R-003</TableCell>
                    <TableCell>3 orders</TableCell>
                    <TableCell className="font-bold">KD 0.00</TableCell>
                    <TableCell>
                      <Badge variant="outline">No COD</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">View Details</Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Fulfillment;
