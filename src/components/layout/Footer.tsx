import React from 'react';
import { Link } from '../../router';
import { PROFILE } from '../../data/profile';
import { MessageSquare, MapPin, Phone, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full no-print bg-portfolio-surface border-t border-portfolio text-portfolio-secondary py-12 transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-10 border-b border-portfolio">
          {/* Identity & Positioning */}
          <div className="space-y-3">
            <h3 className="text-portfolio-primary font-semibold text-base tracking-tight">
              {PROFILE.fullName}
            </h3>
            <p className="text-xs text-portfolio-accent font-mono font-medium">
              {PROFILE.roleTitle}
            </p>
            <p className="text-xs text-portfolio-secondary leading-relaxed max-w-sm">
              Profissional de TI com sólida vivência em suporte, redes e infraestrutura corporativa, aliada ao desenvolvimento de ferramentas funcionais para necessidades reais.
            </p>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-portfolio-primary uppercase tracking-wider font-mono">
              Navegação
            </span>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-portfolio-accent transition-colors">
                  Início
                </Link>
              </li>
              <li>
                <Link to="/projetos" className="hover:text-portfolio-accent transition-colors">
                  Projetos & Estudos de Caso
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="hover:text-portfolio-accent transition-colors">
                  Sobre a Trajetória
                </Link>
              </li>
              <li>
                <Link to="/curriculo" className="hover:text-portfolio-accent transition-colors">
                  Currículo Profissional
                </Link>
              </li>
            </ul>
          </div>

          {/* Direct Contact (WhatsApp Only) */}
          <div className="space-y-3">
            <span className="text-xs font-semibold text-portfolio-primary uppercase tracking-wider font-mono">
              Contato Profissional
            </span>
            <div className="space-y-2 text-xs">
              <div className="flex items-center gap-2 text-portfolio-secondary">
                <MapPin className="w-3.5 h-3.5 text-portfolio-accent shrink-0" />
                <span>{PROFILE.location}</span>
              </div>
              <div className="flex items-center gap-2 text-portfolio-secondary">
                <Phone className="w-3.5 h-3.5 text-portfolio-accent shrink-0" />
                <span>{PROFILE.phoneDisplay}</span>
              </div>
            </div>

            <div className="pt-2">
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Falar comigo pelo WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-portfolio-muted">
          <div className="flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-portfolio-accent" />
            <span>Portfólio Profissional de TI • {PROFILE.shortName}</span>
          </div>
          <div>
            <span>Desenvolvimento de Soluções com Apoio de IA</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
