import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Users, Shield } from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const [inviteDialogOpen, setInviteDialogOpen] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    role: "",
    branch: "",
  });

  const users = [
    {
      name: "Ahmed Al-Mansouri",
      email: "ahmed@printo.press",
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
      role: "Manager",
      branch: "Salmiya",
      status: "Active",
      lastLogin: "2024-01-15 12:45",
      ipAddress: "192.168.1.105",
      deviceType: "Mobile",
    },
    {
      name: "Omar Hassan",
      email: "omar@printo.press",
      role: "Operator",
      branch: "City",
      status: "Active",
      lastLogin: "2024-01-15 09:15",
      ipAddress: "192.168.1.112",
      deviceType: "Desktop",
    },
    {
      name: "Noura Al-Sabah",
      email: "noura@printo.press",
      role: "Operator",
      branch: "Hawally",
      status: "Inactive",
      lastLogin: "2024-01-10 16:20",
      ipAddress: "192.168.1.98",
      deviceType: "Tablet",
    },
    {
      name: "Hasan Al-Rashid",
      email: "hasan@printo.press",
      role: "Manager",
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
      case "Manager":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Manager</Badge>;
      case "Operator":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Operator</Badge>;
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
    toast.success(`Invitation sent to ${inviteForm.email}`);
    setInviteDialogOpen(false);
    setInviteForm({ name: "", email: "", role: "", branch: "" });
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
                    <TableHead>User</TableHead>
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
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{user.name}</div>
                          <div className="text-sm text-muted-foreground">{user.email}</div>
                        </div>
                      </TableCell>
                      <TableCell>{getRoleBadge(user.role)}</TableCell>
                      <TableCell>{user.branch}</TableCell>
                      <TableCell>{getStatusBadge(user.status)}</TableCell>
                      <TableCell className="text-sm">{user.lastLogin}</TableCell>
                      <TableCell className="text-sm">{user.ipAddress}</TableCell>
                      <TableCell className="text-sm">{user.deviceType}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="permissions">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Permission management and access control settings will appear here.</p>
            </CardContent>
          </Card>
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
              <Label htmlFor="role">Role</Label>
              <Select value={inviteForm.role} onValueChange={(value) => setInviteForm({ ...inviteForm, role: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="Manager">Manager</SelectItem>
                  <SelectItem value="Operator">Operator</SelectItem>
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
              Send Invitation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}