import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Input } from '../common/Input';
import { Select } from '../common/Select';
import { Modal } from '../common/Modal';
import { Drawer } from '../common/Drawer';
import { Textarea } from '../common/Textarea';
import { SearchInput } from '../common/SearchInput';
import { DateTimePicker } from '../common/DateTimePicker';
import { Checkbox } from '../common/Checkbox';
import { RadioGroup } from '../common/Radio';
import { Card } from '../common/Card';
import { ProgressBar } from '../common/ProgressBar';
import { Pagination } from '../common/Pagination';
import { Tabs } from '../common/Tabs';
import { PageHeader } from '../common/PageHeader';
import { Steps } from '../common/Steps';
import { NavMenu } from '../common/NavMenu';
import { Spinner, Skeleton } from '../common/Loading';
import { RichTextEditor } from '../common/RichTextEditor';
import { ImagePreview } from '../common/ImagePreview';
import { Link } from '../common/Link';
import { Divider } from '../common/BorderDivider';
import { IconGallery } from '../common/IconGallery';
import { SplitPane, GridContainer } from '../common/LayoutContainer';
import { PLMStructureTree, PLMTreeNode } from '../plm/PLMStructureTree';
import { MOCK_PARTS, MOCK_CHANGE_ORDERS, MOCK_DIFF_ROWS } from '../../mock/plmData';
import {
  Layers,
  Search,
  Filter,
  Plus,
  Edit3,
  Eye,
  CheckCircle,
  Clock,
  AlertTriangle,
  GitCompare,
  FileText,
  Boxes,
  Lock,
  Unlock,
  ChevronRight,
  Maximize2
} from 'lucide-react';

export const ComponentLibraryView: React.FC = () => {
  const { config, preset } = useTheme();

  // Interactive component states
  const [activeTier, setActiveTier] = useState<'base' | 'business' | 'plm_domain'>('plm_domain');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const [selectedPart, setSelectedPart] = useState(MOCK_PARTS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('ALL');

  // Input states
  const [inputVal, setInputVal] = useState('PART-001');
  const [inputError, setInputError] = useState('');

  // States for the 19 atomic components
  const [atomicCategory, setAtomicCategory] = useState<'all' | 'form' | 'nav' | 'display' | 'feedback'>('all');
  const [atomicSearch, setAtomicSearch] = useState('PART-001');
  const [atomicTextarea, setAtomicTextarea] = useState('由于该无人机工作在海边潮湿高盐环境，紧固件必须满足 GB/T 2423.17 96h 盐雾腐蚀试验标准。');
  const [atomicDate, setAtomicDate] = useState('2026-10-09');
  const [atomicTime, setAtomicTime] = useState('14:30');
  const [atomicCheckbox1, setAtomicCheckbox1] = useState(true);
  const [atomicCheckbox2, setAtomicCheckbox2] = useState(false);
  const [atomicCheckboxIndeterminate, setAtomicCheckboxIndeterminate] = useState(true);
  const [atomicRadioStandard, setAtomicRadioStandard] = useState('make');
  const [atomicRadioCard, setAtomicRadioCard] = useState('high');
  const [atomicTabsKey, setAtomicTabsKey] = useState('tab-ebom');
  const [atomicCurrentPage, setAtomicCurrentPage] = useState(2);
  const [atomicPageSize, setAtomicPageSize] = useState(10);
  const [atomicCurrentStep, setAtomicCurrentStep] = useState(1);
  const [atomicNavMenuKey, setAtomicNavMenuKey] = useState('parts');

  const handleTestSubmit = () => {
    setButtonLoading(true);
    setTimeout(() => {
      setButtonLoading(false);
      setIsModalOpen(false);
    }, 1000);
  };

  const filteredParts = MOCK_PARTS.filter(p => {
    const matchesSearch = p.code.toLowerCase().includes(searchQuery.toLowerCase()) || p.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = categoryFilter === 'ALL' || p.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-10 pb-16">
      {/* Header Banner */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[var(--plm-primary)] uppercase tracking-wider">
              <span>Section 03</span>
              <span>·</span>
              <span>Component Architecture</span>
            </div>
            <h1 className="text-2xl font-bold text-[var(--plm-text)] tracking-tight mt-1">
              PLM 4级分层组件库与业务配置 (Component Hierarchy)
            </h1>
            <p className="text-sm text-[var(--plm-text-secondary)] mt-1.5 max-w-3xl leading-relaxed">
              遵循文档第8页架构定义：从底层原子按钮与输入框，到通用业务筛选表格，再到制造核心领域的
              <strong className="text-[var(--plm-text)] font-semibold"> BOM树表、版本对比器、受控修订选择器与图纸预览</strong>，全量由设计变量驱动。
            </p>
          </div>

          {/* Tier Switcher */}
          <div className="flex items-center bg-[var(--plm-bg)] p-1 rounded-sm border border-[var(--plm-border)] text-xs">
            <button
              onClick={() => setActiveTier('plm_domain')}
              className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer font-medium ${
                activeTier === 'plm_domain'
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] shadow-2xs'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              }`}
            >
              PLM 专用业务组件
            </button>
            <button
              onClick={() => setActiveTier('business')}
              className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer font-medium ${
                activeTier === 'business'
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] shadow-2xs'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              }`}
            >
              通用业务组件
            </button>
            <button
              onClick={() => setActiveTier('base')}
              className={`px-3 py-1.5 rounded-xs transition-all cursor-pointer font-medium ${
                activeTier === 'base'
                  ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] shadow-2xs'
                  : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
              }`}
            >
              基础原子组件
            </button>
          </div>
        </div>
      </div>

      {/* Tier 3: PLM Domain Components */}
      {activeTier === 'plm_domain' && (
        <div className="space-y-8">
          {/* Component 1: Product Structure & Assembly Tree (Document Page 6 & 8) */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--plm-border)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Layers className="w-4 h-4 text-[var(--plm-bom-accent)]" />
                  <h3 className="text-base font-semibold text-[var(--plm-text)]">
                    产品结构与装配拓扑树组件 (Product Structure & Assembly Tree)
                  </h3>
                </div>
                <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                  文档第6页与第8页核心规范：支持总成/子件多级折叠展开、节点快速检索、检出锁定标识、跨总成零件复用标签与单选属性联动。
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono px-2 py-0.5 bg-teal-50 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 rounded-xs">
                  PLM 专用业务树
                </span>
              </div>
            </div>

            {/* Live Tree Component */}
            <PLMStructureTree
              onSelectNode={(node: PLMTreeNode) => {
                const matchedPart = MOCK_PARTS.find(p => p.code === node.code);
                if (matchedPart) {
                  setSelectedPart(matchedPart);
                }
              }}
            />
          </div>

          {/* Component 2: Part Master with Revision State (Stable ID vs Rev A vs A.1) */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--plm-border)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Boxes className="w-4 h-4 text-[var(--plm-primary)]" />
                  <h3 className="text-base font-semibold text-[var(--plm-text)]">
                    物料身份与修订受控卡片 (Part Master & Controlled Revisions)
                  </h3>
                </div>
                <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                  文档第5页明确规则：长期稳定物料标识（PART-001），区分受控正式修订（A、B）与工作保存记录（A.1、A.2）。
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="secondary"
                  leftIcon={selectedPart.isCheckedOut ? <Lock className="w-3.5 h-3.5 text-amber-600" /> : <Unlock className="w-3.5 h-3.5 text-emerald-600" />}
                  onClick={() => {
                    setSelectedPart({
                      ...selectedPart,
                      isCheckedOut: !selectedPart.isCheckedOut,
                      checkedOutBy: !selectedPart.isCheckedOut ? '当前用户 (张工)' : undefined
                    });
                  }}
                >
                  {selectedPart.isCheckedOut ? '检出锁定中' : '检入未锁定'}
                </Button>
                <Button
                  size="sm"
                  variant="primary"
                  leftIcon={<Eye className="w-3.5 h-3.5" />}
                  onClick={() => setIsDrawerOpen(true)}
                >
                  查看物料属性抽屉
                </Button>
              </div>
            </div>

            {/* Active Part Header */}
            <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <span className="text-[11px] text-[var(--plm-text-secondary)] block">长期稳定标识 (ID)</span>
                <span className="text-base font-mono font-bold text-[var(--plm-text)] mt-0.5 block">
                  {selectedPart.code}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">UID: {selectedPart.id}</span>
              </div>

              <div>
                <span className="text-[11px] text-[var(--plm-text-secondary)] block">正式受控修订 / 工作记录</span>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-mono font-bold text-xs rounded-xs border border-blue-200 dark:border-blue-800">
                    Rev {selectedPart.revision}
                  </span>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">
                    (迭代: {selectedPart.workingRevision})
                  </span>
                </div>
                <span className="text-[10px] text-slate-400">普通保存不自增主修订</span>
              </div>

              <div>
                <span className="text-[11px] text-[var(--plm-text-secondary)] block">生命周期状态</span>
                <div className="mt-1">
                  <Badge status={selectedPart.status} />
                </div>
                <span className="text-[10px] text-slate-400 mt-1 block">制程: {selectedPart.makeOrBuy}</span>
              </div>

              <div>
                <span className="text-[11px] text-[var(--plm-text-secondary)] block">责任工程师 / 归属</span>
                <span className="text-xs font-medium text-[var(--plm-text)] mt-1 block">
                  {selectedPart.owner}
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{selectedPart.updatedAt}</span>
              </div>
            </div>
          </div>

          {/* Component 3: BOM Version Diff Viewer (Side by Side & Diff Highlights) */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--plm-border)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <GitCompare className="w-4 h-4 text-[var(--plm-bom-accent)]" />
                  <h3 className="text-base font-semibold text-[var(--plm-text)]">
                    BOM 版本差异对比器 (BOM Version Diff / Comparator)
                  </h3>
                </div>
                <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                  文档第6页与第7页规范：新增、删除、修改用文字、图标与颜色联合表达；支持精准定位字段级差异。
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-[var(--plm-text-secondary)]">
                <span>基线对比: ASM-GMB-001 Rev A ➔ Rev B</span>
              </div>
            </div>

            <div className="overflow-x-auto border border-[var(--plm-border)] rounded-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)] text-[var(--plm-text-secondary)]">
                    <th className="py-2.5 px-4 font-semibold w-16">差异</th>
                    <th className="py-2.5 px-4 font-semibold">物料编码</th>
                    <th className="py-2.5 px-4 font-semibold">零部件名称</th>
                    <th className="py-2.5 px-4 font-semibold">旧版本 (Rev A 快照)</th>
                    <th className="py-2.5 px-4 font-semibold">新版本 (Rev B 目标)</th>
                    <th className="py-2.5 px-4 font-semibold">变更说明与参数</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--plm-border)]">
                  {MOCK_DIFF_ROWS.map(row => (
                    <tr
                      key={row.rowId}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-900/40 transition-colors ${
                        row.diffType === 'added'
                          ? 'bg-emerald-50/40 dark:bg-emerald-950/20'
                          : row.diffType === 'removed'
                          ? 'bg-red-50/40 dark:bg-red-950/20'
                          : row.diffType === 'modified'
                          ? 'bg-blue-50/40 dark:bg-blue-950/20'
                          : ''
                      }`}
                      style={{ minHeight: `${config.globals.minRowHeight}px` }}
                    >
                      <td className="py-3 px-4">
                        <Badge status={row.diffType} />
                      </td>
                      <td className="py-3 px-4 font-mono font-medium text-[var(--plm-text)]">
                        {row.code}
                      </td>
                      <td className="py-3 px-4 text-[var(--plm-text)] font-medium">{row.name}</td>
                      <td className="py-3 px-4 font-mono text-[var(--plm-text-secondary)]">
                        {row.revA.quantity !== undefined ? `用量: ${row.revA.quantity} · ${row.revA.status || ''}` : '-'}
                      </td>
                      <td className="py-3 px-4 font-mono text-[var(--plm-text)]">
                        {row.revB.quantity !== undefined ? `用量: ${row.revB.quantity} · ${row.revB.status || ''}` : '-'}
                      </td>
                      <td className="py-3 px-4 text-[var(--plm-text-secondary)]">
                        {row.fieldChanges?.map((fc, i) => (
                          <div key={i} className="text-[11px]">
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{fc.field}:</span>{' '}
                            <span className="line-through text-red-500 mr-1">{fc.oldValue}</span>
                            <span className="font-bold text-emerald-600 dark:text-emerald-400">{fc.newValue}</span>
                          </div>
                        )) || <span className="text-slate-400">无改动</span>}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Component 4: Engineering Change Impact Card (ECO / ECN) */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-amber-600" />
                  <h3 className="text-base font-semibold text-[var(--plm-text)]">
                    工程变更影响分析卡 (ECO / ECN Impact Analysis)
                  </h3>
                </div>
                <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                  文档第3页与第7页规范：变更原因、受影响对象数量、波及范围与审批链绑定。
                </p>
              </div>
              <Button size="sm" variant="primary" leftIcon={<Plus className="w-3.5 h-3.5" />}>
                发起新变更申请 (ECR)
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {MOCK_CHANGE_ORDERS.map(eco => (
                <div
                  key={eco.id}
                  className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm flex flex-col justify-between gap-3 hover:border-[var(--plm-primary)] transition-colors"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono font-bold text-[var(--plm-text)]">{eco.id}</span>
                      <Badge status={eco.status} />
                    </div>
                    <h4 className="text-xs font-semibold text-[var(--plm-text)] mt-2 leading-snug line-clamp-2">
                      {eco.title}
                    </h4>
                    <p className="text-[11px] text-[var(--plm-text-secondary)] mt-1.5 leading-relaxed line-clamp-2">
                      {eco.reason}
                    </p>
                  </div>

                  <div className="border-t border-[var(--plm-border)] pt-2.5 flex items-center justify-between text-[11px] text-[var(--plm-text-secondary)]">
                    <span>波及物料: <strong className="text-[var(--plm-text)] font-mono">{eco.affectedCount}</strong> 项</span>
                    <span>生效期: <strong className="font-mono text-[var(--plm-text)]">{eco.effectiveDate}</strong></span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tier 2: Business Components */}
      {activeTier === 'business' && (
        <div className="space-y-8">
          {/* Business DataTable with Density awareness */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[var(--plm-border)] pb-3">
              <div>
                <h3 className="text-base font-semibold text-[var(--plm-text)]">
                  业务数据表格 (Data Table with Row Density)
                </h3>
                <p className="text-xs text-[var(--plm-text-secondary)]">
                  当前最小行高：<strong className="font-mono text-[var(--plm-text)]">{config.globals.minRowHeight}px</strong> (跟随「{config.preset === 'standard' ? '标准专业' : config.preset === 'compact' ? '紧凑工程' : '柔和协作'}」预设自适应)
                </p>
              </div>

              {/* Filter controls */}
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-[var(--plm-text-secondary)] absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input
                    type="text"
                    placeholder="按编码/名称搜索..."
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    className="pl-8 pr-3 py-1 text-xs bg-[var(--plm-surface)] border border-[var(--plm-input-border)] rounded-xs outline-none focus:border-[var(--plm-primary)] text-[var(--plm-text)]"
                  />
                </div>
                <select
                  value={categoryFilter}
                  onChange={e => setCategoryFilter(e.target.value)}
                  className="px-2 py-1 text-xs bg-[var(--plm-surface)] border border-[var(--plm-input-border)] rounded-xs outline-none focus:border-[var(--plm-primary)] text-[var(--plm-text)] cursor-pointer"
                >
                  <option value="ALL">全部分类</option>
                  <option value="机电动力">机电动力</option>
                  <option value="结构件">结构件</option>
                  <option value="电子元器件">电子元器件</option>
                  <option value="紧固标准件">紧固标准件</option>
                </select>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto border border-[var(--plm-border)] rounded-sm">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)] text-[var(--plm-text-secondary)]">
                    <th className="py-2.5 px-3 w-8">
                      <input type="checkbox" className="rounded-xs cursor-pointer" />
                    </th>
                    <th className="py-2.5 px-3 font-semibold">物料编码</th>
                    <th className="py-2.5 px-3 font-semibold">零件名称</th>
                    <th className="py-2.5 px-3 font-semibold">分类</th>
                    <th className="py-2.5 px-3 font-semibold">受控修订</th>
                    <th className="py-2.5 px-3 font-semibold">状态</th>
                    <th className="py-2.5 px-3 font-semibold">来源</th>
                    <th className="py-2.5 px-3 font-semibold">责任人</th>
                    <th className="py-2.5 px-3 font-semibold text-right">操作</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--plm-border)]">
                  {filteredParts.map(part => (
                    <tr
                      key={part.id}
                      onClick={() => setSelectedPart(part)}
                      className={`hover:bg-blue-50/30 dark:hover:bg-blue-950/20 cursor-pointer transition-colors ${
                        selectedPart.id === part.id ? 'bg-[var(--plm-selected-bg)]/40 font-medium' : ''
                      }`}
                      style={{ height: `${config.globals.minRowHeight}px` }}
                    >
                      <td className="py-1 px-3">
                        <input
                          type="checkbox"
                          checked={selectedPart.id === part.id}
                          onChange={() => setSelectedPart(part)}
                          className="rounded-xs cursor-pointer"
                        />
                      </td>
                      <td className="py-1 px-3 font-mono font-medium text-[var(--plm-text)]">
                        {part.code}
                      </td>
                      <td className="py-1 px-3 text-[var(--plm-text)]">{part.name}</td>
                      <td className="py-1 px-3 text-[var(--plm-text-secondary)]">{part.category}</td>
                      <td className="py-1 px-3 font-mono text-[var(--plm-text)]">
                        Rev {part.revision} ({part.workingRevision})
                      </td>
                      <td className="py-1 px-3">
                        <Badge status={part.status} />
                      </td>
                      <td className="py-1 px-3 text-[var(--plm-text-secondary)]">{part.makeOrBuy}</td>
                      <td className="py-1 px-3 text-[var(--plm-text-secondary)]">{part.owner}</td>
                      <td className="py-1 px-3 text-right">
                        <button
                          onClick={e => {
                            e.stopPropagation();
                            setSelectedPart(part);
                            setIsDrawerOpen(true);
                          }}
                          className="text-[var(--plm-primary)] hover:underline font-medium text-xs p-1"
                        >
                          属性
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Timeline / Approval Flow Component */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
            <div className="border-b border-[var(--plm-border)] pb-3">
              <h3 className="text-base font-semibold text-[var(--plm-text)]">
                受控审批流与审计时间线 (Approval Timeline & Audit Trail)
              </h3>
              <p className="text-xs text-[var(--plm-text-secondary)]">
                记录物料发布、ECO生效的完整审批节点、时间戳与数字签名
              </p>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-[var(--plm-border)]">
              <div className="relative flex items-start gap-3">
                <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-emerald-500 border-2 border-[var(--plm-surface)] shadow-xs" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--plm-text)]">结构室主任 · 审批通过</span>
                    <span className="text-[11px] font-mono text-[var(--plm-text-secondary)]">2026-10-08 16:40</span>
                  </div>
                  <p className="text-xs text-[var(--plm-text-secondary)]">
                    “经静力分析与模态复核，3.2mm碳纤维支臂应力分布合理，准予正式发布进入生产基线。”
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-blue-500 border-2 border-[var(--plm-surface)] shadow-xs" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--plm-text)]">材料标准化评审 · 会签通过</span>
                    <span className="text-[11px] font-mono text-[var(--plm-text-secondary)]">2026-10-08 14:15</span>
                  </div>
                  <p className="text-xs text-[var(--plm-text-secondary)]">
                    “原材料物料号匹配，供方已提供出厂材质证明文件。”
                  </p>
                </div>
              </div>

              <div className="relative flex items-start gap-3">
                <span className="absolute -left-6 top-1 w-4 h-4 rounded-full bg-amber-500 border-2 border-[var(--plm-surface)] shadow-xs" />
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[var(--plm-text)]">制造工艺部 · 会签处理中</span>
                    <Badge status="InReview" size="xs" />
                  </div>
                  <p className="text-xs text-[var(--plm-text-secondary)]">
                    “正在评估五轴CNC加工工装夹具适应性，预计今日下班前反馈结论。”
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tier 1: Base Atomic Components */}
      {activeTier === 'base' && (
        <div className="space-y-8">
          {/* Atomic Sub-navigation Filter Bar */}
          <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-bold text-[var(--plm-text)]">
                PLM 基础原子组件库 (19类全集规范)
              </h3>
              <p className="text-xs text-[var(--plm-text-secondary)] mt-0.5">
                包含表单文本、时间选择、单选多选、导航结构、卡片容器、图片预览、步骤条及进度加载等完整原子能力
              </p>
            </div>

            <div className="flex items-center gap-1 bg-[var(--plm-bg)] p-1 rounded-xs border border-[var(--plm-border)] text-xs select-none">
              <button
                onClick={() => setAtomicCategory('all')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  atomicCategory === 'all'
                    ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-semibold shadow-2xs'
                    : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
                }`}
              >
                全部组件 (19类)
              </button>
              <button
                onClick={() => setAtomicCategory('form')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  atomicCategory === 'form'
                    ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-semibold shadow-2xs'
                    : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
                }`}
              >
                表单与输入
              </button>
              <button
                onClick={() => setAtomicCategory('nav')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  atomicCategory === 'nav'
                    ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-semibold shadow-2xs'
                    : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
                }`}
              >
                导航与排版
              </button>
              <button
                onClick={() => setAtomicCategory('display')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  atomicCategory === 'display'
                    ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-semibold shadow-2xs'
                    : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
                }`}
              >
                容器与展示
              </button>
              <button
                onClick={() => setAtomicCategory('feedback')}
                className={`px-2.5 py-1 rounded-xs transition-colors cursor-pointer ${
                  atomicCategory === 'feedback'
                    ? 'bg-[var(--plm-surface)] text-[var(--plm-text)] font-semibold shadow-2xs'
                    : 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]'
                }`}
              >
                反馈与图标
              </button>
            </div>
          </div>

          {/* Group 1: Form & Text (① 富文本, ② 多行文本, ③ 搜索框, ④ 时间选择器, ⑨ 多选框, ⑩⑪ 单选框与卡片, 按钮与输入) */}
          {(atomicCategory === 'all' || atomicCategory === 'form') && (
            <div className="space-y-6">
              {/* ③ 搜索框 & 基础按钮 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ③ 搜索框 (SearchInput) 与按钮操作
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      支持一键清空、快捷键徽标 (⌘K)、尺寸梯阶与操作状态
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#03 Search</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SearchInput
                    value={atomicSearch}
                    onChange={e => setAtomicSearch(e.target.value)}
                    onClear={() => setAtomicSearch('')}
                    placeholder="按物料编码、零件名称或规格快速搜索..."
                  />
                  <SearchInput
                    sizeVariant="sm"
                    placeholder="紧凑小号搜索框 (sm)..."
                    shortcutBadge="ESC"
                  />
                </div>

                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <Button variant="primary">主要操作 (Solid)</Button>
                  <Button variant="secondary">次要操作 (Outline)</Button>
                  <Button variant="ghost">幽灵操作 (Ghost)</Button>
                  <Button variant="danger">危险/驳回 (Danger)</Button>
                  <Button variant="accent">BOM专属强调</Button>
                  <Button
                    variant="primary"
                    isLoading={buttonLoading}
                    onClick={() => {
                      setButtonLoading(true);
                      setTimeout(() => setButtonLoading(false), 1200);
                    }}
                  >
                    点击测试加载
                  </Button>
                </div>
              </div>

              {/* ② 多行文本框 & ④ 时间选择器 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ② 多行文本框 (Textarea) 与 ④ 时间选择器 (DateTimePicker)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      支持字符计数、自适应高度、必填校验及标准日期时间格式
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#02 Textarea · #04 Time</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Textarea
                    label="工程变更原因与背景详细描述 (ECO Reason)"
                    value={atomicTextarea}
                    onChange={e => setAtomicTextarea(e.target.value)}
                    showCount
                    maxLength={300}
                    rows={4}
                    helperText="必填项：详细记录设计缺陷、试验数据或客户定制需求"
                  />

                  <div className="space-y-4">
                    <DateTimePicker
                      label="计划变更生效日期 (Effective Date)"
                      type="date"
                      value={atomicDate}
                      onChange={setAtomicDate}
                      required
                      helperText="将自动关联至新基线发布审批流"
                    />
                    <DateTimePicker
                      label="班次复核截止时间 (Review Deadline)"
                      type="time"
                      value={atomicTime}
                      onChange={setAtomicTime}
                      helperText="24小时制工控打卡节点"
                    />
                  </div>
                </div>
              </div>

              {/* ① 富文本组件 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ① 富文本编辑器与检视器 (RichTextEditor)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      针对工程制造技术要求、工艺规程编写，提供加粗、斜体、列表、重点标黄与代码块
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#01 RichText</span>
                </div>

                <RichTextEditor />
              </div>

              {/* ⑨ 多选框 & ⑩ 单选框 & ⑪ 单选卡片 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑨ 多选框 (Checkbox) · ⑩ 单选框 (Radio) · ⑪ 单选卡片 (Radio Cards)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      支持半选态 (Indeterminate)、单选卡片式选择及分段式控制器
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#09 Checkbox · #10 Radio · #11 Card</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* ⑨ 多选框 */}
                  <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm space-y-3">
                    <span className="text-xs font-bold text-[var(--plm-text)] block">
                      ⑨ 多选框状态 (Checkbox)
                    </span>
                    <div className="space-y-2.5">
                      <Checkbox
                        checked={atomicCheckbox1}
                        onChange={setAtomicCheckbox1}
                        label="自动执行 CAD 图纸关联同步"
                        description="检入时从模型提取派生 PDF"
                      />
                      <Checkbox
                        checked={atomicCheckbox2}
                        onChange={setAtomicCheckbox2}
                        label="启用生产批次有效性追溯"
                        description="针对关键安全件进行序列号锁定"
                      />
                      <Checkbox
                        indeterminate={atomicCheckboxIndeterminate}
                        checked={false}
                        onChange={() => setAtomicCheckboxIndeterminate(!atomicCheckboxIndeterminate)}
                        label="半选状态 (Indeterminate)"
                        description="部分子装配体节点已选中"
                      />
                    </div>
                  </div>

                  {/* ⑩ 标准单选框 */}
                  <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm space-y-3">
                    <span className="text-xs font-bold text-[var(--plm-text)] block">
                      ⑩ 标准单选框 (Radio Group)
                    </span>
                    <RadioGroup
                      name="mfg_type"
                      value={atomicRadioStandard}
                      onChange={setAtomicRadioStandard}
                      options={[
                        { value: 'make', label: '自制件 (CNC / 模具装配)', description: '车间工时定额核算' },
                        { value: 'buy', label: '外购标准紧固件', description: '供应商合格目录直采' },
                        { value: 'subcontract', label: '外协委外热处理', description: '外协厂表面微弧氧化' }
                      ]}
                    />
                  </div>

                  {/* ⑪ 单选卡片 */}
                  <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm space-y-3">
                    <span className="text-xs font-bold text-[var(--plm-text)] block">
                      ⑪ 单选卡片 (Radio Cards)
                    </span>
                    <RadioGroup
                      name="eco_impact"
                      variant="card"
                      value={atomicRadioCard}
                      onChange={setAtomicRadioCard}
                      options={[
                        { value: 'high', label: '重大变更 (Level 1)', description: '波及顶层整机总成，需跨部门审批', badge: '强管控' },
                        { value: 'medium', label: '常规变更 (Level 2)', description: '仅影响子件工装，本室主任批准' }
                      ]}
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group 2: Navigation & Structure (⑯ Page Header, ⑯ Tabs, ⑰ Steps, ⑱ NavMenu, ⑮ Pagination, ⑦ Link) */}
          {(atomicCategory === 'all' || atomicCategory === 'nav') && (
            <div className="space-y-6">
              {/* ⑯ Page Header 页头 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑯ Page Header 标准页头组件
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      包含多级面包屑导航、对象大标题、状态徽标组合与右侧主操作区
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#16 PageHeader</span>
                </div>

                <PageHeader
                  breadcrumbs={[
                    { label: '产品数据管理 (PDM)', href: '#' },
                    { label: '工业无人机产品族', href: '#' },
                    { label: 'ASM-GMB-001 三轴增稳总成' }
                  ]}
                  title="ASM-GMB-001 工业三轴增稳云台总成"
                  subtitle="受控版本：Rev B (A.2) · 责任团队：机械结构研发室 · 内部物料唯一标识：PRT-1001-STABLE"
                  tags={
                    <>
                      <Badge status="Released" />
                      <span className="text-xs font-mono text-[var(--plm-text-secondary)] bg-[var(--plm-bg)] border border-[var(--plm-border)] px-1.5 py-0.5 rounded-xs">
                        自制总成
                      </span>
                    </>
                  }
                  actions={
                    <>
                      <Button size="sm" variant="secondary">
                        导出 EBOM
                      </Button>
                      <Button size="sm" variant="primary">
                        发起工程变更 (ECO)
                      </Button>
                    </>
                  }
                />
              </div>

              {/* ⑯ Tabs 标签页 & ⑰ 步骤条 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑯ Tabs 标签页与 ⑰ 步骤条 (Steps)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      标签支持线框式与分段胶囊式；步骤条串联工程变更生命周期
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#16 Tabs · #17 Steps</span>
                </div>

                {/* Tabs */}
                <div className="space-y-3">
                  <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block">
                    标准线框 Tabs 切换
                  </span>
                  <Tabs
                    activeKey={atomicTabsKey}
                    onChange={setAtomicTabsKey}
                    items={[
                      { key: 'tab-ebom', label: '工程 BOM 结构树', badge: '11' },
                      { key: 'tab-docs', label: '关联图纸与模型', badge: '3' },
                      { key: 'tab-eco', label: '工程变更记录', badge: '2' },
                      { key: 'tab-history', label: '受控修订履历' }
                    ]}
                  />
                </div>

                {/* Steps */}
                <div className="pt-4 border-t border-[var(--plm-border)] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block">
                      ⑰ 工程变更审批步骤条 (当前节点：步骤 {atomicCurrentStep + 1})
                    </span>
                    <div className="flex items-center gap-1.5">
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={atomicCurrentStep <= 0}
                        onClick={() => setAtomicCurrentStep(Math.max(0, atomicCurrentStep - 1))}
                      >
                        上一步
                      </Button>
                      <Button
                        size="sm"
                        variant="secondary"
                        disabled={atomicCurrentStep >= 3}
                        onClick={() => setAtomicCurrentStep(Math.min(3, atomicCurrentStep + 1))}
                      >
                        下一步
                      </Button>
                    </div>
                  </div>

                  <Steps
                    current={atomicCurrentStep}
                    items={[
                      { title: '发起变更 (ECR)', description: '张工填写缺陷与参数' },
                      { title: '影响分析 (ECO)', description: '波及3项零部件与夹具' },
                      { title: '主任会签审批', description: '结构室与工艺室联审' },
                      { title: '实施确认 (ECN)', description: '新版本B生效并同步MES' }
                    ]}
                  />
                </div>
              </div>

              {/* ⑱ 导航菜单 & ⑮ 分页 & ⑦ Link 链接 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑱ 导航菜单 (NavMenu) · ⑮ 分页 (Pagination) · ⑦ Link 链接
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      多层级树状导航树、标准工业分页器与等宽编码超链接
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#18 Nav · #15 Pager · #07 Link</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                  {/* NavMenu */}
                  <div className="md:col-span-4 p-3 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm">
                    <span className="text-xs font-bold text-[var(--plm-text)] block mb-2">
                      ⑱ 垂直多级菜单 (NavMenu)
                    </span>
                    <NavMenu
                      activeKey={atomicNavMenuKey}
                      onSelect={setAtomicNavMenuKey}
                      items={[
                        {
                          key: 'pdm',
                          label: '产品数据管理',
                          children: [
                            { key: 'parts', label: '物料与零部件库', badge: 148 },
                            { key: 'products', label: '产品族型号定义', badge: 12 },
                            { key: 'drawings', label: '图纸与 CAD 资产' }
                          ]
                        },
                        { key: 'ebom', label: '工程 BOM 工作区', badge: '活跃' },
                        { key: 'eco', label: '工程变更管理 (ECO)' },
                        { key: 'config', label: '设计变量与外观配置' }
                      ]}
                    />
                  </div>

                  {/* Links & Pagination */}
                  <div className="md:col-span-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <span className="text-xs font-bold text-[var(--plm-text)] block">
                        ⑦ Link 链接样式规范
                      </span>
                      <div className="flex flex-wrap items-center gap-4 text-xs">
                        <Link variant="primary">主要高亮链接 (Primary)</Link>
                        <Link variant="subtle">次要静默文本链接 (Subtle)</Link>
                        <Link variant="monospace" href="#">
                          PART-001 (等宽物料锚点)
                        </Link>
                        <Link variant="primary" external href="https://www.designtokens.org">
                          外链至 DTCG 设计变量规范
                        </Link>
                      </div>
                    </div>

                    <div className="pt-4 border-t border-[var(--plm-border)] space-y-2">
                      <span className="text-xs font-bold text-[var(--plm-text)] block">
                        ⑮ 分页器 (Pagination with Page Size)
                      </span>
                      <Pagination
                        current={atomicCurrentPage}
                        total={148}
                        pageSize={atomicPageSize}
                        onChange={setAtomicCurrentPage}
                        onPageSizeChange={setAtomicPageSize}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group 3: Containers & Display (⑫ 卡片, ⑬ 图片, ⑭ 进度条, ⑥ 布局容器, ⑧ 边框) */}
          {(atomicCategory === 'all' || atomicCategory === 'display') && (
            <div className="space-y-6">
              {/* ⑫ 卡片组件 & ⑭ 进度条 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑫ 卡片 (Card) 与 ⑭ 进度条 (ProgressBar)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      指标型卡片、技术要求卡片以及多段式装配/释放进度
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#12 Card · #14 Progress</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Card 1: Metric */}
                  <Card
                    title="BOM 零件释放进度"
                    subtitle="装配体物料总计 11 项"
                    extra={<Badge status="InReview" size="xs" />}
                    footer={<span>上次全量冻结：2026-10-08 18:00</span>}
                  >
                    <div className="space-y-3">
                      <ProgressBar
                        percent={81.8}
                        label="整体发布率"
                        status="accent"
                      />
                      <ProgressBar
                        percent={100}
                        label="自制件释放进度 (6/6)"
                        status="success"
                      />
                    </div>
                  </Card>

                  {/* Card 2: Multi-segment Progress */}
                  <Card
                    title="分段进度条 (Multi-Segment)"
                    subtitle="离散工单加工工序分布"
                    footer={<span>机加工 ➔ 质检 ➔ 表面处理</span>}
                  >
                    <div className="space-y-2">
                      <ProgressBar
                        percent={100}
                        showInfo={false}
                        segments={[
                          { percent: 45, color: '#1D4ED8', label: 'CNC粗加工 (45%)' },
                          { percent: 35, color: '#0F766E', label: '精铣与攻丝 (35%)' },
                          { percent: 20, color: '#166534', label: '三坐标质检 (20%)' }
                        ]}
                      />
                      <div className="flex justify-between text-[11px] text-[var(--plm-text-secondary)] font-mono">
                        <span className="text-blue-600 font-bold">粗铣 45%</span>
                        <span className="text-teal-600 font-bold">精修 35%</span>
                        <span className="text-emerald-600 font-bold">检验 20%</span>
                      </div>
                    </div>
                  </Card>

                  {/* Card 3: Engineering Spec */}
                  <Card
                    title="材料防腐检验标准"
                    subtitle="GB/T 2423.17 盐雾测试"
                    extra={<span className="text-xs font-mono text-emerald-600">合规</span>}
                  >
                    <p className="text-xs text-[var(--plm-text)] leading-relaxed">
                      紧固件螺栓需经过真空渗钛与钝化，在5%中性盐雾箱内历经96小时连续喷淋，表面无红锈斑点产生。
                    </p>
                  </Card>
                </div>
              </div>

              {/* ⑬ 图片与图纸缩放预览 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑬ 图片与工程图纸预览器 (ImagePreview)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      专为工程图纸设计，支持缩放 (+/-)、旋转90°、网格背景与正式受控水印保护
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#13 Image</span>
                </div>

                <div className="max-w-2xl mx-auto">
                  <ImagePreview />
                </div>
              </div>

              {/* ⑥ 布局容器 & ⑧ 边框与分割线 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑥ 布局容器 (Layout Container) 与 ⑧ 边框/分割线 (Border & Divider)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      SplitPane 左树右详情分栏、GridContainer 响应式网格与发丝分割线
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#06 Layout · #08 Border</span>
                </div>

                <div className="space-y-4">
                  {/* SplitPane Demo */}
                  <SplitPane
                    leftWidth="240px"
                    left={
                      <div className="space-y-2">
                        <span className="text-xs font-bold text-[var(--plm-text)] block">
                          分栏容器 · 左侧导航
                        </span>
                        <div className="space-y-1 font-mono text-xs">
                          <div className="p-2 bg-[var(--plm-selected-bg)] text-[var(--plm-primary)] rounded-xs font-bold">
                            ASM-GMB-001
                          </div>
                          <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xs">
                            ASM-PCH-100
                          </div>
                          <div className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xs">
                            ASM-ROL-200
                          </div>
                        </div>
                      </div>
                    }
                    right={
                      <div className="space-y-2 text-xs">
                        <span className="font-bold text-[var(--plm-text)] block">
                          分栏容器 · 右侧主工作区 (自适应填满剩余空间)
                        </span>
                        <p className="text-[var(--plm-text-secondary)] leading-relaxed">
                          采用 flex-row 布局与 1px 细线分隔，在桌面端支持拖拽或自适应收展。
                        </p>
                      </div>
                    }
                  />

                  {/* ⑧ 边框与分割线 */}
                  <div className="pt-2 space-y-3">
                    <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block">
                      ⑧ 边框与分割线阶梯 (Solid, Dashed, Labeled)
                    </span>
                    <Divider />
                    <Divider variant="dashed" />
                    <Divider label="工程数据审核分割线 (Labeled Divider)" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Group 4: Feedback & Icons (⑲ 加载, ⑤ 图标, 模态, 抽屉) */}
          {(atomicCategory === 'all' || atomicCategory === 'feedback') && (
            <div className="space-y-6">
              {/* ⑲ 加载与骨架屏 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑲ 加载指示器 (Spinner) 与骨架屏 (Skeleton)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      用于大装配体异步拉取、CAD模型轻量化转换与导出等待反馈
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#19 Loading</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                  <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm flex items-center justify-around">
                    <Spinner size="sm" tip="小号 (sm)" />
                    <Spinner size="md" tip="标准正在解析 (md)" />
                    <Spinner size="lg" tip="大号加载模型 (lg)" />
                  </div>

                  <div className="p-4 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-sm">
                    <span className="text-xs font-bold text-[var(--plm-text)] block mb-2">
                      骨架屏占位态 (Skeleton Shimmer)
                    </span>
                    <Skeleton lines={3} avatar />
                  </div>
                </div>
              </div>

              {/* ⑤ 图标库 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="border-b border-[var(--plm-border)] pb-3 flex items-center justify-between">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      ⑤ PLM 制造专用图标体系 (Icon System)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      遵循功能性减法原则，图标严格服务于物料属性、变更流程与安全受控指示
                    </p>
                  </div>
                  <span className="text-xs font-mono text-[var(--plm-text-secondary)]">#05 Icons</span>
                </div>

                <IconGallery />
              </div>

              {/* 模态与抽屉 */}
              <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-6 space-y-4">
                <div className="flex items-center justify-between border-b border-[var(--plm-border)] pb-3">
                  <div>
                    <h4 className="text-sm font-semibold text-[var(--plm-text)]">
                      浮层对话框 (Modal & Drawer)
                    </h4>
                    <p className="text-xs text-[var(--plm-text-secondary)]">
                      居中阻断弹窗用于发布确认，380px 侧抽屉用于深层属性检查
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="secondary" onClick={() => setIsModalOpen(true)}>
                      打开发布确认弹窗
                    </Button>
                    <Button variant="primary" onClick={() => setIsDrawerOpen(true)}>
                      打开物料抽屉 (380px)
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Interactive Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="发布前差异复核校验 (Pre-Publish Verification)"
        description="系统检测到当前装配体已完成工程评审，准备执行正式发布并冻结版本"
        footer={
          <>
            <Button variant="ghost" onClick={() => setIsModalOpen(false)}>
              取消
            </Button>
            <Button variant="primary" isLoading={buttonLoading} onClick={handleTestSubmit}>
              确认发布并冻结基线
            </Button>
          </>
        }
      >
        <div className="space-y-3 text-xs">
          <div className="p-3 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 rounded-xs flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">自动校验通过项 (5/5)</span>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-400 mt-0.5">
                无循环引用、单位已统一、必填字段完整、子件状态全受控、当前操作人具备正式发布权限。
              </p>
            </div>
          </div>

          <div className="border border-[var(--plm-border)] p-3 rounded-xs space-y-1.5 font-mono">
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)]">发布对象:</span>
              <span className="font-bold text-[var(--plm-text)]">ASM-GMB-001 三轴增稳总成</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)]">新受控版本:</span>
              <span className="text-blue-600 font-bold">Rev B (原 Rev A 归档)</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--plm-text-secondary)]">关联变更单:</span>
              <span>ECO-2026-0042</span>
            </div>
          </div>
        </div>
      </Modal>

      {/* Interactive Drawer */}
      <Drawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        title={`物料详情 · ${selectedPart.code}`}
        subtitle={selectedPart.name}
        footer={
          <>
            <Button size="sm" variant="ghost" onClick={() => setIsDrawerOpen(false)}>
              关闭
            </Button>
            <Button size="sm" variant="primary" onClick={() => setIsDrawerOpen(false)}>
              保存修改
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div>
            <span className="text-[11px] text-[var(--plm-text-secondary)] block font-medium">基本信息</span>
            <div className="mt-2 space-y-2 border border-[var(--plm-border)] p-3 rounded-xs bg-[var(--plm-bg)]">
              <div className="flex justify-between">
                <span className="text-[var(--plm-text-secondary)]">内部唯一ID:</span>
                <span className="font-mono">{selectedPart.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--plm-text-secondary)]">物料分类:</span>
                <span>{selectedPart.category}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--plm-text-secondary)]">自制/外购:</span>
                <span>{selectedPart.makeOrBuy}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[var(--plm-text-secondary)]">计量单位:</span>
                <span className="font-mono">{selectedPart.unit}</span>
              </div>
            </div>
          </div>

          <div>
            <span className="text-[11px] text-[var(--plm-text-secondary)] block font-medium">工程技术说明</span>
            <p className="mt-1 text-[var(--plm-text)] leading-relaxed p-2.5 bg-[var(--plm-bg)] border border-[var(--plm-border)] rounded-xs">
              {selectedPart.description || '暂无详细描述'}
            </p>
          </div>

          <div>
            <span className="text-[11px] text-[var(--plm-text-secondary)] block font-medium">版本与受控历史</span>
            <div className="mt-2 space-y-2">
              <div className="p-2 border border-[var(--plm-border)] rounded-xs flex items-center justify-between">
                <div>
                  <span className="font-mono font-bold text-[var(--plm-text)]">Rev B.1 (当前工作副本)</span>
                  <span className="text-[10px] text-slate-400 block">李工 · 未发布草稿</span>
                </div>
                <Badge status="InReview" size="xs" />
              </div>
              <div className="p-2 border border-[var(--plm-border)] rounded-xs flex items-center justify-between opacity-70">
                <div>
                  <span className="font-mono font-bold text-[var(--plm-text)]">Rev A (已冻结基线)</span>
                  <span className="text-[10px] text-slate-400 block">张工 · 2026-09-15 发布</span>
                </div>
                <Badge status="Released" size="xs" />
              </div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
