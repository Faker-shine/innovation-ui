import React, { useState, useMemo, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { PRESET_CONFIGS, ThemePreset } from '../../types/theme';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import {
  Palette,
  Sliders,
  Eye,
  RotateCcw,
  Download,
  Upload,
  Copy,
  Check,
  Sparkles,
  Layers,
  Settings,
  ShieldCheck,
  Maximize2,
  Box,
  FolderOpen,
  Cog,
  CheckCircle2,
  SlidersHorizontal,
  Zap,
  Activity,
  Sun,
  Moon,
  Contrast,
  CheckCircle,
  Laptop,
  CheckCheck
} from 'lucide-react';

// HSL to HEX helper
function hslToHex(h: number, s: number, l: number): string {
  l /= 100;
  const a = (s * Math.min(l, 1 - l)) / 100;
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
    return Math.round(255 * color)
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
}

// HEX to HSL helper
function hexToHsl(hex: string): { h: number; s: number; l: number } {
  const cleanHex = hex.replace('#', '');
  const r = parseInt(cleanHex.substring(0, 2), 16) / 255 || 0;
  const g = parseInt(cleanHex.substring(2, 4), 16) / 255 || 0;
  const b = parseInt(cleanHex.substring(4, 6), 16) / 255 || 0;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h = Math.round(h * 60);
  }
  return { h, s: Math.round(s * 100), l: Math.round(l * 100) };
}

export interface ThemePresetOption {
  id: string;
  name: string;
  subtitle: string;
  tag: string;
  primary: string;
  radius: number;
  minRowHeight: number;
  mode: 'light' | 'dark';
  preset: ThemePreset;
  bomAccent: string;
  badgeColor: string;
  description: string;
  features: string[];
}

export const PRESET_THEMES: ThemePresetOption[] = [
  {
    id: 'preset-industrial-blue',
    name: '蓝色工业风',
    subtitle: '离散制造数字化标准基调',
    tag: '经典推荐',
    primary: '#1D4ED8',
    radius: 6,
    minRowHeight: 44,
    mode: 'light',
    preset: 'standard',
    bomAccent: '#0F766E',
    badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200 border-blue-300',
    description: '标准离散制造专业工业蓝，6px 规整微圆角与 44px 均衡数据行高，界面严谨稳定且高度耐看。',
    features: ['工业蓝 #1D4ED8', '圆角 6px', '行高 44px', '浅色模式']
  },
  {
    id: 'preset-dark-mode',
    name: '暗黑工业模式',
    subtitle: '防眩光车间与低照度环境',
    tag: '暗光车间',
    primary: '#93B4FF',
    radius: 4,
    minRowHeight: 40,
    mode: 'dark',
    preset: 'compact',
    bomAccent: '#14B8A6',
    badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-900/60 dark:text-purple-200 border-purple-300',
    description: '深空蓝黑底色搭配高亮荧光点缀，专为暗光总装流水线及控制室设计，杜绝强光刺眼疲劳。',
    features: ['高反差荧光蓝 #93B4FF', '圆角 4px', '行高 40px', '深色模式']
  },
  {
    id: 'preset-high-contrast',
    name: '高对比度模式',
    subtitle: '强光户外与 WCAG AAA 级合规',
    tag: 'WCAG AAA (7.2:1+)',
    primary: '#0038A8',
    radius: 0,
    minRowHeight: 46,
    mode: 'light',
    preset: 'standard',
    bomAccent: '#005A54',
    badgeColor: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200 border-amber-300',
    description: '0px 极简锋利直角与深邃纯蓝，对比度突破 7.2:1，适配户外试飞基地强光反光与特殊视觉工况。',
    features: ['深纯蓝 #0038A8', '纯直角 0px', '行高 46px', 'AAA无障碍']
  },
  {
    id: 'preset-precision-teal',
    name: '湖青高精装配风',
    subtitle: '仪器仪表与拓扑装配强化',
    tag: 'BOM强化',
    primary: '#0F766E',
    radius: 8,
    minRowHeight: 44,
    mode: 'light',
    preset: 'standard',
    bomAccent: '#0284C7',
    badgeColor: 'bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200 border-teal-300',
    description: '采用湖青制造色系，强化 EBOM/MBOM 节点层级关系，8px 现代微角，适合多层复杂装配体。',
    features: ['制造湖青 #0F766E', '圆角 8px', '行高 44px', '浅色模式']
  },
  {
    id: 'preset-compact-heavy',
    name: '紧凑重工模式',
    subtitle: '万级零件树极高利用率',
    tag: '36px 极限行高',
    primary: '#1E293B',
    radius: 2,
    minRowHeight: 36,
    mode: 'light',
    preset: 'compact',
    bomAccent: '#D97706',
    badgeColor: 'bg-slate-200 text-slate-800 dark:bg-slate-800 dark:text-slate-200 border-slate-300',
    description: '2px 紧贴边缘与 36px 极限表格行高，单屏最大化呈现万级物料结构，重装机床/治具系统专属。',
    features: ['重工深靛 #1E293B', '圆角 2px', '行高 36px', '高密布局']
  },
  {
    id: 'preset-soft-collab',
    name: '柔和协同设计风',
    subtitle: '跨部门评审与协同批注',
    tag: '12px 柔和圆角',
    primary: '#4F46E5',
    radius: 12,
    minRowHeight: 48,
    mode: 'light',
    preset: 'soft',
    bomAccent: '#0D9488',
    badgeColor: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200 border-indigo-300',
    description: '12px 柔和圆角搭配宽适 48px 行距，有效弱化工业压迫感，适用于工艺会签、评审与产品展示。',
    features: ['协同靛紫 #4F46E5', '圆角 12px', '行高 48px', '浅色模式']
  }
];

export const ThemeCenterView: React.FC = () => {
  const {
    config,
    mode,
    preset,
    setMode,
    setPreset,
    setPrimaryColor,
    setBomAccent,
    setRadius,
    setMinRowHeight,
    resetToDefaults,
    exportConfigJson,
    importConfig,
    calculateContrast
  } = useTheme();

  const [activeScope, setActiveScope] = useState<'globals' | 'modules' | 'components' | 'json'>('globals');
  const [copied, setCopied] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Active Preset ID tracking
  const [activePresetId, setActivePresetId] = useState<string>('preset-industrial-blue');
  const [presetToast, setPresetToast] = useState<string | null>(null);

  // Compute current hue for the Hue Slider
  const currentHsl = useMemo(() => hexToHsl(config.globals.primary), [config.globals.primary]);
  const [hueValue, setHueValue] = useState<number>(currentHsl.h);

  // Auto-sync hue when primary color changes externally
  useEffect(() => {
    const hsl = hexToHsl(config.globals.primary);
    setHueValue(hsl.h);
  }, [config.globals.primary]);

  const brandPalettes = [
    { name: '工业深蓝 (默认)', hex: '#1D4ED8', desc: '离散制造数字化标准基调' },
    { name: '制造湖青 (高精)', hex: '#0F766E', desc: 'BOM与拓扑装配强化视觉' },
    { name: '航天深靛 (重工)', hex: '#1E293B', desc: '重工装备与军工密级' },
    { name: '生态森绿 (质保)', hex: '#166534', desc: '环保合规与绿色供应链' },
    { name: '耐候铁褐 (治具)', hex: '#9A3412', desc: '模具与工装专项通道' },
    { name: '尖端紫罗兰 (科技)', hex: '#6D28D9', desc: '智能机器人与柔性产线' },
    { name: '安全警示红 (高危)', hex: '#DC2626', desc: '特种设备与安全联锁' }
  ];

  // Function to apply a preset theme and update all sliders automatically
  const applyThemePreset = (p: ThemePresetOption) => {
    setActivePresetId(p.id);

    // 1. Update Mode
    setMode(p.mode);

    // 2. Update Radius (updates slider and CSS variable)
    setRadius(p.radius);

    // 3. Update Primary Color (updates slider and CSS variable)
    setPrimaryColor(p.primary);

    // 4. Update Min Row Height (updates slider)
    setMinRowHeight(p.minRowHeight);

    // 5. Update Preset & Accent
    setPreset(p.preset);
    setBomAccent(p.bomAccent);

    // 6. Sync Hue Slider
    const hsl = hexToHsl(p.primary);
    setHueValue(hsl.h);

    // 7. Show confirmation toast
    setPresetToast(
      `已成功应用【${p.name}】：滑块已联动同步（圆角: ${p.radius}px · 主色: ${p.primary} · 行高: ${p.minRowHeight}px · ${p.mode === 'dark' ? '深色模式' : '浅色模式'}）`
    );
    setTimeout(() => {
      setPresetToast(null);
    }, 4000);
  };

  const handleHueChange = (newHue: number) => {
    setHueValue(newHue);
    // Keep high contrast lightness and saturation suitable for enterprise discrete manufacturing
    const newHex = hslToHex(newHue, 78, 48);
    setPrimaryColor(newHex);
  };

  const handleCopyJson = () => {
    navigator.clipboard.writeText(exportConfigJson());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleImportSubmit = () => {
    const success = importConfig(importText);
    if (success) {
      setImportStatus('✅ 主题配置已成功导入并实时生效');
      setTimeout(() => setImportStatus(null), 3000);
    } else {
      setImportStatus('❌ JSON 格式有误，请核对 schemaVersion 与字段');
    }
  };

  const contrastScore = calculateContrast(
    mode === 'dark' ? '#0B1220' : '#FFFFFF',
    config.globals.primary
  );

  return (
    <div className="space-y-6 pb-16">
      {/* Header Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-[var(--plm-primary)] uppercase tracking-wider">
            <span>Section 04</span>
            <span>·</span>
            <span>Theme Center & Runtime Engine</span>
          </div>
          <h1 className="text-2xl font-bold text-[var(--plm-text)] tracking-tight mt-1">
            主题中心与一键换肤控制台 (Theme Center)
          </h1>
          <p className="text-sm text-[var(--plm-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
            遵循文档第11与12页架构规范：内置<strong>预设主题选择器</strong>（蓝色工业风、暗黑模式、高对比度模式等），点击即可<strong>自动同步切换所有滑块值</strong>并实时更新全局组件。
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <Button
            size="sm"
            variant="secondary"
            leftIcon={<RotateCcw className="w-3.5 h-3.5" />}
            onClick={() => {
              resetToDefaults();
              setActivePresetId('preset-industrial-blue');
              setHueValue(224);
              setPresetToast('已恢复系统出厂默认配置 (蓝色工业风)');
              setTimeout(() => setPresetToast(null), 3000);
            }}
          >
            恢复系统默认
          </Button>
          <Button
            size="sm"
            variant="primary"
            leftIcon={<Copy className="w-3.5 h-3.5" />}
            onClick={handleCopyJson}
          >
            {copied ? '配置已复制' : '复制 Token JSON'}
          </Button>
        </div>
      </div>

      {/* Preset Applied Toast */}
      {presetToast && (
        <div className="bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-700 p-3.5 rounded-sm flex items-center justify-between shadow-xs transition-all animate-fadeIn">
          <div className="flex items-center gap-2.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span className="text-xs font-medium text-emerald-900 dark:text-emerald-200">
              {presetToast}
            </span>
          </div>
          <button
            onClick={() => setPresetToast(null)}
            className="text-xs text-emerald-700 dark:text-emerald-400 hover:text-emerald-950 font-medium ml-4 cursor-pointer"
          >
            关闭
          </button>
        </div>
      )}

      {/* FEATURE: PRESET THEME SELECTOR CARDS (Top Prominent Section) */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-5 space-y-4 shadow-2xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--plm-border)] pb-3">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[var(--plm-primary)]" />
            <h2 className="text-sm font-bold text-[var(--plm-text)]">
              预设主题选择器 (Preset Theme Selector)
            </h2>
            <span className="text-xs text-[var(--plm-text-secondary)]">
              — 点击任一预设，滑块与全局主题将自动联动更新
            </span>
          </div>
          <span className="text-xs font-mono px-2 py-0.5 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] text-[var(--plm-text-secondary)]">
            当前应用: <strong className="text-[var(--plm-primary)]">{PRESET_THEMES.find(t => t.id === activePresetId)?.name || '自定义调参'}</strong>
          </span>
        </div>

        {/* 6 Theme Preset Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {PRESET_THEMES.map(themeItem => {
            const isCurrentActive =
              activePresetId === themeItem.id ||
              (config.globals.radius === themeItem.radius &&
                config.globals.primary.toLowerCase() === themeItem.primary.toLowerCase() &&
                mode === themeItem.mode);

            return (
              <div
                key={themeItem.id}
                onClick={() => applyThemePreset(themeItem)}
                className={`p-4 rounded-sm border transition-all cursor-pointer relative flex flex-col justify-between group ${
                  isCurrentActive
                    ? 'border-[var(--plm-primary)] ring-2 ring-[var(--plm-primary)]/30 bg-[var(--plm-primary)]/5 dark:bg-[var(--plm-primary)]/10 shadow-xs'
                    : 'border-[var(--plm-border)] bg-[var(--plm-bg)] hover:border-slate-400 dark:hover:border-slate-600 hover:shadow-2xs'
                }`}
              >
                <div>
                  {/* Top Bar of Card */}
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      {/* Color Preview Swatch */}
                      <span
                        className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-2xs"
                        style={{ backgroundColor: themeItem.primary }}
                      />
                      <div>
                        <h3 className="text-xs font-bold text-[var(--plm-text)] group-hover:text-[var(--plm-primary)] transition-colors">
                          {themeItem.name}
                        </h3>
                        <span className="text-[10px] text-[var(--plm-text-secondary)]">
                          {themeItem.subtitle}
                        </span>
                      </div>
                    </div>

                    {/* Tag / Badge */}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-xs font-mono font-medium border ${themeItem.badgeColor}`}>
                      {themeItem.tag}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-[11px] text-[var(--plm-text-secondary)] mt-2.5 leading-relaxed">
                    {themeItem.description}
                  </p>
                </div>

                {/* Bottom Spec Chips & Active Status */}
                <div className="mt-3.5 pt-2.5 border-t border-[var(--plm-border)] flex items-center justify-between text-[11px] font-mono">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="px-1.5 py-0.2 bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-xs text-[var(--plm-text)]">
                      R: {themeItem.radius}px
                    </span>
                    <span className="px-1.5 py-0.2 bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-xs text-[var(--plm-text)]">
                      H: {themeItem.minRowHeight}px
                    </span>
                    <span className="px-1.5 py-0.2 bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-xs text-[var(--plm-text)] flex items-center gap-0.5">
                      {themeItem.mode === 'dark' ? <Moon className="w-2.5 h-2.5 text-indigo-400" /> : <Sun className="w-2.5 h-2.5 text-amber-500" />}
                      <span>{themeItem.mode === 'dark' ? '深色' : '浅色'}</span>
                    </span>
                  </div>

                  {/* Active Indicator */}
                  {isCurrentActive ? (
                    <span className="flex items-center gap-1 text-[var(--plm-primary)] font-bold text-[11px]">
                      <CheckCircle className="w-3.5 h-3.5" />
                      <span>正在使用</span>
                    </span>
                  ) : (
                    <span className="text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity text-[11px] font-medium">
                      点击切换 →
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Real-time Dynamic CSS Variables Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 flex flex-wrap items-center justify-between gap-3 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-semibold text-[var(--plm-text)]">
            当前实时注入的根级 CSS 变量 (Live Injected CSS Variables):
          </span>
        </div>
        <div className="flex items-center gap-3 flex-wrap text-xs font-mono">
          <span className="px-2.5 py-1 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] text-[var(--plm-text)] flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full border border-slate-300" style={{ backgroundColor: 'var(--plm-primary)' }} />
            <span>--plm-primary: <strong className="text-[var(--plm-primary)]">{config.globals.primary}</strong></span>
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] text-[var(--plm-text)]">
            --plm-radius: <strong className="text-[var(--plm-text)]">{config.globals.radius}px</strong>
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] text-[var(--plm-text)]">
            --plm-row-height: <strong>{config.globals.minRowHeight}px</strong>
          </span>
          <span className="px-2.5 py-1 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 font-semibold">
            WCAG 对比度: {contrastScore}:1 ({contrastScore >= 7 ? 'AAA级' : contrastScore >= 4.5 ? 'AA级' : '次级'})
          </span>
        </div>
      </div>

      {/* 3-Column Layout from Page 11: Left Scope, Center Live Preview, Right Parameter Editor */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Scope Selector (2 Cols) */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 space-y-2">
            <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block uppercase tracking-wider">
              配置作用域 (Scope)
            </span>
            <div className="space-y-1">
              <button
                onClick={() => setActiveScope('globals')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  activeScope === 'globals'
                    ? 'bg-[var(--plm-primary)] text-white shadow-xs'
                    : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                }`}
              >
                <span>全局系统主题</span>
                <Sliders className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() => setActiveScope('modules')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  activeScope === 'modules'
                    ? 'bg-[var(--plm-primary)] text-white shadow-xs'
                    : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                }`}
              >
                <span>业务模块覆盖 (BOM)</span>
                <Layers className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() => setActiveScope('components')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  activeScope === 'components'
                    ? 'bg-[var(--plm-primary)] text-white shadow-xs'
                    : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                }`}
              >
                <span>组件类目规格</span>
                <Settings className="w-3.5 h-3.5 opacity-80" />
              </button>

              <button
                onClick={() => setActiveScope('json')}
                className={`w-full text-left px-3 py-2 text-xs rounded-xs font-medium transition-colors flex items-center justify-between cursor-pointer ${
                  activeScope === 'json'
                    ? 'bg-[var(--plm-primary)] text-white shadow-xs'
                    : 'text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
                }`}
              >
                <span>JSON 运行时配置</span>
                <span className="text-[10px] font-mono opacity-80">v1.0</span>
              </button>
            </div>
          </div>

          {/* Quick Stats & Live Indicator */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 space-y-2.5 text-xs">
            <span className="text-xs font-semibold text-[var(--plm-text)] block">即时换肤状态</span>
            <div className="flex justify-between text-[var(--plm-text-secondary)]">
              <span>主色调色值:</span>
              <span className="font-mono font-bold text-[var(--plm-primary)]">{config.globals.primary}</span>
            </div>
            <div className="flex justify-between text-[var(--plm-text-secondary)]">
              <span>圆角基准:</span>
              <span className="font-mono font-bold text-[var(--plm-text)]">{config.globals.radius}px</span>
            </div>
            <div className="flex justify-between text-[var(--plm-text-secondary)]">
              <span>表格行高:</span>
              <span className="font-mono text-[var(--plm-text)]">{config.globals.minRowHeight}px</span>
            </div>
            <div className="pt-2 border-t border-[var(--plm-border)] text-[11px] text-[var(--plm-text-secondary)]">
              所有调整均实时作用于页面所有按钮、表单、标签及拓扑树。
            </div>
          </div>
        </div>

        {/* Center Column: Live Real-World Component Preview (6 Cols) */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-5 space-y-5">
            <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
              <div className="flex items-center gap-2">
                <Eye className="w-4 h-4 text-[var(--plm-primary)]" />
                <h3 className="text-sm font-semibold text-[var(--plm-text)]">
                  中央实时渲染沙盒 (Live Real-Time Preview)
                </h3>
              </div>
              <span className="text-xs font-mono text-[var(--plm-text-secondary)]">
                当前预设: {PRESET_CONFIGS[config.preset].name}
              </span>
            </div>

            {/* Preview Section 1: Real Action Controls */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-[var(--plm-text-secondary)]">
                  1. 按钮与操作态 (受 --plm-radius: {config.globals.radius}px 与 --plm-primary 约束)
                </span>
                <span className="text-[10px] font-mono text-[var(--plm-primary)]">实时渲染</span>
              </div>
              <div className="flex flex-wrap gap-2.5 items-center">
                <Button variant="primary" size="sm">主要操作 (Primary)</Button>
                <Button variant="secondary" size="sm">次要操作 (Secondary)</Button>
                <Button variant="accent" size="sm">BOM强调色</Button>
                <Button variant="danger" size="sm">危险/撤销</Button>
                <Button variant="ghost" size="sm">幽灵按钮</Button>
              </div>
            </div>

            {/* Preview Section 2: Form Inputs & Controls */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--plm-text-secondary)] block">
                2. 表单输入与边框圆角联动
              </span>
              <div className="grid grid-cols-2 gap-3">
                <Input
                  label="物料编码"
                  defaultValue="PART-001"
                  helperText="自动受控约束"
                />
                <Input
                  label="装配用量"
                  defaultValue="4.000 PCS"
                  rightIcon={<span className="text-xs font-mono text-slate-400">PCS</span>}
                />
              </div>
            </div>

            {/* Preview Section 3: High Density Table Row Simulation */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--plm-text-secondary)] block">
                3. 数据表格真实渲染 (Min-Row-Height: {config.globals.minRowHeight}px)
              </span>
              <div className="border border-[var(--plm-border)] overflow-hidden text-xs" style={{ borderRadius: `${config.globals.radius}px` }}>
                <div className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)] px-3 py-2 flex justify-between font-semibold text-[var(--plm-text-secondary)]">
                  <span>零件编号与名称</span>
                  <span>版本状态</span>
                  <span>用量</span>
                </div>
                <div
                  className="px-3 flex items-center justify-between border-b border-[var(--plm-border)] hover:bg-slate-50/50 dark:hover:bg-slate-900/40"
                  style={{ height: `${config.globals.minRowHeight}px` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--plm-text)]">PART-001</span>
                    <span className="text-[var(--plm-text)]">无刷直驱动力电机</span>
                  </div>
                  <Badge status="Released" size="xs" />
                  <span className="font-mono text-[var(--plm-text)]">1.000 PCS</span>
                </div>
                <div
                  className="px-3 flex items-center justify-between bg-[var(--plm-selected-bg)]/40 font-medium"
                  style={{ height: `${config.globals.minRowHeight}px` }}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-[var(--plm-bom-accent)]">PART-002</span>
                    <span className="text-[var(--plm-text)]">3.2mm 碳纤维减震臂 (选中行)</span>
                  </div>
                  <Badge status="InReview" size="xs" />
                  <span className="font-mono text-[var(--plm-text)]">2.000 PCS</span>
                </div>
              </div>
            </div>

            {/* Preview Section 4: Card & Progress bar */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--plm-text-secondary)] block">
                4. 卡片容器与进度条 (Card & Progress Fill)
              </span>
              <div
                className="p-3.5 border border-[var(--plm-border)] bg-[var(--plm-bg)] space-y-2.5 transition-all"
                style={{ borderRadius: `${config.globals.radius}px` }}
              >
                <div className="flex justify-between items-center text-xs">
                  <span className="font-semibold text-[var(--plm-text)]">总装配进度 (Assembly Progress)</span>
                  <span className="font-mono font-bold text-[var(--plm-primary)]">78%</span>
                </div>
                <div className="w-full bg-slate-200 dark:bg-slate-700 h-2 overflow-hidden" style={{ borderRadius: `${Math.min(config.globals.radius, 4)}px` }}>
                  <div
                    className="h-full transition-all duration-300"
                    style={{
                      width: '78%',
                      backgroundColor: 'var(--plm-primary)'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Preview Section 5: Mini Structure Tree Snippet */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--plm-text-secondary)] block">
                5. 拓扑树节点微缩预览 (Tree Node Preview)
              </span>
              <div className="border border-[var(--plm-border)] p-2.5 space-y-1 bg-[var(--plm-surface)]" style={{ borderRadius: `${config.globals.radius}px` }}>
                <div className="flex items-center justify-between px-2 py-1 bg-[var(--plm-selected-bg)]/50 border-l-2 border-[var(--plm-primary)] text-xs font-medium" style={{ borderRadius: `${Math.max(0, config.globals.radius - 2)}px` }}>
                  <div className="flex items-center gap-2">
                    <Box className="w-3.5 h-3.5 text-[var(--plm-primary)]" />
                    <span className="font-mono text-[var(--plm-primary)] font-bold">ASM-GMB-001</span>
                    <span className="text-[var(--plm-text)]">云台总成 (顶层根装配)</span>
                  </div>
                  <Badge status="Released" size="xs" />
                </div>
                <div className="flex items-center justify-between px-2 py-1 pl-6 text-xs hover:bg-slate-50 dark:hover:bg-slate-900/40">
                  <div className="flex items-center gap-2">
                    <FolderOpen className="w-3.5 h-3.5 text-[var(--plm-bom-accent)]" />
                    <span className="font-mono text-[var(--plm-bom-accent)] font-semibold">ASM-PCH-100</span>
                    <span className="text-[var(--plm-text)]">俯仰轴单元</span>
                  </div>
                  <span className="font-mono text-[11px] text-[var(--plm-text-secondary)]">×1 SET</span>
                </div>
              </div>
            </div>

            {/* Preview Section 6: Semantic Status Badges */}
            <div className="space-y-2">
              <span className="text-xs font-medium text-[var(--plm-text-secondary)] block">
                6. 语义状态标签 (WCAG 2.2 无障碍组合)
              </span>
              <div className="flex flex-wrap gap-2">
                <Badge status="Released" />
                <Badge status="InReview" />
                <Badge status="Draft" />
                <Badge status="Obsolete" />
                <Badge status="added" />
                <Badge status="removed" />
                <Badge status="modified" />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Interactive Parameter Editor (4 Cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-5 space-y-5">
            <div className="border-b border-[var(--plm-border)] pb-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-[var(--plm-text)]">
                  实时滑块参数调节器 (Live Sliders)
                </h3>
                <span className="text-[10px] px-1.5 py-0.5 rounded-xs bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800">
                  即刻生效
                </span>
              </div>
              <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                拖拽滑块或上方选择预设，滑块与全局 UI 样式将实时同步
              </p>
            </div>

            {/* INTERACTIVE FEATURE: Real-time slider for --plm-radius */}
            <div className="p-3.5 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--plm-text)]">
                <div className="flex items-center gap-1.5">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--plm-primary)]" />
                  <span>全局组件圆角 (--plm-radius)</span>
                </div>
                <span className="font-mono text-sm font-bold text-[var(--plm-primary)] px-2 py-0.5 bg-[var(--plm-surface)] rounded-xs border border-[var(--plm-border)]">
                  {config.globals.radius}px
                </span>
              </div>

              {/* Slider for radius */}
              <input
                type="range"
                min="0"
                max="24"
                step="1"
                value={config.globals.radius}
                onChange={e => setRadius(Number(e.target.value))}
                className="w-full cursor-pointer accent-[var(--plm-primary)] h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
              />

              {/* Quick radius chips */}
              <div className="flex items-center justify-between gap-1 pt-1">
                {[0, 4, 6, 8, 12, 16, 20].map(r => (
                  <button
                    key={r}
                    onClick={() => setRadius(r)}
                    className={`text-[10px] font-mono px-1.5 py-0.5 rounded-xs border transition-colors cursor-pointer ${
                      config.globals.radius === r
                        ? 'bg-[var(--plm-primary)] text-white border-[var(--plm-primary)] font-bold'
                        : 'bg-[var(--plm-surface)] text-[var(--plm-text-secondary)] border-[var(--plm-border)] hover:text-[var(--plm-text)]'
                    }`}
                  >
                    {r}px
                  </button>
                ))}
              </div>
            </div>

            {/* INTERACTIVE FEATURE: Real-time Hue Slider for --plm-primary */}
            <div className="p-3.5 rounded-xs bg-[var(--plm-bg)] border border-[var(--plm-border)] space-y-2.5">
              <div className="flex items-center justify-between text-xs font-semibold text-[var(--plm-text)]">
                <div className="flex items-center gap-1.5">
                  <Palette className="w-3.5 h-3.5 text-[var(--plm-primary)]" />
                  <span>系统主色滑块 (--plm-primary)</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-3.5 h-3.5 rounded-full border border-slate-300"
                    style={{ backgroundColor: config.globals.primary }}
                  />
                  <span className="font-mono text-xs font-bold text-[var(--plm-primary)] px-1.5 py-0.5 bg-[var(--plm-surface)] rounded-xs border border-[var(--plm-border)]">
                    {config.globals.primary}
                  </span>
                </div>
              </div>

              {/* Real-time Color Spectrum Hue Slider */}
              <div className="space-y-1">
                <div className="flex justify-between text-[11px] text-[var(--plm-text-secondary)]">
                  <span>色相滑块 (Hue: {hueValue}°)</span>
                  <span>拖拽即时改色</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="360"
                  step="1"
                  value={hueValue}
                  onChange={e => handleHueChange(Number(e.target.value))}
                  className="w-full cursor-pointer h-3 rounded-lg appearance-none"
                  style={{
                    background:
                      'linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)'
                  }}
                />
              </div>

              {/* Custom Hex + Native Picker input */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="color"
                  value={config.globals.primary}
                  onChange={e => {
                    setPrimaryColor(e.target.value);
                    setHueValue(hexToHsl(e.target.value).h);
                  }}
                  className="w-7 h-7 rounded-xs cursor-pointer border border-[var(--plm-border)] p-0 shrink-0"
                />
                <input
                  type="text"
                  value={config.globals.primary}
                  onChange={e => {
                    if (e.target.value.startsWith('#') && e.target.value.length <= 7) {
                      setPrimaryColor(e.target.value);
                      if (e.target.value.length === 7) {
                        setHueValue(hexToHsl(e.target.value).h);
                      }
                    }
                  }}
                  className="px-2 py-1 text-xs font-mono bg-[var(--plm-surface)] border border-[var(--plm-input-border)] rounded-xs text-[var(--plm-text)] w-24 uppercase outline-none focus:border-[var(--plm-primary)]"
                />
                <span className="text-[11px] text-[var(--plm-text-secondary)]">
                  自定义十六进制颜色
                </span>
              </div>
            </div>

            {/* Brand Colors Preset Swatches */}
            <div className="space-y-2">
              <span className="text-xs font-semibold text-[var(--plm-text)] block">
                工业基准调色板 (Brand Presets)
              </span>
              <div className="grid grid-cols-7 gap-1.5">
                {brandPalettes.map(palette => (
                  <button
                    key={palette.hex}
                    onClick={() => {
                      setPrimaryColor(palette.hex);
                      setHueValue(hexToHsl(palette.hex).h);
                    }}
                    style={{ backgroundColor: palette.hex }}
                    className={`h-7 rounded-xs transition-transform cursor-pointer relative shadow-2xs ${
                      config.globals.primary === palette.hex ? 'scale-110 ring-2 ring-offset-2 ring-[var(--plm-primary)]' : 'hover:scale-105'
                    }`}
                    title={`${palette.name} (${palette.hex})`}
                  />
                ))}
              </div>
            </div>

            {/* Row Height Slider */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold text-[var(--plm-text)]">
                <span>表格最小行高 (Min Row Height)</span>
                <span className="font-mono">{config.globals.minRowHeight}px</span>
              </div>
              <input
                type="range"
                min="30"
                max="56"
                value={config.globals.minRowHeight}
                onChange={e => setMinRowHeight(Number(e.target.value))}
                className="w-full cursor-pointer accent-[var(--plm-primary)]"
              />
            </div>

            {/* BOM Accent Color */}
            <div className="space-y-1.5">
              <span className="text-xs font-semibold text-[var(--plm-text)] block">
                BOM 模块专属强调色 (Module Accent)
              </span>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={config.modules.bom.accent}
                  onChange={e => setBomAccent(e.target.value)}
                  className="w-7 h-7 rounded-xs cursor-pointer border border-[var(--plm-border)] p-0"
                />
                <span className="text-xs font-mono font-medium text-[var(--plm-text)]">
                  {config.modules.bom.accent}
                </span>
                <span className="text-[11px] text-[var(--plm-text-secondary)]">(用于装配树层级区分)</span>
              </div>
            </div>

            {/* Light/Dark Mode Switch */}
            <div className="pt-2 border-t border-[var(--plm-border)] flex items-center justify-between text-xs">
              <span className="font-semibold text-[var(--plm-text)]">深浅模式切换</span>
              <Button
                size="sm"
                variant="secondary"
                leftIcon={mode === 'dark' ? <Moon className="w-3.5 h-3.5 text-indigo-400" /> : <Sun className="w-3.5 h-3.5 text-amber-500" />}
                onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
              >
                当前: {mode === 'light' ? '浅色模式' : '深色模式'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* JSON Config & DTCG Token Format Inspection (Page 12 Schema) */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--plm-border)] pb-3">
          <div>
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              运行时配置 JSON 与 DTCG 导出 (Document Page 12 Runtime Config)
            </h3>
            <p className="text-xs text-[var(--plm-text-secondary)]">
              与文档第12页《主题配置与实现机制》JSON Schema 完全兼容的配置代码
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button size="sm" variant="secondary" leftIcon={<Copy className="w-3.5 h-3.5" />} onClick={handleCopyJson}>
              {copied ? '已复制' : '复制配置'}
            </Button>
            <Button
              size="sm"
              variant="primary"
              leftIcon={<Download className="w-3.5 h-3.5" />}
              onClick={() => {
                const blob = new Blob([exportConfigJson()], { type: 'application/json' });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = `plm-theme-config-${config.preset}.json`;
                a.click();
              }}
            >
              下载 JSON 文件
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div>
            <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block mb-1">
              当前运行时配置 (只读预览)
            </span>
            <pre className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-xs font-mono text-[var(--plm-text)] overflow-x-auto max-h-72">
              {exportConfigJson()}
            </pre>
          </div>

          <div className="space-y-3">
            <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block">
              导入主题配置 JSON (粘贴并点击应用)
            </span>
            <textarea
              rows={8}
              value={importText}
              onChange={e => setImportText(e.target.value)}
              placeholder='粘贴形如 { "schemaVersion": 1, "globals": { "primary": "#1D4ED8", "radius": 6 } } 的配置...'
              className="w-full p-3 text-xs font-mono bg-[var(--plm-surface)] border border-[var(--plm-input-border)] rounded-sm text-[var(--plm-text)] outline-none focus:border-[var(--plm-primary)]"
            />
            <div className="flex items-center justify-between">
              <Button size="sm" variant="primary" leftIcon={<Upload className="w-3.5 h-3.5" />} onClick={handleImportSubmit}>
                导入并立即应用
              </Button>
              {importStatus && (
                <span className="text-xs font-medium">{importStatus}</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
