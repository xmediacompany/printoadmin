import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Plus, Target, Ticket, MessageSquare, Mail } from "lucide-react";

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
          <TabsTrigger value="vouchers" className="gap-2">
            <Ticket className="h-4 w-4" />
            Vouchers
          </TabsTrigger>
          <TabsTrigger value="push-sms" className="gap-2">
            <MessageSquare className="h-4 w-4" />
            Push/SMS
          </TabsTrigger>
          <TabsTrigger value="templates" className="gap-2">
            <Mail className="h-4 w-4" />
            Templates
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

        <TabsContent value="vouchers">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Voucher codes and promotional offers will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="push-sms">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Push notifications and SMS campaigns will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Marketing templates and email designs will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
