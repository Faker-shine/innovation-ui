import React, { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export interface NavMenuItem {
  key: string;
  label: string;
  icon?: React.ReactNode;
  badge?: string | number;
  children?: NavMenuItem[];
}

export interface NavMenuProps {
  items: NavMenuItem[];
  activeKey: string;
  onSelect: (key: string) => void;
  mode?: 'vertical' | 'horizontal';
  className?: string;
}

export const NavMenu: React.FC<NavMenuProps> = ({
  items,
  activeKey,
  onSelect,
  mode = 'vertical',
  className = ''
}) => {
  const [openSubMenus, setOpenSubMenus] = useState<Record<string, boolean>>({
    'pdm': true
  });

  const toggleSubMenu = (key: string) => {
    setOpenSubMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  if (mode === 'horizontal') {
    return (
      <nav className={`flex items-center gap-1 select-none ${className}`}>
        {items.map(item => {
          const isActive = activeKey === item.key;
          return (
            <button
              key={item.key}
              onClick={() => onSelect(item.key)}
              style={{ borderRadius: 'var(--plm-radius, 4px)' }}
              className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer ${
                isActive
                  ? 'bg-[var(--plm-primary)] text-white shadow-2xs font-semibold'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
              }`}
            >
              {item.icon}
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  // Vertical Navigation Menu
  return (
    <nav className={`space-y-1 select-none text-xs ${className}`}>
      {items.map(item => {
        const hasChildren = item.children && item.children.length > 0;
        const isOpen = Boolean(openSubMenus[item.key]);
        const isActive = activeKey === item.key;

        return (
          <div key={item.key} className="space-y-1">
            <button
              onClick={() => {
                if (hasChildren) {
                  toggleSubMenu(item.key);
                } else {
                  onSelect(item.key);
                }
              }}
              style={{ borderRadius: 'var(--plm-radius, 4px)' }}
              className={`w-full flex items-center justify-between px-3 py-2 transition-colors cursor-pointer ${
                isActive && !hasChildren
                  ? 'bg-[var(--plm-primary)] text-white shadow-xs font-semibold'
                  : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0">
                {item.icon}
                <span className="truncate">{item.label}</span>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                {item.badge !== undefined && (
                  <span className="text-[10px] font-mono px-1.5 py-0.2 bg-slate-200 dark:bg-slate-700 rounded-full text-slate-700 dark:text-slate-300">
                    {item.badge}
                  </span>
                )}
                {hasChildren && (
                  <span className="text-[var(--plm-text-secondary)]">
                    {isOpen ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
                  </span>
                )}
              </div>
            </button>

            {/* Submenu Items */}
            {hasChildren && isOpen && (
              <div className="pl-6 space-y-1 border-l border-[var(--plm-border)] ml-3">
                {item.children!.map(child => {
                  const isChildActive = activeKey === child.key;
                  return (
                    <button
                      key={child.key}
                      onClick={() => onSelect(child.key)}
                      style={{ borderRadius: 'var(--plm-radius, 4px)' }}
                      className={`w-full text-left px-3 py-1.5 transition-colors cursor-pointer flex items-center justify-between ${
                        isChildActive
                          ? 'bg-[var(--plm-selected-bg)] text-[var(--plm-primary)] font-semibold border-l-2 border-[var(--plm-primary)]'
                          : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                      }`}
                    >
                      <span className="truncate">{child.label}</span>
                      {child.badge && (
                        <span className="text-[10px] font-mono text-[var(--plm-text-secondary)]">
                          {child.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </nav>
  );
};
