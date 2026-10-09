import React from 'react';

export interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  tip?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({ size = 'md', className = '', tip }) => {
  const sizeClasses = {
    sm: 'w-3.5 h-3.5 border-2',
    md: 'w-5 h-5 border-2',
    lg: 'w-8 h-8 border-3'
  }[size];

  return (
    <div className={`inline-flex flex-col items-center justify-center gap-2 ${className}`}>
      <div
        className={`${sizeClasses} border-[var(--plm-border)] border-t-[var(--plm-primary)] rounded-full animate-spin`}
      />
      {tip && <span className="text-xs text-[var(--plm-text-secondary)]">{tip}</span>}
    </div>
  );
};

export interface SkeletonProps {
  className?: string;
  lines?: number;
  avatar?: boolean;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className = '',
  lines = 3,
  avatar = false
}) => {
  return (
    <div className={`w-full animate-pulse flex gap-3 ${className}`}>
      {avatar && (
        <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-800 shrink-0" />
      )}
      <div className="flex-1 space-y-2">
        <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded-xs w-2/5" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className={`h-3 bg-slate-200 dark:bg-slate-800 rounded-xs ${
              i === lines - 2 ? 'w-4/5' : 'w-full'
            }`}
          />
        ))}
      </div>
    </div>
  );
};
