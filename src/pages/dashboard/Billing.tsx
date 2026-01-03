import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CreditCard,
  Coins,
  Calendar,
  Download,
  Video,
  Image,
  FileText,
  Clapperboard,
  Repeat,
  Sparkles,
  Check,
  Zap,
} from "lucide-react";

const creditPacks = [
  {
    id: "starter",
    name: "Starter Pack",
    credits: 1000,
    price: 9,
    popular: false,
    features: [
      "10 Story Videos",
      "20 AI Videos",
      "200 AI Images",
      "100 Script Generations",
    ],
    color: "from-emerald-500/20 to-emerald-500/5",
    borderColor: "border-emerald-500/30",
    iconColor: "text-emerald-500",
  },
  {
    id: "pro",
    name: "Pro Pack",
    credits: 5000,
    price: 39,
    popular: true,
    features: [
      "50 Story Videos",
      "100 AI Videos",
      "1000 AI Images",
      "500 Script Generations",
      "Priority rendering",
    ],
    color: "from-primary/20 to-primary/5",
    borderColor: "border-primary",
    iconColor: "text-primary",
  },
  {
    id: "studio",
    name: "Studio Pack",
    credits: 15000,
    price: 99,
    popular: false,
    features: [
      "150 Story Videos",
      "300 AI Videos",
      "3000 AI Images",
      "Unlimited Scripts",
      "Priority rendering",
      "API access",
    ],
    color: "from-violet-500/20 to-violet-500/5",
    borderColor: "border-violet-500/30",
    iconColor: "text-violet-500",
  },
];

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
  { id: 1, date: "Dec 15, 2023", amount: "$39.00", status: "Paid", description: "Pro Pack - 5,000 Credits" },
  { id: 2, date: "Nov 15, 2023", amount: "$39.00", status: "Paid", description: "Pro Pack - 5,000 Credits" },
  { id: 3, date: "Nov 5, 2023", amount: "$9.00", status: "Paid", description: "Starter Pack - 1,000 Credits" },
  { id: 4, date: "Oct 15, 2023", amount: "$39.00", status: "Paid", description: "Pro Pack - 5,000 Credits" },
];

const currentCredits = {
  available: 2450,
  total: 5000,
  renewsOn: "January 15, 2024",
};

const Billing = () => {
  const creditPercentage = ((currentCredits.total - currentCredits.available) / currentCredits.total) * 100;

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
        <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Coins className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-primary">Available Credits</span>
                </div>
                <h2 className="text-4xl font-bold text-foreground">
                  {currentCredits.available.toLocaleString()}
                </h2>
                <p className="text-muted-foreground mt-1">
                  of {currentCredits.total.toLocaleString()} credits this period
                </p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
                  style={{ width: `${100 - creditPercentage}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{(currentCredits.total - currentCredits.available).toLocaleString()} credits used</span>
                <div className="flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Renews {currentCredits.renewsOn}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Credit Packs */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-foreground mb-4 flex items-center gap-2">
            <Zap className="h-5 w-5 text-primary" />
            Buy Credits
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPacks.map((pack) => (
              <Card 
                key={pack.id}
                className={`relative bg-gradient-to-br ${pack.color} border-2 ${pack.borderColor} hover:scale-[1.02] transition-all duration-300`}
              >
                {pack.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-xs font-semibold">
                      Most Popular
                    </span>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-background/50 ${pack.iconColor} flex items-center justify-center`}>
                      <Coins className="h-6 w-6" />
                    </div>
                    <h3 className="text-lg font-bold text-foreground">{pack.name}</h3>
                    <div className="mt-2">
                      <span className="text-3xl font-bold text-foreground">${pack.price}</span>
                    </div>
                    <p className={`text-sm font-medium ${pack.iconColor} mt-1`}>
                      {pack.credits.toLocaleString()} credits
                    </p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {pack.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Check className={`h-4 w-4 ${pack.iconColor} flex-shrink-0`} />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button 
                    variant={pack.popular ? "hero" : "outline"} 
                    className="w-full"
                  >
                    Buy Now
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
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
