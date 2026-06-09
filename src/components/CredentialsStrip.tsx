import { BadgeCheck, Medal } from 'lucide-react';

interface CredentialsStripProps {
  variant?: 'light' | 'dark';
  className?: string;
}

const badges = [
  {
    icon: Medal,
    label: 'U.S. Veteran Owned & Operated',
  },
  {
    icon: BadgeCheck,
    label: 'Current & Retired Law Enforcement',
  },
];

export function CredentialsStrip({ variant = 'light', className = '' }: CredentialsStripProps) {
  const isDark = variant === 'dark';

  return (
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-2.5 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium max-w-full ${
            isDark
              ? 'border-primary-foreground/20 bg-primary-foreground/5 text-primary-foreground'
              : 'border-border bg-background text-foreground'
          }`}
        >
          <badge.icon className="h-3.5 w-3.5 shrink-0 opacity-70" strokeWidth={1.5} />
          <span className="text-pretty">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
