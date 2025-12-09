import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  EyeOff,
  FileText,
  Printer,
  BookOpen,
  GraduationCap
} from "lucide-react";
import { toast } from "sonner";

interface PrintingService {
  id: string;
  title: string;
  serviceCode: string;
  category: string;
  paperSizes: string[];
  bindings: string[];
  basePrice: string;
  description: string;
  isVisible: boolean;
  status: "Active" | "Draft";
}

const PrintingServices = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<PrintingService | null>(null);

  const [services, setServices] = useState<PrintingService[]>([
    {
      id: "SRV-001",
      title: "Document Printing",
      serviceCode: "DOC-PRINT",
      category: "Documents",
      paperSizes: ["A4", "A3", "Letter"],
      bindings: ["None", "Stapled", "Spiral"],
      basePrice: "0.050",
      description: "High-quality document printing for reports, presentations, and general documents.",
      isVisible: true,
      status: "Active",
    },
    {
      id: "SRV-002",
      title: "Thesis & Dissertation",
      serviceCode: "THESIS-BIND",
      category: "Academic",
      paperSizes: ["A4"],
      bindings: ["Hard Cover", "Soft Cover", "Spiral"],
      basePrice: "15.000",
      description: "Professional thesis and dissertation binding with embossed covers and gold lettering.",
      isVisible: true,
      status: "Active",
    },
    {
      id: "SRV-003",
      title: "Business Cards",
      serviceCode: "BIZ-CARD",
      category: "Marketing",
      paperSizes: ["Standard", "Square", "Mini"],
      bindings: ["N/A"],
      basePrice: "8.500",
      description: "Premium business cards with various finishes including matte, glossy, and textured.",
      isVisible: true,
      status: "Active",
    },
    {
      id: "SRV-004",
      title: "Booklet Printing",
      serviceCode: "BOOKLET",
      category: "Publications",
      paperSizes: ["A4", "A5", "Custom"],
      bindings: ["Saddle Stitch", "Perfect Bound"],
      basePrice: "5.000",
      description: "Professional booklet printing for catalogs, magazines, and brochures.",
      isVisible: true,
      status: "Active",
    },
    {
      id: "SRV-005",
      title: "Large Format Printing",
      serviceCode: "LARGE-FMT",
      category: "Signage",
      paperSizes: ["A2", "A1", "A0", "Custom"],
      bindings: ["N/A"],
      basePrice: "12.000",
      description: "Large format prints for posters, banners, and signage.",
      isVisible: false,
      status: "Draft",
    },
    {
      id: "SRV-006",
      title: "Photo Printing",
      serviceCode: "PHOTO",
      category: "Photography",
      paperSizes: ["4x6", "5x7", "8x10", "A4"],
      bindings: ["N/A"],
      basePrice: "0.500",
      description: "High-quality photo printing on premium glossy or matte paper.",
      isVisible: true,
      status: "Active",
    },
    {
      id: "SRV-007",
      title: "Certificate Printing",
      serviceCode: "CERT",
      category: "Academic",
      paperSizes: ["A4", "Letter"],
      bindings: ["None", "Framed"],
      basePrice: "2.500",
      description: "Official certificate printing with security features and premium paper.",
      isVisible: true,
      status: "Active",
    },
  ]);

  const [editForm, setEditForm] = useState({
    title: "",
    serviceCode: "",
    category: "",
    paperSizes: "",
    bindings: "",
    basePrice: "",
    description: "",
    isVisible: true,
  });

  const [addForm, setAddForm] = useState({
    title: "",
    serviceCode: "",
    category: "",
    paperSizes: "",
    bindings: "",
    basePrice: "",
    description: "",
    isVisible: true,
  });

  const categories = ["Documents", "Academic", "Marketing", "Publications", "Signage", "Photography"];

  const handleEditService = (service: PrintingService) => {
    setSelectedService(service);
    setEditForm({
      title: service.title,
      serviceCode: service.serviceCode,
      category: service.category,
      paperSizes: service.paperSizes.join(", "),
      bindings: service.bindings.join(", "),
      basePrice: service.basePrice,
      description: service.description,
      isVisible: service.isVisible,
    });
    setEditDialogOpen(true);
  };

  const handleSaveService = () => {
    if (!editForm.title || !editForm.serviceCode || !editForm.basePrice) {
      toast.error("Please fill in all required fields");
      return;
    }

    if (selectedService) {
      setServices(services.map(s => 
        s.id === selectedService.id 
          ? {
              ...s,
              title: editForm.title,
              serviceCode: editForm.serviceCode,
              category: editForm.category,
              paperSizes: editForm.paperSizes.split(",").map(p => p.trim()),
              bindings: editForm.bindings.split(",").map(b => b.trim()),
              basePrice: editForm.basePrice,
              description: editForm.description,
              isVisible: editForm.isVisible,
              status: editForm.isVisible ? "Active" : "Draft",
            }
          : s
      ));
      toast.success("Service updated successfully");
    }
    setEditDialogOpen(false);
    setSelectedService(null);
  };

  const handleAddService = () => {
    if (!addForm.title || !addForm.serviceCode || !addForm.basePrice || !addForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newService: PrintingService = {
      id: `SRV-${String(services.length + 1).padStart(3, '0')}`,
      title: addForm.title,
      serviceCode: addForm.serviceCode,
      category: addForm.category,
      paperSizes: addForm.paperSizes ? addForm.paperSizes.split(",").map(p => p.trim()) : [],
      bindings: addForm.bindings ? addForm.bindings.split(",").map(b => b.trim()) : [],
      basePrice: addForm.basePrice,
      description: addForm.description,
      isVisible: addForm.isVisible,
      status: addForm.isVisible ? "Active" : "Draft",
    };

    setServices([...services, newService]);
    toast.success("Service added successfully");
    setAddDialogOpen(false);
    setAddForm({
      title: "",
      serviceCode: "",
      category: "",
      paperSizes: "",
      bindings: "",
      basePrice: "",
      description: "",
      isVisible: true,
    });
  };

  const handleToggleVisibility = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId 
        ? { ...s, isVisible: !s.isVisible, status: !s.isVisible ? "Active" : "Draft" }
        : s
    ));
    toast.success("Visibility updated");
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Documents":
        return <FileText className="h-4 w-4" />;
      case "Academic":
        return <GraduationCap className="h-4 w-4" />;
      case "Publications":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <Printer className="h-4 w-4" />;
    }
  };

  const filteredServices = services.filter(service =>
    service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.serviceCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
    service.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={() => navigate("/cms")}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Manage Printing Services</h1>
          <p className="text-muted-foreground">Edit and modify printing services, paper sizes, bindings, and prices</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Service
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Services</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{services.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {services.filter(s => s.isVisible).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Hidden</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {services.filter(s => !s.isVisible).length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categories.length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search services..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Services Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Service Code</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Paper Sizes</TableHead>
                <TableHead>Bindings</TableHead>
                <TableHead>Base Price</TableHead>
                <TableHead>Visibility</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredServices.map((service) => (
                <TableRow key={service.id}>
                  <TableCell>
                    <div className="space-y-1">
                      <div className="font-medium">{service.title}</div>
                      <div className="text-xs text-muted-foreground line-clamp-1">{service.description}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <code className="text-sm bg-muted px-2 py-1 rounded">{service.serviceCode}</code>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(service.category)}
                      <span>{service.category}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {service.paperSizes.slice(0, 2).map((size) => (
                        <Badge key={size} variant="outline" className="text-xs">{size}</Badge>
                      ))}
                      {service.paperSizes.length > 2 && (
                        <Badge variant="outline" className="text-xs">+{service.paperSizes.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      {service.bindings.slice(0, 2).map((binding) => (
                        <Badge key={binding} variant="secondary" className="text-xs">{binding}</Badge>
                      ))}
                      {service.bindings.length > 2 && (
                        <Badge variant="secondary" className="text-xs">+{service.bindings.length - 2}</Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">KD {service.basePrice}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleToggleVisibility(service.id)}
                      className={service.isVisible ? "text-emerald-600" : "text-muted-foreground"}
                    >
                      {service.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                    </Button>
                  </TableCell>
                  <TableCell>
                    {service.status === "Active" ? (
                      <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>
                    ) : (
                      <Badge variant="secondary">Draft</Badge>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Service Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Printing Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="title">Service Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter service title"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serviceCode">Service Code *</Label>
                <Input
                  id="serviceCode"
                  placeholder="e.g., DOC-PRINT"
                  value={editForm.serviceCode}
                  onChange={(e) => setEditForm({ ...editForm, serviceCode: e.target.value })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select value={editForm.category} onValueChange={(value) => setEditForm({ ...editForm, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="basePrice">Base Price (KD) *</Label>
                <Input
                  id="basePrice"
                  type="number"
                  step="0.001"
                  placeholder="0.000"
                  value={editForm.basePrice}
                  onChange={(e) => setEditForm({ ...editForm, basePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paperSizes">Paper Sizes (comma-separated)</Label>
              <Input
                id="paperSizes"
                placeholder="e.g., A4, A3, Letter"
                value={editForm.paperSizes}
                onChange={(e) => setEditForm({ ...editForm, paperSizes: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="bindings">Binding Options (comma-separated)</Label>
              <Input
                id="bindings"
                placeholder="e.g., None, Spiral, Hard Cover"
                value={editForm.bindings}
                onChange={(e) => setEditForm({ ...editForm, bindings: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Service Description</Label>
              <Textarea
                id="description"
                placeholder="Enter service description..."
                rows={3}
                value={editForm.description}
                onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="space-y-0.5">
                <Label>Service Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  {editForm.isVisible ? "Service is visible to customers" : "Service is hidden from customers"}
                </p>
              </div>
              <Switch
                checked={editForm.isVisible}
                onCheckedChange={(checked) => setEditForm({ ...editForm, isVisible: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveService}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Printing Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-title">Service Title *</Label>
                <Input
                  id="add-title"
                  placeholder="Enter service title"
                  value={addForm.title}
                  onChange={(e) => setAddForm({ ...addForm, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-serviceCode">Service Code *</Label>
                <Input
                  id="add-serviceCode"
                  placeholder="e.g., DOC-PRINT"
                  value={addForm.serviceCode}
                  onChange={(e) => setAddForm({ ...addForm, serviceCode: e.target.value.toUpperCase() })}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="add-category">Category *</Label>
                <Select value={addForm.category} onValueChange={(value) => setAddForm({ ...addForm, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-basePrice">Base Price (KD) *</Label>
                <Input
                  id="add-basePrice"
                  type="number"
                  step="0.001"
                  placeholder="0.000"
                  value={addForm.basePrice}
                  onChange={(e) => setAddForm({ ...addForm, basePrice: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-paperSizes">Paper Sizes (comma-separated)</Label>
              <Input
                id="add-paperSizes"
                placeholder="e.g., A4, A3, Letter, Custom"
                value={addForm.paperSizes}
                onChange={(e) => setAddForm({ ...addForm, paperSizes: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Common sizes: A0, A1, A2, A3, A4, A5, Letter, Legal, Custom</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-bindings">Binding Options (comma-separated)</Label>
              <Input
                id="add-bindings"
                placeholder="e.g., None, Spiral, Hard Cover, Soft Cover"
                value={addForm.bindings}
                onChange={(e) => setAddForm({ ...addForm, bindings: e.target.value })}
              />
              <p className="text-xs text-muted-foreground">Common bindings: None, Stapled, Spiral, Perfect Bound, Hard Cover, Soft Cover, Saddle Stitch</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="add-description">Service Description</Label>
              <Textarea
                id="add-description"
                placeholder="Describe the service, its features, and what customers can expect..."
                rows={4}
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg bg-muted/30">
              <div className="space-y-0.5">
                <Label>Service Visibility</Label>
                <p className="text-sm text-muted-foreground">
                  {addForm.isVisible ? "Service will be visible to customers immediately" : "Service will be saved as draft (hidden)"}
                </p>
              </div>
              <Switch
                checked={addForm.isVisible}
                onCheckedChange={(checked) => setAddForm({ ...addForm, isVisible: checked })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddService}>
              Add Service
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PrintingServices;