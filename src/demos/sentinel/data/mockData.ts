export interface IncidentItem {
  id: string;
  severity: 'CRÍTICO' | 'ALERTA' | 'EM ATENDIMENTO';
  equipment: string;
  ip: string;
  unit: string;
  description: string;
  duration: string;
  status: string;
  responsible: string;
}

export interface NetworkDevice {
  id: string;
  name: string;
  type: string;
  ip: string;
  mac: string;
  status: 'ONLINE' | 'ALERTA' | 'OFFLINE';
  latency: string;
  uptime: string;
  location: string;
}

export const INITIAL_DEVICES: NetworkDevice[] = [
  { id: 'dev-1', name: 'SW-CORE-01', type: 'Switch Gerenciável L3', ip: '10.20.0.1', mac: '00:1A:2B:3C:4D:01', status: 'ONLINE', latency: '1.2ms', uptime: '142d 18h', location: 'Datacenter Principal' },
  { id: 'dev-2', name: 'RT-EDGE-BGP', type: 'Roteador Borda CCR', ip: '10.20.0.254', mac: '00:1A:2B:3C:4D:02', status: 'ONLINE', latency: '2.1ms', uptime: '98d 04h', location: 'Rack Borda - POP1' },
  { id: 'dev-3', name: 'LINK-DEDICADO-01', type: 'Enlace Fibra Óptica 500M', ip: '192.168.100.1', mac: '00:1A:2B:3C:4D:03', status: 'ONLINE', latency: '4.5ms', uptime: '210d 12h', location: 'Operadora Primária' },
  { id: 'dev-4', name: 'LINK-BACKUP-02', type: 'Enlace Rádio PTP 100M', ip: '192.168.100.2', mac: '00:1A:2B:3C:4D:04', status: 'ONLINE', latency: '8.2ms', uptime: '45d 06h', location: 'Torre Central' },
  { id: 'dev-5', name: 'CAM-CFTV-PORTARIA', type: 'Câmera IP Dome 4K', ip: '10.20.15.10', mac: '00:1A:2B:3C:4D:05', status: 'ONLINE', latency: '3.0ms', uptime: '89d 22h', location: 'Guarita / Acesso' },
  { id: 'dev-6', name: 'PRT-SUPORTE-CORP', type: 'Impressora Laser Multifuncional', ip: '10.20.30.22', mac: '00:1A:2B:3C:4D:06', status: 'ONLINE', latency: '2.4ms', uptime: '12d 08h', location: 'Operações TI' },
  { id: 'dev-7', name: 'GW-VOIP-ASTERISK', type: 'Gateway Telefonia SIP', ip: '10.20.5.50', mac: '00:1A:2B:3C:4D:07', status: 'ONLINE', latency: '1.8ms', uptime: '120d 14h', location: 'Sala de Telecom' }
];

export const SAMPLE_INCIDENTS: IncidentItem[] = [
  {
    id: 'INC-1042',
    severity: 'ALERTA',
    equipment: 'LINK-BACKUP-02 (Rádio PTP)',
    ip: '192.168.100.2',
    unit: 'Torre Central',
    description: 'Flutuação de jitter acima do limite SLA (> 25ms)',
    duration: '00:14:22',
    status: 'Investigando enlace',
    responsible: 'Operador NOC 02'
  },
  {
    id: 'INC-1039',
    severity: 'EM ATENDIMENTO',
    equipment: 'PRT-SUPORTE-CORP',
    ip: '10.20.30.22',
    unit: 'Operações TI',
    description: 'Nível de toner ciano abaixo de 10% (Alerta SNMP)',
    duration: '01:08:45',
    status: 'Chamado GLPI #3412',
    responsible: 'Suporte N1'
  }
];
