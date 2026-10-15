import { Input } from "@/components/ui";

interface MetricInputCardProps {
  id: string;
  label: string;
  unit: string;
  placeholder: string;
  value: string | number | undefined;
  error?: string;
  presets: readonly number[];
  onPresetSelect: (value: number) => void;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
}

export function MetricInputCard({
  id,
  label,
  unit,
  placeholder,
  value,
  error,
  presets,
  onPresetSelect,
  inputProps,
}: MetricInputCardProps) {
  const numValue = Number(value);
  const hasValidValue = Boolean(value && !isNaN(numValue) && numValue > 0);

  return (
    <div className="p-4 rounded-xl bg-surface border border-border space-y-2.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={id}
          className="font-body text-sm font-medium text-text select-none"
        >
          {label}: <span className="text-error">*</span>
        </label>
        {hasValidValue && (
          <span className="text-xs font-mono text-primary font-semibold">
            {numValue} {unit}
          </span>
        )}
      </div>

      <Input
        id={id}
        type="text"
        inputMode="numeric"
        placeholder={placeholder}
        unit={unit}
        error={error}
        {...inputProps}
      />

      <div className="flex flex-wrap items-center gap-1.5 pt-1">
        <span className="text-[11px] text-text-muted/70 select-none mr-1">
          Gợi ý:
        </span>
        {presets.map((val) => (
          <button
            key={val}
            type="button"
            onClick={() => onPresetSelect(val)}
            className={`p-3 text-xs font-medium rounded-2xl border transition-all duration-150 select-none ${
              numValue === val
                ? "bg-accent-soft border-primary text-primary font-semibold shadow-2xs"
                : "bg-bg border-border text-text-muted hover:border-primary/40 hover:text-text"
            }`}
          >
            {val}
          </button>
        ))}
      </div>
    </div>
  );
}
