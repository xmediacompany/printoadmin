import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Search, Filter, Download, CreditCard, Banknote, Smartphone, TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function Finance() {
  const invoices = [
    {
      id: "INV-001",
      customer: "Fatima Al-Zahra",
      amount: "KD 45.500",
      status: "Paid",
      date: "2024-01-15",
      dueDate: "2024-01-30",
    },
    {
      id: "INV-002",
      customer: "Omar Hassan",
      amount: "KD 32.750",
      status: "Pending",
      date: "2024-01-14",
      dueDate: "2024-01-29",
    },
    {
      id: "INV-003",
      customer: "Noura Al-Sabah",
      amount: "KD 67.250",
      status: "Overdue",
      date: "2024-01-10",
      dueDate: "2024-01-25",
    },
    {
      id: "INV-004",
      customer: "Hasan Al-Rashid",
      amount: "KD 28.500",
      status: "Paid",
      date: "2024-01-12",
      dueDate: "2024-01-27",
    },
    {
      id: "INV-005",
      customer: "Reem Al-Mutawa",
      amount: "KD 54.000",
      status: "Pending",
      date: "2024-01-13",
      dueDate: "2024-01-28",
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
    },
    {
      id: "PAY-002",
      customer: "Hasan Al-Rashid",
      amount: "KD 28.500",
      method: "KNET",
      cardLast4: "8821",
      status: "Completed",
      date: "2024-01-15",
      time: "12:18:43",
      orderId: "ORD-1235",
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
    },
    {
      id: "PAY-004",
      customer: "Layla Al-Ahmad",
      amount: "KD 89.250",
      method: "Credit Card",
      cardLast4: "7654",
      status: "Completed",
      date: "2024-01-14",
      time: "10:22:17",
      orderId: "ORD-1237",
    },
    {
      id: "PAY-005",
      customer: "Mohammed Al-Sabah",
      amount: "KD 156.000",
      method: "Bank Transfer",
      cardLast4: null,
      status: "Processing",
      date: "2024-01-14",
      time: "09:15:33",
      orderId: "ORD-1238",
    },
    {
      id: "PAY-006",
      customer: "Sara Al-Mutairi",
      amount: "KD 42.750",
      method: "KNET",
      cardLast4: "3345",
      status: "Failed",
      date: "2024-01-13",
      time: "18:55:12",
      orderId: "ORD-1239",
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
    },
  ];

  const paymentStats = [
    {
      title: "Total Received",
      value: "KD 12,450.500",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
    },
    {
      title: "Today's Payments",
      value: "KD 1,245.750",
      change: "+8.2%",
      trend: "up",
      icon: TrendingUp,
    },
    {
      title: "Pending Payments",
      value: "KD 2,340.000",
      change: "-3.1%",
      trend: "down",
      icon: TrendingDown,
    },
    {
      title: "Failed Transactions",
      value: "3",
      change: "-25%",
      trend: "down",
      icon: CreditCard,
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
      <div>
        <h1 className="text-3xl font-bold">Finance</h1>
      </div>

      <Tabs defaultValue="invoices" className="space-y-6">
        <TabsList>
          <TabsTrigger value="invoices">Invoices</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="refunds">Refunds</TabsTrigger>
        </TabsList>

        <TabsContent value="invoices">
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
                  {invoices.map((invoice) => (
                    <TableRow key={invoice.id}>
                      <TableCell className="font-medium">{invoice.id}</TableCell>
                      <TableCell>{invoice.customer}</TableCell>
                      <TableCell className="font-medium">{invoice.amount}</TableCell>
                      <TableCell>{getStatusBadge(invoice.status)}</TableCell>
                      <TableCell>{invoice.date}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
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

        <TabsContent value="payments" className="space-y-6">
          {/* Payment Stats */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
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
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                Filters
              </Button>
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
                  {payments.map((payment) => (
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
                        <Button variant="outline" size="sm">
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

        <TabsContent value="refunds">
          <Card>
            <CardContent className="p-6">
              <p className="text-muted-foreground">Refund requests and processing will appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
