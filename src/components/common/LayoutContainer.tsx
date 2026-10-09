import React from 'react';

export interface SplitPaneProps {
  left: React.ReactNode;
  right: React.ReactNode;
  leftWidth?: string; // e.g. '30%', '280px'
  className?: string;
}

export const SplitPane: React.FC<SplitPaneProps> = ({
  left,
  right,
  leftWidth = '320px',
  className = ''
}) => {
  return (
    <div
      style={{ borderRadius: 'var(--plm-radius, 6px)' }}
      className={`border border-[var(--plm-border)] bg-[var(--plm-surface)] overflow-hidden flex flex-col md:flex-row divide-y md:divide-y-0 md:divide-x divide-[var(--plm-border)] ${className}`}
    >
      <div style={{ width: leftWidth }} className="shrink-0 p-4 bg-[var(--plm-bg)]/40 overflow-y-auto">
        {left}
      </div>
      <div className="flex-1 p-4 bg-[var(--plm-surface)] overflow-y-auto">
        {right}
      </div>
    </div>
  );
};

export interface GridContainerProps {
  cols?: 1 | 2 | 3 | 4 | 6 | 12;
  gap?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

export const GridContainer: React.FC<GridContainerProps> = ({
  cols = 3,
  gap = 'md',
  children,
  className = ''
}) => {
  const colClasses = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 sm:grid-cols-2',
    3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
    6: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-6',
    12: 'grid-cols-12'
  }[cols];

  const gapClasses = {
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6'
  }[gap];

  return <div className={`grid ${colClasses} ${gapClasses} ${className}`}>{children}</div>;
};
