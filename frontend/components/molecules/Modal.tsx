import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg';
}

export function Modal({ isOpen, onClose, title, children, size = 'md' }: ModalProps) {
  if (!isOpen) return null;

  const sizes = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
        role="presentation"
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className={`${sizes[size]} w-full glass-card border border-primary/20 rounded-xl`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <h2 className="text-xl font-bold">{title}</h2>
            <button
              onClick={onClose}
              className="text-text-secondary hover:text-text transition"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>

          {/* Content */}
          <div>{children}</div>
        </div>
      </div>
    </>
  );
}
