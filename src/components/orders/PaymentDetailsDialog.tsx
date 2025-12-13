import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard,
  CheckCircle2,
  Clock,
  Receipt,
  Download,
  Banknote,
  Building,
  Calendar,
  Send,
  FileText,
  Wallet,
  Mail,
  Phone
} from "lucide-react";
import { toast } from "sonner";

interface PaymentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  orderId: string;
  amount: string;
  company: string;
}

export function PaymentDetailsDialog({ 
  open, 
  onOpenChange, 
  orderId, 
  amount, 
  company 
}: PaymentDetailsDialogProps) {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  // Parse amount for calculations
  const numericAmount = parseFloat(amount.replace(/[^0-9.]/g, ''));
  const paidAmount = (numericAmount * 0.5).toFixed(2);
  const remainingAmount = (numericAmount * 0.5).toFixed(2);

  const handleSendPaymentLink = () => {
    if (!email && !mobile) {
      toast.error("Please enter an email or mobile number");
      return;
    }
    toast.success("Payment link sent successfully!");
    setEmail("");
    setMobile("");
  };

  const paymentHistory = [
    { 
      id: "PAY-001", 
      date: "2024-01-15", 
      amount: `${paidAmount} KD`, 
      method: "Bank Transfer",
      status: "Completed",
      reference: "TRX-78234"
    },
  ];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-br from-emerald-500/10 via-emerald-500/5 to-transparent p-6">
          <DialogHeader>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center">
                <Wallet className="h-6 w-6 text-emerald-600" />
              </div>
              <div>
                <DialogTitle className="text-xl font-bold">Payment Details</DialogTitle>
                <p className="text-sm text-muted-foreground">Order {orderId}</p>
              </div>
            </div>
          </DialogHeader>
        </div>

        <div className="p-6 pt-2 space-y-6">
          {/* Payment Status Card */}
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary via-primary to-primary/80 p-5 text-primary-foreground">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-primary-foreground/80">Total Amount</span>
                <Badge className="bg-white/20 text-white hover:bg-white/30 border-0">
                  <Clock className="h-3 w-3 mr-1" />
                  Partial Payment
                </Badge>
              </div>
              <div className="text-4xl font-bold tracking-tight">{amount}</div>
              <div className="mt-4 flex items-center gap-6 text-sm">
                <div>
                  <span className="text-primary-foreground/70">Paid</span>
                  <p className="font-semibold">{paidAmount} KD</p>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div>
                  <span className="text-primary-foreground/70">Remaining</span>
                  <p className="font-semibold">{remainingAmount} KD</p>
                </div>
              </div>
            </div>
          </div>

          {/* Invoice Breakdown */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Receipt className="h-4 w-4" />
              Invoice Breakdown
            </h4>
            <div className="bg-muted/30 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">{amount}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="font-bold text-primary">{amount}</span>
              </div>
            </div>
          </div>

          {/* Payment Progress */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
              Payment Progress
            </h4>
            <div className="relative h-3 bg-muted rounded-full overflow-hidden">
              <div 
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-500"
                style={{ width: "50%" }}
              />
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>50% Paid</span>
              <span>50% Remaining</span>
            </div>
          </div>

          {/* Payment History */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Banknote className="h-4 w-4" />
              Payment History
            </h4>
            <div className="space-y-2">
              {paymentHistory.map((payment) => (
                <div 
                  key={payment.id}
                  className="flex items-center justify-between p-4 bg-muted/30 rounded-xl border hover:border-primary/30 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                    </div>
                    <div>
                      <p className="font-medium text-sm">{payment.amount}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Calendar className="h-3 w-3" />
                        {payment.date}
                        <span className="text-muted-foreground/50">•</span>
                        <Building className="h-3 w-3" />
                        {payment.method}
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-200 bg-emerald-50">
                    {payment.status}
                  </Badge>
                </div>
              ))}
            </div>
          </div>

          {/* Pending Payment */}
          <div className="p-4 bg-amber-50 dark:bg-amber-500/10 border border-amber-200 dark:border-amber-500/20 rounded-xl">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center shrink-0">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-amber-800 dark:text-amber-400">Pending Payment</p>
                <p className="text-sm text-amber-700/80 dark:text-amber-400/70 mt-0.5">
                  {remainingAmount} KD due before delivery
                </p>
                <p className="text-xs text-amber-600/70 dark:text-amber-500/60 mt-2">
                  Due Date: 2024-01-25
                </p>
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Payment Method
            </h4>
            <div className="flex items-center gap-4 p-4 bg-muted/30 rounded-xl border">
              <div className="w-14 h-10 rounded-lg bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center">
                <Building className="h-5 w-5 text-white" />
              </div>
              <div className="flex-1">
                <p className="font-medium">Bank Transfer</p>
                <p className="text-xs text-muted-foreground">Kuwait National Bank • ****4582</p>
              </div>
              <Badge variant="secondary">Default</Badge>
            </div>
          </div>

          <Separator />

          {/* Send Payment Link */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide flex items-center gap-2">
              <Send className="h-4 w-4" />
              Send Payment Link
            </h4>
            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center gap-2 text-sm">
                  <Mail className="h-3.5 w-3.5" />
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="customer@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="mobile" className="flex items-center gap-2 text-sm">
                  <Phone className="h-3.5 w-3.5" />
                  Mobile Number
                </Label>
                <Input
                  id="mobile"
                  type="tel"
                  placeholder="+965 1234 5678"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-2 gap-3">
            <Button variant="outline" className="h-12">
              <FileText className="h-4 w-4 mr-2" />
              View Invoice
            </Button>
            <Button variant="outline" className="h-12">
              <Download className="h-4 w-4 mr-2" />
              Download Receipt
            </Button>
          </div>
          <Button 
            className="w-full h-12 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
            onClick={handleSendPaymentLink}
          >
            <Send className="h-4 w-4 mr-2" />
            Send Payment Link
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
