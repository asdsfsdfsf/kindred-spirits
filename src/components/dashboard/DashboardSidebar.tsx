import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Video,
  Image,
  FileText,
  Clock,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronLeft,
  Wand2,
  Repeat,
  Clapperboard,
  Coins,
  Bell,
} from "lucide-react";
import { cn } from "@/lib/utils";
import StoryShortLogo from "@/components/StoryShortLogo";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Generate Story Videos", icon: Clapperboard, href: "/dashboard/story-videos" },
  { title: "Series Automation", icon: Repeat, href: "/dashboard/series" },
  { title: "Templates", icon: Wand2, href: "/dashboard/templates" },
  { title: "Scripts", icon: FileText, href: "/dashboard/scripts" },
  { title: "History", icon: Clock, href: "/dashboard/history" },
];

const aiGenerationItems = [
  { title: "Prompt to Video", icon: Video, href: "/dashboard/prompt-to-video" },
  { title: "Prompt to Image", icon: Image, href: "/dashboard/prompt-to-image" },
];

const bottomNavItems = [
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Billing", icon: CreditCard, href: "/dashboard/billing" },
  { title: "Help & Support", icon: HelpCircle, href: "/dashboard/support" },
];

const notifications = [
  { id: 1, title: "New Feature: Series Automation", message: "Create automated video series with consistent branding.", time: "2 hours ago", unread: true },
  { id: 2, title: "Credits Added", message: "Your monthly credits have been refreshed.", time: "1 day ago", unread: true },
  { id: 3, title: "Video Ready", message: "Your AI video 'Product Launch' is ready to download.", time: "3 days ago", unread: false },
];

const DashboardSidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const availableCredits = 2450;
  const unreadCount = notifications.filter(n => n.unread).length;

  const isActive = (href: string) => location.pathname === href;

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r border-border flex flex-col transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        <Link to="/dashboard" className="flex items-center gap-2">
          <StoryShortLogo size={28} />
          {!collapsed && (
            <span className="text-lg font-bold text-foreground">StoryShort</span>
          )}
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft
            className={cn(
              "h-4 w-4 transition-transform",
              collapsed && "rotate-180"
            )}
          />
        </Button>
      </div>

      {/* Main Navigation */}
      <nav className="py-4 px-2 space-y-1 border-b border-border">
        {!collapsed && (
          <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Main
          </span>
        )}
        <div className="mt-2 space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:translate-x-1",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* AI Generation Section */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {!collapsed && (
          <span className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            AI Generation
          </span>
        )}
        <div className="mt-2 space-y-1">
          {aiGenerationItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:translate-x-1",
                isActive(item.href)
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <item.icon className="h-5 w-5 flex-shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </Link>
          ))}
        </div>
      </nav>

      {/* Bottom Navigation */}
      <div className="py-4 px-2 border-t border-border space-y-1">
        {/* Notifications */}
        <Popover>
          <PopoverTrigger asChild>
            <button
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:translate-x-1 w-full",
                "text-muted-foreground hover:bg-muted hover:text-foreground relative"
              )}
            >
              <div className="relative">
                <Bell className="h-5 w-5 flex-shrink-0" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-primary text-primary-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
                    {unreadCount}
                  </span>
                )}
              </div>
              {!collapsed && <span>Notifications</span>}
            </button>
          </PopoverTrigger>
          <PopoverContent className="w-80 p-0" side="right" align="end">
            <div className="p-4 border-b border-border">
              <h3 className="font-semibold text-foreground">Notifications</h3>
            </div>
            <div className="max-h-80 overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={cn(
                    "p-4 border-b border-border last:border-0 hover:bg-secondary/50 transition-colors cursor-pointer",
                    notification.unread && "bg-primary/5"
                  )}
                >
                  <div className="flex items-start gap-3">
                    {notification.unread && (
                      <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0" />
                    )}
                    <div className={cn(!notification.unread && "ml-5")}>
                      <p className="font-medium text-foreground text-sm">{notification.title}</p>
                      <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                      <p className="text-xs text-muted-foreground mt-2">{notification.time}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </PopoverContent>
        </Popover>

        {bottomNavItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 hover:translate-x-1",
              isActive(item.href)
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.title}</span>}
          </Link>
        ))}

        {/* Logout */}
        <button
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-all w-full"
          onClick={() => console.log("Logout")}
        >
          <LogOut className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Log Out</span>}
        </button>
      </div>

      {/* User Profile with Credits */}
      <div className="p-4 border-t border-border">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-sm font-semibold text-primary">JD</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">John Doe</p>
              <div className="flex items-center gap-1.5 text-xs text-primary">
                <Coins className="h-3 w-3" />
                <span className="font-medium">{availableCredits.toLocaleString()} credits</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default DashboardSidebar;
