import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Video,
  Sparkles,
  Play,
  Clock,
  Settings2,
  Palette,
  ChevronRight,
  Zap,
  Coins,
} from "lucide-react";
import { useState } from "react";

const aspectRatios = [
  { id: "9:16", name: "9:16 (TikTok, Reels)" },
  { id: "16:9", name: "16:9 (YouTube)" },
  { id: "1:1", name: "1:1 (Square)" },
  { id: "4:5", name: "4:5 (Instagram)" },
];

const stylePresets = [
  { id: "cinematic", name: "Cinematic", placeholder: "/placeholder.svg" },
  { id: "anime", name: "Anime", placeholder: "/placeholder.svg" },
  { id: "realistic", name: "Realistic", placeholder: "/placeholder.svg" },
  { id: "cartoon", name: "Cartoon", placeholder: "/placeholder.svg" },
  { id: "abstract", name: "Abstract", placeholder: "/placeholder.svg" },
  { id: "vintage", name: "Vintage", placeholder: "/placeholder.svg" },
];

const CREDITS_PER_VIDEO = 50;

const PromptToVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [duration, setDuration] = useState([15]);
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
              <Video className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-brand">
              Prompt to Video
            </h1>
          </div>
          <p className="text-muted-foreground">
            Transform your imagination into stunning AI-generated videos
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Input */}
          <div className="space-y-6">
            {/* Prompt Input */}
            <Card className="bg-card border-border overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-primary" />
                  Describe Your Video
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="A majestic eagle soaring through golden clouds at sunset, cinematic lighting, slow motion, 4K quality..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[180px] bg-secondary/30 border-border resize-none text-lg"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">{prompt.length} characters</span>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary">
                    <Zap className="h-4 w-4" />
                    Enhance Prompt
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Visual Style Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Visual Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                  {stylePresets.map((style, index) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 aspect-square group ${
                        selectedStyle === style.id
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50"
                      }`}
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-secondary via-muted to-secondary" />
                      <img
                        src={style.placeholder}
                        alt={style.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-transparent" />
                      {/* Animated border */}
                      {selectedStyle === style.id && (
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-pulse opacity-20" />
                        </div>
                      )}
                      <span className="absolute bottom-1.5 left-0 right-0 text-[10px] font-medium text-foreground text-center">
                        {style.name}
                      </span>
                      {selectedStyle === style.id && (
                        <div className="absolute top-1.5 right-1.5 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
                          <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Settings */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings2 className="h-5 w-5 text-primary" />
                  Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Aspect Ratio Dropdown */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Aspect Ratio</label>
                  <Select value={selectedRatio} onValueChange={setSelectedRatio}>
                    <SelectTrigger className="bg-secondary/30 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aspectRatios.map((ratio) => (
                        <SelectItem key={ratio.id} value={ratio.id}>
                          {ratio.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Duration */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-sm font-medium text-foreground flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      Duration
                    </p>
                    <span className="text-sm text-primary font-medium">{duration[0]}s</span>
                  </div>
                  <Slider
                    value={duration}
                    onValueChange={setDuration}
                    min={5}
                    max={60}
                    step={5}
                    className="py-2"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>5s</span>
                    <span>60s</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Preview */}
          <div className="space-y-6">
            <Card className="bg-card border-border overflow-hidden sticky top-8">
              <div
                className={`${
                  selectedRatio === "9:16"
                    ? "aspect-[9/16]"
                    : selectedRatio === "16:9"
                    ? "aspect-video"
                    : selectedRatio === "4:5"
                    ? "aspect-[4/5]"
                    : "aspect-square"
                } bg-gradient-to-br from-secondary via-muted to-secondary relative group max-h-[500px] mx-auto`}
              >
                <div className="absolute inset-0 flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="relative w-24 h-24 mx-auto mb-4">
                        <div className="absolute inset-0 rounded-full border-4 border-primary/20" />
                        <div className="absolute inset-0 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                        <div className="absolute inset-2 rounded-full border-4 border-accent/20" />
                        <div className="absolute inset-2 rounded-full border-4 border-accent border-b-transparent animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }} />
                      </div>
                      <p className="text-foreground font-medium">Creating your video...</p>
                      <p className="text-sm text-muted-foreground mt-1">This may take a moment</p>
                    </div>
                  ) : (
                    <div className="text-center p-8">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                      <p className="text-muted-foreground">Your AI video will appear here</p>
                    </div>
                  )}
                </div>
              </div>
              <CardContent className="p-6">
                <Button
                  variant="hero"
                  className="w-full gap-2 h-12 text-lg"
                  onClick={handleGenerate}
                  disabled={!prompt || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-5 w-5" />
                      Generate Video
                      <span className="ml-2 flex items-center gap-1 text-sm opacity-80">
                        <Coins className="h-4 w-4" />
                        {CREDITS_PER_VIDEO}
                      </span>
                    </>
                  )}
                </Button>
                <p className="text-center text-sm text-muted-foreground mt-4">
                  Estimated time: ~2 minutes
                </p>
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">💡 Prompting Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Be specific about lighting, camera angles, and movements
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Include quality modifiers like "4K", "cinematic", "high detail"
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Describe motion: "slow zoom", "tracking shot", "time-lapse"
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PromptToVideo;
