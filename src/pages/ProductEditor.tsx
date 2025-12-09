import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Upload, 
  Eye, 
  EyeOff,
  Package,
  Save,
  X,
  ImagePlus
} from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface Product {
  id: string;
  itemCode: string;
  title: string;
  category: string;
  price: number;
  image: string;
  description: string;
  isVisible: boolean;
  isOutOfStock: boolean;
}

const initialProducts: Product[] = [
  {
    id: "1",
    itemCode: "BC-001",
    title: "Premium Business Cards",
    category: "Business Cards",
    price: 29.99,
    image: "/placeholder.svg",
    description: "High-quality business cards with matte finish. Available in multiple sizes and paper weights.",
    isVisible: true,
    isOutOfStock: false,
  },
  {
    id: "2",
    itemCode: "FL-002",
    title: "A4 Flyers",
    category: "Flyers",
    price: 49.99,
    image: "/placeholder.svg",
    description: "Vibrant A4 flyers perfect for promotions and events. Full color printing on glossy paper.",
    isVisible: true,
    isOutOfStock: false,
  },
  {
    id: "3",
    itemCode: "PS-003",
    title: "Large Format Poster",
    category: "Posters",
    price: 89.99,
    image: "/placeholder.svg",
    description: "Eye-catching large format posters for maximum visibility. Available in various sizes.",
    isVisible: false,
    isOutOfStock: true,
  },
  {
    id: "4",
    itemCode: "BR-004",
    title: "Tri-fold Brochure",
    category: "Brochures",
    price: 39.99,
    image: "/placeholder.svg",
    description: "Professional tri-fold brochures with premium paper quality. Perfect for marketing materials.",
    isVisible: true,
    isOutOfStock: false,
  },
  {
    id: "5",
    itemCode: "ST-005",
    title: "Custom Stickers",
    category: "Stickers",
    price: 19.99,
    image: "/placeholder.svg",
    description: "Die-cut custom stickers with durable vinyl material. Waterproof and UV resistant.",
    isVisible: true,
    isOutOfStock: true,
  },
  {
    id: "6",
    itemCode: "BN-006",
    title: "Vinyl Banner",
    category: "Banners",
    price: 149.99,
    image: "/placeholder.svg",
    description: "Heavy-duty vinyl banners for outdoor use. Includes grommets for easy hanging.",
    isVisible: true,
    isOutOfStock: false,
  },
];

const defaultCategories = [
  "Custom T-Shirts",
  "Ceramic Mugs",
  "Tote Bags",
  "Hoodies",
  "Caps",
  "Thermo Bottles",
  "Cups",
  "Stationery",
  "Diary",
  "Stickers",
  "Papers",
  "Cards",
  "Notebooks",
];

const ProductEditor = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [categories, setCategories] = useState<string[]>(defaultCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isNewProduct, setIsNewProduct] = useState(false);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const filteredProducts = products.filter((product) => {
    const matchesSearch = 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.itemCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setIsNewProduct(false);
    setIsDialogOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: `${Date.now()}`,
      itemCode: "",
      title: "",
      category: categories[0],
      price: 0,
      image: "/placeholder.svg",
      description: "",
      isVisible: true,
      isOutOfStock: false,
    });
    setIsNewProduct(true);
    setIsDialogOpen(true);
  };

  const handleSaveProduct = () => {
    if (!editingProduct) return;

    if (!editingProduct.title.trim() || !editingProduct.itemCode.trim()) {
      toast({
        title: "Validation Error",
        description: "Title and Item Code are required.",
        variant: "destructive",
      });
      return;
    }

    if (isNewProduct) {
      setProducts([...products, editingProduct]);
      toast({
        title: "Product Created",
        description: `${editingProduct.title} has been added successfully.`,
      });
    } else {
      setProducts(products.map((p) => (p.id === editingProduct.id ? editingProduct : p)));
      toast({
        title: "Product Updated",
        description: `${editingProduct.title} has been updated successfully.`,
      });
    }
    setIsDialogOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: string) => {
    const product = products.find((p) => p.id === id);
    setProducts(products.filter((p) => p.id !== id));
    toast({
      title: "Product Deleted",
      description: `${product?.title} has been removed.`,
    });
  };

  const toggleVisibility = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, isVisible: !p.isVisible } : p
      )
    );
  };

  const toggleStock = (id: string) => {
    setProducts(
      products.map((p) =>
        p.id === id ? { ...p, isOutOfStock: !p.isOutOfStock } : p
      )
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/cms")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Manage Products</h1>
          <p className="text-muted-foreground">Edit and modify product titles, images, categories, and more</p>
        </div>
        <Button onClick={handleAddProduct}>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by title or item code..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-[200px]">
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products Table */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="h-5 w-5" />
            Products ({filteredProducts.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[80px]">Image</TableHead>
                <TableHead>Item Code</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
                <TableHead className="text-center">Visibility</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.map((product) => (
                <TableRow key={product.id} className={!product.isVisible ? "opacity-60" : ""}>
                  <TableCell>
                    <div className="w-12 h-12 rounded-lg bg-muted flex items-center justify-center overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </TableCell>
                  <TableCell className="font-mono text-sm">{product.itemCode}</TableCell>
                  <TableCell className="font-medium">{product.title}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{product.category}</Badge>
                  </TableCell>
                  <TableCell className="text-right font-semibold">
                    {product.price.toFixed(2)} KD
                  </TableCell>
                  <TableCell className="text-center">
                    {product.isOutOfStock ? (
                      <Badge variant="destructive" className="cursor-pointer" onClick={() => toggleStock(product.id)}>
                        Out of Stock
                      </Badge>
                    ) : (
                      <Badge variant="default" className="cursor-pointer bg-green-600 hover:bg-green-700" onClick={() => toggleStock(product.id)}>
                        In Stock
                      </Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => toggleVisibility(product.id)}
                      title={product.isVisible ? "Hide product" : "Show product"}
                    >
                      {product.isVisible ? (
                        <Eye className="h-4 w-4 text-green-600" />
                      ) : (
                        <EyeOff className="h-4 w-4 text-muted-foreground" />
                      )}
                    </Button>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditProduct(product)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
              {filteredProducts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No products found matching your criteria.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit/Add Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isNewProduct ? "Add New Product" : "Edit Product"}</DialogTitle>
            <DialogDescription>
              {isNewProduct 
                ? "Fill in the details to create a new product." 
                : "Modify the product details below."}
            </DialogDescription>
          </DialogHeader>
          
          {editingProduct && (
            <div className="space-y-6 py-4">
              {/* Image Upload */}
              <div className="space-y-2">
                <Label>Product Image</Label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-lg bg-muted flex items-center justify-center overflow-hidden border-2 border-dashed border-border">
                    <img
                      src={editingProduct.image}
                      alt="Product"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <Button variant="outline" className="gap-2">
                    <ImagePlus className="h-4 w-4" />
                    Upload Image
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                {/* Item Code */}
                <div className="space-y-2">
                  <Label htmlFor="itemCode">Item Code *</Label>
                  <Input
                    id="itemCode"
                    value={editingProduct.itemCode}
                    onChange={(e) =>
                      setEditingProduct({ ...editingProduct, itemCode: e.target.value })
                    }
                    placeholder="e.g., BC-001"
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  {isAddingCategory ? (
                    <div className="flex gap-2">
                      <Input
                        value={newCategoryName}
                        onChange={(e) => setNewCategoryName(e.target.value)}
                        placeholder="Enter new category name"
                        className="flex-1"
                        autoFocus
                      />
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          const trimmed = newCategoryName.trim();
                          if (trimmed && !categories.includes(trimmed)) {
                            setCategories([...categories, trimmed]);
                            setEditingProduct({ ...editingProduct, category: trimmed });
                            toast({
                              title: "Category Added",
                              description: `"${trimmed}" has been added to categories.`,
                            });
                          }
                          setNewCategoryName("");
                          setIsAddingCategory(false);
                        }}
                        disabled={!newCategoryName.trim()}
                      >
                        <Save className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          setNewCategoryName("");
                          setIsAddingCategory(false);
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Select
                        value={editingProduct.category}
                        onValueChange={(value) =>
                          setEditingProduct({ ...editingProduct, category: value })
                        }
                      >
                        <SelectTrigger className="flex-1">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((cat) => (
                            <SelectItem key={cat} value={cat}>
                              {cat}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Button
                        type="button"
                        size="icon"
                        variant="outline"
                        onClick={() => setIsAddingCategory(true)}
                        title="Add new category"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  )}
                </div>
              </div>

              {/* Price */}
              <div className="space-y-2">
                <Label htmlFor="price">Price (KD)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  min="0"
                  value={editingProduct.price}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })
                  }
                  placeholder="0.00"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">Product Description</Label>
                <Textarea
                  id="description"
                  value={editingProduct.description}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, description: e.target.value })
                  }
                  placeholder="Enter product description..."
                  rows={4}
                />
              </div>

              {/* Visibility & Stock Toggles */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="visibility" className="font-medium">Visibility</Label>
                    <p className="text-sm text-muted-foreground">Show product on store</p>
                  </div>
                  <Switch
                    id="visibility"
                    checked={editingProduct.isVisible}
                    onCheckedChange={(checked) =>
                      setEditingProduct({ ...editingProduct, isVisible: checked })
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <Label htmlFor="outOfStock" className="font-medium">Out of Stock</Label>
                    <p className="text-sm text-muted-foreground">Mark as unavailable</p>
                  </div>
                  <Switch
                    id="outOfStock"
                    checked={editingProduct.isOutOfStock}
                    onCheckedChange={(checked) =>
                      setEditingProduct({ ...editingProduct, isOutOfStock: checked })
                    }
                  />
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </Button>
            <Button onClick={handleSaveProduct}>
              <Save className="h-4 w-4 mr-2" />
              {isNewProduct ? "Create Product" : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ProductEditor;
