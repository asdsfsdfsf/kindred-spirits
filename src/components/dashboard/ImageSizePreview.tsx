import { cn } from "@/lib/utils";

interface ImageSizePreviewProps {
  ratio: string;
  isSelected: boolean;
  onClick: () => void;
  label: string;
  description?: string;
}

const getAspectClass = (ratio: string) => {
  switch (ratio) {
    case "1:1":
      return "w-8 h-8";
    case "16:9":
      return "w-10 h-6";
    case "9:16":
      return "w-5 h-9";
    case "4:3":
      return "w-8 h-6";
    case "4:5":
      return "w-7 h-9";
    case "3:4":
      return "w-6 h-8";
    default:
      return "w-8 h-8";
  }
};

export const ImageSizePreview = ({
  ratio,
  isSelected,
  onClick,
  label,
  description,
}: ImageSizePreviewProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-105 min-w-[100px]",
        isSelected
          ? "border-primary bg-primary/10 ring-2 ring-primary/30"
          : "border-border bg-secondary/30 hover:border-primary/50"
      )}
    >
      {/* Visual aspect ratio preview */}
      <div className="h-12 flex items-center justify-center">
        <div
          className={cn(
            "rounded border-2 transition-colors",
            isSelected ? "border-primary bg-primary/20" : "border-muted-foreground/50 bg-muted/50",
            getAspectClass(ratio)
          )}
        />
      </div>
      <div className="text-center">
        <p className={cn(
          "text-sm font-medium",
          isSelected ? "text-primary" : "text-foreground"
        )}>
          {label}
        </p>
        {description && (
          <p className="text-[10px] text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      {isSelected && (
        <div className="absolute top-2 right-2 w-4 h-4 rounded-full bg-primary flex items-center justify-center">
          <svg className="w-2.5 h-2.5 text-primary-foreground" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </div>
      )}
    </button>
  );
};

interface ImageSizeSelectorProps {
  options: Array<{ id: string; name: string; description?: string }>;
  value: string;
  onChange: (value: string) => void;
}

export const ImageSizeSelector = ({ options, value, onChange }: ImageSizeSelectorProps) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      {options.map((option) => (
        <ImageSizePreview
          key={option.id}
          ratio={option.id}
          isSelected={value === option.id}
          onClick={() => onChange(option.id)}
          label={option.id}
          description={option.description || option.name}
        />
      ))}
    </div>
  );
};

export default ImageSizeSelector;
