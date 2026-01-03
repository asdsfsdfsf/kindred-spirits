import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Coins,
  Calendar,
  Download,
  Plus,
  Video,
  Image,
  FileText,
  Clapperboard,
  Repeat,
  Sparkles,
} from "lucide-react";

const currentPlan = {
  name: "Pro",
  price: "$29",
  period: "month",
  credits: 5000,
  usedCredits: 2550,
  renewsOn: "January 15, 2024",
};

const creditFeatures = [
  {
    icon: Clapperboard,
    title: "Story Videos",
    credits: 100,
    description: "Generate a complete story video with AI visuals and voiceover",
    color: "from-primary/20 to-primary/5",
    iconColor: "text-primary",
  },
  {
    icon: Repeat,
    title: "Series Episode",
    credits: 80,
    description: "Create an automated series episode with consistent branding",
    color: "from-accent/20 to-accent/5",
    iconColor: "text-accent",
  },
  {
    icon: Video,
    title: "Prompt to Video",
    credits: 50,
    description: "Transform a text prompt into a short AI-generated video",
    color: "from-violet-500/20 to-violet-500/5",
    iconColor: "text-violet-500",
  },
  {
    icon: Image,
    title: "AI Image",
    credits: 5,
    description: "Generate a single AI image from your text description",
    color: "from-emerald-500/20 to-emerald-500/5",
    iconColor: "text-emerald-500",
  },
  {
    icon: FileText,
    title: "Script Generation",
    credits: 10,
    description: "AI-powered script writing for your videos",
    color: "from-amber-500/20 to-amber-500/5",
    iconColor: "text-amber-500",
  },
  {
    icon: Sparkles,
    title: "Voice Synthesis",
    credits: 15,
    description: "Convert text to realistic AI voiceover per minute",
    color: "from-rose-500/20 to-rose-500/5",
    iconColor: "text-rose-500",
  },
];

const invoices = [
  { id: 1, date: "Dec 15, 2023", amount: "$29.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: 2, date: "Nov 15, 2023", amount: "$29.00", status: "Paid", description: "Pro Plan - Monthly" },
  { id: 3, date: "Nov 5, 2023", amount: "$24.00", status: "Paid", description: "3,000 Credits Pack" },
  { id: 4, date: "Oct 15, 2023", amount: "$29.00", status: "Paid", description: "Pro Plan - Monthly" },
];

const Billing = () => {
  const creditPercentage = (currentPlan.usedCredits / currentPlan.credits) * 100;

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <CreditCard className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Billing</h1>
          </div>
          <p className="text-muted-foreground">
            Manage your credits and view billing history
          </p>
        </div>

        {/* Current Credits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Coins className="h-5 w-5 text-primary" />
                    <span className="text-sm font-medium text-primary">Available Credits</span>
                  </div>
                  <h2 className="text-4xl font-bold text-foreground">
                    {(currentPlan.credits - currentPlan.usedCredits).toLocaleString()}
                  </h2>
                  <p className="text-muted-foreground mt-1">
                    of {currentPlan.credits.toLocaleString()} credits this period
                  </p>
                </div>
                <Button variant="hero" size="sm" className="gap-1">
                  <Plus className="h-4 w-4" />
                  Buy Credits
                </Button>
              </div>
              <div className="space-y-2">
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                    style={{ width: `${100 - creditPercentage}%` }}
                  />
                </div>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{currentPlan.usedCredits.toLocaleString()} credits used</span>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Renews {currentPlan.renewsOn}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground mb-1">Current Plan</p>
                  <h2 className="text-2xl font-bold text-foreground">{currentPlan.name}</h2>
                  <p className="text-muted-foreground">
                    {currentPlan.price}/{currentPlan.period}
                  </p>
                </div>
                <Button variant="outline" size="sm">
                  Upgrade Plan
                </Button>
              </div>
              <div className="pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground">
                  Need more credits? Upgrade your plan or purchase additional credit packs.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Credit Usage Guide */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sparkles className="h-5 w-5 text-primary" />
              Credit Usage Guide
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {creditFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`relative p-5 rounded-xl bg-gradient-to-br ${feature.color} border border-border hover:border-primary/30 transition-all duration-300 hover:scale-[1.02] group`}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-2.5 rounded-xl bg-background/50 ${feature.iconColor}`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h3 className="font-semibold text-foreground">{feature.title}</h3>
                        <div className="flex items-center gap-1 text-primary font-bold">
                          <Coins className="h-3.5 w-3.5" />
                          {feature.credits}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Invoices */}
        <Card className="bg-card border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Billing History</CardTitle>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export All
            </Button>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {invoices.map((invoice, index) => (
                <div
                  key={invoice.id}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{invoice.description}</p>
                      <p className="text-sm text-muted-foreground">{invoice.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="font-medium text-foreground">{invoice.amount}</span>
                    <span className="px-2 py-1 rounded-full bg-green-500/20 text-green-400 text-xs font-medium">
                      {invoice.status}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
};

export default Billing;
