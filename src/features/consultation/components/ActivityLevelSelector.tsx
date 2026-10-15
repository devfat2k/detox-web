interface ActivityOption {
  id: "low" | "moderate" | "high";
  label: string;
  desc: string;
}

interface ActivityLevelSelectorProps {
  options: readonly ActivityOption[];
  value: "low" | "moderate" | "high" | undefined;
  onChange: (value: "low" | "moderate" | "high") => void;
  error?: string;
}

export function ActivityLevelSelector({
  options,
  value,
  onChange,
  error,
}: ActivityLevelSelectorProps) {
  return (
    <div className="space-y-2 pt-1">
      <label className="font-body text-md font-medium text-text select-none block">
        Mức độ vận động: <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-1 gap-3">
        {options.map((opt) => {
          const isSelected = value === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => onChange(opt.id)}
              className={`w-full  p-4 rounded-xl border text-left transition-all duration-200 select-none flex  items-center gap-3.5 ${
                isSelected
                  ? "bg-accent-soft/70 border-primary shadow-2xs"
                  : "bg-surface border-border hover:border-primary/40 hover:bg-bg"
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full border mt-0.5 flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-bg"
                    : "border-border bg-bg"
                }`}
              >
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-surface" />
                )}
              </div>
              <div className="space-y-1">
                <span
                  className={`font-body text-sm font-medium block ${isSelected ? "text-primary" : "text-text"}`}
                >
                  {opt.label}
                </span>
                <span className="font-body text-xs text-text-muted leading-relaxed block">
                  {opt.desc}
                </span>
              </div>
            </button>
          );
        })}
      </div>
      {error && <p className="font-body text-xs text-error pt-1">{error}</p>}
    </div>
  );
}
