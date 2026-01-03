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
  Cpu,
} from "lucide-react";
import { useState } from "react";

const aspectRatios = [
  { id: "9:16", name: "9:16 (TikTok, Reels)" },
  { id: "16:9", name: "16:9 (YouTube)" },
  { id: "1:1", name: "1:1 (Square)" },
  { id: "4:5", name: "4:5 (Instagram)" },
];

const stylePresets = [
  { id: "collage", name: "Collage" },
  { id: "cinematic", name: "Cinematic" },
  { id: "digital-art", name: "Digital Art" },
  { id: "neon-futuristic", name: "Neon Futuristic" },
  { id: "comic-book", name: "Comic Book" },
  { id: "playground", name: "Playground" },
  { id: "4k-realistic", name: "4K Realistic" },
  { id: "cartoon", name: "Cartoon" },
  { id: "kawaii", name: "Kawaii" },
  { id: "anime", name: "Anime" },
  { id: "line-art", name: "Line Art" },
  { id: "japanese-ink", name: "Japanese Ink" },
];

const modelOptions = [
  { id: "veo-2", name: "Veo 2" },
  { id: "kling-1.5", name: "Kling 1.5" },
  { id: "runway-gen3", name: "Runway Gen-3" },
  { id: "pika-labs", name: "Pika Labs" },
  { id: "sora", name: "Sora" },
];

const CREDITS_PER_VIDEO = 50;

const PromptToVideo = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedRatio, setSelectedRatio] = useState("9:16");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [selectedModel, setSelectedModel] = useState("veo-2");
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

            {/* Visual Style Selection - Grid with colors */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Choose a generation preset
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-4 gap-3">
                  {stylePresets.map((style) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 aspect-square group ${
                        selectedStyle === style.id
                          ? "border-primary ring-2 ring-primary/30"
                          : "border-border hover:border-primary/50"
                      }`}
                    >
                      {/* Gradient background simulating style preview */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${
                        style.id === 'collage' ? 'from-orange-400 via-amber-300 to-orange-500' :
                        style.id === 'cinematic' ? 'from-emerald-400 via-teal-300 to-cyan-400' :
                        style.id === 'digital-art' ? 'from-sky-400 via-cyan-300 to-teal-400' :
                        style.id === 'neon-futuristic' ? 'from-pink-500 via-purple-500 to-violet-600' :
                        style.id === 'comic-book' ? 'from-amber-400 via-orange-300 to-yellow-400' :
                        style.id === 'playground' ? 'from-lime-400 via-green-300 to-emerald-400' :
                        style.id === '4k-realistic' ? 'from-emerald-400 via-teal-400 to-cyan-500' :
                        style.id === 'cartoon' ? 'from-rose-400 via-pink-400 to-fuchsia-500' :
                        style.id === 'kawaii' ? 'from-green-400 via-emerald-300 to-teal-400' :
                        style.id === 'anime' ? 'from-amber-300 via-yellow-300 to-lime-400' :
                        style.id === 'line-art' ? 'from-gray-200 via-white to-gray-300' :
                        'from-red-400 via-rose-300 to-pink-400'
                      }`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/20 to-transparent" />
                      <span className="absolute bottom-1.5 left-0 right-0 text-[10px] font-medium text-foreground text-center drop-shadow-lg">
                        {style.name}
                      </span>
                      {selectedStyle === style.id && (
                        <div className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-primary border-2 border-primary-foreground flex items-center justify-center">
                          <svg className="w-3 h-3 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
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
                {/* Model Selection */}
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground flex items-center gap-2">
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                    AI Model
                  </label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger className="bg-secondary/30 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {modelOptions.map((model) => (
                        <SelectItem key={model.id} value={model.id}>
                          {model.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

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
