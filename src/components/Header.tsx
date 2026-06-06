import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { Logo } from './Logo';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-3 min-h-20">
          <div className="flex flex-col gap-1">
            <Logo className="h-10 w-auto" />
            <p className="text-sm text-muted-foreground">Professional Drone Inspection</p>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground hover:text-primary transition-colors">Services</a>
            <a href="#schedule" className="text-foreground hover:text-primary transition-colors">Schedule</a>
            <a href="#contact" className="text-foreground hover:text-primary transition-colors">Contact</a>
            <a href="#contact" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg hover:opacity-90 transition-opacity">
              Get Quote
            </a>
          </nav>

          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <nav className="md:hidden py-4 space-y-4">
            <a href="#services" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Services</a>
            <a href="#schedule" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Schedule</a>
            <a href="#contact" className="block text-foreground hover:text-primary transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</a>
          </nav>
        )}
      </div>
    </header>
  );
}
