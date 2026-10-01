import React from 'react';
import { PROFILE } from '../data/profile';
import { MessageSquare, Calendar, Building, Check } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary py-16 transition-colors duration-150">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Header */}
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 text-xs font-mono text-portfolio-accent tracking-wider uppercase border border-portfolio-accent px-3 py-1 rounded-full bg-portfolio-accent-subtle">
            <span>Trajetória Profissional</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-portfolio-primary tracking-tight">
            Sobre Paulo Victtor
          </h1>
          <p className="text-base text-portfolio-accent font-mono font-medium">
            {PROFILE.roleTitle}
          </p>
        </div>

        {/* Narrative Section: The Natural Evolution */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-portfolio-accent rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              A Base em TI e a Origem das Soluções
            </h2>
          </div>

          <div className="p-6 rounded-2xl bg-portfolio-card border border-portfolio space-y-4 text-sm sm:text-base text-portfolio-secondary leading-relaxed shadow-xs">
            <p>
              Minha trajetória profissional foi construída integralmente no suporte técnico, na infraestrutura corporativa e na sustentação de ambientes de missão crítica. Desde o início, atuando no suporte a usuários corporativos, atendimento em campo, manutenção de servidores e troubleshooting de redes cabeadas e Wi-Fi, adquiri uma compreensão aprofundada dos gargalos reais que afetam equipes de TI.
            </p>
            <p>
              Com a evolução das demandas cotidianas — especialmente a necessidade de centralizar telemetria de roteadores e switches (Zabbix/SNMP), auditar insumos de reposição física de informática e supervisionar integridade de rotinas de backup —, passei a desenvolver ferramentas próprias.
            </p>
            <p>
              O desenvolvimento de software não surgiu como uma transição acadêmica ou teórica, mas sim como uma extensão natural da minha experiência em TI: transformar necessidades e dores operacionais reais em sistemas confiáveis e práticos.
            </p>
          </div>
        </section>

        {/* Dedicated Section: Desenvolvimento Assistido por IA */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-indigo-500 rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              Desenvolvimento Assistido por IA
            </h2>
          </div>

          <div className="p-6 sm:p-8 rounded-2xl bg-portfolio-card border border-portfolio space-y-5 shadow-xs">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-500 dark:text-indigo-400 block font-semibold">
                Metodologia & Transparência
              </span>
              <p className="text-base font-semibold text-portfolio-primary">
                "Ferramentas de Inteligência Artificial fazem parte do meu fluxo de desenvolvimento como apoio à pesquisa técnica, programação, troubleshooting, prototipação e documentação."
              </p>
            </div>

            <div className="space-y-3 pt-2 text-xs sm:text-sm text-portfolio-secondary">
              {PROFILE.aiAssistedStatement.details.map((detail, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded bg-portfolio-surface border border-portfolio flex items-center justify-center shrink-0 mt-0.5 text-portfolio-accent">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <p className="leading-relaxed">{detail}</p>
                </div>
              ))}
            </div>

            <p className="text-xs text-portfolio-muted pt-2 border-t border-portfolio font-mono">
              Abordagem prática: a IA apoia o processo de implementação, enquanto a especificação técnica, validação de regras de infraestrutura e aplicação no ambiente de produção permanecem sob rigoroso critério analítico humano.
            </p>
          </div>
        </section>

        {/* Work Experience */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-portfolio-accent rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              Experiência Profissional
            </h2>
          </div>

          <div className="space-y-6">
            {PROFILE.experiences.map((exp, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-portfolio-card border border-portfolio space-y-4 shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-portfolio">
                  <div>
                    <h3 className="text-lg font-bold text-portfolio-primary">
                      {exp.role}
                    </h3>
                    <div className="flex items-center gap-2 text-xs text-portfolio-accent font-mono mt-0.5 font-semibold">
                      <Building className="w-3.5 h-3.5 text-portfolio-muted" />
                      <span>{exp.company}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-portfolio-muted font-mono">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs font-mono uppercase tracking-wider text-portfolio-muted block font-semibold">
                    Atividades e Responsabilidades
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-portfolio-secondary">
                    {exp.activities.map((act, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-portfolio-accent font-mono">·</span>
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competencies */}
        <section className="space-y-6">
          <div className="flex items-center gap-2.5">
            <div className="w-1.5 h-5 bg-portfolio-accent rounded-full" />
            <h2 className="text-xl font-bold text-portfolio-primary tracking-tight">
              Competências Técnicas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROFILE.competencies.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-portfolio-card border border-portfolio space-y-4 flex flex-col justify-between shadow-xs"
              >
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-portfolio-primary font-mono uppercase tracking-wider text-portfolio-accent">
                    {cat.title}
                  </h3>
                  {cat.description && (
                    <p className="text-[11px] text-portfolio-muted leading-tight">
                      {cat.description}
                    </p>
                  )}
                  <ul className="space-y-2 pt-2 text-xs text-portfolio-secondary">
                    {cat.skills.map((skill, i) => (
                      <li key={i} className="flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-portfolio-accent" />
                        <span>{skill}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* WhatsApp Contact Box */}
        <div className="p-8 rounded-2xl bg-portfolio-card border border-portfolio flex flex-col sm:flex-row items-center justify-between gap-6 shadow-xs">
          <div>
            <h3 className="text-base font-bold text-portfolio-primary">
              Quer bater um papo profissional?
            </h3>
            <p className="text-xs text-portfolio-muted mt-1">
              Contato direto via WhatsApp ({PROFILE.location}).
            </p>
          </div>
          <a
            href={PROFILE.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold text-white bg-portfolio-accent hover:opacity-90 transition-opacity shadow-xs active:scale-95 whitespace-nowrap"
          >
            <MessageSquare className="w-4 h-4" />
            <span>Falar comigo pelo WhatsApp</span>
          </a>
        </div>
      </div>
    </div>
  );
};
