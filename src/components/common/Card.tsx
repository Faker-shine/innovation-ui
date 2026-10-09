import React from 'react';

export interface CardProps {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  extra?: React.ReactNode;
  footer?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'outlined' | 'subtle';
  padding?: 'sm' | 'md' | 'lg' | 'none';
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  extra,
  footer,
  children,
  className = '',
  variant = 'default',
  padding = 'md',
  headerBorder = true
}) => {
  const paddingClasses = {
    none: 'p-0',
    sm: 'p-3',
    md: 'p-5',
    lg: 'p-6'
  }[padding];

  const variantClasses = {
    default: 'bg-[var(--plm-surface)] border border-[var(--plm-border)] shadow-xs',
    outlined: 'bg-[var(--plm-surface)] border border-[var(--plm-border)]',
    subtle: 'bg-[var(--plm-bg)] border border-[var(--plm-border)]'
  }[variant];

  return (
    <div
      style={{ borderRadius: 'var(--plm-radius, 6px)' }}
      className={`overflow-hidden transition-all ${variantClasses} ${className}`}
    >
      {(title || subtitle || extra) && (
        <div
          className={`flex items-center justify-between px-5 py-3.5 ${
            headerBorder ? 'border-b border-[var(--plm-border)]' : ''
          }`}
        >
          <div className="min-w-0 pr-2">
            {title && (
              <h4 className="text-sm font-semibold text-[var(--plm-text)] leading-tight truncate">
                {title}
              </h4>
            )}
            {subtitle && (
              <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5 truncate leading-tight">
                {subtitle}
              </p>
            )}
          </div>
          {extra && <div className="shrink-0">{extra}</div>}
        </div>
      )}

      <div className={paddingClasses}>{children}</div>

      {footer && (
        <div className="px-5 py-3 border-t border-[var(--plm-border)] bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-between text-xs text-[var(--plm-text-secondary)]">
          {footer}
        </div>
      )}
    </div>
  );
};
