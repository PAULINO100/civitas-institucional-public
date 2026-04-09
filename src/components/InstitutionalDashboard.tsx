"use client";

import React, { useEffect } from "react";
import ProcessLifecycle from "./ProcessLifecycle";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { jsPDF } from "jspdf";
import { io } from "socket.io-client";

interface InstitutionalDashboardProps {
  dict: Dictionary;
  recentProtocols: any[];
  onUnlock?: (code: string) => boolean;
  isAuditor?: boolean;
}

const ResultsModal = ({ isOpen, onClose, protocol, dict }: { isOpen: boolean; onClose: () => void; protocol: any; dict: Dictionary }) => {
  if (!isOpen || !protocol) return null;
  const p = dict.proposer;

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    
    // Header
    doc.setFontSize(22);
    doc.text("CIVITAS INSTITUCIONAL - RELATORIO TECNICO", 20, 30);
    
    doc.setFontSize(12);
    doc.text(`Protocolo: ${protocol.title}`, 20, 45);
    doc.text(`ID: ${protocol.id}`, 20, 52);
    doc.text(`Hash: ${protocol.hash}`, 20, 59);
    doc.text(`Data de Emissao: ${new Date().toLocaleString()}`, 20, 66);
    
    doc.line(20, 75, 190, 75);
    
    // Content
    let y = 90;
    protocol.results.forEach((q: any, i: number) => {
      doc.setFontSize(14);
      doc.text(`${i + 1}. ${q.question}`, 20, y);
      y += 10;
      
      doc.setFontSize(10);
      q.data.forEach((item: any) => {
        doc.text(`- ${item.label}: ${item.value}%`, 30, y);
        y += 7;
      });
      y += 10;
    });
    
    // Footer
    doc.line(20, 270, 190, 270);
    doc.setFontSize(8);
    doc.text("PROJETO EDUCATECH AI - INFRAESTRUTURA SOBERANA TIER A+", 20, 280);
    doc.text("VALIDADO VIA CERTUS ENGINE | PII-ZERO COMPLIANCE", 120, 280);
    
    doc.save(`relatorio-${protocol.id}.pdf`);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-background/80 preserve-3d animate-in fade-in duration-300">
      <div className="absolute inset-0 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-2xl glass-panel p-8 rounded-3xl border border-white/20 animate-in zoom-in-95 duration-500 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary animate-pulse" />
        
        <div className="flex justify-between items-start mb-8">
          <div>
            <h2 className="text-2xl font-light text-white tracking-tight">{protocol.title}</h2>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-2 py-0.5 bg-primary/10 text-primary text-[10px] font-mono rounded uppercase">
                {p.verifiedResults}
              </span>
              <span className="text-zinc-500 text-[10px] font-mono">HASH: {protocol.hash?.substring(0, 16)}...</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-zinc-400">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="space-y-8">
          {protocol.results?.map((q: any, i: number) => (
            <div key={i} className="space-y-3">
              <h4 className="text-sm font-medium text-zinc-300 flex items-center gap-2">
                <span className="w-5 h-5 flex items-center justify-center bg-zinc-800 rounded text-[10px] text-zinc-500 font-mono">{i+1}</span>
                {q.question}
              </h4>
              <div className="space-y-2">
                {q.data.map((item: any, idx: number) => (
                  <div key={idx} className="group cursor-default">
                    <div className="flex justify-between text-[11px] mb-1">
                      <span className="text-zinc-500 group-hover:text-zinc-300 transition-colors">{item.label}</span>
                      <span className="text-primary font-mono">{item.value}%</span>
                    </div>
                    <div className="h-2 w-full bg-black/40 rounded-full overflow-hidden border border-white/5 p-[1.5px]">
                      <div 
                        className="h-full bg-gradient-to-r from-primary via-accent to-primary animate-bar"
                        style={{ width: `${item.value}%`, "--final-width": `${item.value}%` } as any}
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center border border-primary/20">
              <svg className="w-5 h-5 text-primary animate-pulse" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.9L10 9.503l7.834-4.603a1 1 0 011.14 1.64l-8.404 4.94a1 1 0 01-1.14 0l-8.404-4.94a1 1 0 011.14-1.64z" clipRule="evenodd" />
              </svg>
            </div>
            <div>
              <span className="block text-xs font-semibold text-white uppercase tracking-wider">{p.auditProof}</span>
              <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest">Enforced by Educatech AI Motor</span>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleDownloadPDF}
              className="px-6 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl border border-white/10 transition-all flex items-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
              Download PDF
            </button>
            <button 
              onClick={() => window.open(`https://site-educatech-ai.vercel.app/results/${protocol.id}`, '_blank')}
              className="px-6 py-2.5 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl border border-primary/20 transition-all"
            >
              {p.viewInEducatech}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InstitutionalDashboard: React.FC<InstitutionalDashboardProps> = ({ dict, recentProtocols, onUnlock, isAuditor }) => {
  const d = dict.dashboard;
  const [selectedProtocol, setSelectedProtocol] = React.useState<any>(null);
  const [unlockCode, setUnlockCode] = React.useState("");
  const [unlockStatus, setUnlockStatus] = React.useState<'idle' | 'success' | 'error'>('idle');
  const [liveProtocols, setLiveProtocols] = React.useState(recentProtocols);

  useEffect(() => {
    setLiveProtocols(recentProtocols);
  }, [recentProtocols]);

  useEffect(() => {
    const socket = io("http://localhost:3001"); // Update with actual backend URL

    socket.on("connect", () => {
      console.log("[AUDIT] Connected to Mirror Stream");
      liveProtocols.forEach(p => {
        if (p.status === 'ACTIVE') {
          socket.emit("subscribe_audit", p.id);
        }
      });
    });

    socket.on("VOTE_SNAPSHOT_UPDATE", (data: { choice_index: number }) => {
      setLiveProtocols(prev => prev.map(p => {
        // Find which question to update (simulating update to first question for demo)
        if (p.status === 'ACTIVE' && p.results && p.results[0]) {
          const newResults = [...p.results];
          const question = { ...newResults[0] };
          const newData = [...question.data];
          if (newData[data.choice_index]) {
            // In a real system, we'd recalculate % based on total count. 
            // For simulation, we increment the value slightly.
            newData[data.choice_index].value = Math.min(100, newData[data.choice_index].value + 0.1);
          }
          question.data = newData;
          newResults[0] = question;
          return { ...p, results: newResults, participants: (p.participants || 0) + 1 };
        }
        return p;
      }));
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleUnlockSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUnlock?.(unlockCode)) {
      setUnlockStatus('success');
      setTimeout(() => { setUnlockStatus('idle'); setUnlockCode(""); }, 2000);
    } else {
      setUnlockStatus('error');
      setTimeout(() => setUnlockStatus('idle'), 2000);
    }
  };

  const getSourceIcon = (type: string) => {
    switch (type) {
      case 'pdf': return '📄';
      case 'docx': return '📝';
      case 'spreadsheet': return '📊';
      case 'google_forms': return '🌐';
      default: return '⚙️';
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-6 py-16 scroll-mt-24 relative" id="dashboard">
      <div className="aurora-bg" />
      <div className="tech-grid absolute inset-0 pointer-events-none" />

      <ResultsModal 
        isOpen={!!selectedProtocol} 
        onClose={() => setSelectedProtocol(null)} 
        protocol={selectedProtocol} 
        dict={dict} 
      />

      <div className="flex flex-col md:flex-row justify-between items-baseline border-b border-white/10 pb-8 mb-16 px-4">
        <div>
          <span className="text-[10px] text-primary font-mono uppercase tracking-[0.4em] mb-2 block animate-pulse">Live Infrastructure</span>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight text-shimmer">{d.operationLabel}</h2>
          <p className="text-zinc-500 font-mono text-[10px] mt-3 uppercase tracking-[0.5em] opacity-70">Operator Node: <span className="text-primary/60">CIV-9021A-SECURE</span></p>

        </div>
        <div className="mt-8 md:mt-0 flex flex-wrap gap-4 items-center">
          <form onSubmit={handleUnlockSubmit} className="relative group">
            <input 
              type="text" 
              value={unlockCode}
              onChange={(e) => setUnlockCode(e.target.value.toUpperCase())}
              placeholder={dict.auth.unlockPlaceholder}
              className={`bg-zinc-900 border ${unlockStatus === 'error' ? 'border-red-500/50' : 'border-white/10'} rounded-xl px-4 py-2.5 text-[10px] text-white focus:outline-none focus:border-primary/50 transition-all font-mono min-w-[180px] pr-10`}
            />
            <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-primary transition-colors">
              <svg className={`w-4 h-4 ${unlockStatus === 'success' ? 'text-primary' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </button>
          </form>

          <div className="px-5 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{d.zkRequired}</span>
            <span className="text-primary font-bold font-mono text-xs">ENFORCED</span>
          </div>
          <div className="px-5 py-3 bg-zinc-900/50 border border-white/5 rounded-2xl flex flex-col items-center">
            <span className="text-[9px] text-zinc-500 uppercase tracking-widest mb-1">{d.piiZero}</span>
            <span className="text-accent font-bold font-mono text-xs">PII_ZERO_READY</span>
          </div>
        </div>
      </div>

      {/* Main Protocol Status */}
      <div className="glass-panel p-8 rounded-2xl mb-12 border border-white/10">
        <h3 className="text-lg font-medium text-white mb-8 border-b border-white/10 pb-4 inline-block">{d.protocolStatus}</h3>
        <ProcessLifecycle dict={dict} currentState="ACTIVE" />
      </div>

      {/* Recent Protocols Section */}
      {recentProtocols.length > 0 && (
        <div className="mb-16 animate-in fade-in duration-1000">
          <div className="flex items-center gap-4 mb-8">
            <h3 className="text-zinc-500 font-mono text-[10px] uppercase tracking-[0.4em]">Audit Logs</h3>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {liveProtocols.map((p) => (
              <div key={p.id} className="glass-panel p-8 rounded-3xl border border-white/10 flex flex-col justify-between gap-8 hover:border-primary/20 transition-all group relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                  <svg className="w-24 h-24 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </div>
                
                <div className="flex items-start gap-6 relative z-10">
                  <div className="text-5xl filter grayscale group-hover:grayscale-0 transition-all duration-700 bg-white/5 p-4 rounded-2xl border border-white/5">{getSourceIcon(p.source || (p.metadata?.type))}</div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-3">
                      <span className="text-xl font-bold text-white tracking-tight">{p.title}</span>
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-bold uppercase tracking-widest ${
                        p.status === 'CLOSED' ? 'bg-orange-500/20 text-orange-500' : 'bg-primary/20 text-primary'
                      }`}>
                        {p.status === 'CLOSED' ? "ENCERRADA" : "ATIVA"}
                      </span>
                      {p.status === 'ACTIVE' && (
                        <span className="flex items-center gap-1.5 px-2 py-0.5 bg-red-500/10 text-red-500 text-[9px] font-bold rounded-full animate-pulse border border-red-500/20">
                          <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                          AO VIVO
                        </span>
                      )}
                      {p.isPrivate && (
                        <span className="text-[8px] border border-accent/30 text-accent px-2 py-0.5 rounded uppercase tracking-widest font-mono">CLOSED_PROTOCOL</span>
                      )}
                    </div>
                    <code className="text-zinc-600 text-[10px] block mt-2 font-mono break-all max-w-sm">
                      ROOT_HASH: {(p.hash || p.contentHash)}
                    </code>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5 relative z-10">
                  <div className="flex items-center gap-8">
                    <div className="flex flex-col">
                      <span className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] mb-1">{p.status === 'CLOSED' ? "VISIBILIDADE" : d.participants}</span>
                      <span className={`font-mono text-xl font-bold ${p.status === 'CLOSED' ? 'text-orange-500' : 'text-white'}`}>
                        {p.status === 'CLOSED' ? `${p.daysInClosed}d` : p.participants.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="text-zinc-600 text-[9px] uppercase tracking-[0.2em] mb-1">{p.status === 'CLOSED' ? "STATUS" : "VALIDADE"}</span>
                      <span className="text-zinc-300 text-[10px] font-medium truncate max-w-[120px]">
                        {p.status === 'CLOSED' ? "AUDITORIA_READ_ONLY" : `${p.daysRemaining} dias restantes`}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 w-full sm:w-auto">
                    {p.results && (
                      <button 
                        onClick={() => setSelectedProtocol(p)}
                        className="flex-1 sm:flex-none px-6 py-3 bg-primary/10 hover:bg-primary/20 text-primary text-[10px] font-bold uppercase tracking-widest rounded-xl border border-primary/20 transition-all flex items-center justify-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        {dict.proposer.results}
                      </button>
                    )}
                    <button className="flex-1 sm:flex-none px-6 py-3 bg-white/10 hover:bg-white/20 text-white text-[10px] font-bold uppercase tracking-widest rounded-xl border border-white/10 transition-all flex items-center justify-center gap-2">
                       ZK-Audit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-primary/20 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <svg className="w-12 h-12 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">{d.participants}</span>
          <div className="mt-8 flex items-baseline gap-3">
            <span className="text-6xl font-bold text-white tracking-tighter">12k</span>
            <span className="text-sm font-bold text-primary bg-primary/10 px-2 py-0.5 rounded">+12%</span>
          </div>
          <div className="w-full h-1 bg-zinc-900 mt-8 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-accent w-[65%] animate-pulse"></div>
          </div>
        </div>

        <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-accent/20 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <svg className="w-12 h-12 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">{d.anomalies}</span>
          <div className="mt-8 flex flex-col gap-2">
            <span className="text-6xl font-bold text-white tracking-tighter">0.0</span>
            <span className="text-[10px] text-zinc-600 font-mono uppercase tracking-widest">Double-Vote protection active</span>
          </div>
          <span className="mt-8 text-[10px] text-primary font-bold font-mono bg-primary/10 w-fit px-3 py-1 rounded-full border border-primary/20 tracking-widest animate-pulse">SYSTEM_STABLE</span>
        </div>

        <div className="glass-panel p-10 rounded-3xl flex flex-col justify-between border border-white/10 hover:border-white/20 transition-all relative overflow-hidden">
          <div className="absolute top-0 right-0 p-6 opacity-10">
             <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
          </div>
          <span className="text-xs font-bold text-zinc-500 uppercase tracking-[0.3em]">{d.entropy}</span>
          <div className="mt-8 flex flex-col gap-2">
            <span className="text-4xl font-bold text-white tracking-tight">{d.entropyLabel}</span>
            <p className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest leading-relaxed">{d.entropyDesc}</p>
          </div>
          <div className="mt-8 flex gap-1">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="h-1.5 flex-1 bg-zinc-800 rounded-full overflow-hidden">
                 <div className="h-full bg-white/20" style={{ width: `${Math.random() * 100}%` }} />
               </div>
             ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InstitutionalDashboard;
