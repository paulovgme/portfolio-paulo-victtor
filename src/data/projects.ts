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
    name: "Gestão de TI",
    category: "Plataforma de Gestão de TI, Chamados, Ordens de Serviço e Estoque",
    summary: "Sistema web desenvolvido para centralizar operações de Tecnologia da Informação, integrando gerenciamento de chamados técnicos, ordens de serviço, controle de estoque, movimentações de materiais, cadastro de equipamentos, usuários e permissões, descarte de equipamentos e emissão de documentos em PDF.",
    demoRoute: "/demo/estoque",
    detailRoute: "/projetos/estoque",
    technologies: [
      "Python",
      "Streamlit",
      "Supabase",
      "PostgreSQL",
      "Pandas",
      "ReportLab"
    ],
    problem: "Em equipes de suporte e infraestrutura de TI, a gestão descentralizada — com chamados em canais informais, controle de patrimônio e estoque em planilhas dispersas, ordens de serviço em papel e descartes sem laudos formais — gera lentidão na resolução de incidentes, falta de rastreabilidade de peças e materiais alocados sem vínculo com os atendimentos.",
    solution: "Desenvolvimento do Évora Gestão (Gestão de TI), uma plataforma integrada desenvolvida em Python e Streamlit conectada a banco PostgreSQL/Supabase. O sistema centraliza a abertura e triagem de chamados técnicos, emissão e fechamento de ordens de serviço (O.S.), consulta e movimentações de estoque em tempo real, registro de descartes com emissão de laudos em PDF via ReportLab e auditoria de usuários com RBAC.",
    howItWorks: "O analista de TI autentica-se e acessa o Painel Inicial com visão panorâmica de chamados abertos, pendentes, encerrados, ordens de serviço e contagem consolidada de produtos cadastrados. Pelo menu lateral organizado em 10 módulos, a equipe gerencia a fila de chamados técnicos e O.S., consulta o inventário físico com alertas automáticos de saldo mínimo, registra entradas e saídas de insumos vinculadas a atendimentos, emite termos e relatórios gerenciais em PDF com ReportLab e gerencia perfis de acesso.",
    keyFeatures: [
      "Painel inicial com indicadores consolidados de chamados abertos, pendentes, encerrados, O.S. e produtos",
      "Gestão completa de chamados técnicos com prioridades, categorias e status de atendimento",
      "Emissão, acompanhamento e encerramento de Ordens de Serviço (O.S.)",
      "Consulta ágil de estoque com pesquisa instantânea por nome, marca, modelo ou categoria",
      "Controle rigoroso de saldo com alertas visuais automáticos de nível de reposição",
      "Registro de movimentações rastreadas de Entrada e Saída vinculadas a chamados e técnicos",
      "Cadastro rápido de novos produtos, componentes, consumíveis e equipamentos",
      "Módulo de correção cadastral e ajuste de inventário físico",
      "Histórico auditado de transações e geração de relatórios e termos em PDF com ReportLab",
      "Controle de descarte ambiental e baixa patrimonial com registro de laudo técnico",
      "Gerenciamento de usuários, operadores e permissões de acesso (RBAC)"
    ],
    architecture: {
      diagram: [
        {
          label: "CHAMADOS & ORDENS DE SERVIÇO",
          sublabel: "Operações Diárias de TI",
          description: "Abertura de tickets, requisições de atendimento e ordens de serviço para manutenções internas ou externas."
        },
        {
          label: "INTERFACE STREAMLIT",
          sublabel: "Python / Data-Driven UI",
          description: "Componentes nativos, formulários reativos, visualização tabular rápida, filtros dinâmicos e navegação em 10 módulos."
        },
        {
          label: "MOTOR PANDAS",
          sublabel: "Processamento e Normalização",
          description: "Transformação de dados em memória, cálculo dinâmico de médias, consolidação de métricas e alertas de estoque."
        },
        {
          label: "BANCO SUPABASE / POSTGRESQL",
          sublabel: "Persistência em Nuvem",
          description: "Armazenamento relacional de chamados, O.S., inventário de produtos, movimentações, descarte e controle de usuários."
        },
        {
          label: "REPORTLAB PDF",
          sublabel: "Geração de Documentos",
          description: "Criação programática de relatórios gerenciais, termos de responsabilidade e laudos técnicos de descarte em PDF."
        }
      ],
      notes: "Construído sobre o ecossistema Python com foco em alta produtividade para analistas de suporte, ergonomia operacional e rastreabilidade total de ativos."
    },
    visualTheme: {
      accentColor: "#ef4444",
      styleTag: "Streamlit UI • Évora Gestão",
      badgeLabel: "Évora Gestão"
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
