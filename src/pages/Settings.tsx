import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Search, 
  Filter, 
  Plus, 
  Users, 
  Shield, 
  Eye, 
  Edit, 
  Trash2, 
  Settings2,
  ShoppingCart,
  Package,
  Truck,
  UserCircle,
  Building2,
  Megaphone,
  FileText,
  DollarSign,
  BarChart3,
  Bot,
  Headphones,
  Printer,
  Save
} from "lucide-react";
import { toast } from "sonner";

interface Permission {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  actions: {
    view: boolean;
    create: boolean;
    edit: boolean;
    delete: boolean;
  };
}

interface RolePermissions {
  [key: string]: Permission[];
}

export default function Settings() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("Admin");
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    mobile: "",
    role: "",
    branch: "",
  });

  const [rolePermissions, setRolePermissions] = useState<RolePermissions>({
    Admin: [
      { id: "dashboard", name: "Dashboard", description: "View analytics and reports", icon: <BarChart3 className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "orders", name: "Orders", description: "Manage customer orders", icon: <ShoppingCart className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "inventory", name: "Inventory", description: "Stock and procurement", icon: <Package className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "fulfillment", name: "Fulfillment", description: "Delivery management", icon: <Truck className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "customers", name: "Customers", description: "Customer database", icon: <UserCircle className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "b2b", name: "B2B Corporate", description: "Corporate accounts", icon: <Building2 className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "marketing", name: "Marketing", description: "Campaigns and promotions", icon: <Megaphone className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "cms", name: "Website CMS", description: "Content management", icon: <FileText className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "printing", name: "Printing Services", description: "Print job management", icon: <Printer className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "finance", name: "Finance", description: "Financial reports", icon: <DollarSign className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "support", name: "Support Team", description: "Customer support", icon: <Headphones className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "ai_bot", name: "AI Order Bot", description: "AI assistant settings", icon: <Bot className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
      { id: "settings", name: "Settings", description: "System configuration", icon: <Settings2 className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: true } },
    ],
    Employee: [
      { id: "dashboard", name: "Dashboard", description: "View analytics and reports", icon: <BarChart3 className="h-4 w-4" />, actions: { view: true, create: false, edit: false, delete: false } },
      { id: "orders", name: "Orders", description: "Manage customer orders", icon: <ShoppingCart className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: false } },
      { id: "inventory", name: "Inventory", description: "Stock and procurement", icon: <Package className="h-4 w-4" />, actions: { view: true, create: false, edit: false, delete: false } },
      { id: "fulfillment", name: "Fulfillment", description: "Delivery management", icon: <Truck className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: false } },
      { id: "customers", name: "Customers", description: "Customer database", icon: <UserCircle className="h-4 w-4" />, actions: { view: true, create: false, edit: false, delete: false } },
      { id: "b2b", name: "B2B Corporate", description: "Corporate accounts", icon: <Building2 className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
      { id: "marketing", name: "Marketing", description: "Campaigns and promotions", icon: <Megaphone className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
      { id: "cms", name: "Website CMS", description: "Content management", icon: <FileText className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
      { id: "printing", name: "Printing Services", description: "Print job management", icon: <Printer className="h-4 w-4" />, actions: { view: true, create: true, edit: true, delete: false } },
      { id: "finance", name: "Finance", description: "Financial reports", icon: <DollarSign className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
      { id: "support", name: "Support Team", description: "Customer support", icon: <Headphones className="h-4 w-4" />, actions: { view: true, create: true, edit: false, delete: false } },
      { id: "ai_bot", name: "AI Order Bot", description: "AI assistant settings", icon: <Bot className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
      { id: "settings", name: "Settings", description: "System configuration", icon: <Settings2 className="h-4 w-4" />, actions: { view: false, create: false, edit: false, delete: false } },
    ],
  });

  const users = [
    {
      name: "Ahmed Al-Mansouri",
      email: "ahmed@printo.press",
      mobile: "+965 9876 5432",
      role: "Admin",
      branch: "All Branches",
      status: "Active",
      lastLogin: "2024-01-15 14:30",
      ipAddress: "192.168.1.100",
      deviceType: "Desktop",
    },
    {
      name: "Fatima Al-Zahra",
      email: "fatima@printo.press",
      mobile: "+965 9765 4321",
      role: "Employee",
      branch: "Salmiya",
      status: "Active",
      lastLogin: "2024-01-15 12:45",
      ipAddress: "192.168.1.105",
      deviceType: "Mobile",
    },
    {
      name: "Omar Hassan",
      email: "omar@printo.press",
      mobile: "+965 9654 3210",
      role: "Employee",
      branch: "City",
      status: "Active",
      lastLogin: "2024-01-15 09:15",
      ipAddress: "192.168.1.112",
      deviceType: "Desktop",
    },
    {
      name: "Noura Al-Sabah",
      email: "noura@printo.press",
      mobile: "+965 9543 2109",
      role: "Employee",
      branch: "Hawally",
      status: "Inactive",
      lastLogin: "2024-01-10 16:20",
      ipAddress: "192.168.1.98",
      deviceType: "Tablet",
    },
    {
      name: "Hasan Al-Rashid",
      email: "hasan@printo.press",
      mobile: "+965 9432 1098",
      role: "Admin",
      branch: "Salmiya",
      status: "Active",
      lastLogin: "2024-01-15 11:30",
      ipAddress: "192.168.1.120",
      deviceType: "Desktop",
    },
  ];

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "Admin":
        return <Badge className="bg-purple-500/10 text-purple-700 hover:bg-purple-500/20">Admin</Badge>;
      case "Employee":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Employee</Badge>;
      default:
        return <Badge variant="outline">{role}</Badge>;
    }
  };

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>
    ) : (
      <Badge variant="secondary">Inactive</Badge>
    );
  };

  const handleInviteUser = () => {
    if (!inviteForm.name || !inviteForm.email || !inviteForm.role || !inviteForm.branch) {
      toast.error("Please fill in all fields");
      return;
    }
    toast.success(`User ${inviteForm.name} added successfully`);
    setInviteDialogOpen(false);
    setInviteForm({ name: "", email: "", mobile: "", role: "", branch: "" });
  };

  const handlePermissionChange = (permissionId: string, action: keyof Permission["actions"], value: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map(p => 
        p.id === permissionId 
          ? { ...p, actions: { ...p.actions, [action]: value } }
          : p
      )
    }));
  };

  const handleToggleAllActions = (permissionId: string, enabled: boolean) => {
    setRolePermissions(prev => ({
      ...prev,
      [selectedRole]: prev[selectedRole].map(p => 
        p.id === permissionId 
          ? { ...p, actions: { view: enabled, create: enabled, edit: enabled, delete: enabled } }
          : p
      )
    }));
  };

  const handleSavePermissions = () => {
    toast.success(`Permissions for ${selectedRole} saved successfully`);
  };

  const getPermissionCount = (role: string) => {
    const perms = rolePermissions[role];
    if (!perms) return 0;
    return perms.filter(p => p.actions.view || p.actions.create || p.actions.edit || p.actions.delete).length;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
      </div>

      <Tabs defaultValue="users-roles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="users-roles" className="gap-2">
            <Users className="h-4 w-4" />
            Users & Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="gap-2">
            <Shield className="h-4 w-4" />
            Permissions
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users-roles" className="space-y-4">
          <p className="text-muted-foreground">Invite/manage users and roles.</p>

          {/* Search and Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button size="sm" onClick={() => setInviteDialogOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add User
              </Button>
            </div>
          </div>

          {/* Users Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Mobile</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Branch</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Last Login</TableHead>
                    <TableHead>IP Address</TableHead>
                    <TableHead>Device Type</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.email}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell className="text-sm text-muted-foreground">{user.email}</TableCell>
                      <TableCell className="text-sm">{user.mobile}</TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.branch}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="text-sm">{user.ipAddress}</TableCell>
                      <TableCell className="text-sm">{user.deviceType}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => toast.info(`Edit user: ${user.name}`)}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button 
                            variant="outline" 
                            size="icon"
                            className="h-8 w-8 text-destructive hover:text-destructive"
                            onClick={() => toast.success(`User ${user.name} deleted`)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">Role-Based Permissions</h2>
              <p className="text-muted-foreground">Configure access levels for each role across all modules.</p>
            </div>
            <Button onClick={handleSavePermissions}>
              <Save className="mr-2 h-4 w-4" />
              Save Changes
            </Button>
          </div>

          {/* Role Selection Cards */}
          <div className="grid gap-4 md:grid-cols-2">
            {["Admin", "Employee"].map((role) => (
              <Card 
                key={role}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedRole === role 
                    ? "ring-2 ring-primary border-primary" 
                    : "hover:border-primary/50"
                }`}
                onClick={() => setSelectedRole(role)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{role}</CardTitle>
                    {getRoleBadge(role)}
                  </div>
                  <CardDescription>
                    {role === "Admin" && "Full system access with all permissions"}
                    
                    {role === "Employee" && "Day-to-day operational tasks"}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>{getPermissionCount(role)} modules enabled</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Permissions Matrix */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    {getRoleBadge(selectedRole)}
                    <span>Permissions</span>
                  </CardTitle>
                  <CardDescription>Configure what {selectedRole.toLowerCase()}s can access and modify</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[300px]">Module</TableHead>
                    <TableHead className="text-center w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <Eye className="h-4 w-4" />
                        <span className="text-xs">View</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <Plus className="h-4 w-4" />
                        <span className="text-xs">Create</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <Edit className="h-4 w-4" />
                        <span className="text-xs">Edit</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center w-[100px]">
                      <div className="flex flex-col items-center gap-1">
                        <Trash2 className="h-4 w-4" />
                        <span className="text-xs">Delete</span>
                      </div>
                    </TableHead>
                    <TableHead className="text-center w-[120px]">Full Access</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rolePermissions[selectedRole]?.map((permission) => {
                    const allEnabled = permission.actions.view && permission.actions.create && permission.actions.edit && permission.actions.delete;
                    const noneEnabled = !permission.actions.view && !permission.actions.create && !permission.actions.edit && !permission.actions.delete;
                    
                    return (
                      <TableRow key={permission.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${noneEnabled ? "bg-muted/50 text-muted-foreground" : "bg-primary/10 text-primary"}`}>
                              {permission.icon}
                            </div>
                            <div>
                              <div className={`font-medium ${noneEnabled ? "text-muted-foreground" : ""}`}>
                                {permission.name}
                              </div>
                              <div className="text-xs text-muted-foreground">{permission.description}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox 
                            checked={permission.actions.view}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, "view", checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox 
                            checked={permission.actions.create}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, "create", checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox 
                            checked={permission.actions.edit}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, "edit", checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Checkbox 
                            checked={permission.actions.delete}
                            onCheckedChange={(checked) => handlePermissionChange(permission.id, "delete", checked as boolean)}
                          />
                        </TableCell>
                        <TableCell className="text-center">
                          <Switch 
                            checked={allEnabled}
                            onCheckedChange={(checked) => handleToggleAllActions(permission.id, checked)}
                          />
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Quick Actions Legend */}
          <div className="flex flex-wrap gap-6 p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center gap-2 text-sm">
              <Eye className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">View: Access to read data</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Plus className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Create: Add new records</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Edit className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Edit: Modify existing data</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <Trash2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Delete: Remove records</span>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Invite User Dialog */}
      <Dialog open={inviteDialogOpen} onOpenChange={setInviteDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                value={inviteForm.name}
                onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={inviteForm.email}
                onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile</Label>
              <Input
                id="mobile"
                type="tel"
                placeholder="Enter mobile number"
                value={inviteForm.mobile}
                onChange={(e) => setInviteForm({ ...inviteForm, mobile: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Select value={inviteForm.role} onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  
                  <SelectItem value="Employee">Employee</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="branch">Branch</Label>
              <Select value={inviteForm.branch} onValueChange={(value) => setInviteForm({ ...inviteForm, branch: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select branch" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All Branches">All Branches</SelectItem>
                  <SelectItem value="City">City</SelectItem>
                  <SelectItem value="Salmiya">Salmiya</SelectItem>
                  <SelectItem value="Hawally">Hawally</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setInviteDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInviteUser}>
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
