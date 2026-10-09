import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon, Sparkles, BookOpen } from 'lucide-react';
import { ThemePreset } from '../../types/theme';

export interface TopBarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenGuideModal?: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  activeTab,
  setActiveTab,
  onOpenGuideModal
}) => {
  const { mode, setMode, preset, setPreset } = useTheme();

  const navLinks = [
    { id: 'colors', label: '色彩规范' },
    { id: 'typography', label: '字体排版' },
    { id: 'components', label: '组件库' },
    { id: 'workspace', label: 'BOM与工作区' },
    { id: 'theme-center', label: '主题中心' },
    { id: 'guidelines', label: '设计指南' }
  ];

  return (
    <header className="h-[56px] min-h-[56px] max-h-[56px] w-full bg-[var(--plm-surface)] border-b border-[var(--plm-border)] px-6 flex items-center justify-between gap-8 sticky top-0 z-40 select-none">
      {/* Zone 1: Single text element Brand wordmark */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-7 h-7 rounded-sm bg-[var(--plm-primary)] flex items-center justify-center text-white font-bold text-xs shadow-xs">
          PLM
        </div>
        <div className="flex items-center gap-2">
          <span className="text-base font-bold tracking-tight text-[var(--plm-text)] whitespace-nowrap">
            PLM 离散制造设计系统
          </span>
          <span className="text-xs text-[var(--plm-text-secondary)] font-mono border border-[var(--plm-border)] px-1.5 py-0.5 rounded-xs">
            V1.0 基线
          </span>
        </div>
      </div>

      {/* Zone 2: Navigation Links (Clean single-line prose, subtle active/hover state) */}
      <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
        {navLinks.map(link => {
          const isActive = activeTab === link.id;
          return (
            <button
              key={link.id}
              onClick={() => setActiveTab(link.id)}
              className={`whitespace-nowrap transition-colors py-1 cursor-pointer border-b-2 ${
                isActive
                  ? 'border-[var(--plm-primary)] text-[var(--plm-primary)] font-semibold'
                  : 'border-transparent text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              }`}
            >
              {link.label}
            </button>
          );
        })}
      </nav>

      {/* Zone 3: System Controls & Primary Action */}
      <div className="flex items-center gap-3 shrink-0">
        {/* Preset Selector */}
        <div className="hidden sm:flex items-center bg-[var(--plm-bg)] p-0.5 rounded-sm border border-[var(--plm-border)] text-xs">
          {(['standard', 'compact', 'soft'] as ThemePreset[]).map(p => (
            <button
              key={p}
              onClick={() => setPreset(p)}
              className={`px-2 py-1 transition-all rounded-xs cursor-pointer ${
                preset === p
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-medium shadow-2xs'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              }`}
              title={
                p === 'standard'
                  ? '标准专业 (R:6px, H:44px)'
                  : p === 'compact'
                  ? '紧凑工程 (R:4px, H:36px)'
                  : '柔和协作 (R:10px, H:48px)'
              }
            >
              {p === 'standard' ? '标准' : p === 'compact' ? '紧凑' : '柔和'}
            </button>
          ))}
        </div>

        {/* Light/Dark Mode Toggle */}
        <button
          onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
          className="p-1.5 rounded-sm border border-[var(--plm-border)] text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] hover:bg-[var(--plm-bg)] transition-colors cursor-pointer"
          title={`切换到${mode === 'light' ? '深色' : '浅色'}模式`}
          aria-label="Toggle theme mode"
        >
          {mode === 'light' ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
        </button>

        {/* Primary Action Button */}
        <button
          onClick={() => setActiveTab('theme-center')}
          className="bg-[var(--plm-primary)] hover:opacity-90 text-white text-xs font-medium px-3.5 py-1.5 rounded-sm shadow-xs transition-opacity flex items-center gap-1.5 cursor-pointer whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>主题中心</span>
        </button>
      </div>
    </header>
  );
};
