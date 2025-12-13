import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Package, 
  Building2,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  FileCheck,
  Truck,
  CreditCard,
  MapPin,
  Phone,
  Mail,
  Printer,
  FileText,
  ArrowRight
} from "lucide-react";

interface BulkOrder {
  id: string;
  product: string;
  quantity: string;
  company: string;
  amount: string;
  status: string;
  date: string;
  deliveryDate: string;
}

interface ViewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  order: BulkOrder | null;
}

const orderTimeline = [
  { step: "Order Placed", completed: true },
  { step: "Quote Approved", completed: true },
  { step: "In Production", completed: true },
  { step: "Quality Check", completed: false },
  { step: "Ready for Delivery", completed: false },
  { step: "Delivered", completed: false },
];

export function ViewOrderDialog({ open, onOpenChange, order }: ViewOrderDialogProps) {
  if (!order) return null;

  const getStatusProgress = (status: string) => {
    switch (status) {
      case "Quote Sent": return 15;
      case "Pending Approval": return 30;
      case "In Production": return 55;
      case "Completed": return 100;
      default: return 10;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Production": return "bg-blue-500";
      case "Pending Approval": return "bg-amber-500";
      case "Completed": return "bg-green-500";
      case "Quote Sent": return "bg-purple-500";
      default: return "bg-muted";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "In Production": return <Package className="h-5 w-5" />;
      case "Pending Approval": return <Clock className="h-5 w-5" />;
      case "Completed": return <CheckCircle2 className="h-5 w-5" />;
      case "Quote Sent": return <FileCheck className="h-5 w-5" />;
      default: return <AlertCircle className="h-5 w-5" />;
    }
  };

  const getCompletedSteps = (status: string) => {
    switch (status) {
      case "Quote Sent": return 1;
      case "Pending Approval": return 2;
      case "In Production": return 3;
      case "Completed": return 6;
      default: return 1;
    }
  };

  const completedSteps = getCompletedSteps(order.status);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header with gradient */}
        <div className="relative bg-gradient-to-br from-primary/10 via-primary/5 to-transparent p-6 pb-8">
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div>
                <DialogTitle className="text-2xl font-bold">{order.id}</DialogTitle>
                <p className="text-muted-foreground mt-1">Bulk Order Details</p>
              </div>
              <Badge 
                className={`${getStatusColor(order.status)} text-white px-3 py-1.5 text-sm flex items-center gap-1.5`}
              >
                {getStatusIcon(order.status)}
                {order.status}
              </Badge>
            </div>
          </DialogHeader>

          {/* Progress indicator */}
          <div className="mt-6">
            <div className="flex justify-between text-xs text-muted-foreground mb-2">
              <span>Order Progress</span>
              <span>{getStatusProgress(order.status)}%</span>
            </div>
            <Progress value={getStatusProgress(order.status)} className="h-2" />
          </div>
        </div>

        <div className="p-6 pt-0 -mt-2 space-y-6">
          {/* Product Card */}
          <div className="bg-muted/30 rounded-xl p-5 border">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                <Printer className="h-8 w-8 text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold">{order.product}</h3>
                <p className="text-muted-foreground text-sm mt-1">{order.quantity}</p>
                <div className="flex items-center gap-4 mt-3">
                  <span className="text-2xl font-bold text-primary">{order.amount}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div>
            <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-4">
              Order Timeline
            </h4>
            <div className="relative">
              {orderTimeline.map((item, index) => {
                const isCompleted = index < completedSteps;
                const isCurrent = index === completedSteps - 1;
                return (
                  <div key={item.step} className="flex items-start gap-3 pb-4 last:pb-0">
                    <div className="relative">
                      <div 
                        className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                          isCompleted 
                            ? "bg-primary border-primary text-primary-foreground" 
                            : "border-muted-foreground/30 text-muted-foreground bg-background"
                        } ${isCurrent ? "ring-4 ring-primary/20" : ""}`}
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="h-4 w-4" />
                        ) : (
                          <span className="text-xs font-medium">{index + 1}</span>
                        )}
                      </div>
                      {index < orderTimeline.length - 1 && (
                        <div 
                          className={`absolute left-1/2 top-8 w-0.5 h-6 -translate-x-1/2 ${
                            isCompleted ? "bg-primary" : "bg-muted"
                          }`} 
                        />
                      )}
                    </div>
                    <div className="pt-1">
                      <p className={`text-sm font-medium ${isCompleted ? "text-foreground" : "text-muted-foreground"}`}>
                        {item.step}
                      </p>
                      {isCurrent && (
                        <p className="text-xs text-primary mt-0.5">Current status</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <Separator />

          {/* Company & Dates */}
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Corporate Account
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">{order.company}</p>
                    <p className="text-xs text-muted-foreground">Corporate Client</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pl-1">
                  <Mail className="h-3.5 w-3.5" />
                  <span>orders@{order.company.toLowerCase().replace(/\s+/g, '')}.com</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground pl-1">
                  <Phone className="h-3.5 w-3.5" />
                  <span>+965 1234 5678</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">
                Important Dates
              </h4>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-xs text-muted-foreground">Order Date</p>
                    <p className="font-medium">{order.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-primary/5 rounded-lg border border-primary/20">
                  <Truck className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-xs text-muted-foreground">Expected Delivery</p>
                    <p className="font-medium text-primary">{order.deliveryDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          {/* Quick Actions */}
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <FileText className="h-4 w-4 mr-2" />
              Download Invoice
            </Button>
            <Button variant="outline" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              Track Shipment
            </Button>
            <Button className="flex-1">
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Details
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
