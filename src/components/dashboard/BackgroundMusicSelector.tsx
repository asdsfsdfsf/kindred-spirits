import { cn } from "@/lib/utils";
import { Play, Pause, Music } from "lucide-react";
import { useState } from "react";

interface MusicTrack {
  id: string;
  name: string;
  tags: string;
}

interface BackgroundMusicSelectorProps {
  tracks: MusicTrack[];
  selectedTrack: string;
  onSelect: (trackId: string) => void;
}

const BackgroundMusicSelector = ({
  tracks,
  selectedTrack,
  onSelect,
}: BackgroundMusicSelectorProps) => {
  const [playingTrack, setPlayingTrack] = useState<string | null>(null);

  const handlePlay = (trackId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingTrack === trackId) {
      setPlayingTrack(null);
    } else {
      setPlayingTrack(trackId);
      // Simulate playing for 3 seconds
      setTimeout(() => setPlayingTrack(null), 3000);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Choose background music</h3>
          <p className="text-sm text-muted-foreground">Select or generate the perfect music for your video</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-secondary/50 border border-border">
          <Music className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Music Library</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2">
        {tracks.map((track) => (
          <button
            key={track.id}
            onClick={() => onSelect(track.id)}
            className={cn(
              "flex items-center justify-between p-4 rounded-xl border-2 transition-all duration-200 hover:scale-[1.02] text-left",
              selectedTrack === track.id
                ? "border-primary bg-primary/5"
                : "border-border bg-card hover:border-primary/50"
            )}
          >
            <div className="flex-1 min-w-0">
              <p className={cn(
                "font-medium truncate",
                selectedTrack === track.id ? "text-primary" : "text-foreground"
              )}>
                {track.name}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5 truncate">
                {track.tags}
              </p>
            </div>
            <button
              onClick={(e) => handlePlay(track.id, e)}
              className={cn(
                "ml-3 w-10 h-10 rounded-full flex items-center justify-center transition-all flex-shrink-0",
                playingTrack === track.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground"
              )}
            >
              {playingTrack === track.id ? (
                <Pause className="h-4 w-4" />
              ) : (
                <Play className="h-4 w-4 ml-0.5" />
              )}
            </button>
          </button>
        ))}
      </div>
    </div>
  );
};

export default BackgroundMusicSelector;
