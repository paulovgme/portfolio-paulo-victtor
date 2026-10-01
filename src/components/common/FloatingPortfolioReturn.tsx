import React from 'react';
import { useRouter } from '../../router';
import { ArrowLeft } from 'lucide-react';

interface FloatingPortfolioReturnProps {
  theme?: 'dark' | 'light';
  targetPath?: string;
}

export const FloatingPortfolioReturn: React.FC<FloatingPortfolioReturnProps> = ({
  theme = 'light',
  targetPath = '/projetos'
}) => {
  const { navigate } = useRouter();

  // For dark environments (SentinelTI), use a crisp light button with high contrast
  // For light environments (Estoque, Évora), use a rich dark slate/navy button with high contrast
  const isDarkDemo = theme === 'dark';

  return (
    <div className="fixed bottom-4 left-4 sm:bottom-6 sm:left-6 z-[80] pointer-events-auto">
      <button
        onClick={() => navigate(targetPath)}
        className={`group flex items-center gap-2.5 px-4 py-2.5 rounded-xl font-medium text-xs sm:text-sm tracking-wide shadow-2xl transition-all duration-200 cursor-pointer active:scale-95 ${
          isDarkDemo
            ? 'bg-slate-100/95 hover:bg-white text-slate-900 border border-white/40 shadow-slate-950/60 ring-1 ring-slate-900/10 hover:shadow-cyan-500/15'
            : 'bg-[#0b1322]/95 hover:bg-[#070d17] text-white border border-slate-700/60 shadow-xl ring-1 ring-white/10 hover:border-cyan-500/50'
        }`}
        title="Retornar ao Portfólio de Paulo Victtor"
      >
        <ArrowLeft className={`w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1 shrink-0 ${
          isDarkDemo ? 'text-slate-700 group-hover:text-slate-900' : 'text-cyan-400 group-hover:text-cyan-300'
        }`} />
        <span className="hidden sm:inline">Voltar ao meu Portfólio</span>
        <span className="inline sm:hidden font-semibold">← Portfólio</span>
      </button>
    </div>
  );
};
