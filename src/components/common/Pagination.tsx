import React from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

export interface PaginationProps {
  current: number;
  total: number;
  pageSize?: number;
  onChange: (page: number) => void;
  onPageSizeChange?: (size: number) => void;
  pageSizeOptions?: number[];
  showTotal?: boolean;
}

export const Pagination: React.FC<PaginationProps> = ({
  current = 1,
  total = 0,
  pageSize = 10,
  onChange,
  onPageSizeChange,
  pageSizeOptions = [10, 20, 50, 100],
  showTotal = true
}) => {
  const totalPages = Math.max(1, Math.ceil(total / pageSize));

  const handlePrev = () => {
    if (current > 1) onChange(current - 1);
  };

  const handleNext = () => {
    if (current < totalPages) onChange(current + 1);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (current > 3) pages.push('...');
      const start = Math.max(2, current - 1);
      const end = Math.min(totalPages - 1, current + 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (current < totalPages - 2) pages.push('...');
      pages.push(totalPages);
    }
    return pages;
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[var(--plm-text-secondary)] select-none">
      {showTotal && (
        <div className="font-mono">
          共 <strong className="text-[var(--plm-text)]">{total}</strong> 条记录 · 第{' '}
          <strong className="text-[var(--plm-text)]">{current}</strong> / {totalPages} 页
        </div>
      )}

      <div className="flex items-center gap-1.5 flex-wrap">
        {onPageSizeChange && (
          <select
            value={pageSize}
            onChange={e => onPageSizeChange(Number(e.target.value))}
            style={{ borderRadius: 'var(--plm-radius, 4px)' }}
            className="px-2 py-1 bg-[var(--plm-surface)] border border-[var(--plm-border)] text-xs text-[var(--plm-text)] mr-2 cursor-pointer outline-none"
          >
            {pageSizeOptions.map(opt => (
              <option key={opt} value={opt}>
                {opt} 条/页
              </option>
            ))}
          </select>
        )}

        {/* Prev Button */}
        <button
          onClick={handlePrev}
          disabled={current <= 1}
          style={{ borderRadius: 'var(--plm-radius, 4px)' }}
          className="w-7 h-7 flex items-center justify-center border border-[var(--plm-border)] bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-[var(--plm-bg)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="上一页"
        >
          <ChevronLeft className="w-3.5 h-3.5" />
        </button>

        {/* Page Numbers */}
        {getPageNumbers().map((p, idx) => {
          if (p === '...') {
            return (
              <span key={idx} className="w-7 text-center font-mono text-slate-400">
                ...
              </span>
            );
          }
          const isCurrent = p === current;
          return (
            <button
              key={idx}
              onClick={() => onChange(Number(p))}
              style={{ borderRadius: 'var(--plm-radius, 4px)' }}
              className={`w-7 h-7 font-mono text-xs font-medium cursor-pointer transition-colors ${
                isCurrent
                  ? 'bg-[var(--plm-primary)] text-white shadow-xs'
                  : 'border border-[var(--plm-border)] bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-[var(--plm-bg)]'
              }`}
            >
              {p}
            </button>
          );
        })}

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={current >= totalPages}
          style={{ borderRadius: 'var(--plm-radius, 4px)' }}
          className="w-7 h-7 flex items-center justify-center border border-[var(--plm-border)] bg-[var(--plm-surface)] text-[var(--plm-text)] hover:bg-[var(--plm-bg)] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          title="下一页"
        >
          <ChevronRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
