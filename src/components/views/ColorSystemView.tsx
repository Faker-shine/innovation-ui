import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Badge } from '../common/Badge';
import { Button } from '../common/Button';
import { Check, Copy, CheckCircle2, Clock, AlertCircle, Info, Sparkles, ShieldCheck } from 'lucide-react';

export const ColorSystemView: React.FC = () => {
  const { mode, config, setPrimaryColor, setBomAccent, calculateContrast } = useTheme();
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  // Color specs from Document Page 9
  const lightTokens = [
    { name: '主色 / 主要操作 (Primary)', hex: '#1D4ED8', role: '主要按钮、高亮操作、聚焦状态' },
    { name: '主按钮文字 (Primary Text)', hex: '#FFFFFF', role: '置于主色之上，对比度约 6.70:1' },
    { name: '页面背景 (Page Background)', hex: '#F4F7FB', role: '全站大面积底色，低饱和工科质感' },
    { name: '内容面板 (Surface / Card)', hex: '#FFFFFF', role: '表格容器、侧栏、卡片背景' },
    { name: '正文文字 (Text Main)', hex: '#172B4D', role: '标题与主要可读正文，对比度超 10:1' },
    { name: '次要文字 (Text Secondary)', hex: '#52637B', role: '说明性小字、表头、占位符' },
    { name: '普通分隔线 (Divider / Border)', hex: '#D8E0EA', role: '表格行分割、模块区隔 1px' },
    { name: '输入控件边界 (Input Border)', hex: '#8191A7', role: '表单边框，具备明确可触达边界' },
    { name: '选中背景 (Selected Bg)', hex: '#DBEAFE', role: '表格选中行、树节点激活' }
  ];

  const darkTokens = [
    { name: '主色 / 主要操作 (Dark Primary)', hex: '#93B4FF', role: '深色高明度蓝，降低眼部疲劳' },
    { name: '主按钮文字 (Primary Text)', hex: '#0B1220', role: '深黑深蓝墨底，对比度达 9.11:1' },
    { name: '页面背景 (Dark Background)', hex: '#0B1220', role: '暗夜底色，深邃防眩光' },
    { name: '内容面板 (Dark Surface)', hex: '#111C2E', role: '深色工作面板，微对比差' },
    { name: '正文文字 (Text Main)', hex: '#E5ECF5', role: '冷白正文，字重微增抗视错觉' },
    { name: '次要文字 (Text Secondary)', hex: '#A3B3C8', role: '浅冷灰次要信息与辅助标识' },
    { name: '普通分隔线 (Dark Divider)', hex: '#34465F', role: '暗色高精结构线，平整收敛' },
    { name: '输入控件边界 (Input Border)', hex: '#7087A6', role: '深色输入框外框基准' },
    { name: '选中背景 (Selected Bg)', hex: '#233B64', role: '深蓝高亮选中行背景' }
  ];

  const semanticStatuses = [
    {
      title: '成功 / 已发布 (Released)',
      textHex: '#166534',
      bgHex: '#DCFCE7',
      darkTextHex: '#4ADE80',
      darkBgHex: '#064E3B',
      meaning: '零件发布、ECO审批生效、BOM循环检查通过、接口回执投递成功',
      icon: <CheckCircle2 className="w-4 h-4 text-[#166534] dark:text-[#4ADE80]" />
    },
    {
      title: '警告 / 待处理 (Pending / Review)',
      textHex: '#92400E',
      bgHex: '#FEF3C7',
      darkTextHex: '#FBBF24',
      darkBgHex: '#78350F',
      meaning: '待审批流程、草稿锁定检出中、受影响零件波及提醒、版本差异预警',
      icon: <Clock className="w-4 h-4 text-[#92400E] dark:text-[#FBBF24]" />
    },
    {
      title: '错误 / 危险 (Rejected / Obsolete)',
      textHex: '#B91C1C',
      bgHex: '#FEE2E2',
      darkTextHex: '#F87171',
      darkBgHex: '#7F1D1D',
      meaning: '审批驳回、BOM闭环循环引用、版本冻结失败、并发冲突不可自动合并',
      icon: <AlertCircle className="w-4 h-4 text-[#B91C1C] dark:text-[#F87171]" />
    },
    {
      title: '信息 / 处理中 (In Progress / Draft)',
      textHex: '#1D4ED8',
      bgHex: '#DBEAFE',
      darkTextHex: '#93B4FF',
      darkBgHex: '#1E3A8A',
      meaning: '工作草稿A.1保存、ECR影响分析生成中、CAD派生文件转换排队中',
      icon: <Info className="w-4 h-4 text-[#1D4ED8] dark:text-[#93B4FF]" />
    }
  ];

  const moduleAccents = [
    { name: '工程 BOM / EBOM 模块', hex: '#0F766E', role: 'BOM结构树行高亮、拓扑分支连接、子件引用关系' },
    { name: '产品数据管理 (PDM)', hex: '#1D4ED8', role: '物料库、分类模板、生命周期主状态' },
    { name: '工程变更 (ECO/ECN)', hex: '#B45309', role: '变更影响范围追踪、差异比较标记' },
    { name: '质量与供应商', hex: '#15803D', role: '合格供方、APQP评审、检验报告' }
  ];

  // Contrast calculation
  const lightBtnContrast = calculateContrast('#FFFFFF', '#1D4ED8');
  const darkBtnContrast = calculateContrast('#0B1220', '#93B4FF');
  const lightTextContrast = calculateContrast('#172B4D', '#F4F7FB');

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--plm-primary)] uppercase tracking-wider">
              <span>Section 01</span>
              <span>·</span>
              <span>Visual Foundation</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--plm-text)] tracking-tight mt-1">
              工业离散制造色彩规范 (Industrial Color System)
            </h1>
            <p className="text-sm text-[var(--plm-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
              以“工业蓝”作为核心基调，遵循严格的 <strong className="text-[var(--plm-text)] font-semibold">WCAG 2.2 AA/AAA</strong> 对比度标准与 
              <strong className="text-[var(--plm-text)] font-semibold"> 60-30-10 空间分配原则</strong>。彻底杜绝纯色彩状态指示，确保在复杂制造车间与高精研发场景下的无歧义识别。
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center min-w-[130px]">
              <div className="text-xs text-[var(--plm-text-secondary)]">主按钮浅色对比度</div>
              <div className="text-lg font-bold font-mono text-[var(--plm-text)]">{lightBtnContrast}:1</div>
              <div className="text-[10px] text-emerald-600 font-medium">符合 WCAG AAA</div>
            </div>
            <div className="p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm text-center min-w-[130px]">
              <div className="text-xs text-[var(--plm-text-secondary)]">深色主按对比度</div>
              <div className="text-lg font-bold font-mono text-[var(--plm-text)]">{darkBtnContrast}:1</div>
              <div className="text-[10px] text-emerald-600 font-medium">超高反差清晰</div>
            </div>
          </div>
        </div>
      </div>

      {/* 60-30-10 Color Budget Visualizer */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-base font-semibold text-[var(--plm-text)]">
              60-30-10 界面色彩比重法则 (Color Distribution Budget)
            </h3>
            <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
              严禁大面积杂乱色块堆砌，保持工业工程界面的专注度与专业克制感。
            </p>
          </div>
          <span className="text-xs font-mono text-[var(--plm-text-secondary)]">PLM-SPEC-C6030</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-10 gap-3 pt-2">
          {/* 60% */}
          <div className="md:col-span-6 bg-[#F4F7FB] dark:bg-[#0B1220] border border-[var(--plm-border)] p-4 rounded-sm flex flex-col justify-between min-h-[110px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-700 dark:text-slate-300">60% 中性背景画布 (Neutral Canvas)</span>
                <span className="text-xs font-mono bg-white dark:bg-slate-800 px-1.5 py-0.5 rounded-xs border border-slate-200 dark:border-slate-700">
                  {mode === 'dark' ? '#0B1220' : '#F4F7FB'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                全站底层环境，以极低饱和度的冷灰调衬托工程图纸、树状表格与拓扑图，避免白光刺眼。
              </p>
            </div>
            <div className="text-[11px] text-slate-400">页面背景 / 模态遮罩底色</div>
          </div>

          {/* 30% */}
          <div className="md:col-span-3 bg-white dark:bg-[#111C2E] border border-[var(--plm-border)] p-4 rounded-sm flex flex-col justify-between min-h-[110px]">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">30% 结构层级 (Structure)</span>
                <span className="text-xs font-mono bg-slate-50 dark:bg-slate-800 px-1.5 py-0.5 rounded-xs border border-slate-200 dark:border-slate-700">
                  {mode === 'dark' ? '#111C2E' : '#FFFFFF'}
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                表格容器、卡片面板、1px 发丝边框 (`#D8E0EA`)、次要属性标签与辅助文字。
              </p>
            </div>
            <div className="text-[11px] text-slate-400">单层标高 / 精密网格边框</div>
          </div>

          {/* 10% */}
          <div className="md:col-span-1 bg-[#1D4ED8] dark:bg-[#93B4FF] text-white dark:text-[#0B1220] p-4 rounded-sm flex flex-col justify-between min-h-[110px]">
            <div>
              <span className="text-xs font-bold block">10% 主操作</span>
              <p className="text-[11px] opacity-90 mt-1">关键动作与聚焦锚点</p>
            </div>
            <div className="text-[10px] font-mono mt-2 opacity-80">
              {mode === 'dark' ? '#93B4FF' : '#1D4ED8'}
            </div>
          </div>
        </div>
      </div>

      {/* Theme Swatches: Light & Dark Parallel */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Light Theme Tokens */}
        <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
            <div>
              <h3 className="text-base font-semibold text-[var(--plm-text)]">浅色工业基准主题 (Light Theme)</h3>
              <p className="text-xs text-[var(--plm-text-secondary)]">办公显示器与通用设计终端标准配置</p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded-xs">
              标准预设
            </span>
          </div>

          <div className="divide-y divide-[var(--plm-border)]">
            {lightTokens.map(token => (
              <div key={token.name} className="py-2.5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xs border border-black/10 shrink-0 shadow-2xs"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div>
                    <div className="text-xs font-medium text-[var(--plm-text)]">{token.name}</div>
                    <div className="text-[11px] text-[var(--plm-text-secondary)]">{token.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-medium text-[var(--plm-text)] bg-[var(--plm-bg)] px-2 py-0.5 rounded-xs border border-[var(--plm-border)]">
                    {token.hex}
                  </span>
                  <button
                    onClick={() => copyToClipboard(token.hex)}
                    className="p-1 text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] cursor-pointer"
                    title="复制HEX色值"
                  >
                    {copiedHex === token.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Dark Theme Tokens */}
        <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
            <div>
              <h3 className="text-base font-semibold text-[var(--plm-text)]">深色防眩光主题 (Dark Theme)</h3>
              <p className="text-xs text-[var(--plm-text-secondary)]">夜间监控、暗光质检与工程密集排版</p>
            </div>
            <span className="text-xs font-mono px-2 py-0.5 bg-slate-800 text-slate-200 border border-slate-700 rounded-xs">
              光学补偿
            </span>
          </div>

          <div className="divide-y divide-[var(--plm-border)]">
            {darkTokens.map(token => (
              <div key={token.name} className="py-2.5 flex items-center justify-between gap-4 group">
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-xs border border-white/10 shrink-0 shadow-2xs"
                    style={{ backgroundColor: token.hex }}
                  />
                  <div>
                    <div className="text-xs font-medium text-[var(--plm-text)]">{token.name}</div>
                    <div className="text-[11px] text-[var(--plm-text-secondary)]">{token.role}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs font-mono font-medium text-[var(--plm-text)] bg-[var(--plm-bg)] px-2 py-0.5 rounded-xs border border-[var(--plm-border)]">
                    {token.hex}
                  </span>
                  <button
                    onClick={() => copyToClipboard(token.hex)}
                    className="p-1 text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)] cursor-pointer"
                    title="复制HEX色值"
                  >
                    {copiedHex === token.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Semantic Status Colors with Non-Hue Rules */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-[var(--plm-border)] pb-4">
          <div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <h3 className="text-base font-semibold text-[var(--plm-text)]">
                业务语义状态色体系 (Semantic Status System)
              </h3>
            </div>
            <p className="text-xs text-[var(--plm-text-secondary)] mt-1">
              文档第9页标准：发布前自动校验各交互状态，状态表达必须搭配<strong>文字或图标</strong>，严禁单色指示（WCAG 2.2 无障碍规范）。
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-[var(--plm-text-secondary)]">标准规范:</span>
            <span className="text-xs font-mono font-medium text-emerald-600 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded-xs border border-emerald-200 dark:border-emerald-800">
              WCAG 2.2 AA 符合
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {semanticStatuses.map(item => (
            <div
              key={item.title}
              className="border border-[var(--plm-border)] rounded-sm p-4 bg-[var(--plm-bg)] flex flex-col justify-between gap-3"
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.icon}
                    <span className="text-sm font-semibold text-[var(--plm-text)]">{item.title}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-xs">
                    <span
                      className="px-2 py-0.5 rounded-xs border text-xs font-medium"
                      style={{
                        color: mode === 'dark' ? item.darkTextHex : item.textHex,
                        backgroundColor: mode === 'dark' ? `${item.darkBgHex}55` : item.bgHex,
                        borderColor: mode === 'dark' ? item.darkBgHex : item.textHex
                      }}
                    >
                      {item.textHex}
                    </span>
                  </div>
                </div>
                <p className="text-xs text-[var(--plm-text-secondary)] mt-2 leading-relaxed">
                  <strong>触发业务场景：</strong> {item.meaning}
                </p>
              </div>

              {/* Sample Badges */}
              <div className="pt-2 border-t border-[var(--plm-border)]/60 flex items-center justify-between text-xs">
                <span className="text-[var(--plm-text-secondary)] text-[11px]">组件渲染效果：</span>
                <div className="flex items-center gap-2">
                  <Badge
                    status={
                      item.title.includes('成功')
                        ? 'Released'
                        : item.title.includes('警告')
                        ? 'InReview'
                        : item.title.includes('错误')
                        ? 'Obsolete'
                        : 'Draft'
                    }
                  />
                  <span className="text-[11px] font-mono text-[var(--plm-text-secondary)]">
                    对衬背景: {item.bgHex}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Module Accent Colors */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
        <div>
          <h3 className="text-base font-semibold text-[var(--plm-text)]">
            业务模块专属强调色 (Module Accent Colors)
          </h3>
          <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
            根据文档第12页配置示例，BOM 模块独立配置 <code>accent: "#0F766E"</code>（湖青），用于区别总成装配与通用物料。
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {moduleAccents.map(mod => (
            <div
              key={mod.name}
              className="p-3.5 border border-[var(--plm-border)] rounded-sm bg-[var(--plm-bg)] flex flex-col justify-between gap-3"
            >
              <div className="flex items-center gap-2.5">
                <div
                  className="w-6 h-6 rounded-xs shrink-0 shadow-2xs"
                  style={{ backgroundColor: mod.hex }}
                />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-[var(--plm-text)] truncate">{mod.name}</div>
                  <div className="text-[11px] font-mono text-[var(--plm-text-secondary)]">{mod.hex}</div>
                </div>
              </div>
              <p className="text-[11px] text-[var(--plm-text-secondary)] leading-relaxed">
                {mod.role}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
