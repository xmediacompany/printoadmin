import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Eye, Trash2, Bot, Key, Save } from "lucide-react";
import { toast } from "sonner";

interface TrainingDataItem {
  id: string;
  title: string;
  type: string;
  status: string;
  lastUpdated: string;
  content?: string;
}

export default function AIOrderBot() {
  const [isDragging, setIsDragging] = useState(false);
  const [systemPrompt, setSystemPrompt] = useState("You are a helpful AI assistant for Printo. Help customers with their orders, answer questions about products and services, and provide excellent customer support.");
  const [apiProvider, setApiProvider] = useState<string>("openai");
  const [apiKey, setApiKey] = useState("");
  const [showApiKey, setShowApiKey] = useState(false);
  
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TrainingDataItem | null>(null);

  const [trainingData, setTrainingData] = useState<TrainingDataItem[]>([
    {
      id: "1",
      title: "Service Pricing Guide",
      type: "Knowledge Base",
      status: "Active",
      lastUpdated: "2024-01-15",
      content: "Complete pricing guide for all Printo services including printing, customization, and delivery options.",
    },
    {
      id: "2",
      title: "Customer Service Scripts",
      type: "Intent Training",
      status: "Active",
      lastUpdated: "2024-01-14",
      content: "Standard responses and scripts for common customer inquiries and support scenarios.",
    },
    {
      id: "3",
      title: "FAQ Responses",
      type: "Snippets",
      status: "Draft",
      lastUpdated: "2024-01-13",
      content: "Frequently asked questions and their corresponding answers for quick bot responses.",
    },
    {
      id: "4",
      title: "Order Process Flow",
      type: "Knowledge Base",
      status: "Active",
      lastUpdated: "2024-01-12",
      content: "Step-by-step guide for the order process from placement to delivery.",
    },
  ]);

  const getStatusBadge = (status: string) => {
    return status === "Active" ? (
      <Badge className="bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20">Active</Badge>
    ) : (
      <Badge className="bg-yellow-500/10 text-yellow-700 hover:bg-yellow-500/20">Draft</Badge>
    );
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleView = (item: TrainingDataItem) => {
    setSelectedItem(item);
    setViewDialogOpen(true);
  };

  const handleEdit = (item: TrainingDataItem) => {
    setSelectedItem({ ...item });
    setEditDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTrainingData(trainingData.filter(item => item.id !== id));
    toast.success("Training data deleted successfully");
  };

  const handleUpdateItem = () => {
    if (!selectedItem) return;
    setTrainingData(trainingData.map(item => 
      item.id === selectedItem.id ? { ...selectedItem, lastUpdated: new Date().toISOString().split('T')[0] } : item
    ));
    setEditDialogOpen(false);
    toast.success("Training data updated successfully");
  };

  const handleSaveSystemPrompt = () => {
    toast.success("System prompt saved successfully");
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    toast.success(`${apiProvider === "openai" ? "OpenAI" : "Google"} API key saved successfully`);
    setApiKey("");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Support & Order Bot</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Prompt Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot className="h-5 w-5" />
              System Prompt
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="system-prompt">Bot Instructions</Label>
              <Textarea
                id="system-prompt"
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                placeholder="Enter system prompt for the AI bot..."
                className="min-h-[150px]"
              />
              <p className="text-sm text-muted-foreground">
                Define how the AI bot should behave and respond to customers.
              </p>
            </div>
            <Button onClick={handleSaveSystemPrompt} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save System Prompt
            </Button>
          </CardContent>
        </Card>

        {/* API Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Key className="h-5 w-5" />
              API Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>AI Provider</Label>
              <Select value={apiProvider} onValueChange={setApiProvider}>
                <SelectTrigger>
                  <SelectValue placeholder="Select provider" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="google">Google AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="api-key">
                {apiProvider === "openai" ? "OpenAI API Key" : "Google API Key"}
              </Label>
              <div className="flex gap-2">
                <Input
                  id="api-key"
                  type={showApiKey ? "text" : "password"}
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder={apiProvider === "openai" ? "sk-..." : "AIza..."}
                />
                <Button
                  variant="outline"
                  onClick={() => setShowApiKey(!showApiKey)}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Your API key is encrypted and stored securely.
              </p>
            </div>
            <Button onClick={handleSaveApiKey} className="w-full">
              <Save className="h-4 w-4 mr-2" />
              Save API Key
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <div>
          <p className="text-muted-foreground mb-4">Upload KB, intents, snippets.</p>

          {/* File Upload Area */}
          <Card>
            <CardContent className="p-12">
              <div
                className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                  isDragging
                    ? "border-primary bg-primary/5"
                    : "border-muted-foreground/25 hover:border-muted-foreground/50"
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div className="flex flex-col items-center gap-4">
                  <Upload className="h-12 w-12 text-muted-foreground" />
                  <div className="space-y-2">
                    <p className="text-lg text-foreground">
                      Drag and drop files here, or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Supports: PDF, DOC, TXT, CSV
                    </p>
                  </div>
                  <Button size="lg">Choose Files</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Training Data Table */}
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingData.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleView(item)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleDelete(item.id)} className="text-destructive hover:text-destructive">
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
      </div>

      {/* View Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>{selectedItem?.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex gap-4">
              <div>
                <Label className="text-muted-foreground">Type</Label>
                <p>{selectedItem?.type}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Status</Label>
                <div className="mt-1">{selectedItem && getStatusBadge(selectedItem.status)}</div>
              </div>
              <div>
                <Label className="text-muted-foreground">Last Updated</Label>
                <p>{selectedItem?.lastUpdated}</p>
              </div>
            </div>
            <div>
              <Label className="text-muted-foreground">Content</Label>
              <p className="mt-1 p-3 bg-muted rounded-md">{selectedItem?.content}</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Training Data</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="edit-title">Title</Label>
              <Input
                id="edit-title"
                value={selectedItem?.title || ""}
                onChange={(e) => setSelectedItem(prev => prev ? { ...prev, title: e.target.value } : null)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-type">Type</Label>
              <Select
                value={selectedItem?.type || ""}
                onValueChange={(value) => setSelectedItem(prev => prev ? { ...prev, type: value } : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Knowledge Base">Knowledge Base</SelectItem>
                  <SelectItem value="Intent Training">Intent Training</SelectItem>
                  <SelectItem value="Snippets">Snippets</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-status">Status</Label>
              <Select
                value={selectedItem?.status || ""}
                onValueChange={(value) => setSelectedItem(prev => prev ? { ...prev, status: value } : null)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-content">Content</Label>
              <Textarea
                id="edit-content"
                value={selectedItem?.content || ""}
                onChange={(e) => setSelectedItem(prev => prev ? { ...prev, content: e.target.value } : null)}
                className="min-h-[100px]"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>Cancel</Button>
            <Button onClick={handleUpdateItem}>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
