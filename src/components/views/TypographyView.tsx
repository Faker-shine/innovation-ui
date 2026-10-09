import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Type, Grid, Hash, AlignLeft, ShieldCheck, Check } from 'lucide-react';

export const TypographyView: React.FC = () => {
  const { config, preset } = useTheme();

  const typeScales = [
    {
      level: 'Display / 模块主标题',
      size: '20px / 1.25rem',
      lineHeight: '28px',
      weight: 'Bold (700)',
      sample: '工业三轴高精度增稳云台总成 ASM-GMB-001',
      usage: '对象详情头部、工作台主看板、系统一级页签'
    },
    {
      level: 'Section / 区块二级标题',
      size: '16px / 1.0rem',
      lineHeight: '24px',
      weight: 'SemiBold (600)',
      sample: '多层工程BOM装配树 (EBOM Hierarchy)',
      usage: '模块分区标头、抽屉抽拉面板标题、表单分组'
    },
    {
      level: 'Body / 核心业务正文 (基准)',
      size: '14px / 0.875rem',
      lineHeight: '20px',
      weight: 'Regular (400) / Medium (500)',
      sample: '2804H 工业无刷直驱动力电机 · 14极12槽高响应伺服',
      usage: '表格单元格、属性表单输入、正文段落、按钮文字'
    },
    {
      level: 'Caption / 辅助说明信息',
      size: '12px / 0.75rem',
      lineHeight: '16px',
      weight: 'Regular (400)',
      sample: '最后修改人: 张工 (结构研发) · 检入时间: 2026-10-08 14:30',
      usage: '表头文字、输入框说明、元数据提示、面包屑导航'
    },
    {
      level: 'Micro / 状态徽标与微标签',
      size: '11px / 0.6875rem',
      lineHeight: '14px',
      weight: 'Medium (500)',
      sample: 'PART-001 · Rev B.1 · 自制件 · 已冻结',
      usage: '生命周期标记、版本标签、树节点小标'
    }
  ];

  const tabularSamples = [
    { label: '稳定物料标识', val: 'PART-001', note: '长期不可变唯一物料身份 (Page 5)' },
    { label: '受控正式修订', val: 'Rev A / Rev B', note: '受控修订独立记录责任人与发布历史' },
    { label: '工作保存记录', val: 'Rev A.1 / Rev A.2', note: '同一修订内工作迭代，不自动提升大版本' },
    { label: '工程数量与精度', val: '14.000 PCS', note: '3位小数等宽对齐，防止小数点跳跃' },
    { label: 'PCB/电气位号', val: 'R102, C204, U101', note: '元器件装配图位号精准对应' },
    { label: '变更单流水号', val: 'ECO-2026-0042', note: '工程变更单规范编码' }
  ];

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--plm-primary)] uppercase tracking-wider">
              <span>Section 02</span>
              <span>·</span>
              <span>Typography & Layout Grid</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--plm-text)] tracking-tight mt-1">
              字体排版与 8px 空间网格规范
            </h1>
            <p className="text-sm text-[var(--plm-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
              严格贯彻 <strong className="text-[var(--plm-text)] font-semibold">“2+1 字体法则”</strong> 与 
              <strong className="text-[var(--plm-text)] font-semibold"> 等宽数字 (Tabular Figures) 约束</strong>。
              保证零件编码、版本迭代（A/B vs A.1/A.2）、数量与位号在数据密集表格中绝对竖向对齐，消除视觉抖动。
            </p>
          </div>
          <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center min-w-[140px] shrink-0">
            <div className="text-xs text-[var(--plm-text-secondary)]">核心业务字阶</div>
            <div className="text-lg font-bold font-mono text-[var(--plm-text)]">14px</div>
            <div className="text-[10px] text-slate-500">文档第10页法定基准</div>
          </div>
        </div>
      </div>

      {/* The 2+1 Font Principle */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Font 1 & 2: Sans Display & Body */}
        <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--plm-border)] pb-3">
            <Type className="w-4 h-4 text-[var(--plm-primary)]" />
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              主界面字体：Plus Jakarta Sans / 系统清晰无衬线
            </h3>
          </div>
          <p className="text-xs text-[var(--plm-text-secondary)] leading-relaxed">
            用于系统全局导航、菜单、属性标题、表单输入与对话框。具有现代工学感几何骨架，字形规整，小字号依然拥有极高视认度。
          </p>
          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm space-y-2">
            <div className="text-sm font-bold text-[var(--plm-text)]">
              ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
            </div>
            <div className="text-xs text-[var(--plm-text)]">
              离散制造 · 产品生命周期 · 结构研发 · 制造BOM · 工艺路线 · 版本冻结
            </div>
          </div>
        </div>

        {/* Font 3: Tabular Monospace */}
        <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
          <div className="flex items-center gap-2 border-b border-[var(--plm-border)] pb-3">
            <Hash className="w-4 h-4 text-[var(--plm-bom-accent)]" />
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              等宽数据字体：JetBrains Mono (Tabular Numerals)
            </h3>
          </div>
          <p className="text-xs text-[var(--plm-text-secondary)] leading-relaxed">
            强制应用于<strong>物料编号、版本号、数量、单位、位号、图纸代号与时间戳</strong>。每个字符与数字占用相同水平宽度，彻底避免错位。
          </p>
          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm space-y-2 font-mono">
            <div className="text-sm font-semibold text-[var(--plm-text)] tracking-tight">
              0123456789 PART-001 Rev A.2 ±0.005mm
            </div>
            <div className="text-xs text-[var(--plm-text-secondary)]">
              QTY: 14.000 SET | ECO-2026-0042 | DATE: 2026-10-09
            </div>
          </div>
        </div>
      </div>

      {/* Tabular Alignment Live Test */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
          <div>
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              等宽数字在 PLM 场景下的垂直对齐示范 (Vertical Tabular Alignment)
            </h3>
            <p className="text-xs text-[var(--plm-text-secondary)]">
              对比标准零件编号与修订流水，每一列字符精确垂直锚定
            </p>
          </div>
          <span className="text-xs font-mono text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
            font-variant-numeric: tabular-nums
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-1">
          {tabularSamples.map(item => (
            <div
              key={item.label}
              className="p-3.5 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm flex flex-col justify-between gap-2"
            >
              <div>
                <span className="text-[11px] text-[var(--plm-text-secondary)] block">{item.label}</span>
                <span className="text-sm font-mono font-bold text-[var(--plm-text)] mt-1 block">
                  {item.val}
                </span>
              </div>
              <span className="text-[11px] text-slate-500 border-t border-[var(--plm-border)] pt-2 leading-tight">
                {item.note}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Type Scale Hierarchy Table */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--plm-text)]">
            字阶层级表 (Type Scale Hierarchy)
          </h3>
          <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
            全系统统一收敛至 5 个核心字阶，严禁出现凌乱的字号跳跃。
          </p>
        </div>

        <div className="overflow-x-auto border border-[var(--plm-border)] rounded-sm">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)] text-[var(--plm-text-secondary)]">
                <th className="py-2.5 px-4 font-semibold">字阶等级</th>
                <th className="py-2.5 px-4 font-semibold">字号 / 行高</th>
                <th className="py-2.5 px-4 font-semibold">字重标准</th>
                <th className="py-2.5 px-4 font-semibold">排版示例</th>
                <th className="py-2.5 px-4 font-semibold">适用场景</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--plm-border)]">
              {typeScales.map(ts => (
                <tr key={ts.level} className="hover:bg-[var(--plm-bg)]/50 transition-colors">
                  <td className="py-3 px-4 font-medium text-[var(--plm-text)]">{ts.level}</td>
                  <td className="py-3 px-4 font-mono text-[var(--plm-text-secondary)]">
                    {ts.size} / {ts.lineHeight}
                  </td>
                  <td className="py-3 px-4 text-[var(--plm-text-secondary)]">{ts.weight}</td>
                  <td className="py-3 px-4 font-medium text-[var(--plm-text)]">
                    <span className="truncate max-w-[240px] block">{ts.sample}</span>
                  </td>
                  <td className="py-3 px-4 text-[var(--plm-text-secondary)]">{ts.usage}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 8px Spatial Grid & Layout Architecture */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-6">
        <div className="flex items-center gap-2 border-b border-[var(--plm-border)] pb-3">
          <Grid className="w-4 h-4 text-[var(--plm-primary)]" />
          <div>
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              8px 空间间距体系与页面框架尺寸 (Layout Architecture - Page 6)
            </h3>
            <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
              文档第6页明确规定的物理起点尺寸：顶部栏 56px，左导航 224px (折叠 64px)，右面板 320~420px。
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center">
            <span className="text-xs text-[var(--plm-text-secondary)] block">顶部全局工具栏</span>
            <span className="text-xl font-bold font-mono text-[var(--plm-text)] mt-1 block">56px</span>
            <span className="text-[11px] text-slate-500 mt-1 block">固定高度，承载检索与切库</span>
          </div>

          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center">
            <span className="text-xs text-[var(--plm-text-secondary)] block">左侧业务导航栏</span>
            <span className="text-xl font-bold font-mono text-[var(--plm-text)] mt-1 block">224px</span>
            <span className="text-[11px] text-slate-500 mt-1 block">支持一键收起折叠至 64px</span>
          </div>

          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center">
            <span className="text-xs text-[var(--plm-text-secondary)] block">右侧属性与详情抽屉</span>
            <span className="text-xl font-bold font-mono text-[var(--plm-text)] mt-1 block">320 ~ 420px</span>
            <span className="text-[11px] text-slate-500 mt-1 block">快速预览、属性检查与历史</span>
          </div>

          <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center">
            <span className="text-xs text-[var(--plm-text-secondary)] block">核心间距阶梯</span>
            <span className="text-xl font-bold font-mono text-[var(--plm-text)] mt-1 block">8px 模数</span>
            <span className="text-[11px] text-slate-500 mt-1 block">4px / 8px / 16px / 24px / 32px</span>
          </div>
        </div>

        {/* Zero-Pill Comparison discipline */}
        <div className="border border-[var(--plm-border)] rounded-sm p-4 bg-slate-50 dark:bg-slate-900/40">
          <h4 className="text-xs font-bold text-[var(--plm-text)] uppercase tracking-wider mb-2">
            反 AI Slop 规范：Zero-Pill 元数据展示准则
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xs">
              <span className="font-semibold text-red-700 dark:text-red-400 block mb-1">
                ❌ 严禁滥用糖果色胶囊圆角堆叠 (AI Slop Pill Sandwiches):
              </span>
              <div className="flex items-center gap-1.5 mt-2 flex-wrap">
                <span className="bg-blue-100 text-blue-700 rounded-full px-2 py-0.5 text-[11px]">结构件</span>
                <span className="bg-green-100 text-green-700 rounded-full px-2 py-0.5 text-[11px]">自制</span>
                <span className="bg-purple-100 text-purple-700 rounded-full px-2 py-0.5 text-[11px]">Rev B</span>
                <span className="bg-amber-100 text-amber-700 rounded-full px-2 py-0.5 text-[11px]">已发布</span>
              </div>
              <p className="text-[11px] text-red-600 dark:text-red-400/80 mt-2">
                原因：五颜六色的无意义圆角胶囊造成严重视觉杂乱，降低工程师在数千行 BOM 中的阅读效率。
              </p>
            </div>

            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40 rounded-xs">
              <span className="font-semibold text-emerald-700 dark:text-emerald-400 block mb-1">
                ✅ 正确做法：整洁去盒化文本与标点分隔符 (Clean Unboxed Metadata):
              </span>
              <div className="flex items-center gap-2 mt-2 text-slate-700 dark:text-slate-300 font-mono text-[11px]">
                <span>结构件</span>
                <span className="text-slate-400">·</span>
                <span>自制</span>
                <span className="text-slate-400">·</span>
                <span className="font-bold">Rev B (A.2)</span>
                <span className="text-slate-400">·</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">已发布</span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400/80 mt-2">
                效果：呼吸感通透，字符等宽锚定，信息层级清晰明了。
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
