import React, { useState } from 'react';
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Code,
  Highlighter,
  Link2,
  FileCheck2,
  AlertCircle
} from 'lucide-react';

export interface RichTextEditorProps {
  label?: string;
  initialValue?: string;
  onChange?: (val: string) => void;
  placeholder?: string;
  readOnly?: boolean;
}

export const RichTextEditor: React.FC<RichTextEditorProps> = ({
  label = '工程变更技术要求说明 (Engineering Change Specification)',
  initialValue = '1. 驱动电机定子绕组必须采用三层绝缘耐高温漆包铜线；\n2. 经振动疲劳试验验证，抗拉强度需达到 950MPa 以上；\n3. 表面实施微弧氧化涂层，满足 96h 盐雾测试标准。',
  onChange,
  placeholder = '在此输入格式化工程技术说明、变更原因或公差要求...',
  readOnly = false
}) => {
  const [content, setContent] = useState(initialValue);
  const [activeFormats, setActiveFormats] = useState<Record<string, boolean>>({
    bold: false,
    highlight: false
  });

  const handleFormat = (type: string) => {
    setActiveFormats(prev => ({ ...prev, [type]: !prev[type] }));
  };

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      {label && (
        <span className="text-xs font-medium text-[var(--plm-text-secondary)] flex items-center justify-between">
          <span>{label}</span>
          <span className="text-[10px] font-mono text-emerald-600">富文本受控模式</span>
        </span>
      )}

      <div
        style={{ borderRadius: 'var(--plm-radius, 6px)' }}
        className="border border-[var(--plm-input-border)] bg-[var(--plm-surface)] overflow-hidden transition-all focus-within:border-[var(--plm-primary)] focus-within:ring-1 focus-within:ring-[var(--plm-primary)]"
      >
        {/* Formatting Toolbar */}
        {!readOnly && (
          <div className="px-3 py-1.5 border-b border-[var(--plm-border)] bg-[var(--plm-bg)] flex items-center gap-1 flex-wrap text-xs text-[var(--plm-text-secondary)]">
            <button
              type="button"
              onClick={() => handleFormat('bold')}
              className={`p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                activeFormats.bold ? 'bg-slate-300 dark:bg-slate-700 text-[var(--plm-text)] font-bold' : ''
              }`}
              title="加粗 (Ctrl+B)"
            >
              <Bold className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleFormat('italic')}
              className="p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="斜体 (Ctrl+I)"
            >
              <Italic className="w-3.5 h-3.5" />
            </button>
            <div className="w-px h-3.5 bg-[var(--plm-border)] mx-1" />
            <button
              type="button"
              className="p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="无序列表"
            >
              <List className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="编号列表"
            >
              <ListOrdered className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={() => handleFormat('highlight')}
              className={`p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${
                activeFormats.highlight ? 'bg-amber-200 text-amber-900' : ''
              }`}
              title="高亮工程重要条款"
            >
              <Highlighter className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              className="p-1.5 rounded-xs hover:text-[var(--plm-text)] hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
              title="插入零件代码"
            >
              <Code className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Text Body */}
        <textarea
          rows={4}
          value={content}
          onChange={e => {
            setContent(e.target.value);
            onChange?.(e.target.value);
          }}
          placeholder={placeholder}
          disabled={readOnly}
          className={`w-full p-3 text-xs leading-relaxed bg-transparent text-[var(--plm-text)] outline-none resize-y ${
            activeFormats.bold ? 'font-semibold' : ''
          }`}
        />

        {/* Status bar */}
        <div className="px-3 py-1.5 border-t border-[var(--plm-border)] bg-[var(--plm-bg)]/50 flex items-center justify-between text-[11px] text-[var(--plm-text-secondary)]">
          <div className="flex items-center gap-1.5">
            <FileCheck2 className="w-3.5 h-3.5 text-emerald-600" />
            <span>符合离散制造工程说明格式规范 (GB/T 4863)</span>
          </div>
          <span className="font-mono">已输入 {content.length} 字符</span>
        </div>
      </div>
    </div>
  );
};
