import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Package, AlertTriangle, TrendingUp, TrendingDown, Plus, X } from "lucide-react";
import { toast } from "@/hooks/use-toast";

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
  "Paper",
  "Consumables",
  "Binding",
  "Ink & Toner",
  "Packaging",
  "Equipment Parts",
];

const unitTypes = [
  "sheets",
  "units",
  "boxes",
  "rolls",
  "packs",
  "pieces",
  "kg",
  "liters",
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
  const [categories, setCategories] = useState(initialCategories);
  const [showCustomCategoryInput, setShowCustomCategoryInput] = useState(false);
  const [customCategoryName, setCustomCategoryName] = useState("");
  const [newItem, setNewItem] = useState({
    name: "",
    category: "",
    quantity: "",
    unit: "units",
    reorderLevel: "",
    costPerUnit: "",
    supplier: "",
  });

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
    if (!newItem.name || !newItem.category || !newItem.quantity || !newItem.reorderLevel) {
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
      name: newItem.name,
      category: newItem.category,
      quantity: quantity,
      unit: newItem.unit,
      reorderLevel: reorderLevel,
      status: calculateStatus(quantity, reorderLevel),
      lastRestocked: new Date().toISOString().split("T")[0],
      costPerUnit: newItem.costPerUnit || undefined,
      supplier: newItem.supplier || undefined,
    };

    setStockItems([...stockItems, item]);
    setAddDialogOpen(false);
    setNewItem({
      name: "",
      category: "",
      quantity: "",
      unit: "units",
      reorderLevel: "",
      costPerUnit: "",
      supplier: "",
    });
    setShowCustomCategoryInput(false);
    setCustomCategoryName("");

    toast({
      title: "Item Added",
      description: `${item.name} has been added to inventory.`,
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

      <Tabs defaultValue="stock-levels" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stock-levels">Stock Levels</TabsTrigger>
        </TabsList>

        <TabsContent value="stock-levels" className="space-y-4">
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
                    <TableHead>Name</TableHead>
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
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.category}</TableCell>
                      <TableCell>
                        {item.quantity.toLocaleString()} {item.unit}
                      </TableCell>
                      <TableCell>{item.reorderLevel.toLocaleString()}</TableCell>
                      <TableCell>{getStockStatusBadge(item.status)}</TableCell>
                      <TableCell>{item.lastRestocked}</TableCell>
                      <TableCell className="text-right">
                        <Button variant="outline" size="sm">
                          Reorder
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

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
              <Label htmlFor="name">Item Name *</Label>
              <Input
                id="name"
                placeholder="e.g., Premium Paper Stock A4"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
              />
            </div>

            <div className="grid gap-2">
              <Label>Category *</Label>
              {showCustomCategoryInput ? (
                <div className="flex gap-2">
                  <Input
                    placeholder="Enter category name"
                    value={customCategoryName}
                    onChange={(e) => setCustomCategoryName(e.target.value)}
                  />
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => {
                      if (customCategoryName.trim()) {
                        setCategories([...categories, customCategoryName.trim()]);
                        setNewItem({ ...newItem, category: customCategoryName.trim() });
                        setCustomCategoryName("");
                        setShowCustomCategoryInput(false);
                        toast({
                          title: "Category Added",
                          description: `${customCategoryName.trim()} has been added.`,
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
                      setShowCustomCategoryInput(false);
                      setCustomCategoryName("");
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Select
                  value={newItem.category}
                  onValueChange={(value) => {
                    if (value === "__add_custom__") {
                      setShowCustomCategoryInput(true);
                    } else {
                      setNewItem({ ...newItem, category: value });
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                    <SelectItem value="__add_custom__">
                      <div className="flex items-center gap-2 text-primary">
                        <Plus className="h-4 w-4" />
                        Add Custom Category
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
              <div className="grid gap-2">
                <Label>Unit Type</Label>
                <Select
                  value={newItem.unit}
                  onValueChange={(value) => setNewItem({ ...newItem, unit: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {unitTypes.map((unit) => (
                      <SelectItem key={unit} value={unit}>
                        {unit}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
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
    </div>
  );
}