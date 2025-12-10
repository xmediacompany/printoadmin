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
  X
} from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

  const unreadCount = notificationsList.filter(n => !n.read).length;

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
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary font-semibold text-sm">
                  AD
                </AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80" align="end" sideOffset={8}>
            {/* Profile Header */}
            <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5">
              <div className="flex items-center gap-3">
                <Avatar className="h-14 w-14 border-2 border-background shadow-md">
                  <AvatarImage src="" />
                  <AvatarFallback className="bg-primary text-primary-foreground text-lg font-bold">
                    AD
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold">Admin User</h3>
                    <Badge variant="secondary" className="text-xs">Admin</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">admin@printo.com</p>
                  <p className="text-xs text-muted-foreground mt-1">Last login: Today, 9:30 AM</p>
                </div>
              </div>
            </div>


            <DropdownMenuSeparator />

            {/* Menu Items */}
            <DropdownMenuGroup>
              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <User className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">My Profile</p>
                  <p className="text-xs text-muted-foreground">View and edit profile</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <Settings className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Settings</p>
                  <p className="text-xs text-muted-foreground">Account preferences</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>

              <DropdownMenuItem 
                className="py-3 cursor-pointer"
                onClick={() => navigate("/settings")}
              >
                <Shield className="mr-3 h-4 w-4" />
                <div className="flex-1">
                  <p className="font-medium">Security</p>
                  <p className="text-xs text-muted-foreground">Password & 2FA</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted-foreground" />
              </DropdownMenuItem>
            </DropdownMenuGroup>

            <DropdownMenuSeparator />

            {/* Theme Toggle */}
            <div className="px-2 py-2">
              <div 
                className="flex items-center justify-between px-2 py-2 rounded-md hover:bg-muted/50 cursor-pointer"
                onClick={toggleDarkMode}
              >
                <div className="flex items-center gap-3">
                  {isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}
                  <span className="font-medium text-sm">Dark Mode</span>
                </div>
                <Switch checked={isDarkMode} onCheckedChange={toggleDarkMode} />
              </div>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="py-3 cursor-pointer">
              <HelpCircle className="mr-3 h-4 w-4" />
              <div className="flex-1">
                <p className="font-medium">Help & Support</p>
              </div>
            </DropdownMenuItem>

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
    </header>
  );
}
