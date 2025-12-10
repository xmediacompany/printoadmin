import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
  Calendar,
  Globe,
  MapPin,
  CreditCard,
  Star,
  Briefcase
} from "lucide-react";
import { NewOrderDialog } from "@/components/orders/NewOrderDialog";
import { toast } from "@/hooks/use-toast";

interface CorporateAccount {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  address: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  tier: string;
  paymentTerms: string;
  creditLimit: string;
  notes: string;
  status: string;
}

const industries = [
  "Technology",
  "Marketing & Advertising",
  "Healthcare",
  "Finance & Banking",
  "Retail",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Hospitality",
  "Government",
  "Other",
];

const accountManagers = [
  "John Davis",
  "Sarah Mitchell",
  "Robert Chen",
];

const B2BCorporate = () => {
  const [newOrderOpen, setNewOrderOpen] = useState(false);
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>([
    {
      id: "CA-001",
      companyName: "Tech Solutions Inc.",
      industry: "Technology",
      website: "techsolutions.com",
      address: "Kuwait City",
      contactName: "Ahmed Al-Rashid",
      contactEmail: "ahmed@techsolutions.com",
      contactPhone: "+965 1234 5678",
      tier: "premium",
      paymentTerms: "net30",
      creditLimit: "50000",
      notes: "",
      status: "Active",
    },
    {
      id: "CA-002",
      companyName: "Global Marketing Group",
      industry: "Marketing & Advertising",
      website: "globalmarketing.com",
      address: "Salmiya",
      contactName: "Sara Al-Fahad",
      contactEmail: "sara@globalmarketing.com",
      contactPhone: "+965 2345 6789",
      tier: "enterprise",
      paymentTerms: "net45",
      creditLimit: "100000",
      notes: "",
      status: "Active",
    },
    {
      id: "CA-003",
      companyName: "Design Studio Pro",
      industry: "Marketing & Advertising",
      website: "designstudiopro.com",
      address: "Hawalli",
      contactName: "Khalid Al-Mutairi",
      contactEmail: "khalid@designstudiopro.com",
      contactPhone: "+965 3456 7890",
      tier: "standard",
      paymentTerms: "net15",
      creditLimit: "20000",
      notes: "",
      status: "Pending Review",
    },
  ]);

  const [newAccount, setNewAccount] = useState({
    companyName: "",
    industry: "",
    website: "",
    address: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    tier: "standard",
    paymentTerms: "net30",
    creditLimit: "",
    accountManager: "",
    notes: "",
  });

  const generateAccountId = () => {
    const maxId = corporateAccounts.reduce((max, acc) => {
      const num = parseInt(acc.id.replace("CA-", ""));
      return num > max ? num : max;
    }, 0);
    return `CA-${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleAddAccount = () => {
    if (!newAccount.companyName || !newAccount.contactName || !newAccount.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAccount.contactEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const account: CorporateAccount = {
      id: generateAccountId(),
      companyName: newAccount.companyName,
      industry: newAccount.industry,
      website: newAccount.website,
      address: newAccount.address,
      contactName: newAccount.contactName,
      contactEmail: newAccount.contactEmail,
      contactPhone: newAccount.contactPhone,
      tier: newAccount.tier,
      paymentTerms: newAccount.paymentTerms,
      creditLimit: newAccount.creditLimit,
      notes: newAccount.notes,
      status: "Pending Review",
    };

    setCorporateAccounts([...corporateAccounts, account]);
    setAddAccountOpen(false);
    setNewAccount({
      companyName: "",
      industry: "",
      website: "",
      address: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      tier: "standard",
      paymentTerms: "net30",
      creditLimit: "",
      accountManager: "",
      notes: "",
    });

    toast({
      title: "Corporate Account Created",
      description: `${account.companyName} has been added successfully.`,
    });
  };

  const getTierLabel = (tier: string) => {
    switch (tier) {
      case "standard": return "Standard Tier";
      case "premium": return "Premium Tier";
      case "enterprise": return "Enterprise Tier";
      default: return tier;
    }
  };

  const getMonthlyValue = (tier: string) => {
    switch (tier) {
      case "standard": return "12K KD/month";
      case "premium": return "45K KD/month";
      case "enterprise": return "78K KD/month";
      default: return "";
    }
  };

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
          <Button onClick={() => setAddAccountOpen(true)}>
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

      {/* Add Corporate Account Dialog */}
      <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Add New Corporate Account
            </DialogTitle>
            <DialogDescription>
              Create a new B2B corporate account with company details and terms.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Company Information
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Acme Corporation"
                    value={newAccount.companyName}
                    onChange={(e) => setNewAccount({ ...newAccount, companyName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Industry</Label>
                    <Select
                      value={newAccount.industry}
                      onValueChange={(value) => setNewAccount({ ...newAccount, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {industries.map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="www.company.com"
                      value={newAccount.website}
                      onChange={(e) => setNewAccount({ ...newAccount, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="e.g., Kuwait City, Block 5"
                    value={newAccount.address}
                    onChange={(e) => setNewAccount({ ...newAccount, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Primary Contact
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="e.g., Ahmed Al-Rashid"
                    value={newAccount.contactName}
                    onChange={(e) => setNewAccount({ ...newAccount, contactName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={newAccount.contactEmail}
                      onChange={(e) => setNewAccount({ ...newAccount, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone
                    </Label>
                    <Input
                      id="contactPhone"
                      placeholder="+965 1234 5678"
                      value={newAccount.contactPhone}
                      onChange={(e) => setNewAccount({ ...newAccount, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Payment Terms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Payment Terms</Label>
                  <Select
                    value={newAccount.paymentTerms}
                    onValueChange={(value) => setNewAccount({ ...newAccount, paymentTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="net15">Net 15 Days</SelectItem>
                      <SelectItem value="net30">Net 30 Days</SelectItem>
                      <SelectItem value="net45">Net 45 Days</SelectItem>
                      <SelectItem value="net60">Net 60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="creditLimit">Credit Limit (KD)</Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    placeholder="e.g., 50000"
                    value={newAccount.creditLimit}
                    onChange={(e) => setNewAccount({ ...newAccount, creditLimit: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Assign Account Manager</Label>
                <Select
                  value={newAccount.accountManager}
                  onValueChange={(value) => setNewAccount({ ...newAccount, accountManager: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select account manager" />
                  </SelectTrigger>
                  <SelectContent>
                    {accountManagers.map((manager) => (
                      <SelectItem key={manager} value={manager}>
                        {manager}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or notes about this account..."
                value={newAccount.notes}
                onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAccount}>
              <Building2 className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

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
              {corporateAccounts.slice(0, 3).map((account) => (
                <div key={account.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold">{account.companyName}</h4>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {getTierLabel(account.tier)} • {getMonthlyValue(account.tier)}
                    </p>
                  </div>
                  <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                    {account.status}
                  </Badge>
                </div>
              ))}
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
