import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Monitor, Activity, Clock, User } from "lucide-react";

const workstations = [
  {
    id: "WS-01",
    name: "Digital Press 1",
    operator: "Ahmed Al-Mansoori",
    status: "Active",
    currentJob: "ORD-10234",
    utilization: "87%",
    uptime: "8.2 hrs today"
  },
  {
    id: "WS-02",
    name: "Digital Press 2",
    operator: "Fatima Al-Rashid",
    status: "Active",
    currentJob: "ORD-10233",
    utilization: "92%",
    uptime: "8.5 hrs today"
  },
  {
    id: "WS-03",
    name: "Large Format Printer",
    operator: "Mohammed Al-Ali",
    status: "Active",
    currentJob: "ORD-10230",
    utilization: "78%",
    uptime: "7.8 hrs today"
  },
  {
    id: "WS-04",
    name: "Finishing Station 1",
    operator: "Noura Al-Salem",
    status: "Active",
    currentJob: "ORD-10232",
    utilization: "65%",
    uptime: "6.5 hrs today"
  },
  {
    id: "WS-05",
    name: "Cutting Station",
    operator: "Unassigned",
    status: "Idle",
    currentJob: "-",
    utilization: "12%",
    uptime: "1.2 hrs today"
  },
  {
    id: "WS-06",
    name: "Quality Control Desk",
    operator: "Sara Al-Mutawa",
    status: "Active",
    currentJob: "ORD-10231",
    utilization: "54%",
    uptime: "5.4 hrs today"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Active": return "default";
    case "Idle": return "secondary";
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
                  <th className="text-left p-4 font-medium text-sm">Name</th>
                  <th className="text-left p-4 font-medium text-sm">Operator</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Current Job</th>
                  <th className="text-left p-4 font-medium text-sm">Utilization</th>
                  <th className="text-left p-4 font-medium text-sm">Uptime</th>
                </tr>
              </thead>
              <tbody>
                {workstations.map((station) => (
                  <tr key={station.id} className="border-b hover:bg-muted/30 transition-colors">
                    <td className="p-4 font-medium">{station.id}</td>
                    <td className="p-4">{station.name}</td>
                    <td className="p-4">
                      {station.operator !== "Unassigned" ? (
                        <span>{station.operator}</span>
                      ) : (
                        <span className="text-muted-foreground italic">{station.operator}</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge variant={getStatusColor(station.status)}>
                        {station.status}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {station.currentJob !== "-" ? (
                        <span className="font-medium">{station.currentJob}</span>
                      ) : (
                        <span className="text-muted-foreground">-</span>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-primary transition-all"
                            style={{ width: station.utilization }}
                          />
                        </div>
                        <span className="text-sm font-medium">{station.utilization}</span>
                      </div>
                    </td>
                    <td className="p-4 text-sm">{station.uptime}</td>
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
