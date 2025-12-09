import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Plus, Target, MessageSquare, Store, Edit, Megaphone, Tag, Mail } from "lucide-react";

export default function Marketing() {
  const campaigns = [
    {
      id: "CAMP-001",
      name: "Summer Discount Campaign",
      type: "Promotional",
      status: "Active",
      duration: "2024-06-01 - 2024-08-31",
      usedCoupons: 245,
    },
    {
      id: "CAMP-002",
      name: "New Customer Welcome",
      type: "Onboarding",
      status: "Active",
      duration: "2024-01-01 - 2024-12-31",
      usedCoupons: 128,
    },
    {
      id: "CAMP-003",
      name: "Weekend Special Offer",
      type: "Promotional",
      status: "Scheduled",
      duration: "2024-02-01 - 2024-02-28",
      usedCoupons: 0,
    },
    {
      id: "CAMP-004",
      name: "Loyalty Rewards Program",
      type: "Retention",
      status: "Draft",
      duration: "2024-03-01 - 2024-05-31",
      usedCoupons: 0,
    },
  ];

  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCampaigns = campaigns.filter(campaign => {
    if (statusFilter === "all") return true;
    return campaign.status === statusFilter;
  });

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
                      <TableCell className="text-sm">{campaign.duration}</TableCell>
                      <TableCell className="font-medium">{campaign.usedCoupons.toLocaleString()}</TableCell>
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
          {/* Newsletter and Coupons Row */}
          <div className="grid gap-6 md:grid-cols-2">
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
        </TabsContent>
      </Tabs>
    </div>
  );
}
