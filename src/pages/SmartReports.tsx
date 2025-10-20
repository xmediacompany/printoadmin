import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SmartReports() {
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

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Smart Reports</h1>
      </div>

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
