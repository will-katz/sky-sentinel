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
    <div className={`flex flex-wrap justify-center gap-2 sm:gap-3 ${className}`}>
      {badges.map((badge) => (
        <div
          key={badge.label}
          className={`inline-flex items-center gap-2 rounded-full border px-3 py-2 sm:px-4 text-xs sm:text-sm font-medium max-w-full ${
            isDark
              ? 'border-primary-foreground/25 bg-primary-foreground/10 text-primary-foreground'
              : 'border-primary/15 bg-primary text-primary-foreground shadow-sm'
          }`}
        >
          <badge.icon className="h-4 w-4 shrink-0" />
          <span className="text-pretty">{badge.label}</span>
        </div>
      ))}
    </div>
  );
}
