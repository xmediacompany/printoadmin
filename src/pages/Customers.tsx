import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Search, Filter, Plus, Mail, Phone, MapPin, Calendar, Edit, Trash2, User } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

const defaultLocations = ["Salmiya", "Hawally", "City", "Farwaniya", "Jahra", "Ahmadi", "Mubarak Al-Kabeer"];

interface Customer {
  id: string;
  name: string;
  location: string;
  email: string;
  phone: string;
  orders: number;
  lastOrder: string;
  totalSpent: string;
  status: string;
}

export default function Customers() {
  const { toast } = useToast();
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [locations, setLocations] = useState(defaultLocations);
  const [showAddLocation, setShowAddLocation] = useState(false);
  const [newLocation, setNewLocation] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    location: "",
    company: "",
    notes: "",
    status: "Active",
  });

  const handleAddLocation = () => {
    if (!newLocation.trim()) return;
    if (locations.includes(newLocation.trim())) {
      toast({ title: "Error", description: "This location already exists", variant: "destructive" });
      return;
    }
    setLocations([...locations, newLocation.trim()]);
    setFormData({ ...formData, location: newLocation.trim() });
    setNewLocation("");
    setShowAddLocation(false);
    toast({ title: "Location Added", description: `${newLocation.trim()} has been added to locations` });
  };

  const [statusFilter, setStatusFilter] = useState<string>("all");

  const stats = [
    { label: "Total Customers", value: "2,847", change: "+12.5%", changePositive: true },
    { label: "Active This Month", value: "1,923", change: "+8.2%", changePositive: true },
    { label: "New This Month", value: "156", change: "+15.3%", changePositive: true },
    { label: "Avg Order Value", value: "KD 28.50", change: "+3.1%", changePositive: true },
  ];

  const customers = [
    {
      id: "CUST-001",
      name: "Fatima Al-Zahra",
      location: "Salmiya",
      email: "fatima.alzahra@email.com",
      phone: "+965 9876 5432",
      orders: 47,
      lastOrder: "2024-01-14",
      totalSpent: "KD 1,245.50",
      status: "Active",
      rating: 4.8,
    },
    {
      id: "CUST-002",
      name: "Omar Hassan",
      location: "City",
      email: "omar.hassan@email.com",
      phone: "+965 9876 5433",
      orders: 32,
      lastOrder: "2024-01-13",
      totalSpent: "KD 890.25",
      status: "Active",
      rating: 4.6,
    },
    {
      id: "CUST-003",
      name: "Noura Al-Sabah",
      location: "Hawally",
      email: "noura.alsabah@email.com",
      phone: "+965 9876 5434",
      orders: 28,
      lastOrder: "2024-01-12",
      totalSpent: "KD 675.75",
      status: "Active",
      rating: 4.9,
    },
    {
      id: "CUST-004",
      name: "Hasan Al-Rashid",
      location: "Salmiya",
      email: "hasan.alrashid@email.com",
      phone: "+965 9876 5435",
      orders: 15,
      lastOrder: "2023-12-28",
      totalSpent: "KD 425.00",
      status: "Inactive",
      rating: 4.2,
    },
    {
      id: "CUST-005",
      name: "Reem Al-Mutawa",
      location: "City",
      email: "reem.almutawa@email.com",
      phone: "+965 9876 5436",
      orders: 52,
      lastOrder: "2024-01-15",
      totalSpent: "KD 1,567.80",
      status: "VIP",
      rating: 5,
    },
    {
      id: "CUST-006",
      name: "Ali Al-Kandari",
      location: "Hawally",
      email: "ali.alkandari@email.com",
      phone: "+965 9876 5437",
      orders: 38,
      lastOrder: "2024-01-11",
      totalSpent: "KD 1,120.40",
      status: "Active",
      rating: 4.7,
    },
  ];

  const topCustomers = [
    { name: "Fatima Al-Zahra", amount: "KD 1,245.50" },
    { name: "Omar Hassan", amount: "KD 890.25" },
    { name: "Noura Al-Sabah", amount: "KD 675.75" },
  ];

  const recentCustomers = [
    { name: "Ali Al-Kandari", date: "2023-07-30" },
    { name: "Reem Al-Mutawa", date: "2023-11-05" },
    { name: "Hasan Al-Rashid", date: "2023-04-18" },
  ];

  const segments = [
    { date: "2023-07-30", status: "Active", count: 2456 },
    { date: "2023-11-05", status: "VIP", count: 234 },
    { date: "2023-04-18", status: "Inactive", count: 157 },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>;
      case "VIP":
        return <Badge className="bg-purple-500/10 text-purple-700 hover:bg-purple-500/20">VIP</Badge>;
      case "Inactive":
        return <Badge variant="secondary">Inactive</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const handleAddCustomer = () => {
    if (!formData.firstName.trim() || !formData.lastName.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.location) {
      toast({ title: "Error", description: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    toast({ title: "Customer Added", description: `${formData.firstName} ${formData.lastName} has been added successfully` });
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      location: "",
      company: "",
      notes: "",
      status: "Active",
    });
    setAddDialogOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Customers</h1>
        <p className="text-muted-foreground">Manage customer relationships and track engagement.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs ${stat.changePositive ? "text-emerald-600" : "text-destructive"}`}>
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search and Actions */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search customers by name, email, phone..."
            className="pl-9"
          />
        </div>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="Active">Active</SelectItem>
              <SelectItem value="VIP">VIP</SelectItem>
              <SelectItem value="Inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
          <Button size="sm" onClick={() => setAddDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>

      {/* Customers Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  <Checkbox />
                </TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead>Total Spent</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers
                .filter((customer) => statusFilter === "all" || customer.status === statusFilter)
                .map((customer) => (
                <TableRow key={customer.id}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.id}</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <MapPin className="h-3 w-3" />
                        {customer.location}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-1.5 text-sm">
                        <Mail className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.email}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm">
                        <Phone className="h-3.5 w-3.5 text-muted-foreground" />
                        <span className="text-muted-foreground">{customer.phone}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{customer.orders} orders</div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        Last: {customer.lastOrder}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{customer.totalSpent}</TableCell>
                  <TableCell>{getStatusBadge(customer.status)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Customer Insights */}
      <div>
        <h2 className="text-xl font-bold mb-4">Customer Insights</h2>
        <div className="grid gap-6 md:grid-cols-3">
          {/* Top Customers by Spend */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Top Customers by Spend</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{customer.name}</span>
                  <span className="text-sm font-medium">{customer.amount}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Recent Customers */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Recent Customers</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentCustomers.map((customer, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm">{customer.name}</span>
                  <span className="text-sm text-muted-foreground">{customer.date}</span>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Customer Segments */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Customer Segments</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {segments.map((segment, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{segment.date}</span>
                    {getStatusBadge(segment.status)}
                  </div>
                  <span className="text-sm font-medium">{segment.count}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Add Customer Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Add New Customer
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            {/* Name Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name <span className="text-destructive">*</span></Label>
                <Input
                  id="firstName"
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name <span className="text-destructive">*</span></Label>
                <Input
                  id="lastName"
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                />
              </div>
            </div>

            {/* Contact Fields */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="customer@email.com"
                    className="pl-10"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number <span className="text-destructive">*</span></Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    placeholder="+965 XXXX XXXX"
                    className="pl-10"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Location and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Location <span className="text-destructive">*</span></Label>
                {!showAddLocation ? (
                  <div className="space-y-2">
                    <Select
                      value={formData.location}
                      onValueChange={(value) => {
                        if (value === "__add_new__") {
                          setShowAddLocation(true);
                        } else {
                          setFormData({ ...formData, location: value });
                        }
                      }}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc} value={loc}>
                            {loc}
                          </SelectItem>
                        ))}
                        <SelectItem value="__add_new__" className="text-primary">
                          <span className="flex items-center gap-2">
                            <Plus className="h-4 w-4" />
                            Add New Location
                          </span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ) : (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter new location"
                      value={newLocation}
                      onChange={(e) => setNewLocation(e.target.value)}
                      onKeyPress={(e) => e.key === "Enter" && handleAddLocation()}
                    />
                    <Button size="icon" onClick={handleAddLocation}>
                      <Plus className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" onClick={() => {
                      setShowAddLocation(false);
                      setNewLocation("");
                    }}>
                      ✕
                    </Button>
                  </div>
                )}
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData({ ...formData, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="VIP">VIP</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Company */}
            <div className="space-y-2">
              <Label htmlFor="company">Company (Optional)</Label>
              <Input
                id="company"
                placeholder="Company name"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              />
            </div>

            {/* Notes */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any additional notes about this customer..."
                rows={3}
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCustomer}>
              <Plus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
