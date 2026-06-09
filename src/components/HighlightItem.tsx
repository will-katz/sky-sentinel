import type { LucideIcon } from 'lucide-react';
import type { ReactNode } from 'react';

interface HighlightItemProps {
  icon: LucideIcon;
  title: string;
  description: ReactNode;
}

export function HighlightItem({ icon: Icon, title, description }: HighlightItemProps) {
  return (
    <div className="text-center px-4 sm:px-6 py-6 sm:py-2 h-full flex flex-col items-center">
      <Icon className="w-5 h-5 text-foreground/70 shrink-0 mb-3" aria-hidden="true" strokeWidth={1.5} />
      <p className="text-sm sm:text-base font-medium text-foreground tracking-tight">{title}</p>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed text-pretty max-w-xs mx-auto">
        {description}
      </p>
    </div>
  );
}

interface HighlightListProps {
  children: ReactNode;
  className?: string;
  columns?: 2 | 3;
}

export function HighlightList({ children, className = '', columns = 3 }: HighlightListProps) {
  const columnClass = columns === 2 ? 'sm:grid-cols-2' : 'sm:grid-cols-3';

  return (
    <div className={`border-t border-border pt-8 sm:pt-10 ${className}`}>
      <div
        className={`grid grid-cols-1 ${columnClass} gap-y-8 sm:gap-y-0 divide-y sm:divide-y-0 sm:divide-x divide-border`}
      >
        {children}
      </div>
    </div>
  );
}
