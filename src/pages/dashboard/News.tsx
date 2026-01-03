import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Sparkles, Video, Coins, Gift, Zap } from "lucide-react";

const newsItems = [
  {
    id: 1,
    title: "New Feature: Series Automation",
    message: "Create automated video series with consistent branding. Set up once and let AI generate episodes on schedule.",
    time: "2 hours ago",
    unread: true,
    icon: Sparkles,
    iconColor: "text-primary",
    bgColor: "from-primary/20 to-primary/5",
  },
  {
    id: 2,
    title: "Credits Added",
    message: "Your monthly credits have been refreshed. You now have 5,000 credits available for the month.",
    time: "1 day ago",
    unread: true,
    icon: Coins,
    iconColor: "text-amber-500",
    bgColor: "from-amber-500/20 to-amber-500/5",
  },
  {
    id: 3,
    title: "Video Ready",
    message: "Your AI video 'Product Launch' is ready to download. Check your history to access it.",
    time: "3 days ago",
    unread: false,
    icon: Video,
    iconColor: "text-emerald-500",
    bgColor: "from-emerald-500/20 to-emerald-500/5",
  },
  {
    id: 4,
    title: "New AI Model Available",
    message: "Veo 2 is now available for video generation. Try it out in Prompt to Video for even better results.",
    time: "5 days ago",
    unread: false,
    icon: Zap,
    iconColor: "text-violet-500",
    bgColor: "from-violet-500/20 to-violet-500/5",
  },
  {
    id: 5,
    title: "Refer a Friend Bonus",
    message: "Invite friends and earn 500 bonus credits for each successful referral. Share your unique link now!",
    time: "1 week ago",
    unread: false,
    icon: Gift,
    iconColor: "text-rose-500",
    bgColor: "from-rose-500/20 to-rose-500/5",
  },
];

const News = () => {
  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Bell className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">News & Updates</h1>
          </div>
          <p className="text-muted-foreground">
            Stay up to date with the latest features, announcements, and your account activity
          </p>
        </div>

        {/* News Cards */}
        <div className="space-y-4 max-w-3xl">
          {newsItems.map((item, index) => (
            <Card 
              key={item.id} 
              className={`bg-card border-border hover:border-primary/30 transition-all duration-300 ${
                item.unread ? "ring-1 ring-primary/20" : ""
              }`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-xl bg-gradient-to-br ${item.bgColor} ${item.iconColor}`}>
                    <item.icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-4">
                      <div>
                        <h3 className="font-semibold text-foreground flex items-center gap-2">
                          {item.title}
                          {item.unread && (
                            <span className="w-2 h-2 rounded-full bg-primary" />
                          )}
                        </h3>
                        <p className="text-muted-foreground mt-1">{item.message}</p>
                      </div>
                      <span className="text-xs text-muted-foreground whitespace-nowrap">{item.time}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default News;
