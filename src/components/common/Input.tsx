import React from 'react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  className = '',
  id,
  style,
  ...props
}) => {
  const inputId = id || (label ? `input-${label.replace(/\s+/g, '-').toLowerCase()}` : undefined);

  return (
    <div className="w-full flex flex-col gap-1.5">
      {label && (
        <label
          htmlFor={inputId}
          className="text-xs font-medium text-[var(--plm-text-secondary)] select-none flex items-center justify-between"
        >
          <span>{label}</span>
          {props.required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative flex items-center">
        {leftIcon && (
          <span className="absolute left-3 text-[var(--plm-text-secondary)] pointer-events-none flex items-center">
            {leftIcon}
          </span>
        )}
        <input
          id={inputId}
          style={{
            borderRadius: 'var(--plm-radius, 6px)',
            ...style
          }}
          className={`w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border ${
            error
              ? 'border-red-500 focus:ring-1 focus:ring-red-500'
              : 'border-[var(--plm-input-border)] focus:border-[var(--plm-primary)] focus:ring-1 focus:ring-[var(--plm-primary)]'
          } text-sm px-3 py-1.5 min-h-[36px] outline-none transition-all placeholder:text-[var(--plm-text-secondary)]/60 disabled:opacity-50 disabled:bg-slate-50 dark:disabled:bg-slate-900 ${
            leftIcon ? 'pl-9' : ''
          } ${rightIcon ? 'pr-9' : ''} ${className}`}
          {...props}
        />
        {rightIcon && (
          <span className="absolute right-3 text-[var(--plm-text-secondary)] pointer-events-none flex items-center">
            {rightIcon}
          </span>
        )}
      </div>
      {error ? (
        <span className="text-xs text-red-500 font-medium">{error}</span>
      ) : helperText ? (
        <span className="text-xs text-[var(--plm-text-secondary)]">{helperText}</span>
      ) : null}
    </div>
  );
};
