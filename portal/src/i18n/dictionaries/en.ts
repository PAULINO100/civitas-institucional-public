import type { Dictionary } from "./pt";

export const en: Dictionary = {
  lang: "en",
  langLabel: "EN",
  nav: { switchLang: "Language" },
  auth: {
    adminLogin: "Operator Login",
    adminSubtitle: "Restricted access to Civitas Operation Office",
    passwordLabel: "Institutional Access Key",
    passwordPlaceholder: "Enter security key...",
    loginCTA: "Authenticate Console",
    error: "Invalid or expired access key.",
    success: "Operator Session Active",
    logout: "End Session",
    ownerMode: "Creator Mode Active",
    auditorMode: "Auditor Mode Active",
    unlockCTA: "Invite Code",
    unlockPlaceholder: "E.g. CIV-VOTE-2026",
  },

  hero: {
    badge: "Institutional Layer Active",
    title: "Civitas",
    titleAccent: "Vote",
    subtitle: "Verifiable Social Intelligence Infrastructure for Sovereign Institutions",
    tagline: "Engineering Determinism over Opinion Sampling.",
    ctaPrimary: "Initialize Protocol",
    ctaSecondary: "View Audit Ledger",
  },

  dualPurpose: {
    badge: "Dual Purpose",
    title: "One system. Two layers of power.",
    subtitle: "Not common SaaS. Not traditional research. Not simple govtech.",
    gov: {
      title: "Institutional Governance",
      desc: "Organizations make decisions with verifiable integrity, controlled participation via ZK-ID, full audit trails and rule immutability.",
      items: ["Corporate assemblies", "University votes", "Board decisions", "Institutional DAO governance"],
    },
    social: {
      title: "Social Intelligence",
      desc: "Civitas doesn't collect opinions. It produces reliable and auditable statistical data — replacing the structural problem of traditional institutes.",
      items: ["Verifiable public surveys", "Auditable academic studies", "Manipulation-free social data", "Infrastructure for public policy"],
    },
  },

  architecture: {
    badge: "System Core",
    title: "Conceptual Architecture",
    subtitle: "Each architectural decision eliminates an entire category of fraud or dispute.",
    pillars: [
      { num: "01", icon: "🔹", title: "Survey as a Process", desc: "Versioned, auditable and closed. States: DRAFT → ACTIVE → CLOSED → FINALIZED. No changes after ACTIVE." },
      { num: "02", icon: "🔒", title: "Immutable Questionnaire", desc: "Canonical SHA256 hash generated at activation. Frozen forever. Impossible to alter retroactively." },
      { num: "03", icon: "🪪", title: "Eligibility via ZK-ID", desc: "Participation controlled by verifiable credentials and Zero-Knowledge proofs, without exposing personal data." },
      { num: "04", icon: "🔑", title: "Uniqueness via Nullifier", desc: "One participation per process. Without revealing identity. Without cross-process tracking." },
      { num: "05", icon: "🛡️", title: "Native PII Zero", desc: "The system stores no personal data. Only aggregable responses and statistical structure." },
      { num: "06", icon: "📦", title: "Verifiable Final Snapshot", desc: "Closed package with content hash and offline export. Globally reproducible audit." },
    ],
  },

  useCases: {
    badge: "Use Cases",
    title: "Who is this for?",
    cases: [
      { emoji: "🎓", label: "Universities", items: ["Auditable academic research", "Reliable population studies", "Verifiable student elections"] },
      { emoji: "🏢", label: "Companies", items: ["Assemblies with strong governance", "Verifiable organizational climate", "Internal decisions with audit"] },
      { emoji: "🏛️", label: "Government", items: ["Real public consultation", "Data for public policies", "Manipulation-free results"] },
      { emoji: "🌐", label: "International Organizations", items: ["Comparable cross-country surveys", "Data without political manipulation", "Globally verifiable reports"] },
    ],
  },

  trustLayer: {
    badge: "Real Differentiator",
    title1: "Civitas transforms",
    titleAccent1: "opinion",
    title2: "into",
    titleAccent2: "auditable data",
    title3: ".",
    differentials: [
      { icon: "🔒", label: "Immutable Question", desc: "Impossible to change after activation" },
      { icon: "🪪", label: "Controlled Participation", desc: "ZK-ID without PII exposure" },
      { icon: "✅", label: "Verifiable Result", desc: "Anyone can audit" },
    ],
    ctaPrimary: "Initialize Protocol",
    ctaSecondary: "View Technical Docs",
  },

  dashboard: {
    badge: "Operational Interface",
    operationLabel: "Active Operation",
    zkRequired: "ZK-ID Required",
    piiZero: "PII Zero",
    protocolStatus: "Protocol Status",
    participants: "Verified Participants",
    anomalies: "Anomalies Detected",
    entropy: "Data Entropy",
    entropyLabel: "High",
    entropyDesc: "Ensuring statistical significance without tracking.",
    states: [
      { id: "DRAFT", label: "Draft", desc: "Editable configuration" },
      { id: "ACTIVE", label: "Active Audit", desc: "Hash Frozen" },
      { id: "CLOSED", label: "Closed", desc: "New signatures blocked" },
      { id: "FINALIZED", label: "Finalized", desc: "Snapshot generated" },
    ],
    hashLabel: "Canonical Hash (Immutable)",
  },

  footer: {
    description: "Verifiable Social Intelligence Infrastructure. Engineering truth through mathematical certainty.",
    protocol: "Protocol",
    compliance: "Compliance",
    protocolLinks: ["ZK-ID Registry", "Nullifier Engine", "Audit Ledger"],
    complianceLinks: ["PII Zero (I4)", "RR1 Readiness", "LGPD / LFPDPPP"],
    copyright: "© 2026 Projeto Educatech AI",
    tier: "SOVEREIGN INFRASTRUCTURE TIER A+",
    result: "Result",
    audit: "Audit",
  },

  proposer: {
    title: "Propose New Protocol",
    results: "View Results",
    verifiedResults: "Verified Results",
    aggregatedData: "Aggregated Data (PII-Zero)",
    questions: "Questions",
    auditProof: "Audit Proof",
    viewInEducatech: "Verify in Educatech AI",
    auditHash: "Audit Hash",
    subtitle: "Start a sovereign survey by uploading your database or form.",
    validityLabel: "Survey Validity",
    validityDays: "days",
    privateMode: "Closed Survey (Invite Only)",
    accessCodeLabel: "Private Access Code (SIMULATION)",
    tabs: {
      file: "Upload File",
      url: "External Link",
    },
    upload: {
      title: "Drag your document here",
      subtitle: "Supports PDF, DOCX, CSV or XLSX (Max 10MB)",
      processing: "Processing and generating canonical hash...",
    },
    url: {
      title: "Link Google Forms",
      placeholder: "https://docs.google.com/forms/d/...",
      help: "The form will be processed and shielded via ZK-Proof.",
    },
    targeting: {
      title: "Audience Criteria",
      country: "Country",
      region: "Region",
      state: "State (UF)",
      city: "City",
      zone: "Zone",
      neighborhood: "Neighborhood",

      zipCode: "Zip Code",
      allowAll: "Whole Territory",
    },
    cta: "Launch Protocol on Network",
  },

  meta: {
    title: "Civitas Vote Institutional — Verifiable Governance Infrastructure",
    description: "Institutional operating system for decisions and production of verifiable statistical truth. PII-Zero. ZK-ID. Tier A+.",
  },
};
