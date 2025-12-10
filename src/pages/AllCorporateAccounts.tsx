import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Building2, 
  Search, 
  Filter, 
  Edit,
  Plus,
  ArrowLeft,
  Briefcase,
  Users,
  Globe,
  MapPin,
  Mail,
  Phone,
  CreditCard,
  FileText,
  Upload,
  X,
  Trash2
} from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { toast } from "@/hooks/use-toast";

interface CorporateAccount {
  id: string;
  companyName: string;
  industry: string;
  website: string;
  address?: string;
  contactName: string;
  contactEmail: string;
  contactPhone?: string;
  paymentTerms: string;
  creditLimit: string;
  status: string;
  tier?: string;
  notes?: string;
}

const industries = [
  "Technology",
  "Marketing & Advertising",
  "Healthcare",
  "Finance & Banking",
  "Retail",
  "Manufacturing",
  "Education",
  "Real Estate",
  "Hospitality",
  "Government",
  "Other",
];

const accountManagers = [
  "John Davis",
  "Sarah Mitchell",
  "Robert Chen",
];

const AllCorporateAccounts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [addAccountOpen, setAddAccountOpen] = useState(false);
  const [editAccountOpen, setEditAccountOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<CorporateAccount | null>(null);
  const [customIndustries, setCustomIndustries] = useState<string[]>([]);
  const [customManagers, setCustomManagers] = useState<string[]>([]);
  const [showCustomIndustryInput, setShowCustomIndustryInput] = useState(false);
  const [showCustomManagerInput, setShowCustomManagerInput] = useState(false);
  const [customIndustryValue, setCustomIndustryValue] = useState("");
  const [customManagerValue, setCustomManagerValue] = useState("");
  const [agreementFile, setAgreementFile] = useState<File | null>(null);

  const [corporateAccounts, setCorporateAccounts] = useState<CorporateAccount[]>([
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
  ]);

  const [newAccount, setNewAccount] = useState({
    companyName: "",
    industry: "",
    website: "",
    address: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    tier: "standard",
    paymentTerms: "net30",
    creditLimit: "",
    accountManager: "",
    notes: "",
  });

  const generateAccountId = () => {
    const maxId = corporateAccounts.reduce((max, acc) => {
      const num = parseInt(acc.id.replace("CA-", ""));
      return num > max ? num : max;
    }, 0);
    return `CA-${String(maxId + 1).padStart(3, "0")}`;
  };

  const handleAddAccount = () => {
    if (!newAccount.companyName || !newAccount.contactName || !newAccount.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAccount.contactEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    const account: CorporateAccount = {
      id: generateAccountId(),
      companyName: newAccount.companyName,
      industry: newAccount.industry,
      website: newAccount.website,
      address: newAccount.address,
      contactName: newAccount.contactName,
      contactEmail: newAccount.contactEmail,
      contactPhone: newAccount.contactPhone,
      tier: newAccount.tier,
      paymentTerms: newAccount.paymentTerms,
      creditLimit: newAccount.creditLimit,
      notes: newAccount.notes,
      status: "Pending Review",
    };

    setCorporateAccounts([...corporateAccounts, account]);
    setAddAccountOpen(false);
    setNewAccount({
      companyName: "",
      industry: "",
      website: "",
      address: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      tier: "standard",
      paymentTerms: "net30",
      creditLimit: "",
      accountManager: "",
      notes: "",
    });
    setAgreementFile(null);

    toast({
      title: "Corporate Account Created",
      description: `${account.companyName} has been added successfully.`,
    });
  };

  const handleEditAccount = (account: CorporateAccount) => {
    setSelectedAccount(account);
    setNewAccount({
      companyName: account.companyName,
      industry: account.industry,
      website: account.website,
      address: account.address || "",
      contactName: account.contactName,
      contactEmail: account.contactEmail,
      contactPhone: account.contactPhone || "",
      tier: account.tier || "standard",
      paymentTerms: account.paymentTerms,
      creditLimit: account.creditLimit,
      accountManager: "",
      notes: account.notes || "",
    });
    setEditAccountOpen(true);
  };

  const handleUpdateAccount = () => {
    if (!selectedAccount) return;
    
    if (!newAccount.companyName || !newAccount.contactName || !newAccount.contactEmail) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newAccount.contactEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    setCorporateAccounts(corporateAccounts.map(acc => 
      acc.id === selectedAccount.id 
        ? {
            ...acc,
            companyName: newAccount.companyName,
            industry: newAccount.industry,
            website: newAccount.website,
            address: newAccount.address,
            contactName: newAccount.contactName,
            contactEmail: newAccount.contactEmail,
            contactPhone: newAccount.contactPhone,
            tier: newAccount.tier,
            paymentTerms: newAccount.paymentTerms,
            creditLimit: newAccount.creditLimit,
            notes: newAccount.notes,
          }
        : acc
    ));

    setEditAccountOpen(false);
    setSelectedAccount(null);
    setNewAccount({
      companyName: "",
      industry: "",
      website: "",
      address: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      tier: "standard",
      paymentTerms: "net30",
      creditLimit: "",
      accountManager: "",
      notes: "",
    });

    toast({
      title: "Account Updated",
      description: `${newAccount.companyName} has been updated successfully.`,
    });
  };

  const handleDeleteAccount = () => {
    if (!selectedAccount) return;
    
    setCorporateAccounts(corporateAccounts.filter(acc => acc.id !== selectedAccount.id));
    setDeleteDialogOpen(false);
    
    toast({
      title: "Account Deleted",
      description: `${selectedAccount.companyName} has been removed.`,
    });
    
    setSelectedAccount(null);
  };

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
        <Button onClick={() => setAddAccountOpen(true)}>
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
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-1">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => handleEditAccount(account)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => {
                            setSelectedAccount(account);
                            setDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
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

      {/* Add Corporate Account Dialog */}
      <Dialog open={addAccountOpen} onOpenChange={setAddAccountOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              Add New Corporate Account
            </DialogTitle>
            <DialogDescription>
              Create a new B2B corporate account with company details and terms.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Company Information
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    placeholder="e.g., Acme Corporation"
                    value={newAccount.companyName}
                    onChange={(e) => setNewAccount({ ...newAccount, companyName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Industry</Label>
                    {showCustomIndustryInput ? (
                      <div className="flex gap-2">
                        <Input
                          placeholder="Enter industry name"
                          value={customIndustryValue}
                          onChange={(e) => setCustomIndustryValue(e.target.value)}
                        />
                        <Button
                          type="button"
                          size="sm"
                          onClick={() => {
                            if (customIndustryValue.trim()) {
                              setCustomIndustries([...customIndustries, customIndustryValue.trim()]);
                              setNewAccount({ ...newAccount, industry: customIndustryValue.trim() });
                              setCustomIndustryValue("");
                              setShowCustomIndustryInput(false);
                            }
                          }}
                        >
                          Add
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                          onClick={() => {
                            setShowCustomIndustryInput(false);
                            setCustomIndustryValue("");
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    ) : (
                      <Select
                        value={newAccount.industry}
                        onValueChange={(value) => {
                          if (value === "__add_custom__") {
                            setShowCustomIndustryInput(true);
                          } else {
                            setNewAccount({ ...newAccount, industry: value });
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select industry" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...industries, ...customIndustries].map((industry) => (
                            <SelectItem key={industry} value={industry}>
                              {industry}
                            </SelectItem>
                          ))}
                          <SelectItem value="__add_custom__" className="text-primary">
                            <span className="flex items-center gap-1">
                              <Plus className="h-3 w-3" /> Add Custom Industry
                            </span>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="website" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Website
                    </Label>
                    <Input
                      id="website"
                      placeholder="www.company.com"
                      value={newAccount.website}
                      onChange={(e) => setNewAccount({ ...newAccount, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="address" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Address
                  </Label>
                  <Input
                    id="address"
                    placeholder="e.g., Kuwait City, Block 5"
                    value={newAccount.address}
                    onChange={(e) => setNewAccount({ ...newAccount, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Primary Contact
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="e.g., Ahmed Al-Rashid"
                    value={newAccount.contactName}
                    onChange={(e) => setNewAccount({ ...newAccount, contactName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="contactEmail" className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email *
                    </Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={newAccount.contactEmail}
                      onChange={(e) => setNewAccount({ ...newAccount, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="contactPhone" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone
                    </Label>
                    <Input
                      id="contactPhone"
                      placeholder="+965 1234 5678"
                      value={newAccount.contactPhone}
                      onChange={(e) => setNewAccount({ ...newAccount, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Payment Terms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Payment Terms</Label>
                  <Select
                    value={newAccount.paymentTerms}
                    onValueChange={(value) => setNewAccount({ ...newAccount, paymentTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="net15">Net 15 Days</SelectItem>
                      <SelectItem value="net30">Net 30 Days</SelectItem>
                      <SelectItem value="net45">Net 45 Days</SelectItem>
                      <SelectItem value="net60">Net 60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="creditLimit">Credit Limit (KD)</Label>
                  <Input
                    id="creditLimit"
                    type="number"
                    placeholder="e.g., 50000"
                    value={newAccount.creditLimit}
                    onChange={(e) => setNewAccount({ ...newAccount, creditLimit: e.target.value })}
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label>Assign Account Manager</Label>
                {showCustomManagerInput ? (
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter manager name"
                      value={customManagerValue}
                      onChange={(e) => setCustomManagerValue(e.target.value)}
                    />
                    <Button
                      type="button"
                      size="sm"
                      onClick={() => {
                        if (customManagerValue.trim()) {
                          setCustomManagers([...customManagers, customManagerValue.trim()]);
                          setNewAccount({ ...newAccount, accountManager: customManagerValue.trim() });
                          setCustomManagerValue("");
                          setShowCustomManagerInput(false);
                        }
                      }}
                    >
                      Add
                    </Button>
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        setShowCustomManagerInput(false);
                        setCustomManagerValue("");
                      }}
                    >
                      Cancel
                    </Button>
                  </div>
                ) : (
                  <Select
                    value={newAccount.accountManager}
                    onValueChange={(value) => {
                      if (value === "__add_custom__") {
                        setShowCustomManagerInput(true);
                      } else {
                        setNewAccount({ ...newAccount, accountManager: value });
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select account manager" />
                    </SelectTrigger>
                    <SelectContent>
                      {[...accountManagers, ...customManagers].map((manager) => (
                        <SelectItem key={manager} value={manager}>
                          {manager}
                        </SelectItem>
                      ))}
                      <SelectItem value="__add_custom__" className="text-primary">
                        <span className="flex items-center gap-1">
                          <Plus className="h-3 w-3" /> Add Custom Manager
                        </span>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </div>
            </div>

            {/* Agreement Upload */}
            <div className="grid gap-2">
              <Label htmlFor="agreement" className="flex items-center gap-1">
                <FileText className="h-3 w-3" />
                Corporate Agreement
              </Label>
              {agreementFile ? (
                <div className="flex items-center gap-2 p-3 border rounded-md bg-muted/50">
                  <FileText className="h-4 w-4 text-primary" />
                  <span className="text-sm flex-1 truncate">{agreementFile.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setAgreementFile(null)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <div className="relative">
                  <Input
                    id="agreement"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setAgreementFile(file);
                      }
                    }}
                  />
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full justify-start text-muted-foreground"
                    onClick={() => document.getElementById('agreement')?.click()}
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Agreement (PDF, DOC, DOCX)
                  </Button>
                </div>
              )}
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="notes">Additional Notes</Label>
              <Textarea
                id="notes"
                placeholder="Any special requirements or notes about this account..."
                value={newAccount.notes}
                onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setAddAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddAccount}>
              <Building2 className="h-4 w-4 mr-2" />
              Create Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Corporate Account Dialog */}
      <Dialog open={editAccountOpen} onOpenChange={setEditAccountOpen}>
        <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Edit className="h-5 w-5 text-primary" />
              Edit Corporate Account
            </DialogTitle>
            <DialogDescription>
              Update the corporate account details.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Company Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Briefcase className="h-4 w-4" />
                Company Information
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editCompanyName">Company Name *</Label>
                  <Input
                    id="editCompanyName"
                    placeholder="e.g., Acme Corporation"
                    value={newAccount.companyName}
                    onChange={(e) => setNewAccount({ ...newAccount, companyName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label>Industry</Label>
                    <Select
                      value={newAccount.industry}
                      onValueChange={(value) => setNewAccount({ ...newAccount, industry: value })}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select industry" />
                      </SelectTrigger>
                      <SelectContent>
                        {[...industries, ...customIndustries].map((industry) => (
                          <SelectItem key={industry} value={industry}>
                            {industry}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editWebsite" className="flex items-center gap-1">
                      <Globe className="h-3 w-3" />
                      Website
                    </Label>
                    <Input
                      id="editWebsite"
                      placeholder="www.company.com"
                      value={newAccount.website}
                      onChange={(e) => setNewAccount({ ...newAccount, website: e.target.value })}
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editAddress" className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    Address
                  </Label>
                  <Input
                    id="editAddress"
                    placeholder="e.g., Kuwait City, Block 5"
                    value={newAccount.address}
                    onChange={(e) => setNewAccount({ ...newAccount, address: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                Primary Contact
              </h3>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="editContactName">Contact Name *</Label>
                  <Input
                    id="editContactName"
                    placeholder="e.g., Ahmed Al-Rashid"
                    value={newAccount.contactName}
                    onChange={(e) => setNewAccount({ ...newAccount, contactName: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="editContactEmail" className="flex items-center gap-1">
                      <Mail className="h-3 w-3" />
                      Email *
                    </Label>
                    <Input
                      id="editContactEmail"
                      type="email"
                      placeholder="contact@company.com"
                      value={newAccount.contactEmail}
                      onChange={(e) => setNewAccount({ ...newAccount, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="editContactPhone" className="flex items-center gap-1">
                      <Phone className="h-3 w-3" />
                      Phone
                    </Label>
                    <Input
                      id="editContactPhone"
                      placeholder="+965 1234 5678"
                      value={newAccount.contactPhone}
                      onChange={(e) => setNewAccount({ ...newAccount, contactPhone: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Terms */}
            <div className="space-y-4">
              <h3 className="text-sm font-semibold flex items-center gap-2 text-muted-foreground">
                <CreditCard className="h-4 w-4" />
                Payment Terms
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label>Payment Terms</Label>
                  <Select
                    value={newAccount.paymentTerms}
                    onValueChange={(value) => setNewAccount({ ...newAccount, paymentTerms: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="prepaid">Prepaid</SelectItem>
                      <SelectItem value="net15">Net 15 Days</SelectItem>
                      <SelectItem value="net30">Net 30 Days</SelectItem>
                      <SelectItem value="net45">Net 45 Days</SelectItem>
                      <SelectItem value="net60">Net 60 Days</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="editCreditLimit">Credit Limit (KD)</Label>
                  <Input
                    id="editCreditLimit"
                    type="number"
                    placeholder="e.g., 50000"
                    value={newAccount.creditLimit}
                    onChange={(e) => setNewAccount({ ...newAccount, creditLimit: e.target.value })}
                  />
                </div>
              </div>
            </div>

            {/* Notes */}
            <div className="grid gap-2">
              <Label htmlFor="editNotes">Additional Notes</Label>
              <Textarea
                id="editNotes"
                placeholder="Any special requirements or notes about this account..."
                value={newAccount.notes}
                onChange={(e) => setNewAccount({ ...newAccount, notes: e.target.value })}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditAccountOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateAccount}>
              <Edit className="h-4 w-4 mr-2" />
              Update Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Corporate Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete <strong>{selectedAccount?.companyName}</strong>? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={handleDeleteAccount}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AllCorporateAccounts;