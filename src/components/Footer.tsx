import { Shield } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <Logo variant="dark" className="h-12 w-auto mx-auto" />
        </div>

        <div className="mb-6 text-center">
          <ul className="space-y-1 text-sm opacity-80">
            <li className="flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 shrink-0" />
              <span>U.S. Veteran owned & operated</span>
            </li>
            <li>Current and Retired Law Enforcement</li>
            <li>FAA Part 107 certified</li>
            <li>Fully insured operations</li>
          </ul>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4 text-center text-sm opacity-80">
          <p>
            &copy; 2026{' Sky Sentinel. All rights reserved. Website by '}
            <a href="https://william.katzkatz.com" className="hover:opacity-100 underline transition-opacity">
              William Katz
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
