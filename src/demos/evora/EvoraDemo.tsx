import React, { useState } from 'react';
import { FloatingPortfolioReturn } from '../../components/common/FloatingPortfolioReturn';
import { INITIAL_ROUTINES, INITIAL_CLIENTS, INITIAL_AUDIT_LOGS, BackupRoutine, ClientAccount, AuditLog } from './data/mockEvora';
import { 
  ShieldCheck, 
  Home, 
  LayoutDashboard, 
  ShieldAlert, 
  Layers, 
  Users, 
  DollarSign, 
  FileText, 
  Cpu, 
  RefreshCw, 
  Plus, 
  HardDrive, 
  Activity, 
  PieChart, 
  ChevronRight, 
  CheckCircle2, 
  AlertTriangle, 
  Clock, 
  Search,
  Server,
  Menu,
  X
} from 'lucide-react';

export const EvoraDemo: React.FC = () => {
  // Navigation active tab
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [syncNotice, setSyncNotice] = useState<string>('');

  const selectTab = (tab: string) => {
    setActiveTab(tab);
    setMobileSidebarOpen(false);
  };

  // Mock data state
  const [routines, setRoutines] = useState<BackupRoutine[]>(INITIAL_ROUTINES);
  const [clients, setClients] = useState<ClientAccount[]>(INITIAL_CLIENTS);
  const [logs, setLogs] = useState<AuditLog[]>(INITIAL_AUDIT_LOGS);

  // New Client Modal
  const [showNewClientModal, setShowNewClientModal] = useState<boolean>(false);
  const [newClientName, setNewClientName] = useState<string>('');
  const [newClientPlan, setNewClientPlan] = useState<string>('Cloud Pro 100GB');
  const [newClientQuota, setNewClientQuota] = useState<number>(100);

  const handleSyncCloud = () => {
    setIsSyncing(true);
    setSyncNotice('Sincronizando com Évora Cloud Engine...');
    setTimeout(() => {
      setIsSyncing(false);
      setSyncNotice('Sincronização concluída com sucesso! Metadados e cotas atualizados.');
      setTimeout(() => setSyncNotice(''), 4000);
    }, 1000);
  };

  const handleAddClient = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClientName.trim()) return;

    const newClient: ClientAccount = {
      id: `CLI-0${clients.length + 1}`,
      name: newClientName,
      environment: 'Produção Primária',
      plan: newClientPlan,
      quotaGB: Number(newClientQuota),
      usedGB: 0.0,
      contact: 'suporte@empresa.local',
      status: 'Ativo'
    };

    setClients([...clients, newClient]);
    setShowNewClientModal(false);
    setNewClientName('');
  };

  return (
    <div className="min-h-screen bg-[#f1f5f9] text-slate-800 font-sans selection:bg-cyan-500/20 selection:text-cyan-900 relative">
      {/* Floating Return Card - Dark version for high contrast on light background */}
      <FloatingPortfolioReturn theme="light" targetPath="/projetos" />

      {/* Discreet Demo Banner */}
      <div className="bg-[#0b1b2f] border-b border-[#132c4a] text-center py-1 px-4 text-[10px] font-mono text-cyan-400 tracking-wider">
        <span>AMBIENTE DE DEMONSTRAÇÃO • DADOS FICTÍCIOS</span>
      </div>

      {/* Mobile Topbar with Hamburger (visible only on mobile) */}
      <div className="lg:hidden flex items-center justify-between bg-white border-b border-slate-200 px-4 py-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => setMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 hover:text-[#0099cc] cursor-pointer active:scale-95 flex items-center justify-center shadow-xs"
            aria-label="Abrir menu lateral Évora"
            title="Abrir menu"
          >
            <Menu className="w-5 h-5 text-[#0099cc]" />
          </button>

          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-[#0099cc] flex items-center justify-center text-white shadow-xs">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div className="leading-tight">
              <h1 className="text-xs font-black text-[#0099cc] tracking-tight">
                ÉVORA <span className="text-[#0284c7]">BACKUP</span>
              </h1>
              <span className="text-[8px] font-bold text-[#f97316] uppercase tracking-wider block">
                PAINEL MSP
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-1.5 text-[10px] font-mono text-emerald-700 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-200">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>Nuvem Ativa</span>
        </div>
      </div>

      <div className="min-h-[calc(100vh-28px)] flex">
        {/* Mobile Drawer Backdrop */}
        {mobileSidebarOpen && (
          <div 
            className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 lg:hidden"
            onClick={() => setMobileSidebarOpen(false)}
          />
        )}

        {/* ==========================================================
            SIDEBAR ÉVORA BACKUP (Drawer on mobile, Static on Desktop)
            ========================================================== */}
        <aside className={`
          fixed inset-y-0 left-0 z-[70] w-72 max-w-[85vw] bg-white border-r border-slate-200/90 flex flex-col shadow-2xl transition-transform duration-200
          lg:static lg:w-64 lg:flex lg:translate-x-0 lg:shadow-none shrink-0
          ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0 hidden lg:flex'}
        `}>
          {/* Logo Header */}
          <div className="p-4 border-b border-slate-100 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-[#0099cc] flex items-center justify-center text-white shadow-xs">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h1 className="text-base font-black text-[#0099cc] tracking-tight leading-none">
                    ÉVORA <span className="text-[#0284c7]">BACKUP</span>
                  </h1>
                  <span className="text-[9px] font-bold text-[#f97316] tracking-widest block uppercase mt-0.5">
                    PAINEL DE CONTROLE
                  </span>
                </div>
              </div>

              {/* Close Button on Mobile Drawer */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100 cursor-pointer active:scale-95"
                aria-label="Fechar menu lateral"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Acessar Landing Page button matching screenshot */}
            <button
              onClick={() => alert('Em ambiente de demonstração, você está visualizando o Painel de Controle Operacional.')}
              className="w-full flex items-center justify-between px-3 py-1.5 rounded-md border border-slate-200 text-[11px] text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
            >
              <span>&gt; Acessar Landing Page</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
            </button>
          </div>

          {/* Página Principal do Painel item (active teal tab) */}
          <div className="p-3 pb-0">
            <button
              onClick={() => selectTab('dashboard')}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md bg-[#0099cc] text-white text-xs font-semibold shadow-xs cursor-pointer"
            >
              <Home className="w-4 h-4" />
              <span>Página Principal do Painel</span>
            </button>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-3 space-y-4 overflow-y-auto text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                NAVEGAÇÃO
              </span>

              <div className="space-y-0.5">
                {/* Dashboard & Gráficos */}
                <button
                  onClick={() => selectTab('dashboard')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'dashboard'
                      ? 'bg-[#0099cc] text-white shadow-xs'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <LayoutDashboard className="w-4 h-4" />
                    <span>Dashboard & Gráficos</span>
                  </div>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                {/* Monitor de Backups */}
                <button
                  onClick={() => selectTab('monitor')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'monitor'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <ShieldAlert className="w-4 h-4 text-rose-500" />
                    <span>Monitor de Backups</span>
                  </div>
                </button>

                {/* Backups de Clientes */}
                <button
                  onClick={() => selectTab('backups')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'backups'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Layers className="w-4 h-4 text-cyan-600" />
                    <span>Backups de Clientes</span>
                  </div>
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-cyan-100 text-cyan-800 font-semibold font-mono">
                    {routines.length} rotinas
                  </span>
                </button>

                {/* Contas de Clientes */}
                <button
                  onClick={() => selectTab('clientes')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'clientes'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Users className="w-4 h-4 text-slate-500" />
                    <span>Contas de Clientes</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">
                    {clients.length}
                  </span>
                </button>

                {/* Planos & Preços */}
                <button
                  onClick={() => selectTab('planos')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'planos'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <span>Planos & Preços</span>
                  </div>
                  <span className="text-[11px] text-slate-500 font-mono">6</span>
                </button>

                {/* Logs de Auditoria */}
                <button
                  onClick={() => selectTab('logs')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'logs'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <FileText className="w-4 h-4 text-slate-500" />
                    <span>Logs de Auditoria</span>
                  </div>
                </button>

                {/* API & Servidor de Backup */}
                <button
                  onClick={() => selectTab('api')}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md font-medium transition-colors cursor-pointer ${
                    activeTab === 'api'
                      ? 'bg-[#0099cc] text-white'
                      : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Cpu className="w-4 h-4 text-slate-500" />
                    <span>API & Servidor de Backup</span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                </button>
              </div>
            </div>

            {/* Acesso Rápido às Rotinas matching screenshot */}
            <div className="pt-2 border-t border-slate-100">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 block mb-1">
                ACESSO RÁPIDO ÀS ROTINAS
              </span>
              <div 
                onClick={() => selectTab('backups')}
                className="p-2 rounded-md bg-slate-50 hover:bg-slate-100 flex items-center justify-between text-xs cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Server className="w-3.5 h-3.5 text-slate-500" />
                  <span className="text-slate-700 truncate max-w-[110px]">Évora Tecnologia (Ambi...</span>
                </div>
                <span className="text-[10px] font-mono text-cyan-700 font-bold">100GB</span>
              </div>
            </div>
          </div>

          {/* User profile footer matching screenshot */}
          <div className="p-3 border-t border-slate-200/90 flex items-center gap-2.5 bg-slate-50/50">
            <div className="w-8 h-8 rounded-full bg-[#0099cc] text-white flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="text-left text-xs leading-tight">
              <span className="font-bold text-slate-900 block">Administrador Master</span>
              <span className="text-[10px] text-emerald-600 flex items-center gap-1 font-medium mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Évora Cloud Engine Online</span>
              </span>
            </div>
          </div>
        </aside>

        {/* ==========================================================
            CONTEÚDO PRINCIPAL ÉVORA BACKUP (Referência exata: Captura 2026-08-21 112705)
            ========================================================== */}
        <main className="flex-1 flex flex-col min-w-0 bg-[#f8fafc] p-4 sm:p-6 lg:p-8 space-y-4 sm:space-y-6 overflow-y-auto w-full">
          {/* Header Row matching screenshot */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                Página Principal • Painel de Controle Évora
              </h1>
              <p className="text-xs text-slate-500 mt-1">
                Visão geral do status diário das rotinas e infraestrutura de armazenamento.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              <button
                onClick={handleSyncCloud}
                className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-slate-600 ${isSyncing ? 'animate-spin' : ''}`} />
                <span>Sincronizar Nuvem</span>
              </button>

              <button
                onClick={() => setShowNewClientModal(true)}
                className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg bg-[#0099cc] hover:bg-[#0088b6] text-xs font-semibold text-white transition-colors shadow-2xs cursor-pointer active:scale-95"
              >
                <Plus className="w-4 h-4" />
                <span>Novo Cliente</span>
              </button>
            </div>
          </div>

          {syncNotice && (
            <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>{syncNotice}</span>
            </div>
          )}

          {/* VIEW: DASHBOARD (Default matching screenshot) */}
          {activeTab === 'dashboard' && (
            <div className="space-y-4 sm:space-y-6">
              {/* 4 Metric Cards matching screenshot exactly (2x2 on mobile, 4 cols on desktop) */}
              <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
                {/* CAPACIDADE TOTAL MASTER */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 uppercase tracking-wider block font-mono truncate">
                    CAPACIDADE TOTAL MASTER
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                    100 GB
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 pt-0.5 sm:pt-1 truncate">
                    Cluster Évora Cloud (Ambiente de Testes)
                  </p>
                </div>

                {/* CAPACIDADE ALOCADA */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#0284c7] uppercase tracking-wider block font-mono truncate">
                    CAPACIDADE ALOCADA
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#0284c7] tracking-tight">
                    100 GB
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 pt-0.5 sm:pt-1 truncate">
                    Soma das quotas dos 1 clientes
                  </p>
                </div>

                {/* CAPACIDADE UTILIZADA */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#0099cc] uppercase tracking-wider block font-mono truncate">
                    CAPACIDADE UTILIZADA
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#0099cc] tracking-tight">
                    0.0 GB
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 pt-0.5 sm:pt-1 truncate">
                    Volume gravado em disco na nuvem
                  </p>
                </div>

                {/* ESPAÇO DISPONÍVEL LIVRE */}
                <div className="p-3.5 sm:p-5 rounded-xl bg-white border border-slate-200/80 shadow-2xs space-y-1 min-w-0">
                  <span className="text-[10px] sm:text-[11px] font-bold text-[#059669] uppercase tracking-wider block font-mono truncate">
                    ESPAÇO DISPONÍVEL LIVRE
                  </span>
                  <div className="text-xl sm:text-2xl font-black text-[#059669] tracking-tight">
                    0 GB
                  </div>
                  <p className="text-[10px] sm:text-[11px] text-slate-400 pt-0.5 sm:pt-1 truncate">
                    Margem livre de armazenamento
                  </p>
                </div>
              </div>

              {/* Middle Row: 2 Chart Cards matching screenshot exactly */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                {/* Card 1: Status das Rotinas de Backup */}
                <div className="p-4 sm:p-6 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Activity className="w-5 h-5 text-emerald-500" />
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">
                          Status das Rotinas de Backup
                        </h2>
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-800 font-semibold font-mono">
                        1 Contas Monitoradas
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Visão imediata dos backups executados com sucesso, falhas e alertas.
                    </p>
                  </div>

                  {/* Donut Chart SVG matching screenshot */}
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* 1 Nunca Executado (Gray ring 100%) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#94a3b8"
                          strokeWidth="16"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-slate-700">1</span>
                        <span className="text-[10px] text-slate-400 font-medium">Rotina Total</span>
                      </div>
                    </div>

                    {/* Chart Legend matching screenshot */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium pt-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                        <span>Alerta / Limite (0)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                        <span>Falha Crítica (0)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
                        <span>Nunca Executado (1)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                        <span>Sucesso / OK (0)</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Blocks below chart (2x2 on mobile, 4 cols on tablet/desktop) */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs">
                    <div className="p-2 rounded-lg bg-emerald-50 border border-emerald-100">
                      <span className="text-[10px] text-emerald-800 font-medium block">Sucesso</span>
                      <span className="text-xs font-bold text-emerald-700 font-mono">0 OK</span>
                    </div>
                    <div className="p-2 rounded-lg bg-rose-50 border border-rose-100">
                      <span className="text-[10px] text-rose-800 font-medium block">Falha Crítica</span>
                      <span className="text-xs font-bold text-rose-700 font-mono">0 Falha(s)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-amber-50 border border-amber-100">
                      <span className="text-[10px] text-amber-800 font-medium block">Alertas</span>
                      <span className="text-xs font-bold text-amber-700 font-mono">0 Alerta(s)</span>
                    </div>
                    <div className="p-2 rounded-lg bg-slate-100 border border-slate-200">
                      <span className="text-[10px] text-slate-700 font-medium block">Nunca Executado</span>
                      <span className="text-xs font-bold text-slate-800 font-mono">1 Pendente(s)</span>
                    </div>
                  </div>

                  {/* Red Alert Button matching screenshot */}
                  <div>
                    <button
                      onClick={() => selectTab('monitor')}
                      className="w-full py-2.5 px-3 rounded-lg bg-[#e11d48] hover:bg-[#be123c] text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors shadow-2xs cursor-pointer text-center"
                    >
                      <ShieldAlert className="w-4 h-4 shrink-0" />
                      <span>Acessar Monitor de Backups (1 caso com atenção / pendente) →</span>
                    </button>
                  </div>
                </div>

                {/* Card 2: Distribuição de Armazenamento */}
                <div className="p-4 sm:p-6 rounded-xl bg-white border border-slate-200/80 shadow-2xs flex flex-col justify-between space-y-4 sm:space-y-6">
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <PieChart className="w-5 h-5 text-cyan-600" />
                        <h2 className="text-base font-bold text-slate-900 tracking-tight">
                          Distribuição de Armazenamento
                        </h2>
                      </div>
                      <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-semibold font-mono">
                        Total: 0.1 TB
                      </span>
                    </div>
                    <p className="text-xs text-slate-400">
                      Proporção entre o espaço contratado, alocado e utilizado.
                    </p>
                  </div>

                  {/* Donut Chart SVG matching screenshot */}
                  <div className="flex flex-col items-center justify-center py-4">
                    <div className="relative w-44 h-44 flex items-center justify-center">
                      <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                        {/* 100% Margem Alocada (cyan ring) */}
                        <circle
                          cx="50"
                          cy="50"
                          r="38"
                          fill="transparent"
                          stroke="#38bdf8"
                          strokeWidth="16"
                        />
                      </svg>
                      <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                        <span className="text-2xl font-black text-[#0284c7]">100%</span>
                        <span className="text-[10px] text-slate-400 font-medium">Alocado</span>
                      </div>
                    </div>

                    {/* Chart Legend matching screenshot */}
                    <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-medium pt-4 text-slate-600">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-slate-300" />
                        <span>Espaço Livre (0.0 GB)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#38bdf8]" />
                        <span>Margem Alocada (100.0 GB)</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#0284c7]" />
                        <span>Utilizado Efetivo (0.0 GB)</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Metric Boxes matching screenshot */}
                  <div className="grid grid-cols-2 gap-3 text-center text-xs">
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 font-medium block">Uso Real</span>
                      <span className="text-sm font-bold text-[#0284c7] font-mono">0.0 GB</span>
                    </div>
                    <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
                      <span className="text-[10px] text-slate-500 font-medium block">Margem Alocada</span>
                      <span className="text-sm font-bold text-blue-700 font-mono">100.0 GB</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom footer timestamp matching screenshot */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-xs text-slate-400 font-mono pt-4 border-t border-slate-200/80">
                <span>Évora Cloud Storage v2.4 • Cluster Operacional Ativo</span>
                <span>sexta-feira, 21 de agosto de 2026 • 11:27 (Hora local)</span>
              </div>
            </div>
          )}

          {/* VIEW: MONITOR DE BACKUPS */}
          {activeTab === 'monitor' && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Monitor Central de Rotinas de Backup
                  </h2>
                  <span className="text-xs font-mono text-slate-500">
                    {routines.length} rotinas cadastradas
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] font-semibold uppercase font-mono">
                      <tr>
                        <th className="py-2.5 px-4">CLIENTE / AMBIENTE</th>
                        <th className="py-2.5 px-4">SERVIDOR / AGENTE</th>
                        <th className="py-2.5 px-4">TIPO DE CÓPIA</th>
                        <th className="py-2.5 px-4">ÚLTIMA EXECUÇÃO</th>
                        <th className="py-2.5 px-4">QUOTA / USO</th>
                        <th className="py-2.5 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {routines.map((rot) => (
                        <tr key={rot.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 font-semibold text-slate-900">{rot.clientName}</td>
                          <td className="py-3 px-4 font-mono text-slate-600">{rot.serverName}</td>
                          <td className="py-3 px-4 text-slate-700">{rot.routineType}</td>
                          <td className="py-3 px-4 text-slate-500 font-mono">{rot.lastRun}</td>
                          <td className="py-3 px-4 text-slate-700 font-mono">
                            {rot.usedSpace} / {rot.allocatedQuota}
                          </td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                              rot.status === 'Sucesso'
                                ? 'bg-emerald-100 text-emerald-800'
                                : rot.status === 'Nunca Executado'
                                ? 'bg-slate-200 text-slate-700'
                                : 'bg-rose-100 text-rose-800'
                            }`}>
                              {rot.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* VIEW: CONTAS DE CLIENTES */}
          {(activeTab === 'clientes' || activeTab === 'backups' || activeTab === 'planos' || activeTab === 'logs' || activeTab === 'api') && (
            <div className="space-y-6">
              <div className="p-6 rounded-xl bg-white border border-slate-200 shadow-2xs space-y-4">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-bold text-slate-900">
                    Contas de Clientes & Quotas de Armazenamento
                  </h2>
                  <button
                    onClick={() => setShowNewClientModal(true)}
                    className="px-3 py-1.5 rounded-md bg-[#0099cc] text-white text-xs font-semibold hover:bg-[#0088b6]"
                  >
                    + Adicionar Conta
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-600 border-b border-slate-200 text-[11px] font-semibold uppercase font-mono">
                      <tr>
                        <th className="py-2.5 px-4">ID</th>
                        <th className="py-2.5 px-4">NOME DO CLIENTE</th>
                        <th className="py-2.5 px-4">AMBIENTE</th>
                        <th className="py-2.5 px-4">PLANO</th>
                        <th className="py-2.5 px-4 text-right">QUOTA (GB)</th>
                        <th className="py-2.5 px-4 text-right">USO (GB)</th>
                        <th className="py-2.5 px-4">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {clients.map((cli) => (
                        <tr key={cli.id} className="hover:bg-slate-50">
                          <td className="py-3 px-4 text-slate-500 font-mono">{cli.id}</td>
                          <td className="py-3 px-4 font-semibold text-slate-900">{cli.name}</td>
                          <td className="py-3 px-4 text-slate-600">{cli.environment}</td>
                          <td className="py-3 px-4 text-[#0099cc] font-medium">{cli.plan}</td>
                          <td className="py-3 px-4 text-right font-mono font-bold text-slate-800">{cli.quotaGB} GB</td>
                          <td className="py-3 px-4 text-right font-mono text-slate-600">{cli.usedGB} GB</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-100 text-emerald-800">
                              {cli.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal: Novo Cliente */}
      {showNewClientModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-xl bg-white border border-slate-200 p-6 space-y-4 shadow-xl">
            <h3 className="text-base font-bold text-slate-900">
              Cadastrar Novo Cliente Évora Backup
            </h3>

            <form onSubmit={handleAddClient} className="space-y-3 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Nome da Empresa / Cliente</label>
                <input
                  type="text"
                  placeholder="Ex: Delta Soluções Tecnológicas"
                  value={newClientName}
                  onChange={(e) => setNewClientName(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Plano Contratado</label>
                <select
                  value={newClientPlan}
                  onChange={(e) => setNewClientPlan(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900"
                >
                  <option value="Cloud Starter 50GB">Cloud Starter 50GB</option>
                  <option value="Cloud Pro 100GB">Cloud Pro 100GB</option>
                  <option value="Enterprise 250GB">Enterprise 250GB</option>
                  <option value="Enterprise 500GB">Enterprise 500GB</option>
                  <option value="Cluster Dedicado 1TB">Cluster Dedicado 1TB</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-slate-700 block">Quota Alocada (GB)</label>
                <input
                  type="number"
                  min="10"
                  value={newClientQuota}
                  onChange={(e) => setNewClientQuota(Number(e.target.value))}
                  className="w-full bg-slate-50 border border-slate-300 rounded-md p-2 text-slate-900"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowNewClientModal(false)}
                  className="px-3 py-1.5 rounded-md border border-slate-300 text-slate-700 hover:bg-slate-100"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-md bg-[#0099cc] text-white font-semibold hover:bg-[#0088b6]"
                >
                  Salvar Cliente
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
