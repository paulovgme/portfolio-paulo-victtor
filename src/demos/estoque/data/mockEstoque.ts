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
  { id: 12, nome: 'ALICATE DE CRIMPAR RJ45 PROFISSIONAL', categoria: 'ferramentas', quantidade: 2, alerta: 1, marca: 'PROSKIT', modelo: 'CP-376TR' }
];

export const INITIAL_MOVIMENTACOES: MovimentacaoItem[] = [
  { id: 'MOV-101', dataHora: '2026-10-01 08:30', tipo: 'Saída', produto: 'SSD SATA 480GB 2.5 POL', quantidade: 1, motivo: 'Substituição HD avariado Chamado #4092', responsavel: 'Paulo Victtor' },
  { id: 'MOV-102', dataHora: '2026-10-01 09:15', tipo: 'Saída', produto: 'PATCH CORD CAT6 UTP 1.5M AZUL', quantidade: 3, motivo: 'Organização Rack Depto Financeiro', responsavel: 'Paulo Victtor' },
  { id: 'MOV-103', dataHora: '2026-09-30 14:20', tipo: 'Entrada', produto: 'FONTE ATX 500W PFC ATIVO', quantidade: 4, motivo: 'Reposição Almoxarifado NF-e 4521', responsavel: 'Paulo Victtor' },
  { id: 'MOV-104', dataHora: '2026-09-29 11:00', tipo: 'Saída', produto: 'CARTUCHO DE TONER PRETO HP', quantidade: 1, motivo: 'Substituição impressora Diretoria', responsavel: 'Paulo Victtor' }
];

export const INITIAL_DESCARTES: DescarteItem[] = [
  { id: 'DESC-01', data: '2026-09-25', equipamento: 'Monitor LCD 17 polegadas', patrimonio: 'PAT-00412', motivo: 'Placa inversora queimada e tela com vazamento de cristal líquido', estado: 'Inutilizável', laudoTecnico: 'Laudo de Baixa Patrimonial #12' },
  { id: 'DESC-02', data: '2026-09-18', equipamento: 'Nobreak 600VA', patrimonio: 'PAT-00388', motivo: 'Transformador interno em curto-circuito e baterias estufadas', estado: 'Inutilizável', laudoTecnico: 'Laudo de Baixa Patrimonial #11' }
];
