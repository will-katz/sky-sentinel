import { Menu, X } from 'lucide-react';
import { useEffect, useState, type MouseEvent } from 'react';
import { Logo } from './Logo';
import { homeSectionHref, navigate, useAppPath, type AppPath } from '../routing';

function navLinksFor(path: AppPath) {
  return [
    { href: homeSectionHref('#about', path), label: 'About' },
    { href: homeSectionHref('#services', path), label: 'Services' },
    { href: '/team', label: 'Team' },
    { href: homeSectionHref('#contact', path), label: 'Contact' },
  ] as const;
}

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const path = useAppPath();
  const navLinks = navLinksFor(path);
  const contactHref = homeSectionHref('#contact', path);

  const goHome = () => {
    navigate('/');
    setIsMenuOpen(false);
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, href: string) => {
    event.preventDefault();
    setIsMenuOpen(false);
    navigate(href);
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
            href="/"
            onClick={(event) => {
              event.preventDefault();
              goHome();
            }}
            className="flex flex-col gap-0.5 sm:gap-1 min-w-0 rounded-lg hover:opacity-80 transition-opacity"
            aria-label="Sky Sentinel home"
          >
            <Logo className="h-8 sm:h-10 w-auto max-w-[min(100%,12rem)]" />
            <p className="hidden sm:block text-xs sm:text-sm text-muted-foreground truncate">
              Professional Drone Services
            </p>
          </a>

          <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.slice(0, 3).map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(event) => handleNavClick(event, link.href)}
                className={`text-sm transition-colors duration-200 ${
                  link.href === '/team' && path === '/team'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={link.href === '/team' && path === '/team' ? 'page' : undefined}
              >
                {link.label}
              </a>
            ))}
            <a
              href={contactHref}
              onClick={(event) => handleNavClick(event, contactHref)}
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
                key={link.label}
                href={link.href}
                className={`block py-3 px-2 transition-colors duration-200 text-base ${
                  link.href === '/team' && path === '/team'
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
                aria-current={link.href === '/team' && path === '/team' ? 'page' : undefined}
                onClick={(event) => handleNavClick(event, link.href)}
              >
                {link.label}
              </a>
            ))}
            <a
              href={contactHref}
              className="block mt-2 py-3.5 px-4 text-center bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity text-base font-medium"
              onClick={(event) => handleNavClick(event, contactHref)}
            >
              Get Quote
            </a>
          </nav>
        )}
      </div>
    </header>
  );
}
