import { useState } from "react";
import { format } from "date-fns";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { Search, Plus, Target, Tag, Mail, CalendarIcon, Percent, Sparkles, Copy, Gift, Users, ShoppingCart } from "lucide-react";
import { toast } from "sonner";

interface Coupon {
  id: string;
  code: string;
  discountType: "percentage" | "fixed";
  discountValue: number;
  minOrderValue?: number;
  maxUses?: number;
  usedCount: number;
  status: "Active" | "Expired" | "Paused";
  validFrom: string;
  validUntil: string;
  applicableTo: "all" | "specific";
}

interface Campaign {
  id: string;
  name: string;
  type: string;
  status: string;
  startDate: string;
  endDate: string;
  usedCoupons: number;
  description?: string;
  couponCode?: string;
  discountValue?: string;
}

export default function Marketing() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([
    {
      id: "CAMP-001",
      name: "Summer Discount Campaign",
      type: "Promotional",
      status: "Active",
      startDate: "2024-06-01",
      endDate: "2024-08-31",
      usedCoupons: 245,
    },
    {
      id: "CAMP-002",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usedCoupons: 128,
    },
    {
      id: "CAMP-003",
      name: "Weekend Special Offer",
      type: "Promotional",
      status: "Scheduled",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      usedCoupons: 0,
    },
    {
      id: "CAMP-004",
      name: "Loyalty Rewards Program",
      type: "Retention",
      status: "Draft",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      usedCoupons: 0,
    },
  ]);

  const [coupons, setCoupons] = useState<Coupon[]>([
    {
      id: "CPN-001",
      code: "PRINT20",
      discountType: "percentage",
      discountValue: 20,
      minOrderValue: 10,
      maxUses: 100,
      usedCount: 45,
      status: "Active",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      applicableTo: "all",
    },
    {
      id: "CPN-002",
      code: "WELCOME15",
      discountType: "percentage",
      discountValue: 15,
      minOrderValue: 5,
      maxUses: 500,
      usedCount: 128,
      status: "Active",
      validFrom: "2024-01-01",
      validUntil: "2024-12-31",
      applicableTo: "all",
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addCampaignOpen, setAddCampaignOpen] = useState(false);
  const [addCouponOpen, setAddCouponOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Promotional",
    status: "Draft",
    description: "",
    couponCode: "",
    discountValue: "",
  });
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    minOrderValue: "",
    maxUses: "",
    applicableTo: "all" as "all" | "specific",
    hasExpiry: true,
  });
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [couponStartDate, setCouponStartDate] = useState<Date>();
  const [couponEndDate, setCouponEndDate] = useState<Date>();

  const generateCouponCode = () => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let code = "";
    for (let i = 0; i < 8; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setNewCoupon({ ...newCoupon, code });
    toast.success("Code generated!");
  };

  const handleAddCoupon = () => {
    if (!newCoupon.code) {
      toast.error("Please enter or generate a coupon code");
      return;
    }
    if (!newCoupon.discountValue) {
      toast.error("Please enter a discount value");
      return;
    }
    if (newCoupon.hasExpiry && (!couponStartDate || !couponEndDate)) {
      toast.error("Please select validity dates");
      return;
    }

    const coupon: Coupon = {
      id: `CPN-${String(coupons.length + 1).padStart(3, '0')}`,
      code: newCoupon.code.toUpperCase(),
      discountType: newCoupon.discountType,
      discountValue: parseFloat(newCoupon.discountValue),
      minOrderValue: newCoupon.minOrderValue ? parseFloat(newCoupon.minOrderValue) : undefined,
      maxUses: newCoupon.maxUses ? parseInt(newCoupon.maxUses) : undefined,
      usedCount: 0,
      status: "Active",
      validFrom: couponStartDate ? format(couponStartDate, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd"),
      validUntil: couponEndDate ? format(couponEndDate, "yyyy-MM-dd") : "2099-12-31",
      applicableTo: newCoupon.applicableTo,
    };

    setCoupons(prev => [...prev, coupon]);
    setNewCoupon({
      code: "",
      discountType: "percentage",
      discountValue: "",
      minOrderValue: "",
      maxUses: "",
      applicableTo: "all",
      hasExpiry: true,
    });
    setCouponStartDate(undefined);
    setCouponEndDate(undefined);
    setAddCouponOpen(false);
    toast.success("Coupon created successfully!");
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    if (statusFilter === "all") return true;
    return campaign.status === statusFilter;
  });

  const handleAddCampaign = () => {
    if (!newCampaign.name) {
      toast.error("Please enter a campaign name");
      return;
    }
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    
    const campaign: Campaign = {
      id: `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`,
      name: newCampaign.name,
      type: newCampaign.type,
      status: newCampaign.status,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      usedCoupons: 0,
      description: newCampaign.description,
      couponCode: newCampaign.couponCode,
      discountValue: newCampaign.discountValue,
    };
    
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      name: "",
      type: "Promotional",
      status: "Draft",
      description: "",
      couponCode: "",
      discountValue: "",
    });
    setStartDate(undefined);
    setEndDate(undefined);
    setAddCampaignOpen(false);
    toast.success("Campaign created successfully");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>;
      case "Expired":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Expired</Badge>;
      case "Scheduled":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">Scheduled</Badge>;
      case "Draft":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Marketing</h1>
      </div>

      <Tabs defaultValue="campaigns" className="space-y-6">
        <TabsList>
          <TabsTrigger value="campaigns" className="gap-2">
            <Target className="h-4 w-4" />
            Campaigns
          </TabsTrigger>
          <TabsTrigger value="merchandising" className="gap-2">
            <Mail className="h-4 w-4" />
            Newsletters
          </TabsTrigger>
        </TabsList>

        <TabsContent value="campaigns" className="space-y-4">
          {/* Search and Actions */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search campaigns..."
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Expired">Expired</SelectItem>
                  <SelectItem value="Scheduled">Scheduled</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
              <Button size="sm" onClick={() => setAddCampaignOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Campaign
              </Button>
            </div>
          </div>

          {/* Campaigns Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Campaign</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Used Coupons</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredCampaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-xs text-muted-foreground">{campaign.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-sm">
                        <div className="space-y-0.5">
                          <div><span className="text-muted-foreground">From:</span> {campaign.startDate}</div>
                          <div><span className="text-muted-foreground">Until:</span> {campaign.endDate}</div>
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{campaign.usedCoupons.toLocaleString()}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
          {/* Coupons Section */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5" />
                    Coupons
                  </CardTitle>
                  <CardDescription>Discount codes and vouchers</CardDescription>
                </div>
                <Button size="sm" onClick={() => setAddCouponOpen(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Create Coupon
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {coupons.map((coupon) => (
                  <div key={coupon.id} className="flex flex-col p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-semibold font-mono text-lg">{coupon.code}</h4>
                      <Badge className={coupon.status === "Active" ? "bg-emerald-500/10 text-emerald-700" : "bg-muted text-muted-foreground"}>
                        {coupon.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-primary font-medium mb-1">
                      {coupon.discountType === "percentage" ? (
                        <>
                          <Percent className="h-3 w-3" />
                          {coupon.discountValue}% off
                        </>
                      ) : (
                        <>{coupon.discountValue} KD off</>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Used {coupon.usedCount}{coupon.maxUses ? ` / ${coupon.maxUses}` : ""} times
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>


        <TabsContent value="merchandising" className="space-y-6">
          {/* Newsletter */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Newsletter
                  </CardTitle>
                  <CardDescription>Email subscription management</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  Settings
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold">1,234</div>
                    <div className="text-sm text-muted-foreground mt-1">Total Subscribers</div>
                  </div>
                  <div className="p-6 bg-muted rounded-lg">
                    <div className="text-3xl font-bold">+48</div>
                    <div className="text-sm text-muted-foreground mt-1">This Week</div>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Export Subscriber List
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Campaign Dialog */}
      <Dialog open={addCampaignOpen} onOpenChange={setAddCampaignOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Campaign</DialogTitle>
            <DialogDescription>Set up a new marketing campaign with discount codes and scheduling</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Campaign Name */}
            <div className="space-y-2">
              <Label>Campaign Name *</Label>
              <Input 
                placeholder="e.g., Summer Sale 2024"
                value={newCampaign.name}
                onChange={(e) => setNewCampaign({ ...newCampaign, name: e.target.value })}
              />
            </div>

            {/* Type and Status */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select 
                  value={newCampaign.type} 
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, type: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Promotional">Promotional</SelectItem>
                    <SelectItem value="Onboarding">Onboarding</SelectItem>
                    <SelectItem value="Retention">Retention</SelectItem>
                    <SelectItem value="Seasonal">Seasonal</SelectItem>
                    <SelectItem value="Flash Sale">Flash Sale</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={newCampaign.status} 
                  onValueChange={(value) => setNewCampaign({ ...newCampaign, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Scheduled">Scheduled</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Start Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP") : "Select start date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
              <div className="space-y-2">
                <Label>End Date *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP") : "Select end date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                      className={cn("p-3 pointer-events-auto")}
                    />
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Coupon Details */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Tag className="h-4 w-4" />
                Coupon Details
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Coupon Code</Label>
                  <Input 
                    placeholder="e.g., SUMMER20"
                    value={newCampaign.couponCode}
                    onChange={(e) => setNewCampaign({ ...newCampaign, couponCode: e.target.value.toUpperCase() })}
                    className="font-mono uppercase"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <Input 
                    placeholder="e.g., 20% or 5 KD"
                    value={newCampaign.discountValue}
                    onChange={(e) => setNewCampaign({ ...newCampaign, discountValue: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label>Campaign Description</Label>
              <Textarea 
                placeholder="Describe your campaign objectives and target audience..."
                value={newCampaign.description}
                onChange={(e) => setNewCampaign({ ...newCampaign, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCampaignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCampaign}>
              Create Campaign
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Coupon Dialog */}
      <Dialog open={addCouponOpen} onOpenChange={setAddCouponOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Create New Coupon
            </DialogTitle>
            <DialogDescription>Generate a discount code for your customers</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Coupon Code */}
            <div className="space-y-2">
              <Label>Coupon Code *</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="e.g., SUMMER20"
                  value={newCoupon.code}
                  onChange={(e) => setNewCoupon({ ...newCoupon, code: e.target.value.toUpperCase() })}
                  className="font-mono uppercase flex-1"
                />
                <Button variant="outline" onClick={generateCouponCode} type="button">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </Button>
              </div>
            </div>

            {/* Discount Type Selection */}
            <div className="space-y-3">
              <Label>Discount Type</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewCoupon({ ...newCoupon, discountType: "percentage" })}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    newCoupon.discountType === "percentage" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    newCoupon.discountType === "percentage" ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Percent className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Percentage</span>
                  <span className="text-xs text-muted-foreground">e.g., 20% off</span>
                </button>
                <button
                  type="button"
                  onClick={() => setNewCoupon({ ...newCoupon, discountType: "fixed" })}
                  className={cn(
                    "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                    newCoupon.discountType === "fixed" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <div className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center",
                    newCoupon.discountType === "fixed" ? "bg-primary text-primary-foreground" : "bg-muted"
                  )}>
                    <Tag className="h-5 w-5" />
                  </div>
                  <span className="font-medium">Fixed Amount</span>
                  <span className="text-xs text-muted-foreground">e.g., 5 KD off</span>
                </button>
              </div>
            </div>

            {/* Discount Value */}
            <div className="space-y-2">
              <Label>Discount Value *</Label>
              <div className="relative">
                <Input 
                  type="number"
                  placeholder={newCoupon.discountType === "percentage" ? "20" : "5"}
                  value={newCoupon.discountValue}
                  onChange={(e) => setNewCoupon({ ...newCoupon, discountValue: e.target.value })}
                  className="pr-12"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  {newCoupon.discountType === "percentage" ? "%" : "KD"}
                </span>
              </div>
            </div>

            {/* Conditions */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <ShoppingCart className="h-4 w-4" />
                Conditions
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Order Value</Label>
                  <div className="relative">
                    <Input 
                      type="number"
                      placeholder="Optional"
                      value={newCoupon.minOrderValue}
                      onChange={(e) => setNewCoupon({ ...newCoupon, minOrderValue: e.target.value })}
                      className="pr-10"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">KD</span>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label>Maximum Uses</Label>
                  <Input 
                    type="number"
                    placeholder="Unlimited"
                    value={newCoupon.maxUses}
                    onChange={(e) => setNewCoupon({ ...newCoupon, maxUses: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Applicable To */}
            <div className="space-y-3">
              <Label>Applicable To</Label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setNewCoupon({ ...newCoupon, applicableTo: "all" })}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCoupon.applicableTo === "all" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Users className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">All Customers</div>
                    <div className="text-xs text-muted-foreground">Anyone can use</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewCoupon({ ...newCoupon, applicableTo: "specific" })}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCoupon.applicableTo === "specific" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Gift className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Specific</div>
                    <div className="text-xs text-muted-foreground">Selected users</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Validity */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Set Expiry Date</Label>
                <Switch 
                  checked={newCoupon.hasExpiry}
                  onCheckedChange={(checked) => setNewCoupon({ ...newCoupon, hasExpiry: checked })}
                />
              </div>
              
              {newCoupon.hasExpiry && (
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Valid From</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !couponStartDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {couponStartDate ? format(couponStartDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={couponStartDate}
                          onSelect={setCouponStartDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Valid Until</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !couponEndDate && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {couponEndDate ? format(couponEndDate, "PPP") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={couponEndDate}
                          onSelect={setCouponEndDate}
                          initialFocus
                          className={cn("p-3 pointer-events-auto")}
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCouponOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCoupon}>
              <Tag className="mr-2 h-4 w-4" />
              Create Coupon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
