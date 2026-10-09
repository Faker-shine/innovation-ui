import React from 'react';

export interface TabItem {
  key: string;
  label: React.ReactNode;
  badge?: string | number;
  icon?: React.ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  activeKey: string;
  onChange: (key: string) => void;
  items: TabItem[];
  variant?: 'line' | 'card' | 'segmented';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({
  activeKey,
  onChange,
  items,
  variant = 'line',
  size = 'md',
  className = ''
}) => {
  const sizeClasses = {
    sm: 'text-xs py-1.5 px-3',
    md: 'text-sm py-2 px-4',
    lg: 'text-base py-2.5 px-5'
  }[size];

  if (variant === 'segmented') {
    return (
      <div
        style={{ borderRadius: 'var(--plm-radius, 6px)' }}
        className={`inline-flex items-center p-1 bg-[var(--plm-bg)] border border-[var(--plm-border)] gap-1 select-none ${className}`}
      >
        {items.map(tab => {
          const isActive = activeKey === tab.key;
          return (
            <button
              key={tab.key}
              disabled={tab.disabled}
              onClick={() => onChange(tab.key)}
              style={{ borderRadius: 'var(--plm-radius, 4px)' }}
              className={`flex items-center gap-1.5 transition-all font-medium cursor-pointer whitespace-nowrap ${sizeClasses} ${
                isActive
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] shadow-xs font-semibold'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              } disabled:opacity-40 disabled:cursor-not-allowed`}
            >
              {tab.icon}
              <span>{tab.label}</span>
              {tab.badge !== undefined && (
                <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 rounded-full text-slate-800 dark:text-slate-200">
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`border-b border-[var(--plm-border)] flex items-center gap-2 select-none overflow-x-auto ${className}`}>
      {items.map(tab => {
        const isActive = activeKey === tab.key;
        return (
          <button
            key={tab.key}
            disabled={tab.disabled}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 font-medium transition-colors border-b-2 cursor-pointer whitespace-nowrap ${sizeClasses} ${
              isActive
                ? 'border-[var(--plm-primary)] text-[var(--plm-primary)] font-semibold'
                : 'border-transparent text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
            } disabled:opacity-40 disabled:cursor-not-allowed`}
          >
            {tab.icon}
            <span>{tab.label}</span>
            {tab.badge !== undefined && (
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-xs border ${
                  isActive
                    ? 'bg-[var(--plm-primary)]/10 text-[var(--plm-primary)] border-[var(--plm-primary)]/30'
                    : 'bg-[var(--plm-bg)] text-[var(--plm-text-secondary)] border-[var(--plm-border)]'
                }`}
              >
                {tab.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};
