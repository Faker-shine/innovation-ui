import React, { useEffect } from 'react';
import { X } from 'lucide-react';

export interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'sm' | 'md' | 'lg';
}

export const Drawer: React.FC<DrawerProps> = ({
  isOpen,
  onClose,
  title,
  subtitle,
  children,
  footer,
  width = 'md'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 320px ~ 420px as specified in Page 6
  const widthClasses = {
    sm: 'w-[320px]',
    md: 'w-[380px]',
    lg: 'w-[440px]'
  }[width];

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        className="absolute inset-0 bg-black/35 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />
      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div
          className={`${widthClasses} max-w-full bg-[var(--plm-surface)] text-[var(--plm-text)] border-l border-[var(--plm-border)] shadow-2xl flex flex-col`}
        >
          {/* Header */}
          <div className="px-5 py-4 border-b border-[var(--plm-border)] flex items-center justify-between">
            <div className="min-w-0 pr-3">
              <h3 className="text-sm font-semibold text-[var(--plm-text)] truncate">{title}</h3>
              {subtitle && (
                <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5 truncate">{subtitle}</p>
              )}
            </div>
            <button
              onClick={onClose}
              className="p-1 text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] rounded-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 p-5 overflow-y-auto space-y-4">{children}</div>

          {/* Footer */}
          {footer && (
            <div className="px-5 py-3.5 border-t border-[var(--plm-border)] bg-slate-50/50 dark:bg-slate-900/30 flex items-center justify-end gap-2.5">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
