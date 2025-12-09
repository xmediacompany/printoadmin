import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
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
  Plus, 
  Trash2, 
  Edit, 
  GripVertical,
  Image,
  Type,
  Layout,
  Megaphone,
  ShoppingBag,
  Star,
  ChevronUp,
  ChevronDown,
  ExternalLink,
  Upload
} from "lucide-react";
import { toast } from "sonner";

interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imageUrl: string;
  isActive: boolean;
}

interface Banner {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
  position: "top" | "middle" | "bottom";
  isActive: boolean;
}

interface FeaturedSection {
  id: string;
  type: "products" | "categories" | "testimonials" | "usp";
  title: string;
  isActive: boolean;
  order: number;
}

const HomePageEditor = () => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [addSlideDialogOpen, setAddSlideDialogOpen] = useState(false);
  const [editSlideDialogOpen, setEditSlideDialogOpen] = useState(false);
  const [selectedSlide, setSelectedSlide] = useState<HeroSlide | null>(null);

  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([
    {
      id: "slide-1",
      title: "Premium Quality Printing",
      subtitle: "Fast delivery across Kuwait with exceptional quality",
      buttonText: "Shop Now",
      buttonLink: "/products",
      imageUrl: "/hero-1.jpg",
      isActive: true,
    },
    {
      id: "slide-2",
      title: "Business Cards Special",
      subtitle: "Get 500 cards for just 5 KD - Limited time offer",
      buttonText: "Order Now",
      buttonLink: "/business-cards",
      imageUrl: "/hero-2.jpg",
      isActive: true,
    },
    {
      id: "slide-3",
      title: "Custom T-Shirts",
      subtitle: "Design your own or choose from our templates",
      buttonText: "Start Designing",
      buttonLink: "/custom-tshirts",
      imageUrl: "/hero-3.jpg",
      isActive: false,
    },
  ]);

  const [banners, setBanners] = useState<Banner[]>([
    {
      id: "banner-1",
      title: "Free Shipping",
      description: "On orders above 20 KD",
      imageUrl: "/banner-shipping.jpg",
      link: "/shipping",
      position: "top",
      isActive: true,
    },
    {
      id: "banner-2",
      title: "Summer Sale",
      description: "Up to 30% off on selected items",
      imageUrl: "/banner-sale.jpg",
      link: "/sale",
      position: "middle",
      isActive: true,
    },
  ]);

  const [featuredSections, setFeaturedSections] = useState<FeaturedSection[]>([
    { id: "sec-1", type: "products", title: "Featured Products", isActive: true, order: 1 },
    { id: "sec-2", type: "categories", title: "Shop by Category", isActive: true, order: 2 },
    { id: "sec-3", type: "usp", title: "Why Choose Us", isActive: true, order: 3 },
    { id: "sec-4", type: "testimonials", title: "Customer Reviews", isActive: false, order: 4 },
  ]);

  const [newSlide, setNewSlide] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    imageUrl: "",
  });

  const handleSave = () => {
    toast.success("Home page changes saved successfully");
    setHasChanges(false);
  };

  const handlePreview = () => {
    toast.info("Opening preview in new tab...");
  };

  const handleToggleSlide = (slideId: string) => {
    setHeroSlides(prev => prev.map(slide => 
      slide.id === slideId ? { ...slide, isActive: !slide.isActive } : slide
    ));
    setHasChanges(true);
  };

  const handleDeleteSlide = (slideId: string) => {
    setHeroSlides(prev => prev.filter(slide => slide.id !== slideId));
    setHasChanges(true);
    toast.success("Slide deleted");
  };

  const handleAddSlide = () => {
    if (!newSlide.title) {
      toast.error("Please enter a slide title");
      return;
    }
    const slide: HeroSlide = {
      id: `slide-${Date.now()}`,
      ...newSlide,
      isActive: true,
    };
    setHeroSlides(prev => [...prev, slide]);
    setNewSlide({ title: "", subtitle: "", buttonText: "", buttonLink: "", imageUrl: "" });
    setAddSlideDialogOpen(false);
    setHasChanges(true);
    toast.success("Slide added successfully");
  };

  const handleEditSlide = (slide: HeroSlide) => {
    setSelectedSlide(slide);
    setEditSlideDialogOpen(true);
  };

  const handleUpdateSlide = () => {
    if (!selectedSlide) return;
    setHeroSlides(prev => prev.map(slide => 
      slide.id === selectedSlide.id ? selectedSlide : slide
    ));
    setEditSlideDialogOpen(false);
    setSelectedSlide(null);
    setHasChanges(true);
    toast.success("Slide updated");
  };

  const handleToggleBanner = (bannerId: string) => {
    setBanners(prev => prev.map(banner => 
      banner.id === bannerId ? { ...banner, isActive: !banner.isActive } : banner
    ));
    setHasChanges(true);
  };

  const handleToggleSection = (sectionId: string) => {
    setFeaturedSections(prev => prev.map(section => 
      section.id === sectionId ? { ...section, isActive: !section.isActive } : section
    ));
    setHasChanges(true);
  };

  const handleMoveSection = (sectionId: string, direction: "up" | "down") => {
    const index = featuredSections.findIndex(s => s.id === sectionId);
    if ((direction === "up" && index === 0) || (direction === "down" && index === featuredSections.length - 1)) {
      return;
    }
    const newSections = [...featuredSections];
    const swapIndex = direction === "up" ? index - 1 : index + 1;
    [newSections[index], newSections[swapIndex]] = [newSections[swapIndex], newSections[index]];
    newSections.forEach((s, i) => s.order = i + 1);
    setFeaturedSections(newSections);
    setHasChanges(true);
  };

  const getSectionIcon = (type: string) => {
    switch (type) {
      case "products": return <ShoppingBag className="h-4 w-4" />;
      case "categories": return <Layout className="h-4 w-4" />;
      case "testimonials": return <Star className="h-4 w-4" />;
      case "usp": return <Megaphone className="h-4 w-4" />;
      default: return <Layout className="h-4 w-4" />;
    }
  };

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
        <TabsList>
          <TabsTrigger value="hero" className="gap-2">
            <Image className="h-4 w-4" />
            Hero Slider
          </TabsTrigger>
          <TabsTrigger value="banners" className="gap-2">
            <Megaphone className="h-4 w-4" />
            Banners
          </TabsTrigger>
          <TabsTrigger value="sections" className="gap-2">
            <Layout className="h-4 w-4" />
            Page Sections
          </TabsTrigger>
          <TabsTrigger value="seo" className="gap-2">
            <Type className="h-4 w-4" />
            SEO Settings
          </TabsTrigger>
        </TabsList>

        {/* Hero Slider Tab */}
        <TabsContent value="hero" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Hero Slider</h2>
              <p className="text-muted-foreground">Manage the main banner slides on your home page</p>
            </div>
            <Button onClick={() => setAddSlideDialogOpen(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Slide
            </Button>
          </div>

          <div className="space-y-4">
            {heroSlides.map((slide, index) => (
              <Card key={slide.id} className={!slide.isActive ? "opacity-60" : ""}>
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-5 w-5 cursor-grab" />
                      <span className="text-sm font-medium w-6">{index + 1}</span>
                    </div>
                    
                    <div className="w-32 h-20 bg-muted rounded-lg flex items-center justify-center overflow-hidden">
                      <Image className="h-8 w-8 text-muted-foreground" />
                    </div>

                    <div className="flex-1 space-y-1">
                      <h3 className="font-semibold">{slide.title}</h3>
                      <p className="text-sm text-muted-foreground line-clamp-1">{slide.subtitle}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">{slide.buttonText}</Badge>
                        <span className="text-xs text-muted-foreground">{slide.buttonLink}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2">
                        <Label htmlFor={`slide-${slide.id}`} className="text-sm">Active</Label>
                        <Switch 
                          id={`slide-${slide.id}`}
                          checked={slide.isActive}
                          onCheckedChange={() => handleToggleSlide(slide.id)}
                        />
                      </div>
                      <Button variant="outline" size="sm" onClick={() => handleEditSlide(slide)}>
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="sm" className="text-destructive" onClick={() => handleDeleteSlide(slide.id)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {heroSlides.length === 0 && (
            <Card className="border-dashed">
              <CardContent className="p-8 text-center">
                <Image className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="font-semibold mb-2">No slides yet</h3>
                <p className="text-sm text-muted-foreground mb-4">Add your first hero slide to get started</p>
                <Button onClick={() => setAddSlideDialogOpen(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add First Slide
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Banners Tab */}
        <TabsContent value="banners" className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Promotional Banners</h2>
              <p className="text-muted-foreground">Manage promotional banners displayed across the home page</p>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Banner
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {banners.map((banner) => (
              <Card key={banner.id} className={!banner.isActive ? "opacity-60" : ""}>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <Badge variant="outline">{banner.position}</Badge>
                    <Switch 
                      checked={banner.isActive}
                      onCheckedChange={() => handleToggleBanner(banner.id)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="aspect-[3/1] bg-muted rounded-lg flex items-center justify-center">
                    <Image className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{banner.title}</h3>
                    <p className="text-sm text-muted-foreground">{banner.description}</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <ExternalLink className="h-3 w-3" />
                    <span>{banner.link}</span>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-destructive">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Page Sections Tab */}
        <TabsContent value="sections" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">Page Sections</h2>
            <p className="text-muted-foreground">Arrange and toggle sections on your home page</p>
          </div>

          <Card>
            <CardContent className="p-0">
              <div className="divide-y">
                {featuredSections.sort((a, b) => a.order - b.order).map((section, index) => (
                  <div 
                    key={section.id} 
                    className={`flex items-center gap-4 p-4 ${!section.isActive ? "opacity-60 bg-muted/30" : ""}`}
                  >
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GripVertical className="h-5 w-5 cursor-grab" />
                    </div>

                    <div className={`p-2 rounded-lg ${section.isActive ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}>
                      {getSectionIcon(section.type)}
                    </div>

                    <div className="flex-1">
                      <h3 className="font-medium">{section.title}</h3>
                      <p className="text-sm text-muted-foreground capitalize">{section.type} section</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        disabled={index === 0}
                        onClick={() => handleMoveSection(section.id, "up")}
                      >
                        <ChevronUp className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="icon" 
                        disabled={index === featuredSections.length - 1}
                        onClick={() => handleMoveSection(section.id, "down")}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-3">
                      <Switch 
                        checked={section.isActive}
                        onCheckedChange={() => handleToggleSection(section.id)}
                      />
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Button variant="outline" className="w-full border-dashed">
            <Plus className="h-4 w-4 mr-2" />
            Add New Section
          </Button>
        </TabsContent>

        {/* SEO Settings Tab */}
        <TabsContent value="seo" className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold">SEO Settings</h2>
            <p className="text-muted-foreground">Optimize your home page for search engines</p>
          </div>

          <Card>
            <CardContent className="space-y-6 pt-6">
              <div className="space-y-2">
                <Label htmlFor="meta-title">Meta Title</Label>
                <Input 
                  id="meta-title" 
                  placeholder="Printo - Premium Printing Services in Kuwait"
                  defaultValue="Printo - Premium Printing Services in Kuwait"
                  onChange={() => setHasChanges(true)}
                />
                <p className="text-xs text-muted-foreground">Recommended: 50-60 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-description">Meta Description</Label>
                <Textarea 
                  id="meta-description" 
                  placeholder="High-quality printing services including business cards, brochures, banners, and custom products. Fast delivery across Kuwait."
                  defaultValue="High-quality printing services including business cards, brochures, banners, and custom products. Fast delivery across Kuwait."
                  rows={3}
                  onChange={() => setHasChanges(true)}
                />
                <p className="text-xs text-muted-foreground">Recommended: 150-160 characters</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="meta-keywords">Keywords</Label>
                <Input 
                  id="meta-keywords" 
                  placeholder="printing, business cards, brochures, Kuwait, custom printing"
                  defaultValue="printing, business cards, brochures, Kuwait, custom printing"
                  onChange={() => setHasChanges(true)}
                />
              </div>

              <div className="border-t pt-6 space-y-4">
                <h3 className="font-semibold">Open Graph (Social Sharing)</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="og-title">OG Title</Label>
                  <Input 
                    id="og-title" 
                    placeholder="Printo - Your Print Partner in Kuwait"
                    defaultValue="Printo - Your Print Partner in Kuwait"
                    onChange={() => setHasChanges(true)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>OG Image</Label>
                  <div className="border-2 border-dashed rounded-lg p-6 text-center">
                    <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm text-muted-foreground">Drag & drop or click to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Recommended: 1200 x 630 pixels</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Add Slide Dialog */}
      <Dialog open={addSlideDialogOpen} onOpenChange={setAddSlideDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Add New Slide</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="slide-title">Title *</Label>
              <Input
                id="slide-title"
                placeholder="Enter slide title"
                value={newSlide.title}
                onChange={(e) => setNewSlide({ ...newSlide, title: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slide-subtitle">Subtitle</Label>
              <Textarea
                id="slide-subtitle"
                placeholder="Enter slide subtitle"
                value={newSlide.subtitle}
                onChange={(e) => setNewSlide({ ...newSlide, subtitle: e.target.value })}
                rows={2}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="slide-button-text">Button Text</Label>
                <Input
                  id="slide-button-text"
                  placeholder="e.g., Shop Now"
                  value={newSlide.buttonText}
                  onChange={(e) => setNewSlide({ ...newSlide, buttonText: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="slide-button-link">Button Link</Label>
                <Input
                  id="slide-button-link"
                  placeholder="e.g., /products"
                  value={newSlide.buttonLink}
                  onChange={(e) => setNewSlide({ ...newSlide, buttonLink: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Slide Image</Label>
              <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">Click to upload image</p>
                <p className="text-xs text-muted-foreground mt-1">Recommended: 1920 x 600 pixels</p>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddSlideDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddSlide}>
              Add Slide
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Slide Dialog */}
      <Dialog open={editSlideDialogOpen} onOpenChange={setEditSlideDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Slide</DialogTitle>
          </DialogHeader>
          {selectedSlide && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-slide-title">Title *</Label>
                <Input
                  id="edit-slide-title"
                  value={selectedSlide.title}
                  onChange={(e) => setSelectedSlide({ ...selectedSlide, title: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slide-subtitle">Subtitle</Label>
                <Textarea
                  id="edit-slide-subtitle"
                  value={selectedSlide.subtitle}
                  onChange={(e) => setSelectedSlide({ ...selectedSlide, subtitle: e.target.value })}
                  rows={2}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="edit-slide-button-text">Button Text</Label>
                  <Input
                    id="edit-slide-button-text"
                    value={selectedSlide.buttonText}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, buttonText: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="edit-slide-button-link">Button Link</Label>
                  <Input
                    id="edit-slide-button-link"
                    value={selectedSlide.buttonLink}
                    onChange={(e) => setSelectedSlide({ ...selectedSlide, buttonLink: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Slide Image</Label>
                <div className="border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors">
                  <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                  <p className="text-sm text-muted-foreground">Click to change image</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditSlideDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateSlide}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HomePageEditor;
