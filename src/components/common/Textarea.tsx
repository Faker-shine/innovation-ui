import React from 'react';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  showCount?: boolean;
  maxLength?: number;
}

export const Textarea: React.FC<TextareaProps> = ({
  label,
  error,
  helperText,
  showCount = false,
  maxLength,
  className = '',
  value,
  id,
  style,
  ...props
}) => {
  const textareaId = id || (label ? `textarea-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);
  const currentLength = typeof value === 'string' ? value.length : 0;

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <div className="flex items-center justify-between text-xs font-medium text-[var(--plm-text-secondary)] select-none">
          <label htmlFor={textareaId} className="flex items-center gap-1">
            <span>{label}</span>
            {props.required && <span className="text-red-500">*</span>}
          </label>
          {showCount && maxLength && (
            <span className="font-mono text-[11px] text-[var(--plm-text-secondary)]">
              {currentLength}/{maxLength}
            </span>
          )}
        </div>
      )}
      <textarea
        id={textareaId}
        maxLength={maxLength}
        value={value}
        style={{
          borderRadius: 'var(--plm-radius, 6px)',
          ...style
        }}
        className={`w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border ${
          error
            ? 'border-red-500 focus:ring-1 focus:ring-red-500'
            : 'border-[var(--plm-input-border)] focus:border-[var(--plm-primary)] focus:ring-1 focus:ring-[var(--plm-primary)]'
        } text-sm p-3 outline-none transition-all placeholder:text-[var(--plm-text-secondary)]/60 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900 resize-y min-h-[80px] ${className}`}
        {...props}
      />
      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[var(--plm-text-secondary)]">{helperText}</span>
      ) : null}
    </div>
  );
};
