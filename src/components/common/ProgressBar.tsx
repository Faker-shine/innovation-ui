import React from 'react';

export interface ProgressBarProps {
  percent: number; // 0 to 100
  label?: string;
  showInfo?: boolean;
  size?: 'sm' | 'md' | 'lg';
  status?: 'normal' | 'success' | 'warning' | 'error' | 'accent';
  striped?: boolean;
  segments?: { percent: number; color: string; label: string }[];
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  percent = 0,
  label,
  showInfo = true,
  size = 'md',
  status = 'normal',
  striped = false,
  segments
}) => {
  const clampedPercent = Math.min(100, Math.max(0, percent));

  const heightClasses = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4'
  }[size];

  const statusColors = {
    normal: 'bg-[var(--plm-primary)]',
    success: 'bg-emerald-600',
    warning: 'bg-amber-500',
    error: 'bg-red-600',
    accent: 'bg-[var(--plm-bom-accent)]'
  }[status];

  return (
    <div className="w-full flex flex-col gap-1.5 select-none">
      {(label || showInfo) && (
        <div className="flex items-center justify-between text-xs">
          {label && <span className="font-medium text-[var(--plm-text)]">{label}</span>}
          {showInfo && (
            <span className="font-mono font-bold text-[var(--plm-text)] text-[11px] tabular-nums ml-auto">
              {clampedPercent.toFixed(1)}%
            </span>
          )}
        </div>
      )}

      {/* Progress Track */}
      <div
        className={`w-full bg-slate-200 dark:bg-slate-800 overflow-hidden relative ${heightClasses}`}
        style={{ borderRadius: 'var(--plm-radius, 4px)' }}
      >
        {segments && segments.length > 0 ? (
          <div className="h-full w-full flex">
            {segments.map((seg, idx) => (
              <div
                key={idx}
                style={{ width: `${seg.percent}%`, backgroundColor: seg.color }}
                className="h-full transition-all duration-300 relative group"
                title={`${seg.label}: ${seg.percent}%`}
              />
            ))}
          </div>
        ) : (
          <div
            style={{ width: `${clampedPercent}%` }}
            className={`h-full transition-all duration-300 ${statusColors} ${
              striped
                ? 'bg-[linear-gradient(45deg,rgba(255,255,255,0.15)_25%,transparent_25%,transparent_50%,rgba(255,255,255,0.15)_50%,rgba(255,255,255,0.15)_75%,transparent_75%,transparent)] bg-[length:1rem_1rem]'
                : ''
            }`}
          />
        )}
      </div>
    </div>
  );
};
