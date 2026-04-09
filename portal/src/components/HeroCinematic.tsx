"use client";

import React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import type { Locale } from "@/i18n/getDictionary";
import { useAuth } from "@/lib/AuthContext";

interface HeroCinematicProps {
  dict: Dictionary;
  lang: Locale;
}

const HeroCinematic: React.FC<HeroCinematicProps> = ({ dict, lang }) => {
  const h = dict.hero;
  const { isOwner, setIsLoginOpen } = useAuth();

  const handleAction = () => {
    if (isOwner) {
      document.getElementById("proposer")?.scrollIntoView({ behavior: "smooth" });
    } else {
      setIsLoginOpen(true);
    }
  };

  return (
    <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden py-24">
      {/* Technical Grid Overlay */}
      <div className="absolute inset-0 tech-grid pointer-events-none opacity-40"></div>

      {/* SVG Circuit Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 1000 1000" preserveAspectRatio="xMidYMid slice">
        <defs>
          <linearGradient id="line-grad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0" />
            <stop offset="50%" stopColor="#38BDF8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#0EA5E9" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d="M 0 100 H 200 L 300 200 V 400 L 400 500 H 600" fill="none" stroke="url(#line-grad)" strokeWidth="1" className="animate-circuit" />
        <path d="M 1000 800 H 800 L 700 700 V 500 L 600 400 H 400" fill="none" stroke="url(#line-grad)" strokeWidth="1" className="animate-circuit" style={{ animationDelay: "-5s" }} />
        <path d="M 200 0 V 200 L 400 400 H 600 L 700 300" fill="none" stroke="url(#line-grad)" strokeWidth="1" className="animate-circuit" style={{ animationDelay: "-10s" }} />
      </svg>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-accent rounded-full opacity-20 animate-particle"
            style={{
              width: (i % 3) + 2 + "px",
              height: (i % 3) + 2 + "px",
              left: (i * 8.3) + "%",
              top: (i * 7.7) + "%",
              animationDuration: (15 + i) + "s",
              animationDelay: (i * 0.5) + "s",
            }}
          />
        ))}
      </div>

      {/* Language Switcher — top right (Hidden on desktop as it's in the Sidebar) */}
      <div className="absolute top-6 right-6 z-20 lg:hidden">
        <LanguageSwitcher currentLang={lang} />
      </div>

      {/* Glassmorphism Hero Content */}
      <div className="relative z-10 w-full max-w-7xl px-6 mx-auto" id="hero">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Text Content */}
          <div className="flex flex-col items-center lg:items-start text-center lg:text-left gap-8">
            <button 
              onClick={() => !isOwner && setIsLoginOpen(true)}
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-[10px] font-medium tracking-widest uppercase mb-2 transition-all ${
                isOwner 
                  ? "bg-primary/20 border-primary/30 text-primary animate-pulse" 
                  : "bg-white/5 border-white/10 text-zinc-500 hover:border-primary/30 hover:text-primary"
              }`}
            >
              {isOwner ? dict.auth.ownerMode : "Acessar Escritório de Operação"}
            </button>

            <h1 className="text-5xl md:text-6xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1]">
              {h.title} <span className="text-primary italic block sm:inline">{h.titleAccent}</span>
            </h1>

            <div className="h-px w-24 bg-gradient-to-r from-primary to-transparent my-2" />

            <h2 className="text-xl md:text-2xl font-light text-zinc-400 max-w-xl leading-relaxed">
              {h.subtitle}
            </h2>

            <p className="text-zinc-500 text-sm max-w-md font-mono uppercase tracking-[0.2em] leading-relaxed">
              {h.tagline}
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <button 
                onClick={handleAction}
                className="px-10 py-5 bg-primary text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-[#00c07a] transition-all transform hover:scale-105 shadow-xl shadow-primary/20"
              >
                {isOwner ? "Disparar Novo Protocolo" : h.ctaPrimary}
              </button>
              <button className="px-10 py-5 border border-white/10 text-white rounded-full font-bold uppercase tracking-widest text-xs hover:bg-white/5 transition-all">
                {h.ctaSecondary}
              </button>
            </div>
          </div>

          {/* Right Column: Technical Visual (Hidden on mobile) */}
          <div className="hidden lg:flex flex-col gap-6 animate-in slide-in-from-right-12 duration-1000">
            <div className="glass-panel p-8 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 font-mono text-[8px] text-zinc-700">NODE_STATUS: ONLINE</div>
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                  <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                </div>
                <div>
                  <h4 className="text-white font-semibold">ZK-Registry Protocol</h4>
                  <p className="text-[10px] text-zinc-500 uppercase tracking-widest">Enforcing PII-Zero Rule I4</p>
                </div>
              </div>

              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="h-1 flex-1 bg-zinc-900 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary/40 animate-pulse" 
                        style={{ width: `${30 + (i * 20)}%`, animationDelay: `${i * 0.2}s` }} 
                      />
                    </div>
                    <span className="font-mono text-[9px] text-zinc-700">HASH_VAL_{i}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-8 border-t border-white/5 grid grid-cols-2 gap-4">
                <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="block text-[8px] text-zinc-600 uppercase mb-1">Latency</span>
                  <span className="text-xs text-primary font-mono">1.2ms</span>
                </div>
                <div className="text-center p-3 rounded-lg bg-white/[0.02] border border-white/5">
                  <span className="block text-[8px] text-zinc-600 uppercase mb-1">Audit Rate</span>
                  <span className="text-xs text-accent font-mono">100%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Lighting pulses */}
      <div className="absolute -bottom-48 -left-48 w-96 h-96 bg-primary/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute -top-48 -right-48 w-96 h-96 bg-accent/10 rounded-full blur-[120px] pointer-events-none"></div>
    </section>
  );
};

export default HeroCinematic;
