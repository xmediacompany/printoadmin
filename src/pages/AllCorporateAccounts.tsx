import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Building2, 
  Search, 
  Filter, 
  Eye, 
  Edit,
  Plus,
  ArrowLeft
} from "lucide-react";

interface CorporateAccount {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  contactName: string;
  contactEmail: string;
  paymentTerms: string;
  creditLimit: string;
  status: string;
}

const AllCorporateAccounts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const corporateAccounts: CorporateAccount[] = [
    {
      id: "CA-001",
      companyName: "Tech Solutions Inc.",
      industry: "Technology",
      website: "techsolutions.com",
      contactName: "Ahmed Al-Rashid",
      contactEmail: "ahmed@techsolutions.com",
      paymentTerms: "net30",
      creditLimit: "50000",
      status: "Active",
    },
    {
      id: "CA-002",
      companyName: "Global Marketing Group",
      industry: "Marketing & Advertising",
      website: "globalmarketing.com",
      contactName: "Sara Al-Fahad",
      contactEmail: "sara@globalmarketing.com",
      paymentTerms: "net45",
      creditLimit: "100000",
      status: "Active",
    },
    {
      id: "CA-003",
      companyName: "Design Studio Pro",
      industry: "Marketing & Advertising",
      website: "designstudiopro.com",
      contactName: "Khalid Al-Mutairi",
      contactEmail: "khalid@designstudiopro.com",
      paymentTerms: "net15",
      creditLimit: "20000",
      status: "Pending Review",
    },
  ];

  const filteredAccounts = corporateAccounts.filter((account) => {
    const matchesSearch = account.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      account.contactEmail.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || account.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/b2b-corporate">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold flex items-center gap-2">
              <Building2 className="h-8 w-8 text-primary" />
              All Corporate Accounts
            </h1>
            <p className="text-muted-foreground">View and manage all corporate accounts</p>
          </div>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add New Account
        </Button>
      </div>

      {/* Search and Filter */}
      <div className="flex gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by company, contact name, or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Pending Review">Pending Review</SelectItem>
            <SelectItem value="Inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Accounts Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Company</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Industry</TableHead>
                <TableHead>Payment Terms</TableHead>
                <TableHead>Credit Limit</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredAccounts.length > 0 ? (
                filteredAccounts.map((account) => (
                  <TableRow key={account.id}>
                    <TableCell className="font-medium">{account.id}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-primary" />
                        <div>
                          <div className="font-medium">{account.companyName}</div>
                          <div className="text-xs text-muted-foreground">{account.website}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div>
                        <div className="font-medium">{account.contactName}</div>
                        <div className="text-xs text-muted-foreground">{account.contactEmail}</div>
                      </div>
                    </TableCell>
                    <TableCell>{account.industry}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {account.paymentTerms === "prepaid" ? "Prepaid" : 
                         account.paymentTerms === "net15" ? "Net 15" :
                         account.paymentTerms === "net30" ? "Net 30" :
                         account.paymentTerms === "net45" ? "Net 45" : "Net 60"}
                      </Badge>
                    </TableCell>
                    <TableCell>{account.creditLimit ? `${parseInt(account.creditLimit).toLocaleString()} KD` : "-"}</TableCell>
                    <TableCell>
                      <Badge variant={account.status === "Active" ? "default" : "secondary"}>
                        {account.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No accounts found matching your search criteria
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="text-sm text-muted-foreground">
        Showing {filteredAccounts.length} of {corporateAccounts.length} accounts
      </div>
    </div>
  );
};

export default AllCorporateAccounts;