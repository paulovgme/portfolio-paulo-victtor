import React from 'react';
import { useRouter, Link } from '../router';
import { PROJECTS } from '../data/projects';
import { 
  ArrowLeft, 
  Eye, 
  CheckCircle2
} from 'lucide-react';

interface ProjectDetailPageProps {
  projectSlug?: string;
}

export const ProjectDetailPage: React.FC<ProjectDetailPageProps> = ({ projectSlug }) => {
  const { path } = useRouter();

  // Determine current project from slug or url path
  const currentSlug = projectSlug || path.split('/')[2] || 'sentinelti';
  const project = PROJECTS.find((p) => p.slug === currentSlug) || PROJECTS[0];

  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary py-16 transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Navigation Breadcrumb / Back link */}
        <div className="flex items-center justify-between">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2 text-xs font-mono text-portfolio-muted hover:text-portfolio-accent transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Voltar para Todos os Projetos</span>
          </Link>
          <span className="text-xs font-mono text-portfolio-accent uppercase tracking-wider font-semibold">
            {project.category}
          </span>
        </div>

        {/* Project Header */}
        <div className="space-y-4 pb-8 border-b border-portfolio">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-portfolio-primary tracking-tight">
            {project.name}
          </h1>
          <p className="text-base sm:text-lg text-portfolio-secondary leading-relaxed max-w-3xl">
            {project.summary}
          </p>
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <Link
              to={project.demoRoute}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-all shadow-xs active:scale-95"
            >
              <Eye className="w-4 h-4" />
              <span>Explorar Demonstração Interativa</span>
            </Link>
          </div>
        </div>

        {/* Section 1: O Problema */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-rose-500 rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              1. O Desafio Operacional (Problema)
            </h2>
          </div>
          <div className="p-6 rounded-xl bg-portfolio-card border border-portfolio text-sm text-portfolio-secondary leading-relaxed shadow-xs">
            {project.problem}
          </div>
        </section>

        {/* Section 2: A Solução */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-portfolio-accent rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              2. Solução Implementada
            </h2>
          </div>
          <div className="p-6 rounded-xl bg-portfolio-card border border-portfolio text-sm text-portfolio-secondary leading-relaxed shadow-xs">
            {project.solution}
          </div>
        </section>

        {/* Section 3: Como Funciona */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              3. Como Funciona
            </h2>
          </div>
          <div className="p-6 rounded-xl bg-portfolio-card border border-portfolio text-sm text-portfolio-secondary leading-relaxed shadow-xs">
            {project.howItWorks}
          </div>
        </section>

        {/* Section 4: Arquitetura Conceitual */}
        {project.architecture && (
          <section className="space-y-6">
            <div className="flex items-center gap-2.5">
              <div className="w-1.5 h-5 bg-emerald-500 rounded-full" />
              <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
                4. Arquitetura Conceitual & Fluxo de Dados
              </h2>
            </div>

            <div className="p-6 rounded-2xl bg-portfolio-card border border-portfolio space-y-6 shadow-xs">
              <div className="space-y-4">
                {project.architecture.diagram.map((step, idx) => (
                  <div key={idx} className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-portfolio-accent-subtle border border-portfolio-accent flex items-center justify-center shrink-0 text-portfolio-accent font-mono text-xs font-bold">
                      {idx + 1}
                    </div>
                    <div className="flex-1 p-3.5 rounded-lg bg-portfolio-surface border border-portfolio">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-xs font-mono font-bold text-portfolio-accent uppercase">
                          {step.label}
                        </span>
                        <span className="text-[11px] font-mono text-portfolio-muted">
                          {step.sublabel}
                        </span>
                      </div>
                      <p className="text-xs text-portfolio-secondary mt-1">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-2 text-xs text-portfolio-muted border-t border-portfolio font-mono">
                {project.architecture.notes}
              </div>
            </div>
          </section>
        )}

        {/* Section 5: Principais Funcionalidades */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-portfolio-accent rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              5. Principais Funcionalidades
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {project.keyFeatures.map((feature, i) => (
              <div
                key={i}
                className="p-3.5 rounded-lg bg-portfolio-card border border-portfolio flex items-start gap-2.5 shadow-2xs"
              >
                <CheckCircle2 className="w-4 h-4 text-portfolio-accent shrink-0 mt-0.5" />
                <span className="text-xs text-portfolio-primary leading-snug">
                  {feature}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Section 6: Tecnologias Utilizadas */}
        <section className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-amber-500 rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              6. Tecnologias Utilizadas no Projeto
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono bg-portfolio-surface border border-portfolio text-portfolio-accent"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Bottom CTA to Demo */}
        <div className="pt-8 border-t border-portfolio flex flex-col sm:flex-row items-center justify-between gap-4">
          <div>
            <h3 className="text-base font-bold text-portfolio-primary">
              Deseja testar a interface do {project.name}?
            </h3>
            <p className="text-xs text-portfolio-muted">
              Ambiente de demonstração navegável com dados fictícios.
            </p>
          </div>
          <Link
            to={project.demoRoute}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs active:scale-95"
          >
            <Eye className="w-4 h-4" />
            <span>Acessar Demonstração do {project.name}</span>
          </Link>
        </div>
      </div>
    </div>
  );
};
