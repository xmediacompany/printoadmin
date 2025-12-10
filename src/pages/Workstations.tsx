import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Activity, Clock, User } from "lucide-react";

const workstations = [
  {
    id: "WS-01",
    type: "Digital Press",
    dateOfPurchase: "2022-03-15",
    status: "Active",
    location: "Shuwaikh"
  },
  {
    id: "WS-02",
    type: "Digital Press",
    dateOfPurchase: "2022-03-15",
    status: "Active",
    location: "Mishref"
  },
  {
    id: "WS-03",
    type: "Large Format Printer",
    dateOfPurchase: "2021-08-20",
    status: "Maintenance",
    location: "Salwa"
  },
  {
    id: "WS-04",
    type: "Finishing Station",
    dateOfPurchase: "2023-01-10",
    status: "Active",
    location: "Bayan"
  },
  {
    id: "WS-05",
    type: "Cutting Station",
    dateOfPurchase: "2022-06-05",
    status: "Not Active",
    location: "Surra"
  },
  {
    id: "WS-06",
    type: "Quality Control Desk",
    dateOfPurchase: "2023-05-12",
    status: "Active",
    location: "Shuwaikh"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "default";
    case "Not Active": return "secondary";
    case "Maintenance": return "destructive";
    default: return "secondary";
  }
};

const Workstations = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workstations</h1>
          <p className="text-muted-foreground">Monitor and manage production workstations</p>
        </div>
        <Button>
          Add Workstation
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Workstations</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">6</div>
            <p className="text-xs text-muted-foreground">5 active, 1 idle</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Utilization</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">73%</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Uptime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">37.6 hrs</div>
            <p className="text-xs text-muted-foreground">Today's total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Operators</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">1 unassigned station</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Workstation Status</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">Station ID</th>
                  <th className="text-left p-4 font-medium text-sm">Type</th>
                  <th className="text-left p-4 font-medium text-sm">Date of Purchase</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Location</th>
                </tr>
              </thead>
              <tbody>
                {workstations.map((station) => (
                  <tr key={station.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{station.id}</td>
                    <td className="p-4">{station.type}</td>
                    <td className="p-4">{station.dateOfPurchase}</td>
                    <td className="p-4">
                      <Badge variant={getStatusColor(station.status)}>
                        {station.status}
                      </Badge>
                    </td>
                    <td className="p-4">{station.location}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workstations;
