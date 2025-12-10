import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Upload } from "lucide-react";

export default function AIOrderBot() {
  const [isDragging, setIsDragging] = useState(false);

  const trainingData = [
    {
      title: "Service Pricing Guide",
      type: "Knowledge Base",
      status: "Active",
      lastUpdated: "2024-01-15",
    },
    {
      title: "Customer Service Scripts",
      type: "Intent Training",
      status: "Active",
      lastUpdated: "2024-01-14",
    },
    {
      title: "FAQ Responses",
      type: "Snippets",
      status: "Draft",
      lastUpdated: "2024-01-13",
    },
    {
      title: "Order Process Flow",
      type: "Knowledge Base",
      status: "Active",
      lastUpdated: "2024-01-12",
    },
  ];

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
    // Handle file drop logic here
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">AI Support & Order Bot</h1>
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
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Updated</TableHead>
                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trainingData.map((item) => (
                  <TableRow key={item.title}>
                    <TableCell className="font-medium">{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{getStatusBadge(item.status)}</TableCell>
                    <TableCell>{item.lastUpdated}</TableCell>
                    <TableCell className="text-right">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
