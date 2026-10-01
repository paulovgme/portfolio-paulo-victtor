import React from 'react';
import { PROFILE } from '../data/profile';
import { PROJECTS } from '../data/projects';
import { Printer, MessageSquare, MapPin, Phone } from 'lucide-react';

export const ResumePage: React.FC = () => {
  const handlePrint = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      window.print();
    } catch (error) {
      console.error('Falha ao abrir janela de impressão:', error);
    }
  };

  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary py-12 transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Action Header (Hidden in Print) */}
        <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-portfolio">
          <div>
            <span className="text-xs font-mono text-portfolio-accent uppercase tracking-wider block font-semibold">
              Currículo Profissional
            </span>
            <h1 className="text-2xl font-bold text-portfolio-primary tracking-tight mt-0.5">
              Currículo para Recrutadores e Gestores de TI
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs cursor-pointer active:scale-95"
              title="Abrir diálogo de impressão / Salvar em PDF"
            >
              <Printer className="w-4 h-4" />
              <span>Imprimir / Salvar PDF</span>
            </button>
            <a
              href={PROFILE.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium text-portfolio-primary bg-portfolio-card hover:bg-portfolio-card-hover border border-portfolio transition-colors shadow-xs"
            >
              <MessageSquare className="w-4 h-4 text-portfolio-accent" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

        {/* Printable Resume Document Container */}
        <div className="print-page bg-portfolio-card border border-portfolio rounded-2xl p-8 sm:p-12 shadow-xs space-y-10">
          {/* Header */}
          <div className="resume-section border-b border-portfolio print:border-neutral-300 pb-8 space-y-3">
            <h1 className="text-3xl font-bold text-portfolio-primary print-title tracking-tight">
              {PROFILE.fullName}
            </h1>
            <p className="text-base font-semibold text-portfolio-accent print-subtitle font-mono">
              {PROFILE.roleTitle}
            </p>
            <div className="flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-portfolio-secondary print-muted font-mono pt-1">
              <div className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-portfolio-accent print:text-neutral-500" />
                <span>WhatsApp: {PROFILE.phoneDisplay}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-portfolio-accent print:text-neutral-500" />
                <span>{PROFILE.location}</span>
              </div>
            </div>
          </div>

          {/* Resumo Profissional */}
          <section className="resume-section space-y-3">
            <h2 className="text-sm font-bold uppercase tracking-wider text-portfolio-accent print-title font-mono border-b border-portfolio print:border-neutral-300 pb-1">
              Resumo Profissional
            </h2>
            <div className="text-xs sm:text-sm text-portfolio-secondary print:text-neutral-800 leading-relaxed space-y-2">
              <p>
                Profissional de Tecnologia da Informação com experiência sólida em suporte técnico, infraestrutura, redes, sistemas e ambientes corporativos. Minha trajetória envolve atendimento presencial e remoto a usuários corporativos, troubleshooting minucioso, manutenção de infraestrutura, redes de computadores, servidores e suporte contínuo a ambientes empresariais.
              </p>
              <p>
                Posteriormente, passei também a desenvolver ferramentas próprias para solucionar necessidades reais encontradas no dia a dia da TI, atuando na arquitetura e implementação de sistemas funcionais como o SentinelTI (monitoramento e NOC), Sistema de Gestão de Estoque (controle de patrimônio e periféricos) e Évora Backup (orquestração de rotinas e quotas de armazenamento).
              </p>
              <p>
                Utilizo Inteligência Artificial como ferramenta de apoio durante desenvolvimento, pesquisa técnica, troubleshooting, prototipação e documentação de software.
              </p>
            </div>
          </section>

          {/* Experiência Profissional */}
          <section className="resume-section space-y-5">
            <h2 className="text-sm font-bold uppercase tracking-wider text-portfolio-accent print-title font-mono border-b border-portfolio print:border-neutral-300 pb-1">
              Experiência Profissional
            </h2>

            <div className="space-y-6">
              {PROFILE.experiences.map((exp, idx) => (
                <div key={idx} className="resume-item space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <span className="font-bold text-sm text-portfolio-primary print-subtitle">
                        {exp.company}
                      </span>
                      <span className="text-portfolio-muted print-muted text-xs font-mono ml-2">
                        — {exp.role}
                      </span>
                    </div>
                    <span className="text-xs font-mono text-portfolio-accent print-muted font-semibold">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1 text-xs text-portfolio-secondary print:text-neutral-800 pt-1">
                    {exp.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <span className="text-portfolio-accent print:text-neutral-500 font-mono">·</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Competências */}
          <section className="resume-section space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-portfolio-accent print-title font-mono border-b border-portfolio print:border-neutral-300 pb-1">
              Competências Técnicas
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {PROFILE.competencies.map((cat, idx) => (
                <div key={idx} className="resume-item space-y-2">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wide text-portfolio-primary print-subtitle">
                    {cat.title}
                  </h3>
                  <div className="flex flex-wrap gap-1 text-[11px] text-portfolio-secondary">
                    {cat.skills.map((skill, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded bg-portfolio-surface border border-portfolio font-mono print-tag"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                  {cat.description && (
                    <p className="text-[10px] text-portfolio-muted print-muted font-mono italic">
                      *{cat.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Projetos em Destaque Desenvolvidos */}
          <section className="resume-section space-y-4">
            <h2 className="text-sm font-bold uppercase tracking-wider text-portfolio-accent print-title font-mono border-b border-portfolio print:border-neutral-300 pb-1">
              Projetos Desenvolvidos
            </h2>

            <div className="space-y-4">
              {PROJECTS.map((proj) => (
                <div key={proj.id} className="resume-item space-y-1.5 text-xs text-portfolio-secondary print:text-neutral-800">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-portfolio-primary print-subtitle font-mono">
                      {proj.name}
                    </span>
                    <span className="text-[11px] text-portfolio-accent print-muted font-mono font-semibold">
                      ({proj.category})
                    </span>
                  </div>
                  <p className="leading-relaxed">
                    {proj.summary}
                  </p>
                  <div className="flex flex-wrap gap-1 text-[10px] font-mono text-portfolio-muted print-muted pt-0.5">
                    <span className="text-portfolio-muted print-muted">Tecnologias:</span>
                    {proj.technologies.join(', ')}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
