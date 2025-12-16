import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Bell,
  Search,
  Filter,
  Package,
  AlertTriangle,
  CheckCircle2,
  Clock,
  MessageSquare,
  Truck,
  CreditCard,
  Trash2,
  MoreHorizontal,
  Check,
  Archive,
  RefreshCw,
  BellOff,
  Settings,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface Notification {
  id: string;
  type: "order" | "urgent" | "delivery" | "payment" | "message" | "system";
  title: string;
  message: string;
  time: string;
  date: string;
  read: boolean;
  icon: any;
  iconBg: string;
  iconColor: string;
}

export default function Notifications() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "order",
      title: "New Order Received",
      message: "Order #ORD-10245 from Acme Corp - 500 Business Cards",
      time: "2 min ago",
      date: "Today",
      read: false,
      icon: Package,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      id: "2",
      type: "urgent",
      title: "Urgent: Deadline Approaching",
      message: "Order #ORD-10232 deadline in 2 hours - Design Studio",
      time: "15 min ago",
      date: "Today",
      read: false,
      icon: AlertTriangle,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      id: "3",
      type: "delivery",
      title: "Delivery Completed",
      message: "Order #ORD-10198 delivered to Gulf Trading Co.",
      time: "1 hour ago",
      date: "Today",
      read: false,
      icon: Truck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      id: "4",
      type: "payment",
      title: "Payment Received",
      message: "KD 1,250.500 received from Kuwait Printing Services",
      time: "2 hours ago",
      date: "Today",
      read: true,
      icon: CreditCard,
      iconBg: "bg-violet-500/10",
      iconColor: "text-violet-500",
    },
    {
      id: "5",
      type: "message",
      title: "New Customer Message",
      message: "Sara Al-Mutairi sent a message about order #ORD-10215",
      time: "3 hours ago",
      date: "Today",
      read: true,
      icon: MessageSquare,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
    {
      id: "6",
      type: "system",
      title: "System Update",
      message: "New features available: Enhanced reporting dashboard",
      time: "5 hours ago",
      date: "Today",
      read: true,
      icon: Bell,
      iconBg: "bg-gray-500/10",
      iconColor: "text-gray-500",
    },
    {
      id: "7",
      type: "order",
      title: "Order Status Updated",
      message: "Order #ORD-10201 moved to production stage",
      time: "Yesterday",
      date: "Yesterday",
      read: true,
      icon: Package,
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-500",
    },
    {
      id: "8",
      type: "delivery",
      title: "Delivery Scheduled",
      message: "Order #ORD-10195 scheduled for delivery tomorrow",
      time: "Yesterday",
      date: "Yesterday",
      read: true,
      icon: Truck,
      iconBg: "bg-emerald-500/10",
      iconColor: "text-emerald-500",
    },
    {
      id: "9",
      type: "payment",
      title: "Invoice Overdue",
      message: "Invoice #INV-003 for Noura Al-Sabah is 5 days overdue",
      time: "2 days ago",
      date: "Jan 14",
      read: true,
      icon: CreditCard,
      iconBg: "bg-red-500/10",
      iconColor: "text-red-500",
    },
    {
      id: "10",
      type: "urgent",
      title: "Low Inventory Alert",
      message: "A4 Premium Paper stock below minimum threshold",
      time: "3 days ago",
      date: "Jan 13",
      read: true,
      icon: AlertTriangle,
      iconBg: "bg-amber-500/10",
      iconColor: "text-amber-500",
    },
  ]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filterType, setFilterType] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const unreadCount = notifications.filter((n) => !n.read).length;

  const filteredNotifications = notifications.filter((n) => {
    const matchesType = filterType === "all" || n.type === filterType;
    const matchesSearch =
      n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      n.message.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  const groupedNotifications = filteredNotifications.reduce((acc, notif) => {
    const group = acc.find((g) => g.date === notif.date);
    if (group) {
      group.items.push(notif);
    } else {
      acc.push({ date: notif.date, items: [notif] });
    }
    return acc;
  }, [] as { date: string; items: Notification[] }[]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(
      notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((n) => ({ ...n, read: true })));
    toast.success("All notifications marked as read");
  };

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter((n) => n.id !== id));
    setSelectedIds(selectedIds.filter((sid) => sid !== id));
    toast.success("Notification deleted");
  };

  const handleBulkDelete = () => {
    setNotifications(notifications.filter((n) => !selectedIds.includes(n.id)));
    setSelectedIds([]);
    toast.success(`${selectedIds.length} notifications deleted`);
  };

  const handleBulkMarkAsRead = () => {
    setNotifications(
      notifications.map((n) =>
        selectedIds.includes(n.id) ? { ...n, read: true } : n
      )
    );
    setSelectedIds([]);
    toast.success("Selected notifications marked as read");
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((sid) => sid !== id) : [...prev, id]
    );
  };

  const selectAll = () => {
    if (selectedIds.length === filteredNotifications.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filteredNotifications.map((n) => n.id));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Notifications</h1>
          <p className="text-muted-foreground">
            {unreadCount > 0
              ? `You have ${unreadCount} unread notifications`
              : "You're all caught up!"}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleMarkAllAsRead}>
            <Check className="h-4 w-4 mr-2" />
            Mark All Read
          </Button>
          <Button variant="outline">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Notifications
            </CardTitle>
            <Bell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{notifications.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Unread
            </CardTitle>
            <BellOff className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{unreadCount}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Urgent
            </CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              {notifications.filter((n) => n.type === "urgent").length}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Orders
            </CardTitle>
            <Package className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-emerald-600">
              {notifications.filter((n) => n.type === "order").length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search notifications..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[160px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="order">Orders</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
              <SelectItem value="delivery">Delivery</SelectItem>
              <SelectItem value="payment">Payment</SelectItem>
              <SelectItem value="message">Messages</SelectItem>
              <SelectItem value="system">System</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedIds.length > 0 && (
        <div className="flex items-center gap-4 p-3 bg-muted rounded-lg">
          <span className="text-sm font-medium">
            {selectedIds.length} selected
          </span>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleBulkMarkAsRead}>
              <Check className="h-4 w-4 mr-2" />
              Mark as Read
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleBulkDelete}
              className="text-destructive hover:text-destructive"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </Button>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setSelectedIds([])}
            className="ml-auto"
          >
            Clear Selection
          </Button>
        </div>
      )}

      {/* Notifications List */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Checkbox
                checked={
                  selectedIds.length === filteredNotifications.length &&
                  filteredNotifications.length > 0
                }
                onCheckedChange={selectAll}
              />
              <CardTitle className="text-lg">All Notifications</CardTitle>
            </div>
            <Badge variant="secondary">
              {filteredNotifications.length} notifications
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <ScrollArea className="h-[500px]">
            {groupedNotifications.length > 0 ? (
              groupedNotifications.map((group) => (
                <div key={group.date}>
                  <div className="px-6 py-2 bg-muted/50 text-sm font-medium text-muted-foreground sticky top-0">
                    {group.date}
                  </div>
                  <div className="divide-y">
                    {group.items.map((notification) => (
                      <div
                        key={notification.id}
                        className={cn(
                          "flex items-start gap-4 p-4 hover:bg-muted/50 transition-colors cursor-pointer",
                          !notification.read && "bg-primary/5"
                        )}
                        onClick={() => handleMarkAsRead(notification.id)}
                      >
                        <Checkbox
                          checked={selectedIds.includes(notification.id)}
                          onCheckedChange={() => toggleSelect(notification.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <div
                          className={cn(
                            "flex h-10 w-10 shrink-0 items-center justify-center rounded-full",
                            notification.iconBg
                          )}
                        >
                          <notification.icon
                            className={cn("h-5 w-5", notification.iconColor)}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p
                              className={cn(
                                "font-medium truncate",
                                !notification.read && "font-semibold"
                              )}
                            >
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="h-2 w-2 rounded-full bg-primary shrink-0" />
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground truncate">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            {notification.time}
                          </p>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 shrink-0"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleMarkAsRead(notification.id)}
                            >
                              <Check className="mr-2 h-4 w-4" />
                              Mark as Read
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <Archive className="mr-2 h-4 w-4" />
                              Archive
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-destructive"
                              onClick={() => handleDelete(notification.id)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
                <Bell className="h-12 w-12 mb-4 opacity-50" />
                <p className="text-lg font-medium">No notifications found</p>
                <p className="text-sm">
                  {searchQuery || filterType !== "all"
                    ? "Try adjusting your filters"
                    : "You're all caught up!"}
                </p>
              </div>
            )}
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
}
