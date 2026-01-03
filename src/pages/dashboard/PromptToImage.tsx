import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Image as ImageIcon,
  Sparkles,
  Download,
  RefreshCw,
  Palette,
  ChevronRight,
  Zap,
  Wand2,
  Coins,
} from "lucide-react";
import { useState } from "react";

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

const sizeOptions = [
  { id: "1:1", name: "Square (1024×1024)" },
  { id: "16:9", name: "Landscape (1920×1080)" },
  { id: "9:16", name: "Portrait (1080×1920)" },
  { id: "4:3", name: "Standard (1280×960)" },
];

const modelOptions = [
  { id: "stable-diffusion-xl", name: "Stable Diffusion XL" },
  { id: "midjourney-v6", name: "Midjourney V6" },
  { id: "dall-e-3", name: "DALL-E 3" },
  { id: "flux-pro", name: "Flux Pro" },
];

const CREDITS_PER_IMAGE = 5;

const PromptToImage = () => {
  const [prompt, setPrompt] = useState("");
  const [selectedStyle, setSelectedStyle] = useState("4k-realistic");
  const [selectedSize, setSelectedSize] = useState("1:1");
  const [selectedModel, setSelectedModel] = useState("stable-diffusion-xl");
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2500);
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-gradient-to-br from-accent/20 to-primary/20">
              <ImageIcon className="h-6 w-6 text-accent" />
            </div>
            <h1 className="text-3xl font-bold text-gradient-violet">
              Prompt to Image
            </h1>
          </div>
          <p className="text-muted-foreground">
            Generate stunning AI artwork from your text descriptions
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Left Column - Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Prompt Input */}
            <Card className="bg-card border-border overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-accent/5 to-primary/5">
                <CardTitle className="flex items-center gap-2">
                  <Wand2 className="h-5 w-5 text-accent" />
                  Your Vision
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <Textarea
                  placeholder="A magical library with floating books, golden sunlight streaming through stained glass windows, fantasy art style..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="min-h-[150px] bg-secondary/30 border-border resize-none"
                />
                <div className="flex items-center justify-between mt-4">
                  <span className="text-sm text-muted-foreground">{prompt.length} characters</span>
                  <Button variant="ghost" size="sm" className="gap-2 text-accent">
                    <Zap className="h-4 w-4" />
                    Enhance
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Art Style Selection - Grid with images */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5 text-accent" />
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

            {/* Settings Row */}
            <div className="grid grid-cols-2 gap-4">
              {/* Size Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Image Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="bg-secondary/30 border-border">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sizeOptions.map((size) => (
                      <SelectItem key={size.id} value={size.id}>
                        {size.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Model Dropdown */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">AI Model</label>
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
            </div>

            {/* Generate Button */}
            <Button
              variant="hero"
              className="w-full gap-2 h-14 text-lg bg-gradient-to-r from-accent to-primary hover:opacity-90"
              onClick={handleGenerate}
              disabled={!prompt || isGenerating}
            >
              {isGenerating ? (
                <>
                  <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Creating magic...
                </>
              ) : (
                <>
                  <Sparkles className="h-5 w-5" />
                  Generate Image
                  <span className="ml-2 flex items-center gap-1 text-sm opacity-80">
                    <Coins className="h-4 w-4" />
                    {CREDITS_PER_IMAGE}
                  </span>
                </>
              )}
            </Button>
          </div>

          {/* Right Column - Generated Image */}
          <div className="lg:col-span-3">
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle>Generated Image</CardTitle>
                <Button variant="ghost" size="sm" className="gap-2">
                  <RefreshCw className="h-4 w-4" />
                  Regenerate
                </Button>
              </CardHeader>
              <CardContent>
                {isGenerating ? (
                  <div className="aspect-square max-w-lg mx-auto rounded-xl bg-gradient-to-br from-secondary via-muted to-secondary overflow-hidden relative">
                    <div className="absolute inset-0 shimmer" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <div className="w-16 h-16 mx-auto border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                        <p className="mt-4 text-muted-foreground">Creating your masterpiece...</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="aspect-square max-w-lg mx-auto rounded-xl bg-gradient-to-br from-secondary via-muted to-secondary overflow-hidden relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-8xl opacity-50 group-hover:scale-110 transition-transform duration-300">
                        🎨
                      </span>
                    </div>
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-background/80 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center p-6">
                      <p className="text-sm text-muted-foreground text-center mb-4">
                        Your generated image will appear here
                      </p>
                      <div className="flex items-center gap-2">
                        <Button size="sm" variant="secondary" className="gap-1">
                          <Download className="h-3 w-3" />
                          Save
                        </Button>
                        <Button size="sm" variant="secondary" className="gap-1">
                          <RefreshCw className="h-3 w-3" />
                          Remix
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tips */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20 mt-6">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3">🎨 Art Tips</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Describe lighting: "golden hour", "dramatic shadows", "soft ambient"
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Add art references: "in the style of Studio Ghibli"
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Include mood: "serene", "epic", "mysterious", "whimsical"
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

export default PromptToImage;
