import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Layout, 
  Image, 
  Globe, 
  ShoppingBag, 
  FormInput, 
  GitBranch,
  Plus,
  Edit,
  Eye,
  Calendar,
  Languages,
  Megaphone,
  Tag,
  Mail,
  FileQuestion
} from "lucide-react";

const CMS = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Website CMS Management Console</h1>
          <p className="text-muted-foreground">Publish and optimize your public site without developer help</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create New Page
        </Button>
      </div>

      <Tabs defaultValue="pages" className="space-y-6">
        <TabsList>
          <TabsTrigger value="pages">Page Builder</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="merchandising">Merchandising</TabsTrigger>
          <TabsTrigger value="forms">Forms & Leads</TabsTrigger>
          <TabsTrigger value="workflow">Publishing Workflow</TabsTrigger>
        </TabsList>

        {/* Page Builder Tab */}
        <TabsContent value="pages" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Layout className="h-8 w-8 text-primary" />
                  <Badge>Live</Badge>
                </div>
                <CardTitle className="mt-4">Home Page</CardTitle>
                <CardDescription>Main landing page with hero slider</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last updated: 2 hours ago
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <FileText className="h-8 w-8 text-primary" />
                  <Badge variant="secondary">Draft</Badge>
                </div>
                <CardTitle className="mt-4">Manage Products</CardTitle>
                <CardDescription>Edit and modify titles, images, and categories</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  Last updated: 1 day ago
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    Preview
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Globe className="h-8 w-8 text-primary" />
                  <Badge>Live</Badge>
                </div>
                <CardTitle className="mt-4">Manage Printing Services</CardTitle>
                <CardDescription>Edit and modify titles, paper sizes, bindings, academic works</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="text-sm text-muted-foreground">
                  12 pages active
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                  <Button variant="outline" size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Add New
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Page Components</CardTitle>
              <CardDescription>Reusable blocks for page building</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="border rounded-lg p-4 space-y-2">
                  <Layout className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Hero Sliders</h4>
                  <p className="text-sm text-muted-foreground">8 templates</p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <Image className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Banners</h4>
                  <p className="text-sm text-muted-foreground">15 templates</p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <FileText className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">USP Rows</h4>
                  <p className="text-sm text-muted-foreground">6 templates</p>
                </div>
                <div className="border rounded-lg p-4 space-y-2">
                  <ShoppingBag className="h-6 w-6 text-primary" />
                  <h4 className="font-semibold">Product Grids</h4>
                  <p className="text-sm text-muted-foreground">10 templates</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Content Tab */}
        <TabsContent value="content" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Blog & Articles</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Post
                  </Button>
                </div>
                <CardDescription>Manage blog content and articles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Top 10 Printing Tips</h4>
                      <p className="text-sm text-muted-foreground">Published 3 days ago</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Business Card Design Guide</h4>
                      <p className="text-sm text-muted-foreground">Draft</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Help Center</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Article
                  </Button>
                </div>
                <CardDescription>Customer support documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">How to Upload Files</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">45 views</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <FileQuestion className="h-4 w-4 text-primary" />
                        <h4 className="font-semibold">Order Tracking Guide</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">128 views</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Policy Pages</CardTitle>
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4 mr-1" />
                    Manage
                  </Button>
                </div>
                <CardDescription>Legal and policy documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Privacy Policy</span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Terms & Conditions</span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Return Policy</span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Shipping Information</span>
                    <Badge variant="secondary">Live</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Languages className="h-5 w-5" />
                      Multilingual Content
                    </div>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    Settings
                  </Button>
                </div>
                <CardDescription>Manage EN/AR translations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">English (EN)</h4>
                      <p className="text-sm text-muted-foreground">Primary language</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <h4 className="font-semibold">Arabic (AR)</h4>
                      <p className="text-sm text-muted-foreground">85% translated</p>
                    </div>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>
                  <div className="flex items-center gap-2">
                    <Image className="h-5 w-5" />
                    Media Library
                  </div>
                </CardTitle>
                <Button size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Upload Media
                </Button>
              </div>
              <CardDescription>Images, videos, and documents</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="aspect-square bg-muted rounded-lg flex items-center justify-center">
                    <Image className="h-6 w-6 text-muted-foreground" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Merchandising Tab */}
        <TabsContent value="merchandising" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Collections</CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Collection
                  </Button>
                </div>
                <CardDescription>Product groupings and categories</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Business Essentials</h4>
                      <p className="text-sm text-muted-foreground">24 products</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Marketing Materials</h4>
                      <p className="text-sm text-muted-foreground">18 products</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Promotional Products</h4>
                      <p className="text-sm text-muted-foreground">32 products</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Sorting Rules</CardTitle>
                  <Button size="sm" variant="outline">
                    Configure
                  </Button>
                </div>
                <CardDescription>Product display ordering</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Best Selling</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Price: Low to High</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Recently Added</span>
                    <Badge variant="outline">Available</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50">
                    <span className="text-sm">Featured First</span>
                    <Badge variant="secondary">Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Megaphone className="h-5 w-5" />
                      Promotions
                    </div>
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    New Promo
                  </Button>
                </div>
                <CardDescription>Active campaigns and offers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg border-primary/20 bg-primary/5">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">Summer Sale 2024</h4>
                        <Badge>Active</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">20% off • Ends in 5 days</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">First Order Discount</h4>
                        <Badge variant="secondary">Scheduled</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">15% off • Starts in 2 days</p>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Tag className="h-5 w-5" />
                      Coupons
                    </div>
                  </CardTitle>
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" />
                    Create Coupon
                  </Button>
                </div>
                <CardDescription>Discount codes and vouchers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold font-mono">PRINT20</h4>
                      <p className="text-sm text-muted-foreground">Used 45 times</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold font-mono">WELCOME15</h4>
                      <p className="text-sm text-muted-foreground">Used 128 times</p>
                    </div>
                    <Badge>Active</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Upsells & Cross-sells</CardTitle>
              <CardDescription>Product recommendations and bundles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">Business Card Bundle</h4>
                    <p className="text-sm text-muted-foreground">
                      When buying Business Cards → Suggest Letterhead + Envelopes
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">12 conversions</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">Marketing Combo</h4>
                    <p className="text-sm text-muted-foreground">
                      When buying Flyers → Suggest Posters + Banners
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">8 conversions</Badge>
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Forms & Lead Capture Tab */}
        <TabsContent value="forms" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <FormInput className="h-5 w-5" />
                      Quote Forms
                    </div>
                  </CardTitle>
                  <Button size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Edit Form
                  </Button>
                </div>
                <CardDescription>Custom quote request forms</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">General Quote Form</h4>
                      <p className="text-sm text-muted-foreground">234 submissions this month</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">B2B Custom Quote</h4>
                      <p className="text-sm text-muted-foreground">67 submissions this month</p>
                    </div>
                    <Button variant="outline" size="sm">View</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>
                    <div className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Newsletter
                    </div>
                  </CardTitle>
                  <Button size="sm" variant="outline">
                    Settings
                  </Button>
                </div>
                <CardDescription>Email subscription management</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">1,234</div>
                      <div className="text-sm text-muted-foreground">Total Subscribers</div>
                    </div>
                    <div className="p-4 bg-muted rounded-lg">
                      <div className="text-2xl font-bold">+48</div>
                      <div className="text-sm text-muted-foreground">This Week</div>
                    </div>
                  </div>
                  <div className="pt-2">
                    <Button variant="outline" className="w-full">
                      Export Subscriber List
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>B2B Inquiries</CardTitle>
                  <Button size="sm">
                    View All
                  </Button>
                </div>
                <CardDescription>Business partnership requests</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">ABC Corporation</h4>
                      <p className="text-sm text-muted-foreground">Bulk printing inquiry • 2 hours ago</p>
                    </div>
                    <Badge>New</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">XYZ Marketing Agency</h4>
                      <p className="text-sm text-muted-foreground">Partnership inquiry • 1 day ago</p>
                    </div>
                    <Badge variant="secondary">In Review</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex-1">
                      <h4 className="font-semibold">Design Studio Pro</h4>
                      <p className="text-sm text-muted-foreground">Reseller inquiry • 3 days ago</p>
                    </div>
                    <Badge variant="outline">Responded</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Form Analytics</CardTitle>
                <CardDescription>Performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Conversion Rate</span>
                    <span className="text-lg font-bold text-primary">24.5%</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Avg. Response Time</span>
                    <span className="text-lg font-bold text-primary">2.3h</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">Monthly Leads</span>
                    <span className="text-lg font-bold text-primary">456</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Publishing Workflow Tab */}
        <TabsContent value="workflow" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Draft</CardTitle>
                  <Badge variant="secondary">8</Badge>
                </div>
                <CardDescription>Work in progress</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">New Product Launch</h4>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Updated 1h ago</p>
                  </div>
                  <div className="p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">Q4 Promotions Page</h4>
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <p className="text-xs text-muted-foreground">Updated 3h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>In Review</CardTitle>
                  <Badge variant="secondary">3</Badge>
                </div>
                <CardDescription>Pending approval</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">Summer Sale Landing</h4>
                      <Eye className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted by John • 2h ago</p>
                  </div>
                  <div className="p-3 border border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950 rounded-lg hover:bg-amber-100 dark:hover:bg-amber-900 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">Blog: Design Tips</h4>
                      <Eye className="h-4 w-4 text-amber-600" />
                    </div>
                    <p className="text-xs text-muted-foreground">Submitted by Sarah • 5h ago</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Scheduled</CardTitle>
                  <Badge variant="secondary">5</Badge>
                </div>
                <CardDescription>Ready to publish</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg hover:bg-primary/10 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">Black Friday Campaign</h4>
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Publishing Nov 25, 12:00 AM</p>
                  </div>
                  <div className="p-3 border border-primary/20 bg-primary/5 rounded-lg hover:bg-primary/10 cursor-pointer">
                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-semibold text-sm">Holiday Collection</h4>
                      <Calendar className="h-4 w-4 text-primary" />
                    </div>
                    <p className="text-xs text-muted-foreground">Publishing Dec 1, 9:00 AM</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <GitBranch className="h-5 w-5" />
                  Workflow Settings
                </div>
              </CardTitle>
              <CardDescription>Configure approval process and roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">Role-Based Approvals</h4>
                    <p className="text-sm text-muted-foreground">
                      Content Editor → Marketing Manager → Admin
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">Auto-Publishing</h4>
                    <p className="text-sm text-muted-foreground">
                      Automatically publish approved content at scheduled time
                    </p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-semibold">Version Control</h4>
                    <p className="text-sm text-muted-foreground">
                      Keep history of all content changes
                    </p>
                  </div>
                  <Badge variant="secondary">Enabled</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Content publishing history</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-start gap-3 p-3 border-l-2 border-primary">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Home Page Updated</h4>
                    <p className="text-xs text-muted-foreground">Published by Admin • 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-2 border-muted">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Blog Post Published</h4>
                    <p className="text-xs text-muted-foreground">Published by Sarah • 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 border-l-2 border-muted">
                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">Collection Page Created</h4>
                    <p className="text-xs text-muted-foreground">Published by John • Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CMS;