import React from 'react';
import {
  Boxes,
  Layers,
  FileCode,
  FileText,
  Cog,
  Settings,
  Cpu,
  GitBranch,
  GitCompare,
  GitMerge,
  Shield,
  ShieldAlert,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  AlertTriangle,
  AlertCircle,
  Database,
  Search,
  Filter,
  Eye,
  Edit3,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  Maximize2
} from 'lucide-react';

export const IconGallery: React.FC = () => {
  const iconGroups = [
    {
      category: '制造与物料拓扑',
      icons: [
        { name: 'Boxes', label: '物料库 / 零件族', icon: <Boxes className="w-4 h-4" /> },
        { name: 'Layers', label: 'BOM 装配层级', icon: <Layers className="w-4 h-4" /> },
        { name: 'Cog', label: '自制加工件', icon: <Cog className="w-4 h-4" /> },
        { name: 'Settings', label: '标准紧固件', icon: <Settings className="w-4 h-4" /> },
        { name: 'Cpu', label: '电气与传感器', icon: <Cpu className="w-4 h-4" /> },
        { name: 'FileCode', label: 'CAD 2D/3D 图纸', icon: <FileCode className="w-4 h-4" /> }
      ]
    },
    {
      category: '版本与工程变更',
      icons: [
        { name: 'GitBranch', label: '工作记录分支', icon: <GitBranch className="w-4 h-4" /> },
        { name: 'GitCompare', label: 'BOM 版本差异对比', icon: <GitCompare className="w-4 h-4" /> },
        { name: 'GitMerge', label: '变更合并确认', icon: <GitMerge className="w-4 h-4" /> },
        { name: 'FileText', label: 'ECO/ECR 单据', icon: <FileText className="w-4 h-4" /> },
        { name: 'Lock', label: '检出锁定保护', icon: <Lock className="w-4 h-4 text-amber-500" /> },
        { name: 'Unlock', label: '未锁定公共态', icon: <Unlock className="w-4 h-4 text-emerald-600" /> }
      ]
    },
    {
      category: '语义状态与操作',
      icons: [
        { name: 'CheckCircle2', label: '已发布通过', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600" /> },
        { name: 'Clock', label: '待审批流程', icon: <Clock className="w-4 h-4 text-amber-500" /> },
        { name: 'AlertCircle', label: '驳回 / 错误', icon: <AlertCircle className="w-4 h-4 text-red-600" /> },
        { name: 'ShieldAlert', label: '并发冲突预警', icon: <ShieldAlert className="w-4 h-4 text-red-500" /> },
        { name: 'Search', label: '全文穿透检索', icon: <Search className="w-4 h-4" /> },
        { name: 'Filter', label: '分类视图筛选', icon: <Filter className="w-4 h-4" /> }
      ]
    }
  ];

  return (
    <div className="space-y-4">
      {iconGroups.map(group => (
        <div key={group.category} className="space-y-2">
          <span className="text-xs font-semibold text-[var(--plm-text-secondary)] block">
            {group.category}
          </span>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2.5">
            {group.icons.map(ic => (
              <div
                key={ic.name}
                className="p-2.5 border border-[var(--plm-border)] bg-[var(--plm-bg)] rounded-sm flex flex-col items-center justify-center text-center gap-1.5 hover:border-[var(--plm-primary)] transition-colors select-none"
              >
                <div className="w-7 h-7 rounded-xs bg-[var(--plm-surface)] border border-[var(--plm-border)] flex items-center justify-center text-[var(--plm-text)] shadow-2xs">
                  {ic.icon}
                </div>
                <span className="text-xs font-mono font-medium text-[var(--plm-text)]">
                  {ic.name}
                </span>
                <span className="text-[10px] text-[var(--plm-text-secondary)] truncate max-w-full">
                  {ic.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
