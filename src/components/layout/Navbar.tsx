import React, { useState } from 'react';
import { useRouter, Link } from '../../router';
import { PROFILE } from '../../data/profile';
import { ThemeToggle } from '../common/ThemeToggle';
import { MessageSquare, Menu, X, Terminal } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path } = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Início', href: '/' },
    { label: 'Projetos', href: '/projetos' },
    { label: 'Sobre', href: '/sobre' },
    { label: 'Currículo', href: '/curriculo' }
  ];

  const isActive = (href: string) => {
    if (href === '/') return path === '/';
    return path.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full no-print bg-portfolio-card/90 backdrop-blur-md border-b border-portfolio transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <Link to="/" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 h-8 rounded-lg bg-portfolio-accent-subtle border border-portfolio-accent flex items-center justify-center text-portfolio-accent group-hover:scale-105 transition-transform">
            <Terminal className="w-4 h-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-base font-semibold tracking-tight text-portfolio-primary group-hover:text-portfolio-accent transition-colors">
              Paulo Victtor
            </span>
            <span className="text-[10px] tracking-wider uppercase text-portfolio-secondary font-mono -mt-0.5">
              Analista de TI
            </span>
          </div>
        </Link>

        {/* Zone 2: Navigation Links */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-medium transition-colors py-1 relative ${
                  active
                    ? 'text-portfolio-accent font-semibold'
                    : 'text-portfolio-secondary hover:text-portfolio-primary'
                }`}
              >
                {link.label}
                {active && (
                  <span className="absolute bottom-0 left-0 w-full h-[2px] bg-portfolio-accent rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: Theme Toggle & WhatsApp Action */}
        <div className="flex items-center gap-3">
          {/* Theme Selector (☀ Claro | Escuro 🌙 on desktop, ☀/🌙 on mobile) */}
          <ThemeToggle />

          {/* WhatsApp CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-all duration-200 active:scale-95 shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Abrir menu"
              className="p-2 text-portfolio-secondary hover:text-portfolio-primary hover:bg-portfolio-surface rounded-lg transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-portfolio-card border-b border-portfolio px-4 pt-3 pb-5 space-y-2 shadow-lg">
          {navLinks.map((link) => {
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  active
                    ? 'bg-portfolio-accent-subtle text-portfolio-accent border border-portfolio-accent font-semibold'
                    : 'text-portfolio-secondary hover:bg-portfolio-surface hover:text-portfolio-primary'
                }`}
              >
                {link.label}
              </Link>
            );
          })}

          <div className="pt-2">
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center gap-2 w-full px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 shadow-xs"
            >
              <MessageSquare className="w-4 h-4" />
              <span>Falar comigo pelo WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
