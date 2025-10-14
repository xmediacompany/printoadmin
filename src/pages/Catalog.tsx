import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const products = [
  { 
    id: "PROD-001", 
    name: "Business Cards", 
    category: "Cards",
    variants: "12 variants",
    materials: "Standard, Premium, Luxury",
    basePrice: "$45",
    status: "Active"
  },
  { 
    id: "PROD-002", 
    name: "Flyers A5", 
    category: "Marketing Materials",
    variants: "8 variants",
    materials: "Standard, Glossy",
    basePrice: "$120",
    status: "Active"
  },
  { 
    id: "PROD-003", 
    name: "Posters", 
    category: "Large Format",
    variants: "15 variants",
    materials: "Standard, Photo Paper, Canvas",
    basePrice: "$280",
    status: "Active"
  },
  { 
    id: "PROD-004", 
    name: "Brochures", 
    category: "Marketing Materials",
    variants: "10 variants",
    materials: "Standard, Premium",
    basePrice: "$180",
    status: "Active"
  },
  { 
    id: "PROD-005", 
    name: "Banners", 
    category: "Large Format",
    variants: "6 variants",
    materials: "Vinyl, Mesh, Fabric",
    basePrice: "$450",
    status: "Draft"
  },
];

const Catalog = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Catalog & Templates</h1>
          <p className="text-muted-foreground">Manage products, variants, and templates</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Product
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Products</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <p className="text-xs text-muted-foreground mt-1">+8 this month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Variants</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">847</div>
            <p className="text-xs text-muted-foreground mt-1">Across all products</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Templates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">342</div>
            <p className="text-xs text-muted-foreground mt-1">Ready to use</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-muted-foreground">Materials</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground mt-1">In stock</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search products..." className="pl-9" />
            </div>
            <div className="flex gap-2">
              <Button variant="outline">Filter</Button>
              <Button variant="outline">Export</Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Product ID</th>
                  <th className="text-left p-4 font-medium text-sm">Name</th>
                  <th className="text-left p-4 font-medium text-sm">Category</th>
                  <th className="text-left p-4 font-medium text-sm">Variants</th>
                  <th className="text-left p-4 font-medium text-sm">Materials</th>
                  <th className="text-left p-4 font-medium text-sm">Base Price</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm"></th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{product.id}</td>
                    <td className="p-4 font-medium">{product.name}</td>
                    <td className="p-4 text-muted-foreground">{product.category}</td>
                    <td className="p-4">{product.variants}</td>
                    <td className="p-4 text-sm text-muted-foreground">{product.materials}</td>
                    <td className="p-4 font-medium">{product.basePrice}</td>
                    <td className="p-4">
                      <Badge variant={product.status === "Active" ? "default" : "secondary"}>
                        {product.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit Product</DropdownMenuItem>
                          <DropdownMenuItem>Manage Variants</DropdownMenuItem>
                          <DropdownMenuItem>View Templates</DropdownMenuItem>
                          <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Catalog;
