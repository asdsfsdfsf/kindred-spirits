import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
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
  ArrowLeft,
  Play,
  Pause,
  Volume2,
  Maximize2,
  Layers,
  Type,
  Music,
  Activity,
  Plus,
  RefreshCw,
  Trash2,
  Sparkles,
  Settings2,
  Wand2,
} from "lucide-react";
import { cn } from "@/lib/utils";

// Mock data for frames
const mockFrames = [
  {
    id: "0",
    text: "Picture this a forgotten town shrouded in mist where whispers echo through the empty streets",
    duration: 6.0,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "1",
    text: "Every night the clock strikes midnight and shadows come alive",
    duration: 4.25,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "2",
    text: "They say a restless spirit roams searching for something lost",
    duration: 4.01,
    imageUrl: "/placeholder.svg",
  },
  {
    id: "3",
    text: "But what happens when someone finally decides to follow the whispers?",
    duration: 5.0,
    imageUrl: "/placeholder.svg",
  },
];

const animationEffects = [
  { id: "none", name: "None" },
  { id: "zoom-in", name: "Zoom In" },
  { id: "zoom-out", name: "Zoom Out" },
  { id: "pan-left", name: "Pan Left" },
  { id: "pan-right", name: "Pan Right" },
  { id: "fade", name: "Fade" },
  { id: "ken-burns", name: "Ken Burns" },
];

const captionStyles = [
  { id: "modern", name: "Modern" },
  { id: "classic", name: "Classic" },
  { id: "bold", name: "Bold" },
  { id: "minimal", name: "Minimal" },
  { id: "neon", name: "Neon" },
  { id: "handwritten", name: "Handwritten" },
];

const tabs = [
  { id: "frames", label: "Frames", icon: Layers },
  { id: "captions", label: "Captions", icon: Type },
  { id: "audio", label: "Audio", icon: Music },
  { id: "visualizer", label: "Visualizer", icon: Activity },
];

const StoryVideoEditor = () => {
  const [activeTab, setActiveTab] = useState("frames");
  const [selectedFrame, setSelectedFrame] = useState("0");
  const [frames, setFrames] = useState(mockFrames);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(4);
  const totalDuration = frames.reduce((sum, f) => sum + f.duration, 0);

  const handleTextChange = (frameId: string, newText: string) => {
    setFrames(frames.map(f => f.id === frameId ? { ...f, text: newText } : f));
  };

  const handleDeleteFrame = (frameId: string) => {
    if (frames.length > 1) {
      setFrames(frames.filter(f => f.id !== frameId));
      if (selectedFrame === frameId) {
        setSelectedFrame(frames[0].id === frameId ? frames[1].id : frames[0].id);
      }
    }
  };

  const handleAddFrame = (afterId: string) => {
    const newFrame = {
      id: `new-${Date.now()}`,
      text: "Add your text here...",
      duration: 4.0,
      imageUrl: "/placeholder.svg",
    };
    const index = frames.findIndex(f => f.id === afterId);
    const newFrames = [...frames];
    newFrames.splice(index + 1, 0, newFrame);
    setFrames(newFrames);
  };

  return (
    <DashboardLayout>
      <div className="h-[calc(100vh-2rem)] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-4">
            <Link
              to="/dashboard/history"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Videos
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              Save Draft
            </Button>
            <Button variant="hero" size="sm" className="gap-2">
              <Sparkles className="h-4 w-4" />
              Export Video
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Sidebar - Tabs */}
          <div className="w-16 border-r border-border flex flex-col items-center py-4 gap-2 bg-card">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "flex flex-col items-center gap-1 p-3 rounded-lg transition-colors w-14",
                  activeTab === tab.id
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                )}
              >
                <tab.icon className="h-5 w-5" />
                <span className="text-[10px] font-medium">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Middle - Frame Editor */}
          <div className="flex-1 flex flex-col min-w-0 bg-background">
            <div className="flex-1 overflow-y-auto p-6">
              {activeTab === "frames" && (
                <div className="space-y-4">
                  {frames.map((frame, index) => (
                    <div key={frame.id}>
                      {/* Add Frame Button (before first frame only) */}
                      {index === 0 && (
                        <div className="flex justify-center mb-4">
                          <button
                            onClick={() => handleAddFrame(frames[frames.length - 1].id)}
                            className="w-8 h-8 rounded-full border-2 border-dashed border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      )}

                      {/* Frame Card */}
                      <div
                        onClick={() => setSelectedFrame(frame.id)}
                        className={cn(
                          "rounded-xl border-2 p-4 transition-all cursor-pointer",
                          selectedFrame === frame.id
                            ? "border-primary bg-primary/5"
                            : "border-border bg-card hover:border-primary/50"
                        )}
                      >
                        {/* Frame Header */}
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-sm font-medium text-muted-foreground">#{index}</span>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs gap-1"
                            >
                              <RefreshCw className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-xs gap-1 bg-secondary/50"
                            >
                              <Wand2 className="h-3 w-3" />
                              Animate
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Settings2 className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2"
                            >
                              <Layers className="h-3 w-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 px-2 text-destructive hover:text-destructive"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteFrame(frame.id);
                              }}
                            >
                              <Trash2 className="h-3 w-3" />
                            </Button>
                          </div>
                        </div>

                        {/* Frame Content */}
                        <div className="flex gap-4">
                          <div className="flex-1">
                            {/* Voice Caption Badge */}
                            <div className="inline-flex items-center gap-1.5 px-2 py-1 rounded bg-primary/20 text-primary text-xs font-medium mb-2">
                              <Volume2 className="h-3 w-3" />
                              Voice caption
                            </div>
                            {/* Editable Text */}
                            <Textarea
                              value={frame.text}
                              onChange={(e) => handleTextChange(frame.id, e.target.value)}
                              className="min-h-[80px] bg-secondary/30 border-none resize-none text-sm"
                              onClick={(e) => e.stopPropagation()}
                            />
                          </div>
                          {/* Frame Preview Image */}
                          <div className="w-24 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-secondary to-muted flex-shrink-0">
                            <img
                              src={frame.imageUrl}
                              alt={`Frame ${index}`}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>

                        {/* Frame Footer */}
                        <div className="flex items-center justify-between mt-3 pt-3 border-t border-border/50">
                          <div className="flex items-center gap-1 text-xs text-muted-foreground">
                            <span>⏱</span>
                            <span>{frame.duration.toFixed(2)}s</span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAddFrame(frame.id);
                            }}
                            className="text-muted-foreground hover:text-primary transition-colors"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Add Frame Button (between frames) */}
                      <div className="flex justify-center my-4">
                        <button
                          onClick={() => handleAddFrame(frame.id)}
                          className="w-8 h-8 rounded-full border-2 border-dashed border-border hover:border-primary flex items-center justify-center text-muted-foreground hover:text-primary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === "captions" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Caption Style</h3>
                  <div className="grid grid-cols-3 gap-3">
                    {captionStyles.map((style) => (
                      <button
                        key={style.id}
                        className="p-4 rounded-xl border-2 border-border hover:border-primary/50 bg-card transition-all"
                      >
                        <div className="h-16 bg-secondary/50 rounded-lg mb-2 flex items-end justify-center pb-2">
                          <span className="text-xs font-medium text-primary bg-primary/20 px-2 py-1 rounded">
                            Sample text
                          </span>
                        </div>
                        <p className="text-sm font-medium text-foreground">{style.name}</p>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "audio" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Background Music</h3>
                  <p className="text-sm text-muted-foreground">Select background music for your video</p>
                  {/* Music selection would go here */}
                </div>
              )}

              {activeTab === "visualizer" && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Animation Effects</h3>
                  <Select defaultValue="ken-burns">
                    <SelectTrigger className="bg-secondary/30 border-border">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {animationEffects.map((effect) => (
                        <SelectItem key={effect.id} value={effect.id}>
                          {effect.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>
          </div>

          {/* Right - Video Preview */}
          <div className="w-[400px] border-l border-border bg-card flex flex-col">
            {/* Video Preview */}
            <div className="flex-1 p-4 flex items-center justify-center">
              <div className="relative aspect-[9/16] w-full max-w-[280px] rounded-2xl overflow-hidden bg-gradient-to-br from-secondary to-muted">
                {/* Video placeholder */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                    <Play className="h-6 w-6 text-primary ml-1" />
                  </div>
                </div>
                
                {/* Watermark */}
                <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-background/50 backdrop-blur-sm px-2 py-1 rounded">
                  <div className="w-4 h-4 bg-primary rounded" />
                  <span className="text-xs font-medium text-foreground">StoryShort.ai</span>
                </div>

                {/* Caption Preview */}
                <div className="absolute bottom-20 left-0 right-0 px-4">
                  <div className="text-center">
                    <span className="inline bg-primary/90 text-primary-foreground px-3 py-1.5 rounded-lg text-sm font-medium">
                      whispers <em className="text-primary-foreground/80">echo through</em>
                    </span>
                  </div>
                </div>

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/80 to-transparent">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors"
                    >
                      {isPlaying ? (
                        <Pause className="h-4 w-4 text-foreground" />
                      ) : (
                        <Play className="h-4 w-4 text-foreground ml-0.5" />
                      )}
                    </button>
                    <button className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                      <Volume2 className="h-4 w-4 text-foreground" />
                    </button>
                    <div className="flex-1 text-center">
                      <span className="text-xs text-foreground/80">
                        {Math.floor(currentTime / 60)}:{(currentTime % 60).toString().padStart(2, '0')} / {Math.floor(totalDuration / 60)}:{Math.floor(totalDuration % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-foreground/10 flex items-center justify-center hover:bg-foreground/20 transition-colors">
                      <Maximize2 className="h-4 w-4 text-foreground" />
                    </button>
                  </div>
                  {/* Progress Bar */}
                  <div className="mt-2 h-1 bg-foreground/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all"
                      style={{ width: `${(currentTime / totalDuration) * 100}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StoryVideoEditor;
