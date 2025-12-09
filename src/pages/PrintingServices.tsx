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
  status: "Visible online" | "Draft";
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
      status: "Visible online",
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
      status: "Visible online",
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
      status: "Visible online",
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
      status: "Visible online",
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
      status: "Visible online",
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
      status: "Visible online",
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
    description: "",
    isVisible: true,
    // Paper size prices
    paperSizeA4: "0.050",
    paperSizeA5: "0.030",
    paperSizeA3: "0.100",
    paperSizeCustom: "0.150",
    paperSizeA4Enabled: true,
    paperSizeA5Enabled: false,
    paperSizeA3Enabled: false,
    paperSizeCustomEnabled: false,
    // Sides pricing
    singleSidedPrice: "0.000",
    doubleSidedPrice: "0.020",
    // Layout - pages per sheet
    pagesPerSheet1: "0.000",
    pagesPerSheet2: "0.010",
    pagesPerSheet4: "0.015",
    // Color mode pricing
    blackWhitePrice: "0.000",
    colorPrice: "0.050",
    // Finishing options
    finishingNone: true,
    finishingStapled: true,
    finishingSpiral: true,
    finishingStapledPrice: "0.100",
    finishingSpiralPrice: "1.500",
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
              status: editForm.isVisible ? "Visible online" : "Draft",
            }
          : s
      ));
      toast.success("Service updated successfully");
    }
    setEditDialogOpen(false);
    setSelectedService(null);
  };

  const handleAddService = () => {
    if (!addForm.title || !addForm.serviceCode || !addForm.category) {
      toast.error("Please fill in all required fields");
      return;
    }

    // Build paper sizes array from enabled options
    const paperSizes: string[] = [];
    if (addForm.paperSizeA4Enabled) paperSizes.push("A4");
    if (addForm.paperSizeA5Enabled) paperSizes.push("A5");
    if (addForm.paperSizeA3Enabled) paperSizes.push("A3");
    if (addForm.paperSizeCustomEnabled) paperSizes.push("Custom");

    // Build bindings array from enabled options
    const bindings: string[] = [];
    if (addForm.finishingNone) bindings.push("None");
    if (addForm.finishingStapled) bindings.push("Stapled");
    if (addForm.finishingSpiral) bindings.push("Spiral Binding");

    const newService: PrintingService = {
      id: `SRV-${String(services.length + 1).padStart(3, '0')}`,
      title: addForm.title,
      serviceCode: addForm.serviceCode,
      category: addForm.category,
      paperSizes,
      bindings,
      basePrice: addForm.paperSizeA4,
      description: addForm.description,
      isVisible: addForm.isVisible,
      status: addForm.isVisible ? "Visible online" : "Draft",
    };

    setServices([...services, newService]);
    toast.success("Service added successfully");
    setAddDialogOpen(false);
    setAddForm({
      title: "",
      serviceCode: "",
      category: "",
      description: "",
      isVisible: true,
      paperSizeA4: "0.050",
      paperSizeA5: "0.030",
      paperSizeA3: "0.100",
      paperSizeCustom: "0.150",
      paperSizeA4Enabled: true,
      paperSizeA5Enabled: false,
      paperSizeA3Enabled: false,
      paperSizeCustomEnabled: false,
      singleSidedPrice: "0.000",
      doubleSidedPrice: "0.020",
      pagesPerSheet1: "0.000",
      pagesPerSheet2: "0.010",
      pagesPerSheet4: "0.015",
      blackWhitePrice: "0.000",
      colorPrice: "0.050",
      finishingNone: true,
      finishingStapled: true,
      finishingSpiral: true,
      finishingStapledPrice: "0.100",
      finishingSpiralPrice: "1.500",
    });
  };

  const handleToggleVisibility = (serviceId: string) => {
    setServices(services.map(s => 
      s.id === serviceId 
        ? { ...s, isVisible: !s.isVisible, status: !s.isVisible ? "Visible online" : "Draft" }
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
      <div className="grid gap-4 md:grid-cols-2 max-w-md">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Visible online</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {services.filter(s => s.isVisible).length}
            </div>
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
                <TableHead>Format</TableHead>
                <TableHead>Sides</TableHead>
                <TableHead>Color Mode</TableHead>
                <TableHead>Layout</TableHead>
                <TableHead>Finishing</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Visibility</TableHead>
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
                      <Badge variant="outline" className="text-xs">Single</Badge>
                      <Badge variant="outline" className="text-xs">Double</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="outline" className="text-xs">B&W</Badge>
                      <Badge variant="outline" className="text-xs">Color</Badge>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-wrap gap-1">
                      <Badge variant="secondary" className="text-xs">1pp</Badge>
                      <Badge variant="secondary" className="text-xs">2pp</Badge>
                      <Badge variant="secondary" className="text-xs">4pp</Badge>
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
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Printing Service</DialogTitle>
          </DialogHeader>
          <div className="grid gap-6 py-4">
            {/* Basic Info */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Basic Information</h3>
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
            </div>

            {/* Paper Size & Pricing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Format - Paper Size & Pricing</h3>
              <p className="text-xs text-muted-foreground">Set price per page for each paper size</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.paperSizeA4Enabled}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, paperSizeA4Enabled: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">A4</Label>
                    <p className="text-xs text-muted-foreground">210 × 297 mm</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.paperSizeA4}
                      onChange={(e) => setAddForm({ ...addForm, paperSizeA4: e.target.value })}
                      disabled={!addForm.paperSizeA4Enabled}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.paperSizeA5Enabled}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, paperSizeA5Enabled: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">A5</Label>
                    <p className="text-xs text-muted-foreground">148 × 210 mm</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.paperSizeA5}
                      onChange={(e) => setAddForm({ ...addForm, paperSizeA5: e.target.value })}
                      disabled={!addForm.paperSizeA5Enabled}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.paperSizeA3Enabled}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, paperSizeA3Enabled: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">A3</Label>
                    <p className="text-xs text-muted-foreground">297 × 420 mm</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.paperSizeA3}
                      onChange={(e) => setAddForm({ ...addForm, paperSizeA3: e.target.value })}
                      disabled={!addForm.paperSizeA3Enabled}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.paperSizeCustomEnabled}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, paperSizeCustomEnabled: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">Custom Size</Label>
                    <p className="text-xs text-muted-foreground">User defined</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.paperSizeCustom}
                      onChange={(e) => setAddForm({ ...addForm, paperSizeCustom: e.target.value })}
                      disabled={!addForm.paperSizeCustomEnabled}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Sides */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Sides - Print Options</h3>
              <p className="text-xs text-muted-foreground">Additional price for print sides (added to base price)</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">Single-sided</Label>
                    <p className="text-xs text-muted-foreground">Print on one side only</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.singleSidedPrice}
                      onChange={(e) => setAddForm({ ...addForm, singleSidedPrice: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">Double-sided</Label>
                    <p className="text-xs text-muted-foreground">Print on both sides</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.doubleSidedPrice}
                      onChange={(e) => setAddForm({ ...addForm, doubleSidedPrice: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Color Mode */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Color Mode</h3>
              <p className="text-xs text-muted-foreground">Additional price for color printing (per page)</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">Black & White</Label>
                    <p className="text-xs text-muted-foreground">Monochrome printing</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.blackWhitePrice}
                      onChange={(e) => setAddForm({ ...addForm, blackWhitePrice: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">Color</Label>
                    <p className="text-xs text-muted-foreground">Full color printing</p>
                  </div>
                  <div className="w-24">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.colorPrice}
                      onChange={(e) => setAddForm({ ...addForm, colorPrice: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Layout - Pages per sheet */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Layout - Pages Per Sheet</h3>
              <p className="text-xs text-muted-foreground">Additional price for multiple pages per sheet</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">1 Page</Label>
                    <p className="text-xs text-muted-foreground">Standard</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.pagesPerSheet1}
                      onChange={(e) => setAddForm({ ...addForm, pagesPerSheet1: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">2 Pages</Label>
                    <p className="text-xs text-muted-foreground">Per sheet</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.pagesPerSheet2}
                      onChange={(e) => setAddForm({ ...addForm, pagesPerSheet2: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg bg-muted/30">
                  <div className="flex-1">
                    <Label className="font-medium">4 Pages</Label>
                    <p className="text-xs text-muted-foreground">Per sheet</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.pagesPerSheet4}
                      onChange={(e) => setAddForm({ ...addForm, pagesPerSheet4: e.target.value })}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Finishing */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Finishing Options</h3>
              <p className="text-xs text-muted-foreground">Enable finishing options and set prices</p>
              <div className="grid grid-cols-3 gap-4">
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.finishingNone}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, finishingNone: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">No Finishing</Label>
                    <p className="text-xs text-muted-foreground">Loose pages</p>
                  </div>
                  <div className="w-16 text-right text-sm text-muted-foreground">Free</div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.finishingStapled}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, finishingStapled: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">Stapled</Label>
                    <p className="text-xs text-muted-foreground">Corner staple</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.finishingStapledPrice}
                      onChange={(e) => setAddForm({ ...addForm, finishingStapledPrice: e.target.value })}
                      disabled={!addForm.finishingStapled}
                      className="text-right"
                    />
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 border rounded-lg">
                  <Switch
                    checked={addForm.finishingSpiral}
                    onCheckedChange={(checked) => setAddForm({ ...addForm, finishingSpiral: checked })}
                  />
                  <div className="flex-1">
                    <Label className="font-medium">Spiral Binding</Label>
                    <p className="text-xs text-muted-foreground">Coil bound</p>
                  </div>
                  <div className="w-20">
                    <Input
                      type="number"
                      step="0.001"
                      placeholder="KD"
                      value={addForm.finishingSpiralPrice}
                      onChange={(e) => setAddForm({ ...addForm, finishingSpiralPrice: e.target.value })}
                      disabled={!addForm.finishingSpiral}
                      className="text-right"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="add-description">Service Description</Label>
              <Textarea
                id="add-description"
                placeholder="Describe the service, its features, and what customers can expect..."
                rows={3}
                value={addForm.description}
                onChange={(e) => setAddForm({ ...addForm, description: e.target.value })}
              />
            </div>

            {/* Visibility */}
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