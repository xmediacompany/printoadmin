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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  ArrowLeft, 
  Save, 
  Plus,
  Edit,
  Trash2,
  Search,
  FileText,
  HelpCircle,
  MessageCircle,
  BookOpen,
  ChevronRight,
  Eye,
  GripVertical
} from "lucide-react";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  content: string;
  category: string;
  status: "published" | "draft";
  views: number;
  lastUpdated: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  articleCount: number;
  isActive: boolean;
}

const HelpCenter = () => {
  const navigate = useNavigate();
  const [hasChanges, setHasChanges] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [addArticleDialogOpen, setAddArticleDialogOpen] = useState(false);
  const [editArticleDialogOpen, setEditArticleDialogOpen] = useState(false);
  const [addCategoryDialogOpen, setAddCategoryDialogOpen] = useState(false);
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  const [categories, setCategories] = useState<Category[]>([
    { id: "cat-1", name: "Getting Started", icon: "book", articleCount: 3, isActive: true },
    { id: "cat-2", name: "Orders & Shipping", icon: "package", articleCount: 5, isActive: true },
    { id: "cat-3", name: "Products & Printing", icon: "printer", articleCount: 4, isActive: true },
    { id: "cat-4", name: "Payments & Refunds", icon: "credit-card", articleCount: 3, isActive: true },
    { id: "cat-5", name: "Account & Settings", icon: "settings", articleCount: 2, isActive: true },
  ]);

  const [articles, setArticles] = useState<Article[]>([
    { id: "art-1", title: "How to place your first order", content: "Step-by-step guide to placing your first custom printing order with PRINTO...", category: "Getting Started", status: "published", views: 1250, lastUpdated: "2 days ago" },
    { id: "art-2", title: "Understanding print formats and sizes", content: "Learn about different paper sizes, print formats, and how to choose the right one...", category: "Getting Started", status: "published", views: 890, lastUpdated: "1 week ago" },
    { id: "art-3", title: "Track your order status", content: "How to track your order from production to delivery...", category: "Orders & Shipping", status: "published", views: 2100, lastUpdated: "3 days ago" },
    { id: "art-4", title: "Shipping options and delivery times", content: "Overview of available shipping methods and estimated delivery times...", category: "Orders & Shipping", status: "published", views: 1560, lastUpdated: "5 days ago" },
    { id: "art-5", title: "Custom design guidelines", content: "Best practices for preparing your custom designs for printing...", category: "Products & Printing", status: "draft", views: 0, lastUpdated: "1 day ago" },
    { id: "art-6", title: "Refund policy explained", content: "Understanding our refund and return policy for printed products...", category: "Payments & Refunds", status: "published", views: 780, lastUpdated: "1 week ago" },
  ]);

  const [newArticle, setNewArticle] = useState({
    title: "",
    content: "",
    category: "",
    status: "draft" as "published" | "draft",
  });

  const [newCategory, setNewCategory] = useState({
    name: "",
    icon: "file",
  });

  const handleSave = () => {
    toast.success("Help center changes saved successfully");
    setHasChanges(false);
  };

  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.category) {
      toast.error("Please fill in required fields");
      return;
    }
    const article: Article = {
      id: `art-${Date.now()}`,
      ...newArticle,
      views: 0,
      lastUpdated: "Just now",
    };
    setArticles(prev => [...prev, article]);
    setNewArticle({ title: "", content: "", category: "", status: "draft" });
    setAddArticleDialogOpen(false);
    setHasChanges(true);
    toast.success("Article added successfully");
  };

  const handleEditArticle = (article: Article) => {
    setSelectedArticle({ ...article });
    setEditArticleDialogOpen(true);
  };

  const handleUpdateArticle = () => {
    if (!selectedArticle) return;
    setArticles(prev => prev.map(a => a.id === selectedArticle.id ? selectedArticle : a));
    setEditArticleDialogOpen(false);
    setSelectedArticle(null);
    setHasChanges(true);
    toast.success("Article updated successfully");
  };

  const handleDeleteArticle = (articleId: string) => {
    setArticles(prev => prev.filter(a => a.id !== articleId));
    setHasChanges(true);
    toast.success("Article deleted");
  };

  const handleAddCategory = () => {
    if (!newCategory.name) {
      toast.error("Please enter a category name");
      return;
    }
    const category: Category = {
      id: `cat-${Date.now()}`,
      name: newCategory.name,
      icon: newCategory.icon,
      articleCount: 0,
      isActive: true,
    };
    setCategories(prev => [...prev, category]);
    setNewCategory({ name: "", icon: "file" });
    setAddCategoryDialogOpen(false);
    setHasChanges(true);
    toast.success("Category added successfully");
  };

  const filteredArticles = articles.filter(article => 
    article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    article.category.toLowerCase().includes(searchQuery.toLowerCase())
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
              <h1 className="text-3xl font-bold">Help Center</h1>
              <Badge>Live</Badge>
            </div>
            <p className="text-muted-foreground">Manage customer support articles and FAQs</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setAddCategoryDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Category
          </Button>
          <Button variant="outline" onClick={() => setAddArticleDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            New Article
          </Button>
          <Button onClick={handleSave} disabled={!hasChanges}>
            <Save className="h-4 w-4 mr-2" />
            Save Changes
          </Button>
        </div>
      </div>

      <Tabs defaultValue="articles" className="space-y-6">
        <TabsList>
          <TabsTrigger value="articles">Articles</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="articles" className="space-y-4">
          {/* Search */}
          <div className="flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search articles..." 
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select defaultValue="all">
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Articles List */}
          <div className="space-y-3">
            {filteredArticles.map((article) => (
              <Card key={article.id} className="hover:shadow-md transition-shadow">
                <CardContent className="flex items-center gap-4 py-4">
                  <div className="cursor-grab">
                    <GripVertical className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium truncate">{article.title}</h3>
                      <Badge variant={article.status === "published" ? "default" : "secondary"}>
                        {article.status}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BookOpen className="h-3 w-3" />
                        {article.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Eye className="h-3 w-3" />
                        {article.views} views
                      </span>
                      <span>Updated {article.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" onClick={() => handleEditArticle(article)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleDeleteArticle(article.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <Card key={category.id} className={!category.isActive ? "opacity-60" : ""}>
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-primary/10 rounded-lg">
                        <BookOpen className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle className="text-base">{category.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{category.articleCount} articles</p>
                      </div>
                    </div>
                    <Switch 
                      checked={category.isActive}
                      onCheckedChange={() => {
                        setCategories(prev => prev.map(c => 
                          c.id === category.id ? { ...c, isActive: !c.isActive } : c
                        ));
                        setHasChanges(true);
                      }}
                    />
                  </div>
                </CardHeader>
                <CardContent>
                  <Button variant="outline" size="sm" className="w-full">
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Category
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

      </Tabs>

      {/* Add Article Dialog */}
      <Dialog open={addArticleDialogOpen} onOpenChange={setAddArticleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>New Article</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input 
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                placeholder="Enter article title"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Category</Label>
                <Select
                  value={newArticle.category}
                  onValueChange={(value) => setNewArticle({ ...newArticle, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((cat) => (
                      <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Status</Label>
                <Select
                  value={newArticle.status}
                  onValueChange={(value: "published" | "draft") => setNewArticle({ ...newArticle, status: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label>Content</Label>
              <Textarea 
                value={newArticle.content}
                onChange={(e) => setNewArticle({ ...newArticle, content: e.target.value })}
                placeholder="Write your article content..."
                rows={8}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddArticleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddArticle}>Create Article</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Article Dialog */}
      <Dialog open={editArticleDialogOpen} onOpenChange={setEditArticleDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Article</DialogTitle>
          </DialogHeader>
          {selectedArticle && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input 
                  value={selectedArticle.title}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, title: e.target.value })}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Category</Label>
                  <Select
                    value={selectedArticle.category}
                    onValueChange={(value) => setSelectedArticle({ ...selectedArticle, category: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat.id} value={cat.name}>{cat.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Status</Label>
                  <Select
                    value={selectedArticle.status}
                    onValueChange={(value: "published" | "draft") => setSelectedArticle({ ...selectedArticle, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Content</Label>
                <Textarea 
                  value={selectedArticle.content}
                  onChange={(e) => setSelectedArticle({ ...selectedArticle, content: e.target.value })}
                  rows={8}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditArticleDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateArticle}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add Category Dialog */}
      <Dialog open={addCategoryDialogOpen} onOpenChange={setAddCategoryDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Category</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Category Name</Label>
              <Input 
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
                placeholder="e.g., Troubleshooting"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddCategoryDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleAddCategory}>Add Category</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default HelpCenter;