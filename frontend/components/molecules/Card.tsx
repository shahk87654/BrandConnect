import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'glass' | 'glow';
}

export function Card({ children, className = '', variant = 'default' }: CardProps) {
  const variants = {
    default: 'bg-dark-lighter border border-border',
    glass: 'glass-card border border-primary/20',
    glow: 'glow-panel',
  };

  return (
    <div className={`rounded-xl p-6 transition-all hover:shadow-lg ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
}
