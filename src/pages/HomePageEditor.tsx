import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { 
  ArrowLeft, 
  Save, 
  Eye, 
  Edit, 
  Image as ImageIcon,
  Type,
  Upload,
  Palette,
  ShoppingBag,
  Printer,
  Phone,
  Mail,
  Plus,
  Share2,
  Facebook,
  Instagram,
  Linkedin,
  Trash2,
  FileText,
  HelpCircle,
  Building2,
  Briefcase
} from "lucide-react";
import { toast } from "sonner";

interface PageSection {
  id: string;
  name: string;
  title: string;
  subtitle?: string;
  description: string;
  buttonText?: string;
  buttonLink?: string;
  imageUrl: string;
  isActive: boolean;
}

interface ProductItem {
  id: string;
  name: string;
  subtitle: string;
  imageUrl: string;
  colors: string[];
  sizes: string[];
  quantity: number;
  isActive: boolean;
}

interface ServiceItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  isActive: boolean;
}

interface ContactSection {
  id: string;
  title: string;
  features: { title: string; description: string }[];
  newsletterTitle: string;
  newsletterSubtitle: string;
  isActive: boolean;
}

interface SocialLink {
  id: string;
  platform: string;
  url: string;
  isActive: boolean;
}

interface SupportPage {
  id: string;
  name: string;
  title: string;
  content: string;
  isActive: boolean;
}

const HomePageEditor = () => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editProductDialogOpen, setEditProductDialogOpen] = useState(false);
  const [addProductDialogOpen, setAddProductDialogOpen] = useState(false);
  const [editServiceDialogOpen, setEditServiceDialogOpen] = useState(false);
  const [addServiceDialogOpen, setAddServiceDialogOpen] = useState(false);
  const [selectedSection, setSelectedSection] = useState<PageSection | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [newProduct, setNewProduct] = useState<Omit<ProductItem, 'id' | 'isActive'>>({
    name: "",
    subtitle: "",
    imageUrl: "",
    colors: [],
    sizes: [],
    quantity: 0,
  });
  const [newColorInput, setNewColorInput] = useState("");
  const [newSizeInput, setNewSizeInput] = useState("");
  const [selectedService, setSelectedService] = useState<ServiceItem | null>(null);
  const [newService, setNewService] = useState<Omit<ServiceItem, 'id' | 'isActive'>>({
    name: "",
    description: "",
    icon: "file",
  });

  // Hero Section - PRINTO Collection
  const [heroSection, setHeroSection] = useState<PageSection>({
    id: "hero",
    name: "Hero Section",
    title: "PRINTO",
    subtitle: "Collection",
    description: "PRINTO brings you an extended range of stylish merchandise for modern printing solutions. From personalized gifts to promotional items, our collection offers carefully designed products that elevate your brand's visibility and leave lasting impressions.",
    buttonText: "Shop Now",
    buttonLink: "/products",
    imageUrl: "/hero-collection.jpg",
    isActive: true,
  });

  // Custom Design Section
  const [customDesignSection, setCustomDesignSection] = useState<PageSection>({
    id: "custom-design",
    name: "Custom Design",
    title: "Custom Design",
    description: "Whether you have a finished artwork or just a concept, we can bring your personalized prints to life with precision. Our studio offers designed-to-order apparel, accessories, and more. Perfect for business branding or personal creativity.",
    buttonText: "Learn more",
    buttonLink: "/custom-design",
    imageUrl: "/custom-design.jpg",
    isActive: true,
  });

  // Printing Solutions Section
  const [printingSolutionsSection, setPrintingSolutionsSection] = useState<PageSection>({
    id: "printing-solutions",
    name: "Printing Solutions",
    title: "Printing Solutions",
    description: "Beyond great products, we prioritize top-tier craftsmanship, eco-friendly inks and materials, printing with modern printing and embroidery methods. Count on PRINTO for flawless prints that stand the test of time.",
    buttonText: "Discover more",
    buttonLink: "/printing-solutions",
    imageUrl: "/printing-solutions.jpg",
    isActive: true,
  });

  // Custom Design Products
  const [products, setProducts] = useState<ProductItem[]>([
    { id: "prod-1", name: "Custom T-Shirts", subtitle: "DTF/DTG/Screen-print", imageUrl: "/products/tshirts.jpg", colors: ["Black", "White", "Navy"], sizes: ["S", "M", "L", "XL"], quantity: 100, isActive: true },
    { id: "prod-2", name: "Ceramic Mugs", subtitle: "Sublimation print", imageUrl: "/products/mugs.jpg", colors: ["White"], sizes: ["11oz", "15oz"], quantity: 50, isActive: true },
    { id: "prod-3", name: "Tote Bags", subtitle: "Screen Print/DTG", imageUrl: "/products/totebags.jpg", colors: ["Natural", "Black"], sizes: ["Standard"], quantity: 75, isActive: true },
    { id: "prod-4", name: "Hoodies", subtitle: "DTG/Screen/Print/Emb", imageUrl: "/products/hoodies.jpg", colors: ["Black", "Grey", "Navy"], sizes: ["S", "M", "L", "XL", "XXL"], quantity: 60, isActive: true },
    { id: "prod-5", name: "Caps", subtitle: "Embroidery-print", imageUrl: "/products/caps.jpg", colors: ["Black", "White", "Red"], sizes: ["One Size"], quantity: 120, isActive: true },
    { id: "prod-6", name: "Thermo Bottles", subtitle: "Sublimation-laser", imageUrl: "/products/bottles.jpg", colors: ["Silver", "Black", "White"], sizes: ["500ml", "750ml"], quantity: 80, isActive: true },
    { id: "prod-7", name: "Cups", subtitle: "Custom branded cups", imageUrl: "/products/cups.jpg", colors: ["White", "Black"], sizes: ["250ml", "350ml"], quantity: 90, isActive: true },
    { id: "prod-8", name: "Stationery", subtitle: "Branded stationery sets", imageUrl: "/products/stationery.jpg", colors: [], sizes: [], quantity: 40, isActive: true },
    { id: "prod-9", name: "Diary", subtitle: "Personalized diary/journal", imageUrl: "/products/diary.jpg", colors: ["Black", "Brown", "Blue"], sizes: ["A5", "A4"], quantity: 35, isActive: true },
  ]);

  // Printing Services
  const [services, setServices] = useState<ServiceItem[]>([
    { id: "serv-1", name: "Stickers", description: "Custom printed stickers for product packaging, promotions and more.", icon: "sticker", isActive: true },
    { id: "serv-2", name: "Papers", description: "High quality printed papers for flyers, brochures and marketing materials.", icon: "file", isActive: true },
    { id: "serv-3", name: "Cards", description: "Premium quality business cards, invitation cards and greeting cards.", icon: "credit-card", isActive: true },
    { id: "serv-4", name: "Notebooks", description: "Custom branded notebooks and notepads for corporate gifting.", icon: "book", isActive: true },
  ]);

  // Get In Touch Section
  const [contactSection, setContactSection] = useState<ContactSection>({
    id: "contact",
    title: "GET IN TOUCH",
    features: [
      { title: "Fast Production & Delivery", description: "We understand urgency matters to you! Printo offers same-day delivery in select locations and standard delivery within 1-3 working days." },
      { title: "Custom Design Support", description: "Need help designing your products? Our team of skilled designers will transform your vision into stunning prints that leave a lasting impression." },
      { title: "Quality Guarantee", description: "We use premium materials and industry-leading techniques to deliver products that meet the highest standards of quality." },
    ],
    newsletterTitle: "Print more. Pay Less.",
    newsletterSubtitle: "Get exclusive offers, tips and updates straight to your inbox!",
    isActive: true,
  });

  // Social Media Links
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([
    { id: "social-1", platform: "Facebook", url: "https://facebook.com/printo", isActive: true },
    { id: "social-2", platform: "Instagram", url: "https://instagram.com/printo", isActive: true },
    { id: "social-3", platform: "TikTok", url: "https://tiktok.com/@printo", isActive: true },
    { id: "social-4", platform: "LinkedIn", url: "https://linkedin.com/company/printo", isActive: true },
  ]);

  const [newSocialLink, setNewSocialLink] = useState({ platform: "", url: "" });

  // Support Pages
  const [supportPages, setSupportPages] = useState<SupportPage[]>([
    { 
      id: "faq", 
      name: "FAQs", 
      title: "Frequently Asked Questions",
      content: "Find answers to common questions about our products, ordering process, shipping, and more.",
      isActive: true 
    },
    { 
      id: "contact", 
      name: "Contact Us", 
      title: "Contact Us",
      content: "Get in touch with our team for any inquiries, support, or feedback. We're here to help!",
      isActive: true 
    },
    { 
      id: "privacy", 
      name: "Privacy Policy", 
      title: "Privacy Policy",
      content: "Learn how we collect, use, and protect your personal information when you use our services.",
      isActive: true 
    },
    { 
      id: "refund", 
      name: "Refund Policy", 
      title: "Refund Policy",
      content: "Understand our refund and return policies to ensure a smooth shopping experience.",
      isActive: true 
    },
  ]);

  // Company Pages
  const [companyPages, setCompanyPages] = useState<SupportPage[]>([
    { 
      id: "about", 
      name: "About Us", 
      title: "About PRINTO",
      content: "PRINTO is Kuwait's leading printing and merchandise company, offering premium quality products and exceptional customer service since 2015.",
      isActive: true 
    },
    { 
      id: "careers", 
      name: "Careers", 
      title: "Join Our Team",
      content: "We're always looking for talented individuals to join our growing team. Explore exciting career opportunities at PRINTO.",
      isActive: true 
    },
    { 
      id: "b2b", 
      name: "B2B Services", 
      title: "B2B & Corporate Services",
      content: "Partner with PRINTO for all your corporate printing and merchandise needs. We offer bulk discounts, dedicated account managers, and customized solutions.",
      isActive: true 
    },
  ]);

  const handleSave = () => {
    toast.success("Home page changes saved successfully");
    setHasChanges(false);
  };

  const handlePreview = () => {
    toast.info("Opening preview in new tab...");
  };

  const handleEditSection = (section: PageSection, setter: React.Dispatch<React.SetStateAction<PageSection>>) => {
    setSelectedSection({ ...section, id: section.id });
    setEditDialogOpen(true);
  };

  const handleUpdateSection = () => {
    if (!selectedSection) return;
    
    switch (selectedSection.id) {
      case "hero":
        setHeroSection(selectedSection);
        break;
      case "custom-design":
        setCustomDesignSection(selectedSection);
        break;
      case "printing-solutions":
        setPrintingSolutionsSection(selectedSection);
        break;
    }
    
    setEditDialogOpen(false);
    setSelectedSection(null);
    setHasChanges(true);
    toast.success("Section updated");
  };

  const handleEditProduct = (product: ProductItem) => {
    setSelectedProduct({ ...product });
    setEditProductDialogOpen(true);
  };

  const handleUpdateProduct = () => {
    if (!selectedProduct) return;
    setProducts(prev => prev.map(p => p.id === selectedProduct.id ? selectedProduct : p));
    setEditProductDialogOpen(false);
    setSelectedProduct(null);
    setHasChanges(true);
    toast.success("Product updated");
  };

  const handleEditService = (service: ServiceItem) => {
    setSelectedService({ ...service });
    setEditServiceDialogOpen(true);
  };

  const handleUpdateService = () => {
    if (!selectedService) return;
    setServices(prev => prev.map(s => s.id === selectedService.id ? selectedService : s));
    setEditServiceDialogOpen(false);
    setSelectedService(null);
    setHasChanges(true);
    toast.success("Service updated");
  };

  const handleToggleProduct = (productId: string) => {
    setProducts(prev => prev.map(p => p.id === productId ? { ...p, isActive: !p.isActive } : p));
    setHasChanges(true);
  };

  const handleAddProduct = () => {
    if (!newProduct.name) {
      toast.error("Please enter a product name");
      return;
    }
    const product: ProductItem = {
      id: `prod-${Date.now()}`,
      ...newProduct,
      isActive: true,
    };
    setProducts(prev => [...prev, product]);
    setNewProduct({ name: "", subtitle: "", imageUrl: "", colors: [], sizes: [], quantity: 0 });
    setNewColorInput("");
    setNewSizeInput("");
    setAddProductDialogOpen(false);
    setHasChanges(true);
    toast.success("Product added successfully");
  };

  const handleToggleService = (serviceId: string) => {
    setServices(prev => prev.map(s => s.id === serviceId ? { ...s, isActive: !s.isActive } : s));
    setHasChanges(true);
  };

  const handleAddService = () => {
    if (!newService.name) {
      toast.error("Please enter a service name");
      return;
    }
    const service: ServiceItem = {
      id: `serv-${Date.now()}`,
      ...newService,
      isActive: true,
    };
    setServices(prev => [...prev, service]);
    setNewService({ name: "", description: "", icon: "file" });
    setAddServiceDialogOpen(false);
    setHasChanges(true);
    toast.success("Service added successfully");
  };

  const handleAddSocialLink = () => {
    if (!newSocialLink.platform || !newSocialLink.url) {
      toast.error("Please enter platform name and URL");
      return;
    }
    const link: SocialLink = {
      id: `social-${Date.now()}`,
      ...newSocialLink,
      isActive: true,
    };
    setSocialLinks(prev => [...prev, link]);
    setNewSocialLink({ platform: "", url: "" });
    setHasChanges(true);
    toast.success("Social link added successfully");
  };

  const handleDeleteSocialLink = (linkId: string) => {
    setSocialLinks(prev => prev.filter(link => link.id !== linkId));
    setHasChanges(true);
    toast.success("Social link deleted");
  };

  const handleToggleSocialLink = (linkId: string) => {
    setSocialLinks(prev => prev.map(link => 
      link.id === linkId ? { ...link, isActive: !link.isActive } : link
    ));
    setHasChanges(true);
  };

  const getSocialIcon = (platform: string) => {
    const platformLower = platform.toLowerCase();
    if (platformLower.includes("facebook")) return <Facebook className="h-5 w-5" />;
    if (platformLower.includes("instagram")) return <Instagram className="h-5 w-5" />;
    if (platformLower.includes("linkedin")) return <Linkedin className="h-5 w-5" />;
    return <Share2 className="h-5 w-5" />;
  };

  const renderSectionCard = (section: PageSection, setter: React.Dispatch<React.SetStateAction<PageSection>>) => (
    <Card className={!section.isActive ? "opacity-60" : ""}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{section.name}</CardTitle>
          <div className="flex items-center gap-2">
            <Switch 
              checked={section.isActive}
              onCheckedChange={() => {
                setter(prev => ({ ...prev, isActive: !prev.isActive }));
                setHasChanges(true);
              }}
            />
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          {/* Image Preview */}
          <div className="space-y-2">
            <Label className="text-sm text-muted-foreground">Section Image</Label>
            <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20 overflow-hidden">
              <div className="text-center p-4">
                <ImageIcon className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-xs text-muted-foreground">{section.imageUrl || "No image set"}</p>
              </div>
            </div>
          </div>
          
          {/* Text Preview */}
          <div className="space-y-3">
            <div>
              <Label className="text-sm text-muted-foreground">Title</Label>
              <p className="font-semibold">{section.title} {section.subtitle && <span className="font-normal">{section.subtitle}</span>}</p>
            </div>
            <div>
              <Label className="text-sm text-muted-foreground">Description</Label>
              <p className="text-sm text-muted-foreground line-clamp-3">{section.description}</p>
            </div>
            {section.buttonText && (
              <div>
                <Label className="text-sm text-muted-foreground">Button</Label>
                <Badge variant="outline">{section.buttonText}</Badge>
              </div>
            )}
          </div>
        </div>
        
        <Button variant="outline" className="w-full" onClick={() => handleEditSection(section, setter)}>
          <Edit className="h-4 w-4 mr-2" />
          Edit Section
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="icon" onClick={() => navigate("/cms")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-3xl font-bold">Home Page Editor</h1>
              <Badge>Live</Badge>
            </div>
            <p className="text-muted-foreground">Customize your website's main landing page</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handlePreview}>
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            {hasChanges ? "Save Changes" : "Saved"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="hero" className="space-y-6">
        <TabsList className="flex-wrap h-auto gap-1">
          <TabsTrigger value="hero" className="gap-2">
            <Palette className="h-4 w-4" />
            Hero Section
          </TabsTrigger>
          <TabsTrigger value="custom-design" className="gap-2">
            <ImageIcon className="h-4 w-4" />
            Custom Design
          </TabsTrigger>
          <TabsTrigger value="printing-solutions" className="gap-2">
            <Printer className="h-4 w-4" />
            Printing Solutions
          </TabsTrigger>
          <TabsTrigger value="products" className="gap-2">
            <ShoppingBag className="h-4 w-4" />
            Products
          </TabsTrigger>
          <TabsTrigger value="services" className="gap-2">
            <Type className="h-4 w-4" />
            Services
          </TabsTrigger>
          <TabsTrigger value="contact" className="gap-2">
            <Phone className="h-4 w-4" />
            Get In Touch
          </TabsTrigger>
          <TabsTrigger value="social" className="gap-2">
            <Share2 className="h-4 w-4" />
            Social Media
          </TabsTrigger>
          <TabsTrigger value="support" className="gap-2">
            <HelpCircle className="h-4 w-4" />
            Support Pages
          </TabsTrigger>
          <TabsTrigger value="company" className="gap-2">
            <Building2 className="h-4 w-4" />
            Company Pages
          </TabsTrigger>
        </TabsList>

        {/* Hero Section Tab */}
        <TabsContent value="hero" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">PRINTO Collection - Hero Section</h2>
            <p className="text-muted-foreground">The main banner section at the top of your home page</p>
          </div>
          {renderSectionCard(heroSection, setHeroSection)}
        </TabsContent>

        {/* Custom Design Tab */}
        <TabsContent value="custom-design" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Custom Design Section</h2>
            <p className="text-muted-foreground">Showcase your custom design services</p>
          </div>
          {renderSectionCard(customDesignSection, setCustomDesignSection)}
        </TabsContent>

        {/* Printing Solutions Tab */}
        <TabsContent value="printing-solutions" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Printing Solutions Section</h2>
            <p className="text-muted-foreground">Highlight your printing capabilities and quality</p>
          </div>
          {renderSectionCard(printingSolutionsSection, setPrintingSolutionsSection)}
        </TabsContent>

        {/* Products Tab */}
        <TabsContent value="products" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Our Custom Design Products</h2>
              <p className="text-muted-foreground">Manage the products displayed in the products grid</p>
            </div>
            <Button onClick={() => setAddProductDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Product
            </Button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Card key={product.id} className={!product.isActive ? "opacity-60" : ""}>
                <CardContent className="p-4 space-y-3">
                  <div className="aspect-square bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                    <ImageIcon className="h-12 w-12 text-muted-foreground" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold">{product.name}</h3>
                    <p className="text-sm text-muted-foreground">{product.subtitle}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <Switch 
                      checked={product.isActive}
                      onCheckedChange={() => handleToggleProduct(product.id)}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Our Printing Services</h2>
              <p className="text-muted-foreground">Manage the services displayed in the services section</p>
            </div>
            <Button onClick={() => setAddServiceDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Service
            </Button>
          </div>
          
          <div className="grid gap-4 sm:grid-cols-2">
            {services.map((service) => (
              <Card key={service.id} className={!service.isActive ? "opacity-60" : ""}>
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                      <Type className="h-6 w-6 text-muted-foreground" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{service.name}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-2">{service.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <Switch 
                      checked={service.isActive}
                      onCheckedChange={() => handleToggleService(service.id)}
                    />
                    <Button variant="outline" size="sm" onClick={() => handleEditService(service)}>
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Get In Touch Section</h2>
            <p className="text-muted-foreground">Manage the contact and newsletter section</p>
          </div>
          
          <Card>
            <CardContent className="p-6 space-y-6">
              <div className="space-y-2">
                <Label>Section Title</Label>
                <Input 
                  value={contactSection.title}
                  onChange={(e) => {
                    setContactSection(prev => ({ ...prev, title: e.target.value }));
                    setHasChanges(true);
                  }}
                />
              </div>
              
              <div className="space-y-4">
                <Label>Feature Highlights</Label>
                {contactSection.features.map((feature, index) => (
                  <Card key={index} className="bg-muted/50">
                    <CardContent className="p-4 space-y-3">
                      <div className="space-y-2">
                        <Label className="text-sm">Feature Title</Label>
                        <Input 
                          value={feature.title}
                          onChange={(e) => {
                            const newFeatures = [...contactSection.features];
                            newFeatures[index] = { ...feature, title: e.target.value };
                            setContactSection(prev => ({ ...prev, features: newFeatures }));
                            setHasChanges(true);
                          }}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label className="text-sm">Feature Description</Label>
                        <Textarea 
                          value={feature.description}
                          onChange={(e) => {
                            const newFeatures = [...contactSection.features];
                            newFeatures[index] = { ...feature, description: e.target.value };
                            setContactSection(prev => ({ ...prev, features: newFeatures }));
                            setHasChanges(true);
                          }}
                          rows={2}
                        />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Newsletter Title</Label>
                  <Input 
                    value={contactSection.newsletterTitle}
                    onChange={(e) => {
                      setContactSection(prev => ({ ...prev, newsletterTitle: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Newsletter Subtitle</Label>
                  <Input 
                    value={contactSection.newsletterSubtitle}
                    onChange={(e) => {
                      setContactSection(prev => ({ ...prev, newsletterSubtitle: e.target.value }));
                      setHasChanges(true);
                    }}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Social Media Tab */}
        <TabsContent value="social" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Social Media Links</h2>
            <p className="text-muted-foreground">Manage your social media links displayed in the footer</p>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Add New Social Link</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Platform Name</Label>
                  <Input 
                    placeholder="e.g., Facebook, Instagram, TikTok"
                    value={newSocialLink.platform}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, platform: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Profile URL</Label>
                  <Input 
                    placeholder="https://..."
                    value={newSocialLink.url}
                    onChange={(e) => setNewSocialLink({ ...newSocialLink, url: e.target.value })}
                  />
                </div>
              </div>
              <Button onClick={handleAddSocialLink}>
                <Plus className="h-4 w-4 mr-2" />
                Add Social Link
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-3">
            {socialLinks.map((link) => (
              <Card key={link.id} className={!link.isActive ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                      {getSocialIcon(link.platform)}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold">{link.platform}</h3>
                      <p className="text-sm text-muted-foreground truncate max-w-md">{link.url}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={link.isActive}
                        onCheckedChange={() => handleToggleSocialLink(link.id)}
                      />
                      <Input 
                        className="w-64 hidden md:block"
                        value={link.url}
                        onChange={(e) => {
                          setSocialLinks(prev => prev.map(l => 
                            l.id === link.id ? { ...l, url: e.target.value } : l
                          ));
                          setHasChanges(true);
                        }}
                      />
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="text-destructive"
                        onClick={() => handleDeleteSocialLink(link.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {socialLinks.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Share2 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No social links yet</h3>
                <p className="text-sm text-muted-foreground">Add your first social media link above</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Support Pages Tab */}
        <TabsContent value="support" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Support Pages</h2>
            <p className="text-muted-foreground">Manage the content for your support and policy pages</p>
          </div>
          
          <div className="space-y-4">
            {supportPages.map((page) => (
              <Card key={page.id} className={!page.isActive ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{page.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">/{page.id}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={page.isActive}
                      onCheckedChange={() => {
                        setSupportPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, isActive: !p.isActive } : p
                        ));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Page Title</Label>
                    <Input 
                      value={page.title}
                      onChange={(e) => {
                        setSupportPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, title: e.target.value } : p
                        ));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Page Content / Description</Label>
                    <Textarea 
                      value={page.content}
                      onChange={(e) => {
                        setSupportPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, content: e.target.value } : p
                        ));
                        setHasChanges(true);
                      }}
                      rows={4}
                      placeholder="Enter the page content..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Company Pages Tab */}
        <TabsContent value="company" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Company Pages</h2>
            <p className="text-muted-foreground">Manage the content for About Us, Careers, and B2B Services pages</p>
          </div>
          
          <div className="space-y-4">
            {companyPages.map((page) => (
              <Card key={page.id} className={!page.isActive ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center">
                        {page.id === "about" && <Building2 className="h-5 w-5 text-muted-foreground" />}
                        {page.id === "careers" && <Briefcase className="h-5 w-5 text-muted-foreground" />}
                        {page.id === "b2b" && <ShoppingBag className="h-5 w-5 text-muted-foreground" />}
                      </div>
                      <div>
                        <CardTitle className="text-lg">{page.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">/{page.id}</p>
                      </div>
                    </div>
                    <Switch 
                      checked={page.isActive}
                      onCheckedChange={() => {
                        setCompanyPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, isActive: !p.isActive } : p
                        ));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Page Title</Label>
                    <Input 
                      value={page.title}
                      onChange={(e) => {
                        setCompanyPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, title: e.target.value } : p
                        ));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Page Content / Description</Label>
                    <Textarea 
                      value={page.content}
                      onChange={(e) => {
                        setCompanyPages(prev => prev.map(p => 
                          p.id === page.id ? { ...p, content: e.target.value } : p
                        ));
                        setHasChanges(true);
                      }}
                      rows={4}
                      placeholder="Enter the page content..."
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Edit Section Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit {selectedSection?.name}</DialogTitle>
          </DialogHeader>
          {selectedSection && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <Label>Section Image</Label>
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center p-4">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload or drag and drop</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG up to 10MB</p>
                  </div>
                </div>
                <Input 
                  placeholder="Or enter image URL"
                  value={selectedSection.imageUrl}
                  onChange={(e) => setSelectedSection({ ...selectedSection, imageUrl: e.target.value })}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Title</Label>
                  <Input 
                    value={selectedSection.title}
                    onChange={(e) => setSelectedSection({ ...selectedSection, title: e.target.value })}
                  />
                </div>
                {selectedSection.subtitle !== undefined && (
                  <div className="space-y-2">
                    <Label>Subtitle</Label>
                    <Input 
                      value={selectedSection.subtitle || ""}
                      onChange={(e) => setSelectedSection({ ...selectedSection, subtitle: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={selectedSection.description}
                  onChange={(e) => setSelectedSection({ ...selectedSection, description: e.target.value })}
                  rows={4}
                />
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Button Text</Label>
                  <Input 
                    value={selectedSection.buttonText || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, buttonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Button Link</Label>
                  <Input 
                    value={selectedSection.buttonLink || ""}
                    onChange={(e) => setSelectedSection({ ...selectedSection, buttonLink: e.target.value })}
                  />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateSection}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Product Dialog */}
      <Dialog open={addProductDialogOpen} onOpenChange={setAddProductDialogOpen}>
        <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Product</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-4">
              <Label>Product Image</Label>
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                <div className="text-center p-4">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to upload</p>
                </div>
              </div>
              <Input 
                placeholder="Or enter image URL"
                value={newProduct.imageUrl}
                onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Product Name</Label>
              <Input 
                value={newProduct.name}
                onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Subtitle / Description</Label>
              <Input 
                value={newProduct.subtitle}
                onChange={(e) => setNewProduct({ ...newProduct, subtitle: e.target.value })}
              />
            </div>

            {/* Colors */}
            <div className="space-y-2">
              <Label>Colors</Label>
              <div className="flex items-center gap-2">
                <input 
                  type="color"
                  value={newColorInput || "#000000"}
                  onChange={(e) => setNewColorInput(e.target.value)}
                  className="w-12 h-10 rounded border border-input cursor-pointer"
                />
                <Input 
                  placeholder="#000000"
                  value={newColorInput}
                  onChange={(e) => setNewColorInput(e.target.value)}
                  className="flex-1"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    if (newColorInput.trim()) {
                      setNewProduct({ ...newProduct, colors: [...newProduct.colors, newColorInput.trim()] });
                      setNewColorInput("");
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newProduct.colors.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProduct.colors.map((color, index) => (
                    <div
                      key={index}
                      className="relative group"
                    >
                      <div
                        className="w-8 h-8 rounded-full border-2 border-muted-foreground/20 cursor-pointer"
                        style={{ backgroundColor: color }}
                        title={color}
                      />
                      <button
                        type="button"
                        onClick={() => setNewProduct({ ...newProduct, colors: newProduct.colors.filter((_, i) => i !== index) })}
                        className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground rounded-full text-xs flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Sizes */}
            <div className="space-y-2">
              <Label>Sizes</Label>
              <div className="flex gap-2">
                <Input 
                  placeholder="Add a size (e.g., S, M, L, XL)"
                  value={newSizeInput}
                  onChange={(e) => setNewSizeInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && newSizeInput.trim()) {
                      e.preventDefault();
                      setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, newSizeInput.trim()] });
                      setNewSizeInput("");
                    }
                  }}
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  size="icon"
                  onClick={() => {
                    if (newSizeInput.trim()) {
                      setNewProduct({ ...newProduct, sizes: [...newProduct.sizes, newSizeInput.trim()] });
                      setNewSizeInput("");
                    }
                  }}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              {newProduct.sizes.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {newProduct.sizes.map((size, index) => (
                    <Badge key={index} variant="secondary" className="gap-1">
                      {size}
                      <button
                        type="button"
                        onClick={() => setNewProduct({ ...newProduct, sizes: newProduct.sizes.filter((_, i) => i !== index) })}
                        className="ml-1 hover:text-destructive"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            {/* Quantity in Stock */}
            <div className="space-y-2">
              <Label>Quantity in Stock</Label>
              <Input 
                type="number"
                min="0"
                value={newProduct.quantity}
                onChange={(e) => setNewProduct({ ...newProduct, quantity: parseInt(e.target.value) || 0 })}
                placeholder="Enter stock quantity"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddProductDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddProduct}>Add Product</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Product Dialog */}
      <Dialog open={editProductDialogOpen} onOpenChange={setEditProductDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Product</DialogTitle>
          </DialogHeader>
          {selectedProduct && (
            <div className="space-y-6 py-4">
              <div className="space-y-4">
                <Label>Product Image</Label>
                <div className="aspect-square bg-muted rounded-lg flex items-center justify-center border-2 border-dashed border-muted-foreground/20">
                  <div className="text-center p-4">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Click to upload</p>
                  </div>
                </div>
                <Input 
                  placeholder="Or enter image URL"
                  value={selectedProduct.imageUrl}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, imageUrl: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Product Name</Label>
                <Input 
                  value={selectedProduct.name}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Subtitle / Description</Label>
                <Input 
                  value={selectedProduct.subtitle}
                  onChange={(e) => setSelectedProduct({ ...selectedProduct, subtitle: e.target.value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditProductDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateProduct}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Service Dialog */}
      <Dialog open={addServiceDialogOpen} onOpenChange={setAddServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Service</DialogTitle>
          </DialogHeader>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label>Service Name</Label>
              <Input 
                value={newService.name}
                onChange={(e) => setNewService({ ...newService, name: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea 
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                rows={3}
              />
            </div>

            <div className="space-y-2">
              <Label>Icon</Label>
              <Input 
                value={newService.icon}
                onChange={(e) => setNewService({ ...newService, icon: e.target.value })}
                placeholder="e.g., sticker, file, book"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddServiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddService}>Add Service</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Service Dialog */}
      <Dialog open={editServiceDialogOpen} onOpenChange={setEditServiceDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
          </DialogHeader>
          {selectedService && (
            <div className="space-y-6 py-4">
              <div className="space-y-2">
                <Label>Service Name</Label>
                <Input 
                  value={selectedService.name}
                  onChange={(e) => setSelectedService({ ...selectedService, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label>Description</Label>
                <Textarea 
                  value={selectedService.description}
                  onChange={(e) => setSelectedService({ ...selectedService, description: e.target.value })}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label>Icon</Label>
                <Input 
                  value={selectedService.icon}
                  onChange={(e) => setSelectedService({ ...selectedService, icon: e.target.value })}
                  placeholder="e.g., sticker, file, book"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditServiceDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateService}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePageEditor;
