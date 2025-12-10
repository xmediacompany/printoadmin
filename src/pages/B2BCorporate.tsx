import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building2, 
  FileText, 
  Users, 
  DollarSign, 
  ShoppingCart, 
  TrendingUp,
  Plus,
  Edit,
  Eye,
  Mail,
  Phone,
  Calendar
} from "lucide-react";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";

const B2BCorporate = () => {
  const [newOrderOpen, setNewOrderOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">B2B Corporate Management</h1>
          <p className="text-muted-foreground">Manage corporate accounts, bulk orders, and enterprise services</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setNewOrderOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Order
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Corporate Account
          </Button>
        </div>
      </div>

      <NewOrderDialog 
        open={newOrderOpen} 
        onOpenChange={setNewOrderOpen}
        onOrderCreated={() => {}}
      />

      {/* Stats Overview */}
      <div className="grid gap-6 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Accounts</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+3 this month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">145K KD</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-muted-foreground">7 need approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,250 KD</div>
            <p className="text-xs text-muted-foreground">+5.2% increase</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 md:grid-cols-2">
        {/* Corporate Accounts */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Corporate Accounts</CardTitle>
              <Button size="sm" variant="outline">
                View All
              </Button>
            </div>
            <CardDescription>Manage enterprise clients and agreements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Tech Solutions Inc.</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Premium Tier • 45K KD/month</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Global Marketing Group</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Enterprise Tier • 78K KD/month</p>
                </div>
                <Badge>Active</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-primary" />
                    <h4 className="font-semibold">Design Studio Pro</h4>
                  </div>
                  <p className="text-sm text-muted-foreground">Standard Tier • 12K KD/month</p>
                </div>
                <Badge variant="secondary">Pending Review</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Recent Bulk Orders */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Recent Bulk Orders</CardTitle>
              <Button size="sm" variant="outline">
                View All
              </Button>
            </div>
            <CardDescription>High-volume corporate orders</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Business Cards - 50,000 units</h4>
                  <p className="text-sm text-muted-foreground">Tech Solutions Inc. • 8,500 KD</p>
                </div>
                <Badge>In Production</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Marketing Brochures - 25,000 units</h4>
                  <p className="text-sm text-muted-foreground">Global Marketing • 12,300 KD</p>
                </div>
                <Badge variant="secondary">Pending Approval</Badge>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <h4 className="font-semibold">Custom Stationery - 10,000 units</h4>
                  <p className="text-sm text-muted-foreground">Design Studio Pro • 4,200 KD</p>
                </div>
                <Badge variant="outline">Quote Sent</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Custom Pricing Agreements */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Custom Pricing Agreements
                </div>
              </CardTitle>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-1" />
                New Agreement
              </Button>
            </div>
            <CardDescription>Volume discounts and special rates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Volume Discount Tier 1</h4>
                  <Badge variant="secondary">15% Off</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Orders above 10,000 KD • 8 accounts</p>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Volume Discount Tier 2</h4>
                  <Badge variant="secondary">25% Off</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Orders above 50,000 KD • 3 accounts</p>
              </div>

              <div className="p-3 border rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">Enterprise Custom Rate</h4>
                  <Badge variant="secondary">Custom</Badge>
                </div>
                <p className="text-sm text-muted-foreground">Negotiated pricing • 2 accounts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Account Managers */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Account Managers
                </div>
              </CardTitle>
              <Button size="sm" variant="outline">
                Manage Team
              </Button>
            </div>
            <CardDescription>Dedicated B2B relationship managers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">JD</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">John Davis</h4>
                    <p className="text-sm text-muted-foreground">12 accounts</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">SM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Sarah Mitchell</h4>
                    <p className="text-sm text-muted-foreground">18 accounts</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-primary font-semibold">RC</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Robert Chen</h4>
                    <p className="text-sm text-muted-foreground">15 accounts</p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm">
                    <Mail className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Phone className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Pending Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Actions</CardTitle>
          <CardDescription>Items requiring attention</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 border rounded-lg border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950">
              <div className="flex-1">
                <h4 className="font-semibold">Contract Renewal - Global Marketing Group</h4>
                <p className="text-sm text-muted-foreground">Annual contract expires in 15 days</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-1" />
                  Schedule Meeting
                </Button>
                <Button size="sm">
                  Review
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">Custom Quote Request - New Corporate Client</h4>
                <p className="text-sm text-muted-foreground">100,000 units order • Awaiting pricing</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View Details
                </Button>
                <Button size="sm">
                  Create Quote
                </Button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex-1">
                <h4 className="font-semibold">Payment Terms Update - Design Studio Pro</h4>
                <p className="text-sm text-muted-foreground">Request for extended payment terms</p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Terms
                </Button>
                <Button size="sm">
                  Approve
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default B2BCorporate;
