import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Clapperboard,
  Sparkles,
  Wand2,
  Play,
  Clock,
  ChevronRight,
  Volume2,
  Type,
  Image as ImageIcon,
  Coins,
} from "lucide-react";
import { useState } from "react";

const voiceOptions = [
  { id: "male-1", name: "Marcus", preview: "Deep & Professional" },
  { id: "female-1", name: "Sarah", preview: "Warm & Friendly" },
  { id: "male-2", name: "James", preview: "Energetic & Casual" },
  { id: "female-2", name: "Emma", preview: "Calm & Soothing" },
];

const styleOptions = [
  { id: "cinematic", name: "Cinematic", placeholder: "/placeholder.svg" },
  { id: "minimal", name: "Minimal", placeholder: "/placeholder.svg" },
  { id: "dynamic", name: "Dynamic", placeholder: "/placeholder.svg" },
  { id: "storytelling", name: "Storytelling", placeholder: "/placeholder.svg" },
  { id: "custom", name: "Custom", placeholder: "/placeholder.svg" },
];

const CREDITS_PER_VIDEO = 100;

const StoryVideos = () => {
  const [script, setScript] = useState("");
  const [selectedVoice, setSelectedVoice] = useState("female-1");
  const [selectedStyle, setSelectedStyle] = useState("cinematic");
  const [isGenerating, setIsGenerating] = useState(false);
  const [playingVoice, setPlayingVoice] = useState<string | null>(null);

  const handleGenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 3000);
  };

  const handlePlayVoice = (voiceId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setPlayingVoice(voiceId);
    // Simulate voice preview
    setTimeout(() => setPlayingVoice(null), 2000);
  };

  return (
    <DashboardLayout>
      <div className="p-8 animate-fade-in">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 rounded-lg bg-primary/10">
              <Clapperboard className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">
              Generate Story Videos
            </h1>
          </div>
          <p className="text-muted-foreground">
            Transform your script into engaging faceless videos with AI-powered visuals and voiceovers
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Script Input */}
          <div className="lg:col-span-2 space-y-6">
            {/* Script Section */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Type className="h-5 w-5 text-primary" />
                  Your Script
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Enter your story script here... The AI will transform this into a stunning video with matching visuals, background music, and professional voiceover."
                  value={script}
                  onChange={(e) => setScript(e.target.value)}
                  className="min-h-[200px] bg-secondary/50 border-border resize-none"
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{script.length} characters</span>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Wand2 className="h-4 w-4" />
                    Generate with AI
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Voice Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Volume2 className="h-5 w-5 text-primary" />
                  Choose Voice
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {voiceOptions.map((voice) => (
                    <button
                      key={voice.id}
                      onClick={() => setSelectedVoice(voice.id)}
                      className={`relative p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 ${
                        selectedVoice === voice.id
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/30 hover:border-primary/50"
                      }`}
                    >
                      <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-primary/30 to-accent/30 flex items-center justify-center relative">
                        <Volume2 className="h-5 w-5 text-primary" />
                        {/* Play Button Overlay */}
                        <button
                          onClick={(e) => handlePlayVoice(voice.id, e)}
                          className="absolute inset-0 rounded-full bg-background/80 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          {playingVoice === voice.id ? (
                            <div className="w-4 h-4 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <Play className="h-4 w-4 text-primary ml-0.5" />
                          )}
                        </button>
                      </div>
                      <p className="font-medium text-foreground">{voice.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{voice.preview}</p>
                      {selectedVoice === voice.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
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

            {/* Visual Style Selection */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5 text-primary" />
                  Visual Style
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {styleOptions.map((style, index) => (
                    <button
                      key={style.id}
                      onClick={() => setSelectedStyle(style.id)}
                      className={`relative rounded-xl overflow-hidden border-2 transition-all duration-300 hover:scale-105 aspect-[4/3] group ${
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
                      {/* Animated border for selected */}
                      {selectedStyle === style.id && (
                        <div className="absolute inset-0 rounded-xl overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary animate-pulse opacity-20" />
                        </div>
                      )}
                      <span className="absolute bottom-2 left-0 right-0 text-xs font-medium text-foreground text-center">
                        {style.name}
                      </span>
                      {selectedStyle === style.id && (
                        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
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
          </div>

          {/* Right Column - Preview & Generate */}
          <div className="space-y-6">
            {/* Preview Card */}
            <Card className="bg-card border-border overflow-hidden">
              <div className="aspect-[9/16] bg-gradient-to-br from-secondary via-muted to-secondary relative group">
                <div className="absolute inset-0 flex items-center justify-center">
                  {isGenerating ? (
                    <div className="text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                      <p className="text-muted-foreground">Generating your video...</p>
                    </div>
                  ) : (
                    <div className="text-center p-6">
                      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <Play className="h-8 w-8 text-primary ml-1" />
                      </div>
                      <p className="text-muted-foreground">Video preview will appear here</p>
                    </div>
                  )}
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
              <CardContent className="p-4">
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                  <span className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Est. ~45 seconds
                  </span>
                  <span>9:16 Portrait</span>
                </div>
                <Button
                  variant="hero"
                  className="w-full gap-2"
                  onClick={handleGenerate}
                  disabled={!script || isGenerating}
                >
                  {isGenerating ? (
                    <>
                      <div className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4" />
                      Generate Video
                      <span className="ml-2 flex items-center gap-1 text-sm opacity-80">
                        <Coins className="h-3.5 w-3.5" />
                        {CREDITS_PER_VIDEO}
                      </span>
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Tips Card */}
            <Card className="bg-gradient-to-br from-accent/10 to-primary/5 border-accent/20">
              <CardContent className="p-4">
                <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-accent" />
                  Pro Tips
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Keep scripts between 100-300 words for optimal engagement
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Use short sentences for better pacing
                  </li>
                  <li className="flex items-start gap-2">
                    <ChevronRight className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                    Start with a hook to grab attention
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

export default StoryVideos;
