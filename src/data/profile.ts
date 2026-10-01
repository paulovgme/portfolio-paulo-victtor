export interface WorkExperience {
  company: string;
  role: string;
  period: string;
  activities: string[];
}

export interface CompetencyCategory {
  title: string;
  description?: string;
  skills: string[];
}

export interface AreaOfExpertise {
  title: string;
  subtitle: string;
  description: string;
  iconName: string;
}

export const PROFILE = {
  fullName: "Paulo Victtor Gleib de Melo",
  shortName: "Paulo Victtor",
  roleTitle: "Analista de TI | Infraestrutura | Desenvolvimento de Soluções",
  tagline: "Profissional de TI com sólida vivência em suporte, redes, infraestrutura e monitoramento, complementada pelo desenvolvimento de sistemas práticos com apoio de IA para resolução de desafios operacionais.",
  location: "Uberlândia, MG / Remoto",
  phoneDisplay: "+55 34 99120-8351",
  phoneRaw: "5534991208351",
  whatsappMessage: "Olá Paulo, encontrei seu contato através do seu portfólio profissional.",
  
  get whatsappUrl() {
    return `https://wa.me/${this.phoneRaw}?text=${encodeURIComponent(this.whatsappMessage)}`;
  },

  summary: `Profissional de Tecnologia da Informação com experiência consolidada em suporte técnico, infraestrutura, redes, sistemas e ambientes corporativos. Minha trajetória envolve atendimento a usuários, troubleshooting de alta complexidade, manutenção de infraestrutura, redes cabeadas e sem fio, servidores e suporte contínuo a ambientes empresariais.

Posteriormente, passei também a desenvolver ferramentas próprias para solucionar necessidades reais encontradas no dia a dia da TI corporativa, tais como monitoramento centralizado de ativos (SentinelTI), controle de inventário físico e periféricos (Sistema de Gestão de Estoque) e orquestração de rotinas e quotas de armazenamento (Évora Backup).

Utilizo Inteligência Artificial de forma transparente e metódica como ferramenta de apoio durante o desenvolvimento, pesquisa técnica, troubleshooting, prototipação rápida e documentação de sistemas.`,

  aiAssistedStatement: {
    title: "Desenvolvimento Assistido por IA",
    lead: "Transparência e pragmatismo no uso de Inteligência Artificial no fluxo de engenharia.",
    description: "Desenvolvimento de aplicações e ferramentas com apoio de Inteligência Artificial durante programação, pesquisa técnica, troubleshooting, prototipação e documentação.",
    details: [
      "A experiência tradicional de TI é a base: identificação precisa do problema de infraestrutura, arquitetura de rede e requisitos operacionais.",
      "A IA atua como acelerador: geração de protótipos de interface, testes de sintaxe em novas linguagens, documentação de rotinas e refatoração de código.",
      "Validação técnica rigorosa: cada componente, query de banco de dados ou integração Zabbix/SNMP é validada, testada e depurada em ambiente operacional real."
    ]
  },

  areasOfExpertise: [
    {
      title: "Infraestrutura",
      subtitle: "Servidores, Ambientes e Políticas",
      description: "Administração de servidores físicos e virtuais, ambientes Windows corporativos, políticas de segurança, gestão de acessos e garantia de alta disponibilidade de serviços.",
      iconName: "Server"
    },
    {
      title: "Suporte Técnico",
      subtitle: "Troubleshooting e Atendimento Corporativo",
      description: "Atendimento remoto e presencial focado em resolução analítica de incidentes, manutenção preventiva, diagnóstico ágil e gestão completa de chamados técnicos.",
      iconName: "Headphones"
    },
    {
      title: "Redes e Monitoramento",
      subtitle: "Zabbix, SNMP e Diagnóstico Ativo",
      description: "Configuração e gestão de redes cabeadas e Wi-Fi, protocolos TCP/IP, ICMP e SNMP, monitoramento proativo com Zabbix e descoberta automatizada de dispositivos.",
      iconName: "Activity"
    },
    {
      title: "Desenvolvimento assistido por IA",
      subtitle: "Soluções Funcionais com Apoio de IA",
      description: "Desenvolvimento de aplicações e ferramentas com apoio de Inteligência Artificial durante programação, pesquisa técnica, troubleshooting, prototipação e documentação.",
      iconName: "Cpu"
    }
  ] as AreaOfExpertise[],

  experiences: [
    {
      company: "PGM Sistemas",
      role: "Analista de Suporte",
      period: "16/08/2017 – 22/04/2025",
      activities: [
        "Suporte remoto e presencial a clientes corporativos.",
        "Troubleshooting analítico de incidentes e falhas operacionais.",
        "Monitoramento contínuo de sistemas e ativos.",
        "Manutenção preventiva de estações e infraestrutura.",
        "Registro, categorização e acompanhamento de chamados técnicos.",
        "Suporte a sistemas e ambientes corporativos."
      ]
    },
    {
      company: "Algar Tech",
      role: "Analista de Suporte",
      period: "11/11/2014 – 04/05/2017",
      activities: [
        "Suporte remoto e presencial aos colaboradores e clientes.",
        "Monitoramento proativo de sistemas e enlaces.",
        "Manutenção preventiva de hardware e software corporativo.",
        "Gestão e acompanhamento de chamados seguindo padrões de SLA.",
        "Suporte relacionado a infraestrutura e sistemas corporativos."
      ]
    },
    {
      company: "Softbox",
      role: "Analista de Infraestrutura",
      period: "26/12/2012 – 03/10/2014",
      activities: [
        "Administração de redes cabeadas e de comunicação.",
        "Administração e monitoramento de servidores.",
        "Gerenciamento de ambientes virtuais corporativos.",
        "Gerenciamento de acessos de usuários e credenciais.",
        "Aplicação de políticas de segurança da informação.",
        "Suporte direto a projetos estratégicos de infraestrutura.",
        "Garantia de disponibilidade e estabilidade dos serviços corporativos."
      ]
    }
  ] as WorkExperience[],

  competencies: [
    {
      title: "Suporte e Infraestrutura",
      skills: [
        "Suporte remoto",
        "Suporte presencial",
        "Troubleshooting",
        "Atendimento a usuários",
        "Gestão de chamados",
        "Infraestrutura de TI",
        "Redes cabeadas",
        "Wi-Fi",
        "Windows",
        "Ambientes corporativos"
      ]
    },
    {
      title: "Redes e Monitoramento",
      skills: [
        "TCP/IP",
        "ICMP",
        "SNMP",
        "Zabbix",
        "Monitoramento de ativos",
        "Diagnóstico de conectividade",
        "Descoberta de dispositivos"
      ]
    },
    {
      title: "Tecnologias Utilizadas em Projetos",
      description: "Tecnologias e linguagens aplicadas na construção das ferramentas e sistemas desenvolvidos.",
      skills: [
        "Python",
        "JavaScript",
        "TypeScript",
        "React",
        "Node.js",
        "Express",
        "Streamlit",
        "APIs REST",
        "PostgreSQL",
        "Supabase",
        "Prisma",
        "SQLite",
        "Docker"
      ]
    }
  ] as CompetencyCategory[]
};
