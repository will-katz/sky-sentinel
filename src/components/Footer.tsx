import { Shield } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6">
          <div className="w-9 h-9 mx-auto bg-primary-foreground/10 rounded-lg flex items-center justify-center text-xs font-bold tracking-wider">
            SS
          </div>
          <h4 className="mt-2 text-base">Sky Sentinel</h4>
          <p className="text-sm opacity-70 mt-1 max-w-md mx-auto">
            High-resolution aerial inspections for commercial, residential, and industrial clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-6 text-center">
          <div>
            <h4 className="mb-2 text-base">Services</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li><a href="#services" className="hover:opacity-100 transition-opacity">Commercial</a></li>
              <li><a href="#services" className="hover:opacity-100 transition-opacity">Construction</a></li>
              <li><a href="#services" className="hover:opacity-100 transition-opacity">Infrastructure</a></li>
              <li><a href="#services" className="hover:opacity-100 transition-opacity">Residential</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-base">Company</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li><a href="#" className="hover:opacity-100 transition-opacity">About Us</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Our Team</a></li>
              <li><a href="#" className="hover:opacity-100 transition-opacity">Certifications</a></li>
              <li><a href="#contact" className="hover:opacity-100 transition-opacity">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-2 text-base">Credentials</h4>
            <ul className="space-y-1 text-sm opacity-80">
              <li className="flex items-center justify-center gap-2">
                <Shield className="w-3.5 h-3.5 shrink-0" />
                <span>Veteran owned & operated</span>
              </li>
              <li>FAA Part 107 certified</li>
              <li>U.S. Marine Corps veteran</li>
              <li>Fully insured operations</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-4 text-center text-sm opacity-80">
          <p>
            &copy; 2026{' '}
            <a href="https://william.katzkatz.com" className="hover:opacity-100 underline transition-opacity">
              William Katz
            </a>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
