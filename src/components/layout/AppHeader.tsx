import { Bell, Search, User, Settings, LogOut, Moon, Sun, HelpCircle, Shield, ChevronRight } from "lucide-react";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "sonner";

export function AppHeader() {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleLogout = () => {
    toast.success("Logged out successfully");
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
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
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full"></span>
        </Button>
        
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

            {/* Quick Stats */}
            <div className="px-4 py-3">
              <div className="grid grid-cols-3 gap-3 text-center">
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-primary">156</p>
                  <p className="text-xs text-muted-foreground">Orders</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-primary">23</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div className="p-2 rounded-lg bg-muted/50">
                  <p className="text-lg font-bold text-primary">98%</p>
                  <p className="text-xs text-muted-foreground">Rating</p>
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
