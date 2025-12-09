import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet, Calendar as CalendarIcon, X } from "lucide-react";
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
          <Button variant="outline" onClick={triggerFileUpload} className="gap-2">
            <Upload className="h-4 w-4" />
            Upload Spreadsheet
          </Button>
        </div>
      </div>

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
    </div>
  );
}