import React from 'react';
import { Calendar, Clock } from 'lucide-react';

export interface DateTimePickerProps {
  label?: string;
  value?: string;
  onChange?: (val: string) => void;
  type?: 'date' | 'datetime-local' | 'time';
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
}

export const DateTimePicker: React.FC<DateTimePickerProps> = ({
  label,
  value,
  onChange,
  type = 'date',
  required = false,
  disabled = false,
  error,
  helperText
}) => {
  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-medium text-[var(--plm-text-secondary)] select-none flex items-center justify-between">
          <span>{label}</span>
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        <span className="absolute left-3 text-[var(--plm-text-secondary)] pointer-events-none flex items-center">
          {type === 'time' ? <Clock className="w-4 h-4" /> : <Calendar className="w-4 h-4" />}
        </span>
        <input
          type={type}
          value={value}
          onChange={e => onChange?.(e.target.value)}
          disabled={disabled}
          style={{ borderRadius: 'var(--plm-radius, 6px)' }}
          className={`w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border ${
            error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[var(--plm-input-border)] focus:border-[var(--plm-primary)] focus:ring-1 focus:ring-[var(--plm-primary)]'
          } text-xs font-mono pl-9 pr-3 py-1.5 min-h-[36px] outline-none transition-all disabled:opacity-50`}
        />
      </div>
      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[var(--plm-text-secondary)]">{helperText}</span>
      ) : null}
    </div>
  );
};
