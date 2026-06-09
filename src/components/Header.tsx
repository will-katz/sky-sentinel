import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Logo } from './Logo';

const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#contact', label: 'Contact' },
] as const;

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setIsMenuOpen(false);
  };

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  return (
    <header className="bg-background/80 backdrop-blur-md border-b border-border sticky top-0 z-50 pt-[env(safe-area-inset-top)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-16 sm:min-h-20">
          <a
            href="#"
            onClick={(event) => {
              event.preventDefault();
              scrollToTop();
            }}
            className="flex flex-col gap-0.5 sm:gap-1 min-w-0 rounded-lg hover:opacity-80 transition-opacity"
            aria-label="Back to top"
          >
            <Logo className="h-8 sm:h-10 w-auto max-w-[min(100%,12rem)]" />
            <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground truncate">
              Professional Drone Services
            </p>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.slice(0, 2).map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="bg-primary text-primary-foreground text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity duration-200"
            >
              Get Quote
            </a>
          </nav>

          <button
            type="button"
            className="md:hidden -mr-2 min-h-11 min-w-11 flex items-center justify-center rounded-lg hover:bg-secondary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <nav
            id="mobile-nav"
            className="md:hidden py-4 pb-[max(1rem,env(safe-area-inset-bottom))] border-t border-border space-y-1"
            aria-label="Mobile navigation"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block py-3 px-2 text-muted-foreground hover:text-foreground transition-colors duration-200 text-base"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <a
              href="#contact"
              className="block mt-2 py-3.5 px-4 text-center bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity text-base font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Get Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
