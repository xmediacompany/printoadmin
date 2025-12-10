import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Monitor, Plus, MapPin, Calendar, Wrench } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const initialWorkstations = [
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

const workstationTypes = [
  "Digital Press",
  "Large Format Printer",
  "Finishing Station",
  "Cutting Station",
  "Quality Control Desk",
  "Binding Machine",
  "Laminating Machine",
  "Embossing Station"
];

const kuwaitLocations = [
  "Shuwaikh",
  "Mishref",
  "Salwa",
  "Bayan",
  "Surra",
  "Hawally",
  "Salmiya",
  "Jabriya",
  "Farwaniya",
  "Fahaheel"
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
  const [workstations, setWorkstations] = useState(initialWorkstations);
  const [statusFilter, setStatusFilter] = useState("all");
  const [yearFilter, setYearFilter] = useState("all");
  const [addDialogOpen, setAddDialogOpen] = useState(false);
  const [purchaseDate, setPurchaseDate] = useState<Date | undefined>(undefined);
  const [newWorkstation, setNewWorkstation] = useState({
    type: "",
    status: "Active",
    location: ""
  });

  const filteredWorkstations = workstations.filter((station) => {
    const matchesStatus = statusFilter === "all" || station.status === statusFilter;
    const matchesYear = yearFilter === "all" || station.dateOfPurchase.startsWith(yearFilter);
    return matchesStatus && matchesYear;
  });

  const handleAddWorkstation = () => {
    if (!newWorkstation.type || !newWorkstation.location || !purchaseDate) {
      toast.error("Please fill in all required fields");
      return;
    }

    const newId = `WS-${String(workstations.length + 1).padStart(2, '0')}`;
    const workstationToAdd = {
      id: newId,
      type: newWorkstation.type,
      dateOfPurchase: format(purchaseDate, "yyyy-MM-dd"),
      status: newWorkstation.status,
      location: newWorkstation.location
    };

    setWorkstations([...workstations, workstationToAdd]);
    setAddDialogOpen(false);
    setNewWorkstation({ type: "", status: "Active", location: "" });
    setPurchaseDate(undefined);
    toast.success("Workstation added successfully!");
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Workstations</h1>
          <p className="text-muted-foreground">Monitor and manage production workstations</p>
        </div>
        <Button onClick={() => setAddDialogOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Add Workstation
        </Button>
      </div>

      {/* Add Workstation Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Monitor className="h-5 w-5 text-primary" />
              Add New Workstation
            </DialogTitle>
            <DialogDescription>
              Fill in the details to add a new workstation to your inventory.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-4">
            {/* Workstation Type */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Wrench className="h-4 w-4 text-muted-foreground" />
                Workstation Type *
              </Label>
              <Select 
                value={newWorkstation.type} 
                onValueChange={(value) => setNewWorkstation({ ...newWorkstation, type: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select workstation type" />
                </SelectTrigger>
                <SelectContent>
                  {workstationTypes.map((type) => (
                    <SelectItem key={type} value={type}>{type}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Date of Purchase */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                Date of Purchase *
              </Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !purchaseDate && "text-muted-foreground"
                    )}
                  >
                    <Calendar className="mr-2 h-4 w-4" />
                    {purchaseDate ? format(purchaseDate, "PPP") : "Select purchase date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <CalendarComponent
                    mode="single"
                    selected={purchaseDate}
                    onSelect={setPurchaseDate}
                    disabled={(date) => date > new Date()}
                    initialFocus
                    className="pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label>Status *</Label>
              <Select 
                value={newWorkstation.status} 
                onValueChange={(value) => setNewWorkstation({ ...newWorkstation, status: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-green-500" />
                      Active
                    </div>
                  </SelectItem>
                  <SelectItem value="Not Active">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-gray-400" />
                      Not Active
                    </div>
                  </SelectItem>
                  <SelectItem value="Maintenance">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-red-500" />
                      Maintenance
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                Location *
              </Label>
              <Select 
                value={newWorkstation.location} 
                onValueChange={(value) => setNewWorkstation({ ...newWorkstation, location: value })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select location in Kuwait" />
                </SelectTrigger>
                <SelectContent>
                  {kuwaitLocations.map((location) => (
                    <SelectItem key={location} value={location}>{location}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddWorkstation}>
              <Plus className="h-4 w-4 mr-2" />
              Add Workstation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="grid gap-4 md:grid-cols-2">
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
            <CardTitle className="text-sm font-medium">Active Workstations</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">1 not active, 1 maintenance</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <CardTitle>Workstation Status</CardTitle>
            <div className="flex gap-2">
              <Select value={yearFilter} onValueChange={setYearFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Date of Purchase" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Years</SelectItem>
                  <SelectItem value="2023">2023</SelectItem>
                  <SelectItem value="2022">2022</SelectItem>
                  <SelectItem value="2021">2021</SelectItem>
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Not Active">Not Active</SelectItem>
                  <SelectItem value="Maintenance">Maintenance</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
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
                {filteredWorkstations.map((station) => (
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
                {filteredWorkstations.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No workstations found matching the filters
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Workstations;
