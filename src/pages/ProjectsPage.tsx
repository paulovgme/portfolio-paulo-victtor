import React from 'react';
import { Link } from '../router';
import { PROJECTS } from '../data/projects';
import { ArrowRight, Eye } from 'lucide-react';

export const ProjectsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary py-16 transition-colors duration-150">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-portfolio-accent tracking-wider uppercase border border-portfolio-accent px-3 py-1 rounded-full bg-portfolio-accent-subtle">
            <span>Sistemas Desenvolvidos</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-portfolio-primary tracking-tight">
            Projetos & Estudos de Caso
          </h1>
          <p className="text-sm sm:text-base text-portfolio-secondary leading-relaxed">
            Ferramentas reais desenvolvidas a partir de demandas operacionais concretas vivenciadas no ambiente corporativo de TI. Cada sistema possui finalidade, arquitetura técnica e interface próprias.
          </p>
        </div>

        {/* Project Cards (Case Study Style) */}
        <div className="space-y-12">
          {PROJECTS.map((project, index) => (
            <div
              key={project.id}
              className="rounded-2xl bg-portfolio-card border border-portfolio p-6 sm:p-8 space-y-8 hover:border-portfolio-strong transition-all duration-200 shadow-xs"
            >
              {/* Top Row: Meta and Title */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-portfolio">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-portfolio-accent uppercase tracking-wider font-semibold">
                      {project.category}
                    </span>
                    <span className="text-portfolio-muted">·</span>
                    <span className="text-xs text-portfolio-muted font-mono">
                      Projeto 0{index + 1}
                    </span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-portfolio-primary tracking-tight">
                    {project.name}
                  </h2>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <Link
                    to={project.demoRoute}
                    className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs active:scale-95"
                  >
                    <Eye className="w-4 h-4" />
                    <span>Explorar Demonstração</span>
                  </Link>
                  <Link
                    to={project.detailRoute}
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-medium text-portfolio-secondary hover:text-portfolio-primary bg-portfolio-surface hover:bg-portfolio-card border border-portfolio transition-colors"
                  >
                    <span>Ver Estudo Completo</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              {/* Problem & Solution Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-5 rounded-xl bg-portfolio-surface border border-portfolio space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-rose-500 block font-semibold">
                    Desafio Operacional
                  </span>
                  <p className="text-xs sm:text-sm text-portfolio-secondary leading-relaxed">
                    {project.problem}
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-portfolio-surface border border-portfolio space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-portfolio-accent block font-semibold">
                    Solução Desenvolvida
                  </span>
                  <p className="text-xs sm:text-sm text-portfolio-secondary leading-relaxed">
                    {project.solution}
                  </p>
                </div>
              </div>

              {/* Technologies & Key highlights */}
              <div className="space-y-4">
                <span className="text-xs font-mono uppercase tracking-wider text-portfolio-muted block font-semibold">
                  Tecnologias Utilizadas no Projeto
                </span>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 rounded-md text-xs font-mono bg-portfolio-surface border border-portfolio text-portfolio-secondary"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
