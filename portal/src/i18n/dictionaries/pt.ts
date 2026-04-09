export const pt = {
  lang: "pt",
  langLabel: "PT",
  nav: { switchLang: "Idioma" },
  auth: {
    adminLogin: "Entrada do Operador",
    adminSubtitle: "Acesso restrito ao Escritório de Operação Civitas",
    passwordLabel: "Chave de Acesso Institucional",
    passwordPlaceholder: "Digite a chave de segurança...",
    loginCTA: "Autenticar Console",
    error: "Chave de acesso inválida ou expirada.",
    success: "Sessão de Operador Ativa",
    logout: "Encerrar Sessão",
    ownerMode: "Modo Creator Ativo",
    auditorMode: "Modo Auditoria Ativo",
    unlockCTA: "Código de Convite",
    unlockPlaceholder: "Ex: CIV-VOTE-2026",
  },

  hero: {
    badge: "Institutional Layer Active",
    title: "Civitas",
    titleAccent: "Vote",
    subtitle: "Infraestrutura de Inteligência Social Verificável para Instituições Soberanas",
    tagline: "Determinismo de Engenharia sobre Amostragem de Opinião.",
    ctaPrimary: "Inicializar Protocolo",
    ctaSecondary: "Ver Ledger de Auditoria",
  },

  dualPurpose: {
    badge: "Finalidade Dupla",
    title: "Um sistema. Duas camadas de poder.",
    subtitle: "Não é SaaS comum. Não é pesquisa tradicional. Não é govtech simples.",
    gov: {
      title: "Governança Institucional",
      desc: "Organizações tomam decisões com integridade verificável, participação controlada via ZK-ID, auditoria completa e imutabilidade de regras.",
      items: ["Assembleias corporativas", "Votações universitárias", "Decisões de conselhos", "Governança de DAOs institucionais"],
    },
    social: {
      title: "Inteligência Social",
      desc: "O Civitas não coleta opiniões. Ele produz dados estatísticos confiáveis e auditáveis — substituindo o problema estrutural de institutos tradicionais.",
      items: ["Pesquisas públicas verificáveis", "Estudos acadêmicos auditáveis", "Dados sociais sem manipulação", "Infraestrutura para políticas públicas"],
    },
  },

  architecture: {
    badge: "Núcleo do Sistema",
    title: "Arquitetura Conceitual",
    subtitle: "Cada decisão arquitetural elimina uma categoria de fraude ou questionamento.",
    pillars: [
      { num: "01", icon: "🔹", title: "Survey como Processo", desc: "Versionado, auditável e fechado. Estados: DRAFT → ACTIVE → CLOSED → FINALIZED. Nenhuma mudança após ACTIVE." },
      { num: "02", icon: "🔒", title: "Questionário Imutável", desc: "Hash canônico SHA256 gerado no momento da ativação. Congelado para sempre. Impossível alterar retroativamente." },
      { num: "03", icon: "🪪", title: "Elegibilidade via ZK-ID", desc: "Participação controlada por credenciais verificáveis e provas Zero-Knowledge, sem expor dados pessoais." },
      { num: "04", icon: "🔑", title: "Unicidade por Nullifier", desc: "Uma participação por processo. Sem revelar identidade. Sem rastreamento cruzado entre processos." },
      { num: "05", icon: "🛡️", title: "PII Zero Nativo", desc: "O sistema não armazena dados pessoais. Apenas respostas agregáveis e estrutura estatística." },
      { num: "06", icon: "📦", title: "Snapshot Final Verificável", desc: "Pacote fechado com hash de conteúdo e export offline. Auditoria reproduzível em qualquer lugar do mundo." },
    ],
  },

  useCases: {
    badge: "Casos de Uso",
    title: "Para quem é isso?",
    cases: [
      { emoji: "🎓", label: "Universidades", items: ["Pesquisas acadêmicas auditáveis", "Estudos populacionais confiáveis", "Eleições estudantis verificáveis"] },
      { emoji: "🏢", label: "Empresas", items: ["Assembleias com governança forte", "Clima organizacional verificável", "Decisão interna com auditoria"] },
      { emoji: "🏛️", label: "Governo", items: ["Consulta pública real", "Dados para políticas públicas", "Resultados sem manipulação"] },
      { emoji: "🌐", label: "Organizações Internacionais", items: ["Pesquisas comparáveis entre países", "Dados sem manipulação política", "Relatórios verificáveis globalmente"] },
    ],
  },

  trustLayer: {
    badge: "Diferencial Real",
    title1: "O Civitas transforma",
    titleAccent1: "opinião",
    title2: "em",
    titleAccent2: "dado auditável",
    title3: ".",
    differentials: [
      { icon: "🔒", label: "Pergunta Imutável", desc: "Impossível alterar após ativação" },
      { icon: "🪪", label: "Participação Controlada", desc: "ZK-ID sem exposição de PII" },
      { icon: "✅", label: "Resultado Verificável", desc: "Qualquer pessoa pode auditar" },
    ],
    ctaPrimary: "Inicializar Protocolo",
    ctaSecondary: "Ver Documentação Técnica",
  },

  dashboard: {
    badge: "Interface Operacional",
    operationLabel: "Operação Ativa",
    zkRequired: "ZK-ID Exigido",
    piiZero: "PII Zero",
    protocolStatus: "Status do Protocolo",
    participants: "Participantes Verificados",
    anomalies: "Anomalias Detectadas",
    entropy: "Entropia dos Dados",
    entropyLabel: "Alto",
    entropyDesc: "Garantindo significância estatística sem rastreamento.",
    states: [
      { id: "DRAFT", label: "Rascunho", desc: "Configuração editável" },
      { id: "ACTIVE", label: "Auditoria Ativa", desc: "Hash Congelado" },
      { id: "CLOSED", label: "Encerrada", desc: "Bloqueio de novas assinaturas" },
      { id: "FINALIZED", label: "Finalizada", desc: "Snapshot gerado" },
    ],
    hashLabel: "Hash Canônico (Imutável)",
  },

  footer: {
    description: "Infraestrutura de Inteligência Social Verificável. Engenharia da verdade via certeza matemática.",
    protocol: "Protocolo",
    compliance: "Conformidade",
    protocolLinks: ["ZK-ID Registry", "Nullifier Engine", "Audit Ledger"],
    complianceLinks: ["PII Zero (I4)", "RR1 Readiness", "LGPD / LFPDPPP"],
    copyright: "© 2026 Projeto Educatech AI",
    tier: "INFRAESTRUTURA SOBERANA TIER A+",
    result: "Resultado",
    audit: "Auditoria",
  },

  proposer: {
    title: "Propor Novo Protocolo",
    results: "Ver Resultados",
    verifiedResults: "Resultados Auditados",
    aggregatedData: "Dados Agregados (PII-Zero)",
    questions: "Questões",
    auditProof: "Prova de Auditoria",
    viewInEducatech: "Verificar no Educatech AI",
    auditHash: "Hash de Auditoria",
    subtitle: "Inicie uma consulta soberana carregando sua base de dados ou formulário.",
    validityLabel: "Validade da Pesquisa",
    validityDays: "dias",
    privateMode: "Pesquisa Fechada (Somente Convite)",
    accessCodeLabel: "Código de Acesso Privado (SIMULAÇÃO)",
    tabs: {
      file: "Carregar Arquivo",
      url: "Link Externo",
    },
    upload: {
      title: "Arraste seu documento aqui",
      subtitle: "Suporta PDF, DOCX, CSV ou XLSX (Max 10MB)",
      processing: "Processando e gerando hash canônico...",
    },
    url: {
      title: "Vincular Google Forms",
      placeholder: "https://docs.google.com/forms/d/...",
      help: "O formulário será processado e blindado via ZK-Proof.",
    },
    targeting: {
      title: "Critérios de Audiência",
      country: "País",
      region: "Região",
      state: "Estado (UF)",
      city: "Cidade",
      zone: "Zona",
      neighborhood: "Bairro",

      zipCode: "CEP",
      allowAll: "Todo o Território",
    },
    cta: "Disparar Protocolo na Rede",
  },

  meta: {
    title: "Civitas Vote Institucional — Infraestrutura de Governança Verificável",
    description: "Sistema operacional institucional para decisões e produção de verdade estatística verificável. PII-Zero. ZK-ID. Tier A+.",
  },
};

export type Dictionary = typeof pt;
