"use client";

import React, { useState, useRef } from "react";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { SourceAdapterFactory, SourceType } from "../lib/adapters/SourceAdapter";
import { useAuth } from "@/lib/AuthContext";
import { LocationAutocomplete } from "./LocationAutocomplete";


interface SurveyProposerProps {
  dict: Dictionary;
  onDeploy: (survey: any) => void;
}

const SurveyProposer: React.FC<SurveyProposerProps> = ({ dict, onDeploy }) => {
  const d = dict.proposer;
  const { isOwner } = useAuth();
  const [activeTab, setActiveTab] = useState<'file' | 'url'>('file');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [url, setUrl] = useState("");
  const [validityDays, setValidityDays] = useState(60);
  const [isPrivate, setIsPrivate] = useState(false);
  const [accessCode, setAccessCode] = useState("");
  const [targetCountry, setTargetCountry] = useState("Brasil");
  const [targetRegion, setTargetRegion] = useState("");
  const [targetState, setTargetState] = useState("");
  const [targetCity, setTargetCity] = useState("");
  const [targetZone, setTargetZone] = useState("");
  const [targetNeighborhood, setTargetNeighborhood] = useState("");

  const [targetZip, setTargetZip] = useState("");

  const getTargetingString = () => {
    const parts = [targetCountry, targetRegion, targetState, targetCity, targetZone, targetNeighborhood, targetZip].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : d.targeting.allowAll;
  };


  const handleFile = async (file: File) => {
    setIsProcessing(true);
    try {
      const ext = file.name.split('.').pop()?.toLowerCase();
      let type: SourceType = 'pdf';
      if (ext === 'docx') type = 'docx';
      if (['csv', 'xlsx', 'xls'].includes(ext || '')) type = 'spreadsheet';

      const adapter = SourceAdapterFactory.getAdapter(type);
      const blueprint = await (adapter as any).process(file);
      
      // Simulate network delay for "Blockchain/Ledger" registration
      setTimeout(() => {
        const createdAt = new Date();
        const expiresAt = new Date(createdAt.getTime() + (validityDays * 24 * 60 * 60 * 1000));
        
        onDeploy({
          ...blueprint,
          id: `PROT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
          timestamp: createdAt.toISOString(),
          createdAt: createdAt.toISOString(),
          expiresAt: expiresAt.toISOString(),
          validityDays,
          status: 'ACTIVE',
          isPrivate,
          accessCode: isPrivate ? (accessCode || `CIV-${Math.random().toString(36).substr(2, 4).toUpperCase()}`) : null,
          targeting: getTargetingString(),
          targetCriteria: {
            state: targetState,
            city: targetCity,
            neighborhood: targetNeighborhood,
            zip: targetZip
          }
        });
        setIsProcessing(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsProcessing(false);
    }
  };

  const handleUrlDeploy = async () => {
    if (!url) return;
    setIsProcessing(true);
    const adapter = SourceAdapterFactory.getAdapter('google_forms');
    const blueprint = await adapter.process(url);
    
    setTimeout(() => {
      const createdAt = new Date();
      const expiresAt = new Date(createdAt.getTime() + (validityDays * 24 * 60 * 60 * 1000));

      onDeploy({
        ...blueprint,
        id: `PROT-${Math.random().toString(36).substr(2, 6).toUpperCase()}`,
        timestamp: createdAt.toISOString(),
        createdAt: createdAt.toISOString(),
        expiresAt: expiresAt.toISOString(),
        validityDays,
        status: 'ACTIVE',
        isPrivate,
        accessCode: isPrivate ? (accessCode || `CIV-${Math.random().toString(36).substr(2, 4).toUpperCase()}`) : null,
        targeting: getTargetingString(),
          targetCriteria: {
            country: targetCountry,
            region: targetRegion,
            state: targetState,
            city: targetCity,
            zone: targetZone,
            neighborhood: targetNeighborhood,
            zip: targetZip
          }

      });
      setIsProcessing(false);
      setUrl("");
    }, 2000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto mb-20 animate-in fade-in slide-in-from-bottom-8 duration-1000 scroll-mt-24" id="proposer">
      <div className="glass-panel p-8 md:p-16 rounded-[3rem] border border-white/10 relative overflow-hidden group">
        {/* Decorative backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] -mr-48 -mt-48 transition-all group-hover:bg-primary/10" />
        
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            <div className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-[10px] text-accent font-mono uppercase tracking-[0.4em] block">New Protocol Registry</span>
                {isOwner && (
                  <span className="px-2 py-0.5 bg-primary/20 border border-primary/30 text-primary text-[8px] font-bold uppercase tracking-widest rounded-full animate-pulse">
                    Owner Mode Active
                  </span>
                )}
              </div>
              <h2 className="text-4xl font-bold text-white tracking-tight leading-tight">{d.title}</h2>
              <p className="text-zinc-500 mt-4 leading-relaxed max-w-lg">{d.subtitle}</p>
            </div>

            <div className="flex gap-4 items-end mb-10">
              <div className="flex gap-1 bg-white/5 p-1 rounded-2xl w-fit border border-white/5">
                <button 
                  onClick={() => setActiveTab('file')}
                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'file' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
                >
                  {d.tabs.file}
                </button>
                <button 
                  onClick={() => setActiveTab('url')}
                  className={`px-8 py-3 rounded-xl text-xs font-bold uppercase tracking-widest transition-all ${activeTab === 'url' ? 'bg-primary text-white shadow-xl shadow-primary/20' : 'text-zinc-500 hover:text-white'}`}
                >
                  {d.tabs.url}
                </button>
              </div>

              <div className="flex-1 max-w-xs glass-panel p-4 rounded-2xl border border-white/5">
                <div className="flex justify-between mb-2">
                  <label className="text-[9px] text-zinc-500 uppercase tracking-widest">{d.validityLabel}</label>
                  <span className="text-[10px] text-primary font-mono">{validityDays} {d.validityDays}</span>
                </div>
                <input 
                  type="range" 
                  min="2" 
                  max="60" 
                  value={validityDays} 
                  onChange={(e) => setValidityDays(parseInt(e.target.value))}
                  className="w-full accent-primary h-1 bg-zinc-800 rounded-lg appearance-none cursor-pointer"
                />
              </div>
            </div>

            {activeTab === 'file' ? (
              <div 
                onDragOver={(e) => { e.preventDefault(); setDragActive(true); }}
                onDragLeave={() => setDragActive(false)}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); if (e.dataTransfer.files[0]) handleFile(e.dataTransfer.files[0]); }}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-[2rem] p-16 text-center cursor-pointer transition-all duration-500 ${dragActive ? 'border-primary bg-primary/5' : 'border-white/10 hover:border-white/20 bg-white/[0.02]'}`}
              >
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".pdf,.docx,.csv,.xlsx,.xls"
                  onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                />
                <div className="w-20 h-20 bg-white/5 rounded-3xl flex items-center justify-center mx-auto mb-8 transition-all group-hover:scale-110 group-hover:bg-primary/10 group-hover:border-primary/20 border border-white/5">
                  <svg className="w-10 h-10 text-zinc-400 group-hover:text-primary transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <h3 className="text-2xl text-white font-semibold mb-3">{isProcessing ? d.upload.processing : d.upload.title}</h3>
                <p className="text-zinc-500 text-sm tracking-wide">{d.upload.subtitle}</p>
                
                {isProcessing && (
                  <div className="mt-10 w-64 h-1.5 bg-zinc-950 mx-auto rounded-full overflow-hidden border border-white/5">
                    <div className="h-full bg-primary animate-progress shadow-[0_0_10px_#00ffa3]" />
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <div className="glass-panel p-10 rounded-[2rem] border border-white/10 bg-white/[0.02]">
                  <h3 className="text-xl text-white font-semibold mb-6">{d.url.title}</h3>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <input 
                      type="text" 
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                      placeholder={d.url.placeholder}
                      className="flex-1 bg-black/40 border border-white/10 rounded-2xl px-6 py-4 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-mono"
                    />
                    <button 
                      disabled={isProcessing || !url}
                      onClick={handleUrlDeploy}
                      className="px-10 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs hover:bg-[#00c07a] disabled:opacity-30 disabled:cursor-not-allowed transition-all shadow-xl shadow-primary/20"
                    >
                      {isProcessing ? "PROCESSING" : (isOwner ? "DISPATCH_AS_OWNER" : d.cta)}
                    </button>
                  </div>
                  <div className="mt-6 flex items-start gap-3 p-4 bg-primary/5 rounded-xl border border-primary/10">
                    <svg className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                      {d.url.help}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="lg:col-span-1 lg:flex justify-center hidden">
             <div className="w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          </div>

          <div className="lg:col-span-4 self-center">
            <div className="glass-panel p-10 rounded-[2rem] border border-white/10 bg-white/[0.01]">
              <h4 className="text-white text-sm font-bold uppercase tracking-[0.3em] mb-10 border-b border-white/5 pb-4">{d.targeting.title}</h4>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.country}</label>
                  <LocationAutocomplete 
                    type="country"
                    placeholder="Ex: Brasil, Argentina..."
                    value={targetCountry}
                    onChange={setTargetCountry}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.region}</label>
                  <input 
                    type="text"
                    value={targetRegion}
                    onChange={(e) => setTargetRegion(e.target.value)}
                    placeholder="Ex: Norte"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.state}</label>
                  <input 
                    type="text"
                    value={targetState}
                    onChange={(e) => setTargetState(e.target.value)}
                    placeholder="Ex: SP, RJ..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.zone}</label>
                  <input 
                    type="text"
                    value={targetZone}
                    onChange={(e) => setTargetZone(e.target.value)}
                    placeholder="Ex: Zona 12"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.city}</label>
                  <LocationAutocomplete 
                    type="city"
                    placeholder="Ex: São Paulo, Medellín..."
                    value={targetCity}
                    onChange={setTargetCity}
                    countryContext={targetCountry}
                  />
                </div>

                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.neighborhood}</label>
                  <input 
                    type="text"
                    value={targetNeighborhood}
                    onChange={(e) => setTargetNeighborhood(e.target.value)}
                    placeholder="Ex: Centro"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-zinc-500 text-[10px] uppercase font-bold tracking-[0.2em]">{d.targeting.zipCode}</label>
                  <input 
                    type="text"
                    inputMode="text"
                    autoComplete="off"
                    value={targetZip}
                    onChange={(e) => setTargetZip(e.target.value.replace(/[^0-9-]/g, '').substring(0, 10))}
                    placeholder="Ex: 68180-000"
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all font-mono"
                  />
                </div>
                
                <div className="pt-6">
                   <div className="flex items-center gap-3 p-4 bg-zinc-900 border border-white/5 rounded-2xl grayscale transition-all hover:grayscale-0 cursor-help">
                      <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center">
                         <svg className="w-4 h-4 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A10.003 10.003 0 0012 3a9.99 9.99 0 00-4.505 1.077l-.05.027M12 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                      </div>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest font-mono">ZK-ID Match Enabled</span>
                   </div>
                </div>
                
                <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                  <div className="flex items-center justify-between">
                    <div className="flex flex-col">
                      <span className="text-white text-sm font-semibold">{d.privateMode}</span>
                      <span className="text-[10px] text-zinc-500 uppercase tracking-widest">Protocolo Restrito</span>
                    </div>
                    <button 
                      onClick={() => setIsPrivate(!isPrivate)}
                      className={`w-12 h-6 rounded-full transition-all relative ${isPrivate ? 'bg-primary' : 'bg-zinc-800'}`}
                    >
                      <div className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-all ${isPrivate ? 'left-7' : 'left-1'}`} />
                    </button>
                  </div>

                  {isPrivate && (
                    <div className="animate-in slide-in-from-top-2 duration-300">
                      <label className="text-[9px] text-zinc-500 uppercase tracking-widest mb-2 block">{d.accessCodeLabel}</label>
                      <input 
                        type="text" 
                        value={accessCode}
                        onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                        placeholder="Ex: CASCAVEL-2026"
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-xs focus:outline-none focus:border-primary/50 transition-all font-mono"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SurveyProposer;
