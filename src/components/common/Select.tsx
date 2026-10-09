import React from 'react';
import { ChevronDown } from 'lucide-react';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: SelectOption[];
  error?: string;
}

export const Select: React.FC<SelectProps> = ({
  label,
  options,
  error,
  className = '',
  id,
  style,
  ...props
}) => {
  const selectId = id || (label ? `select-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={selectId}
          className="text-xs font-medium text-[var(--plm-text-secondary)] select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <select
          id={selectId}
          style={{
            borderRadius: 'var(--plm-radius, 6px)',
            ...style
          }}
          className={`w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border ${
            error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[var(--plm-input-border)] focus:border-[var(--plm-primary)] focus:ring-1 focus:ring-[var(--plm-primary)]'
          } text-sm px-3 pr-8 py-1.5 min-h-[36px] outline-none transition-all appearance-none cursor-pointer disabled:opacity-50 ${className}`}
          {...props}
        >
          {options.map(opt => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown className="w-4 h-4 text-[var(--plm-text-secondary)] absolute right-2.5 pointer-events-none" />
      </div>
      {error && <span className="text-xs text-red-500 font-medium">{error}</span>}
    </div>
  );
};
