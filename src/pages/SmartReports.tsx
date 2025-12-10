import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, Calendar as CalendarIcon, X, Settings, Key, Check } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SavedSpreadsheet {
  id: string;
  title: string;
  fileName: string;
  date: Date;
  size: number;
}

export default function SmartReports() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [savedSpreadsheets, setSavedSpreadsheets] = useState<SavedSpreadsheet[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [apiDialogOpen, setApiDialogOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState<"openai" | "google">("openai");
  const [apiKey, setApiKey] = useState("");
  const [savedApiKeys, setSavedApiKeys] = useState<{ openai: boolean; google: boolean }>({
    openai: false,
    google: false,
  });

  const reports = [
    {
      title: "Revenue",
      description: "Track revenue trends and performance",
    },
    {
      title: "Profitability",
      description: "Monitor profit margins and cost analysis",
    },
    {
      title: "Sales Performance Analysis",
      description: "Analyze sales metrics and conversion rates",
    },
    {
      title: "B2B Monthly Recurring Revenue",
      description: "Track recurring revenue from B2B corporate accounts",
    },
    {
      title: "B2C Monthly Recurring Revenue",
      description: "Track recurring revenue from B2C customers",
    },
    {
      title: "Customer Spend Analysis",
      description: "Analyze customer spending patterns and behavior",
    },
  ];

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const validTypes = [
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        "application/vnd.ms-excel",
        "text/csv",
        "application/vnd.google-apps.spreadsheet",
      ];
      const validExtensions = [".xlsx", ".xls", ".csv"];
      const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase();

      if (validTypes.includes(file.type) || validExtensions.includes(fileExtension)) {
        setPendingFile(file);
        setTitle(file.name.replace(/\.[^/.]+$/, ""));
        setSelectedDate(new Date());
        setDialogOpen(true);
      } else {
        toast.error("Please upload a valid Excel or CSV file");
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSaveSpreadsheet = () => {
    if (!pendingFile || !title.trim() || !selectedDate) {
      toast.error("Please fill in all fields");
      return;
    }

    const newSpreadsheet: SavedSpreadsheet = {
      id: crypto.randomUUID(),
      title: title.trim(),
      fileName: pendingFile.name,
      date: selectedDate,
      size: pendingFile.size,
    };

    setSavedSpreadsheets((prev) => [...prev, newSpreadsheet]);
    toast.success(`"${title}" saved successfully`);
    setDialogOpen(false);
    setPendingFile(null);
    setTitle("");
  };

  const handleRemoveSpreadsheet = (id: string) => {
    setSavedSpreadsheets((prev) => prev.filter((s) => s.id !== id));
    toast.success("Spreadsheet removed");
  };

  const triggerFileUpload = () => {
    fileInputRef.current?.click();
  };

  const handleSaveApiKey = () => {
    if (!apiKey.trim()) {
      toast.error("Please enter an API key");
      return;
    }
    
    // In a real app, you would securely store this key
    setSavedApiKeys((prev) => ({ ...prev, [selectedProvider]: true }));
    toast.success(`${selectedProvider === "openai" ? "OpenAI" : "Google"} API key saved successfully`);
    setApiDialogOpen(false);
    setApiKey("");
  };

  const handleRemoveApiKey = (provider: "openai" | "google") => {
    setSavedApiKeys((prev) => ({ ...prev, [provider]: false }));
    toast.success(`${provider === "openai" ? "OpenAI" : "Google"} API key removed`);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-3xl font-bold">Smart Reports</h1>
        <div className="flex items-center gap-3">
          <Input
            ref={fileInputRef}
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileUpload}
            className="hidden"
          />
          <Button variant="outline" onClick={() => setApiDialogOpen(true)} className="gap-2">
            <Settings className="h-4 w-4" />
            AI Settings
          </Button>
          <Button variant="outline" onClick={triggerFileUpload} className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Spreadsheet
          </Button>
        </div>
      </div>

      {/* AI Configuration Card */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center gap-2">
            <Key className="h-5 w-5" />
            AI Configuration
          </CardTitle>
          <CardDescription>
            Connect OpenAI or Google API to enable AI-powered report analysis
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 rounded-lg border px-4 py-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                savedApiKeys.openai ? "bg-green-500" : "bg-muted-foreground/30"
              )} />
              <span className="text-sm font-medium">OpenAI</span>
              {savedApiKeys.openai ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => handleRemoveApiKey("openai")}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => {
                    setSelectedProvider("openai");
                    setApiDialogOpen(true);
                  }}
                >
                  Add Key
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2 rounded-lg border px-4 py-2">
              <div className={cn(
                "h-2 w-2 rounded-full",
                savedApiKeys.google ? "bg-green-500" : "bg-muted-foreground/30"
              )} />
              <span className="text-sm font-medium">Google AI</span>
              {savedApiKeys.google ? (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => handleRemoveApiKey("google")}
                >
                  Remove
                </Button>
              ) : (
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-6 px-2 text-xs"
                  onClick={() => {
                    setSelectedProvider("google");
                    setApiDialogOpen(true);
                  }}
                >
                  Add Key
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {savedSpreadsheets.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-lg font-semibold">Saved Spreadsheets</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {savedSpreadsheets.map((spreadsheet) => (
              <Card key={spreadsheet.id} className="border-primary/20">
                <CardContent className="flex items-center gap-3 py-4">
                  <FileSpreadsheet className="h-8 w-8 text-primary flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium truncate">{spreadsheet.title}</p>
                    <p className="text-sm text-muted-foreground">
                      {format(spreadsheet.date, "PPP")}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {(spreadsheet.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleRemoveSpreadsheet(spreadsheet.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {reports.map((report) => (
          <Card key={report.title} className="overflow-hidden">
            <CardHeader className="pb-4">
              <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-4">
                <span className="text-muted-foreground text-sm">Chart Placeholder</span>
              </div>
              <CardTitle className="text-lg">{report.title}</CardTitle>
              <CardDescription>{report.description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="flex gap-3 pt-4">
        <Button size="lg">Save View</Button>
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Save Spreadsheet</DialogTitle>
            <DialogDescription>
              Add a title and date for your uploaded spreadsheet.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title for this report"
              />
            </div>
            <div className="space-y-2">
              <Label>Date</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !selectedDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    initialFocus
                    className={cn("p-3 pointer-events-auto")}
                  />
                </PopoverContent>
              </Popover>
            </div>
            {pendingFile && (
              <div className="flex items-center gap-2 rounded-md bg-muted p-3">
                <FileSpreadsheet className="h-5 w-5 text-primary" />
                <span className="text-sm truncate">{pendingFile.name}</span>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveSpreadsheet}>Save</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* API Key Dialog */}
      <Dialog open={apiDialogOpen} onOpenChange={setApiDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add API Key</DialogTitle>
            <DialogDescription>
              Enter your {selectedProvider === "openai" ? "OpenAI" : "Google"} API key to enable AI-powered analysis.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label>Provider</Label>
              <Select
                value={selectedProvider}
                onValueChange={(value: "openai" | "google") => setSelectedProvider(value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="openai">OpenAI</SelectItem>
                  <SelectItem value="google">Google AI</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder={selectedProvider === "openai" ? "sk-..." : "AIza..."}
              />
              <p className="text-xs text-muted-foreground">
                {selectedProvider === "openai" 
                  ? "Get your API key from platform.openai.com" 
                  : "Get your API key from console.cloud.google.com"}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => {
              setApiDialogOpen(false);
              setApiKey("");
            }}>
              Cancel
            </Button>
            <Button onClick={handleSaveApiKey}>Save API Key</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}