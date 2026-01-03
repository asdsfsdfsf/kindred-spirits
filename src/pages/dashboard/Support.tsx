import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  HelpCircle,
  MessageSquare,
  Video,
  Mail,
  ExternalLink,
  ChevronRight,
  Sparkles,
  Zap,
  Settings,
  CreditCard,
  Play,
} from "lucide-react";
import { useState } from "react";

const faqCategories = [
  {
    id: "getting-started",
    icon: Zap,
    title: "Getting Started",
    questions: [
      { q: "How do I create my first video?", a: "Navigate to 'Generate Story Videos' and enter your script." },
      { q: "What formats are supported?", a: "We support 9:16, 16:9, 1:1, and 4:5 aspect ratios." },
      { q: "How long can my videos be?", a: "Videos can be up to 3 minutes depending on your plan." },
    ],
  },
  {
    id: "ai-features",
    icon: Sparkles,
    title: "AI Features",
    questions: [
      { q: "How does Prompt to Video work?", a: "Our AI analyzes your text prompt and generates matching visuals." },
      { q: "Can I customize AI voices?", a: "Yes, choose from multiple voice profiles in the settings." },
      { q: "What styles are available?", a: "Cinematic, anime, realistic, cartoon, abstract, and more." },
    ],
  },
  {
    id: "billing",
    icon: CreditCard,
    title: "Billing & Credits",
    questions: [
      { q: "How do credits work?", a: "Credits are used for video/image generation. Different actions use different amounts." },
      { q: "Do unused credits roll over?", a: "Credits reset each billing cycle but purchased packs don't expire." },
    ],
  },
  {
    id: "technical",
    icon: Settings,
    title: "Technical Support",
    questions: [
      { q: "My video failed to generate", a: "Check your internet connection and try regenerating." },
      { q: "Export quality issues", a: "Ensure you've selected the correct quality settings." },
      { q: "Browser compatibility", a: "We recommend Chrome, Firefox, or Safari for best experience." },
    ],
  },
];

const videoTutorials = [
  { id: 1, title: "Getting Started with StoryShort", duration: "5:32" },
  { id: 2, title: "Creating Your First AI Video", duration: "8:15" },
  { id: 3, title: "Using Visual Styles Effectively", duration: "6:48" },
  { id: 4, title: "Voice Selection & Customization", duration: "4:22" },
  { id: 5, title: "Series Automation Tutorial", duration: "10:05" },
  { id: 6, title: "Advanced Prompting Techniques", duration: "7:30" },
];

const Support = () => {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null);

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 mb-4">
            <HelpCircle className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">How can we help?</h1>
          <p className="text-muted-foreground max-w-md mx-auto">
            Browse our tutorials or get in touch with our support team
          </p>
        </div>

        {/* Video Tutorials Section */}
        <Card className="bg-card border-border mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Video className="h-5 w-5 text-primary" />
              Video Tutorials
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {videoTutorials.map((tutorial, index) => (
                <div
                  key={tutorial.id}
                  className="group relative rounded-xl overflow-hidden bg-secondary/30 border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer hover:scale-[1.02]"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center relative">
                    <div className="w-14 h-14 rounded-full bg-background/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <Play className="h-6 w-6 text-primary ml-1" />
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-background/80 text-xs font-medium text-foreground">
                      {tutorial.duration}
                    </div>
                  </div>
                  <div className="p-4">
                    <h4 className="font-medium text-foreground group-hover:text-primary transition-colors">
                      {tutorial.title}
                    </h4>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2 space-y-6">
            <h2 className="text-xl font-semibold text-foreground">Frequently Asked Questions</h2>
            {faqCategories.map((category, categoryIndex) => (
              <Card
                key={category.id}
                className="bg-card border-border overflow-hidden"
                style={{ animationDelay: `${categoryIndex * 100}ms` }}
              >
                <CardHeader className="bg-secondary/30">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <category.icon className="h-5 w-5 text-primary" />
                    {category.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  {category.questions.map((faq, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        setExpandedFaq(
                          expandedFaq === `${category.id}-${index}` ? null : `${category.id}-${index}`
                        )
                      }
                      className="w-full text-left p-4 border-b border-border last:border-0 hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-foreground">{faq.q}</span>
                        <ChevronRight
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            expandedFaq === `${category.id}-${index}` ? "rotate-90" : ""
                          }`}
                        />
                      </div>
                      {expandedFaq === `${category.id}-${index}` && (
                        <p className="mt-3 text-sm text-muted-foreground animate-fade-in">{faq.a}</p>
                      )}
                    </button>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Contact Form */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-primary/10 to-accent/5 border-primary/20 sticky top-8">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  Contact Support
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Can't find what you're looking for? Our support team is here to help.
                </p>
                <Input placeholder="Your email" className="bg-background/50 border-border" />
                <Input placeholder="Subject" className="bg-background/50 border-border" />
                <Textarea
                  placeholder="Describe your issue..."
                  className="min-h-[120px] bg-background/50 border-border resize-none"
                />
                <Button variant="hero" className="w-full gap-2">
                  <MessageSquare className="h-4 w-4" />
                  Send Message
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  Average response time: 2-4 hours
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Support;
