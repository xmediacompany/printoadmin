import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Search, Filter, Download, CreditCard, Banknote, Smartphone, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight, RotateCcw, Clock, CheckCircle, XCircle, AlertCircle, Eye, MoreHorizontal, Building2, Users } from "lucide-react";
import { toast } from "sonner";

export default function Finance() {
  const [invoiceStatusFilter, setInvoiceStatusFilter] = useState("all");
  const [paymentStatusFilter, setPaymentStatusFilter] = useState("all");
  const [refundStatusFilter, setRefundStatusFilter] = useState("all");
  const [segmentFilter, setSegmentFilter] = useState<"all" | "b2b" | "customer">("all");

  const invoices = [
    {
      id: "INV-001",
      customer: "Fatima Al-Zahra",
      amount: "KD 45.500",
      status: "Paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
      segment: "customer" as const,
    },
    {
      id: "INV-002",
      customer: "Gulf Trading Co.",
      amount: "KD 1,250.000",
      status: "Pending",
      date: "2024-01-14",
      dueDate: "2024-01-29",
      segment: "b2b" as const,
    },
    {
      id: "INV-003",
      customer: "Noura Al-Sabah",
      amount: "KD 67.250",
      status: "Overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
      segment: "customer" as const,
    },
    {
      id: "INV-004",
      customer: "Kuwait Printing Services",
      amount: "KD 3,450.000",
      status: "Paid",
      date: "2024-01-12",
      dueDate: "2024-01-27",
      segment: "b2b" as const,
    },
    {
      id: "INV-005",
      customer: "Reem Al-Mutawa",
      amount: "KD 54.000",
      status: "Pending",
      date: "2024-01-13",
      dueDate: "2024-01-28",
      segment: "customer" as const,
    },
    {
      id: "INV-006",
      customer: "Al-Salam Enterprises",
      amount: "KD 2,890.500",
      status: "Paid",
      date: "2024-01-11",
      dueDate: "2024-01-26",
      segment: "b2b" as const,
    },
  ];

  const payments = [
    {
      id: "PAY-001",
      customer: "Fatima Al-Zahra",
      amount: "KD 45.500",
      method: "Credit Card",
      cardLast4: "4532",
      status: "Completed",
      date: "2024-01-15",
      time: "14:32:05",
      orderId: "ORD-1234",
      segment: "customer" as const,
    },
    {
      id: "PAY-002",
      customer: "Gulf Trading Co.",
      amount: "KD 1,250.000",
      method: "Bank Transfer",
      cardLast4: null,
      status: "Completed",
      date: "2024-01-15",
      time: "12:18:43",
      orderId: "ORD-1235",
      segment: "b2b" as const,
    },
    {
      id: "PAY-003",
      customer: "Omar Hassan",
      amount: "KD 32.750",
      method: "Cash",
      cardLast4: null,
      status: "Pending",
      date: "2024-01-14",
      time: "16:45:22",
      orderId: "ORD-1236",
      segment: "customer" as const,
    },
    {
      id: "PAY-004",
      customer: "Kuwait Printing Services",
      amount: "KD 3,450.000",
      method: "Bank Transfer",
      cardLast4: null,
      status: "Completed",
      date: "2024-01-14",
      time: "10:22:17",
      orderId: "ORD-1237",
      segment: "b2b" as const,
    },
    {
      id: "PAY-005",
      customer: "Mohammed Al-Sabah",
      amount: "KD 156.000",
      method: "Credit Card",
      cardLast4: "7654",
      status: "Processing",
      date: "2024-01-14",
      time: "09:15:33",
      orderId: "ORD-1238",
      segment: "customer" as const,
    },
    {
      id: "PAY-006",
      customer: "Al-Salam Enterprises",
      amount: "KD 2,890.500",
      method: "Bank Transfer",
      cardLast4: null,
      status: "Completed",
      date: "2024-01-13",
      time: "18:55:12",
      orderId: "ORD-1239",
      segment: "b2b" as const,
    },
    {
      id: "PAY-007",
      customer: "Ahmad Al-Rashid",
      amount: "KD 67.500",
      method: "Credit Card",
      cardLast4: "9012",
      status: "Completed",
      date: "2024-01-13",
      time: "15:30:45",
      orderId: "ORD-1240",
      segment: "customer" as const,
    },
  ];

  const refunds = [
    {
      id: "REF-001",
      customer: "Sara Al-Mutairi",
      orderId: "ORD-1239",
      amount: "KD 42.750",
      reason: "Payment Failed",
      reasonIcon: AlertCircle,
      reasonIconColor: "text-yellow-500",
      status: "Pending",
      date: "2024-01-15",
      time: "10:45 AM",
      segment: "customer" as const,
    },
    {
      id: "REF-002",
      customer: "Gulf Trading Co.",
      orderId: "ORD-1225",
      amount: "KD 890.000",
      reason: "Order Cancelled",
      reasonIcon: XCircle,
      reasonIconColor: "text-red-500",
      status: "Pending",
      date: "2024-01-14",
      time: "3:22 PM",
      segment: "b2b" as const,
    },
    {
      id: "REF-003",
      customer: "Omar Hassan",
      orderId: "ORD-1218",
      amount: "KD 32.750",
      reason: "Defective Product",
      reasonIcon: XCircle,
      reasonIconColor: "text-red-500",
      status: "Approved",
      date: "2024-01-13",
      time: "11:30 AM",
      segment: "customer" as const,
    },
    {
      id: "REF-004",
      customer: "Al-Salam Enterprises",
      orderId: "ORD-1210",
      amount: "KD 1,450.000",
      reason: "Wrong Specifications",
      reasonIcon: AlertCircle,
      reasonIconColor: "text-yellow-500",
      status: "Approved",
      date: "2024-01-12",
      time: "2:15 PM",
      segment: "b2b" as const,
    },
  ];

  // Filter data based on segment
  const filteredInvoices = invoices.filter(inv => segmentFilter === "all" || inv.segment === segmentFilter);
  const filteredPayments = payments.filter(pay => segmentFilter === "all" || pay.segment === segmentFilter);
  const filteredRefunds = refunds.filter(ref => segmentFilter === "all" || ref.segment === segmentFilter);

  // Calculate segment-specific stats
  const getSegmentStats = () => {
    if (segmentFilter === "b2b") {
      return {
        totalReceived: "KD 7,590.500",
        totalReceivedChange: "+18.2%",
        pendingPayments: "KD 1,250.000",
        pendingChange: "-5.4%",
      };
    } else if (segmentFilter === "customer") {
      return {
        totalReceived: "KD 4,860.000",
        totalReceivedChange: "+8.7%",
        pendingPayments: "KD 1,090.000",
        pendingChange: "-1.2%",
      };
    }
    return {
      totalReceived: "KD 12,450.500",
      totalReceivedChange: "+12.5%",
      pendingPayments: "KD 2,340.000",
      pendingChange: "-3.1%",
    };
  };

  const segmentStats = getSegmentStats();

  const paymentStats = [
    {
      title: "Total Received",
      value: segmentStats.totalReceived,
      change: segmentStats.totalReceivedChange,
      trend: "up" as const,
      icon: DollarSign,
    },
    {
      title: "Pending Payments",
      value: segmentStats.pendingPayments,
      change: segmentStats.pendingChange,
      trend: "down" as const,
      icon: TrendingDown,
    },
  ];

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Paid":
      case "Completed":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">{status}</Badge>;
      case "Pending":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">{status}</Badge>;
      case "Overdue":
      case "Failed":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">{status}</Badge>;
      case "Processing":
        return <Badge className="bg-blue-500/10 text-blue-700 hover:bg-blue-500/20">{status}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case "Credit Card":
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
      case "KNET":
        return <Smartphone className="h-4 w-4 text-muted-foreground" />;
      case "Cash":
        return <Banknote className="h-4 w-4 text-muted-foreground" />;
      case "Bank Transfer":
        return <DollarSign className="h-4 w-4 text-muted-foreground" />;
      default:
        return <CreditCard className="h-4 w-4 text-muted-foreground" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Finance</h1>
        
        {/* Segment Toggle */}
        <div className="flex items-center gap-2 p-1 bg-muted rounded-lg">
          <Button
            variant={segmentFilter === "all" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSegmentFilter("all")}
            className="gap-2"
          >
            All
          </Button>
          <Button
            variant={segmentFilter === "b2b" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSegmentFilter("b2b")}
            className="gap-2"
          >
            <Building2 className="h-4 w-4" />
            B2B
          </Button>
          <Button
            variant={segmentFilter === "customer" ? "default" : "ghost"}
            size="sm"
            onClick={() => setSegmentFilter("customer")}
            className="gap-2"
          >
            <Users className="h-4 w-4" />
            Customers
          </Button>
        </div>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search invoices..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select value={invoiceStatusFilter} onValueChange={setInvoiceStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Invoice</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInvoices
                    .filter((invoice) => invoiceStatusFilter === "all" || invoice.status === invoiceStatusFilter)
                    .map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="payments" className="space-y-6">
          {/* Payment Stats */}
          <div className="grid gap-4 md:grid-cols-2">
            {paymentStats.map((stat) => (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    {stat.trend === "up" ? (
                      <ArrowUpRight className="mr-1 h-3 w-3 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="mr-1 h-3 w-3 text-red-500" />
                    )}
                    <span className={stat.trend === "up" ? "text-emerald-500" : "text-red-500"}>
                      {stat.change}
                    </span>
                    <span className="ml-1">from last month</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search payments..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select value={paymentStatusFilter} onValueChange={setPaymentStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Processing">Processing</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Payments Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Transaction ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date & Time</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPayments
                    .filter((payment) => paymentStatusFilter === "all" || payment.status === paymentStatusFilter)
                    .map((payment) => (
                    <TableRow key={payment.id}>
                      <TableCell className="font-medium">{payment.id}</TableCell>
                      <TableCell>{payment.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{payment.orderId}</TableCell>
                      <TableCell className="font-medium">{payment.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          {getPaymentMethodIcon(payment.method)}
                          <span>{payment.method}</span>
                          {payment.cardLast4 && (
                            <span className="text-muted-foreground">•••• {payment.cardLast4}</span>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(payment.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{payment.date}</div>
                          <div className="text-xs text-muted-foreground">{payment.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="sm">
                            View
                          </Button>
                          <Button variant="outline" size="sm">
                            <Download className="h-4 w-4" />
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

        <TabsContent value="refunds" className="space-y-6">
          {/* Refund Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Refunded</CardTitle>
                <RotateCcw className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">KD 1,245.750</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowDownRight className="mr-1 h-3 w-3 text-emerald-500" />
                  <span className="text-emerald-500">-8.3%</span>
                  <span className="ml-1">from last month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
                <Clock className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <ArrowUpRight className="mr-1 h-3 w-3 text-yellow-500" />
                  <span className="text-yellow-500">+2</span>
                  <span className="ml-1">new today</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Approved</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">23</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-muted-foreground">This month</span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Rejected</CardTitle>
                <XCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">3</div>
                <div className="flex items-center text-xs text-muted-foreground">
                  <span className="text-muted-foreground">This month</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input placeholder="Search refunds..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Select value={refundStatusFilter} onValueChange={setRefundStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <Filter className="mr-2 h-4 w-4" />
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                  <SelectItem value="Approved">Approved</SelectItem>
                  <SelectItem value="Rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" />
                Export
              </Button>
            </div>
          </div>

          {/* Refunds Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Refund ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Order</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Reason</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Requested</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredRefunds
                    .filter((refund) => refundStatusFilter === "all" || refund.status === refundStatusFilter)
                    .map((refund) => (
                    <TableRow key={refund.id}>
                      <TableCell className="font-medium">{refund.id}</TableCell>
                      <TableCell>{refund.customer}</TableCell>
                      <TableCell className="text-muted-foreground">{refund.orderId}</TableCell>
                      <TableCell className="font-medium">{refund.amount}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <refund.reasonIcon className={`h-4 w-4 ${refund.reasonIconColor}`} />
                          <span>{refund.reason}</span>
                        </div>
                      </TableCell>
                      <TableCell>{getStatusBadge(refund.status)}</TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="text-sm">{refund.date}</div>
                          <div className="text-xs text-muted-foreground">{refund.time}</div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="outline" size="icon" className="h-8 w-8">
                            <Download className="h-4 w-4" />
                          </Button>
                          {refund.status === "Pending" && (
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-8 w-8">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem className="text-emerald-600" onClick={() => toast.success(`Refund ${refund.id} approved`)}>
                                  <CheckCircle className="mr-2 h-4 w-4" />
                                  Approve
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => toast.success(`Refund ${refund.id} rejected`)}>
                                  <XCircle className="mr-2 h-4 w-4" />
                                  Reject
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
