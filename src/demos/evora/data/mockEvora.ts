export interface BackupRoutine {
  id: string;
  clientName: string;
  serverName: string;
  routineType: 'Veeam / Imagem' | 'Banco de Dados SQL' | 'Arquivos Corporativos';
  lastRun: string;
  status: 'Sucesso' | 'Falha Crítica' | 'Alerta' | 'Nunca Executado';
  allocatedQuota: string;
  usedSpace: string;
  duration: string;
}

export interface ClientAccount {
  id: string;
  name: string;
  environment: string;
  plan: string;
  quotaGB: number;
  usedGB: number;
  contact: string;
  status: 'Ativo' | 'Em Testes' | 'Bloqueado';
}

export interface AuditLog {
  id: string;
  timestamp: string;
  actor: string;
  action: string;
  details: string;
  ip: string;
}

export const INITIAL_ROUTINES: BackupRoutine[] = [
  {
    id: 'ROT-001',
    clientName: 'Évora Tecnologia',
    serverName: 'SRV-STORAGE-TESTE',
    routineType: 'Veeam / Imagem',
    lastRun: 'Pendente (Aguardando primeiro ciclo)',
    status: 'Nunca Executado',
    allocatedQuota: '100 GB',
    usedSpace: '0.0 GB',
    duration: '--:--'
  },
  {
    id: 'ROT-002',
    clientName: 'Alpha Logística & Transportes',
    serverName: 'SRV-SQL-ERP',
    routineType: 'Banco de Dados SQL',
    lastRun: 'Hoje 03:00',
    status: 'Sucesso',
    allocatedQuota: '250 GB',
    usedSpace: '142.5 GB',
    duration: '00:24:18'
  },
  {
    id: 'ROT-003',
    clientName: 'Beta Indústria Metalúrgica',
    serverName: 'SRV-FILES-ENG',
    routineType: 'Arquivos Corporativos',
    lastRun: 'Ontem 22:30',
    status: 'Sucesso',
    allocatedQuota: '500 GB',
    usedSpace: '380.2 GB',
    duration: '01:45:12'
  }
];

export const INITIAL_CLIENTS: ClientAccount[] = [
  {
    id: 'CLI-01',
    name: 'Évora Tecnologia',
    environment: 'Ambiente de Testes / Sandbox',
    plan: 'Cloud Pro 100GB',
    quotaGB: 100,
    usedGB: 0.0,
    contact: 'admin@evora.local',
    status: 'Em Testes'
  },
  {
    id: 'CLI-02',
    name: 'Alpha Logística & Transportes',
    environment: 'Produção Primária',
    plan: 'Enterprise 250GB',
    quotaGB: 250,
    usedGB: 142.5,
    contact: 'ti@alphalog.local',
    status: 'Ativo'
  },
  {
    id: 'CLI-03',
    name: 'Beta Indústria Metalúrgica',
    environment: 'Datacenter Filial 01',
    plan: 'Enterprise 500GB',
    quotaGB: 500,
    usedGB: 380.2,
    contact: 'infra@betaind.local',
    status: 'Ativo'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  { id: 'LOG-409', timestamp: '2026-10-01 07:15:22', actor: 'Administrador Master', action: 'Sincronização Nuvem', details: 'Sincronização de metadados do Cluster Évora Cloud', ip: '192.168.1.100' },
  { id: 'LOG-408', timestamp: '2026-09-30 23:45:10', actor: 'Sistema Automatizado', action: 'Snapshot WORM', details: 'Execução de trava de retenção imutável para rotina ROT-002', ip: '10.0.0.12' },
  { id: 'LOG-407', timestamp: '2026-09-30 18:20:00', actor: 'Administrador Master', action: 'Ajuste de Quota', details: 'Expansão de quota do cliente Évora Tecnologia para 100GB', ip: '192.168.1.100' }
];
