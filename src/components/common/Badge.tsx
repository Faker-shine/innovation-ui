import React from 'react';
import { PartLifecycleStatus } from '../../types/plm';
import { CheckCircle2, Clock, FileEdit, AlertCircle, Plus, Minus, RefreshCw } from 'lucide-react';

export interface BadgeProps {
  status?: PartLifecycleStatus | 'Approved' | 'Implemented' | 'added' | 'removed' | 'modified' | 'unchanged' | string;
  label?: string;
  size?: 'xs' | 'sm' | 'md';
  showIcon?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  status = 'Draft',
  label,
  size = 'sm',
  showIcon = true
}) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'Released':
      case 'Approved':
      case 'Implemented':
        return {
          text: 'text-[#166534] dark:text-[#4ADE80]',
          bg: 'bg-[#DCFCE7] dark:bg-[#064E3B]/40',
          border: 'border-[#BBF7D0] dark:border-[#064E3B]',
          icon: <CheckCircle2 className="w-3 h-3 text-[#166534] dark:text-[#4ADE80]" />,
          defaultLabel: status === 'Released' ? '已发布' : status === 'Approved' ? '已批准' : '已实施'
        };
      case 'InReview':
        return {
          text: 'text-[#92400E] dark:text-[#FBBF24]',
          bg: 'bg-[#FEF3C7] dark:bg-[#78350F]/40',
          border: 'border-[#FDE68A] dark:border-[#78350F]',
          icon: <Clock className="w-3 h-3 text-[#92400E] dark:text-[#FBBF24]" />,
          defaultLabel: '审批中'
        };
      case 'Draft':
        return {
          text: 'text-[#1D4ED8] dark:text-[#93B4FF]',
          bg: 'bg-[#DBEAFE] dark:bg-[#1E3A8A]/40',
          border: 'border-[#BFDBFE] dark:border-[#1E3A8A]',
          icon: <FileEdit className="w-3 h-3 text-[#1D4ED8] dark:text-[#93B4FF]" />,
          defaultLabel: '工作草稿'
        };
      case 'Obsolete':
      case 'Danger':
        return {
          text: 'text-[#B91C1C] dark:text-[#F87171]',
          bg: 'bg-[#FEE2E2] dark:bg-[#7F1D1D]/40',
          border: 'border-[#FECACA] dark:border-[#7F1D1D]',
          icon: <AlertCircle className="w-3 h-3 text-[#B91C1C] dark:text-[#F87171]" />,
          defaultLabel: '已废弃'
        };
      case 'added':
        return {
          text: 'text-[#166534] dark:text-[#4ADE80]',
          bg: 'bg-[#DCFCE7] dark:bg-[#064E3B]/40',
          border: 'border-[#BBF7D0] dark:border-[#064E3B]',
          icon: <Plus className="w-3 h-3" />,
          defaultLabel: '新增'
        };
      case 'removed':
        return {
          text: 'text-[#B91C1C] dark:text-[#F87171]',
          bg: 'bg-[#FEE2E2] dark:bg-[#7F1D1D]/40',
          border: 'border-[#FECACA] dark:border-[#7F1D1D]',
          icon: <Minus className="w-3 h-3" />,
          defaultLabel: '移除'
        };
      case 'modified':
        return {
          text: 'text-[#1D4ED8] dark:text-[#93B4FF]',
          bg: 'bg-[#DBEAFE] dark:bg-[#1E3A8A]/40',
          border: 'border-[#BFDBFE] dark:border-[#1E3A8A]',
          icon: <RefreshCw className="w-3 h-3" />,
          defaultLabel: '变更'
        };
      default:
        return {
          text: 'text-[var(--plm-text-secondary)]',
          bg: 'bg-slate-100 dark:bg-slate-800',
          border: 'border-slate-200 dark:border-slate-700',
          icon: null,
          defaultLabel: label || status
        };
    }
  };

  const config = getStatusConfig();
  const displayLabel = label || config.defaultLabel;

  const sizeClasses = {
    xs: 'text-[11px] px-1.5 py-0.5 gap-1',
    sm: 'text-xs px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2'
  }[size];

  return (
    <span
      style={{ borderRadius: 'var(--plm-radius, 4px)' }}
      className={`inline-flex items-center font-medium border tabular-nums select-none ${sizeClasses} ${config.bg} ${config.text} ${config.border}`}
    >
      {showIcon && config.icon}
      <span>{displayLabel}</span>
    </span>
  );
};
