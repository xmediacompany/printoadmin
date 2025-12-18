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
import { Search, Plus, Target, Tag, Mail, CalendarIcon, Percent, Sparkles, Copy, Gift, Users, ShoppingCart, Edit, Trash2, Settings, Send, Clock, Globe, Palette, Bell, FileText, Package, X, Check } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

interface NewsletterSettings {
  senderName: string;
  senderEmail: string;
  replyToEmail: string;
  defaultSubjectPrefix: string;
  frequency: "daily" | "weekly" | "monthly" | "manual";
  sendTime: string;
  timezone: string;
  templateStyle: "minimal" | "modern" | "classic";
  brandColor: string;
  includeUnsubscribeLink: boolean;
  enableTracking: boolean;
  doubleOptIn: boolean;
  welcomeEmailEnabled: boolean;
  welcomeEmailSubject: string;
}

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
  targetScope: "all" | "specific";
  selectedProducts?: string[];
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
  targetScope: "all" | "specific";
  selectedProducts?: string[];
}

interface Product {
  id: string;
  name: string;
  category: "Products" | "Services";
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
      targetScope: "all",
    },
    {
      id: "CAMP-002",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      usedCoupons: 128,
      targetScope: "all",
    },
    {
      id: "CAMP-003",
      name: "Weekend Special Offer",
      type: "Promotional",
      status: "Scheduled",
      startDate: "2024-02-01",
      endDate: "2024-02-28",
      usedCoupons: 0,
      targetScope: "specific",
      selectedProducts: ["Business Cards", "Flyers"],
    },
    {
      id: "CAMP-004",
      name: "Loyalty Rewards Program",
      type: "Retention",
      status: "Draft",
      startDate: "2024-03-01",
      endDate: "2024-05-31",
      usedCoupons: 0,
      targetScope: "all",
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
      targetScope: "all",
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
      targetScope: "specific",
      selectedProducts: ["Business Cards", "Flyers"],
    },
  ]);

  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [addCampaignOpen, setAddCampaignOpen] = useState(false);
  const [editCampaignOpen, setEditCampaignOpen] = useState(false);
  const [addCouponOpen, setAddCouponOpen] = useState(false);
  const [editCouponOpen, setEditCouponOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [selectedCoupon, setSelectedCoupon] = useState<Coupon | null>(null);
  const [campaignTypes, setCampaignTypes] = useState([
    "Christmas", "New Year's Day", "Kuwait National Day", "Isra' and Mi'raj",
    "Ramadan", "Eid al-Fitr", "Eid al-Adha", "Valentine's Day",
    "Mother's Day", "Halloween", "Black Friday", "Flash Sale"
  ]);
  const [customTypeInput, setCustomTypeInput] = useState("");
  const [showCustomTypeInput, setShowCustomTypeInput] = useState(false);
  const [newCampaign, setNewCampaign] = useState({
    name: "",
    type: "Christmas",
    status: "Draft",
    description: "",
    couponCode: "",
    discountValue: "",
    targetScope: "all" as "all" | "specific",
  });
  const [newCoupon, setNewCoupon] = useState({
    code: "",
    discountType: "percentage" as "percentage" | "fixed",
    discountValue: "",
    minOrderValue: "",
    maxUses: "",
    applicableTo: "all" as "all" | "specific",
    hasExpiry: true,
    targetScope: "all" as "all" | "specific",
  });
  
  // Products and services available for targeting
  const [availableProducts, setAvailableProducts] = useState<Product[]>([
    { id: "1", name: "Business Cards", category: "Products" },
    { id: "2", name: "Flyers", category: "Products" },
    { id: "3", name: "Brochures", category: "Products" },
    { id: "4", name: "Posters", category: "Products" },
    { id: "5", name: "Banners", category: "Products" },
    { id: "6", name: "Stickers", category: "Products" },
    { id: "7", name: "T-Shirts", category: "Products" },
    { id: "8", name: "Mugs", category: "Products" },
    { id: "9", name: "Design Service", category: "Services" },
    { id: "10", name: "Express Printing", category: "Services" },
    { id: "11", name: "Large Format Printing", category: "Services" },
    { id: "12", name: "Custom Packaging", category: "Services" },
  ]);
  const [selectedCampaignProducts, setSelectedCampaignProducts] = useState<string[]>([]);
  const [selectedCouponProducts, setSelectedCouponProducts] = useState<string[]>([]);
  const [customProductInput, setCustomProductInput] = useState("");
  const [customServiceInput, setCustomServiceInput] = useState("");
  const [showCustomProductInput, setShowCustomProductInput] = useState(false);
  const [showCustomServiceInput, setShowCustomServiceInput] = useState(false);
  const [customCouponProductInput, setCustomCouponProductInput] = useState("");
  const [customCouponServiceInput, setCustomCouponServiceInput] = useState("");
  const [showCustomCouponProductInput, setShowCustomCouponProductInput] = useState(false);
  const [showCustomCouponServiceInput, setShowCustomCouponServiceInput] = useState(false);
  const [selectedEditCampaignProducts, setSelectedEditCampaignProducts] = useState<string[]>([]);
  const [showEditCustomProductInput, setShowEditCustomProductInput] = useState(false);
  const [showEditCustomServiceInput, setShowEditCustomServiceInput] = useState(false);
  const [editCustomProductInput, setEditCustomProductInput] = useState("");
  const [editCustomServiceInput, setEditCustomServiceInput] = useState("");

  const addCustomProduct = (name: string, category: "Products" | "Services", forCoupon: boolean = false) => {
    if (!name.trim()) return;
    const newId = String(availableProducts.length + 1);
    setAvailableProducts(prev => [...prev, { id: newId, name: name.trim(), category }]);
    if (forCoupon) {
      setSelectedCouponProducts(prev => [...prev, name.trim()]);
    } else {
      setSelectedCampaignProducts(prev => [...prev, name.trim()]);
    }
    toast.success(`${category === "Products" ? "Product" : "Service"} added!`);
  };
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [editStartDate, setEditStartDate] = useState<Date>();
  const [editEndDate, setEditEndDate] = useState<Date>();
  const [couponStartDate, setCouponStartDate] = useState<Date>();
  const [couponEndDate, setCouponEndDate] = useState<Date>();
  const [editCouponStartDate, setEditCouponStartDate] = useState<Date>();
  const [editCouponEndDate, setEditCouponEndDate] = useState<Date>();
  const [newsletterSettingsOpen, setNewsletterSettingsOpen] = useState(false);
  const [newsletterSettings, setNewsletterSettings] = useState<NewsletterSettings>({
    senderName: "PRINTO",
    senderEmail: "newsletter@printo.com",
    replyToEmail: "support@printo.com",
    defaultSubjectPrefix: "[PRINTO]",
    frequency: "weekly",
    sendTime: "09:00",
    timezone: "Asia/Kuwait",
    templateStyle: "modern",
    brandColor: "#778DA9",
    includeUnsubscribeLink: true,
    enableTracking: true,
    doubleOptIn: true,
    welcomeEmailEnabled: true,
    welcomeEmailSubject: "Welcome to PRINTO Newsletter!",
  });

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

    if (newCoupon.targetScope === "specific" && selectedCouponProducts.length === 0) {
      toast.error("Please select at least one product or service");
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
      targetScope: newCoupon.targetScope,
      selectedProducts: newCoupon.targetScope === "specific" ? selectedCouponProducts : undefined,
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
      targetScope: "all",
    });
    setSelectedCouponProducts([]);
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
    if (!startDate || !endDate) {
      toast.error("Please select start and end dates");
      return;
    }
    if (newCampaign.targetScope === "specific" && selectedCampaignProducts.length === 0) {
      toast.error("Please select at least one product or service");
      return;
    }
    
    const campaign: Campaign = {
      id: `CAMP-${String(campaigns.length + 1).padStart(3, '0')}`,
      name: `${newCampaign.type} Campaign`,
      type: newCampaign.type,
      status: newCampaign.status,
      startDate: format(startDate, "yyyy-MM-dd"),
      endDate: format(endDate, "yyyy-MM-dd"),
      usedCoupons: 0,
      description: newCampaign.description,
      couponCode: newCampaign.couponCode,
      discountValue: newCampaign.discountValue,
      targetScope: newCampaign.targetScope,
      selectedProducts: newCampaign.targetScope === "specific" ? selectedCampaignProducts : undefined,
    };
    
    setCampaigns(prev => [...prev, campaign]);
    setNewCampaign({
      name: "",
      type: "Christmas",
      status: "Draft",
      description: "",
      couponCode: "",
      discountValue: "",
      targetScope: "all",
    });
    setSelectedCampaignProducts([]);
    setStartDate(undefined);
    setEndDate(undefined);
    setAddCampaignOpen(false);
    toast.success("Campaign created successfully");
  };

  const handleEditCampaign = (campaign: Campaign) => {
    setSelectedCampaign({ ...campaign });
    setEditStartDate(new Date(campaign.startDate));
    setEditEndDate(new Date(campaign.endDate));
    setSelectedEditCampaignProducts(campaign.selectedProducts || []);
    setEditCampaignOpen(true);
  };

  const handleUpdateCampaign = () => {
    if (!selectedCampaign) return;
    if (!editStartDate || !editEndDate) {
      toast.error("Please select start and end dates");
      return;
    }
    if (selectedCampaign.targetScope === "specific" && selectedEditCampaignProducts.length === 0) {
      toast.error("Please select at least one product or service");
      return;
    }
    
    const updatedCampaign = {
      ...selectedCampaign,
      name: `${selectedCampaign.type} Campaign`,
      startDate: format(editStartDate, "yyyy-MM-dd"),
      endDate: format(editEndDate, "yyyy-MM-dd"),
      selectedProducts: selectedCampaign.targetScope === "specific" ? selectedEditCampaignProducts : undefined,
    };
    
    setCampaigns(prev => prev.map(c => c.id === selectedCampaign.id ? updatedCampaign : c));
    setEditCampaignOpen(false);
    setSelectedCampaign(null);
    setSelectedEditCampaignProducts([]);
    toast.success("Campaign updated successfully");
  };

  const handleDeleteCampaign = (campaignId: string) => {
    setCampaigns(prev => prev.filter(c => c.id !== campaignId));
    toast.success("Campaign deleted");
  };

  const handleEditCoupon = (coupon: Coupon) => {
    setSelectedCoupon({ ...coupon });
    setEditCouponStartDate(new Date(coupon.validFrom));
    setEditCouponEndDate(new Date(coupon.validUntil));
    setEditCouponOpen(true);
  };

  const handleUpdateCoupon = () => {
    if (!selectedCoupon) return;
    
    const updatedCoupon = {
      ...selectedCoupon,
      validFrom: editCouponStartDate ? format(editCouponStartDate, "yyyy-MM-dd") : selectedCoupon.validFrom,
      validUntil: editCouponEndDate ? format(editCouponEndDate, "yyyy-MM-dd") : selectedCoupon.validUntil,
    };
    
    setCoupons(prev => prev.map(c => c.id === selectedCoupon.id ? updatedCoupon : c));
    setEditCouponOpen(false);
    setSelectedCoupon(null);
    toast.success("Coupon updated successfully");
  };

  const handleDeleteCoupon = (couponId: string) => {
    setCoupons(prev => prev.filter(c => c.id !== couponId));
    toast.success("Coupon deleted");
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
                    <TableHead className="text-right">Actions</TableHead>
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
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-1">
                          <Button variant="ghost" size="icon" onClick={() => handleEditCampaign(campaign)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteCampaign(campaign.id)}>
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
                    <p className="text-sm text-muted-foreground mb-3">
                      Used {coupon.usedCount}{coupon.maxUses ? ` / ${coupon.maxUses}` : ""} times
                    </p>
                    <div className="flex gap-1 mt-auto">
                      <Button variant="ghost" size="sm" className="flex-1" onClick={() => handleEditCoupon(coupon)}>
                        <Edit className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive" onClick={() => handleDeleteCoupon(coupon.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
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
                <Button size="sm" variant="outline" onClick={() => setNewsletterSettingsOpen(true)}>
                  <Settings className="h-4 w-4 mr-2" />
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
            {/* Type and Status */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label>Campaign Type</Label>
                <Select 
                  value={newCampaign.type} 
                  onValueChange={(value) => {
                    if (value === "__add_custom__") {
                      setShowCustomTypeInput(true);
                    } else {
                      setNewCampaign({ ...newCampaign, type: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {campaignTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                    <SelectItem value="__add_custom__" className="text-primary font-medium">
                      <span className="flex items-center gap-2">
                        <Plus className="h-3 w-3" />
                        Add Custom Type
                      </span>
                    </SelectItem>
                  </SelectContent>
                </Select>
                {showCustomTypeInput && (
                  <div className="flex gap-2 mt-2">
                    <Input
                      placeholder="Enter custom type..."
                      value={customTypeInput}
                      onChange={(e) => setCustomTypeInput(e.target.value)}
                      className="flex-1"
                    />
                    <Button 
                      size="sm" 
                      onClick={() => {
                        if (customTypeInput.trim()) {
                          setCampaignTypes(prev => [...prev, customTypeInput.trim()]);
                          setNewCampaign({ ...newCampaign, type: customTypeInput.trim() });
                          setCustomTypeInput("");
                          setShowCustomTypeInput(false);
                          toast.success("Custom type added!");
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => {
                        setCustomTypeInput("");
                        setShowCustomTypeInput(false);
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                )}
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

            {/* Target Products/Services */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Package className="h-4 w-4" />
                Target Products/Services
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewCampaign({ ...newCampaign, targetScope: "all" });
                    setSelectedCampaignProducts([]);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCampaign.targetScope === "all" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">All Products</div>
                    <div className="text-xs text-muted-foreground">Apply to everything</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewCampaign({ ...newCampaign, targetScope: "specific" })}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCampaign.targetScope === "specific" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Specific Items</div>
                    <div className="text-xs text-muted-foreground">Select products/services</div>
                  </div>
                </button>
              </div>
              
              {newCampaign.targetScope === "specific" && (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Select Products & Services</Label>
                    {selectedCampaignProducts.length > 0 && (
                      <Badge variant="secondary">{selectedCampaignProducts.length} selected</Badge>
                    )}
                  </div>
                  
                  {/* Products */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Products</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableProducts.filter(p => p.category === "Products").map((product) => (
                        <label
                          key={product.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                            selectedCampaignProducts.includes(product.name)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={selectedCampaignProducts.includes(product.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCampaignProducts([...selectedCampaignProducts, product.name]);
                              } else {
                                setSelectedCampaignProducts(selectedCampaignProducts.filter(p => p !== product.name));
                              }
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                    {!showCustomProductInput ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setShowCustomProductInput(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Extra Product
                      </Button>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter product name..."
                          value={customProductInput}
                          onChange={(e) => setCustomProductInput(e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            addCustomProduct(customProductInput, "Products");
                            setCustomProductInput("");
                            setShowCustomProductInput(false);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            setCustomProductInput("");
                            setShowCustomProductInput(false);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Services */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Services</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableProducts.filter(p => p.category === "Services").map((product) => (
                        <label
                          key={product.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                            selectedCampaignProducts.includes(product.name)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={selectedCampaignProducts.includes(product.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCampaignProducts([...selectedCampaignProducts, product.name]);
                              } else {
                                setSelectedCampaignProducts(selectedCampaignProducts.filter(p => p !== product.name));
                              }
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                    {!showCustomServiceInput ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setShowCustomServiceInput(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Extra Service
                      </Button>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter service name..."
                          value={customServiceInput}
                          onChange={(e) => setCustomServiceInput(e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            addCustomProduct(customServiceInput, "Services");
                            setCustomServiceInput("");
                            setShowCustomServiceInput(false);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            setCustomServiceInput("");
                            setShowCustomServiceInput(false);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

      {/* Edit Campaign Dialog */}
      <Dialog open={editCampaignOpen} onOpenChange={setEditCampaignOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Campaign</DialogTitle>
            <DialogDescription>Modify your marketing campaign settings</DialogDescription>
          </DialogHeader>
          
          {selectedCampaign && (
            <div className="space-y-6 py-4">
              {/* Type and Status */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Campaign Type</Label>
                  <Select 
                    value={selectedCampaign.type} 
                    onValueChange={(value) => {
                      if (value === "__add_custom__") {
                        setShowCustomTypeInput(true);
                      } else {
                        setSelectedCampaign({ ...selectedCampaign, type: value, name: `${value} Campaign` });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {campaignTypes.map((type) => (
                        <SelectItem key={type} value={type}>{type}</SelectItem>
                      ))}
                      <SelectItem value="__add_custom__" className="text-primary font-medium">
                        <span className="flex items-center gap-2">
                          <Plus className="h-3 w-3" />
                          Add Custom Type
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {showCustomTypeInput && (
                    <div className="flex gap-2 mt-2">
                      <Input
                        placeholder="Enter custom type..."
                        value={customTypeInput}
                        onChange={(e) => setCustomTypeInput(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        size="sm" 
                        onClick={() => {
                          if (customTypeInput.trim()) {
                            setCampaignTypes(prev => [...prev, customTypeInput.trim()]);
                            setSelectedCampaign({ ...selectedCampaign, type: customTypeInput.trim(), name: `${customTypeInput.trim()} Campaign` });
                            setCustomTypeInput("");
                            setShowCustomTypeInput(false);
                            toast.success("Custom type added!");
                          }
                        }}
                      >
                        Add
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => {
                          setCustomTypeInput("");
                          setShowCustomTypeInput(false);
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select 
                    value={selectedCampaign.status} 
                    onValueChange={(value) => setSelectedCampaign({ ...selectedCampaign, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Draft">Draft</SelectItem>
                      <SelectItem value="Scheduled">Scheduled</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Expired">Expired</SelectItem>
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
                          !editStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editStartDate ? format(editStartDate, "PPP") : "Select start date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editStartDate}
                        onSelect={setEditStartDate}
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
                          !editEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editEndDate ? format(editEndDate, "PPP") : "Select end date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editEndDate}
                        onSelect={setEditEndDate}
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
                      value={selectedCampaign.couponCode || ""}
                      onChange={(e) => setSelectedCampaign({ ...selectedCampaign, couponCode: e.target.value.toUpperCase() })}
                      className="font-mono uppercase"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Discount Value</Label>
                    <Input 
                      placeholder="e.g., 20% or 5 KD"
                      value={selectedCampaign.discountValue || ""}
                      onChange={(e) => setSelectedCampaign({ ...selectedCampaign, discountValue: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Target Products/Services */}
              <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold flex items-center gap-2">
                  <Package className="h-4 w-4" />
                  Target Products/Services
                </h4>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCampaign({ ...selectedCampaign, targetScope: "all" });
                      setSelectedEditCampaignProducts([]);
                    }}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                      selectedCampaign.targetScope === "all" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <div className="font-medium">All Products</div>
                      <div className="text-xs text-muted-foreground">Apply to everything</div>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => setSelectedCampaign({ ...selectedCampaign, targetScope: "specific" })}
                    className={cn(
                      "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                      selectedCampaign.targetScope === "specific" 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-muted-foreground/50"
                    )}
                  >
                    <Package className="h-5 w-5 text-muted-foreground" />
                    <div className="text-left">
                      <div className="font-medium">Specific Items</div>
                      <div className="text-xs text-muted-foreground">Select products/services</div>
                    </div>
                  </button>
                </div>
                
                {selectedCampaign.targetScope === "specific" && (
                  <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Select Products & Services</Label>
                      {selectedEditCampaignProducts.length > 0 && (
                        <Badge variant="secondary">{selectedEditCampaignProducts.length} selected</Badge>
                      )}
                    </div>
                    
                    {/* Products */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Products</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableProducts.filter(p => p.category === "Products").map((product) => (
                          <label
                            key={product.id}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                              selectedEditCampaignProducts.includes(product.name)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted/50"
                            )}
                          >
                            <Checkbox
                              checked={selectedEditCampaignProducts.includes(product.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedEditCampaignProducts([...selectedEditCampaignProducts, product.name]);
                                } else {
                                  setSelectedEditCampaignProducts(selectedEditCampaignProducts.filter(p => p !== product.name));
                                }
                              }}
                            />
                            <span className="text-sm">{product.name}</span>
                          </label>
                        ))}
                      </div>
                      {!showEditCustomProductInput ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => setShowEditCustomProductInput(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Extra Product
                        </Button>
                      ) : (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter product name..."
                            value={editCustomProductInput}
                            onChange={(e) => setEditCustomProductInput(e.target.value)}
                            className="flex-1 h-8 text-sm"
                          />
                          <Button
                            type="button"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              if (editCustomProductInput.trim()) {
                                const newId = String(availableProducts.length + 1);
                                setAvailableProducts(prev => [...prev, { id: newId, name: editCustomProductInput.trim(), category: "Products" }]);
                                setSelectedEditCampaignProducts(prev => [...prev, editCustomProductInput.trim()]);
                                toast.success("Product added!");
                              }
                              setEditCustomProductInput("");
                              setShowEditCustomProductInput(false);
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              setEditCustomProductInput("");
                              setShowEditCustomProductInput(false);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                    
                    {/* Services */}
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Services</p>
                      <div className="grid grid-cols-2 gap-2">
                        {availableProducts.filter(p => p.category === "Services").map((product) => (
                          <label
                            key={product.id}
                            className={cn(
                              "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                              selectedEditCampaignProducts.includes(product.name)
                                ? "border-primary bg-primary/5"
                                : "border-border hover:bg-muted/50"
                            )}
                          >
                            <Checkbox
                              checked={selectedEditCampaignProducts.includes(product.name)}
                              onCheckedChange={(checked) => {
                                if (checked) {
                                  setSelectedEditCampaignProducts([...selectedEditCampaignProducts, product.name]);
                                } else {
                                  setSelectedEditCampaignProducts(selectedEditCampaignProducts.filter(p => p !== product.name));
                                }
                              }}
                            />
                            <span className="text-sm">{product.name}</span>
                          </label>
                        ))}
                      </div>
                      {!showEditCustomServiceInput ? (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="w-full mt-2"
                          onClick={() => setShowEditCustomServiceInput(true)}
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add Extra Service
                        </Button>
                      ) : (
                        <div className="flex gap-2 mt-2">
                          <Input
                            placeholder="Enter service name..."
                            value={editCustomServiceInput}
                            onChange={(e) => setEditCustomServiceInput(e.target.value)}
                            className="flex-1 h-8 text-sm"
                          />
                          <Button
                            type="button"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              if (editCustomServiceInput.trim()) {
                                const newId = String(availableProducts.length + 1);
                                setAvailableProducts(prev => [...prev, { id: newId, name: editCustomServiceInput.trim(), category: "Services" }]);
                                setSelectedEditCampaignProducts(prev => [...prev, editCustomServiceInput.trim()]);
                                toast.success("Service added!");
                              }
                              setEditCustomServiceInput("");
                              setShowEditCustomServiceInput(false);
                            }}
                          >
                            <Check className="h-3 w-3" />
                          </Button>
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="h-8"
                            onClick={() => {
                              setEditCustomServiceInput("");
                              setShowEditCustomServiceInput(false);
                            }}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label>Campaign Description</Label>
                <Textarea 
                  placeholder="Describe your campaign objectives and target audience..."
                  value={selectedCampaign.description || ""}
                  onChange={(e) => setSelectedCampaign({ ...selectedCampaign, description: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCampaignOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCampaign}>
              Save Changes
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

            {/* Target Products/Services */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Package className="h-4 w-4" />
                Target Products/Services
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setNewCoupon({ ...newCoupon, targetScope: "all" });
                    setSelectedCouponProducts([]);
                  }}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCoupon.targetScope === "all" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <ShoppingCart className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">All Products</div>
                    <div className="text-xs text-muted-foreground">Apply to everything</div>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setNewCoupon({ ...newCoupon, targetScope: "specific" })}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-lg border-2 transition-all",
                    newCoupon.targetScope === "specific" 
                      ? "border-primary bg-primary/5" 
                      : "border-border hover:border-muted-foreground/50"
                  )}
                >
                  <Package className="h-5 w-5 text-muted-foreground" />
                  <div className="text-left">
                    <div className="font-medium">Specific Items</div>
                    <div className="text-xs text-muted-foreground">Select products/services</div>
                  </div>
                </button>
              </div>
              
              {newCoupon.targetScope === "specific" && (
                <div className="space-y-3 mt-4">
                  <div className="flex items-center justify-between">
                    <Label className="text-sm">Select Products & Services</Label>
                    {selectedCouponProducts.length > 0 && (
                      <Badge variant="secondary">{selectedCouponProducts.length} selected</Badge>
                    )}
                  </div>
                  
                  {/* Products */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Products</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableProducts.filter(p => p.category === "Products").map((product) => (
                        <label
                          key={product.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                            selectedCouponProducts.includes(product.name)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={selectedCouponProducts.includes(product.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCouponProducts([...selectedCouponProducts, product.name]);
                              } else {
                                setSelectedCouponProducts(selectedCouponProducts.filter(p => p !== product.name));
                              }
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                    {!showCustomCouponProductInput ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setShowCustomCouponProductInput(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Extra Product
                      </Button>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter product name..."
                          value={customCouponProductInput}
                          onChange={(e) => setCustomCouponProductInput(e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            addCustomProduct(customCouponProductInput, "Products", true);
                            setCustomCouponProductInput("");
                            setShowCustomCouponProductInput(false);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            setCustomCouponProductInput("");
                            setShowCustomCouponProductInput(false);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                  
                  {/* Services */}
                  <div className="space-y-2">
                    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Services</p>
                    <div className="grid grid-cols-2 gap-2">
                      {availableProducts.filter(p => p.category === "Services").map((product) => (
                        <label
                          key={product.id}
                          className={cn(
                            "flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-all",
                            selectedCouponProducts.includes(product.name)
                              ? "border-primary bg-primary/5"
                              : "border-border hover:bg-muted/50"
                          )}
                        >
                          <Checkbox
                            checked={selectedCouponProducts.includes(product.name)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                setSelectedCouponProducts([...selectedCouponProducts, product.name]);
                              } else {
                                setSelectedCouponProducts(selectedCouponProducts.filter(p => p !== product.name));
                              }
                            }}
                          />
                          <span className="text-sm">{product.name}</span>
                        </label>
                      ))}
                    </div>
                    {!showCustomCouponServiceInput ? (
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="w-full mt-2"
                        onClick={() => setShowCustomCouponServiceInput(true)}
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add Extra Service
                      </Button>
                    ) : (
                      <div className="flex gap-2 mt-2">
                        <Input
                          placeholder="Enter service name..."
                          value={customCouponServiceInput}
                          onChange={(e) => setCustomCouponServiceInput(e.target.value)}
                          className="flex-1 h-8 text-sm"
                        />
                        <Button
                          type="button"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            addCustomProduct(customCouponServiceInput, "Services", true);
                            setCustomCouponServiceInput("");
                            setShowCustomCouponServiceInput(false);
                          }}
                        >
                          <Check className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="h-8"
                          onClick={() => {
                            setCustomCouponServiceInput("");
                            setShowCustomCouponServiceInput(false);
                          }}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              )}
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

      {/* Edit Coupon Dialog */}
      <Dialog open={editCouponOpen} onOpenChange={setEditCouponOpen}>
        <DialogContent className="max-w-xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Gift className="h-5 w-5 text-primary" />
              Edit Coupon
            </DialogTitle>
            <DialogDescription>Modify coupon settings</DialogDescription>
          </DialogHeader>
          
          {selectedCoupon && (
            <div className="space-y-6 py-4">
              {/* Coupon Code */}
              <div className="space-y-2">
                <Label>Coupon Code</Label>
                <Input 
                  value={selectedCoupon.code}
                  onChange={(e) => setSelectedCoupon({ ...selectedCoupon, code: e.target.value.toUpperCase() })}
                  className="font-mono uppercase"
                />
              </div>

              {/* Discount Type */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Discount Type</Label>
                  <Select 
                    value={selectedCoupon.discountType} 
                    onValueChange={(value: "percentage" | "fixed") => setSelectedCoupon({ ...selectedCoupon, discountType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="percentage">Percentage (%)</SelectItem>
                      <SelectItem value="fixed">Fixed Amount (KD)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Discount Value</Label>
                  <div className="relative">
                    <Input 
                      type="number"
                      value={selectedCoupon.discountValue}
                      onChange={(e) => setSelectedCoupon({ ...selectedCoupon, discountValue: parseFloat(e.target.value) || 0 })}
                      className="pr-12"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                      {selectedCoupon.discountType === "percentage" ? "%" : "KD"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <Label>Status</Label>
                <Select 
                  value={selectedCoupon.status} 
                  onValueChange={(value: "Active" | "Expired" | "Paused") => setSelectedCoupon({ ...selectedCoupon, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Paused">Paused</SelectItem>
                    <SelectItem value="Expired">Expired</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Conditions */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Minimum Order Value</Label>
                  <div className="relative">
                    <Input 
                      type="number"
                      placeholder="Optional"
                      value={selectedCoupon.minOrderValue || ""}
                      onChange={(e) => setSelectedCoupon({ ...selectedCoupon, minOrderValue: e.target.value ? parseFloat(e.target.value) : undefined })}
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
                    value={selectedCoupon.maxUses || ""}
                    onChange={(e) => setSelectedCoupon({ ...selectedCoupon, maxUses: e.target.value ? parseInt(e.target.value) : undefined })}
                  />
                </div>
              </div>

              {/* Validity Period */}
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Valid From</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !editCouponStartDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editCouponStartDate ? format(editCouponStartDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editCouponStartDate}
                        onSelect={setEditCouponStartDate}
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
                          !editCouponEndDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {editCouponEndDate ? format(editCouponEndDate, "PPP") : "Select date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={editCouponEndDate}
                        onSelect={setEditCouponEndDate}
                        initialFocus
                        className={cn("p-3 pointer-events-auto")}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditCouponOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateCoupon}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Newsletter Settings Dialog */}
      <Dialog open={newsletterSettingsOpen} onOpenChange={setNewsletterSettingsOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5 text-primary" />
              Newsletter Settings
            </DialogTitle>
            <DialogDescription>Configure your email newsletter preferences and delivery options</DialogDescription>
          </DialogHeader>
          
          <div className="space-y-6 py-4">
            {/* Sender Information */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Send className="h-4 w-4" />
                Sender Information
              </h4>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Sender Name</Label>
                  <Input 
                    placeholder="Your Brand Name"
                    value={newsletterSettings.senderName}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, senderName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Sender Email</Label>
                  <Input 
                    type="email"
                    placeholder="newsletter@example.com"
                    value={newsletterSettings.senderEmail}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, senderEmail: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Reply-To Email</Label>
                  <Input 
                    type="email"
                    placeholder="support@example.com"
                    value={newsletterSettings.replyToEmail}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, replyToEmail: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Subject Prefix</Label>
                  <Input 
                    placeholder="[PRINTO]"
                    value={newsletterSettings.defaultSubjectPrefix}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, defaultSubjectPrefix: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Scheduling */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Scheduling
              </h4>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label>Send Frequency</Label>
                  <Select 
                    value={newsletterSettings.frequency} 
                    onValueChange={(value: "daily" | "weekly" | "monthly" | "manual") => 
                      setNewsletterSettings({ ...newsletterSettings, frequency: value })
                    }
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="manual">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Send Time</Label>
                  <Input 
                    type="time"
                    value={newsletterSettings.sendTime}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, sendTime: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Timezone</Label>
                  <Select 
                    value={newsletterSettings.timezone} 
                    onValueChange={(value) => setNewsletterSettings({ ...newsletterSettings, timezone: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Asia/Kuwait">Kuwait (GMT+3)</SelectItem>
                      <SelectItem value="Asia/Dubai">Dubai (GMT+4)</SelectItem>
                      <SelectItem value="Asia/Riyadh">Riyadh (GMT+3)</SelectItem>
                      <SelectItem value="Europe/London">London (GMT)</SelectItem>
                      <SelectItem value="America/New_York">New York (EST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Template & Branding */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Template & Branding
              </h4>
              <div className="space-y-3">
                <Label>Template Style</Label>
                <div className="grid grid-cols-3 gap-3">
                  {(["minimal", "modern", "classic"] as const).map((style) => (
                    <button
                      key={style}
                      type="button"
                      onClick={() => setNewsletterSettings({ ...newsletterSettings, templateStyle: style })}
                      className={cn(
                        "flex flex-col items-center gap-2 p-4 rounded-lg border-2 transition-all",
                        newsletterSettings.templateStyle === style 
                          ? "border-primary bg-primary/5" 
                          : "border-border hover:border-muted-foreground/50"
                      )}
                    >
                      <div className={cn(
                        "w-full h-12 rounded flex items-center justify-center text-xs",
                        style === "minimal" && "bg-background border",
                        style === "modern" && "bg-gradient-to-r from-primary/20 to-primary/10",
                        style === "classic" && "bg-muted border-2 border-double"
                      )}>
                        {style === "minimal" && <FileText className="h-4 w-4 text-muted-foreground" />}
                        {style === "modern" && <Sparkles className="h-4 w-4 text-primary" />}
                        {style === "classic" && <Mail className="h-4 w-4 text-muted-foreground" />}
                      </div>
                      <span className="font-medium capitalize">{style}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                <Label>Brand Color</Label>
                <div className="flex items-center gap-3">
                  <Input 
                    type="color"
                    value={newsletterSettings.brandColor}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, brandColor: e.target.value })}
                    className="w-16 h-10 p-1 cursor-pointer"
                  />
                  <Input 
                    value={newsletterSettings.brandColor}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, brandColor: e.target.value })}
                    className="flex-1 font-mono"
                    placeholder="#778DA9"
                  />
                </div>
              </div>
            </div>

            {/* Subscription Options */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <h4 className="font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Subscription Options
              </h4>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Include Unsubscribe Link</div>
                    <div className="text-sm text-muted-foreground">Required by law in most countries</div>
                  </div>
                  <Switch 
                    checked={newsletterSettings.includeUnsubscribeLink}
                    onCheckedChange={(checked) => setNewsletterSettings({ ...newsletterSettings, includeUnsubscribeLink: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Enable Open & Click Tracking</div>
                    <div className="text-sm text-muted-foreground">Track email engagement metrics</div>
                  </div>
                  <Switch 
                    checked={newsletterSettings.enableTracking}
                    onCheckedChange={(checked) => setNewsletterSettings({ ...newsletterSettings, enableTracking: checked })}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium">Double Opt-In</div>
                    <div className="text-sm text-muted-foreground">Require email confirmation to subscribe</div>
                  </div>
                  <Switch 
                    checked={newsletterSettings.doubleOptIn}
                    onCheckedChange={(checked) => setNewsletterSettings({ ...newsletterSettings, doubleOptIn: checked })}
                  />
                </div>
              </div>
            </div>

            {/* Welcome Email */}
            <div className="space-y-4 p-4 bg-muted/50 rounded-lg">
              <div className="flex items-center justify-between">
                <h4 className="font-semibold flex items-center gap-2">
                  <Gift className="h-4 w-4" />
                  Welcome Email
                </h4>
                <Switch 
                  checked={newsletterSettings.welcomeEmailEnabled}
                  onCheckedChange={(checked) => setNewsletterSettings({ ...newsletterSettings, welcomeEmailEnabled: checked })}
                />
              </div>
              {newsletterSettings.welcomeEmailEnabled && (
                <div className="space-y-2">
                  <Label>Welcome Email Subject</Label>
                  <Input 
                    placeholder="Welcome to our newsletter!"
                    value={newsletterSettings.welcomeEmailSubject}
                    onChange={(e) => setNewsletterSettings({ ...newsletterSettings, welcomeEmailSubject: e.target.value })}
                  />
                </div>
              )}
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setNewsletterSettingsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setNewsletterSettingsOpen(false);
              toast.success("Newsletter settings saved successfully!");
            }}>
              Save Settings
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
