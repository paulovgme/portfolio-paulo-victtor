import React from 'react';
import { RouterProvider, useRouter } from './router';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { ProjectDetailPage } from './pages/ProjectDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ResumePage } from './pages/ResumePage';
import { SentinelDemo } from './demos/sentinel/SentinelDemo';
import { EstoqueDemo } from './demos/estoque/EstoqueDemo';
import { EvoraDemo } from './demos/evora/EvoraDemo';

const MainRouterContent: React.FC = () => {
  const { path } = useRouter();

  // Route 1: SentinelTI Demo (Full screen custom dark NOC interface - NEVER modified by portfolio theme)
  if (path === '/demo/sentinelti' || path.startsWith('/demo/sentinel')) {
    return <SentinelDemo />;
  }

  // Route 2: Estoque Demo (Full screen custom light Streamlit interface - NEVER modified by portfolio theme)
  if (path === '/demo/estoque') {
    return <EstoqueDemo />;
  }

  // Route 3: Évora Backup Demo (Full screen custom light/cyan MSP interface - NEVER modified by portfolio theme)
  if (path === '/demo/evora-backup' || path.startsWith('/demo/evora')) {
    return <EvoraDemo />;
  }

  // Portfolio Layout with Navbar, Theme, and Footer
  return (
    <div className="min-h-screen bg-portfolio-main text-portfolio-primary flex flex-col font-sans transition-colors duration-150">
      <Navbar />

      <main className="flex-1">
        {path === '/' && <HomePage />}
        {path === '/projetos' && <ProjectsPage />}
        {path === '/projetos/sentinelti' && <ProjectDetailPage projectSlug="sentinelti" />}
        {path === '/projetos/estoque' && <ProjectDetailPage projectSlug="estoque" />}
        {path === '/projetos/evora-backup' && <ProjectDetailPage projectSlug="evora-backup" />}
        {path === '/sobre' && <AboutPage />}
        {path === '/curriculo' && <ResumePage />}

        {/* Fallback for unknown routes */}
        {path !== '/' &&
          path !== '/projetos' &&
          path !== '/projetos/sentinelti' &&
          path !== '/projetos/estoque' &&
          path !== '/projetos/evora-backup' &&
          path !== '/sobre' &&
          path !== '/curriculo' && (
            <HomePage />
          )}
      </main>

      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <RouterProvider>
        <MainRouterContent />
      </RouterProvider>
    </ThemeProvider>
  );
}
