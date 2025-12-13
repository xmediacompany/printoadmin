import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { 
  User, 
  Package, 
  FileText, 
  CheckCircle2, 
  Search, 
  CalendarIcon,
  Phone,
  Mail,
  Building2,
  Printer,
  Shirt,
  Coffee,
  Upload,
  Plus,
  Minus,
  ArrowRight,
  ArrowLeft
} from "lucide-react";
import { toast } from "sonner";

interface OrderData {
  customer?: string;
  product?: string;
  quantity?: number;
  deadline?: Date;
}

interface NewOrderDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onOrderCreated: (order: any) => void;
  editMode?: boolean;
  orderData?: OrderData;
}

const customers = [
  { id: "1", name: "Acme Corp", email: "orders@acme.com", phone: "+965 1234 5678", type: "B2B" },
  { id: "2", name: "TechStart Inc", email: "hello@techstart.com", phone: "+965 2345 6789", type: "B2B" },
  { id: "3", name: "Design Studio", email: "info@designstudio.kw", phone: "+965 3456 7890", type: "B2B" },
  { id: "4", name: "Ahmed Al-Rashid", email: "ahmed@email.com", phone: "+965 5555 1234", type: "Individual" },
  { id: "5", name: "Marketing Pro", email: "contact@marketingpro.com", phone: "+965 6666 2345", type: "B2B" },
];

const productCategories = [
  { 
    id: "printing", 
    name: "Printing Services", 
    icon: Printer,
    products: [
      { id: "bc", name: "Business Cards", basePrice: 15, unit: "per 100" },
      { id: "flyers", name: "Flyers", basePrice: 25, unit: "per 100" },
      { id: "brochures", name: "Brochures", basePrice: 45, unit: "per 50" },
      { id: "posters", name: "Posters", basePrice: 8, unit: "each" },
      { id: "banners", name: "Banners", basePrice: 35, unit: "per sqm" },
      { id: "stickers", name: "Stickers", basePrice: 20, unit: "per sheet" },
    ]
  },
  { 
    id: "apparel", 
    name: "Custom Apparel", 
    icon: Shirt,
    products: [
      { id: "tshirt", name: "Custom T-Shirts", basePrice: 8, unit: "each" },
      { id: "hoodie", name: "Hoodies", basePrice: 18, unit: "each" },
      { id: "cap", name: "Caps", basePrice: 6, unit: "each" },
      { id: "totebag", name: "Tote Bags", basePrice: 5, unit: "each" },
    ]
  },
  { 
    id: "merchandise", 
    name: "Merchandise", 
    icon: Coffee,
    products: [
      { id: "mug", name: "Ceramic Mugs", basePrice: 4, unit: "each" },
      { id: "bottle", name: "Thermo Bottles", basePrice: 12, unit: "each" },
      { id: "notebook", name: "Notebooks", basePrice: 6, unit: "each" },
      { id: "diary", name: "Diary", basePrice: 8, unit: "each" },
    ]
  },
];

const sizes = ["A5", "A4", "A3", "A2", "A1", "Custom"];
const paperTypes = ["Matte", "Glossy", "Silk", "Recycled", "Premium"];
const finishings = ["None", "Lamination", "UV Coating", "Embossing", "Foil Stamping"];
const categories = [
  "Custom T-Shirts",
  "Ceramic Mugs",
  "Tote Bags",
  "Hoodies",
  "Caps",
  "Thermo Bottles",
  "Cups",
  "Stationery",
  "Stickers",
  "Papers",
  "Cards",
  "Notebooks",
  "Diary"
];

const steps = [
  { id: 1, name: "Customer", icon: User },
  { id: 2, name: "Product", icon: Package },
  { id: 3, name: "Details", icon: FileText },
  { id: 4, name: "Confirm", icon: CheckCircle2 },
];

export function NewOrderDialog({ open, onOpenChange, onOrderCreated, editMode = false, orderData }: NewOrderDialogProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerSearch, setCustomerSearch] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(() => {
    if (orderData?.customer) {
      return customers.find(c => c.name === orderData.customer) || null;
    }
    return null;
  });
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any | null>(() => {
    if (orderData?.product) {
      for (const cat of productCategories) {
        const found = cat.products.find(p => p.name === orderData.product);
        if (found) return found;
      }
    }
    return null;
  });
  const [quantity, setQuantity] = useState(orderData?.quantity || 100);
  const [deadline, setDeadline] = useState<Date | undefined>(orderData?.deadline);
  const [priority, setPriority] = useState("Normal");
  const [size, setSize] = useState("");
  const [paperType, setPaperType] = useState("");
  const [finishing, setFinishing] = useState("None");
  const [notes, setNotes] = useState("");
  const [category, setCategory] = useState("");
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const filteredCustomers = customers.filter(c => 
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const calculateTotal = () => {
    if (!selectedProduct) return 0;
    let total = selectedProduct.basePrice * (quantity / 100);
    if (finishing !== "None") total += total * 0.15;
    if (priority === "Urgent") total += total * 0.25;
    if (priority === "High") total += total * 0.1;
    return total.toFixed(2);
  };

  const handleNext = () => {
    if (currentStep === 1 && !selectedCustomer) {
      toast.error("Please select a customer");
      return;
    }
    if (currentStep === 2 && !selectedProduct) {
      toast.error("Please select a product");
      return;
    }
    if (currentStep === 3 && !deadline) {
      toast.error("Please select a deadline");
      return;
    }
    setCurrentStep(prev => Math.min(prev + 1, 4));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = () => {
    const newOrder = {
      id: `ORD-${10235 + Math.floor(Math.random() * 100)}`,
      customer: selectedCustomer?.name,
      product: `${selectedProduct?.name} (${quantity}${selectedProduct?.unit.includes("per") ? "pcs" : ""})`,
      status: "Prepress",
      priority,
      created: "Just now",
      deadline: deadline ? format(deadline, "MMM dd, h:mma") : "",
      value: `KD ${calculateTotal()}`
    };
    
    onOrderCreated(newOrder);
    toast.success("Order created successfully!");
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedCustomer(null);
    setSelectedCategory(null);
    setSelectedProduct(null);
    setQuantity(100);
    setDeadline(undefined);
    setPriority("Normal");
    setSize("");
    setPaperType("");
    setFinishing("None");
    setNotes("");
    setUploadedFile(null);
    setCustomerSearch("");
    setCategory("");
  };

  return (
    <Dialog open={open} onOpenChange={(open) => {
      if (!open) resetForm();
      onOpenChange(open);
    }}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl">{editMode ? "Edit Order" : "Create New Order"}</DialogTitle>
        </DialogHeader>

        {/* Step Indicator */}
        <div className="flex items-center justify-between mb-6 px-4">
          {steps.map((step, index) => (
            <div key={step.id} className="flex items-center">
              <div className={cn(
                "flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all",
                currentStep >= step.id 
                  ? "bg-primary border-primary text-primary-foreground" 
                  : "border-muted-foreground/30 text-muted-foreground"
              )}>
                <step.icon className="h-5 w-5" />
              </div>
              <span className={cn(
                "ml-2 text-sm font-medium hidden sm:block",
                currentStep >= step.id ? "text-foreground" : "text-muted-foreground"
              )}>
                {step.name}
              </span>
              {index < steps.length - 1 && (
                <div className={cn(
                  "w-12 sm:w-20 h-0.5 mx-2",
                  currentStep > step.id ? "bg-primary" : "bg-muted"
                )} />
              )}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="min-h-[350px]">
          {/* Step 1: Customer Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder="Search customers by name or email..." 
                  className="pl-9"
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                />
              </div>
              
              <div className="grid gap-3 max-h-[280px] overflow-y-auto pr-2">
                {filteredCustomers.map((customer) => (
                  <div
                    key={customer.id}
                    onClick={() => setSelectedCustomer(customer)}
                    className={cn(
                      "p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50",
                      selectedCustomer?.id === customer.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border"
                    )}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          {customer.type === "B2B" ? (
                            <Building2 className="h-5 w-5 text-primary" />
                          ) : (
                            <User className="h-5 w-5 text-primary" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium">{customer.name}</p>
                          <div className="flex items-center gap-3 text-sm text-muted-foreground">
                            <span className="flex items-center gap-1">
                              <Mail className="h-3 w-3" />
                              {customer.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <Badge variant={customer.type === "B2B" ? "default" : "secondary"}>
                        {customer.type}
                      </Badge>
                    </div>
                    <div className="mt-2 flex items-center gap-1 text-sm text-muted-foreground">
                      <Phone className="h-3 w-3" />
                      {customer.phone}
                    </div>
                  </div>
                ))}
              </div>

              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Building2 className="h-4 w-4 mr-2" />
                    Add Corporate Account
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-0 bg-popover" align="start">
                  <div className="p-2 border-b">
                    <p className="text-sm font-medium">Select Corporate Account</p>
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {customers.filter(c => c.type === "B2B").map((account) => (
                      <div
                        key={account.id}
                        onClick={() => setSelectedCustomer(account)}
                        className="flex items-center gap-3 p-3 cursor-pointer hover:bg-muted transition-colors"
                      >
                        <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium">{account.name}</p>
                          <p className="text-xs text-muted-foreground">{account.email}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}

          {/* Step 2: Product Selection */}
          {currentStep === 2 && (
            <div className="space-y-4">
              {!selectedCategory ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {productCategories.map((category) => (
                    <div
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className="p-6 rounded-xl border-2 cursor-pointer transition-all hover:border-primary/50 hover:bg-primary/5 text-center"
                    >
                      <div className="w-14 h-14 mx-auto rounded-full bg-primary/10 flex items-center justify-center mb-3">
                        <category.icon className="h-7 w-7 text-primary" />
                      </div>
                      <p className="font-medium">{category.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">
                        {category.products.length} products
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => {
                      setSelectedCategory(null);
                      setSelectedProduct(null);
                    }}
                  >
                    <ArrowLeft className="h-4 w-4 mr-1" />
                    Back to categories
                  </Button>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {productCategories
                      .find(c => c.id === selectedCategory)
                      ?.products.map((product) => (
                        <div
                          key={product.id}
                          onClick={() => setSelectedProduct(product)}
                          className={cn(
                            "p-4 rounded-lg border-2 cursor-pointer transition-all hover:border-primary/50",
                            selectedProduct?.id === product.id 
                              ? "border-primary bg-primary/5" 
                              : "border-border"
                          )}
                        >
                          <p className="font-medium text-sm">{product.name}</p>
                          <p className="text-primary font-semibold mt-1">
                            KD {product.basePrice}
                          </p>
                          <p className="text-xs text-muted-foreground">{product.unit}</p>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 3: Order Details */}
          {currentStep === 3 && (
            <div className="space-y-5">
              <div className="space-y-2">
                <Label>Quantity</Label>
                <div className="flex items-center gap-2">
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(Math.max(1, quantity - 50))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input 
                    type="number" 
                    value={quantity}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="text-center w-24"
                  />
                  <Button 
                    variant="outline" 
                    size="icon"
                    onClick={() => setQuantity(quantity + 50)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>


              <div className="space-y-2">
                <Label>Deadline *</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !deadline && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {deadline ? format(deadline, "PPP") : "Select deadline date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={deadline}
                      onSelect={setDeadline}
                      disabled={(date) => date < new Date()}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <Label>Upload Design File</Label>
                <div 
                  className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => setUploadedFile("design-file.pdf")}
                >
                  {uploadedFile ? (
                    <div className="flex items-center justify-center gap-2 text-primary">
                      <FileText className="h-5 w-5" />
                      <span>{uploadedFile}</span>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                      <p className="text-sm text-muted-foreground">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, AI, PSD, PNG, JPG (max 50MB)
                      </p>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Special Instructions</Label>
                <Textarea 
                  placeholder="Any special requirements or notes..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                />
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-muted/50 rounded-xl p-6 space-y-4">
                <h3 className="font-semibold text-lg">Order Summary</h3>
                
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Customer</p>
                    <p className="font-medium">{selectedCustomer?.name}</p>
                    <p className="text-xs text-muted-foreground">{selectedCustomer?.email}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Product</p>
                    <p className="font-medium">{selectedProduct?.name}</p>
                    <p className="text-xs text-muted-foreground">Qty: {quantity}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Priority</p>
                    <Badge variant={priority === "Urgent" ? "destructive" : "secondary"}>
                      {priority}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Deadline</p>
                    <p className="font-medium">{deadline ? format(deadline, "PPP") : "-"}</p>
                  </div>
                  {size && (
                    <div>
                      <p className="text-muted-foreground">Size</p>
                      <p className="font-medium">{size}</p>
                    </div>
                  )}
                  {paperType && (
                    <div>
                      <p className="text-muted-foreground">Paper Type</p>
                      <p className="font-medium">{paperType}</p>
                    </div>
                  )}
                  {finishing !== "None" && (
                    <div>
                      <p className="text-muted-foreground">Finishing</p>
                      <p className="font-medium">{finishing}</p>
                    </div>
                  )}
                  {uploadedFile && (
                    <div>
                      <p className="text-muted-foreground">Design File</p>
                      <p className="font-medium text-primary">{uploadedFile}</p>
                    </div>
                  )}
                </div>

                {notes && (
                  <div className="pt-2 border-t">
                    <p className="text-muted-foreground text-sm">Notes</p>
                    <p className="text-sm">{notes}</p>
                  </div>
                )}
              </div>

              <div className="bg-primary/5 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Estimated Total</p>
                    <p className="text-3xl font-bold text-primary">KD {calculateTotal()}</p>
                  </div>
                  <div className="text-right text-sm text-muted-foreground">
                    <p>Base: KD {selectedProduct?.basePrice} {selectedProduct?.unit}</p>
                    {finishing !== "None" && <p>Finishing: +15%</p>}
                    {priority === "Urgent" && <p>Urgent: +25%</p>}
                    {priority === "High" && <p>High Priority: +10%</p>}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between pt-4 border-t">
          <Button 
            variant="outline" 
            onClick={currentStep === 1 ? () => onOpenChange(false) : handleBack}
          >
            {currentStep === 1 ? "Cancel" : (
              <>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Back
              </>
            )}
          </Button>
          
          {currentStep < 4 ? (
            <Button onClick={handleNext}>
              Next
              <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-primary hover:bg-primary/90">
              <CheckCircle2 className="h-4 w-4 mr-2" />
              Create Order
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
