import React, { useState, useEffect } from 'react';
import { FloatingPortfolioReturn } from '../../components/common/FloatingPortfolioReturn';
import { INITIAL_DEVICES, SAMPLE_INCIDENTS, IncidentItem, NetworkDevice } from './data/mockData';
import { 
  Shield, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  Search, 
  Bell, 
  RefreshCw, 
  Folder, 
  Calendar, 
  Volume2, 
  VolumeX, 
  Activity, 
  AlertTriangle, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Zap, 
  ChevronRight, 
  ChevronDown, 
  Radio, 
  Server, 
  Video, 
  Printer, 
  PhoneCall, 
  PlusCircle, 
  FileText, 
  BarChart3, 
  Users, 
  KeyRound, 
  Terminal,
  LifeBuoy,
  X
} from 'lucide-react';

export const SentinelDemo: React.FC = () => {
  // Authentication state for demo (default false to show the login screen initially)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('admin.noc');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active view in the dashboard
  const [activeMenu, setActiveMenu] = useState<string>('monitoria');
  const [soundActive, setSoundActive] = useState<boolean>(true);
  const [selectedTab, setSelectedTab] = useState<'todos' | 'criticos' | 'alertas' | 'atendimento'>('todos');
  
  // Real-time dynamic clock
  const [currentTime, setCurrentTime] = useState<string>('10:35:38');
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Mock incidents toggle (allow user to see either the nominal state from screenshot or sample active incidents)
  const [incidents, setIncidents] = useState<IncidentItem[]>([]);
  const [devices, setDevices] = useState<NetworkDevice[]>(INITIAL_DEVICES);
  
  // Ping tool modal
  const [showPingModal, setShowPingModal] = useState<boolean>(false);
  const [pingTarget, setPingTarget] = useState<string>('10.20.0.1');
  const [pingLogs, setPingLogs] = useState<string[]>([]);
  const [isPinging, setIsPinging] = useState<boolean>(false);

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setCurrentTime(now.toTimeString().split(' ')[0]);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const runPing = () => {
    setIsPinging(true);
    setPingLogs([
      `Iniciando teste ICMP para ${pingTarget}...`,
      `PING ${pingTarget} (56 bytes de dados):`
    ]);

    setTimeout(() => {
      setPingLogs(prev => [
        ...prev,
        `64 bytes de ${pingTarget}: icmp_seq=1 ttl=64 tempo=1.24 ms`,
        `64 bytes de ${pingTarget}: icmp_seq=2 ttl=64 tempo=1.18 ms`,
        `64 bytes de ${pingTarget}: icmp_seq=3 ttl=64 tempo=1.35 ms`,
        `64 bytes de ${pingTarget}: icmp_seq=4 ttl=64 tempo=1.20 ms`,
        `--- ${pingTarget} estatísticas de ping ---`,
        `4 pacotes transmitidos, 4 recebidos, 0% perda de pacotes, tempo médio = 1.24ms`
      ]);
      setIsPinging(false);
    }, 1000);
  };

  const toggleSimulateIncidents = () => {
    if (incidents.length === 0) {
      setIncidents(SAMPLE_INCIDENTS);
    } else {
      setIncidents([]);
    }
  };

  // Filtered incidents
  const filteredIncidents = incidents.filter(inc => {
    if (selectedTab === 'criticos') return inc.severity === 'CRÍTICO';
    if (selectedTab === 'alertas') return inc.severity === 'ALERTA';
    if (selectedTab === 'atendimento') return inc.severity === 'EM ATENDIMENTO';
    return true;
  });

  // Calculate live summary stats
  const criticosCount = incidents.filter(i => i.severity === 'CRÍTICO').length;
  const alertasCount = incidents.filter(i => i.severity === 'ALERTA').length;
  const atendimentoCount = incidents.filter(i => i.severity === 'EM ATENDIMENTO').length;

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 font-sans selection:bg-cyan-500/20 selection:text-cyan-300 relative">
      {/* Floating Return Card - Contrast light button for dark interface */}
      <FloatingPortfolioReturn theme="dark" targetPath="/projetos" />

      {/* Discreet Demo Banner */}
      <div className="bg-[#0b1322] border-b border-[#1b273d] text-center py-1 px-4 text-[10px] font-mono text-cyan-400/90 tracking-wider">
        <span>AMBIENTE DE DEMONSTRAÇÃO • DADOS FICTÍCIOS</span>
      </div>

      {!isAuthenticated ? (
        /* ==========================================================
           TELA DE LOGIN SENTINELTI (Referência exata: Captura 103534)
           ========================================================== */
        <div className="min-h-[calc(100vh-28px)] flex flex-col items-center justify-center p-4 relative bg-[#090d16]">
          {/* Subtle dot matrix grid */}
          <div 
            className="absolute inset-0 opacity-20 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(#1e293b 1px, transparent 1px)',
              backgroundSize: '20px 20px'
            }}
          />

          {/* Central Login Card */}
          <div className="relative w-full max-w-[420px] rounded-2xl bg-[#0d1424] border border-[#1b2840] p-8 shadow-2xl space-y-6">
            {/* Top Cyan Shield Badge */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#0b172a] border border-cyan-500/40 flex items-center justify-center shadow-lg shadow-cyan-950/50">
                <Shield className="w-7 h-7 text-cyan-400" />
              </div>

              <div>
                <h1 className="text-2xl font-black tracking-wider text-white">
                  SENTINEL<span className="text-[#00c0f0]">TI</span>
                </h1>
                <p className="text-[10px] font-mono tracking-widest text-slate-400 uppercase mt-1">
                  CENTRO DE OPERAÇÕES DE REDE — CENTRAL NOC
                </p>
              </div>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLogin} className="space-y-4 pt-2">
              {/* Login Field */}
              <div className="space-y-1.5">
                <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                  LOGIN
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Informe seu login ou e-mail"
                    className="w-full bg-[#080d17] border border-[#1e2d45] rounded-lg py-2.5 pl-10 pr-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-mono uppercase tracking-wider text-slate-400 block font-semibold">
                    SENHA
                  </label>
                  <button
                    type="button"
                    onClick={() => alert('Em ambiente de demonstração, o acesso é liberado diretamente.')}
                    className="text-[11px] text-slate-400 hover:text-cyan-400 transition-colors"
                  >
                    Recuperar senha
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-[#080d17] border border-[#1e2d45] rounded-lg py-2.5 pl-10 pr-10 text-xs text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 font-mono transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Action Button: ACESSAR SISTEMA -> */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 px-4 rounded-lg bg-[#00a2cc] hover:bg-[#00b4d8] text-white font-bold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-cyan-950/60 transition-all duration-200 cursor-pointer active:scale-98"
                >
                  <span>ACESSAR SISTEMA</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Footer outside card */}
          <div className="mt-8 text-center text-xs text-slate-500 font-mono">
            <span>SentinelTI Central v1.0.0 • Developed by Paulo Victtor</span>
          </div>
        </div>
      ) : (
        /* ==========================================================
           INTERFACE PRINCIPAL NOC SENTINELTI (Referência: Captura 103543)
           ========================================================== */
        <div className="min-h-screen flex bg-[#070b14] text-slate-200">
          {/* NOC Left Sidebar */}
          <aside className="w-64 bg-[#090e1a] border-r border-[#152033] flex flex-col shrink-0">
            {/* Top Brand Lockup */}
            <div className="p-4 border-b border-[#152033] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-[#0d1627] border border-cyan-500/40 flex items-center justify-center">
                  <Shield className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-sm text-white">SENTINEL<span className="text-[#00c0f0]">TI</span></span>
                    <span className="text-[9px] px-1 py-0.2 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 font-mono">NOC</span>
                  </div>
                  <span className="text-[10px] text-slate-400 block font-mono">developed by Paulo Victtor</span>
                </div>
              </div>
            </div>

            {/* Navigation Menus */}
            <div className="flex-1 overflow-y-auto py-3 px-2 space-y-4 text-xs">
              {/* OPERAÇÃO */}
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span>OPERAÇÃO</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="space-y-0.5 mt-1">
                  <button
                    onClick={() => setActiveMenu('monitoria')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                      activeMenu === 'monitoria'
                        ? 'bg-[#0e213b] text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]'
                    }`}
                  >
                    <Activity className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Monitoria NOC</span>
                  </button>

                  <button
                    onClick={() => {
                      setActiveMenu('ocorrencias');
                      toggleSimulateIncidents();
                    }}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-lg font-medium transition-colors ${
                      activeMenu === 'ocorrencias'
                        ? 'bg-[#0e213b] text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      <span>Ocorrências</span>
                    </div>
                    {incidents.length > 0 && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-mono">
                        {incidents.length}
                      </span>
                    )}
                  </button>

                  <button
                    onClick={() => setActiveMenu('descobertas')}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium transition-colors ${
                      activeMenu === 'descobertas'
                        ? 'bg-[#0e213b] text-cyan-300 border border-cyan-500/30'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]'
                    }`}
                  >
                    <Radio className="w-3.5 h-3.5 text-slate-400" />
                    <span>Descobertas</span>
                  </button>

                  <button
                    onClick={() => setShowPingModal(true)}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-slate-400 hover:text-slate-200 hover:bg-[#0c1524] transition-colors"
                  >
                    <Terminal className="w-3.5 h-3.5 text-slate-400" />
                    <span>Diagnóstico Ping</span>
                  </button>

                  <button
                    onClick={() => setActiveMenu('glpi')}
                    className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg font-medium text-slate-400 hover:text-slate-200 hover:bg-[#0c1524] transition-colors"
                  >
                    <LifeBuoy className="w-3.5 h-3.5 text-slate-400" />
                    <span>Chamados GLPI</span>
                  </button>
                </div>
              </div>

              {/* REDE & ATIVOS */}
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span>REDE & ATIVOS</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="space-y-0.5 mt-1">
                  <button onClick={() => setActiveMenu('links')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Layers className="w-3.5 h-3.5" />
                    <span>Links de Rede</span>
                  </button>
                  <button onClick={() => setActiveMenu('roteadores')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Server className="w-3.5 h-3.5" />
                    <span>Roteadores</span>
                  </button>
                  <button onClick={() => setActiveMenu('cameras')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Video className="w-3.5 h-3.5" />
                    <span>Câmeras IP</span>
                  </button>
                  <button onClick={() => setActiveMenu('antenas')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Radio className="w-3.5 h-3.5" />
                    <span>Antenas & Rádios</span>
                  </button>
                  <button onClick={() => setActiveMenu('impressoras')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Printer className="w-3.5 h-3.5" />
                    <span>Impressoras</span>
                  </button>
                  <button onClick={() => setActiveMenu('voip')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>Ramais VoIP</span>
                  </button>
                  <button onClick={() => alert('Em ambiente de demonstração, novos equipamentos são cadastrados via perfil de administrador.')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-cyan-400 hover:text-cyan-300 hover:bg-[#0c1524]">
                    <PlusCircle className="w-3.5 h-3.5" />
                    <span>Novo Equipamento</span>
                  </button>
                </div>
              </div>

              {/* GESTÃO */}
              <div>
                <div className="flex items-center justify-between px-2 py-1 text-[10px] font-mono uppercase tracking-wider text-slate-400">
                  <span>GESTÃO</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                <div className="space-y-0.5 mt-1">
                  <button onClick={() => setActiveMenu('sla')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <FileText className="w-3.5 h-3.5" />
                    <span>Relatórios SLA</span>
                  </button>
                  <button onClick={() => setActiveMenu('metricas')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <BarChart3 className="w-3.5 h-3.5" />
                    <span>Gráficos de Métricas</span>
                  </button>
                  <button onClick={() => setActiveMenu('usuarios')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <Users className="w-3.5 h-3.5" />
                    <span>Usuários</span>
                  </button>
                  <button onClick={() => setActiveMenu('rbac')} className="w-full flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-[#0c1524]">
                    <KeyRound className="w-3.5 h-3.5" />
                    <span>Permissões RBAC</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Logout link at bottom of sidebar */}
            <div className="p-3 border-t border-[#152033]">
              <button
                onClick={() => setIsAuthenticated(false)}
                className="w-full py-1.5 px-2 text-[11px] font-mono text-slate-400 hover:text-rose-400 text-center transition-colors block"
              >
                Encerrar Sessão NOC
              </button>
            </div>
          </aside>

          {/* Main NOC Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-[#070b14]">
            {/* Topbar matching screenshot */}
            <header className="h-14 bg-[#090e1a] border-b border-[#152033] px-6 flex items-center justify-between gap-4">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>SentinelTI</span>
                <span className="text-slate-600">&gt;</span>
                <span>Operação</span>
                <span className="text-slate-600">&gt;</span>
                <span className="text-white font-semibold">Monitoria NOC</span>
              </div>

              {/* Search Bar */}
              <div className="flex-1 max-w-md hidden md:block">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Pesquisar IP, equipamento, incidente... (Ctrl+K)"
                    className="w-full bg-[#080d17] border border-[#1a273e] rounded-lg py-1.5 pl-9 pr-3 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 font-mono"
                  />
                </div>
              </div>

              {/* Right status badges and profile */}
              <div className="flex items-center gap-4 text-xs font-mono">
                <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-[11px]">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  <span>Zabbix Online (1.4ms)</span>
                </div>

                <button className="text-slate-400 hover:text-white transition-colors relative">
                  <Bell className="w-4 h-4" />
                </button>

                <div className="flex items-center gap-2 pl-2 border-l border-slate-800">
                  <div className="w-7 h-7 rounded-full bg-cyan-900 border border-cyan-400/40 flex items-center justify-center text-xs font-bold text-cyan-200">
                    A
                  </div>
                  <div className="hidden lg:block text-left text-[11px]">
                    <span className="text-white font-medium block">Administrador ...</span>
                    <span className="text-[9px] text-cyan-400 font-mono">ADMIN</span>
                  </div>
                </div>
              </div>
            </header>

            {/* Dashboard Body */}
            <div className="flex-1 p-6 space-y-6 overflow-y-auto">
              {/* Dashboard Subheader */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h1 className="text-xl font-bold text-white tracking-tight">
                      Monitoria em Tempo Real
                    </h1>
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  </div>
                  <p className="text-xs text-slate-400 font-mono">
                    Central NOC • Conexão contínua Zabbix Server
                  </p>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={toggleSimulateIncidents}
                    className="px-3 py-1.5 rounded-lg text-xs font-mono bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition-colors"
                  >
                    {incidents.length === 0 ? '+ Simular Ocorrência' : 'Limpar Ocorrências'}
                  </button>

                  <button
                    onClick={handleRefresh}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-200 bg-[#0e1726] border border-[#1b2a42] hover:bg-[#132035] transition-colors"
                  >
                    <RefreshCw className={`w-3.5 h-3.5 text-cyan-400 ${isRefreshing ? 'animate-spin' : ''}`} />
                    <span>Sincronizar Zabbix</span>
                  </button>
                </div>
              </div>

              {/* CHAMADOS GLPI Banner matching screenshot */}
              <div className="rounded-xl bg-[#0b162a] border border-[#193052] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-900/60 border border-blue-500/40 flex items-center justify-center text-blue-300 shrink-0">
                    <LifeBuoy className="w-5 h-5 text-cyan-400" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-white tracking-wide">
                        CHAMADOS GLPI • HELPDESK TI
                      </span>
                      <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-950 text-cyan-300 border border-blue-800 font-mono">
                        Resumo real
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Indicadores do GLPI separados das ocorrências de rede Zabbix
                    </p>
                    <p className="text-[11px] text-slate-400 font-mono mt-1">
                      Em atendimento: 30 • Pendentes: 3
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
                  {/* EM ABERTO: 33 */}
                  <div className="flex items-center gap-2 bg-[#091222] px-3 py-1.5 rounded-lg border border-[#162740]">
                    <Folder className="w-4 h-4 text-cyan-400" />
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase">EM ABERTO</span>
                      <span className="text-sm font-bold text-white">33</span>
                    </div>
                  </div>

                  {/* HOJE: 0 */}
                  <div className="flex items-center gap-2 bg-[#091222] px-3 py-1.5 rounded-lg border border-[#162740]">
                    <Calendar className="w-4 h-4 text-emerald-400" />
                    <div>
                      <span className="text-[9px] text-slate-400 block uppercase">HOJE</span>
                      <span className="text-sm font-bold text-white">0</span>
                    </div>
                  </div>

                  {/* Sound toggle button */}
                  <button
                    onClick={() => setSoundActive(!soundActive)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#091222] border border-[#162740] text-cyan-300 hover:text-white"
                  >
                    {soundActive ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
                    <span className="text-[11px]">{soundActive ? 'Som Ativo' : 'Mudo'}</span>
                  </button>

                  {/* Acessar Chamados button */}
                  <button
                    onClick={() => alert('Integração de Helpdesk GLPI com fila de chamados corporativos.')}
                    className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-[#00a2cc] hover:bg-[#00b4d8] text-white font-bold text-xs transition-colors"
                  >
                    <span>Acessar Chamados</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* 6 NOC Metric Cards matching screenshot */}
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
                {/* CRÍTICOS */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 font-bold block">
                      CRÍTICOS
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">{criticosCount}</span>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {criticosCount === 0 ? 'Nominal' : 'Falha(s)'}
                      </span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-rose-950/40 border border-rose-500/30 flex items-center justify-center text-rose-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* ALERTAS */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                      ALERTAS
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">{alertasCount}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Pendentes</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-amber-950/40 border border-amber-500/30 flex items-center justify-center text-amber-400">
                    <AlertTriangle className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* EM ATENDIMENTO */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-blue-400 font-bold block">
                      EM ATENDIMENTO
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">{atendimentoCount}</span>
                      <span className="text-[10px] text-slate-400 font-mono">Com chamado</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-blue-950/40 border border-blue-500/30 flex items-center justify-center text-blue-400">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* ONLINE */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      ONLINE
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">100%</span>
                      <span className="text-[10px] text-slate-400 font-mono">Ativos</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* DISPONIBILIDADE */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold block">
                      DISPONIBILIDADE
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">99.8%</span>
                      <span className="text-[10px] text-slate-400 font-mono">SLA 30d</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                    <Layers className="w-3.5 h-3.5" />
                  </div>
                </div>

                {/* LATÊNCIA MÉDIA */}
                <div className="p-3.5 rounded-xl bg-[#0d1424] border border-[#1f2d47] flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold block">
                      LATÊNCIA MÉDIA
                    </span>
                    <div className="flex items-baseline gap-1.5 mt-1">
                      <span className="text-lg font-bold text-white font-mono">1.4</span>
                      <span className="text-[10px] text-slate-400 font-mono">ms</span>
                    </div>
                  </div>
                  <div className="w-7 h-7 rounded-lg bg-purple-950/40 border border-purple-500/30 flex items-center justify-center text-purple-400">
                    <Zap className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>

              {/* Incidents Table Panel */}
              <div className="rounded-xl bg-[#090e1a] border border-[#152033] overflow-hidden">
                {/* Table Tab Bar */}
                <div className="p-3 border-b border-[#152033] flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#0c1422]">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedTab('todos')}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        selectedTab === 'todos'
                          ? 'bg-[#00a2cc] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Todos ({incidents.length})
                    </button>
                    <button
                      onClick={() => setSelectedTab('criticos')}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        selectedTab === 'criticos'
                          ? 'bg-[#00a2cc] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Críticos ({criticosCount})
                    </button>
                    <button
                      onClick={() => setSelectedTab('alertas')}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        selectedTab === 'alertas'
                          ? 'bg-[#00a2cc] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Alertas ({alertasCount})
                    </button>
                    <button
                      onClick={() => setSelectedTab('atendimento')}
                      className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors ${
                        selectedTab === 'atendimento'
                          ? 'bg-[#00a2cc] text-white'
                          : 'text-slate-400 hover:text-white'
                      }`}
                    >
                      Em Atendimento ({atendimentoCount})
                    </button>
                  </div>

                  <span className="text-[11px] text-slate-400 font-mono">
                    Atualizado: {currentTime}
                  </span>
                </div>

                {/* Table Content */}
                {filteredIncidents.length === 0 ? (
                  /* NOMINAL EMPTY STATE (matching screenshot exactly) */
                  <div className="py-20 px-4 flex flex-col items-center justify-center text-center space-y-3">
                    <div className="w-12 h-12 rounded-xl bg-cyan-950/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                      <Shield className="w-6 h-6" />
                    </div>
                    <h3 className="text-sm font-bold text-white">
                      Nenhuma ocorrência ativa no momento
                    </h3>
                    <p className="text-xs text-slate-400 max-w-sm">
                      Todos os enlaces e equipamentos monitorados estão operando com parâmetros normais.
                    </p>
                  </div>
                ) : (
                  /* Active Incidents Rows */
                  <div className="overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#0b1220] text-slate-400 border-b border-[#172338] text-[10px] uppercase tracking-wider">
                        <tr>
                          <th className="py-2.5 px-4">SEVERIDADE</th>
                          <th className="py-2.5 px-4">EQUIPAMENTO</th>
                          <th className="py-2.5 px-4">UNIDADE</th>
                          <th className="py-2.5 px-4">DESCRIÇÃO DO INCIDENTE</th>
                          <th className="py-2.5 px-4">DURAÇÃO</th>
                          <th className="py-2.5 px-4">STATUS</th>
                          <th className="py-2.5 px-4">RESPONSÁVEL</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#152033]">
                        {filteredIncidents.map((inc) => (
                          <tr key={inc.id} className="hover:bg-[#0c1626] transition-colors">
                            <td className="py-3 px-4">
                              <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold ${
                                inc.severity === 'CRÍTICO'
                                  ? 'bg-rose-950 text-rose-300 border border-rose-800'
                                  : inc.severity === 'ALERTA'
                                  ? 'bg-amber-950 text-amber-300 border border-amber-800'
                                  : 'bg-blue-950 text-blue-300 border border-blue-800'
                              }`}>
                                {inc.severity}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-white font-medium">
                              <div>{inc.equipment}</div>
                              <span className="text-[10px] text-slate-400">{inc.ip}</span>
                            </td>
                            <td className="py-3 px-4 text-slate-300">{inc.unit}</td>
                            <td className="py-3 px-4 text-slate-200">{inc.description}</td>
                            <td className="py-3 px-4 text-slate-400">{inc.duration}</td>
                            <td className="py-3 px-4 text-cyan-300">{inc.status}</td>
                            <td className="py-3 px-4 text-slate-400">{inc.responsible}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>

              {/* Monitored Assets Summary Table */}
              <div className="rounded-xl bg-[#090e1a] border border-[#152033] p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-xs font-bold font-mono uppercase tracking-wider text-slate-300">
                    Ativos Monitorados em Tempo Real (Zabbix Agent & SNMP)
                  </h3>
                  <span className="text-[10px] font-mono text-cyan-400">
                    {devices.length} dispositivos operacionais
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs font-mono">
                    <thead className="text-[10px] text-slate-400 border-b border-[#172338]">
                      <tr>
                        <th className="py-2 px-3">NOME DO ATIVO</th>
                        <th className="py-2 px-3">TIPO</th>
                        <th className="py-2 px-3">ENDEREÇO IP</th>
                        <th className="py-2 px-3">LOCALIDADE</th>
                        <th className="py-2 px-3">LATÊNCIA</th>
                        <th className="py-2 px-3">UPTIME</th>
                        <th className="py-2 px-3">ESTADO</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#152033]">
                      {devices.map((dev) => (
                        <tr key={dev.id} className="hover:bg-[#0c1626]">
                          <td className="py-2.5 px-3 text-white font-medium">{dev.name}</td>
                          <td className="py-2.5 px-3 text-slate-400">{dev.type}</td>
                          <td className="py-2.5 px-3 text-cyan-300">{dev.ip}</td>
                          <td className="py-2.5 px-3 text-slate-400">{dev.location}</td>
                          <td className="py-2.5 px-3 text-emerald-400">{dev.latency}</td>
                          <td className="py-2.5 px-3 text-slate-400">{dev.uptime}</td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[10px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              {dev.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </main>
        </div>
      )}

      {/* Ping Diagnostic Modal */}
      {showPingModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-2xl bg-[#0d1424] border border-cyan-500/30 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <h3 className="text-sm font-bold text-white font-mono">
                  Diagnóstico ICMP / Ping NOC
                </h3>
              </div>
              <button
                onClick={() => setShowPingModal(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-mono text-slate-400">Destino (IP / Hostname)</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pingTarget}
                  onChange={(e) => setPingTarget(e.target.value)}
                  className="flex-1 bg-[#080d17] border border-slate-700 rounded-lg px-3 py-1.5 text-xs text-slate-200 font-mono"
                />
                <button
                  onClick={runPing}
                  disabled={isPinging}
                  className="px-4 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs font-bold disabled:opacity-50"
                >
                  {isPinging ? 'Testando...' : 'Executar'}
                </button>
              </div>
            </div>

            <div className="bg-[#05080f] rounded-lg p-3 font-mono text-xs text-emerald-400 min-h-[140px] max-h-[200px] overflow-y-auto space-y-1">
              {pingLogs.length === 0 ? (
                <span className="text-slate-600">Aguardando comando ping...</span>
              ) : (
                pingLogs.map((log, i) => <div key={i}>{log}</div>)
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
