interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
}

const logoSrc = {
  light: '/logo.png',
  dark: '/logo-white.png',
} as const;

export function Logo({ className = 'h-12 w-auto', variant = 'light' }: LogoProps) {
  return (
    <img
      src={logoSrc[variant]}
      alt="Sky Sentinel"
      className={className}
    />
  );
}
