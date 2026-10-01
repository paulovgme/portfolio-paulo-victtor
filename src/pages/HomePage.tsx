import React from 'react';
import { Link } from '../router';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { 
  Server, 
  Headphones, 
  Activity, 
  Cpu, 
  ArrowRight, 
  MessageSquare, 
  Layers, 
  Eye
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Server': return <Server className="w-5 h-5 text-portfolio-accent" />;
      case 'Headphones': return <Headphones className="w-5 h-5 text-portfolio-accent" />;
      case 'Activity': return <Activity className="w-5 h-5 text-portfolio-accent" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-portfolio-accent" />;
      default: return <Layers className="w-5 h-5 text-portfolio-accent" />;
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary flex flex-col transition-colors duration-150">
      {/* Hero Section */}
      <section className="relative pt-20 pb-24 border-b border-portfolio overflow-hidden">
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 dark:opacity-15 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(currentColor 1px, transparent 1px)',
            backgroundSize: '24px 24px'
          }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-6">
            {/* Professional Kicker */}
            <div className="inline-flex items-center gap-2 text-xs font-mono text-portfolio-accent tracking-wider uppercase border border-portfolio-accent px-3 py-1 rounded-full bg-portfolio-accent-subtle">
              <span className="w-1.5 h-1.5 rounded-full bg-portfolio-accent animate-pulse" />
              <span>Portfólio Profissional de TI</span>
            </div>

            {/* Name */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-portfolio-primary max-w-3xl">
              PAULO VICTTOR
            </h1>

            {/* Role positioning */}
            <p className="text-lg sm:text-xl font-medium text-portfolio-accent font-mono tracking-tight max-w-2xl">
              Analista de TI | Infraestrutura | Desenvolvimento de Soluções
            </p>

            {/* Sober, realistic elevator description */}
            <p className="text-sm sm:text-base text-portfolio-secondary leading-relaxed max-w-2xl">
              A base da minha carreira é a vivência prática em suporte corporativo, administração de redes, servidores e monitoramento de ativos. O desenvolvimento de sistemas surgiu organicamente para solucionar desafios reais do dia a dia da infraestrutura.
            </p>

            {/* Two Main CTAs */}
            <div className="pt-4 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
              <Link
                to="/projetos"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-all duration-200 shadow-sm active:scale-95"
              >
                <span>Conheça meus projetos</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                to="/curriculo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3 rounded-lg text-sm font-semibold text-portfolio-primary bg-portfolio-card hover:bg-portfolio-card-hover border border-portfolio transition-all duration-200 active:scale-95 shadow-xs"
              >
                <span>Ver currículo</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sobre Mim - Resumo Curto */}
      <section className="py-20 border-b border-portfolio bg-portfolio-surface transition-colors duration-150">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-6 bg-portfolio-accent rounded-full" />
              <h2 className="text-xl sm:text-2xl font-bold text-portfolio-primary tracking-tight">
                Sobre Mim
              </h2>
            </div>

            <div className="text-portfolio-secondary text-sm sm:text-base leading-relaxed space-y-4">
              <p>
                Com mais de 10 anos de atuação contínua em ambientes de Tecnologia da Informação corporativa, construí minha base profissional atendendo diretamente usuários, realizando troubleshooting avançado de hardware e sistemas operacionais, mantendo redes locais, enlaces e administrando servidores.
              </p>
              <p>
                Ao vivenciar lacunas operacionais recorrentes — como a necessidade de monitorar dezenas de enlaces remotos, gerenciar peças de informática sem planilhas frágeis e auditar rotinas de backup diárias —, passei a projetar e desenvolver soluções de software focadas no contexto de TI.
              </p>
              <p className="text-portfolio-muted text-xs sm:text-sm">
                Utilizo Inteligência Artificial de maneira estratégica e transparente como ferramenta de apoio durante todo o ciclo: na pesquisa técnica de protocolos, na prototipação ágil de interfaces, na resolução de erros e na elaboração de documentações.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de Atuação */}
      <section className="py-20 border-b border-portfolio transition-colors duration-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
            <span className="text-xs font-mono uppercase tracking-wider text-portfolio-accent font-semibold">
              Especialidades Operacionais
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-portfolio-primary tracking-tight">
              Áreas de Atuação
            </h2>
            <p className="text-xs sm:text-sm text-portfolio-secondary">
              Domínios consolidados pela experiência prática em suporte e sustentação de ambientes de TI.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROFILE.areasOfExpertise.map((area, idx) => (
              <div
                key={idx}
                className="p-6 rounded-xl bg-portfolio-card border border-portfolio hover:border-portfolio-strong transition-all duration-200 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-lg bg-portfolio-accent-subtle border border-portfolio-accent flex items-center justify-center">
                    {getIcon(area.iconName)}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-portfolio-primary">
                      {area.title}
                    </h3>
                    <p className="text-xs text-portfolio-accent font-mono mt-0.5">
                      {area.subtitle}
                    </p>
                  </div>
                  <p className="text-xs sm:text-sm text-portfolio-secondary leading-relaxed">
                    {area.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projetos em Destaque */}
      <section className="py-20 border-b border-portfolio bg-portfolio-surface transition-colors duration-150">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-portfolio-accent font-semibold">
                Sistemas Reais Desenvolvidos
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-portfolio-primary tracking-tight mt-1">
                Projetos em Destaque
              </h2>
              <p className="text-xs sm:text-sm text-portfolio-secondary mt-2 max-w-xl">
                Ferramentas construídas a partir de necessidades reais de infraestrutura, com demonstrações interativas funcionais.
              </p>
            </div>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 text-xs font-semibold text-portfolio-accent hover:underline transition-colors"
            >
              <span>Ver todos os estudos de caso</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {PROJECTS.map((project) => (
              <div
                key={project.id}
                className="rounded-xl bg-portfolio-card border border-portfolio hover:border-portfolio-strong flex flex-col justify-between overflow-hidden group transition-all duration-200 shadow-xs"
              >
                {/* Visual Header Representation */}
                <div className="p-6 pb-4 border-b border-portfolio space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-portfolio-accent uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-portfolio-surface text-portfolio-secondary border border-portfolio font-mono">
                      {project.visualTheme.badgeLabel}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-portfolio-primary group-hover:text-portfolio-accent transition-colors">
                    {project.name}
                  </h3>

                  <p className="text-xs text-portfolio-secondary leading-relaxed line-clamp-3">
                    {project.summary}
                  </p>
                </div>

                {/* Tech List */}
                <div className="p-6 pt-4 space-y-5">
                  <div>
                    <span className="text-[11px] uppercase font-mono text-portfolio-muted tracking-wider block mb-2 font-semibold">
                      Tecnologias Utilizadas
                    </span>
                    <div className="flex flex-wrap gap-1.5 text-[11px]">
                      {project.technologies.slice(0, 5).map((tech, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded bg-portfolio-surface border border-portfolio font-mono text-portfolio-secondary"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-0.5 rounded bg-portfolio-surface text-portfolio-muted text-[10px] font-mono">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex flex-col gap-2">
                    <Link
                      to={project.demoRoute}
                      className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-3 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Explorar Demonstração</span>
                    </Link>
                    <Link
                      to={project.detailRoute}
                      className="inline-flex items-center justify-center gap-2 w-full py-2 px-3 rounded-lg text-xs font-medium text-portfolio-secondary hover:text-portfolio-primary bg-portfolio-surface hover:bg-portfolio-card border border-portfolio transition-colors"
                    >
                      <span>Estudo de Caso & Arquitetura</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WhatsApp CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="p-8 rounded-2xl bg-portfolio-card border border-portfolio text-center space-y-5 shadow-xs">
            <h2 className="text-xl sm:text-2xl font-bold text-portfolio-primary tracking-tight">
              Interessado em saber mais sobre meu perfil ou projetos?
            </h2>
            <p className="text-xs sm:text-sm text-portfolio-secondary max-w-xl mx-auto leading-relaxed">
              Estou à disposição para conversar sobre oportunidades em TI, infraestrutura corporativa, suporte e soluções funcionais.
            </p>
            <div className="pt-2">
              <a
                href={PROFILE.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs active:scale-95"
              >
                <MessageSquare className="w-4 h-4" />
                <span>Falar comigo pelo WhatsApp</span>
              </a>
            </div>
            <p className="text-xs text-portfolio-muted font-mono">
              {PROFILE.location} • {PROFILE.phoneDisplay}
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};
