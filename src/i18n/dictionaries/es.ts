import type { Dictionary } from "./pt";

export const es: Dictionary = {
  lang: "es",
  langLabel: "ES",
  nav: { switchLang: "Idioma" },
  auth: {
    adminLogin: "Acceso de Operador",
    adminSubtitle: "Acceso restringido a la Oficina de Operación Civitas",
    passwordLabel: "Clave de Acceso Institucional",
    passwordPlaceholder: "Ingrese la clave de seguridad...",
    loginCTA: "Autenticar Consola",
    error: "Clave de acceso no válida o caducada.",
    success: "Sesión de Operador Activa",
    logout: "Cerrar Sesión",
    ownerMode: "Modo Creador Activo",
    auditorMode: "Modo Auditoría Activo",
    unlockCTA: "Código de Invitación",
    unlockPlaceholder: "Ej: CIV-VOTE-2026",
  },

  hero: {
    badge: "Capa Institucional Activa",
    title: "Civitas",
    titleAccent: "Vote",
    subtitle: "Infraestructura de Inteligencia Social Verificable para Instituciones Soberanas",
    tagline: "Determinismo de Ingeniería sobre Muestreo de Opinión.",
    ctaPrimary: "Inicializar Protocolo",
    ctaSecondary: "Ver Ledger de Auditoría",
  },

  dualPurpose: {
    badge: "Doble Propósito",
    title: "Un sistema. Dos capas de poder.",
    subtitle: "No es SaaS común. No es investigación tradicional. No es govtech simple.",
    gov: {
      title: "Gobernanza Institucional",
      desc: "Las organizaciones toman decisiones con integridad verificable, participación controlada mediante ZK-ID, auditoría completa e inmutabilidad de reglas.",
      items: ["Asambleas corporativas", "Votaciones universitarias", "Decisiones de consejos", "Gobernanza de DAOs institucionales"],
    },
    social: {
      title: "Inteligencia Social",
      desc: "Civitas no recopila opiniones. Produce datos estadísticos confiables y auditables, reemplazando el problema estructural de los institutos tradicionales.",
      items: ["Encuestas públicas verificables", "Estudios académicos auditables", "Datos sociales sin manipulación", "Infraestructura para políticas públicas"],
    },
  },

  architecture: {
    badge: "Núcleo del Sistema",
    title: "Arquitectura Conceptual",
    subtitle: "Cada decisión arquitectónica elimina una categoría de fraude o cuestionamiento.",
    pillars: [
      { num: "01", icon: "🔹", title: "Encuesta como Proceso", desc: "Versionada, auditable y cerrada. Estados: DRAFT → ACTIVE → CLOSED → FINALIZED. Ningún cambio tras ACTIVE." },
      { num: "02", icon: "🔒", title: "Cuestionario Inmutable", desc: "Hash canónico SHA256 generado en el momento de activación. Congelado para siempre. Imposible alterar retroactivamente." },
      { num: "03", icon: "🪪", title: "Elegibilidad vía ZK-ID", desc: "Participación controlada por credenciales verificables y pruebas Zero-Knowledge, sin exponer datos personales." },
      { num: "04", icon: "🔑", title: "Unicidad por Nullifier", desc: "Una participación por proceso. Sin revelar identidad. Sin rastreo cruzado entre procesos." },
      { num: "05", icon: "🛡️", title: "PII Zero Nativo", desc: "El sistema no almacena datos personales. Solo respuestas agregables y estructura estadística." },
      { num: "06", icon: "📦", title: "Snapshot Final Verificable", desc: "Paquete cerrado con hash de contenido y exportación offline. Auditoría reproducible en cualquier parte del mundo." },
    ],
  },

  useCases: {
    badge: "Casos de Uso",
    title: "¿Para quién es esto?",
    cases: [
      { emoji: "🎓", label: "Universidades", items: ["Investigaciones académicas auditables", "Estudios poblacionales confiables", "Elecciones estudiantiles verificables"] },
      { emoji: "🏢", label: "Empresas", items: ["Asambleas con gobernanza sólida", "Clima organizacional verificable", "Decisiones internas con auditoría"] },
      { emoji: "🏛️", label: "Gobierno", items: ["Consulta pública real", "Datos para políticas públicas", "Resultados sin manipulación"] },
      { emoji: "🌐", label: "Organizaciones Internacionales", items: ["Encuestas comparables entre países", "Datos sin manipulación política", "Informes verificables globalmente"] },
    ],
  },

  trustLayer: {
    badge: "Diferenciador Real",
    title1: "Civitas transforma",
    titleAccent1: "opinión",
    title2: "en",
    titleAccent2: "dato auditable",
    title3: ".",
    differentials: [
      { icon: "🔒", label: "Pregunta Inmutable", desc: "Imposible alterar tras la activación" },
      { icon: "🪪", label: "Participación Controlada", desc: "ZK-ID sin exposición de PII" },
      { icon: "✅", label: "Resultado Verificable", desc: "Cualquier persona puede auditar" },
    ],
    ctaPrimary: "Inicializar Protocolo",
    ctaSecondary: "Ver Documentación Técnica",
  },

  dashboard: {
    badge: "Interfaz Operacional",
    operationLabel: "Operación Activa",
    zkRequired: "ZK-ID Requerido",
    piiZero: "PII Zero",
    protocolStatus: "Estado del Protocolo",
    participants: "Participantes Verificados",
    anomalies: "Anomalías Detectadas",
    entropy: "Entropía de Datos",
    entropyLabel: "Alta",
    entropyDesc: "Garantizando significancia estadística sin rastreo.",
    states: [
      { id: "DRAFT", label: "Borrador", desc: "Configuración editable" },
      { id: "ACTIVE", label: "Auditoría Activa", desc: "Hash Congelado" },
      { id: "CLOSED", label: "Cerrada", desc: "Nuevas firmas bloqueadas" },
      { id: "FINALIZED", label: "Finalizada", desc: "Snapshot generado" },
    ],
    hashLabel: "Hash Canónico (Inmutable)",
  },

  footer: {
    description: "Infraestructura de Inteligencia Social Verificable. Ingeniería de la verdad mediante certeza matemática.",
    protocol: "Protocolo",
    compliance: "Cumplimiento",
    protocolLinks: ["ZK-ID Registry", "Nullifier Engine", "Audit Ledger"],
    complianceLinks: ["PII Zero (I4)", "RR1 Readiness", "LGPD / LFPDPPP"],
    copyright: "© 2026 Projeto Educatech AI",
    tier: "INFRAESTRUCTURA SOBERANA TIER A+",
    result: "Resultado",
    audit: "Auditoría",
  },

  proposer: {
    title: "Proponer Nuevo Protocolo",
    results: "Ver Resultados",
    verifiedResults: "Resultados Verificados",
    aggregatedData: "Datos Agregados (PII-Zero)",
    questions: "Preguntas",
    auditProof: "Prueba de Auditoría",
    viewInEducatech: "Verificar en Educatech AI",
    auditHash: "Hash de Auditoría",
    subtitle: "Inicie una consulta soberana cargando su base de datos o formulario.",
    validityLabel: "Validez de la Consulta",
    validityDays: "días",
    privateMode: "Consulta Cerrada (Solo Invitados)",
    accessCodeLabel: "Código de Acceso Privado (SIMULACIÓN)",
    tabs: {
      file: "Cargar Archivo",
      url: "Enlace Externo",
    },
    upload: {
      title: "Arrastra tu documento aquí",
      subtitle: "Soporta PDF, DOCX, CSV o XLSX (Máx 10MB)",
      processing: "Procesando y generando hash canónico...",
    },
    url: {
      title: "Vincular Google Forms",
      placeholder: "https://docs.google.com/forms/d/...",
      help: "El formulario será procesado y blindado mediante ZK-Proof.",
    },
    targeting: {
      title: "Criterios de Audiencia",
      country: "País",
      region: "Región",
      state: "Estado (UF)",
      city: "Ciudad",
      zone: "Zona",
      neighborhood: "Barrio",

      zipCode: "Código Postal",
      allowAll: "Todo el Territorio",
    },
    cta: "Disparar Protocolo en la Red",
  },

  meta: {
    title: "Civitas Vote Institucional — Infraestructura de Gobernanza Verificable",
    description: "Sistema operativo institucional para decisiones y producción de verdad estadística verificable. PII-Zero. ZK-ID. Tier A+.",
  },
};
