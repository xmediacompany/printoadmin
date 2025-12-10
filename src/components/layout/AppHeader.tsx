import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Moon, 
  Sun, 
  HelpCircle, 
  Shield, 
  ChevronRight,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Truck,
  CreditCard,
  X,
  Pencil,
  Mail,
  Phone,
  Camera
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

const notifications = [
  {
    id: "1",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-10245 from Acme Corp - 500 Business Cards",
    time: "2 min ago",
    read: false,
    icon: Package,
    iconBg: "bg-blue-500/10",
    iconColor: "text-blue-500"
  },
  {
    id: "2",
    type: "urgent",
    title: "Urgent: Deadline Approaching",
    message: "Order #ORD-10232 deadline in 2 hours - Design Studio",
    time: "15 min ago",
    read: false,
    icon: AlertTriangle,
    iconBg: "bg-amber-500/10",
    iconColor: "text-amber-500"
  },
  {
    id: "3",
    type: "completed",
    title: "Order Completed",
    message: "Order #ORD-10230 has been marked as completed",
    time: "1 hour ago",
    read: false,
    icon: CheckCircle2,
    iconBg: "bg-green-500/10",
    iconColor: "text-green-500"
  },
  {
    id: "4",
    type: "payment",
    title: "Payment Received",
    message: "KD 2,340 received from TechStart Inc",
    time: "2 hours ago",
    read: true,
    icon: CreditCard,
    iconBg: "bg-emerald-500/10",
    iconColor: "text-emerald-500"
  },
  {
    id: "5",
    type: "delivery",
    title: "Out for Delivery",
    message: "Order #ORD-10228 is out for delivery",
    time: "3 hours ago",
    read: true,
    icon: Truck,
    iconBg: "bg-purple-500/10",
    iconColor: "text-purple-500"
  },
  {
    id: "6",
    type: "message",
    title: "New Customer Message",
    message: "Marketing Pro sent a message about their order",
    time: "5 hours ago",
    read: true,
    icon: MessageSquare,
    iconBg: "bg-pink-500/10",
    iconColor: "text-pink-500"
  },
];

export function AppHeader() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [notificationsList, setNotificationsList] = useState(notifications);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  
  // Profile state
  const [profileName, setProfileName] = useState("Admin User");
  const [profileEmail, setProfileEmail] = useState("admin@printo.com");
  const [profileMobile, setProfileMobile] = useState("+965 1234 5678");
  const [profilePhoto, setProfilePhoto] = useState("");
  
  // Edit dialogs
  const [editNameOpen, setEditNameOpen] = useState(false);
  const [editEmailOpen, setEditEmailOpen] = useState(false);
  const [editMobileOpen, setEditMobileOpen] = useState(false);
  const [editPhotoOpen, setEditPhotoOpen] = useState(false);
  
  // Temp edit values
  const [tempName, setTempName] = useState(profileName);
  const [tempEmail, setTempEmail] = useState(profileEmail);
  const [tempMobile, setTempMobile] = useState(profileMobile);

  const unreadCount = notificationsList.filter(n => !n.read).length;

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
  };

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  const markAsRead = (id: string) => {
    setNotificationsList(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotificationsList(prev => prev.map(n => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const removeNotification = (id: string) => {
    setNotificationsList(prev => prev.filter(n => n.id !== id));
  };

  return (
    <header className="h-16 border-b bg-card flex items-center px-4 gap-4">
      <SidebarTrigger />
      
      <div className="flex-1 flex items-center gap-4 max-w-xl">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search orders, products, customers..." 
            className="pl-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
          <PopoverTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-destructive rounded-full text-[10px] font-bold text-destructive-foreground flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-96 p-0" align="end" sideOffset={8}>
            {/* Header */}
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg">Notifications</h3>
                  <p className="text-sm text-muted-foreground">
                    {unreadCount > 0 ? `${unreadCount} unread notifications` : "You're all caught up!"}
                  </p>
                </div>
                {unreadCount > 0 && (
                  <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                    Mark all read
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="all" className="w-full">
              <TabsList className="w-full justify-start rounded-none border-b bg-transparent h-auto p-0">
                <TabsTrigger 
                  value="all" 
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  All
                </TabsTrigger>
                <TabsTrigger 
                  value="unread"
                  className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent px-4 py-2"
                >
                  Unread
                  {unreadCount > 0 && (
                    <Badge variant="secondary" className="ml-1.5 h-5 px-1.5">
                      {unreadCount}
                    </Badge>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="all" className="m-0">
                <ScrollArea className="h-[400px]">
                  {notificationsList.length > 0 ? (
                    <div className="divide-y">
                      {notificationsList.map((notification) => (
                        <div
                          key={notification.id}
                          className={cn(
                            "p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group",
                            !notification.read && "bg-primary/5"
                          )}
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                              notification.iconBg
                            )}>
                              <notification.icon className={cn("h-5 w-5", notification.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className={cn(
                                  "text-sm",
                                  !notification.read && "font-semibold"
                                )}>
                                  {notification.title}
                                </p>
                                {!notification.read && (
                                  <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Bell className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium">No notifications</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        You're all caught up! Check back later.
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>

              <TabsContent value="unread" className="m-0">
                <ScrollArea className="h-[400px]">
                  {notificationsList.filter(n => !n.read).length > 0 ? (
                    <div className="divide-y">
                      {notificationsList.filter(n => !n.read).map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 hover:bg-muted/50 transition-colors cursor-pointer relative group bg-primary/5"
                          onClick={() => markAsRead(notification.id)}
                        >
                          <div className="flex gap-3">
                            <div className={cn(
                              "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                              notification.iconBg
                            )}>
                              <notification.icon className={cn("h-5 w-5", notification.iconColor)} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-semibold">{notification.title}</p>
                                <span className="w-2 h-2 bg-primary rounded-full shrink-0 mt-1.5" />
                              </div>
                              <p className="text-sm text-muted-foreground line-clamp-2 mt-0.5">
                                {notification.message}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <Clock className="h-3 w-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                              </div>
                            </div>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity absolute top-2 right-2"
                              onClick={(e) => {
                                e.stopPropagation();
                                removeNotification(notification.id);
                              }}
                            >
                              <X className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center h-[300px] text-center p-4">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                      </div>
                      <h4 className="font-medium">All caught up!</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        No unread notifications
                      </p>
                    </div>
                  )}
                </ScrollArea>
              </TabsContent>
            </Tabs>

            {/* Footer */}
            <div className="p-3 border-t">
              <Button variant="outline" className="w-full" onClick={() => setNotificationsOpen(false)}>
                View All Notifications
              </Button>
            </div>
          </PopoverContent>
        </Popover>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative rounded-full">
              <Avatar className="h-8 w-8">
                <AvatarImage src={profilePhoto} />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  {getInitials(profileName)}
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
            {/* Profile Header with Edit Photo */}
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                    <AvatarImage src={profilePhoto} />
                    <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                      {getInitials(profileName)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    size="icon"
                    variant="secondary"
                    className="absolute -bottom-1 -right-1 h-6 w-6 rounded-full shadow-md"
                    onClick={() => setEditPhotoOpen(true)}
                  >
                    <Camera className="h-3 w-3" />
                  </Button>
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">{profileName}</h3>
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{profileEmail}</p>
                  <p className="text-xs text-muted-foreground mt-1">Last login: Today, 9:30 AM</p>
                </div>
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Edit Profile Options */}
            <DropdownMenuGroup>
              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => {
                  setTempName(profileName);
                  setEditNameOpen(true);
                }}
              >
                <User className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Edit Name</p>
                  <p className="text-xs text-muted-foreground">{profileName}</p>
                </div>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => {
                  setTempEmail(profileEmail);
                  setEditEmailOpen(true);
                }}
              >
                <Mail className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Edit Email</p>
                  <p className="text-xs text-muted-foreground">{profileEmail}</p>
                </div>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => {
                  setTempMobile(profileMobile);
                  setEditMobileOpen(true);
                }}
              >
                <Phone className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Edit Mobile</p>
                  <p className="text-xs text-muted-foreground">{profileMobile}</p>
                </div>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => setEditPhotoOpen(true)}
              >
                <Camera className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Change Photo</p>
                  <p className="text-xs text-muted-foreground">Upload a new profile picture</p>
                </div>
                <Pencil className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            <DropdownMenuItem 
              className="py-3 cursor-pointer text-destructive focus:text-destructive"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-4 w-4" />
              <p className="font-medium">Log Out</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Edit Name Dialog */}
      <Dialog open={editNameOpen} onOpenChange={setEditNameOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Name</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditNameOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setProfileName(tempName);
              setEditNameOpen(false);
              toast.success("Name updated successfully");
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Email Dialog */}
      <Dialog open={editEmailOpen} onOpenChange={setEditEmailOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Email</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={tempEmail}
                onChange={(e) => setTempEmail(e.target.value)}
                placeholder="Enter your email address"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditEmailOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setProfileEmail(tempEmail);
              setEditEmailOpen(false);
              toast.success("Email updated successfully");
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Mobile Dialog */}
      <Dialog open={editMobileOpen} onOpenChange={setEditMobileOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Mobile Number</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="mobile">Mobile Number</Label>
              <Input
                id="mobile"
                type="tel"
                value={tempMobile}
                onChange={(e) => setTempMobile(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditMobileOpen(false)}>
              Cancel
            </Button>
            <Button onClick={() => {
              setProfileMobile(tempMobile);
              setEditMobileOpen(false);
              toast.success("Mobile number updated successfully");
            }}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Photo Dialog */}
      <Dialog open={editPhotoOpen} onOpenChange={setEditPhotoOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Change Profile Photo</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex flex-col items-center gap-4">
              <Avatar className="h-24 w-24 border-4 border-muted">
                <AvatarImage src={profilePhoto} />
                <AvatarFallback className="bg-primary text-primary-foreground text-2xl font-bold">
                  {getInitials(profileName)}
                </AvatarFallback>
              </Avatar>
              <div 
                className="w-full border-2 border-dashed rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => {
                  // Simulate file upload
                  setProfilePhoto("https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face");
                  setEditPhotoOpen(false);
                  toast.success("Profile photo updated!");
                }}
              >
                <Camera className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-sm text-muted-foreground">
                  Click to upload a new photo
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  JPG, PNG or GIF (max 5MB)
                </p>
              </div>
              {profilePhoto && (
                <Button 
                  variant="outline" 
                  className="text-destructive"
                  onClick={() => {
                    setProfilePhoto("");
                    toast.success("Profile photo removed");
                  }}
                >
                  Remove Current Photo
                </Button>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditPhotoOpen(false)}>
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </header>
  );
}
