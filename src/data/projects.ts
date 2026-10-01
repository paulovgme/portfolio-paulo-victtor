export interface ProjectArchitectureStep {
  label: string;
  sublabel: string;
  description: string;
}

export interface ProjectData {
  id: string;
  slug: string;
  name: string;
  category: string;
  summary: string;
  demoRoute: string;
  detailRoute: string;
  technologies: string[];
  problem: string;
  solution: string;
  howItWorks: string;
  keyFeatures: string[];
  architecture?: {
    diagram: ProjectArchitectureStep[];
    notes: string;
  };
  visualTheme: {
    accentColor: string;
    styleTag: string;
    badgeLabel: string;
  };
}

export const PROJECTS: ProjectData[] = [
  {
    id: "sentinelti",
    slug: "sentinelti",
    name: "SentinelTI",
    category: "Monitoramento de Infraestrutura / Redes",
    summary: "Plataforma criada para centralizar monitoramento de infraestrutura e ativos de TI, permitindo acompanhar equipamentos, disponibilidade, eventos e ocorrências através de uma Central NOC.",
    demoRoute: "/demo/sentinelti",
    detailRoute: "/projetos/sentinelti",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "PostgreSQL",
      "Prisma",
      "Docker",
      "Zabbix",
      "SNMP",
      "APIs REST"
    ],
    problem: "Em ambientes corporativos com múltiplos enlaces, filiais e centenas de ativos (switches, roteadores, antenas, impressoras e câmeras IP), as equipes de suporte enfrentam falta de visibilidade unificada. Ocorrências críticas muitas vezes eram descobertas apenas após reclamação de usuários, gerando tempo de parada não planejado e retrabalho na triagem.",
    solution: "Criação do SentinelTI como uma Central de Operações de Rede (NOC) customizada. O sistema consolida coletas Zabbix, sondagens ICMP/SNMP e integração com filas de chamados, oferecendo uma visão instantânea de status de enlace, métricas de latência e ocorrências em andamento através de um painel de alta fidelidade visual.",
    howItWorks: "Sensores ou agentes locais ('Radares') realizam descoberta e telemetria de dispositivos em sub-redes remotas e locais. Os dados fluem para o backend centralizado do SentinelTI, que se comunica com o Zabbix Server e armazena os históricos no PostgreSQL. Na interface de monitoria em tempo real, os operadores acompanham alertas, tempos de SLA e abrem incidentes diretos.",
    keyFeatures: [
      "Monitoramento contínuo de equipamentos e ativos de rede",
      "Monitoramento de suprimentos e status de impressoras via SNMP",
      "Descoberta automatizada de dispositivos na sub-rede (Scan IP)",
      "Monitoramento de enlaces de internet e links dedicados",
      "Acompanhamento de roteadores, switches gerenciáveis e VLANs",
      "Status operacional de câmeras IP e sistemas CFTV",
      "Monitoramento de antenas e rádios de comunicação ponto-a-ponto",
      "Monitoramento de ramais VoIP e gateways de telefonia",
      "Integração contínua com Zabbix Server para triggers e métricas",
      "Painel integrado com resumo de chamados de suporte (Helpdesk / GLPI)",
      "Gestão de ocorrências com severidades e atribuição de responsáveis",
      "Dashboard NOC com painéis de tempo real e atualização constante",
      "Controle de usuários com permissões baseadas em função (RBAC)",
      "Arquitetura com suporte a radares/agentes para redes remotas"
    ],
    architecture: {
      diagram: [
        {
          label: "REDE / EQUIPAMENTOS",
          sublabel: "Ativos Físicos e Lógicos",
          description: "Roteadores, switches, câmeras, impressoras e enlaces monitorados por ICMP e SNMP."
        },
        {
          label: "RADAR",
          sublabel: "Sondas & Agentes de Coleta",
          description: "Scanners locais que realizam a descoberta ativa e a leitura periódica em redes remotas."
        },
        {
          label: "CENTRAL SENTINELTI",
          sublabel: "Backend Node.js / Express",
          description: "Camada de orquestração, regras de negócio, normalização de métricas e controle de acesso."
        },
        {
          label: "ZABBIX + POSTGRESQL",
          sublabel: "Persistência e Motor de Triggers",
          description: "Servidor de monitoramento consolidado e banco relacional gerenciado via Prisma ORM."
        },
        {
          label: "EVENTOS / OCORRÊNCIAS",
          sublabel: "Filtragem e Notificações",
          description: "Classificação por severidade (crítico, alerta, em atendimento) e integração com chamados."
        },
        {
          label: "DASHBOARD NOC",
          sublabel: "Interface Operacional React",
          description: "Visualização em tempo real de latência, disponibilidade de 30 dias e painel de incidentes."
        }
      ],
      notes: "Arquitetura concebida para operar com agentes leves que comunicam via APIs REST criptografadas, preservando o isolamento de redes internas."
    },
    visualTheme: {
      accentColor: "#00c0f0",
      styleTag: "NOC Dark • Monitoramento de Redes",
      badgeLabel: "Central NOC"
    }
  },
  {
    id: "estoque",
    slug: "estoque",
    name: "Sistema de Gestão de Estoque",
    category: "Gestão de Estoque e Ativos de TI",
    summary: "Aplicação focada no controle de inventário físico de peças, insumos, periféricos e equipamentos de informática com rotinas de entrada, saída, alertas de saldo e relatórios.",
    demoRoute: "/demo/estoque",
    detailRoute: "/projetos/estoque",
    technologies: [
      "Python",
      "Streamlit",
      "Supabase",
      "Pandas",
      "ReportLab"
    ],
    problem: "Em equipes de TI que gerenciam suprimentos (fontes, cabos, tintas, discos rígidos, placas e periféricos), o controle por planilhas manuais frequentemente causava descompasso de saldo, falta repentina de insumos essenciais em atendimentos emergenciais e dificuldade na auditoria de descarte de hardware obsoleto.",
    solution: "Desenvolvimento de uma ferramenta ágil construída em Python com interface Streamlit, integrada a banco Supabase e biblioteca Pandas para processamento veloz de dados. A ferramenta unifica cadastros, movimentações rastreadas e emissão de laudos de descarte de patrimônio.",
    howItWorks: "O operador autentica-se no sistema e tem acesso imediato à tabela de consulta com busca dinâmica por nome ou marca. Movimentações de entrada ou saída atualizam os saldos em tempo real e sinalizam alertas quando a quantidade atinge o nível mínimo parametrizado. Módulos adicionais permitem emitir relatórios em PDF com a biblioteca ReportLab e registrar equipamentos destinados a descarte.",
    keyFeatures: [
      "Consulta ágil de estoque com pesquisa instantânea por nome, marca ou categoria",
      "Controle minucioso de saldo com alertas visuais de reposição necessária",
      "Registro detalhado de movimentações de Entrada e Saída",
      "Módulo de cadastro de novos produtos, peças e consumíveis",
      "Módulo de correção de cadastros e ajuste administrativo de saldo",
      "Histórico completo de transações com filtros de período",
      "Emissão de relatórios gerenciais e laudos técnicos em PDF com ReportLab",
      "Controle de descarte de equipamentos com registro de justificativa técnica e estado",
      "Registro de fotografias e evidências de itens avariados ou obsoletos",
      "Gerenciamento de usuários e níveis de permissão operacional"
    ],
    architecture: {
      diagram: [
        {
          label: "ENTRADAS E SAÍDAS",
          sublabel: "Operações Diárias de TI",
          description: "Registro de requisições de atendimento, reposição de suprimentos e novas compras."
        },
        {
          label: "INTERFACE STREAMLIT",
          sublabel: "Python / Data-Driven UI",
          description: "Componentes nativos, formulários reativos, visualização tabular rápida e filtros."
        },
        {
          label: "MOTOR PANDAS",
          sublabel: "Processamento e Normalização",
          description: "Transformação de dados em memória, cálculo dinâmico de médias e alertas de estoque."
        },
        {
          label: "BANCO SUPABASE",
          sublabel: "PostgreSQL na Nuvem",
          description: "Persistência segura das tabelas de produtos, movimentações, descarte e credenciais."
        },
        {
          label: "REPORTLAB PDF",
          sublabel: "Geração de Documentos",
          description: "Criação programática de termos de entrega, laudos de descarte e inventários em PDF."
        }
      ],
      notes: "Construído sobre o ecossistema Python com foco em entrega prática, ergonomia para o operador de suporte e alta velocidade de resposta."
    },
    visualTheme: {
      accentColor: "#ef4444",
      styleTag: "Streamlit UI • Gestão Prática",
      badgeLabel: "Inventário de TI"
    }
  },
  {
    id: "evora-backup",
    slug: "evora-backup",
    name: "Évora Backup",
    category: "Backup / Infraestrutura / Monitoramento",
    summary: "Painel de controle para monitoramento centralizado de rotinas diárias de backup, integridade de dados e quotas de armazenamento corporativo.",
    demoRoute: "/demo/evora-backup",
    detailRoute: "/projetos/evora-backup",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "REST APIs",
      "Cloud Storage Integration"
    ],
    problem: "Empresas e provedores de serviços gerenciados (MSPs) que gerenciam dezenas de clientes e rotinas de backup sofrem com a dispersão de relatórios. Verificar manualmente se cada rotina diária foi executada com êxito consome horas e aumenta os riscos de perdas silenciosas de dados.",
    solution: "Painel de controle Évora Backup: uma interface moderna e intuitiva de observabilidade para infraestrutura de cópias de segurança. Centraliza a visão de capacidade master, volumes utilizados, rotinas bem-sucedidas, alertas de limite e notificações imediatas de falhas críticas.",
    howItWorks: "As rotinas dos servidores clientes reportam o resultado da execução (status, tamanho transferido, duração e erros) através de endpoints de API para a nuvem de controle. O painel sintetiza a integridade das tarefas em gráficos circulares de status e distribuição de disco, permitindo aos administradores identificar falhas antes que elas comprometam a operação.",
    keyFeatures: [
      "Visão geral consolidada: Capacidade Master, Alocada, Utilizada e Livre",
      "Gráfico de status das rotinas: Sucesso, Falha Crítica, Alerta e Pendente",
      "Monitor de integridade de armazenamento e proporção de quotas em disco",
      "Painel de contas de clientes com visualização de quotas contratadas",
      "Módulo de monitor de backups com filtros rápidos para casos de atenção",
      "Gestão de planos e precificação de armazenamento",
      "Logs de auditoria e trilha de eventos de segurança",
      "Status operacional do serviço e conectividade com Cloud Engine",
      "Acesso rápido às rotinas de clientes em testes ou produção"
    ],
    architecture: {
      diagram: [
        {
          label: "AGENTES CLIENTES",
          sublabel: "Servidores & Estações",
          description: "Rotinas locais programadas que executam cópias incrementais e volumétricas."
        },
        {
          label: "ÉVORA CLOUD ENGINE",
          sublabel: "Servidor de Ingestão de Telemetria",
          description: "Validação de chaves de autenticação, recebimento de logs de conclusão e cotas."
        },
        {
          label: "REPOSITÓRIO & QUOTAS",
          sublabel: "Storage & Metadados",
          description: "Controle de limites por cliente, histórico de retenção e verificação de integridade."
        },
        {
          label: "PAINEL DE CONTROLE MSP",
          sublabel: "Frontend Dashboard",
          description: "Visão executiva em tempo real com gráficos donuts, métricas e alertas imediatos."
        }
      ],
      notes: "Desenvolvido com foco na experiência do analista responsável pela garantia do plano de continuidade de negócios dos clientes."
    },
    visualTheme: {
      accentColor: "#0284c7",
      styleTag: "MSP Control Panel • Cloud Backup",
      badgeLabel: "Painel de Controle"
    }
  }
];
