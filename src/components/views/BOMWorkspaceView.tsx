import React, { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import { BOMNode } from '../../types/plm';
import { MOCK_BOM_TREE, MOCK_PARTS } from '../../mock/plmData';
import { Button } from '../common/Button';
import { Badge } from '../common/Badge';
import { Modal } from '../common/Modal';
import { Drawer } from '../common/Drawer';
import {
  ChevronRight,
  ChevronDown,
  Layers,
  Save,
  CheckCircle,
  AlertTriangle,
  Plus,
  RefreshCw,
  Search,
  FileCheck,
  GitFork,
  ArrowRightLeft,
  ShieldAlert,
  GitCompare
} from 'lucide-react';

export const BOMWorkspaceView: React.FC = () => {
  const { config, preset } = useTheme();

  // Local state for BOM tree expansion & editing
  const [expandedRows, setExpandedRows] = useState<Record<string, boolean>>({
    'row-root': true,
    'row-1': true,
    'row-2': true,
    'row-3': false
  });

  const [bomData, setBomData] = useState<BOMNode>(MOCK_BOM_TREE);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'dirty'>('saved');
  const [selectedRowId, setSelectedRowId] = useState<string>('row-1-1');

  // Concurrency conflict simulator state (Document Page 7 Requirement!)
  const [showConflictModal, setShowConflictModal] = useState<boolean>(false);
  const [conflictResolved, setConflictResolved] = useState<string | null>(null);

  // Where-used drawer
  const [showWhereUsedDrawer, setShowWhereUsedDrawer] = useState<boolean>(false);
  const [whereUsedTarget, setWhereUsedTarget] = useState<string>('PART-001');

  const toggleExpand = (rowId: string) => {
    setExpandedRows(prev => ({ ...prev, [rowId]: !prev[rowId] }));
  };

  const handleQuantityChange = (targetRowId: string, delta: number) => {
    setSaveStatus('dirty');
    const updateNode = (node: BOMNode): BOMNode => {
      if (node.rowId === targetRowId) {
        return { ...node, quantity: Math.max(1, node.quantity + delta), isModified: true };
      }
      if (node.children) {
        return { ...node, children: node.children.map(updateNode) };
      }
      return node;
    };
    setBomData(updateNode(bomData));
  };

  const handleSaveDraft = () => {
    setSaveStatus('saving');
    setTimeout(() => {
      setSaveStatus('saved');
    }, 800);
  };

  // Flattened tree renderer
  const renderBOMRows = (node: BOMNode): React.ReactNode => {
    const isExpanded = !!expandedRows[node.rowId];
    const hasChildren = node.children && node.children.length > 0;
    const isSelected = selectedRowId === node.rowId;

    const rowContent = (
      <tr
        key={node.rowId}
        onClick={() => setSelectedRowId(node.rowId)}
        className={`group border-b border-[var(--plm-border)] transition-colors cursor-pointer ${
          isSelected ? 'bg-[var(--plm-selected-bg)]/40 font-medium' : 'hover:bg-slate-50 dark:hover:bg-slate-900/40'
        } ${node.isModified ? 'bg-amber-50/30 dark:bg-amber-950/20' : ''}`}
        style={{ height: `${config.globals.minRowHeight}px` }}
      >
        {/* Hierarchy Tree column */}
        <td className="py-1 px-4 text-xs font-mono">
          <div className="flex items-center gap-1.5" style={{ paddingLeft: `${node.level * 20}px` }}>
            {hasChildren ? (
              <button
                onClick={e => {
                  e.stopPropagation();
                  toggleExpand(node.rowId);
                }}
                className="w-4 h-4 flex items-center justify-center text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]"
              >
                {isExpanded ? <ChevronDown className="w-3.5 h-3.5" /> : <ChevronRight className="w-3.5 h-3.5" />}
              </button>
            ) : (
              <span className="w-4 h-4 flex items-center justify-center text-slate-300">·</span>
            )}
            <span
              className={`font-semibold tracking-tight ${
                node.level === 0
                  ? 'text-[var(--plm-primary)] font-bold'
                  : node.level === 1
                  ? 'text-[var(--plm-bom-accent)] font-semibold'
                  : 'text-[var(--plm-text)]'
              }`}
            >
              {node.code}
            </span>
            {node.isModified && (
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="已修改未保存" />
            )}
          </div>
        </td>

        {/* Name */}
        <td className="py-1 px-4 text-xs text-[var(--plm-text)]">
          <span className="truncate max-w-[220px] block">{node.name}</span>
        </td>

        {/* Revision */}
        <td className="py-1 px-4 text-xs font-mono text-[var(--plm-text)]">
          <span className="px-1.5 py-0.5 bg-slate-100 dark:bg-slate-800 rounded-xs border border-slate-200 dark:border-slate-700">
            Rev {node.revision}
          </span>
        </td>

        {/* Quantity (Inline Editable stepper) */}
        <td className="py-1 px-4 text-xs font-mono">
          <div className="flex items-center gap-1.5">
            <button
              onClick={e => {
                e.stopPropagation();
                handleQuantityChange(node.rowId, -1);
              }}
              disabled={node.level === 0}
              className="w-5 h-5 rounded-xs border border-[var(--plm-border)] flex items-center justify-center text-[var(--plm-text-secondary)] hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
            >
              -
            </button>
            <span className="w-8 text-center font-bold text-[var(--plm-text)] tabular-nums">
              {node.quantity}
            </span>
            <button
              onClick={e => {
                e.stopPropagation();
                handleQuantityChange(node.rowId, 1);
              }}
              disabled={node.level === 0}
              className="w-5 h-5 rounded-xs border border-[var(--plm-border)] flex items-center justify-center text-[var(--plm-text-secondary)] hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30"
            >
              +
            </button>
            <span className="text-[11px] text-[var(--plm-text-secondary)] ml-1">{node.unit}</span>
          </div>
        </td>

        {/* Position / Designators */}
        <td className="py-1 px-4 text-xs font-mono text-[var(--plm-text-secondary)]">
          <span className="truncate max-w-[150px] block">{node.designators || '-'}</span>
        </td>

        {/* Make or Buy */}
        <td className="py-1 px-4 text-xs text-[var(--plm-text-secondary)]">{node.makeOrBuy}</td>

        {/* Status */}
        <td className="py-1 px-4 text-xs">
          <Badge status={node.status} size="xs" />
        </td>

        {/* Actions */}
        <td className="py-1 px-4 text-xs text-right">
          <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={e => {
                e.stopPropagation();
                setWhereUsedTarget(node.code);
                setShowWhereUsedDrawer(true);
              }}
              className="text-[var(--plm-primary)] hover:underline text-[11px] font-medium"
            >
              使用位置
            </button>
          </div>
        </td>
      </tr>
    );

    return (
      <React.Fragment key={node.rowId}>
        {rowContent}
        {hasChildren && isExpanded && node.children!.map(child => renderBOMRows(child))}
      </React.Fragment>
    );
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Workspace Header Toolbar */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-[var(--plm-bom-accent)]" />
            <h1 className="text-lg font-bold text-[var(--plm-text)] tracking-tight">
              工程 BOM 工作区 (EBOM Multi-Level Workspace)
            </h1>
            <span className="px-2 py-0.5 bg-teal-50 dark:bg-teal-950/50 text-teal-700 dark:text-teal-300 border border-teal-200 dark:border-teal-800 rounded-xs text-xs font-mono font-medium">
              ASM-GMB-001 · Rev B
            </span>
          </div>
          <p className="text-xs text-[var(--plm-text-secondary)] mt-1">
            支持子件就地增减编辑、多层级折叠、同一零件跨总成复用，实时响应行高密度设置（当前：{config.globals.minRowHeight}px）。
          </p>
        </div>

        {/* Actions Toolbar */}
        <div className="flex items-center gap-2 flex-wrap">
          {/* Status Badge */}
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-xs border border-[var(--plm-border)] bg-[var(--plm-bg)] text-xs font-mono">
            {saveStatus === 'saved' && (
              <>
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700 dark:text-emerald-400 font-medium">草稿已保存</span>
              </>
            )}
            {saveStatus === 'saving' && (
              <>
                <RefreshCw className="w-3.5 h-3.5 text-blue-600 animate-spin" />
                <span className="text-blue-600">正在同步...</span>
              </>
            )}
            {saveStatus === 'dirty' && (
              <>
                <span className="w-2 h-2 rounded-full bg-amber-500" />
                <span className="text-amber-700 dark:text-amber-400">存在未保存修改</span>
              </>
            )}
          </div>

          <Button
            size="sm"
            variant="secondary"
            leftIcon={<Save className="w-3.5 h-3.5" />}
            onClick={handleSaveDraft}
          >
            保存工作草稿 (A.2)
          </Button>

          {/* Trigger Concurrency Conflict simulation (Page 7 requirement) */}
          <Button
            size="sm"
            variant="ghost"
            leftIcon={<ShieldAlert className="w-3.5 h-3.5 text-red-500" />}
            onClick={() => setShowConflictModal(true)}
            className="text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20"
          >
            模拟并发冲突
          </Button>

          <Button
            size="sm"
            variant="primary"
            leftIcon={<FileCheck className="w-3.5 h-3.5" />}
            onClick={() => alert('已启动发布前差异复核校验：校验循环引用通过，无负数用量，准备提交ECO流程。')}
          >
            发布前复核
          </Button>
        </div>
      </div>

      {/* Main BOM Tree Table */}
      <div className="bg-[var(--plm-surface)] border border-[var(--plm-border)] rounded-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-[var(--plm-bg)] border-b border-[var(--plm-border)] text-[var(--plm-text-secondary)] select-none">
                <th className="py-2.5 px-4 font-semibold w-[260px]">BOM 层级结构 / 编码</th>
                <th className="py-2.5 px-4 font-semibold">零部件名称</th>
                <th className="py-2.5 px-4 font-semibold w-24">修订版本</th>
                <th className="py-2.5 px-4 font-semibold w-32">装配用量 (QTY)</th>
                <th className="py-2.5 px-4 font-semibold">安装位号 (Designators)</th>
                <th className="py-2.5 px-4 font-semibold w-20">制程</th>
                <th className="py-2.5 px-4 font-semibold w-24">受控状态</th>
                <th className="py-2.5 px-4 font-semibold text-right w-24">操作</th>
              </tr>
            </thead>
            <tbody>{renderBOMRows(bomData)}</tbody>
          </table>
        </div>

        {/* Footer Info Strip */}
        <div className="px-4 py-2.5 bg-[var(--plm-bg)] border-t border-[var(--plm-border)] flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-[var(--plm-text-secondary)] gap-2">
          <div className="flex items-center gap-4">
            <span>总节点数: <strong className="text-[var(--plm-text)] font-mono">11</strong> 项</span>
            <span>·</span>
            <span>复用零部件: <strong className="text-[var(--plm-bom-accent)] font-mono">PART-001 (x2处引用)</strong></span>
            <span>·</span>
            <span>循环依赖检查: <strong className="text-emerald-600 font-medium">无环路异常</strong></span>
          </div>
          <div className="font-mono">
            最后同步: 2026-10-08 22:45:10
          </div>
        </div>
      </div>

      {/* Concurrency Conflict Resolution Modal (Page 7: 并发冲突显示原值、我的修改和服务器最新值，显式选择合并) */}
      <Modal
        isOpen={showConflictModal}
        onClose={() => setShowConflictModal(false)}
        title="BOM 并发保存冲突解决 (Concurrency Conflict Detected)"
        description="检测到其他工程师 (李工) 在您编辑期间提交了新版本，请核对各版本差异并选择保留策略"
        maxWidth="lg"
        footer={
          <>
            <Button variant="ghost" onClick={() => setShowConflictModal(false)}>
              暂缓处理
            </Button>
            <Button
              variant="primary"
              onClick={() => {
                setShowConflictModal(false);
                setConflictResolved('已按合并策略同步至服务器');
                setTimeout(() => setConflictResolved(null), 3000);
              }}
            >
              确认合并并写入
            </Button>
          </>
        }
      >
        <div className="space-y-4 text-xs">
          <div className="p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40 rounded-xs flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-red-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold text-red-800 dark:text-red-300">
                冲突字段: PART-004 钛合金紧固螺栓装配用量与位号
              </span>
              <p className="text-[11px] text-red-700 dark:text-red-400 mt-0.5">
                原基础版本为 Rev A.1，您与李工同时检出并执行了数量变更。
              </p>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {/* Version 1: Original */}
            <div className="border border-[var(--plm-border)] p-3 rounded-xs bg-[var(--plm-bg)] space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase block">1. 检出时基线原值</span>
              <div className="space-y-1 font-mono text-xs">
                <div>用量: <strong>4 PCS</strong></div>
                <div>位号: SCR-1~SCR-4</div>
                <div className="text-[10px] text-slate-400">2026-10-08 10:00</div>
              </div>
            </div>

            {/* Version 2: My Edit */}
            <div className="border-2 border-[var(--plm-primary)] p-3 rounded-xs bg-blue-50/20 dark:bg-blue-950/30 space-y-2">
              <span className="text-[11px] font-bold text-[var(--plm-primary)] uppercase block">2. 我的修改 (当前客户端)</span>
              <div className="space-y-1 font-mono text-xs">
                <div>用量: <strong className="text-blue-600">6 PCS</strong></div>
                <div>位号: SCR-1~SCR-6</div>
                <div className="text-[10px] text-blue-500 font-semibold">建议采纳 (增补横滚轴螺栓)</div>
              </div>
            </div>

            {/* Version 3: Server Latest */}
            <div className="border border-amber-300 dark:border-amber-700 p-3 rounded-xs bg-amber-50/20 dark:bg-amber-950/30 space-y-2">
              <span className="text-[11px] font-bold text-amber-700 dark:text-amber-400 uppercase block">3. 服务器最新值 (李工提交)</span>
              <div className="space-y-1 font-mono text-xs">
                <div>用量: <strong className="text-amber-600">5 PCS</strong></div>
                <div>位号: SCR-1~SCR-5</div>
                <div className="text-[10px] text-amber-600">2026-10-08 14:22 提交</div>
              </div>
            </div>
          </div>

          <div className="border-t border-[var(--plm-border)] pt-3">
            <span className="text-xs font-semibold text-[var(--plm-text)] block mb-1.5">显式选择解决方案：</span>
            <div className="space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="merge_choice" defaultChecked />
                <span className="text-slate-800 dark:text-slate-200">保留我的修改 (覆盖为 6 PCS)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="merge_choice" />
                <span className="text-slate-800 dark:text-slate-200">接受李工最新提交 (更新为 5 PCS)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="merge_choice" />
                <span className="text-slate-800 dark:text-slate-200">拆分另存为新分支版本 A.3</span>
              </label>
            </div>
          </div>
        </div>
      </Modal>

      {/* Where-Used Drawer */}
      <Drawer
        isOpen={showWhereUsedDrawer}
        onClose={() => setShowWhereUsedDrawer(false)}
        title={`使用位置反查 (Where-Used Matrix)`}
        subtitle={`检索物料：${whereUsedTarget}`}
        footer={
          <Button size="sm" variant="secondary" onClick={() => setShowWhereUsedDrawer(false)}>
            关闭
          </Button>
        }
      >
        <div className="space-y-3 text-xs">
          <p className="text-[var(--plm-text-secondary)] leading-relaxed">
            查询当前物料在哪些上层装配体、工程产品族与派生变型中被引用：
          </p>

          <div className="space-y-2">
            <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)] space-y-1">
              <div className="flex justify-between font-mono font-bold text-[var(--plm-text)]">
                <span>ASM-PCH-100 俯仰轴直驱总成</span>
                <span className="text-blue-600">用量: 1</span>
              </div>
              <div className="text-[11px] text-[var(--plm-text-secondary)]">父级装配 · Rev B · 位号: M1</div>
            </div>

            <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)] space-y-1">
              <div className="flex justify-between font-mono font-bold text-[var(--plm-text)]">
                <span>ASM-ROL-200 横滚轴悬臂总成</span>
                <span className="text-blue-600">用量: 1</span>
              </div>
              <div className="text-[11px] text-[var(--plm-text-secondary)]">父级装配 · Rev B · 位号: M2 (复用)</div>
            </div>

            <div className="p-3 border border-[var(--plm-border)] rounded-xs bg-[var(--plm-bg)] space-y-1 opacity-70">
              <div className="flex justify-between font-mono font-bold text-[var(--plm-text)]">
                <span>ASM-UAV-900 巡检四轴飞行器总成</span>
                <span className="text-slate-500">顶层整机</span>
              </div>
              <div className="text-[11px] text-[var(--plm-text-secondary)]">整机产品族 · Rev C · 间接引用</div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
