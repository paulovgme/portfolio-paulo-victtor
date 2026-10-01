import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export const ThemeToggle: React.FC<{ className?: string }> = ({ className = '' }) => {
  const { theme, toggleTheme, setTheme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`flex items-center ${className}`}>
      {/* Desktop Segmented Control: ☀ Claro | Escuro 🌙 */}
      <div 
        role="group" 
        aria-label="Seletor de Tema"
        className="hidden sm:inline-flex items-center p-1 rounded-xl border border-portfolio bg-portfolio-surface shadow-xs transition-colors"
      >
        <button
          type="button"
          onClick={() => setTheme('light')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
            !isDark
              ? 'bg-white text-slate-900 shadow-xs font-semibold'
              : 'text-portfolio-secondary hover:text-portfolio-primary'
          }`}
          aria-pressed={!isDark}
          title="Ativar Tema Claro"
        >
          <Sun className={`w-3.5 h-3.5 ${!isDark ? 'text-amber-500 fill-amber-500/20' : 'text-slate-400'}`} />
          <span>Claro</span>
        </button>

        <button
          type="button"
          onClick={() => setTheme('dark')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium transition-all duration-200 cursor-pointer ${
            isDark
              ? 'bg-[#27272A] text-[#F4F4F5] shadow-xs font-semibold'
              : 'text-portfolio-secondary hover:text-portfolio-primary'
          }`}
          aria-pressed={isDark}
          title="Ativar Tema Carbon"
        >
          <Moon className={`w-3.5 h-3.5 ${isDark ? 'text-cyan-400 fill-cyan-400/20' : 'text-slate-400'}`} />
          <span>Escuro</span>
        </button>
      </div>

      {/* Mobile Compact Toggle: ☀ / 🌙 */}
      <button
        type="button"
        onClick={toggleTheme}
        className="sm:hidden flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-portfolio bg-portfolio-surface text-portfolio-primary text-xs font-medium shadow-xs transition-colors cursor-pointer active:scale-95"
        aria-label={isDark ? 'Mudar para tema claro' : 'Mudar para tema escuro'}
        title={isDark ? 'Tema Carbon ativo (clique para Claro)' : 'Tema Claro ativo (clique para Carbon)'}
      >
        {isDark ? (
          <>
            <Moon className="w-3.5 h-3.5 text-cyan-400 fill-cyan-400/20" />
            <span className="font-mono text-[11px]">Carbon</span>
          </>
        ) : (
          <>
            <Sun className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
            <span className="font-mono text-[11px]">Claro</span>
          </>
        )}
      </button>
    </div>
  );
};
