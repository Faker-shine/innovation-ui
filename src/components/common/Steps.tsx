import React from 'react';
import { Check, AlertCircle } from 'lucide-react';

export interface StepItem {
  title: string;
  description?: string;
  status?: 'wait' | 'process' | 'finish' | 'error';
}

export interface StepsProps {
  current: number; // 0-indexed
  items: StepItem[];
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export const Steps: React.FC<StepsProps> = ({
  current = 0,
  items,
  direction = 'horizontal',
  className = ''
}) => {
  return (
    <div
      className={`w-full select-none ${
        direction === 'vertical' ? 'flex flex-col space-y-4' : 'flex items-start'
      } ${className}`}
    >
      {items.map((item, idx) => {
        const stepStatus =
          item.status || (idx < current ? 'finish' : idx === current ? 'process' : 'wait');
        const isLast = idx === items.length - 1;

        return (
          <div
            key={idx}
            className={`flex ${
              direction === 'vertical' ? 'items-start' : 'flex-1 items-start'
            } relative group`}
          >
            {/* Step icon / number */}
            <div className="flex flex-col items-center shrink-0 mr-3">
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center font-mono text-xs font-bold transition-all ${
                  stepStatus === 'finish'
                    ? 'bg-emerald-600 text-white shadow-2xs'
                    : stepStatus === 'process'
                    ? 'bg-[var(--plm-primary)] text-white ring-4 ring-[var(--plm-primary)]/20 shadow-xs'
                    : stepStatus === 'error'
                    ? 'bg-red-600 text-white'
                    : 'bg-[var(--plm-surface)] text-[var(--plm-text-secondary)] border border-[var(--plm-border)]'
                }`}
              >
                {stepStatus === 'finish' ? (
                  <Check className="w-4 h-4 stroke-[3]" />
                ) : stepStatus === 'error' ? (
                  <AlertCircle className="w-4 h-4" />
                ) : (
                  <span>{idx + 1}</span>
                )}
              </div>

              {/* Vertical connector line */}
              {direction === 'vertical' && !isLast && (
                <div
                  className={`w-0.5 h-10 mt-1 ${
                    idx < current ? 'bg-emerald-600' : 'bg-[var(--plm-border)]'
                  }`}
                />
              )}
            </div>

            {/* Step Info */}
            <div className="min-w-0 pr-4">
              <div
                className={`text-xs font-semibold ${
                  stepStatus === 'process'
                    ? 'text-[var(--plm-primary)] font-bold'
                    : stepStatus === 'finish'
                    ? 'text-[var(--plm-text)]'
                    : stepStatus === 'error'
                    ? 'text-red-600'
                    : 'text-[var(--plm-text-secondary)]'
                }`}
              >
                {item.title}
              </div>
              {item.description && (
                <p className="text-[11px] text-[var(--plm-text-secondary)] mt-0.5 leading-snug">
                  {item.description}
                </p>
              )}
            </div>

            {/* Horizontal connector line */}
            {direction === 'horizontal' && !isLast && (
              <div
                className={`flex-1 h-0.5 self-center mx-3 ${
                  idx < current ? 'bg-emerald-600' : 'bg-[var(--plm-border)]'
                }`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
