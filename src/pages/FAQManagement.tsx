import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft, Plus, Edit, Trash2, Search, Eye, GripVertical, HelpCircle, Download, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: string;
  isPublished: boolean;
  views: number;
  order: number;
}

const categories = ["Orders & Shipping", "Payments", "Products", "Returns & Refunds", "Account", "General"];

const initialFAQs: FAQ[] = [
  {
    id: "1",
    question: "How long does delivery take?",
    answer: "Standard delivery takes 3-5 business days within Kuwait. Express delivery is available for 1-2 business days at an additional cost.",
    category: "Orders & Shipping",
    isPublished: true,
    views: 1250,
    order: 1,
  },
  {
    id: "2",
    question: "What payment methods do you accept?",
    answer: "We accept KNET, Visa, Mastercard, and cash on delivery. All online payments are processed securely through our payment gateway.",
    category: "Payments",
    isPublished: true,
    views: 980,
    order: 2,
  },
  {
    id: "3",
    question: "Can I customize my product?",
    answer: "Yes! We offer full customization on most products including t-shirts, mugs, and stationery. You can upload your own design or use our design tools.",
    category: "Products",
    isPublished: true,
    views: 856,
    order: 3,
  },
  {
    id: "4",
    question: "What is your return policy?",
    answer: "We accept returns within 14 days of delivery for defective or incorrect items. Custom products cannot be returned unless there's a manufacturing defect.",
    category: "Returns & Refunds",
    isPublished: true,
    views: 723,
    order: 4,
  },
  {
    id: "5",
    question: "How do I track my order?",
    answer: "Once your order is shipped, you'll receive an SMS and email with your tracking number. You can also track your order in the 'My Orders' section of your account.",
    category: "Orders & Shipping",
    isPublished: true,
    views: 654,
    order: 5,
  },
  {
    id: "6",
    question: "Do you offer bulk discounts?",
    answer: "Yes, we offer special pricing for bulk orders. Contact our B2B team for custom quotes on orders of 50+ items.",
    category: "General",
    isPublished: false,
    views: 234,
    order: 6,
  },
];

export default function FAQManagement() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [viewingFAQ, setViewingFAQ] = useState<FAQ | null>(null);
  const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
  const [formData, setFormData] = useState({
    question: "",
    answer: "",
    category: "",
    isPublished: true,
  });

  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: faqs.length,
    published: faqs.filter((f) => f.isPublished).length,
    totalViews: faqs.reduce((sum, f) => sum + f.views, 0),
  };

  const handleOpenDialog = (faq?: FAQ) => {
    if (faq) {
      setEditingFAQ(faq);
      setFormData({
        question: faq.question,
        answer: faq.answer,
        category: faq.category,
        isPublished: faq.isPublished,
      });
    } else {
      setEditingFAQ(null);
      setFormData({ question: "", answer: "", category: "", isPublished: true });
    }
    setDialogOpen(true);
  };

  const handleSave = () => {
    if (!formData.question.trim() || !formData.answer.trim() || !formData.category) {
      toast({ title: "Error", description: "Please fill in all fields", variant: "destructive" });
      return;
    }

    if (editingFAQ) {
      setFaqs(faqs.map((f) => (f.id === editingFAQ.id ? { ...f, ...formData } : f)));
      toast({ title: "FAQ Updated", description: "The FAQ has been updated successfully" });
    } else {
      const newFAQ: FAQ = {
        id: Date.now().toString(),
        ...formData,
        views: 0,
        order: faqs.length + 1,
      };
      setFaqs([...faqs, newFAQ]);
      toast({ title: "FAQ Added", description: "New FAQ has been added successfully" });
    }
    setDialogOpen(false);
  };

  const handleDelete = (id: string) => {
    setFaqs(faqs.filter((f) => f.id !== id));
    toast({ title: "FAQ Deleted", description: "The FAQ has been removed" });
  };

  const togglePublish = (id: string) => {
    setFaqs(faqs.map((f) => (f.id === id ? { ...f, isPublished: !f.isPublished } : f)));
  };

  const handleView = (faq: FAQ) => {
    setViewingFAQ(faq);
    setViewDialogOpen(true);
  };

  const handleDownload = () => {
    const exportData = faqs.map(({ id, order, ...rest }) => rest);
    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "faqs-export.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: "Downloaded", description: "FAQs exported successfully" });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate("/customer-service")}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-2xl font-bold">FAQ Management</h1>
          <p className="text-muted-foreground">Create and manage frequently asked questions</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleDownload}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          <Button onClick={() => handleOpenDialog()}>
            <Plus className="h-4 w-4 mr-2" />
            Add FAQ
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total FAQs</CardTitle>
            <HelpCircle className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Published</CardTitle>
            <Eye className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.published}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-full sm:w-[200px]">
            <SelectValue placeholder="Filter by category" />
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

      {/* FAQ List */}
      <Card>
        <CardContent className="p-0">
          <Accordion type="single" collapsible className="w-full">
            {filteredFAQs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id} className="border-b last:border-0">
                <div className="flex items-center px-4">
                  <GripVertical className="h-4 w-4 text-muted-foreground mr-2 cursor-grab" />
                  <AccordionTrigger className="flex-1 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left">
                      <span className="font-medium">{faq.question}</span>
                      <Badge variant={faq.isPublished ? "default" : "secondary"} className="ml-2">
                        {faq.isPublished ? "Published" : "Draft"}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {faq.category}
                      </Badge>
                    </div>
                  </AccordionTrigger>
                  <div className="flex items-center gap-2 ml-4">
                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {faq.views}
                    </span>
                    <Button variant="ghost" size="icon" onClick={() => handleView(faq)}>
                      <ExternalLink className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleOpenDialog(faq)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDelete(faq.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </div>
                <AccordionContent className="px-10 pb-4">
                  <p className="text-muted-foreground">{faq.answer}</p>
                  <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={faq.isPublished}
                        onCheckedChange={() => togglePublish(faq.id)}
                      />
                      <Label className="text-sm">{faq.isPublished ? "Published" : "Draft"}</Label>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>

          {filteredFAQs.length === 0 && (
            <div className="p-8 text-center text-muted-foreground">
              <HelpCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>No FAQs found. Add your first FAQ to get started.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{editingFAQ ? "Edit FAQ" : "Add New FAQ"}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Question</Label>
              <Input
                placeholder="Enter the question..."
                value={formData.question}
                onChange={(e) => setFormData({ ...formData, question: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label>Answer</Label>
              <Textarea
                placeholder="Enter the answer..."
                value={formData.answer}
                onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                rows={5}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={formData.category}
                  onValueChange={(value) => setFormData({ ...formData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <div className="flex items-center gap-2 h-10">
                  <Switch
                    checked={formData.isPublished}
                    onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
                  />
                  <span className="text-sm">{formData.isPublished ? "Published" : "Draft"}</span>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSave}>{editingFAQ ? "Update FAQ" : "Add FAQ"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>FAQ Preview</DialogTitle>
          </DialogHeader>
          {viewingFAQ && (
            <div className="space-y-4 py-4">
              <div className="p-4 bg-muted rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant={viewingFAQ.isPublished ? "default" : "secondary"}>
                    {viewingFAQ.isPublished ? "Published" : "Draft"}
                  </Badge>
                  <Badge variant="outline">{viewingFAQ.category}</Badge>
                  <span className="text-xs text-muted-foreground flex items-center gap-1 ml-auto">
                    <Eye className="h-3 w-3" />
                    {viewingFAQ.views} views
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-3">{viewingFAQ.question}</h3>
                <p className="text-muted-foreground">{viewingFAQ.answer}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => {
              setViewDialogOpen(false);
              if (viewingFAQ) handleOpenDialog(viewingFAQ);
            }}>
              <Edit className="h-4 w-4 mr-2" />
              Edit
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
