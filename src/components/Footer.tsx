import { ArrowRight, Shield } from 'lucide-react';
import { Logo } from './Logo';
import { navigate, useAppPath } from '../routing';

export function Footer() {
  const path = useAppPath();
  const showTeamCta = path !== '/team';

  return (
    <footer className="bg-primary text-primary-foreground py-10 sm:py-12 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <a
            href="/"
            onClick={(event) => {
              event.preventDefault();
              navigate('/');
            }}
            className="inline-block hover:opacity-90 transition-opacity"
            aria-label="Sky Sentinel home"
          >
            <Logo variant="dark" className="h-10 sm:h-11 w-auto mx-auto opacity-90" />
          </a>
        </div>

        <div className="mb-8 text-center">
          <ul className="space-y-2 text-sm text-primary-foreground/70">
            <li className="flex items-center justify-center gap-2">
              <Shield className="w-3.5 h-3.5 shrink-0 opacity-70" strokeWidth={1.5} />
              <span>U.S. Veteran-owned & operated</span>
            </li>
            <li>Current and Retired Law Enforcement</li>
            <li>FAA Part 107 certified</li>
            <li>Fully insured operations</li>
          </ul>

          {showTeamCta ? (
            <div className="mt-8 pt-8 border-t border-primary-foreground/15">
              <p className="text-sm text-primary-foreground/60 mb-4">
                Learn more about the pilots behind Sky Sentinel
              </p>
              <a
                href="/team"
                onClick={(event) => {
                  event.preventDefault();
                  navigate('/team');
                }}
                className="inline-flex items-center justify-center gap-2 min-h-11 px-6 text-sm font-medium text-primary bg-primary-foreground rounded-full hover:opacity-90 transition-opacity duration-200"
              >
                Meet Our Team
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </a>
            </div>
          ) : null}
        </div>

        <div className="border-t border-primary-foreground/15 pt-6 text-center text-xs sm:text-sm text-primary-foreground/60">
          <p>
            &copy; 2026 Sky Sentinel. All rights reserved.{' '}
            <a
              href="https://buildwithbengal.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary-foreground text-blue-400 transition-colors duration-200"
            >
              Bengal Web Services
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
