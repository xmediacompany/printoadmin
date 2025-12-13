import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Plus,
  Edit,
  Eye,
  Send,
  Clock,
  CheckCircle2,
  XCircle,
  Building2,
  Calendar,
  DollarSign,
  ArrowUpRight,
  Copy,
  Download,
  MoreHorizontal,
  Sparkles,
  TrendingUp,
  AlertCircle,
  Mail,
  Phone,
  Trash2
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Quote {
  id: string;
  company: string;
  contactName: string;
  contactEmail: string;
  product: string;
  quantity: string;
  amount: string;
  status: "draft" | "sent" | "viewed" | "accepted" | "rejected" | "expired";
  createdDate: string;
  expiryDate: string;
  notes: string;
}

const initialQuotes: Quote[] = [
  {
    id: "QT-001",
    company: "Tech Solutions Inc.",
    contactName: "Ahmed Al-Rashid",
    contactEmail: "ahmed@techsolutions.com",
    product: "Business Cards (Premium)",
    quantity: "50,000 units",
    amount: "8,500 KD",
    status: "sent",
    createdDate: "2024-01-15",
    expiryDate: "2024-02-15",
    notes: "Urgent order for corporate event",
  },
  {
    id: "QT-002",
    company: "Global Marketing Group",
    contactName: "Sara Al-Fahad",
    contactEmail: "sara@globalmarketing.com",
    product: "Marketing Brochures",
    quantity: "25,000 units",
    amount: "12,300 KD",
    status: "viewed",
    createdDate: "2024-01-14",
    expiryDate: "2024-02-14",
    notes: "Full color, glossy finish",
  },
  {
    id: "QT-003",
    company: "Design Studio Pro",
    contactName: "Khalid Al-Mutairi",
    contactEmail: "khalid@designstudiopro.com",
    product: "Custom Stationery Set",
    quantity: "10,000 units",
    amount: "4,200 KD",
    status: "accepted",
    createdDate: "2024-01-10",
    expiryDate: "2024-02-10",
    notes: "Includes letterheads, envelopes, and folders",
  },
  {
    id: "QT-004",
    company: "Finance Hub",
    contactName: "Noura Al-Salem",
    contactEmail: "noura@financehub.com",
    product: "Annual Report Printing",
    quantity: "5,000 units",
    amount: "15,800 KD",
    status: "draft",
    createdDate: "2024-01-18",
    expiryDate: "2024-02-18",
    notes: "Premium binding, gold foil cover",
  },
  {
    id: "QT-005",
    company: "Retail Plus",
    contactName: "Mohammed Al-Hajri",
    contactEmail: "mohammed@retailplus.com",
    product: "Promotional Flyers",
    quantity: "100,000 units",
    amount: "6,500 KD",
    status: "expired",
    createdDate: "2023-12-01",
    expiryDate: "2024-01-01",
    notes: "Seasonal campaign materials",
  },
];

const products = [
  "Business Cards (Standard)",
  "Business Cards (Premium)",
  "Marketing Brochures",
  "Custom Stationery Set",
  "Annual Report Printing",
  "Promotional Flyers",
  "Corporate Letterheads",
  "Custom T-Shirts",
  "Ceramic Mugs",
  "Tote Bags",
];

const companies = [
  "Tech Solutions Inc.",
  "Global Marketing Group",
  "Design Studio Pro",
  "Finance Hub",
  "Retail Plus",
];

export function QuoteManagement() {
  const [quotes, setQuotes] = useState<Quote[]>(initialQuotes);
  const [createQuoteOpen, setCreateQuoteOpen] = useState(false);
  const [viewQuoteOpen, setViewQuoteOpen] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState<Quote | null>(null);
  const [filterStatus, setFilterStatus] = useState("all");

  const [newQuote, setNewQuote] = useState({
    company: "",
    contactName: "",
    contactEmail: "",
    product: "",
    quantity: "",
    amount: "",
    expiryDays: "30",
    notes: "",
  });

  const getStatusConfig = (status: Quote["status"]) => {
    switch (status) {
      case "draft":
        return { 
          label: "Draft", 
          icon: Edit, 
          color: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300",
          iconColor: "text-slate-500"
        };
      case "sent":
        return { 
          label: "Sent", 
          icon: Send, 
          color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
          iconColor: "text-blue-500"
        };
      case "viewed":
        return { 
          label: "Viewed", 
          icon: Eye, 
          color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400",
          iconColor: "text-purple-500"
        };
      case "accepted":
        return { 
          label: "Accepted", 
          icon: CheckCircle2, 
          color: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400",
          iconColor: "text-emerald-500"
        };
      case "rejected":
        return { 
          label: "Rejected", 
          icon: XCircle, 
          color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
          iconColor: "text-red-500"
        };
      case "expired":
        return { 
          label: "Expired", 
          icon: Clock, 
          color: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
          iconColor: "text-amber-500"
        };
    }
  };

  const stats = {
    total: quotes.length,
    pending: quotes.filter(q => ["sent", "viewed"].includes(q.status)).length,
    accepted: quotes.filter(q => q.status === "accepted").length,
    conversionRate: Math.round((quotes.filter(q => q.status === "accepted").length / quotes.length) * 100),
    totalValue: quotes.reduce((sum, q) => sum + parseFloat(q.amount.replace(/[^0-9.]/g, '')), 0),
    acceptedValue: quotes.filter(q => q.status === "accepted").reduce((sum, q) => sum + parseFloat(q.amount.replace(/[^0-9.]/g, '')), 0),
  };

  const filteredQuotes = quotes.filter(q => filterStatus === "all" || q.status === filterStatus);

  const handleCreateQuote = () => {
    if (!newQuote.company || !newQuote.product || !newQuote.amount) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const quote: Quote = {
      id: `QT-${String(quotes.length + 1).padStart(3, "0")}`,
      company: newQuote.company,
      contactName: newQuote.contactName,
      contactEmail: newQuote.contactEmail,
      product: newQuote.product,
      quantity: newQuote.quantity,
      amount: newQuote.amount,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + parseInt(newQuote.expiryDays) * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      notes: newQuote.notes,
    };

    setQuotes([quote, ...quotes]);
    setCreateQuoteOpen(false);
    setNewQuote({
      company: "",
      contactName: "",
      contactEmail: "",
      product: "",
      quantity: "",
      amount: "",
      expiryDays: "30",
      notes: "",
    });
    toast({
      title: "Quote Created",
      description: `Quote ${quote.id} has been created successfully.`,
    });
  };

  const handleSendQuote = (quote: Quote) => {
    setQuotes(quotes.map(q => q.id === quote.id ? { ...q, status: "sent" as const } : q));
    toast({
      title: "Quote Sent",
      description: `Quote ${quote.id} has been sent to ${quote.contactEmail}.`,
    });
  };

  const handleDeleteQuote = (id: string) => {
    setQuotes(quotes.filter(q => q.id !== id));
    toast({
      title: "Quote Deleted",
      description: "The quote has been removed.",
    });
  };

  const handleDuplicateQuote = (quote: Quote) => {
    const newQuote: Quote = {
      ...quote,
      id: `QT-${String(quotes.length + 1).padStart(3, "0")}`,
      status: "draft",
      createdDate: new Date().toISOString().split("T")[0],
      expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    };
    setQuotes([newQuote, ...quotes]);
    toast({
      title: "Quote Duplicated",
      description: `Quote ${newQuote.id} has been created as a copy.`,
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-primary" />
                Quote Management
              </CardTitle>
              <CardDescription>Create, track, and manage quotes for corporate clients</CardDescription>
            </div>
            <Button onClick={() => setCreateQuoteOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Create Quote
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 p-4 border border-primary/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Quotes</p>
                  <p className="text-2xl font-bold">{stats.total}</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-amber-500/10 to-amber-500/5 p-4 border border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center">
                  <Clock className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pending</p>
                  <p className="text-2xl font-bold">{stats.pending}</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 p-4 border border-emerald-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Accepted</p>
                  <p className="text-2xl font-bold">{stats.accepted}</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-purple-500/10 to-purple-500/5 p-4 border border-purple-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-purple-500/10 flex items-center justify-center">
                  <TrendingUp className="h-5 w-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Conversion</p>
                  <p className="text-2xl font-bold">{stats.conversionRate}%</p>
                </div>
              </div>
            </div>
          </div>

          {/* Value Summary */}
          <div className="p-4 rounded-xl bg-muted/30 border">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium text-muted-foreground">Quote Value Overview</span>
              <Badge variant="outline" className="text-primary">
                <DollarSign className="h-3 w-3 mr-1" />
                {stats.acceptedValue.toLocaleString()} KD accepted
              </Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Progress value={(stats.acceptedValue / stats.totalValue) * 100} className="h-2" />
              </div>
              <span className="text-sm text-muted-foreground">
                of {stats.totalValue.toLocaleString()} KD total
              </span>
            </div>
          </div>

          {/* Filter */}
          <div className="flex items-center gap-3">
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Quotes</SelectItem>
                <SelectItem value="draft">Drafts</SelectItem>
                <SelectItem value="sent">Sent</SelectItem>
                <SelectItem value="viewed">Viewed</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="expired">Expired</SelectItem>
              </SelectContent>
            </Select>
            <span className="text-sm text-muted-foreground">
              {filteredQuotes.length} quote{filteredQuotes.length !== 1 ? "s" : ""}
            </span>
          </div>

          {/* Quotes List */}
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {filteredQuotes.length === 0 ? (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="h-12 w-12 mx-auto mb-3 opacity-50" />
                  <p>No quotes found</p>
                </div>
              ) : (
                filteredQuotes.map((quote) => {
                  const statusConfig = getStatusConfig(quote.status);
                  const StatusIcon = statusConfig.icon;
                  return (
                    <div 
                      key={quote.id}
                      className="group p-4 rounded-xl border bg-card hover:border-primary/30 hover:shadow-md transition-all duration-200"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex items-start gap-4 flex-1">
                          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                            <FileText className="h-6 w-6 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-semibold">{quote.id}</span>
                              <Badge className={statusConfig.color}>
                                <StatusIcon className={`h-3 w-3 mr-1 ${statusConfig.iconColor}`} />
                                {statusConfig.label}
                              </Badge>
                            </div>
                            <p className="font-medium text-sm">{quote.product}</p>
                            <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Building2 className="h-3 w-3" />
                                {quote.company}
                              </span>
                              <span>•</span>
                              <span>{quote.quantity}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                Created: {quote.createdDate}
                              </span>
                              <span className="flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                Expires: {quote.expiryDate}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end gap-2">
                          <span className="text-lg font-bold text-primary">{quote.amount}</span>
                          <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => {
                                setSelectedQuote(quote);
                                setViewQuoteOpen(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            {quote.status === "draft" && (
                              <Button 
                                variant="ghost" 
                                size="sm"
                                onClick={() => handleSendQuote(quote)}
                              >
                                <Send className="h-4 w-4" />
                              </Button>
                            )}
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDuplicateQuote(quote)}
                            >
                              <Copy className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => handleDeleteQuote(quote.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Create Quote Dialog */}
      <Dialog open={createQuoteOpen} onOpenChange={setCreateQuoteOpen}>
        <DialogContent className="sm:max-w-[550px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Create New Quote
            </DialogTitle>
            <DialogDescription>
              Generate a professional quote for a corporate client
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div className="grid gap-2">
              <Label>Company *</Label>
              <Select value={newQuote.company} onValueChange={(value) => setNewQuote({ ...newQuote, company: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select company" />
                </SelectTrigger>
                <SelectContent>
                  {companies.map((company) => (
                    <SelectItem key={company} value={company}>{company}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Contact Name</Label>
                <Input
                  placeholder="Contact person"
                  value={newQuote.contactName}
                  onChange={(e) => setNewQuote({ ...newQuote, contactName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Contact Email</Label>
                <Input
                  type="email"
                  placeholder="email@company.com"
                  value={newQuote.contactEmail}
                  onChange={(e) => setNewQuote({ ...newQuote, contactEmail: e.target.value })}
                />
              </div>
            </div>

            <Separator />

            <div className="grid gap-2">
              <Label>Product *</Label>
              <Select value={newQuote.product} onValueChange={(value) => setNewQuote({ ...newQuote, product: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product} value={product}>{product}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>Quantity</Label>
                <Input
                  placeholder="e.g., 10,000 units"
                  value={newQuote.quantity}
                  onChange={(e) => setNewQuote({ ...newQuote, quantity: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label>Amount (KD) *</Label>
                <Input
                  placeholder="e.g., 5,000 KD"
                  value={newQuote.amount}
                  onChange={(e) => setNewQuote({ ...newQuote, amount: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label>Valid For</Label>
              <Select value={newQuote.expiryDays} onValueChange={(value) => setNewQuote({ ...newQuote, expiryDays: value })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 days</SelectItem>
                  <SelectItem value="14">14 days</SelectItem>
                  <SelectItem value="30">30 days</SelectItem>
                  <SelectItem value="60">60 days</SelectItem>
                  <SelectItem value="90">90 days</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Notes</Label>
              <Textarea
                placeholder="Additional details or special requirements..."
                value={newQuote.notes}
                onChange={(e) => setNewQuote({ ...newQuote, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setCreateQuoteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateQuote}>
              <FileText className="h-4 w-4 mr-2" />
              Create Quote
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Quote Dialog */}
      <Dialog open={viewQuoteOpen} onOpenChange={setViewQuoteOpen}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedQuote && (
            <>
              <DialogHeader>
                <div className="flex items-center justify-between">
                  <DialogTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    {selectedQuote.id}
                  </DialogTitle>
                  <Badge className={getStatusConfig(selectedQuote.status).color}>
                    {getStatusConfig(selectedQuote.status).label}
                  </Badge>
                </div>
              </DialogHeader>

              <div className="space-y-4 py-4">
                {/* Amount Card */}
                <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20">
                  <p className="text-sm text-muted-foreground mb-1">Quote Amount</p>
                  <p className="text-3xl font-bold text-primary">{selectedQuote.amount}</p>
                </div>

                {/* Product Info */}
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center shrink-0">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <p className="font-medium">{selectedQuote.product}</p>
                      <p className="text-sm text-muted-foreground">{selectedQuote.quantity}</p>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Company Info */}
                <div className="space-y-3">
                  <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Client Details</h4>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <Building2 className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium">{selectedQuote.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="h-4 w-4" />
                      {selectedQuote.contactEmail}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Dates */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Created</p>
                    <p className="font-medium text-sm">{selectedQuote.createdDate}</p>
                  </div>
                  <div className="p-3 rounded-lg bg-muted/30">
                    <p className="text-xs text-muted-foreground mb-1">Expires</p>
                    <p className="font-medium text-sm">{selectedQuote.expiryDate}</p>
                  </div>
                </div>

                {selectedQuote.notes && (
                  <>
                    <Separator />
                    <div>
                      <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-2">Notes</h4>
                      <p className="text-sm">{selectedQuote.notes}</p>
                    </div>
                  </>
                )}
              </div>

              <DialogFooter className="gap-2">
                <Button variant="outline">
                  <Download className="h-4 w-4 mr-2" />
                  Download PDF
                </Button>
                {selectedQuote.status === "draft" && (
                  <Button onClick={() => {
                    handleSendQuote(selectedQuote);
                    setViewQuoteOpen(false);
                  }}>
                    <Send className="h-4 w-4 mr-2" />
                    Send Quote
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
