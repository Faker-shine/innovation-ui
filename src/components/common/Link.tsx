import React from 'react';
import { ExternalLink } from 'lucide-react';

export interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'subtle' | 'monospace' | 'danger';
  external?: boolean;
  underline?: boolean;
}

export const Link: React.FC<LinkProps> = ({
  children,
  href = '#',
  variant = 'primary',
  external = false,
  underline = false,
  className = '',
  ...props
}) => {
  const variantClasses = {
    primary: 'text-[var(--plm-primary)] hover:opacity-85 font-medium',
    subtle: 'text-[var(--plm-text-secondary)] hover:text-[var(--plm-text)]',
    monospace: 'text-[var(--plm-bom-accent)] font-mono hover:underline font-semibold',
    danger: 'text-red-600 hover:text-red-700 font-medium'
  }[variant];

  return (
    <a
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1 transition-colors cursor-pointer text-xs ${
        underline ? 'underline underline-offset-2' : ''
      } ${variantClasses} ${className}`}
      {...props}
    >
      <span>{children}</span>
      {external && <ExternalLink className="w-3 h-3 opacity-70 shrink-0" />}
    </a>
  );
};
