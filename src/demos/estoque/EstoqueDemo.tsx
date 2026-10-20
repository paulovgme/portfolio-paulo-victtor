import React, { useState } from 'react';
import { FloatingPortfolioReturn } from '../../components/common/FloatingPortfolioReturn';
import { 
  INITIAL_ESTOQUE, 
  INITIAL_MOVIMENTACOES, 
  INITIAL_DESCARTES, 
  SAMPLE_CHAMADOS,
  INITIAL_USUARIOS,
  EstoqueItem, 
  MovimentacaoItem, 
  DescarteItem,
  ChamadoItem,
  UsuarioItem
} from './data/mockEstoque';
import { 
  Eye, 
  EyeOff, 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  FileText, 
  CheckCircle2, 
  AlertCircle, 
  Menu, 
  X,
  PlusCircle,
  Filter,
  Download,
  Printer,
  ShieldCheck,
  UserCheck,
  Trash2,
  RefreshCw,
  Clock,
  Check,
  FileCheck
} from 'lucide-react';

export const EstoqueDemo: React.FC = () => {
  // Authentication state for demo (default true so visitor immediately lands in Painel Inicial)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('paulo.victtor');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active view in the Streamlit radio list (Default: inicio)
  const [currentNav, setCurrentNav] = useState<string>('inicio');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState<boolean>(false);

  const selectNav = (navId: string) => {
    setCurrentNav(navId);
    setMobileSidebarOpen(false);
  };

  // Main Data States
  const [estoque, setEstoque] = useState<EstoqueItem[]>(INITIAL_ESTOQUE);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoItem[]>(INITIAL_MOVIMENTACOES);
  const [descartes, setDescartes] = useState<DescarteItem[]>(INITIAL_DESCARTES);
  const [chamados, setChamados] = useState<ChamadoItem[]>([]); // Initially empty to match screenshot 2 ("0 chamados", "Sem chamados para exibir"), with quick toggle
  const [usuarios, setUsuarios] = useState<UsuarioItem[]>(INITIAL_USUARIOS);

  // Search & Filter states
  const [searchEstoque, setSearchEstoque] = useState<string>('');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('Todas');
  const [searchChamados, setSearchChamados] = useState<string>('');
  const [filtroTipoChamado, setFiltroTipoChamado] = useState<string>('Todos');
  const [filtroStatusChamado, setFiltroStatusChamado] = useState<string>('Todos');

  // Form states for "Abrir Chamados / O.S"
  const [novoChamadoTipo, setNovoChamadoTipo] = useState<'Chamado' | 'Ordem de Serviço'>('Chamado');
  const [novoChamadoTitulo, setNovoChamadoTitulo] = useState<string>('');
  const [novoChamadoSolicitante, setNovoChamadoSolicitante] = useState<string>('');
  const [novoChamadoDepto, setNovoChamadoDepto] = useState<string>('Financeiro');
  const [novoChamadoPrioridade, setNovoChamadoPrioridade] = useState<'Baixa' | 'Média' | 'Alta' | 'Crítica'>('Média');
  const [novoChamadoCategoria, setNovoChamadoCategoria] = useState<'Hardware' | 'Redes' | 'Acessos' | 'Impressoras' | 'Sistemas' | 'Infraestrutura'>('Hardware');
  const [novoChamadoEquipamento, setNovoChamadoEquipamento] = useState<string>('');
  const [novoChamadoDescricao, setNovoChamadoDescricao] = useState<string>('');
  const [chamadoSuccessMessage, setChamadoSuccessMessage] = useState<string>('');

  // Form states for "Entrada / Saída"
  const [movTipo, setMovTipo] = useState<'Entrada' | 'Saída'>('Saída');
  const [movProdutoId, setMovProdutoId] = useState<number>(estoque[0]?.id || 1);
  const [movQtd, setMovQtd] = useState<number>(1);
  const [movMotivo, setMovMotivo] = useState<string>('');
  const [movDocRef, setMovDocRef] = useState<string>('');
  const [movSuccessMessage, setMovSuccessMessage] = useState<string>('');

  // Form states for "Cadastrar Produto"
  const [novoNome, setNovoNome] = useState<string>('');
  const [novaCategoria, setNovaCategoria] = useState<string>('periféricos');
  const [novaQtd, setNovaQtd] = useState<number>(1);
  const [novoAlerta, setNovoAlerta] = useState<number>(1);
  const [novaMarca, setNovaMarca] = useState<string>('');
  const [novoModelo, setNovoModelo] = useState<string>('');
  const [cadSuccessMessage, setCadSuccessMessage] = useState<string>('');

  // Form states for "Correção de Produtos"
  const [editProdutoId, setEditProdutoId] = useState<number>(estoque[0]?.id || 1);
  const [editNome, setEditNome] = useState<string>(estoque[0]?.nome || '');
  const [editCategoria, setEditCategoria] = useState<string>(estoque[0]?.categoria || 'periféricos');
  const [editMarca, setEditMarca] = useState<string>(estoque[0]?.marca || '');
  const [editModelo, setEditModelo] = useState<string>(estoque[0]?.modelo || '');
  const [editQtd, setEditQtd] = useState<number>(estoque[0]?.quantidade || 1);
  const [editAlerta, setEditAlerta] = useState<number>(estoque[0]?.alerta || 1);
  const [editSuccessMessage, setEditSuccessMessage] = useState<string>('');

  // Form states for "Descarte"
  const [descEquipamento, setDescEquipamento] = useState<string>('');
  const [descPatrimonio, setDescPatrimonio] = useState<string>('');
  const [descMotivo, setDescMotivo] = useState<string>('');
  const [descSuccessMessage, setDescSuccessMessage] = useState<string>('');

  // ReportLab PDF Modal preview state
  const [activePdfModal, setActivePdfModal] = useState<{
    titulo: string;
    subtitulo: string;
    tipo: 'inventario' | 'chamados' | 'termo' | 'laudo';
    dataRef: string;
  } | null>(null);

  // Ticket detail modal
  const [selectedTicketForDetail, setSelectedTicketForDetail] = useState<ChamadoItem | null>(null);

  // Compute metrics for Painel Inicial
  const chamadosAbertos = chamados.filter(c => c.tipo === 'Chamado' && c.status === 'Aberto').length;
  const chamadosPendentes = chamados.filter(c => c.tipo === 'Chamado' && c.status === 'Pendente').length;
  const chamadosEncerrados = chamados.filter(c => c.tipo === 'Chamado' && c.status === 'Encerrado').length;
  const osAbertas = chamados.filter(c => c.tipo === 'Ordem de Serviço' && (c.status === 'Aberto' || c.status === 'Em Atendimento')).length;
  const osEncerradas = chamados.filter(c => c.tipo === 'Ordem de Serviço' && c.status === 'Encerrado').length;
  const produtosCadastrados = estoque.length;

  // Toggle sample tickets so user can inspect both empty screenshot-2 state and populated state
  const toggleSampleTickets = () => {
    if (chamados.length === 0) {
      setChamados(SAMPLE_CHAMADOS);
    } else {
      setChamados([]);
    }
  };

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleNovoChamadoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoChamadoTitulo.trim() || !novoChamadoSolicitante.trim()) return;

    const nextNum = chamados.length + 1;
    const prefix = novoChamadoTipo === 'Chamado' ? 'CH' : 'OS';
    const newId = `${prefix}-2026-${String(nextNum).padStart(3, '0')}`;

    const newTicket: ChamadoItem = {
      id: newId,
      numero: nextNum,
      tipo: novoChamadoTipo,
      titulo: novoChamadoTitulo.trim(),
      solicitante: novoChamadoSolicitante.trim(),
      departamento: novoChamadoDepto,
      prioridade: novoChamadoPrioridade,
      status: 'Aberto',
      categoria: novoChamadoCategoria,
      equipamentoVinculado: novoChamadoEquipamento || undefined,
      dataAbertura: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tecnicoResponsavel: 'Paulo Victtor',
      descricao: novoChamadoDescricao || 'Atendimento técnico solicitado via portal Évora Gestão.'
    };

    setChamados([newTicket, ...chamados]);
    setChamadoSuccessMessage(`Sucesso! ${novoChamadoTipo} ${newId} registrado com êxito no sistema.`);
    setNovoChamadoTitulo('');
    setNovoChamadoSolicitante('');
    setNovoChamadoDescricao('');
    setNovoChamadoEquipamento('');

    setTimeout(() => {
      setChamadoSuccessMessage('');
    }, 4500);
  };

  const handleMovimentacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = estoque.find(i => i.id === Number(movProdutoId));
    if (!item) return;

    if (movTipo === 'Saída' && item.quantidade < movQtd) {
      alert(`Quantidade insuficiente em estoque! Saldo atual de ${item.nome}: ${item.quantidade}`);
      return;
    }

    const updatedQtd = movTipo === 'Entrada' ? item.quantidade + Number(movQtd) : item.quantidade - Number(movQtd);
    setEstoque(estoque.map(i => i.id === item.id ? { ...i, quantidade: updatedQtd } : i));

    const newMov: MovimentacaoItem = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      dataHora: new Date().toISOString().replace('T', ' ').substring(0, 16),
      tipo: movTipo,
      produto: item.nome,
      quantidade: Number(movQtd),
      motivo: movMotivo || (movTipo === 'Entrada' ? 'Entrada manual em estoque / Reposição' : 'Requisição técnica de suporte'),
      responsavel: 'Paulo Victtor',
      documentoRef: movDocRef || undefined
    };

    setMovimentacoes([newMov, ...movimentacoes]);
    setMovSuccessMessage(`Sucesso! ${movTipo} de ${movQtd} unidade(s) de ${item.nome} registrada.`);
    setMovMotivo('');
    setMovDocRef('');
    setTimeout(() => setMovSuccessMessage(''), 4000);
  };

  const handleCadastroSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoNome.trim()) return;

    const newId = estoque.length > 0 ? Math.max(...estoque.map(i => i.id)) + 1 : 1;
    const newItem: EstoqueItem = {
      id: newId,
      nome: novoNome.toUpperCase(),
      categoria: novaCategoria,
      quantidade: Number(novaQtd),
      alerta: Number(novoAlerta),
      marca: novaMarca.toUpperCase() || 'GENÉRICO',
      modelo: novoModelo.toUpperCase() || 'PADRÃO'
    };

    setEstoque([...estoque, newItem]);
    setCadSuccessMessage(`Produto ${newItem.nome} cadastrado com sucesso no estoque!`);
    setNovoNome('');
    setNovaMarca('');
    setNovoModelo('');
    setTimeout(() => setCadSuccessMessage(''), 4000);
  };

  const handleSelectProdutoParaEdicao = (id: number) => {
    setEditProdutoId(id);
    const item = estoque.find(i => i.id === id);
    if (item) {
      setEditNome(item.nome);
      setEditCategoria(item.categoria);
      setEditMarca(item.marca);
      setEditModelo(item.modelo);
      setEditQtd(item.quantidade);
      setEditAlerta(item.alerta);
    }
  };

  const handleSalvarCorrecao = (e: React.FormEvent) => {
    e.preventDefault();
    setEstoque(estoque.map(item => {
      if (item.id === editProdutoId) {
        return {
          ...item,
          nome: editNome.toUpperCase(),
          categoria: editCategoria,
          marca: editMarca.toUpperCase(),
          modelo: editModelo.toUpperCase(),
          quantidade: Number(editQtd),
          alerta: Number(editAlerta)
        };
      }
      return item;
    }));
    setEditSuccessMessage(`Cadastro do item #${editProdutoId} atualizado com sucesso!`);
    setTimeout(() => setEditSuccessMessage(''), 4000);
  };

  const handleDescarteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descEquipamento.trim()) return;

    const newDesc: DescarteItem = {
      id: `DESC-${Date.now().toString().slice(-3)}`,
      data: new Date().toISOString().substring(0, 10),
      equipamento: descEquipamento,
      patrimonio: descPatrimonio || 'S/N',
      motivo: descMotivo || 'Desgaste natural / Defeito irreversível em bancada de testes',
      estado: 'Inutilizável',
      laudoTecnico: `Laudo Técnico de Baixa Patrimonial #${descartes.length + 13}`
    };

    setDescartes([newDesc, ...descartes]);
    setDescSuccessMessage(`Registro de descarte do equipamento ${descEquipamento} concluído!`);
    setDescEquipamento('');
    setDescPatrimonio('');
    setDescMotivo('');
    setTimeout(() => setDescSuccessMessage(''), 4000);
  };

  const handleStatusChange = (ticketId: string, newStatus: 'Aberto' | 'Em Atendimento' | 'Pendente' | 'Encerrado') => {
    setChamados(chamados.map(ticket => {
      if (ticket.id === ticketId) {
        return {
          ...ticket,
          status: newStatus,
          dataFechamento: newStatus === 'Encerrado' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined
        };
      }
      return ticket;
    }));
    if (selectedTicketForDetail && selectedTicketForDetail.id === ticketId) {
      setSelectedTicketForDetail({
        ...selectedTicketForDetail,
        status: newStatus,
        dataFechamento: newStatus === 'Encerrado' ? new Date().toISOString().replace('T', ' ').substring(0, 16) : undefined
      });
    }
  };

  // Filtered estoque table
  const filteredEstoque = estoque.filter(item => {
    const q = searchEstoque.toLowerCase().trim();
    const matchQuery = !q || (
      item.nome.toLowerCase().includes(q) ||
      item.marca.toLowerCase().includes(q) ||
      item.modelo.toLowerCase().includes(q) ||
      item.categoria.toLowerCase().includes(q)
    );
    const matchCat = selectedCategoria === 'Todas' || item.categoria.toLowerCase() === selectedCategoria.toLowerCase();
    return matchQuery && matchCat;
  });

  // Filtered chamados list
  const filteredChamados = chamados.filter(item => {
    const q = searchChamados.toLowerCase().trim();
    const matchQuery = !q || (
      item.id.toLowerCase().includes(q) ||
      item.titulo.toLowerCase().includes(q) ||
      item.solicitante.toLowerCase().includes(q) ||
      item.departamento.toLowerCase().includes(q) ||
      item.categoria.toLowerCase().includes(q)
    );
    const matchTipo = filtroTipoChamado === 'Todos' || item.tipo === filtroTipoChamado;
    const matchStatus = filtroStatusChamado === 'Todos' || item.status === filtroStatusChamado;
    return matchQuery && matchTipo && matchStatus;
  });

  const categories = ['Todas', ...Array.from(new Set(estoque.map(i => i.categoria)))];

  // The 10 mandatory navigation options in exact order requested by user:
  const NAV_ITEMS = [
    { id: 'inicio', label: 'Início', emoji: '🏠' },
    { id: 'chamados', label: 'Chamados e O.S.', emoji: '📋' },
    { id: 'consultar', label: 'Consultar Estoque', emoji: '📊' },
    { id: 'abrir', label: 'Abrir Chamados / O.S', emoji: '🎫' },
    { id: 'movimentacao', label: 'Entrada / Saída', emoji: '🔄' },
    { id: 'cadastrar', label: 'Cadastrar Produto', emoji: '🆕' },
    { id: 'correcao', label: 'Correção de Produtos', emoji: '🔧' },
    { id: 'historico', label: 'Histórico e Relatórios', emoji: '📜' },
    { id: 'descarte', label: 'Descarte de Equipamentos', emoji: '♻️' },
    { id: 'usuarios', label: 'Gerenciar Usuários', emoji: '👥' }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-red-500/20 selection:text-red-900">
      {/* Floating Return Card - Dark version for crisp contrast against light Streamlit background */}
      <FloatingPortfolioReturn theme="light" targetPath="/projetos" />

      {/* Discreet Demo Banner */}
      <div className="bg-[#f0f2f6] border-b border-[#e2e8f0] text-center py-1.5 px-4 text-[10px] font-mono text-slate-600 tracking-wider flex items-center justify-center gap-2">
        <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
        <span>AMBIENTE DE DEMONSTRAÇÃO • ÉVORA GESTÃO • PYTHON & STREAMLIT</span>
      </div>

      {!isAuthenticated ? (
        /* ==========================================================
           TELA DE LOGIN STREAMLIT (Caso o usuário clique em Sair/Logoff)
           ========================================================== */
        <div className="min-h-[calc(100vh-32px)] flex flex-col items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md space-y-6">
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              <span>Acesso ao Sistema</span>
            </h1>

            <div className="w-full rounded-lg border border-slate-200 p-6 sm:p-8 space-y-5 shadow-xs bg-white">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-semibold transition-colors cursor-pointer shadow-xs active:scale-98 text-center"
                  >
                    Entrar
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      ) : (
        /* ==========================================================
           INTERFACE STREAMLIT ÉVORA GESTÃO
           (Referência: Captura 101730 - Painel Inicial — T.I.)
           ========================================================== */
        <div className="min-h-screen flex bg-white text-slate-800 relative">
          {/* Mobile Drawer Backdrop */}
          {mobileSidebarOpen && (
            <div 
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-xs z-50 md:hidden"
              onClick={() => setMobileSidebarOpen(false)}
            />
          )}

          {/* Streamlit Light Gray Sidebar (Drawer on mobile, Collapsible on Desktop) */}
          <aside className={`
            fixed inset-y-0 left-0 z-[70] w-72 max-w-[85vw] bg-[#f0f2f6] border-r border-[#e0e4eb] flex flex-col shadow-2xl transition-transform duration-200
            md:static md:flex md:translate-x-0 md:shadow-none shrink-0
            ${mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 hidden md:flex'}
            ${sidebarCollapsed ? 'md:w-12' : 'md:w-72'}
          `}>
            {/* Top Collapse / Close Toggle */}
            <div className="p-3 flex items-center justify-between text-slate-500 border-b border-[#e5e9f0]">
              {/* On mobile: Close button */}
              <button
                type="button"
                onClick={() => setMobileSidebarOpen(false)}
                className="md:hidden p-1.5 rounded-md hover:bg-slate-200 text-slate-700 cursor-pointer active:scale-95 flex items-center gap-1.5 text-xs font-medium"
              >
                <X className="w-4 h-4" />
                <span>Fechar menu</span>
              </button>

              {/* On desktop: standard collapse/expand button */}
              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="hidden md:flex p-1 hover:text-slate-900 text-xs font-mono items-center gap-1 cursor-pointer"
                  title="Recolher menu"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>&lt;&lt;</span>
                </button>
              )}
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="hidden md:block p-1 hover:text-slate-900 mx-auto cursor-pointer"
                  title="Expandir menu"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {(!sidebarCollapsed || mobileSidebarOpen) && (
              <div className="p-5 flex-1 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Greeting matching screenshot 2: "👋 Olá, Paulo Victtor" */}
                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
                      <span>👋</span>
                      <span>Olá, Paulo Victtor</span>
                    </h2>
                  </div>

                  {/* Radio Group Navigation matching Streamlit radio circles */}
                  <div className="space-y-3">
                    <span className="text-xs font-semibold text-slate-600 block">
                      Navegação
                    </span>

                    <div className="space-y-1 text-xs">
                      {NAV_ITEMS.map((item) => {
                        const selected = currentNav === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => selectNav(item.id)}
                            className={`w-full flex items-center gap-2.5 py-1.5 px-2 rounded-md transition-colors text-left cursor-pointer ${
                              selected ? 'text-slate-900 font-semibold' : 'text-slate-700 hover:text-slate-900'
                            }`}
                          >
                            {/* Streamlit Signature Radio Dot */}
                            <span className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 ${
                              selected ? 'border-red-500 bg-white' : 'border-slate-400 bg-transparent'
                            }`}>
                              {selected && <span className="w-2 h-2 rounded-full bg-red-500" />}
                            </span>

                            <span className="text-sm">{item.emoji}</span>
                            <span className="truncate">{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>

                {/* Sair / Logoff button matching screenshot 2 */}
                <div className="pt-6 border-t border-[#e2e8f0]">
                  <button
                    onClick={() => { setIsAuthenticated(false); setMobileSidebarOpen(false); }}
                    className="w-full py-1.5 px-3 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium shadow-xs transition-colors cursor-pointer"
                  >
                    Sair / Logoff
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Streamlit Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-white p-4 sm:p-6 lg:p-10 w-full overflow-x-hidden">
            {/* Streamlit Top Header with Mobile Hamburger */}
            <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-100 mb-4 sm:mb-6">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileSidebarOpen(true)}
                  className="md:hidden flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#f0f2f6] hover:bg-[#e2e8f0] text-slate-800 text-xs font-semibold cursor-pointer active:scale-95 border border-slate-300 shadow-2xs"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="w-4 h-4 text-red-500" />
                  <span>Menu</span>
                </button>

                <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                  <span>Évora Gestão</span>
                  <span>/</span>
                  <span className="font-semibold text-slate-800 capitalize">
                    {NAV_ITEMS.find(n => n.id === currentNav)?.label || currentNav}
                  </span>
                </div>
              </div>

              {/* Quick toggle to inspect populated vs empty state */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={toggleSampleTickets}
                  className="text-[11px] font-mono px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200 transition-colors cursor-pointer"
                  title="Alterna entre o estado inicial vazio da captura e dados preenchidos de demonstração"
                >
                  {chamados.length === 0 ? '⚡ Carregar Chamados Exemplo' : '🔄 Resetar para Estado Captura'}
                </button>
              </div>
            </div>

            {/* ==========================================================
                1. 🏠 PAINEL INICIAL — T.I. (EXACT MATCH CAPTURA 101730)
                ========================================================== */}
            {currentNav === 'inicio' && (
              <div className="space-y-8 animate-fadeIn">
                {/* Title and subtitle matching screenshot 2 */}
                <div className="space-y-1">
                  <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                    <span className="text-3xl sm:text-4xl">🏠</span>
                    <span>Painel Inicial — T.I.</span>
                  </h1>
                  <p className="text-sm text-slate-600">
                    Resumo dos chamados, ordens de serviço e equipamentos cadastrados
                  </p>
                </div>

                {/* 6 Key Metrics Grid matching screenshot 2 exactly */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8 pt-2">
                  {/* Chamados abertos */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      Chamados abertos
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {chamadosAbertos}
                    </span>
                  </div>

                  {/* Chamados pendentes */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      Chamados pendentes
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {chamadosPendentes}
                    </span>
                  </div>

                  {/* Chamados encerrados */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      Chamados encerrados
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {chamadosEncerrados}
                    </span>
                  </div>

                  {/* O.S. abertas */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      O.S. abertas
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {osAbertas}
                    </span>
                  </div>

                  {/* O.S. encerradas */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      O.S. encerradas
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {osEncerradas}
                    </span>
                  </div>

                  {/* Produtos cadastrados: Exactly 32 as in screenshot 2 */}
                  <div className="space-y-1">
                    <span className="text-xs font-medium text-slate-600 block">
                      Produtos cadastrados
                    </span>
                    <span className="text-4xl sm:text-5xl font-light text-slate-900 block font-sans">
                      {produtosCadastrados}
                    </span>
                  </div>
                </div>

                {/* Bottom Two Sections matching screenshot 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-4">
                  {/* Left: Distribuição dos chamados */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Distribuição dos chamados
                    </h2>

                    {chamados.length === 0 ? (
                      /* Exact blue info banner from screenshot 2 */
                      <div className="p-4 rounded-lg bg-[#e8f0fe] text-[#1967d2] text-sm font-medium border border-[#d2e3fc]">
                        Sem chamados para exibir.
                      </div>
                    ) : (
                      <div className="space-y-4 p-5 rounded-lg border border-slate-200 bg-white shadow-2xs">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Total de requisições: {chamados.length}</span>
                          <span className="text-emerald-600 font-semibold">
                            {chamados.filter(c => c.status === 'Encerrado').length} finalizados
                          </span>
                        </div>

                        {/* Visual distribution bar */}
                        <div className="h-4 w-full bg-slate-100 rounded-full overflow-hidden flex">
                          <div 
                            style={{ width: `${(chamadosAbertos / chamados.length) * 100}%` }}
                            className="bg-amber-500 h-full" 
                            title={`Abertos: ${chamadosAbertos}`}
                          />
                          <div 
                            style={{ width: `${(chamadosPendentes / chamados.length) * 100}%` }}
                            className="bg-rose-500 h-full" 
                            title={`Pendentes: ${chamadosPendentes}`}
                          />
                          <div 
                            style={{ width: `${(osAbertas / chamados.length) * 100}%` }}
                            className="bg-blue-500 h-full" 
                            title={`Em Atendimento / O.S.: ${osAbertas}`}
                          />
                          <div 
                            style={{ width: `${(chamadosEncerrados / chamados.length) * 100}%` }}
                            className="bg-emerald-500 h-full" 
                            title={`Encerrados: ${chamadosEncerrados}`}
                          />
                        </div>

                        {/* Legend */}
                        <div className="grid grid-cols-2 gap-2 text-xs pt-2">
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                            <span>Abertos ({chamadosAbertos})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                            <span>Pendentes ({chamadosPendentes})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                            <span>Em Atendimento ({osAbertas})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                            <span>Encerrados ({chamadosEncerrados})</span>
                          </div>
                        </div>

                        <div className="pt-2 border-t border-slate-100">
                          <button
                            onClick={() => selectNav('chamados')}
                            className="text-xs text-red-600 hover:text-red-700 font-semibold cursor-pointer"
                          >
                            Ver fila detalhada de chamados &rarr;
                          </button>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Ordens de serviço */}
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold text-slate-900 tracking-tight">
                      Ordens de serviço
                    </h2>

                    {chamados.filter(c => c.tipo === 'Ordem de Serviço').length === 0 ? (
                      /* Streamlit axis line with 0.000000 baseline as seen in screenshot 2 */
                      <div className="pt-12 sm:pt-16 pb-6 text-slate-400 font-mono text-xs border-b border-slate-200">
                        <span className="text-[11px] block text-slate-400">0.000000</span>
                      </div>
                    ) : (
                      <div className="space-y-4 p-5 rounded-lg border border-slate-200 bg-white shadow-2xs">
                        <div className="flex items-center justify-between text-xs text-slate-600">
                          <span>Volume de O.S. Ativas: {osAbertas}</span>
                          <span>Concluídas: {osEncerradas}</span>
                        </div>

                        <div className="space-y-2 pt-2">
                          {chamados.filter(c => c.tipo === 'Ordem de Serviço').map(os => (
                            <div key={os.id} className="p-2.5 rounded-md bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                              <div>
                                <span className="font-bold text-slate-900 mr-2">{os.id}</span>
                                <span className="text-slate-700">{os.titulo}</span>
                              </div>
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                os.status === 'Encerrado' ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-100 text-blue-800'
                              }`}>
                                {os.status}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Action Shortcuts */}
                <div className="pt-6 border-t border-slate-200">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-3 font-mono">
                    Ações Rápidas de Operação
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => selectNav('abrir')}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <span className="text-base block mb-1">🎫</span>
                      <span className="text-xs font-bold text-slate-900 block">Abrir Chamado / O.S.</span>
                      <span className="text-[11px] text-slate-500">Registrar nova solicitação de suporte</span>
                    </button>

                    <button
                      onClick={() => selectNav('consultar')}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <span className="text-base block mb-1">📊</span>
                      <span className="text-xs font-bold text-slate-900 block">Consultar Estoque</span>
                      <span className="text-[11px] text-slate-500">Ver saldos e alertas de suprimentos</span>
                    </button>

                    <button
                      onClick={() => selectNav('movimentacao')}
                      className="p-3 rounded-lg border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-white text-left transition-all cursor-pointer shadow-2xs"
                    >
                      <span className="text-base block mb-1">🔄</span>
                      <span className="text-xs font-bold text-slate-900 block">Entrada / Saída</span>
                      <span className="text-[11px] text-slate-500">Registrar movimentações de insumos</span>
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================
                2. 📋 CHAMADOS E O.S. (FILA, FILTROS, STATUS & TERMOS)
                ========================================================== */}
            {currentNav === 'chamados' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                      <span>📋</span>
                      <span>Chamados e Ordens de Serviço</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1">
                      Fila centralizada de tickets e atendimentos técnicos de campo
                    </p>
                  </div>

                  <button
                    onClick={() => selectNav('abrir')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-red-600 hover:bg-red-700 text-white text-xs font-semibold cursor-pointer shadow-xs active:scale-98"
                  >
                    <PlusCircle className="w-4 h-4" />
                    <span>Novo Chamado / O.S.</span>
                  </button>
                </div>

                {/* Filter and Search Bar */}
                <div className="p-4 rounded-lg bg-[#f0f2f6] border border-[#e0e4eb] space-y-3">
                  <div className="flex flex-col md:flex-row gap-3">
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder="Buscar por ID, solicitante, departamento, assunto..."
                        value={searchChamados}
                        onChange={(e) => setSearchChamados(e.target.value)}
                        className="w-full pl-9 pr-3 py-2 text-xs rounded-md bg-white border border-slate-300 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div className="flex items-center gap-2">
                      <select
                        value={filtroTipoChamado}
                        onChange={(e) => setFiltroTipoChamado(e.target.value)}
                        className="text-xs py-2 px-3 rounded-md bg-white border border-slate-300 focus:outline-none cursor-pointer"
                      >
                        <option value="Todos">Tipo: Todos</option>
                        <option value="Chamado">Somente Chamados</option>
                        <option value="Ordem de Serviço">Somente Ordens de Serviço</option>
                      </select>

                      <select
                        value={filtroStatusChamado}
                        onChange={(e) => setFiltroStatusChamado(e.target.value)}
                        className="text-xs py-2 px-3 rounded-md bg-white border border-slate-300 focus:outline-none cursor-pointer"
                      >
                        <option value="Todos">Status: Todos</option>
                        <option value="Aberto">Aberto</option>
                        <option value="Em Atendimento">Em Atendimento</option>
                        <option value="Pendente">Pendente</option>
                        <option value="Encerrado">Encerrado</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Tickets Table */}
                {filteredChamados.length === 0 ? (
                  <div className="p-8 text-center rounded-lg border border-dashed border-slate-300 bg-slate-50 space-y-3">
                    <p className="text-sm font-medium text-slate-600">
                      Nenhum chamado ou ordem de serviço encontrado.
                    </p>
                    <button
                      onClick={toggleSampleTickets}
                      className="px-4 py-2 text-xs font-semibold text-slate-800 bg-white border border-slate-300 rounded-md shadow-xs hover:bg-slate-100 cursor-pointer"
                    >
                      Carregar Chamados de Exemplo
                    </button>
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                          <th className="py-2.5 px-3">ID</th>
                          <th className="py-2.5 px-3">Tipo</th>
                          <th className="py-2.5 px-3">Título / Ocorrência</th>
                          <th className="py-2.5 px-3">Solicitante</th>
                          <th className="py-2.5 px-3">Depto</th>
                          <th className="py-2.5 px-3">Prioridade</th>
                          <th className="py-2.5 px-3">Status</th>
                          <th className="py-2.5 px-3">Ações</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {filteredChamados.map((ticket) => (
                          <tr key={ticket.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-bold text-slate-900 whitespace-nowrap">
                              {ticket.id}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-medium ${
                                ticket.tipo === 'Ordem de Serviço' ? 'bg-indigo-100 text-indigo-800' : 'bg-slate-100 text-slate-700'
                              }`}>
                                {ticket.tipo}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-medium text-slate-900 max-w-xs truncate">
                              {ticket.titulo}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 whitespace-nowrap">
                              {ticket.solicitante}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 whitespace-nowrap">
                              {ticket.departamento}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                ticket.prioridade === 'Crítica' ? 'bg-rose-100 text-rose-800' :
                                ticket.prioridade === 'Alta' ? 'bg-orange-100 text-orange-800' :
                                ticket.prioridade === 'Média' ? 'bg-amber-100 text-amber-800' :
                                'bg-slate-100 text-slate-700'
                              }`}>
                                {ticket.prioridade}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                ticket.status === 'Encerrado' ? 'bg-emerald-100 text-emerald-800' :
                                ticket.status === 'Em Atendimento' ? 'bg-blue-100 text-blue-800' :
                                ticket.status === 'Pendente' ? 'bg-rose-100 text-rose-800' :
                                'bg-amber-100 text-amber-800'
                              }`}>
                                {ticket.status}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <div className="flex items-center gap-1.5">
                                <button
                                  onClick={() => setSelectedTicketForDetail(ticket)}
                                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium cursor-pointer"
                                  title="Ver Detalhes do Chamado"
                                >
                                  Detalhes
                                </button>

                                <button
                                  onClick={() => setActivePdfModal({
                                    titulo: `Termo de Atendimento Técnico • ${ticket.id}`,
                                    subtitulo: `${ticket.tipo} — Solicitante: ${ticket.solicitante} (${ticket.departamento})`,
                                    tipo: 'termo',
                                    dataRef: ticket.dataAbertura
                                  })}
                                  className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium cursor-pointer flex items-center gap-1"
                                  title="Emitir Termo PDF com ReportLab"
                                >
                                  <FileText className="w-3 h-3 text-red-500" />
                                  <span>PDF</span>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* ==========================================================
                3. 📊 CONSULTAR ESTOQUE (INVENTÁRIO STREAMLIT)
                ========================================================== */}
            {currentNav === 'consultar' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>📊</span>
                    <span>Consulta de Estoque</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Posição em tempo real de equipamentos, peças e insumos com alertas de reposição
                  </p>
                </div>

                {/* Filter Controls */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div className="sm:col-span-2 relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Pesquisar por nome do produto, marca, modelo ou categoria..."
                      value={searchEstoque}
                      onChange={(e) => setSearchEstoque(e.target.value)}
                      className="w-full pl-9 pr-3 py-2 text-xs rounded-md bg-[#f0f2f6] border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    />
                  </div>

                  <div>
                    <select
                      value={selectedCategoria}
                      onChange={(e) => setSelectedCategoria(e.target.value)}
                      className="w-full text-xs py-2 px-3 rounded-md bg-[#f0f2f6] border border-slate-200 focus:outline-none cursor-pointer"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat}>
                          Categoria: {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Streamlit Metric Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-500 block text-[11px]">Total de Itens</span>
                    <span className="text-xl font-bold text-slate-900">{estoque.length}</span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-500 block text-[11px]">Unidades em Saldo</span>
                    <span className="text-xl font-bold text-slate-900">
                      {estoque.reduce((acc, i) => acc + i.quantidade, 0)}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-500 block text-[11px]">Alertas de Reposição</span>
                    <span className="text-xl font-bold text-amber-600">
                      {estoque.filter(i => i.quantidade <= i.alerta).length}
                    </span>
                  </div>
                  <div className="p-3 rounded-lg border border-slate-200 bg-white">
                    <span className="text-slate-500 block text-[11px]">Banco Relacional</span>
                    <span className="text-xl font-bold text-emerald-600 font-mono text-sm">PostgreSQL</span>
                  </div>
                </div>

                {/* Estoque Table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                        <th className="py-2.5 px-3">#</th>
                        <th className="py-2.5 px-3">Produto</th>
                        <th className="py-2.5 px-3">Marca / Modelo</th>
                        <th className="py-2.5 px-3">Categoria</th>
                        <th className="py-2.5 px-3 text-right">Saldo</th>
                        <th className="py-2.5 px-3 text-right">Mínimo</th>
                        <th className="py-2.5 px-3 text-center">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {filteredEstoque.map((item) => {
                        const isLow = item.quantidade <= item.alerta;
                        return (
                          <tr key={item.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                              {item.id}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {item.nome}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                              {item.marca} • {item.modelo}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-mono text-[10px]">
                                {item.categoria}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                              {item.quantidade}
                            </td>
                            <td className="py-2.5 px-3 text-right text-slate-500 font-mono">
                              {item.alerta}
                            </td>
                            <td className="py-2.5 px-3 text-center">
                              {isLow ? (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-semibold">
                                  <AlertCircle className="w-3 h-3 text-amber-600" />
                                  <span>Repor</span>
                                </span>
                              ) : (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-semibold">
                                  <Check className="w-3 h-3 text-emerald-600" />
                                  <span>Normal</span>
                                </span>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ==========================================================
                4. 🎫 ABRIR CHAMADOS / O.S (FORMULÁRIO STREAMLIT)
                ========================================================== */}
            {currentNav === 'abrir' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>🎫</span>
                    <span>Abertura de Chamado / Ordem de Serviço</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Registre uma nova demanda de suporte técnico ou manutenção de infraestrutura
                  </p>
                </div>

                {chamadoSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{chamadoSuccessMessage}</span>
                  </div>
                )}

                <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-4">
                  <form onSubmit={handleNovoChamadoSubmit} className="space-y-4 text-xs">
                    {/* Tipo Selector */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        Tipo de Requisição
                      </label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="tipoChamado"
                            checked={novoChamadoTipo === 'Chamado'}
                            onChange={() => setNovoChamadoTipo('Chamado')}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-slate-800 font-medium">Chamado Técnico (Incidente / Requisição)</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="tipoChamado"
                            checked={novoChamadoTipo === 'Ordem de Serviço'}
                            onChange={() => setNovoChamadoTipo('Ordem de Serviço')}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-slate-800 font-medium">Ordem de Serviço (O.S. / Manutenção)</span>
                        </label>
                      </div>
                    </div>

                    {/* Título */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        Assunto / Título do Chamado
                      </label>
                      <input
                        type="text"
                        placeholder="Ex: Troca de fonte em estação do faturamento ou Configuração de ramal"
                        value={novoChamadoTitulo}
                        onChange={(e) => setNovoChamadoTitulo(e.target.value)}
                        required
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    {/* Solicitante e Departamento */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">
                          Solicitante / Colaborador
                        </label>
                        <input
                          type="text"
                          placeholder="Ex: Carlos Eduardo ou Fernanda Martins"
                          value={novoChamadoSolicitante}
                          onChange={(e) => setNovoChamadoSolicitante(e.target.value)}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">
                          Departamento / Unidade
                        </label>
                        <select
                          value={novoChamadoDepto}
                          onChange={(e) => setNovoChamadoDepto(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                        >
                          <option value="Financeiro">Financeiro / Contas</option>
                          <option value="Contabilidade">Contabilidade / Fiscal</option>
                          <option value="Recursos Humanos">Recursos Humanos (RH)</option>
                          <option value="Expedição">Expedição / Logística</option>
                          <option value="Diretoria">Diretoria Executiva</option>
                          <option value="Infraestrutura">Infraestrutura & Redes</option>
                          <option value="Comercial">Comercial / Vendas</option>
                        </select>
                      </div>
                    </div>

                    {/* Prioridade e Categoria */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">
                          Prioridade
                        </label>
                        <select
                          value={novoChamadoPrioridade}
                          onChange={(e) => setNovoChamadoPrioridade(e.target.value as any)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                        >
                          <option value="Baixa">Baixa (Dúvidas e melhorias)</option>
                          <option value="Média">Média (Atendimento normal)</option>
                          <option value="Alta">Alta (Impacta atividade do usuário)</option>
                          <option value="Crítica">Crítica (Setor ou serviço parado)</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">
                          Categoria Operacional
                        </label>
                        <select
                          value={novoChamadoCategoria}
                          onChange={(e) => setNovoChamadoCategoria(e.target.value as any)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                        >
                          <option value="Hardware">Hardware & Peças</option>
                          <option value="Redes">Redes & Conectividade</option>
                          <option value="Acessos">Acessos & Permissões</option>
                          <option value="Impressoras">Impressoras & Consumíveis</option>
                          <option value="Sistemas">Sistemas & Softwares</option>
                          <option value="Infraestrutura">Infraestrutura Geral</option>
                        </select>
                      </div>
                    </div>

                    {/* Equipamento / Insumo Vinculado */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        Equipamento ou Peça do Estoque (Opcional)
                      </label>
                      <select
                        value={novoChamadoEquipamento}
                        onChange={(e) => setNovoChamadoEquipamento(e.target.value)}
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                      >
                        <option value="">Nenhum equipamento vinculado</option>
                        {estoque.map(item => (
                          <option key={item.id} value={item.nome}>
                            {item.nome} (Saldo atual: {item.quantidade})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Descrição Detalhada */}
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">
                        Descrição Detalhada do Problema / Diagnóstico Inicial
                      </label>
                      <textarea
                        rows={3}
                        placeholder="Relato detalhado da ocorrência ou procedimento de campo a ser executado..."
                        value={novoChamadoDescricao}
                        onChange={(e) => setNovoChamadoDescricao(e.target.value)}
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="py-2 px-5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs active:scale-98 transition-colors"
                      >
                        Salvar e Abrir {novoChamadoTipo}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================
                5. 🔄 ENTRADA / SAÍDA (MOVIMENTAÇÃO DE ESTOQUE)
                ========================================================== */}
            {currentNav === 'movimentacao' && (
              <div className="space-y-6 max-w-4xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>🔄</span>
                    <span>Movimentação de Estoque</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Registro de baixas para atendimentos técnicos e entradas de reposição
                  </p>
                </div>

                {movSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{movSuccessMessage}</span>
                  </div>
                )}

                <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-4">
                  <form onSubmit={handleMovimentacaoSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Tipo de Movimento</label>
                      <div className="flex gap-4">
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="movTipo"
                            checked={movTipo === 'Saída'}
                            onChange={() => setMovTipo('Saída')}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-slate-800 font-medium">Saída (Requisição / Atendimento Técnico)</span>
                        </label>
                        <label className="inline-flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="movTipo"
                            checked={movTipo === 'Entrada'}
                            onChange={() => setMovTipo('Entrada')}
                            className="text-red-600 focus:ring-red-500"
                          />
                          <span className="text-slate-800 font-medium">Entrada (Compra / Devolução)</span>
                        </label>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Produto</label>
                        <select
                          value={movProdutoId}
                          onChange={(e) => setMovProdutoId(Number(e.target.value))}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                        >
                          {estoque.map((item) => (
                            <option key={item.id} value={item.id}>
                              {item.nome} (Saldo atual: {item.quantidade})
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Quantidade</label>
                        <input
                          type="number"
                          min="1"
                          value={movQtd}
                          onChange={(e) => setMovQtd(Number(e.target.value))}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Motivo / Finalidade</label>
                        <input
                          type="text"
                          placeholder="Ex: Troca de peça com defeito no setor financeiro"
                          value={movMotivo}
                          onChange={(e) => setMovMotivo(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Chamado / NF-e Vinculada</label>
                        <input
                          type="text"
                          placeholder="Ex: CH-2026-001 ou NF-e 4521"
                          value={movDocRef}
                          onChange={(e) => setMovDocRef(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="py-2 px-5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs active:scale-98 transition-colors"
                      >
                        Registrar Movimentação
                      </button>
                    </div>
                  </form>
                </div>

                {/* Movimentações Recentes */}
                <div className="space-y-3 pt-4">
                  <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                    Últimas Transações Registradas
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                          <th className="py-2.5 px-3">Data/Hora</th>
                          <th className="py-2.5 px-3">Tipo</th>
                          <th className="py-2.5 px-3">Produto</th>
                          <th className="py-2.5 px-3 text-right">Qtd</th>
                          <th className="py-2.5 px-3">Motivo / Vínculo</th>
                          <th className="py-2.5 px-3">Responsável</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {movimentacoes.map((mov) => (
                          <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                              {mov.dataHora}
                            </td>
                            <td className="py-2.5 px-3 whitespace-nowrap">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                mov.tipo === 'Entrada' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {mov.tipo}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {mov.produto}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                              {mov.quantidade}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {mov.motivo} {mov.documentoRef && <span className="font-mono text-slate-500">({mov.documentoRef})</span>}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 font-mono text-[11px]">
                              {mov.responsavel}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================
                6. 🆕 CADASTRAR PRODUTO (NOVO ITEM NO ESTOQUE)
                ========================================================== */}
            {currentNav === 'cadastrar' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>🆕</span>
                    <span>Cadastrar Novo Produto</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Adicione um novo item ou componente ao almoxarifado de TI
                  </p>
                </div>

                {cadSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cadSuccessMessage}</span>
                  </div>
                )}

                <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-4">
                  <form onSubmit={handleCadastroSubmit} className="space-y-4 text-xs">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Nome do Produto</label>
                      <input
                        type="text"
                        placeholder="Ex: SSD NVME 1TB PCIE GEN4"
                        value={novoNome}
                        onChange={(e) => setNovoNome(e.target.value)}
                        required
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Categoria</label>
                        <select
                          value={novaCategoria}
                          onChange={(e) => setNovaCategoria(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer"
                        >
                          <option value="periféricos">Periféricos</option>
                          <option value="armazenamento">Armazenamento</option>
                          <option value="memória">Memória RAM</option>
                          <option value="redes">Redes & Conectividade</option>
                          <option value="cabos">Cabos & Adaptadores</option>
                          <option value="impressão">Impressão & Toners</option>
                          <option value="ferramentas">Ferramentas de Bancada</option>
                          <option value="nobreak">Nobreaks & Baterias</option>
                          <option value="insumos">Insumos Químicos</option>
                        </select>
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Marca / Fabricante</label>
                        <input
                          type="text"
                          placeholder="Ex: Kingston, Corsair, Dell, Furukawa"
                          value={novaMarca}
                          onChange={(e) => setNovaMarca(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Modelo / Part Number</label>
                        <input
                          type="text"
                          placeholder="Ex: KC3000 / NV2"
                          value={novoModelo}
                          onChange={(e) => setNovoModelo(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Quantidade Inicial</label>
                        <input
                          type="number"
                          min="1"
                          value={novaQtd}
                          onChange={(e) => setNovaQtd(Number(e.target.value))}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Nível de Alerta (Mínimo)</label>
                        <input
                          type="number"
                          min="1"
                          value={novoAlerta}
                          onChange={(e) => setNovoAlerta(Number(e.target.value))}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="py-2 px-5 rounded-md bg-red-600 hover:bg-red-700 text-white font-semibold text-xs cursor-pointer shadow-xs active:scale-98 transition-colors"
                      >
                        Cadastrar no Estoque
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================
                7. 🔧 CORREÇÃO DE PRODUTOS (AJUSTE CADASTRO & SALDO)
                ========================================================== */}
            {currentNav === 'correcao' && (
              <div className="space-y-6 max-w-3xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>🔧</span>
                    <span>Correção de Produtos</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Ajuste administrativo de especificações técnicas e conferência física de saldo
                  </p>
                </div>

                {editSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{editSuccessMessage}</span>
                  </div>
                )}

                <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-4">
                  <div className="space-y-1.5 text-xs">
                    <label className="font-semibold text-slate-700 block">Selecione o Produto para Edição</label>
                    <select
                      value={editProdutoId}
                      onChange={(e) => handleSelectProdutoParaEdicao(Number(e.target.value))}
                      className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40 cursor-pointer font-medium"
                    >
                      {estoque.map((item) => (
                        <option key={item.id} value={item.id}>
                          #{item.id} — {item.nome} ({item.marca} - Saldo: {item.quantidade})
                        </option>
                      ))}
                    </select>
                  </div>

                  <form onSubmit={handleSalvarCorrecao} className="space-y-4 text-xs pt-2">
                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Nome do Produto</label>
                      <input
                        type="text"
                        value={editNome}
                        onChange={(e) => setEditNome(e.target.value)}
                        required
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Categoria</label>
                        <input
                          type="text"
                          value={editCategoria}
                          onChange={(e) => setEditCategoria(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Marca</label>
                        <input
                          type="text"
                          value={editMarca}
                          onChange={(e) => setEditMarca(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Modelo</label>
                        <input
                          type="text"
                          value={editModelo}
                          onChange={(e) => setEditModelo(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Saldo em Estoque</label>
                        <input
                          type="number"
                          value={editQtd}
                          onChange={(e) => setEditQtd(Number(e.target.value))}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Alerta Mínimo</label>
                        <input
                          type="number"
                          value={editAlerta}
                          onChange={(e) => setEditAlerta(Number(e.target.value))}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="py-2 px-5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs active:scale-98 transition-colors"
                      >
                        Salvar Alterações
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

            {/* ==========================================================
                8. 📜 HISTÓRICO E RELATÓRIOS (REPORTLAB PDF)
                ========================================================== */}
            {currentNav === 'historico' && (
              <div className="space-y-6 max-w-4xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>📜</span>
                    <span>Histórico e Relatórios</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Trilha de auditoria das movimentações e emissão de relatórios gerenciais em PDF com ReportLab
                  </p>
                </div>

                {/* PDF Generation Cards (ReportLab) */}
                <div className="p-5 rounded-lg border border-slate-200 bg-[#f8fafc] space-y-4">
                  <div className="flex items-center gap-2 text-xs font-bold text-slate-800 uppercase tracking-wider font-mono">
                    <FileText className="w-4 h-4 text-red-500" />
                    <span>Módulo de Emissão Programática de Documentos em PDF (ReportLab)</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <button
                      onClick={() => setActivePdfModal({
                        titulo: 'Inventário Geral Consolidado de TI',
                        subtitulo: `Relatório oficial de saldos, posições e patrimônio de TI — Total: ${estoque.length} produtos`,
                        tipo: 'inventario',
                        dataRef: new Date().toLocaleDateString('pt-BR')
                      })}
                      className="p-3.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-left cursor-pointer transition-all shadow-2xs group"
                    >
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-red-600 transition-colors">
                        📄 Relatório de Estoque Geral
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Gera PDF com listagem, marcas, modelos e saldos
                      </span>
                    </button>

                    <button
                      onClick={() => setActivePdfModal({
                        titulo: 'Relatório Mensal de Chamados e Ordens de Serviço',
                        subtitulo: `Consolidado de atendimentos, SLA e status operacional — Mês Vigente`,
                        tipo: 'chamados',
                        dataRef: new Date().toLocaleDateString('pt-BR')
                      })}
                      className="p-3.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-left cursor-pointer transition-all shadow-2xs group"
                    >
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-red-600 transition-colors">
                        📄 Relatório de Chamados & O.S.
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Gera PDF com métricas e histórico de solicitações
                      </span>
                    </button>

                    <button
                      onClick={() => setActivePdfModal({
                        titulo: 'Termo de Responsabilidade e Entrega de Equipamento',
                        subtitulo: 'Documento legal de entrega de insumos e cautela com assinatura',
                        tipo: 'termo',
                        dataRef: new Date().toLocaleDateString('pt-BR')
                      })}
                      className="p-3.5 rounded-lg bg-white border border-slate-200 hover:border-slate-300 text-left cursor-pointer transition-all shadow-2xs group"
                    >
                      <span className="text-xs font-bold text-slate-900 block group-hover:text-red-600 transition-colors">
                        📄 Termo de Cautela e Entrega
                      </span>
                      <span className="text-[11px] text-slate-500 mt-1 block">
                        Gera termo formal para coleta de assinatura
                      </span>
                    </button>
                  </div>
                </div>

                {/* Histórico Completo de Transações */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                    Trilha de Auditoria das Movimentações
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                          <th className="py-2.5 px-3">Código</th>
                          <th className="py-2.5 px-3">Data e Hora</th>
                          <th className="py-2.5 px-3">Operação</th>
                          <th className="py-2.5 px-3">Item Movimentado</th>
                          <th className="py-2.5 px-3 text-right">Qtd</th>
                          <th className="py-2.5 px-3">Motivo / Vínculo Técnico</th>
                          <th className="py-2.5 px-3">Responsável</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {movimentacoes.map((mov) => (
                          <tr key={mov.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                              {mov.id}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                              {mov.dataHora}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                                mov.tipo === 'Entrada' ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                              }`}>
                                {mov.tipo}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {mov.produto}
                            </td>
                            <td className="py-2.5 px-3 text-right font-bold text-slate-900">
                              {mov.quantidade}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {mov.motivo}
                            </td>
                            <td className="py-2.5 px-3 text-slate-700 font-mono text-[11px]">
                              {mov.responsavel}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================
                9. ♻️ DESCARTE DE EQUIPAMENTOS (BAIXA PATRIMONIAL)
                ========================================================== */}
            {currentNav === 'descarte' && (
              <div className="space-y-6 max-w-4xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>♻️</span>
                    <span>Descarte de Equipamentos</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Registro de baixa patrimonial, laudos técnicos e destinação de lixo eletrônico
                  </p>
                </div>

                {descSuccessMessage && (
                  <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{descSuccessMessage}</span>
                  </div>
                )}

                {/* Form Descarte */}
                <div className="p-6 rounded-lg border border-slate-200 bg-white shadow-2xs space-y-4">
                  <form onSubmit={handleDescarteSubmit} className="space-y-4 text-xs">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Equipamento a Descartar</label>
                        <input
                          type="text"
                          placeholder="Ex: Switch 16 portas com portas queimadas"
                          value={descEquipamento}
                          onChange={(e) => setDescEquipamento(e.target.value)}
                          required
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>

                      <div className="space-y-1.5">
                        <label className="font-semibold text-slate-700 block">Patrimônio / Etiqueta</label>
                        <input
                          type="text"
                          placeholder="Ex: PAT-00521"
                          value={descPatrimonio}
                          onChange={(e) => setDescPatrimonio(e.target.value)}
                          className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-semibold text-slate-700 block">Justificativa Técnica / Laudo de Inutilização</label>
                      <input
                        type="text"
                        placeholder="Ex: Placa mãe com curto-circuito irreparável após pico de tensão"
                        value={descMotivo}
                        onChange={(e) => setDescMotivo(e.target.value)}
                        required
                        className="w-full bg-[#f0f2f6] border border-slate-200 rounded-md py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                      />
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="py-2 px-5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs cursor-pointer shadow-xs active:scale-98 transition-colors"
                      >
                        Registrar Baixa Patrimonial
                      </button>
                    </div>
                  </form>
                </div>

                {/* Tabela de Descartes */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-bold text-slate-900 font-mono uppercase tracking-wider">
                    Equipamentos Baixados e Destinados a Descarte
                  </h3>
                  <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                    <table className="w-full text-left text-xs border-collapse">
                      <thead>
                        <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                          <th className="py-2.5 px-3">Data</th>
                          <th className="py-2.5 px-3">Equipamento</th>
                          <th className="py-2.5 px-3">Patrimônio</th>
                          <th className="py-2.5 px-3">Motivo / Parecer Técnico</th>
                          <th className="py-2.5 px-3">Estado</th>
                          <th className="py-2.5 px-3">Laudo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200 bg-white">
                        {descartes.map((desc) => (
                          <tr key={desc.id} className="hover:bg-slate-50 transition-colors">
                            <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px] whitespace-nowrap">
                              {desc.data}
                            </td>
                            <td className="py-2.5 px-3 font-semibold text-slate-900">
                              {desc.equipamento}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-600">
                              {desc.patrimonio}
                            </td>
                            <td className="py-2.5 px-3 text-slate-600">
                              {desc.motivo}
                            </td>
                            <td className="py-2.5 px-3">
                              <span className="px-2 py-0.5 rounded bg-rose-100 text-rose-800 text-[10px] font-semibold">
                                {desc.estado}
                              </span>
                            </td>
                            <td className="py-2.5 px-3 font-mono text-slate-500 text-[11px]">
                              {desc.laudoTecnico}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ==========================================================
                10. 👥 GERENCIAR USUÁRIOS (RBAC & CONTROLE DE ACESSO)
                ========================================================== */}
            {currentNav === 'usuarios' && (
              <div className="space-y-6 max-w-4xl animate-fadeIn">
                <div className="space-y-1">
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <span>👥</span>
                    <span>Gerenciar Usuários</span>
                  </h1>
                  <p className="text-xs sm:text-sm text-slate-600">
                    Controle de operadores, permissões de acesso baseadas em função (RBAC) e auditoria
                  </p>
                </div>

                <div className="p-4 rounded-lg bg-[#e8f0fe] border border-[#d2e3fc] text-[#1967d2] text-xs font-medium flex items-center gap-2.5">
                  <ShieldCheck className="w-4 h-4 shrink-0" />
                  <span>
                    O sistema Évora Gestão opera com autenticação integrada ao Supabase Auth e controle de permissões por perfil (Super Admin, Administrador, Técnico N2, Técnico N1 e Almoxarifado).
                  </span>
                </div>

                {/* Usuários Table */}
                <div className="overflow-x-auto rounded-lg border border-slate-200 shadow-2xs">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead>
                      <tr className="bg-[#f0f2f6] text-slate-700 font-semibold border-b border-slate-200">
                        <th className="py-2.5 px-3">Usuário</th>
                        <th className="py-2.5 px-3">E-mail Corporativo</th>
                        <th className="py-2.5 px-3">Cargo / Função</th>
                        <th className="py-2.5 px-3">Nível de Permissão (RBAC)</th>
                        <th className="py-2.5 px-3">Status</th>
                        <th className="py-2.5 px-3">Último Acesso</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200 bg-white">
                      {usuarios.map((user) => (
                        <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                          <td className="py-2.5 px-3">
                            <div className="font-semibold text-slate-900">{user.nome}</div>
                            <div className="text-[10px] text-slate-500 font-mono">@{user.usuario}</div>
                          </td>
                          <td className="py-2.5 px-3 text-slate-600 font-mono text-[11px]">
                            {user.email}
                          </td>
                          <td className="py-2.5 px-3 text-slate-700">
                            {user.funcao}
                          </td>
                          <td className="py-2.5 px-3">
                            <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                              user.permissao === 'Super Admin' ? 'bg-purple-100 text-purple-800' :
                              user.permissao === 'Administrador' ? 'bg-blue-100 text-blue-800' :
                              user.permissao === 'Técnico N2' ? 'bg-cyan-100 text-cyan-800' :
                              'bg-slate-100 text-slate-800'
                            }`}>
                              {user.permissao}
                            </span>
                          </td>
                          <td className="py-2.5 px-3">
                            <span className="inline-flex items-center gap-1 text-emerald-700 font-semibold text-[11px]">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                              <span>{user.status}</span>
                            </span>
                          </td>
                          <td className="py-2.5 px-3 text-slate-500 font-mono text-[11px]">
                            {user.ultimoAcesso}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </main>
        </div>
      )}

      {/* ==========================================================
          MODAL DETALHES DO CHAMADO
          ========================================================== */}
      {selectedTicketForDetail && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-xs z-[90] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-lg w-full p-6 space-y-4 animate-scaleUp text-xs text-slate-800">
            <div className="flex items-start justify-between pb-3 border-b border-slate-200">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-500 font-semibold block">
                  {selectedTicketForDetail.tipo} #{selectedTicketForDetail.id}
                </span>
                <h3 className="text-base font-bold text-slate-900 mt-0.5">
                  {selectedTicketForDetail.titulo}
                </h3>
              </div>
              <button
                onClick={() => setSelectedTicketForDetail(null)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3 text-[11px]">
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block">Solicitante</span>
                  <span className="font-semibold text-slate-900">{selectedTicketForDetail.solicitante}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block">Departamento</span>
                  <span className="font-semibold text-slate-900">{selectedTicketForDetail.departamento}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block">Prioridade</span>
                  <span className="font-semibold text-slate-900">{selectedTicketForDetail.prioridade}</span>
                </div>
                <div className="p-2 rounded bg-slate-50 border border-slate-200">
                  <span className="text-slate-500 block">Data Abertura</span>
                  <span className="font-semibold text-slate-900 font-mono">{selectedTicketForDetail.dataAbertura}</span>
                </div>
              </div>

              <div className="space-y-1">
                <span className="font-semibold text-slate-700 block">Descrição do Problema</span>
                <p className="p-3 rounded-md bg-[#f0f2f6] text-slate-800 leading-relaxed text-xs">
                  {selectedTicketForDetail.descricao}
                </p>
              </div>

              {selectedTicketForDetail.equipamentoVinculado && (
                <div className="p-2.5 rounded bg-amber-50 border border-amber-200 text-amber-900 text-xs">
                  <span className="font-bold block">Insumo / Equipamento Vinculado:</span>
                  <span>{selectedTicketForDetail.equipamentoVinculado}</span>
                </div>
              )}

              {/* Status updater */}
              <div className="space-y-1.5 pt-2 border-t border-slate-200">
                <span className="font-semibold text-slate-700 block">Atualizar Status do Atendimento:</span>
                <div className="flex flex-wrap gap-2">
                  {(['Aberto', 'Em Atendimento', 'Pendente', 'Encerrado'] as const).map(st => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedTicketForDetail.id, st)}
                      className={`px-3 py-1 rounded text-xs font-semibold cursor-pointer transition-all ${
                        selectedTicketForDetail.status === st 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end">
              <button
                onClick={() => setSelectedTicketForDetail(null)}
                className="px-4 py-2 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold cursor-pointer"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================
          MODAL PREVIEW DO DOCUMENTO REPORTLAB PDF
          ========================================================== */}
      {activePdfModal && (
        <div className="fixed inset-0 bg-slate-950/75 backdrop-blur-xs z-[95] flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-2xl w-full p-6 sm:p-8 space-y-6 animate-scaleUp text-slate-800 max-h-[90vh] overflow-y-auto">
            {/* Header Documento ReportLab */}
            <div className="flex items-start justify-between pb-4 border-b-2 border-slate-900">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold uppercase tracking-wider text-red-600 bg-red-50 border border-red-200 px-2 py-0.5 rounded">
                    Python ReportLab • PDF Engine
                  </span>
                  <span className="text-xs text-slate-400 font-mono">DocID: #{Date.now().toString().slice(-6)}</span>
                </div>
                <h3 className="text-xl font-extrabold text-slate-900 mt-1">
                  {activePdfModal.titulo}
                </h3>
                <p className="text-xs text-slate-600">
                  {activePdfModal.subtitulo}
                </p>
              </div>

              <button
                onClick={() => setActivePdfModal(null)}
                className="p-1 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-800 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Document Body */}
            <div className="space-y-4 text-xs font-sans">
              <div className="p-3 rounded bg-slate-50 border border-slate-200 flex items-center justify-between text-[11px] font-mono">
                <span>Gerado por: Paulo Victtor (Administrador de TI)</span>
                <span>Data de Emissão: {activePdfModal.dataRef}</span>
              </div>

              {activePdfModal.tipo === 'inventario' && (
                <div className="space-y-3">
                  <p className="text-slate-700 leading-relaxed">
                    Certifica-se para os devidos fins de controle patrimonial que o almoxarifado de TI contém atualmente <strong>{estoque.length} itens cadastrados</strong>, totalizando <strong>{estoque.reduce((acc, i) => acc + i.quantidade, 0)} unidades</strong> em estoque físico ativo, com banco gerenciado via PostgreSQL/Supabase.
                  </p>
                  <div className="border border-slate-300 rounded overflow-hidden">
                    <table className="w-full text-left text-[11px]">
                      <thead className="bg-slate-100 border-b border-slate-300 font-semibold text-slate-700">
                        <tr>
                          <th className="p-2">Item</th>
                          <th className="p-2">Marca/Modelo</th>
                          <th className="p-2 text-right">Saldo</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-200">
                        {estoque.slice(0, 8).map(i => (
                          <tr key={i.id}>
                            <td className="p-2 font-medium">{i.nome}</td>
                            <td className="p-2 font-mono text-slate-500">{i.marca} {i.modelo}</td>
                            <td className="p-2 text-right font-bold">{i.quantidade} un</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[10px] text-slate-400 italic">
                    * Exibindo primeiros 8 itens da amostragem do laudo completo.
                  </p>
                </div>
              )}

              {activePdfModal.tipo === 'chamados' && (
                <div className="space-y-3">
                  <p className="text-slate-700 leading-relaxed">
                    Relatório consolidado de métricas da central de suporte técnico Évora Gestão. Fila operacional com tempo médio de atendimento dentro do acordo de nível de serviço (SLA) corporativo.
                  </p>
                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-[10px] text-slate-500 block">Chamados Abertos</span>
                      <span className="text-lg font-bold text-slate-900">{chamadosAbertos}</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-[10px] text-slate-500 block">Ordens de Serviço</span>
                      <span className="text-lg font-bold text-slate-900">{osAbertas + osEncerradas}</span>
                    </div>
                    <div className="p-3 bg-slate-50 border border-slate-200 rounded">
                      <span className="text-[10px] text-slate-500 block">Atendimentos Concluídos</span>
                      <span className="text-lg font-bold text-emerald-600">{chamadosEncerrados + osEncerradas}</span>
                    </div>
                  </div>
                </div>
              )}

              {activePdfModal.tipo === 'termo' && (
                <div className="space-y-4">
                  <p className="text-slate-700 leading-relaxed">
                    Pelo presente instrumento, declaro ter recebido da equipe de Tecnologia da Informação o equipamento/insumo acima especificado em perfeitas condições funcionais e operacionais, comprometendo-me a zelar pela sua conservação conforme a Política de Segurança e Uso de Ativos da empresa.
                  </p>
                  <div className="pt-8 grid grid-cols-2 gap-8 text-center text-[11px] font-mono">
                    <div className="border-t border-slate-400 pt-1">
                      <span>Assinatura do Solicitante</span>
                    </div>
                    <div className="border-t border-slate-400 pt-1">
                      <span>Paulo Victtor — TI / Suporte</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Modal Actions */}
            <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-mono text-slate-500 flex items-center gap-1.5">
                <FileCheck className="w-4 h-4 text-emerald-600" />
                <span>Documento assinado digitalmente</span>
              </span>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert('Download do documento PDF gerado pelo ReportLab simulado com sucesso!')}
                  className="px-3.5 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Baixar PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActivePdfModal(null)}
                  className="px-3 py-1.5 rounded-md bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs cursor-pointer"
                >
                  Fechar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
