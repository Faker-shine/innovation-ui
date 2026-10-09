import React from 'react';

export interface DividerProps {
  label?: React.ReactNode;
  orientation?: 'horizontal' | 'vertical';
  variant?: 'solid' | 'dashed' | 'accent';
  className?: string;
}

export const Divider: React.FC<DividerProps> = ({
  label,
  orientation = 'horizontal',
  variant = 'solid',
  className = ''
}) => {
  if (orientation === 'vertical') {
    return (
      <div
        className={`w-px self-stretch ${
          variant === 'dashed'
            ? 'border-l border-dashed border-[var(--plm-border)]'
            : variant === 'accent'
            ? 'bg-[var(--plm-primary)]'
            : 'bg-[var(--plm-border)]'
        } ${className}`}
      />
    );
  }

  if (label) {
    return (
      <div className={`flex items-center gap-3 w-full my-3 ${className}`}>
        <div
          className={`flex-1 h-px ${
            variant === 'dashed' ? 'border-t border-dashed border-[var(--plm-border)]' : 'bg-[var(--plm-border)]'
          }`}
        />
        <span className="text-xs text-[var(--plm-text-secondary)] font-medium select-none whitespace-nowrap">
          {label}
        </span>
        <div
          className={`flex-1 h-px ${
            variant === 'dashed' ? 'border-t border-dashed border-[var(--plm-border)]' : 'bg-[var(--plm-border)]'
          }`}
        />
      </div>
    );
  }

  return (
    <div
      className={`w-full h-px my-2 ${
        variant === 'dashed'
          ? 'border-t border-dashed border-[var(--plm-border)]'
          : variant === 'accent'
          ? 'bg-[var(--plm-primary)]'
          : 'bg-[var(--plm-border)]'
      } ${className}`}
    />
  );
};
