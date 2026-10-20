export interface EstoqueItem {
  id: number;
  nome: string;
  categoria: string;
  quantidade: number;
  alerta: number;
  marca: string;
  modelo: string;
}

export interface MovimentacaoItem {
  id: string;
  dataHora: string;
  tipo: 'Entrada' | 'Saída';
  produto: string;
  quantidade: number;
  motivo: string;
  responsavel: string;
  documentoRef?: string;
}

export interface DescarteItem {
  id: string;
  data: string;
  equipamento: string;
  patrimonio: string;
  motivo: string;
  estado: string;
  laudoTecnico: string;
}

export interface ChamadoItem {
  id: string;
  numero: number;
  tipo: 'Chamado' | 'Ordem de Serviço';
  titulo: string;
  solicitante: string;
  departamento: string;
  prioridade: 'Baixa' | 'Média' | 'Alta' | 'Crítica';
  status: 'Aberto' | 'Em Atendimento' | 'Pendente' | 'Encerrado';
  categoria: 'Hardware' | 'Redes' | 'Acessos' | 'Impressoras' | 'Sistemas' | 'Infraestrutura';
  equipamentoVinculado?: string;
  dataAbertura: string;
  dataFechamento?: string;
  tecnicoResponsavel: string;
  descricao: string;
  solucao?: string;
}

export interface UsuarioItem {
  id: number;
  nome: string;
  email: string;
  usuario: string;
  funcao: string;
  permissao: 'Super Admin' | 'Administrador' | 'Técnico N2' | 'Técnico N1' | 'Almoxarifado';
  status: 'Ativo' | 'Inativo';
  ultimoAcesso: string;
}

// Exactly 32 products as shown in the screenshot ("Produtos cadastrados: 32")
export const INITIAL_ESTOQUE: EstoqueItem[] = [
  { id: 1, nome: 'FONTE ATX 500W PFC ATIVO', categoria: 'periféricos', quantidade: 5, alerta: 2, marca: 'CORSAIR', modelo: 'CV550' },
  { id: 2, nome: 'HD SEAGATE BARRACUDA 1TB', categoria: 'armazenamento', quantidade: 4, alerta: 2, marca: 'SEAGATE', modelo: 'ST1000DM010' },
  { id: 3, nome: 'SSD SATA 480GB 2.5 POL', categoria: 'armazenamento', quantidade: 8, alerta: 3, marca: 'KINGSTON', modelo: 'A400' },
  { id: 4, nome: 'MEMÓRIA RAM DDR4 8GB 2666MHZ', categoria: 'memória', quantidade: 6, alerta: 2, marca: 'CRUCIAL', modelo: 'CT8G4DFS8266' },
  { id: 5, nome: 'PATCH CORD CAT6 UTP 1.5M AZUL', categoria: 'redes', quantidade: 24, alerta: 10, marca: 'FURUKAWA', modelo: 'GIGALAN' },
  { id: 6, nome: 'SWITCH 8 PORTAS GIGABIT 10/100/1000', categoria: 'redes', quantidade: 3, alerta: 1, marca: 'TP-LINK', modelo: 'TL-SG108' },
  { id: 7, nome: 'CONECTOR RJ45 CAT6 PACOTE 50UN', categoria: 'redes', quantidade: 2, alerta: 1, marca: 'FURUKAWA', modelo: 'SOHOPLUS' },
  { id: 8, nome: 'CABO HDMI 2.0 BLINDADO 2 METROS', categoria: 'cabos', quantidade: 11, alerta: 4, marca: 'VINIK', modelo: 'HDMI-2.0' },
  { id: 9, nome: 'TECLADO USB ABNT2 PADRÃO', categoria: 'periféricos', quantidade: 7, alerta: 3, marca: 'DELL', modelo: 'KB216' },
  { id: 10, nome: 'MOUSE ÓPTICO USB 1000 DPI', categoria: 'periféricos', quantidade: 9, alerta: 3, marca: 'LOGITECH', modelo: 'M90' },
  { id: 11, nome: 'CARTUCHO DE TONER PRETO HP', categoria: 'impressão', quantidade: 3, alerta: 2, marca: 'HP', modelo: 'CF283A (83A)' },
  { id: 12, nome: 'ALICATE DE CRIMPAR RJ45 PROFISSIONAL', categoria: 'ferramentas', quantidade: 2, alerta: 1, marca: 'PROSKIT', modelo: 'CP-376TR' },
  { id: 13, nome: 'SSD NVME M.2 500GB PCIE GEN3', categoria: 'armazenamento', quantidade: 5, alerta: 2, marca: 'KINGSTON', modelo: 'NV2 M.2' },
  { id: 14, nome: 'MEMÓRIA RAM DDR4 16GB 3200MHZ', categoria: 'memória', quantidade: 4, alerta: 2, marca: 'KINGSTON', modelo: 'FURY BEAST' },
  { id: 15, nome: 'MEMÓRIA RAM SODIMM DDR4 8GB NOTEBOOK', categoria: 'memória', quantidade: 3, alerta: 1, marca: 'CRUCIAL', modelo: 'CT8G4SFRA266' },
  { id: 16, nome: 'SWITCH 24 PORTAS GIGABIT RACK 19', categoria: 'redes', quantidade: 1, alerta: 1, marca: 'INTELBRAS', modelo: 'SG 2404 PoE' },
  { id: 17, nome: 'ROTEADOR WI-FI 6 DUAL BAND GIGABIT', categoria: 'redes', quantidade: 3, alerta: 1, marca: 'TP-LINK', modelo: 'ARCHER AX12' },
  { id: 18, nome: 'BATERIA SELADA NOBREAK 12V 7AH', categoria: 'nobreak', quantidade: 6, alerta: 2, marca: 'MOURA', modelo: '12MVA-7' },
  { id: 19, nome: 'NOBREAK 1200VA BIVOLT COM ENGATE', categoria: 'nobreak', quantidade: 2, alerta: 1, marca: 'APC', modelo: 'BACK-UPS 1200' },
  { id: 20, nome: 'FILTRO DE LINHA PROFISSIONAL 6 TOMADAS', categoria: 'elétrica', quantidade: 8, alerta: 3, marca: 'CLAMPER', modelo: 'ENERGIA 6' },
  { id: 21, nome: 'PATCH PANEL CAT6 24 PORTAS', categoria: 'redes', quantidade: 2, alerta: 1, marca: 'FURUKAWA', modelo: 'MULTI-LAN CAT6' },
  { id: 22, nome: 'CABO DE REDE UTP CAT6 AZUL 305M', categoria: 'redes', quantidade: 1, alerta: 1, marca: 'FURUKAWA', modelo: 'SOHOPLUS CAT6' },
  { id: 23, nome: 'TONER COMPATÍVEL BROTHER TN-1060', categoria: 'impressão', quantidade: 4, alerta: 2, marca: 'CHINAMATE', modelo: 'TN-1060' },
  { id: 24, nome: 'CILINDRO FOTOCONDUTOR DR-1060', categoria: 'impressão', quantidade: 2, alerta: 1, marca: 'BROTHER', modelo: 'DR-1060' },
  { id: 25, nome: 'ADAPTADOR USB-C PARA GIGABIT RJ45', categoria: 'adaptadores', quantidade: 4, alerta: 2, marca: 'DELL', modelo: 'DA310 MULTIPORT' },
  { id: 26, nome: 'ADAPTADOR DISPLAYPORT PARA HDMI 4K', categoria: 'adaptadores', quantidade: 5, alerta: 2, marca: 'UGREEN', modelo: 'DP-HDMI 4K' },
  { id: 27, nome: 'PASTA TÉRMICA PRATA ALTA CONDUTIVIDADE', categoria: 'insumos', quantidade: 3, alerta: 1, marca: 'IMPLASTEC', modelo: 'THERMAL SILVER 5G' },
  { id: 28, nome: 'ÁLCOOL ISOPROPÍLICO 99.8% 1 LITRO', categoria: 'insumos', quantidade: 2, alerta: 1, marca: 'IMPLASTEC', modelo: 'ISO-1000' },
  { id: 29, nome: 'HEADSET USB CANCELAMENTO RUÍDO', categoria: 'periféricos', quantidade: 6, alerta: 2, marca: 'LOGITECH', modelo: 'H390 USB' },
  { id: 30, nome: 'WEBCAM FULL HD 1080P COM MICROFONE', categoria: 'periféricos', quantidade: 3, alerta: 1, marca: 'LOGITECH', modelo: 'C920 PRO HD' },
  { id: 31, nome: 'PEN DRIVE USB 3.2 64GB', categoria: 'armazenamento', quantidade: 8, alerta: 3, marca: 'KINGSTON', modelo: 'DATATRAVELER EXODIA' },
  { id: 32, nome: 'TESTADOR DE CABOS RJ45 / RJ11 LED', categoria: 'ferramentas', quantidade: 2, alerta: 1, marca: 'PROSKIT', modelo: 'MT-7051N' }
];

export const INITIAL_MOVIMENTACOES: MovimentacaoItem[] = [
  { id: 'MOV-101', dataHora: '2026-10-01 08:30', tipo: 'Saída', produto: 'SSD SATA 480GB 2.5 POL', quantidade: 1, motivo: 'Substituição HD avariado Chamado #4092', responsavel: 'Paulo Victtor', documentoRef: 'CH-2026-042' },
  { id: 'MOV-102', dataHora: '2026-10-01 09:15', tipo: 'Saída', produto: 'PATCH CORD CAT6 UTP 1.5M AZUL', quantidade: 3, motivo: 'Organização Rack Depto Financeiro', responsavel: 'Paulo Victtor', documentoRef: 'OS-2026-015' },
  { id: 'MOV-103', dataHora: '2026-09-30 14:20', tipo: 'Entrada', produto: 'FONTE ATX 500W PFC ATIVO', quantidade: 4, motivo: 'Reposição Almoxarifado NF-e 4521', responsavel: 'Paulo Victtor', documentoRef: 'NFE-4521' },
  { id: 'MOV-104', dataHora: '2026-09-29 11:00', tipo: 'Saída', produto: 'CARTUCHO DE TONER PRETO HP', quantidade: 1, motivo: 'Substituição impressora Diretoria', responsavel: 'Paulo Victtor', documentoRef: 'CH-2026-038' }
];

export const INITIAL_DESCARTES: DescarteItem[] = [
  { id: 'DESC-01', data: '2026-09-25', equipamento: 'Monitor LCD 17 polegadas', patrimonio: 'PAT-00412', motivo: 'Placa inversora queimada e tela com vazamento de cristal líquido', estado: 'Inutilizável', laudoTecnico: 'Laudo de Baixa Patrimonial #12' },
  { id: 'DESC-02', data: '2026-09-18', equipamento: 'Nobreak 600VA', patrimonio: 'PAT-00388', motivo: 'Transformador interno em curto-circuito e baterias estufadas', estado: 'Inutilizável', laudoTecnico: 'Laudo de Baixa Patrimonial #11' }
];

export const SAMPLE_CHAMADOS: ChamadoItem[] = [
  {
    id: 'CH-2026-001',
    numero: 1,
    tipo: 'Chamado',
    titulo: 'Substituição de fonte em estação de trabalho',
    solicitante: 'Fernanda Martins',
    departamento: 'Financeiro',
    prioridade: 'Alta',
    status: 'Em Atendimento',
    categoria: 'Hardware',
    equipamentoVinculado: 'FONTE ATX 500W PFC ATIVO',
    dataAbertura: '2026-10-18 09:14',
    tecnicoResponsavel: 'Paulo Victtor',
    descricao: 'Computador do faturamento desligou subitamente com forte cheiro de queimado e não liga mais.'
  },
  {
    id: 'CH-2026-002',
    numero: 2,
    tipo: 'Chamado',
    titulo: 'Instalação de certificado digital e leitora',
    solicitante: 'Carlos Silveira',
    departamento: 'Contabilidade',
    prioridade: 'Média',
    status: 'Aberto',
    categoria: 'Acessos',
    dataAbertura: '2026-10-19 14:30',
    tecnicoResponsavel: 'Paulo Victtor',
    descricao: 'Novo colaborador necessita do driver da leitora de cartão e instalação de certificado A3.'
  },
  {
    id: 'CH-2026-003',
    numero: 3,
    tipo: 'Chamado',
    titulo: 'Impressora de etiquetas não comunica na rede',
    solicitante: 'Renata Castro',
    departamento: 'Expedição',
    prioridade: 'Crítica',
    status: 'Pendente',
    categoria: 'Impressoras',
    equipamentoVinculado: 'PATCH CORD CAT6 UTP 1.5M AZUL',
    dataAbertura: '2026-10-20 08:05',
    tecnicoResponsavel: 'Paulo Victtor',
    descricao: 'Impressora Zebra da expedição perdeu IP e os despachos de pedidos estão parados.'
  },
  {
    id: 'OS-2026-001',
    numero: 4,
    tipo: 'Ordem de Serviço',
    titulo: 'Manutenção preventiva e cabeamento no Rack Sala 03',
    solicitante: 'Coordenação de TI',
    departamento: 'Infraestrutura',
    prioridade: 'Alta',
    status: 'Em Atendimento',
    categoria: 'Redes',
    equipamentoVinculado: 'SWITCH 24 PORTAS GIGABIT RACK 19',
    dataAbertura: '2026-10-17 11:00',
    tecnicoResponsavel: 'Paulo Victtor',
    descricao: 'Organização dos patch cords, identificação de portas do patch panel e medição de atenuação.'
  },
  {
    id: 'OS-2026-002',
    numero: 5,
    tipo: 'Ordem de Serviço',
    titulo: 'Substituição de baterias de nobreaks centrais',
    solicitante: 'Auditoria Interna',
    departamento: 'Infraestrutura',
    prioridade: 'Média',
    status: 'Encerrado',
    categoria: 'Hardware',
    equipamentoVinculado: 'BATERIA SELADA NOBREAK 12V 7AH',
    dataAbertura: '2026-10-10 10:20',
    dataFechamento: '2026-10-11 16:40',
    tecnicoResponsavel: 'Paulo Victtor',
    descricao: 'Troca preventiva de 4 baterias 12V 7Ah com teste de carga e autonomia em banco de baterias.',
    solucao: 'Baterias antigas substituídas com sucesso. Nobreak testado sob carga de 80% com autonomia de 28 minutos.'
  }
];

export const INITIAL_USUARIOS: UsuarioItem[] = [
  {
    id: 1,
    nome: 'Paulo Victtor Gleib de Melo',
    email: 'paulo.victtor@empresa.com.br',
    usuario: 'paulo.victtor',
    funcao: 'Analista de Infraestrutura & TI',
    permissao: 'Super Admin',
    status: 'Ativo',
    ultimoAcesso: 'Hoje às 10:15'
  },
  {
    id: 2,
    nome: 'Carlos Eduardo Mendes',
    email: 'carlos.mendes@empresa.com.br',
    usuario: 'carlos.suporte',
    funcao: 'Técnico de Suporte N2',
    permissao: 'Técnico N2',
    status: 'Ativo',
    ultimoAcesso: 'Ontem às 17:40'
  },
  {
    id: 3,
    nome: 'Mariana Duarte Souza',
    email: 'mariana.almoxarifado@empresa.com.br',
    usuario: 'mariana.estoque',
    funcao: 'Assistente de Almoxarifado',
    permissao: 'Almoxarifado',
    status: 'Ativo',
    ultimoAcesso: '20/10/2026 08:30'
  },
  {
    id: 4,
    nome: 'Roberto Alves Santos',
    email: 'roberto.alves@empresa.com.br',
    usuario: 'roberto.n1',
    funcao: 'Técnico de Suporte N1',
    permissao: 'Técnico N1',
    status: 'Ativo',
    ultimoAcesso: '19/10/2026 18:00'
  }
];
