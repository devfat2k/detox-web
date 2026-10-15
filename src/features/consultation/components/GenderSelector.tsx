import { Check } from "lucide-react";

interface GenderSelectorProps {
  value: "female" | "male" | undefined;
  onChange: (value: "female" | "male") => void;
}

const GENDER_OPTIONS = [
  { id: "female" as const, label: "Nữ" },
  { id: "male" as const, label: "Nam" },
];

export function GenderSelector({ value, onChange }: GenderSelectorProps) {
  return (
    <div className="space-y-1">
      <label className="font-body text-md font-medium text-text select-none block">
        Giới tính: <span className="text-error">*</span>
      </label>
      <div className="grid grid-cols-2 gap-3">
        {GENDER_OPTIONS.map((g) => {
          const isSelected = value === g.id;
          return (
            <button
              key={g.id}
              type="button"
              onClick={() => onChange(g.id)}
              className={`min-h-12 px-5 py-3 rounded-xl font-body text-sm font-medium transition-all duration-200 select-none flex items-center justify-center gap-2 border ${
                isSelected
                  ? "bg-accent-soft/80 text-primary border-primary shadow-2xs font-semibold"
                  : "bg-surface border-border text-text-muted hover:border-primary/40 hover:text-text hover:bg-bg"
              }`}
            >
              <div
                className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                  isSelected
                    ? "border-primary bg-primary text-bg"
                    : "border-border bg-bg"
                }`}
              >
                {isSelected && (
                  <Check className="w-3 h-3 text-bg" strokeWidth={1.75} />
                )}
              </div>
              <span>{g.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
