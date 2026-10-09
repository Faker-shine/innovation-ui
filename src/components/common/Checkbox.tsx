import React, { useRef, useEffect } from 'react';
import { Check, Minus } from 'lucide-react';

export interface CheckboxProps {
  checked?: boolean;
  indeterminate?: boolean;
  onChange?: (checked: boolean) => void;
  label?: React.ReactNode;
  description?: string;
  disabled?: boolean;
  className?: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  indeterminate = false,
  onChange,
  label,
  description,
  disabled = false,
  className = ''
}) => {
  return (
    <label
      className={`inline-flex items-start gap-2.5 select-none cursor-pointer ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
    >
      <div className="relative flex items-center justify-center pt-0.5">
        <input
          type="checkbox"
          checked={checked}
          disabled={disabled}
          onChange={e => onChange?.(e.target.checked)}
          className="sr-only"
        />
        <div
          style={{ borderRadius: 'var(--plm-radius, 4px)' }}
          className={`w-4 h-4 border transition-all flex items-center justify-center ${
            checked || indeterminate
              ? 'bg-[var(--plm-primary)] border-[var(--plm-primary)] text-white shadow-2xs'
              : 'border-[var(--plm-input-border)] bg-[var(--plm-surface)] hover:border-[var(--plm-primary)]'
          }`}
        >
          {indeterminate ? (
            <Minus className="w-3 h-3 stroke-[3]" />
          ) : checked ? (
            <Check className="w-3 h-3 stroke-[3]" />
          ) : null}
        </div>
      </div>
      {(label || description) && (
        <div className="flex flex-col text-xs">
          {label && (
            <span className="font-medium text-[var(--plm-text)] leading-tight">{label}</span>
          )}
          {description && (
            <span className="text-[11px] text-[var(--plm-text-secondary)] mt-0.5 leading-tight">
              {description}
            </span>
          )}
        </div>
      )}
    </label>
  );
};
