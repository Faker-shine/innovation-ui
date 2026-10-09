import React from 'react';
import { Search, X } from 'lucide-react';

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onClear?: () => void;
  shortcutBadge?: string;
  sizeVariant?: 'sm' | 'md' | 'lg';
}

export const SearchInput: React.FC<SearchInputProps> = ({
  value,
  onChange,
  onClear,
  shortcutBadge = '⌘K',
  sizeVariant = 'md',
  className = '',
  placeholder = '快速检索物料编码、零件名称或图号...',
  style,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs pl-8 pr-7 py-1 min-h-[30px]',
    md: 'text-sm pl-9 pr-8 py-1.5 min-h-[36px]',
    lg: 'text-base pl-10 pr-9 py-2.5 min-h-[44px]'
  }[sizeVariant];

  const iconSizes = {
    sm: 'w-3.5 h-3.5 left-2.5',
    md: 'w-4 h-4 left-3',
    lg: 'w-4.5 h-4.5 left-3.5'
  }[sizeVariant];

  const hasValue = Boolean(value);

  return (
    <div className="relative w-full flex items-center">
      <Search
        className={`absolute text-[var(--plm-text-secondary)] pointer-events-none transition-colors ${iconSizes}`}
      />
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        style={{
          borderRadius: 'var(--plm-radius, 6px)',
          ...style
        }}
        className={`w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border border-[var(--plm-input-border)] focus:border-[var(--plm-primary)] focus:ring-1 focus:ring-[var(--plm-primary)] outline-none transition-all placeholder:text-[var(--plm-text-secondary)]/60 ${sizeClasses} ${className}`}
        {...props}
      />
      {hasValue && onClear ? (
        <button
          type="button"
          onClick={onClear}
          className="absolute right-2.5 p-0.5 rounded-full text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors cursor-pointer"
          title="清空搜索"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      ) : shortcutBadge ? (
        <span className="absolute right-2.5 px-1.5 py-0.5 text-[10px] font-mono text-[var(--plm-text-secondary)] bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs pointer-events-none">
          {shortcutBadge}
        </span>
      ) : null}
    </div>
  );
};
