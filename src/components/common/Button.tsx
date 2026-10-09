import React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger' | 'accent';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const sizeClasses = {
    sm: 'text-xs px-2.5 py-1 min-h-[30px] gap-1.5',
    md: 'text-sm px-3.5 py-1.5 min-h-[36px] gap-2',
    lg: 'text-base px-5 py-2.5 min-h-[44px] gap-2.5'
  }[size];

  const variantClasses = {
    primary:
      'bg-[var(--plm-primary)] hover:opacity-90 active:scale-[0.99] text-white shadow-xs font-medium border border-transparent',
    secondary:
      'bg-[var(--plm-surface)] hover:bg-[var(--plm-bg)] text-[var(--plm-text)] border border-[var(--plm-border)] shadow-2xs font-normal',
    ghost:
      'bg-transparent hover:bg-[var(--plm-bg)] text-[var(--plm-text)] border border-transparent font-normal',
    danger:
      'bg-red-600 hover:bg-red-700 text-white shadow-xs font-medium border border-transparent',
    accent:
      'bg-[var(--plm-bom-accent)] hover:opacity-90 text-white shadow-xs font-medium border border-transparent'
  }[variant];

  return (
    <button
      disabled={disabled || isLoading}
      style={{
        borderRadius: 'var(--plm-radius, 6px)',
        ...style
      }}
      className={`inline-flex items-center justify-center font-medium transition-colors select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap shrink-0 ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin -ml-0.5 h-4 w-4 text-current"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      {!isLoading && leftIcon}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
};
