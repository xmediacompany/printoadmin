import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Target, MessageSquare, Store, Edit, Megaphone, Tag, Mail } from "lucide-react";

export default function Marketing() {
  const campaigns = [
    {
      id: "CAMP-001",
      name: "Summer Discount Campaign",
      type: "Promotional",
      status: "Active",
      duration: "2024-06-01 - 2024-08-31",
      reach: 2450,
      conversion: "12.5%",
    },
    {
      id: "CAMP-002",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Active",
      duration: "2024-01-01 - 2024-12-31",
      reach: 1230,
      conversion: "18.2%",
    },
    {
      id: "CAMP-003",
      name: "Weekend Special Offer",
      type: "Promotional",
      status: "Scheduled",
      duration: "2024-02-01 - 2024-02-28",
      reach: 3100,
      conversion: "8.7%",
    },
    {
      id: "CAMP-004",
      name: "Loyalty Rewards Program",
      type: "Retention",
      status: "Draft",
      duration: "2024-03-01 - 2024-05-31",
      reach: 890,
      conversion: "22.1%",
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Active":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>;
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
          <TabsTrigger value="push-sms" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            WhatsApp
          </TabsTrigger>
          <TabsTrigger value="merchandising" className="gap-2">
            <Store className="h-4 w-4" />
            Promotions
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
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <Button size="sm">
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
                    <TableHead>Reach</TableHead>
                    <TableHead>Conversion</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {campaigns.map((campaign) => (
                    <TableRow key={campaign.id}>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="font-medium">{campaign.name}</div>
                          <div className="text-xs text-muted-foreground">{campaign.id}</div>
                        </div>
                      </TableCell>
                      <TableCell>{campaign.type}</TableCell>
                      <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                      <TableCell className="text-sm">{campaign.duration}</TableCell>
                      <TableCell className="font-medium">{campaign.reach.toLocaleString()}</TableCell>
                      <TableCell className="font-medium">{campaign.conversion}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="default" size="sm" className="bg-foreground text-background hover:bg-foreground/90">
                          View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push-sms">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">WhatsApp campaigns and notifications will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="merchandising" className="space-y-6">
          {/* Collections and Newsletter Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Collections</CardTitle>
                    <CardDescription>Product groupings and categories</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Collection
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">Business Essentials</h4>
                      <p className="text-sm text-muted-foreground">24 products</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">Marketing Materials</h4>
                      <p className="text-sm text-muted-foreground">18 products</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold">Promotional Products</h4>
                      <p className="text-sm text-muted-foreground">32 products</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
          </div>

          {/* Promotions and Coupons Row */}
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5" />
                      Promotions
                    </CardTitle>
                    <CardDescription>Active campaigns and offers</CardDescription>
                  </div>
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    New Promo
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">Summer Sale 2024</h4>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">20% off • Ends in 5 days</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold">First Order Discount</h4>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">15% off • Starts in 2 days</p>
                    </div>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

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
                  <Button size="sm">
                    <Plus className="mr-2 h-4 w-4" />
                    Create Coupon
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold font-mono text-lg">PRINT20</h4>
                      <p className="text-sm text-muted-foreground">Used 45 times</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex-1">
                      <h4 className="font-semibold font-mono text-lg">WELCOME15</h4>
                      <p className="text-sm text-muted-foreground">Used 128 times</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Upsells & Cross-sells */}
          <Card>
            <CardHeader>
              <CardTitle>Upsells & Cross-sells</CardTitle>
              <CardDescription>Product recommendations and bundles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Business Card Bundle</h4>
                    <p className="text-sm text-muted-foreground">
                      When buying Business Cards → Suggest Letterhead + Envelopes
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">12 conversions</span>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <div className="flex-1">
                    <h4 className="font-semibold mb-1">Marketing Combo</h4>
                    <p className="text-sm text-muted-foreground">
                      When buying Flyers → Suggest Posters + Banners
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">8 conversions</span>
                    <Button variant="ghost" size="icon">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
