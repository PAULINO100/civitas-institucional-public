"use client";

import { useState, useEffect } from "react";
import { getDictionary, defaultLocale, locales, type Locale } from "@/i18n/getDictionary";
import HeroCinematic from "@/components/HeroCinematic";
import InstitutionalDashboard from "@/components/InstitutionalDashboard";
import SurveyProposer from "@/components/SurveyProposer";
import AdminLoginModal from "@/components/AdminLoginModal";
import { useAuth } from "@/lib/AuthContext";
import type { Dictionary } from "@/i18n/dictionaries/pt";

function SectionDivider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-4 my-8">
      <div className="h-px flex-1 bg-white/10" />
      <span className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em]">{label}</span>
      <div className="h-px flex-1 bg-white/10" />
    </div>
  );
}

function DualPurposeSection({ dict }: { dict: Dictionary }) {
  const d = dict.dualPurpose;
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">{d.badge}</span>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">{d.title}</h2>
        <p className="mt-4 text-zinc-500 max-w-2xl mx-auto text-lg">{d.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="glass-panel p-10 rounded-2xl border border-white/8 group hover:border-primary/30 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-all">
            <svg className="w-6 h-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">{d.gov.title}</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">{d.gov.desc}</p>
          <ul className="space-y-3 text-sm text-zinc-500">
            {d.gov.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-primary rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-panel p-10 rounded-2xl border border-white/8 group hover:border-accent/30 transition-all duration-500">
          <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-all">
            <svg className="w-6 h-6 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-white mb-3">{d.social.title}</h3>
          <p className="text-zinc-400 leading-relaxed mb-6">{d.social.desc}</p>
          <ul className="space-y-3 text-sm text-zinc-500">
            {d.social.items.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-accent rounded-full flex-shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ArchitectureSection({ dict }: { dict: Dictionary }) {
  const d = dict.architecture;
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">{d.badge}</span>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">{d.title}</h2>
        <p className="mt-4 text-zinc-500 max-w-xl mx-auto">{d.subtitle}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {d.pillars.map((p) => (
          <div key={p.num} className="glass-panel p-6 rounded-xl border border-white/8 hover:border-white/15 transition-all duration-300 group">
            <div className="flex items-start justify-between mb-4">
              <span className="text-2xl">{p.icon}</span>
              <span className="font-mono text-xs text-zinc-700 group-hover:text-zinc-500 transition-colors">{p.num}</span>
            </div>
            <h4 className="text-white font-semibold mb-2">{p.title}</h4>
            <p className="text-zinc-500 text-sm leading-relaxed">{p.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function UseCasesSection({ dict }: { dict: Dictionary }) {
  const d = dict.useCases;
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="text-center mb-16">
        <span className="text-xs font-mono uppercase tracking-widest text-accent mb-4 block">{d.badge}</span>
        <h2 className="text-4xl md:text-5xl font-light text-white tracking-tight">{d.title}</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {d.cases.map((c) => (
          <div key={c.label} className="glass-panel p-6 rounded-xl border border-white/8 text-center hover:border-primary/30 transition-all duration-300">
            <div className="text-4xl mb-4">{c.emoji}</div>
            <h4 className="text-white font-semibold mb-4">{c.label}</h4>
            <ul className="space-y-2">
              {c.items.map((item) => (
                <li key={item} className="text-zinc-500 text-xs">{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

function TrustLayerSection({ dict }: { dict: Dictionary }) {
  const d = dict.trustLayer;
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-24">
      <div className="glass-panel rounded-3xl border border-white/10 p-12 md:p-16 text-center relative overflow-hidden">
        <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/5 rounded-full blur-[80px]" />
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-accent/5 rounded-full blur-[80px]" />
        <div className="relative z-10">
          <span className="text-xs font-mono uppercase tracking-widest text-accent mb-6 block">{d.badge}</span>
          <h2 className="text-3xl md:text-5xl font-light text-white tracking-tight max-w-3xl mx-auto leading-tight mb-8">
            {d.title1}{" "}
            <span className="text-primary font-semibold">{d.titleAccent1}</span>{" "}
            {d.title2}{" "}
            <span className="text-accent font-semibold">{d.titleAccent2}</span>
            {d.title3}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            {d.differentials.map((item) => (
              <div key={item.label} className="text-center">
                <div className="text-3xl mb-3">{item.icon}</div>
                <div className="text-white font-semibold mb-1">{item.label}</div>
                <div className="text-zinc-500 text-sm">{item.desc}</div>
              </div>
            ))}
          </div>
          <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-primary text-white rounded-full font-semibold hover:bg-[#00c07a] transition-all transform hover:scale-105 shadow-lg shadow-primary/20">
              {d.ctaPrimary}
            </button>
            <button className="px-8 py-4 border border-white/10 text-white rounded-full font-semibold hover:bg-white/5 transition-all">
              {d.ctaSecondary}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer({ dict }: { dict: Dictionary }) {
  const d = dict.footer;
  return (
    <footer className="py-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="max-w-xs text-center md:text-left">
          <h3 className="text-white font-semibold mb-2 tracking-tight">CivitasVote Institucional</h3>
          <p className="text-zinc-500 text-sm leading-relaxed">{d.description}</p>
        </div>
        <div className="flex gap-12 text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-white font-medium">{d.protocol}</span>
            {d.protocolLinks.map((l) => <span key={l} className="text-zinc-600">{l}</span>)}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-white font-medium">{d.compliance}</span>
            {d.complianceLinks.map((l) => <span key={l} className="text-zinc-600">{l}</span>)}
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-6 mt-12 flex justify-between items-center text-[10px] font-mono text-zinc-700 uppercase tracking-widest">
        <span>{d.copyright}</span>
        <span>{d.tier}</span>
      </div>
    </footer>
  );
}

export default function Page({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const [dict, setDict] = useState<Dictionary | null>(null);
  const [resolvedParams, setResolvedParams] = useState<{ lang: string } | null>(null);
  const [isOwner, setIsOwner] = useState(true); // Forcing to true for simulation so all polls appear
  const [isAuditor, setIsAuditor] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [unlockedProtocols, setUnlockedProtocols] = useState<string[]>([]);
  
  // Mock User Session Profile
  const [userProfile] = useState({
    country: 'Venezuela',
    state: 'Distrito Capital',
    city: 'Caracas',
    neighborhood: 'Chacao',
    zip: '1060'
  });
  const [protocols, setProtocols] = useState<any[]>([
    {
      id: 'itaituba-v1-mock',
      title: 'Renovação da Frota de Balsas - Rio Tapajós',
      status: 'CLOSED',
      createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      validityDays: 15,
      source: 'pdf',
      hash: 'sha256-8a9d1c2b3e4f5g6h7i8j9k0l1m2n3o4p5q6r7s8t',
      targeting: 'Itaituba (PA)',
      participants: 4521,
      isPrivate: true,
      daysInClosed: 2,
      targetCriteria: {
        state: 'Pará (PA)',
        city: 'Itaituba'
      },
      results: [
        {
          question: '1. Você é a favor do subsídio de 30% na tarifa para estudantes?',
          data: [
            { label: 'Sim, concordo totalmente', value: 72 },
            { label: 'Indiferente', value: 10 },
            { label: 'Não, o valor deve ser integral', value: 18 }
          ]
        },
        {
          question: '2. Qual modelo de embarcação atende melhor a rota?',
          data: [
            { label: 'Catamarã Rápido (30min)', value: 85 },
            { label: 'Balsa Tradicional (1h)', value: 15 }
          ]
        }
      ]
    },
    {
      id: 'venezuela-audit-2026',
      title: 'Auditoria de Votos e Segurança Nacional - Venezuela',
      status: 'ACTIVE',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
      validityDays: 12,
      source: 'app',
      hash: 'sha256-ve83j9k10m293n18283kdn19283n19283kaudit',
      targeting: 'Venezuela (Nacional)',
      participants: 21300000,
      isPrivate: false,
      targetCriteria: {
        country: 'Venezuela'
      },
      results: [
        {
          question: '1. Você confia no sistema atual de votação eletrônica sem recibo impresso auditável?',
          data: [
            { label: 'Confio Totalmente', value: 5 },
            { label: 'Confio Parcialmente', value: 15 },
            { label: 'Não Confio', value: 80 }
          ]
        },
        {
          question: '2. Em uma escala de 1 a 5, qual a importância de poder verificar seu voto de forma anônima e segura via ZK-ID?',
          data: [
            { label: '5 (Muito Importante)', value: 85 },
            { label: '4 (Importante)', value: 10 },
            { label: '3 (Neutro)', value: 3 },
            { label: '2 (Pouco Importante)', value: 1 },
            { label: '1 (Nada Importante)', value: 1 }
          ]
        },
        {
          question: '3. Você se sentiria mais seguro votando se o sistema usasse Criptografia de Conhecimento Zero (Zero-Knowledge Proofs)?',
          data: [
            { label: 'Sim, com certeza', value: 75 },
            { label: 'Talvez, preciso entender melhor', value: 20 },
            { label: 'Não faz diferença', value: 5 }
          ]
        },
        {
          question: '4. Qual a sua percepção sobre a transparência do processo de apuração dos votos?',
          data: [
            { label: 'Totalmente Transparente', value: 2 },
            { label: 'Parcialmente Transparente', value: 18 },
            { label: 'Opaco / Suspeito', value: 80 }
          ]
        },
        {
          question: '5. Você concorda com o modelo onde não há recibo fisico, sendo passível de ser auditável em qualquer computador em todo País?',
          data: [
            { label: 'Totalmente a favor', value: 90 },
            { label: 'Parcialmente a favor', value: 5 },
            { label: 'Contra', value: 5 }
          ]
        },
        {
          question: '6. Na sua opinião, quem deve realizar a auditoria do sistema de votação?',
          data: [
            { label: 'Consórcio Internacional Neutro', value: 45 },
            { label: 'O próprio Governo', value: 5 },
            { label: 'Cidadãos (via Open Source & ZK-ID)', value: 40 },
            { label: 'Partidos Políticos', value: 10 }
          ]
        },
        {
          question: '7. Você acredita que a vinculação da sua identidade civil ao seu voto pode ser evitada com tecnologias soberanas defendidas pela tecnologia ZK Midnight?',
          data: [
            { label: 'Sim, tecnologias PII-Zero garantem isso', value: 65 },
            { label: 'Não tenho certeza', value: 25 },
            { label: 'Não, sempre descobrirão', value: 10 }
          ]
        },
        {
          question: '8. Você participaria de uma eleição oficial diretamente no seu celular, dispensando o uso de urnas atuais?',
          data: [
            { label: 'Sim, imediatamente', value: 80 },
            { label: 'Depende da aprovação legal', value: 15 },
            { label: 'Não', value: 5 }
          ]
        }
      ]
    },
    {
      id: 'itaituba-2026-x',
      title: 'Infraestrutura Urbana - Itaituba/PA',
      status: 'ACTIVE',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      expiresAt: new Date(Date.now() + 55 * 24 * 60 * 60 * 1000).toISOString(),
      validityDays: 60,
      source: 'pdf',
      hash: 'sha256-itb73x92k910m283n19283kdn19283n19283k',
      targeting: 'Itaituba, PA (Brasil)',
      participants: 520,
      isPrivate: false,
      targetCriteria: {
        state: 'Pará (PA)',
        city: 'Itaituba'
      },
      results: [
        {
          question: 'Qualidade do Saneamento Básico',
          data: [
            { label: 'Excelente', value: 5 },
            { label: 'Bom', value: 15 },
            { label: 'Regular', value: 45 },
            { label: 'Ruim', value: 25 },
            { label: 'Péssimo', value: 10 }
          ]
        }
      ]
    }
  ]);

  useEffect(() => {
    params.then(p => {
      setResolvedParams(p);
      const lang = (locales.includes(p.lang as Locale) ? p.lang : defaultLocale) as Locale;
      getDictionary(lang).then(setDict);
    });
  }, [params]);

  if (!dict || !resolvedParams) return null;

  const handleDeploy = (newProtocol: any) => {
    setProtocols([newProtocol, ...protocols]);
  };

  const handleUnlock = (code: string) => {
    const protocol = protocols.find(p => p.accessCode === code);
    if (protocol && !unlockedProtocols.includes(protocol.id)) {
      setUnlockedProtocols([...unlockedProtocols, protocol.id]);
      return true;
    }
    return false;
  };

  const getFilteredProtocols = () => {
    if (isOwner || isAuditor) return protocols;

    const now = new Date();
    return protocols.filter(p => {
      const expiresAt = new Date(p.expiresAt);
      const hideAt = new Date(expiresAt.getTime() + 7 * 24 * 60 * 60 * 1000);

      // Hidden Stage: After expiry + 7 days
      if (now > hideAt) return false;

      // Private Mode Stage: Requires Unlock Code
      if (p.isPrivate && !unlockedProtocols.includes(p.id)) return false;

      // Targeting Stage: Check location
      if (p.targetCriteria) {
        const { state, city, zip } = p.targetCriteria;
        if (state && !userProfile.state.includes(state)) return false;
        if (city && userProfile.city !== city) return false;
        if (zip && userProfile.zip !== zip) return false;
      }

      return true;
    }).map(p => {
      const now = new Date();
      const expiresAt = new Date(p.expiresAt);
      
      // Dynamic Status: ACTIVE or CLOSED (Encerrada)
      return {
        ...p,
        status: now > expiresAt ? 'CLOSED' : 'ACTIVE',
        daysRemaining: Math.ceil((expiresAt.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)),
        daysInClosed: now > expiresAt ? 7 - Math.ceil((now.getTime() - expiresAt.getTime()) / (24 * 60 * 60 * 1000)) : 0
      };
    });
  };

  const filteredProtocols = getFilteredProtocols();

  return (
    <main className="min-h-screen bg-background text-zinc-100">
      <HeroCinematic dict={dict} lang={resolvedParams.lang as Locale} />
      
      <div className="relative z-20">
        {isOwner && (
          <div id="proposer" className="scroll-mt-24">
            <SectionDivider label={dict.proposer.title} />
            <SurveyProposer dict={dict} onDeploy={handleDeploy} />
          </div>
        )}

        <SectionDivider label={dict.dualPurpose.badge} />
        <div id="dual-purpose" className="scroll-mt-24">
          <DualPurposeSection dict={dict} />
        </div>
        
        <SectionDivider label={dict.architecture.badge} />
        <div id="architecture" className="scroll-mt-24">
          <ArchitectureSection dict={dict} />
        </div>
        
        <SectionDivider label={dict.useCases.badge} />
        <div id="use-cases" className="scroll-mt-24">
          <UseCasesSection dict={dict} />
        </div>
        
        <SectionDivider label={dict.trustLayer.badge} />
        <div id="trust-layer" className="scroll-mt-24">
          <TrustLayerSection dict={dict} />
        </div>
        
        <section className="relative z-20 bg-background/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <SectionDivider label={dict.dashboard.badge} />
            <InstitutionalDashboard 
              dict={dict} 
              recentProtocols={filteredProtocols}
              onUnlock={handleUnlock}
              isAuditor={isAuditor}
            />
          </div>
        </section>
        
        <Footer dict={dict} />
      </div>

      <AdminLoginModal 
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLogin={(role) => {
          if (role === 'AUDITOR') {
            setIsAuditor(true);
          } else if (role === 'OWNER') {
            setIsOwner(true);
          } else {
            setIsOwner(false);
            setIsAuditor(false);
          }
        }}
        dict={dict}
      />
    </main>
  );
}
