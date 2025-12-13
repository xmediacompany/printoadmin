import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, X, ShoppingCart, Zap, Clock, Truck, Mail, CheckCircle } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface StockItem {
  id: string;
  name: string;
  category: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  status: string;
  lastRestocked: string;
  costPerUnit?: string;
  supplier?: string;
}

const initialCategories = [
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
  "Diary",
];


export default function Inventory() {
  const [stockItems, setStockItems] = useState<StockItem[]>([
    {
      id: "INV-001",
      name: "Premium Paper Stock A4",
      category: "Paper",
      quantity: 5000,
      unit: "sheets",
      reorderLevel: 1000,
      status: "In Stock",
      lastRestocked: "2024-01-10",
    },
    {
      id: "INV-002",
      name: "Black Toner Cartridge",
      category: "Consumables",
      quantity: 450,
      unit: "units",
      reorderLevel: 500,
      status: "Low Stock",
      lastRestocked: "2024-01-05",
    },
    {
      id: "INV-003",
      name: "Glossy Photo Paper",
      category: "Paper",
      quantity: 2500,
      unit: "sheets",
      reorderLevel: 500,
      status: "In Stock",
      lastRestocked: "2024-01-12",
    },
    {
      id: "INV-004",
      name: "Binding Coils 12mm",
      category: "Binding",
      quantity: 150,
      unit: "boxes",
      reorderLevel: 200,
      status: "Low Stock",
      lastRestocked: "2023-12-28",
    },
  ]);

  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [reorderDialogOpen, setReorderDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<StockItem | null>(null);
  const [reorderData, setReorderData] = useState({
    quantity: "",
    supplier: "",
    email: "",
    urgency: "standard",
    notes: "",
  });
  const [categories, setCategories] = useState(initialCategories);
  const [showCustomMerchandiseInput, setShowCustomMerchandiseInput] = useState(false);
  const [customMerchandiseName, setCustomMerchandiseName] = useState("");
  const [showCustomPaperTypeInput, setShowCustomPaperTypeInput] = useState(false);
  const [customPaperTypeName, setCustomPaperTypeName] = useState("");
  const [newItem, setNewItem] = useState({
    category: "",
    merchandise: "",
    paperType: "",
    quantity: "",
    reorderLevel: "",
    costPerUnit: "",
    supplier: "",
  });

  const [paperTypes, setPaperTypes] = useState(["A4", "A5", "A3", "Stickers", "Cards"]);

  const stats = [
    {
      label: "Total Items",
      value: stockItems.length.toString(),
      change: "+5.2%",
      trend: "up",
      icon: Package,
    },
    {
      label: "Low Stock Items",
      value: stockItems.filter(item => item.status === "Low Stock").length.toString(),
      change: "-2 from yesterday",
      trend: "warning",
      icon: AlertTriangle,
    },
  ];

  const generateItemId = () => {
    const maxId = stockItems.reduce((max, item) => {
      const num = parseInt(item.id.replace("INV-", ""));
      return num > max ? num : max;
    }, 0);
    return `INV-${String(maxId + 1).padStart(3, "0")}`;
  };

  const calculateStatus = (quantity: number, reorderLevel: number) => {
    if (quantity === 0) return "Out of Stock";
    if (quantity <= reorderLevel) return "Low Stock";
    return "In Stock";
  };

  const handleAddItem = () => {
    if (!newItem.category || !newItem.quantity || !newItem.reorderLevel) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const quantity = parseInt(newItem.quantity);
    const reorderLevel = parseInt(newItem.reorderLevel);

    const item: StockItem = {
      id: generateItemId(),
      name: newItem.category,
      category: newItem.category,
      quantity: quantity,
      unit: "units",
      reorderLevel: reorderLevel,
      status: calculateStatus(quantity, reorderLevel),
      lastRestocked: new Date().toISOString().split("T")[0],
      costPerUnit: newItem.costPerUnit || undefined,
      supplier: newItem.supplier || undefined,
    };

    setStockItems([...stockItems, item]);
    setAddDialogOpen(false);
    setNewItem({
      category: "",
      merchandise: "",
      paperType: "",
      quantity: "",
      reorderLevel: "",
      costPerUnit: "",
      supplier: "",
    });
    setShowCustomMerchandiseInput(false);
    setCustomMerchandiseName("");
    setShowCustomPaperTypeInput(false);
    setCustomPaperTypeName("");

    toast({
      title: "Item Added",
      description: `${item.name} has been added to inventory.`,
    });
  };

  const handleReorderClick = (item: StockItem) => {
    setSelectedItem(item);
    setReorderData({
      quantity: String(item.reorderLevel),
      supplier: item.supplier || "",
      email: "",
      urgency: "standard",
      notes: "",
    });
    setReorderDialogOpen(true);
  };

  const handleSubmitReorder = () => {
    if (!reorderData.quantity || parseInt(reorderData.quantity) <= 0) {
      toast({
        title: "Invalid Quantity",
        description: "Please enter a valid reorder quantity.",
        variant: "destructive",
      });
      return;
    }

    if (!reorderData.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(reorderData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Reorder Placed",
      description: `Reorder for ${selectedItem?.category} (${reorderData.quantity} units) sent to ${reorderData.email}.`,
    });

    setReorderDialogOpen(false);
    setSelectedItem(null);
    setReorderData({
      quantity: "",
      supplier: "",
      email: "",
      urgency: "standard",
      notes: "",
    });
  };

  const handleMarkReceived = (itemId: string) => {
    setStockItems(prevItems =>
      prevItems.map(item => {
        if (item.id === itemId) {
          const newQuantity = item.quantity + item.reorderLevel;
          return {
            ...item,
            quantity: newQuantity,
            status: "In Stock",
            lastRestocked: new Date().toISOString().split("T")[0],
          };
        }
        return item;
      })
    );

    toast({
      title: "Stock Received",
      description: "Item has been marked as received and status updated to In Stock.",
    });
  };

  const getStockStatusBadge = (status: string) => {
    switch (status) {
      case "In Stock":
        return <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">In Stock</Badge>;
      case "Low Stock":
        return <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Low Stock</Badge>;
      case "Out of Stock":
        return <Badge className="bg-red-500/10 text-red-700 hover:bg-red-500/20">Out of Stock</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Inventory & Procurement</h1>
        <p className="text-muted-foreground">Stock levels and inventory management</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className={`h-4 w-4 ${
                stat.trend === "up" ? "text-emerald-600" : 
                stat.trend === "warning" ? "text-yellow-600" : "text-red-600"
              }`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className={`text-xs flex items-center gap-1 ${
                stat.trend === "up" ? "text-emerald-600" : 
                stat.trend === "warning" ? "text-yellow-600" : "text-muted-foreground"
              }`}>
                {stat.trend === "up" && <TrendingUp className="h-3 w-3" />}
                {stat.trend === "down" && <TrendingDown className="h-3 w-3" />}
                {stat.change}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <p className="text-sm text-muted-foreground">
            Monitor inventory levels and reorder points
          </p>
          <Button onClick={() => setAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Item
          </Button>
        </div>

        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Reorder Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Restocked</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockItems.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.category}</TableCell>
                    <TableCell>
                      {item.quantity.toLocaleString()} {item.unit}
                    </TableCell>
                    <TableCell>{item.reorderLevel.toLocaleString()}</TableCell>
                    <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastRestocked}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex gap-2 justify-end">
                        <Button variant="outline" size="sm" onClick={() => handleReorderClick(item)}>
                          <ShoppingCart className="h-4 w-4 mr-1" />
                          Reorder
                        </Button>
                        {(item.status === "Low Stock" || item.status === "Out of Stock") && (
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-emerald-600 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                            onClick={() => handleMarkReceived(item.id)}
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Received
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      {/* Add Item Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Inventory Item</DialogTitle>
            <DialogDescription>
              Enter the details for the new inventory item.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">

            <div className="grid gap-2">
              <Label>Merchandise *</Label>
              {showCustomMerchandiseInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter merchandise name"
                    value={customMerchandiseName}
                    onChange={(e) => setCustomMerchandiseName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customMerchandiseName.trim()) {
                        setCategories([...categories, customMerchandiseName.trim()]);
                        setNewItem({ ...newItem, merchandise: customMerchandiseName.trim() });
                        setCustomMerchandiseName("");
                        setShowCustomMerchandiseInput(false);
                        toast({
                          title: "Merchandise Added",
                          description: `${customMerchandiseName.trim()} has been added.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomMerchandiseInput(false);
                      setCustomMerchandiseName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Select
                  value={newItem.merchandise}
                  onValueChange={(value) => {
                    if (value === "__add_custom_merchandise__") {
                      setShowCustomMerchandiseInput(true);
                    } else {
                      setNewItem({ ...newItem, merchandise: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select merchandise" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="__add_custom_merchandise__">
                      <div className="flex items-center gap-2 text-primary">
                        <Plus className="h-4 w-4" />
                        Add Extra Merchandise
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid gap-2">
              <Label>Paper Types</Label>
              {showCustomPaperTypeInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter paper type"
                    value={customPaperTypeName}
                    onChange={(e) => setCustomPaperTypeName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customPaperTypeName.trim()) {
                        setPaperTypes([...paperTypes, customPaperTypeName.trim()]);
                        setNewItem({ ...newItem, paperType: customPaperTypeName.trim() });
                        setCustomPaperTypeName("");
                        setShowCustomPaperTypeInput(false);
                        toast({
                          title: "Paper Type Added",
                          description: `${customPaperTypeName.trim()} has been added.`,
                        });
                      }
                    }}
                  >
                    Add
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      setShowCustomPaperTypeInput(false);
                      setCustomPaperTypeName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Select
                  value={newItem.paperType}
                  onValueChange={(value) => {
                    if (value === "__add_custom_paper_type__") {
                      setShowCustomPaperTypeInput(true);
                    } else {
                      setNewItem({ ...newItem, paperType: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select paper type" />
                  </SelectTrigger>
                  <SelectContent>
                    {paperTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                    <SelectItem value="__add_custom_paper_type__">
                      <div className="flex items-center gap-2 text-primary">
                        <Plus className="h-4 w-4" />
                        Add Extra Type
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="quantity">Initial Quantity *</Label>
              <Input
                id="quantity"
                type="number"
                min="0"
                placeholder="e.g., 1000"
                value={newItem.quantity}
                onChange={(e) => setNewItem({ ...newItem, quantity: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="reorderLevel">Reorder Level *</Label>
                <Input
                  id="reorderLevel"
                  type="number"
                  min="0"
                  placeholder="e.g., 200"
                  value={newItem.reorderLevel}
                  onChange={(e) => setNewItem({ ...newItem, reorderLevel: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="costPerUnit">Cost Per Unit (KD)</Label>
                <Input
                  id="costPerUnit"
                  type="number"
                  step="0.01"
                  placeholder="0.00"
                  value={newItem.costPerUnit}
                  onChange={(e) => setNewItem({ ...newItem, costPerUnit: e.target.value })}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="supplier">Supplier (Optional)</Label>
              <Input
                id="supplier"
                placeholder="e.g., Al-Wazzan Trading Co."
                value={newItem.supplier}
                onChange={(e) => setNewItem({ ...newItem, supplier: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add Item
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reorder Dialog */}
      <Dialog open={reorderDialogOpen} onOpenChange={setReorderDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5 text-primary" />
              Reorder Inventory
            </DialogTitle>
            <DialogDescription>
              Place a restock order for {selectedItem?.category}
            </DialogDescription>
          </DialogHeader>

          {selectedItem && (
            <div className="space-y-4 py-4">
              {/* Current Stock Info */}
              <div className="rounded-lg border bg-muted/50 p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Item ID:</span>
                  <span className="font-medium">{selectedItem.id}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Current Stock:</span>
                  <span className="font-medium">{selectedItem.quantity.toLocaleString()} {selectedItem.unit}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reorder Level:</span>
                  <span className="font-medium">{selectedItem.reorderLevel.toLocaleString()}</span>
                </div>
              </div>

              {/* Reorder Quantity */}
              <div className="grid gap-2">
                <Label htmlFor="reorderQty">Reorder Quantity *</Label>
                <Input
                  id="reorderQty"
                  type="number"
                  min="1"
                  placeholder="Enter quantity to order"
                  value={reorderData.quantity}
                  onChange={(e) => setReorderData({ ...reorderData, quantity: e.target.value })}
                />
              </div>

              {/* Supplier */}
              <div className="grid gap-2">
                <Label htmlFor="reorderSupplier">Supplier</Label>
                <Input
                  id="reorderSupplier"
                  placeholder="e.g., Al-Wazzan Trading Co."
                  value={reorderData.supplier}
                  onChange={(e) => setReorderData({ ...reorderData, supplier: e.target.value })}
                />
              </div>

              {/* Email */}
              <div className="grid gap-2">
                <Label htmlFor="reorderEmail" className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  Send Order To (Email) *
                </Label>
                <Input
                  id="reorderEmail"
                  type="email"
                  placeholder="supplier@example.com"
                  value={reorderData.email}
                  onChange={(e) => setReorderData({ ...reorderData, email: e.target.value })}
                />
              </div>

              {/* Urgency Level */}
              <div className="grid gap-3">
                <Label>Urgency Level</Label>
                <RadioGroup
                  value={reorderData.urgency}
                  onValueChange={(value) => setReorderData({ ...reorderData, urgency: value })}
                  className="grid grid-cols-3 gap-3"
                >
                  <div>
                    <RadioGroupItem value="standard" id="standard" className="peer sr-only" />
                    <Label
                      htmlFor="standard"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Clock className="mb-2 h-5 w-5 text-muted-foreground" />
                      <span className="text-xs font-medium">Standard</span>
                      <span className="text-[10px] text-muted-foreground">5-7 days</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="express" id="express" className="peer sr-only" />
                    <Label
                      htmlFor="express"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Truck className="mb-2 h-5 w-5 text-blue-500" />
                      <span className="text-xs font-medium">Express</span>
                      <span className="text-[10px] text-muted-foreground">2-3 days</span>
                    </Label>
                  </div>
                  <div>
                    <RadioGroupItem value="urgent" id="urgent" className="peer sr-only" />
                    <Label
                      htmlFor="urgent"
                      className="flex flex-col items-center justify-between rounded-md border-2 border-muted bg-popover p-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer"
                    >
                      <Zap className="mb-2 h-5 w-5 text-yellow-500" />
                      <span className="text-xs font-medium">Urgent</span>
                      <span className="text-[10px] text-muted-foreground">Next day</span>
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Notes */}
              <div className="grid gap-2">
                <Label htmlFor="reorderNotes">Notes (Optional)</Label>
                <Textarea
                  id="reorderNotes"
                  placeholder="Add any special instructions or notes..."
                  value={reorderData.notes}
                  onChange={(e) => setReorderData({ ...reorderData, notes: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setReorderDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmitReorder}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Place Reorder
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}