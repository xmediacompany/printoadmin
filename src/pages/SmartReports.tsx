import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Upload, FileSpreadsheet } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function SmartReports() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const reports = [
    {
      title: "Revenue",
      description: "Track revenue trends and performance",
    },
    {
      title: "Item Mix",
      description: "Analyze service distribution and popularity",
    },
    {
      title: "Profitability",
      description: "Monitor profit margins and cost analysis",
    },
    {
      title: "Benchmarks",
      description: "Compare performance against industry standards",
    },
    {
      title: "Saved View: Week",
      description: "Weekly performance overview",
    },
    {
      title: "Saved View: SLA",
      description: "Service level agreement tracking",
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
        setUploadedFile(file);
        toast.success(`File "${file.name}" uploaded successfully`);
      } else {
        toast.error("Please upload a valid Excel or CSV file");
      }
    }
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

      {uploadedFile && (
        <Card className="border-primary/20 bg-primary/5">
          <CardContent className="flex items-center gap-3 py-4">
            <FileSpreadsheet className="h-8 w-8 text-primary" />
            <div className="flex-1">
              <p className="font-medium">{uploadedFile.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedFile.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => setUploadedFile(null)}>
              Remove
            </Button>
          </CardContent>
        </Card>
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
        <Button variant="outline" size="lg">
          Schedule
        </Button>
      </div>
    </div>
  );
}
