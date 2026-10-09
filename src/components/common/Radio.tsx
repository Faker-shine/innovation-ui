import React from 'react';

export interface RadioOption {
  value: string;
  label: React.ReactNode;
  description?: string;
  badge?: string;
  disabled?: boolean;
}

export interface RadioGroupProps {
  name?: string;
  value: string;
  onChange: (val: string) => void;
  options: RadioOption[];
  variant?: 'standard' | 'card' | 'segmented';
  direction?: 'horizontal' | 'vertical';
  disabled?: boolean;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  name = 'radio-group',
  value,
  onChange,
  options,
  variant = 'standard',
  direction = 'vertical',
  disabled = false
}) => {
  if (variant === 'segmented') {
    return (
      <div
        style={{ borderRadius: 'var(--plm-radius, 6px)' }}
        className="inline-flex items-center p-1 bg-[var(--plm-bg)] border border-[var(--plm-border)] gap-1 select-none"
      >
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <button
              key={opt.value}
              type="button"
              disabled={disabled || opt.disabled}
              onClick={() => onChange(opt.value)}
              style={{ borderRadius: 'var(--plm-radius, 4px)' }}
              className={`px-3 py-1.5 text-xs font-medium transition-all cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] shadow-xs font-semibold'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {opt.label}
            </button>
          );
        })}
      </div>
    );
  }

  if (variant === 'card') {
    return (
      <div
        className={`grid gap-2.5 ${
          direction === 'horizontal' ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1'
        }`}
      >
        {options.map(opt => {
          const isSelected = value === opt.value;
          return (
            <div
              key={opt.value}
              onClick={() => !disabled && !opt.disabled && onChange(opt.value)}
              style={{ borderRadius: 'var(--plm-radius, 6px)' }}
              className={`p-3 border transition-all cursor-pointer select-none flex flex-col justify-between ${
                isSelected
                  ? 'border-[var(--plm-primary)] bg-[var(--plm-primary)]/5 dark:bg-[var(--plm-primary)]/10 ring-1 ring-[var(--plm-primary)]'
                  : 'border-[var(--plm-border)] bg-[var(--plm-surface)] hover:border-[var(--plm-input-border)]'
              } ${disabled || opt.disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-center gap-2">
                  <div
                    className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center ${
                      isSelected
                        ? 'border-[var(--plm-primary)] bg-[var(--plm-primary)]'
                        : 'border-[var(--plm-input-border)] bg-[var(--plm-surface)]'
                    }`}
                  >
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                  <span className="text-xs font-semibold text-[var(--plm-text)]">{opt.label}</span>
                </div>
                {opt.badge && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs text-[var(--plm-text-secondary)]">
                    {opt.badge}
                  </span>
                )}
              </div>
              {opt.description && (
                <p className="text-[11px] text-[var(--plm-text-secondary)] mt-1.5 pl-5.5 leading-snug">
                  {opt.description}
                </p>
              )}
            </div>
          );
        })}
      </div>
    );
  }

  // Standard Radio
  return (
    <div
      className={`flex gap-3 ${
        direction === 'horizontal' ? 'flex-row flex-wrap items-center' : 'flex-col'
      }`}
    >
      {options.map(opt => {
        const isSelected = value === opt.value;
        return (
          <label
            key={opt.value}
            className={`inline-flex items-start gap-2.5 cursor-pointer select-none ${
              disabled || opt.disabled ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            <div className="pt-0.5">
              <input
                type="radio"
                name={name}
                value={opt.value}
                checked={isSelected}
                disabled={disabled || opt.disabled}
                onChange={() => onChange(opt.value)}
                className="sr-only"
              />
              <div
                className={`w-4 h-4 rounded-full border transition-all flex items-center justify-center ${
                  isSelected
                    ? 'border-[var(--plm-primary)] bg-[var(--plm-primary)]'
                    : 'border-[var(--plm-input-border)] bg-[var(--plm-surface)] hover:border-[var(--plm-primary)]'
                }`}
              >
                {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
              </div>
            </div>
            <div className="flex flex-col text-xs">
              <span className="font-medium text-[var(--plm-text)] leading-tight">{opt.label}</span>
              {opt.description && (
                <span className="text-[11px] text-[var(--plm-text-secondary)] mt-0.5 leading-tight">
                  {opt.description}
                </span>
              )}
            </div>
          </label>
        );
      })}
    </div>
  );
};
