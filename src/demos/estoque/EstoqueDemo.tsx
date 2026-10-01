import React, { useState } from 'react';
import { FloatingPortfolioReturn } from '../../components/common/FloatingPortfolioReturn';
import { INITIAL_ESTOQUE, INITIAL_MOVIMENTACOES, INITIAL_DESCARTES, EstoqueItem, MovimentacaoItem, DescarteItem } from './data/mockEstoque';
import { Eye, EyeOff, Search, ChevronLeft, ChevronRight, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const EstoqueDemo: React.FC = () => {
  // Authentication state for demo (default false to show the Streamlit login screen)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [username, setUsername] = useState<string>('paulo.victtor');
  const [password, setPassword] = useState<string>('••••••••');
  const [showPassword, setShowPassword] = useState<boolean>(false);

  // Active view in the Streamlit radio list
  const [currentNav, setCurrentNav] = useState<string>('consultar');
  const [sidebarCollapsed, setSidebarCollapsed] = useState<boolean>(false);

  // Data states
  const [estoque, setEstoque] = useState<EstoqueItem[]>(INITIAL_ESTOQUE);
  const [movimentacoes, setMovimentacoes] = useState<MovimentacaoItem[]>(INITIAL_MOVIMENTACOES);
  const [descartes, setDescartes] = useState<DescarteItem[]>(INITIAL_DESCARTES);

  // Search filter
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Form states for "Entrada / Saída"
  const [movTipo, setMovTipo] = useState<'Entrada' | 'Saída'>('Saída');
  const [movProdutoId, setMovProdutoId] = useState<number>(estoque[0]?.id || 1);
  const [movQtd, setMovQtd] = useState<number>(1);
  const [movMotivo, setMovMotivo] = useState<string>('');
  const [movSuccessMessage, setMovSuccessMessage] = useState<string>('');

  // Form states for "Cadastrar Produto"
  const [novoNome, setNovoNome] = useState<string>('');
  const [novaCategoria, setNovaCategoria] = useState<string>('periféricos');
  const [novaQtd, setNovaQtd] = useState<number>(1);
  const [novoAlerta, setNovoAlerta] = useState<number>(1);
  const [novaMarca, setNovaMarca] = useState<string>('');
  const [novoModelo, setNovoModelo] = useState<string>('');
  const [cadSuccessMessage, setCadSuccessMessage] = useState<string>('');

  // Form states for "Descarte"
  const [descEquipamento, setDescEquipamento] = useState<string>('');
  const [descPatrimonio, setDescPatrimonio] = useState<string>('');
  const [descMotivo, setDescMotivo] = useState<string>('');
  const [descSuccessMessage, setDescSuccessMessage] = useState<string>('');

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsAuthenticated(true);
  };

  const handleMovimentacaoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const item = estoque.find(i => i.id === Number(movProdutoId));
    if (!item) return;

    if (movTipo === 'Saída' && item.quantidade < movQtd) {
      alert(`Quantidade insuficiente em estoque! Saldo atual: ${item.quantidade}`);
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
      motivo: movMotivo || (movTipo === 'Entrada' ? 'Entrada manual em estoque' : 'Requisição técnica de suporte'),
      responsavel: 'Paulo Victtor'
    };

    setMovimentacoes([newMov, ...movimentacoes]);
    setMovSuccessMessage(`Sucesso! ${movTipo} de ${movQtd} unidade(s) de ${item.nome} registrada.`);
    setMovMotivo('');
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
      marca: novaMarca.toUpperCase(),
      modelo: novoModelo.toUpperCase()
    };

    setEstoque([...estoque, newItem]);
    setCadSuccessMessage(`Produto ${newItem.nome} cadastrado com sucesso no estoque!`);
    setNovoNome('');
    setNovaMarca('');
    setNovoModelo('');
    setTimeout(() => setCadSuccessMessage(''), 4000);
  };

  const handleDescarteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!descEquipamento.trim()) return;

    const newDesc: DescarteItem = {
      id: `DESC-${Date.now().toString().slice(-3)}`,
      data: new Date().toISOString().substring(0, 10),
      equipamento: descEquipamento,
      patrimonio: descPatrimonio || 'S/N',
      motivo: descMotivo || 'Desgaste natural / Defeito irreversível em bancada',
      estado: 'Inutilizável',
      laudoTecnico: `Laudo Técnico de Descarte #${descartes.length + 13}`
    };

    setDescartes([newDesc, ...descartes]);
    setDescSuccessMessage(`Registro de descarte do equipamento ${descEquipamento} concluído!`);
    setDescEquipamento('');
    setDescPatrimonio('');
    setDescMotivo('');
    setTimeout(() => setDescSuccessMessage(''), 4000);
  };

  // Filtered estoque table
  const filteredEstoque = estoque.filter(item => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      item.nome.toLowerCase().includes(q) ||
      item.marca.toLowerCase().includes(q) ||
      item.modelo.toLowerCase().includes(q) ||
      item.categoria.toLowerCase().includes(q)
    );
  });

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans relative selection:bg-red-500/20 selection:text-red-900">
      {/* Floating Return Card - Dark version for crisp contrast against light background */}
      <FloatingPortfolioReturn theme="light" targetPath="/projetos" />

      {/* Discreet Demo Banner */}
      <div className="bg-[#f0f2f6] border-b border-[#e2e8f0] text-center py-1 px-4 text-[10px] font-mono text-slate-600 tracking-wider">
        <span>AMBIENTE DE DEMONSTRAÇÃO • DADOS FICTÍCIOS</span>
      </div>

      {!isAuthenticated ? (
        /* ==========================================================
           TELA DE LOGIN STREAMLIT (Referência exata: Captura 103509)
           ========================================================== */
        <div className="min-h-[calc(100vh-28px)] flex flex-col items-center justify-center p-6 bg-white">
          <div className="w-full max-w-4xl space-y-6">
            {/* Title with Lock & Key Emoji */}
            <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
              <span className="text-3xl">🔐</span>
              <span>Acesso ao Sistema</span>
            </h1>

            {/* Form Box matching Streamlit screenshot */}
            <div className="w-full rounded-lg border border-slate-200/90 p-6 sm:p-8 space-y-5 shadow-xs bg-white">
              <form onSubmit={handleLogin} className="space-y-5">
                {/* Usuário */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 block">
                    Usuário
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full bg-[#f0f2f6] border-none rounded-md py-2.5 px-3.5 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                  />
                </div>

                {/* Senha */}
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700 block">
                    Senha
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#f0f2f6] border-none rounded-md py-2.5 px-3.5 pr-10 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/40"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-800"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Entrar Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-2 px-4 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-sm font-medium transition-colors cursor-pointer shadow-xs active:scale-99 text-center"
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
           INTERFACE STREAMLIT ESTOQUE (Referência exata: Captura 103524)
           ========================================================== */
        <div className="min-h-screen flex bg-white text-slate-800">
          {/* Streamlit Light Gray Sidebar */}
          <aside className={`${sidebarCollapsed ? 'w-12' : 'w-72'} bg-[#f0f2f6] border-r border-[#e0e4eb] flex flex-col shrink-0 transition-all duration-150`}>
            {/* Top Collapse Toggle */}
            <div className="p-3 flex items-center justify-between text-slate-500 border-b border-[#e5e9f0]">
              {!sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(true)}
                  className="p-1 hover:text-slate-900 text-xs font-mono flex items-center gap-1 cursor-pointer"
                  title="Recolher menu"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>&lt;&lt;</span>
                </button>
              )}
              {sidebarCollapsed && (
                <button
                  onClick={() => setSidebarCollapsed(false)}
                  className="p-1 hover:text-slate-900 mx-auto cursor-pointer"
                  title="Expandir menu"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>

            {!sidebarCollapsed && (
              <div className="p-5 flex-1 flex flex-col justify-between space-y-6 overflow-y-auto">
                <div className="space-y-6">
                  {/* Greeting matching screenshot */}
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
                      {[
                        { id: 'consultar', label: 'Consultar Estoque', emoji: '📊' },
                        { id: 'movimentacao', label: 'Entrada / Saída', emoji: '🔄' },
                        { id: 'cadastrar', label: 'Cadastrar Produto', emoji: '🆕' },
                        { id: 'correcao', label: 'Correção de Produtos', emoji: '🔧' },
                        { id: 'historico', label: 'Histórico e Relatórios', emoji: '📜' },
                        { id: 'descarte', label: 'Descarte de Equipamentos', emoji: '♻️' },
                        { id: 'usuarios', label: 'Gerenciar Usuários', emoji: '👥' }
                      ].map((item) => {
                        const selected = currentNav === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => setCurrentNav(item.id)}
                            className={`w-full flex items-center gap-2.5 py-1.5 px-2 rounded-md transition-colors text-left ${
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

                {/* Sair / Logoff button matching screenshot */}
                <div className="pt-6 border-t border-[#e2e8f0]">
                  <button
                    onClick={() => setIsAuthenticated(false)}
                    className="w-full py-1.5 px-3 rounded-md border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-medium shadow-xs transition-colors cursor-pointer"
                  >
                    Sair / Logoff
                  </button>
                </div>
              </div>
            )}
          </aside>

          {/* Streamlit Main Content Area */}
          <main className="flex-1 flex flex-col min-w-0 bg-white p-6 sm:p-10">
            {/* Streamlit Top Header (Fork, 3-dots) */}
            <div className="flex items-center justify-end gap-3 text-xs text-slate-500 pb-4">
              <span>Fork</span>
              <span>⋮</span>
            </div>

            {/* View 1: 📊 Consultar Estoque (Exact replica of screenshot Captura 103524) */}
            {currentNav === 'consultar' && (
              <div className="space-y-6">
                {/* Header Title with emoji */}
                <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">📊</span>
                  <span>Consultar Estoque</span>
                </h1>

                {/* Search Box matching screenshot */}
                <div className="space-y-1.5">
                  <label className="text-sm text-slate-700 font-medium block">
                    🔍 Pesquisar por Nome ou Marca
                  </label>
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Digite para filtrar instantaneamente..."
                    className="w-full bg-[#f0f2f6] border-none rounded-md py-2.5 px-4 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-500/30"
                  />
                </div>

                {/* Streamlit Dataframe Table matching screenshot */}
                <div className="border border-slate-200 rounded-md overflow-x-auto shadow-xs">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#f0f2f6] text-slate-700 border-b border-slate-200 text-xs font-medium">
                      <tr>
                        <th className="py-2.5 px-4 text-right">id</th>
                        <th className="py-2.5 px-4">nome</th>
                        <th className="py-2.5 px-4">categoria</th>
                        <th className="py-2.5 px-4 text-right">quantidade</th>
                        <th className="py-2.5 px-4 text-right">alerta</th>
                        <th className="py-2.5 px-4">marca</th>
                        <th className="py-2.5 px-4">modelo</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {filteredEstoque.length === 0 ? (
                        <tr>
                          <td colSpan={7} className="py-8 text-center text-slate-500">
                            Nenhum produto encontrado para o termo pesquisado.
                          </td>
                        </tr>
                      ) : (
                        filteredEstoque.map((item) => {
                          const isLowStock = item.quantidade <= item.alerta;
                          return (
                            <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                              <td className="py-2.5 px-4 text-right text-slate-500 font-mono">{item.id}</td>
                              <td className="py-2.5 px-4 font-medium text-slate-900 flex items-center gap-2">
                                <span>{item.nome}</span>
                                {isLowStock && (
                                  <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 text-amber-800 font-medium">
                                    baixo estoque
                                  </span>
                                )}
                              </td>
                              <td className="py-2.5 px-4 text-slate-600">{item.categoria}</td>
                              <td className={`py-2.5 px-4 text-right font-semibold font-mono ${
                                isLowStock ? 'text-amber-600' : 'text-slate-800'
                              }`}>
                                {item.quantidade}
                              </td>
                              <td className="py-2.5 px-4 text-right text-slate-500 font-mono">{item.alerta}</td>
                              <td className="py-2.5 px-4 text-slate-700">{item.marca}</td>
                              <td className="py-2.5 px-4 text-slate-600">{item.modelo}</td>
                            </tr>
                          );
                        })
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 pt-2 font-mono">
                  <span>Exibindo {filteredEstoque.length} de {estoque.length} itens cadastrados</span>
                  <span>Banco de Dados: Supabase PostgreSQL (Conectado)</span>
                </div>
              </div>
            )}

            {/* View 2: 🔄 Entrada / Saída */}
            {currentNav === 'movimentacao' && (
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">🔄</span>
                  <span>Entrada / Saída de Estoque</span>
                </h1>

                {movSuccessMessage && (
                  <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{movSuccessMessage}</span>
                  </div>
                )}

                <form onSubmit={handleMovimentacaoSubmit} className="space-y-4 p-6 rounded-lg border border-slate-200 bg-white">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Tipo de Operação</label>
                    <div className="flex gap-4">
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="movTipo"
                          checked={movTipo === 'Saída'}
                          onChange={() => setMovTipo('Saída')}
                          className="accent-red-500"
                        />
                        <span>Saída (Requisição / Troca)</span>
                      </label>
                      <label className="flex items-center gap-2 text-xs font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="movTipo"
                          checked={movTipo === 'Entrada'}
                          onChange={() => setMovTipo('Entrada')}
                          className="accent-red-500"
                        />
                        <span>Entrada (Nova compra / Devolução)</span>
                      </label>
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Produto</label>
                    <select
                      value={movProdutoId}
                      onChange={(e) => setMovProdutoId(Number(e.target.value))}
                      className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                    >
                      {estoque.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i.nome} — Saldo Atual: {i.quantidade} ({i.marca})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Quantidade</label>
                    <input
                      type="number"
                      min="1"
                      value={movQtd}
                      onChange={(e) => setMovQtd(Number(e.target.value))}
                      className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Motivo / Nº Chamado / Destino</label>
                    <input
                      type="text"
                      placeholder="Ex: Chamado #3890 - Substituição estação Depto Fiscal"
                      value={movMotivo}
                      onChange={(e) => setMovMotivo(e.target.value)}
                      className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
                  >
                    Confirmar Movimentação
                  </button>
                </form>
              </div>
            )}

            {/* View 3: 🆕 Cadastrar Produto */}
            {currentNav === 'cadastrar' && (
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">🆕</span>
                  <span>Cadastrar Novo Produto</span>
                </h1>

                {cadSuccessMessage && (
                  <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{cadSuccessMessage}</span>
                  </div>
                )}

                <form onSubmit={handleCadastroSubmit} className="space-y-4 p-6 rounded-lg border border-slate-200 bg-white">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-700 block">Nome do Produto</label>
                    <input
                      type="text"
                      placeholder="Ex: MEMÓRIA RAM DDR4 16GB 3200MHZ"
                      value={novoNome}
                      onChange={(e) => setNovoNome(e.target.value)}
                      className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Categoria</label>
                      <select
                        value={novaCategoria}
                        onChange={(e) => setNovaCategoria(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      >
                        <option value="periféricos">Periféricos</option>
                        <option value="armazenamento">Armazenamento</option>
                        <option value="memória">Memória</option>
                        <option value="redes">Redes e Cabos</option>
                        <option value="impressão">Impressão</option>
                        <option value="ferramentas">Ferramentas</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Marca</label>
                      <input
                        type="text"
                        placeholder="Ex: KINGSTON, DELL, HP"
                        value={novaMarca}
                        onChange={(e) => setNovaMarca(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Modelo</label>
                      <input
                        type="text"
                        placeholder="Ex: FURY BEAST"
                        value={novoModelo}
                        onChange={(e) => setNovoModelo(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Quantidade Inicial</label>
                      <input
                        type="number"
                        min="0"
                        value={novaQtd}
                        onChange={(e) => setNovaQtd(Number(e.target.value))}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Nível de Alerta</label>
                      <input
                        type="number"
                        min="1"
                        value={novoAlerta}
                        onChange={(e) => setNovoAlerta(Number(e.target.value))}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
                  >
                    Salvar Novo Cadastro
                  </button>
                </form>
              </div>
            )}

            {/* View 4: ♻️ Descarte de Equipamentos */}
            {currentNav === 'descarte' && (
              <div className="space-y-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">♻️</span>
                  <span>Descarte de Equipamentos & Baixa Patrimonial</span>
                </h1>

                {descSuccessMessage && (
                  <div className="p-3 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{descSuccessMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  {/* Form */}
                  <form onSubmit={handleDescarteSubmit} className="space-y-4 p-6 rounded-lg border border-slate-200 bg-white">
                    <h3 className="text-sm font-bold text-slate-900">Registrar Novo Descarte</h3>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Equipamento / Peça</label>
                      <input
                        type="text"
                        placeholder="Ex: Switch 24p queimado por descarga elétrica"
                        value={descEquipamento}
                        onChange={(e) => setDescEquipamento(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                        required
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Nº Patrimônio / Etiqueta</label>
                      <input
                        type="text"
                        placeholder="Ex: PAT-00512"
                        value={descPatrimonio}
                        onChange={(e) => setDescPatrimonio(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-semibold text-slate-700 block">Diagnóstico Técnico / Motivo</label>
                      <textarea
                        rows={3}
                        placeholder="Ex: Queima de portas 1 a 12, curto na fonte redundante, reparo inviável."
                        value={descMotivo}
                        onChange={(e) => setDescMotivo(e.target.value)}
                        className="w-full bg-[#f0f2f6] border-none rounded-md py-2 px-3 text-xs text-slate-900"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium transition-colors"
                    >
                      Registrar Descarte e Gerar Termo
                    </button>
                  </form>

                  {/* List of Previous Disposals */}
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold text-slate-900">Histórico de Equipamentos Descartados</h3>
                    <div className="space-y-3">
                      {descartes.map((desc) => (
                        <div key={desc.id} className="p-4 rounded-lg border border-slate-200 bg-slate-50/60 space-y-1.5 text-xs">
                          <div className="flex items-center justify-between font-semibold text-slate-900">
                            <span>{desc.equipamento}</span>
                            <span className="text-slate-500 font-mono text-[11px]">{desc.patrimonio}</span>
                          </div>
                          <p className="text-slate-600">{desc.motivo}</p>
                          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 font-mono">
                            <span>{desc.laudoTecnico}</span>
                            <span>Data: {desc.data}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* View 5: 📜 Histórico e Relatórios */}
            {(currentNav === 'historico' || currentNav === 'correcao' || currentNav === 'usuarios') && (
              <div className="space-y-6">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center gap-3">
                  <span className="text-3xl">📜</span>
                  <span>Histórico de Movimentações & Relatórios</span>
                </h1>

                <div className="border border-slate-200 rounded-md overflow-x-auto shadow-xs">
                  <table className="w-full text-left text-xs font-sans">
                    <thead className="bg-[#f0f2f6] text-slate-700 border-b border-slate-200 text-xs font-medium">
                      <tr>
                        <th className="py-2.5 px-4">DATA/HORA</th>
                        <th className="py-2.5 px-4">TIPO</th>
                        <th className="py-2.5 px-4">PRODUTO</th>
                        <th className="py-2.5 px-4 text-right">QTD</th>
                        <th className="py-2.5 px-4">MOTIVO / CHAMADO</th>
                        <th className="py-2.5 px-4">RESPONSÁVEL</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 bg-white">
                      {movimentacoes.map((mov) => (
                        <tr key={mov.id} className="hover:bg-slate-50">
                          <td className="py-2.5 px-4 text-slate-500 font-mono">{mov.dataHora}</td>
                          <td className="py-2.5 px-4">
                            <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              mov.tipo === 'Entrada' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {mov.tipo}
                            </span>
                          </td>
                          <td className="py-2.5 px-4 font-medium text-slate-900">{mov.produto}</td>
                          <td className="py-2.5 px-4 text-right font-mono font-semibold">{mov.quantidade}</td>
                          <td className="py-2.5 px-4 text-slate-600">{mov.motivo}</td>
                          <td className="py-2.5 px-4 text-slate-700 font-mono">{mov.responsavel}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => alert('Em ambiente de produção, este botão utiliza a biblioteca ReportLab para gerar o inventário completo em PDF.')}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-slate-900 hover:bg-slate-800 text-white text-xs font-medium"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    <span>Exportar Inventário em PDF (ReportLab)</span>
                  </button>
                </div>
              </div>
            )}
          </main>
        </div>
      )}
    </div>
  );
};
