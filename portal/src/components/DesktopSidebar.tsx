"use client";

import React from "react";
import type { Dictionary } from "@/i18n/dictionaries/pt";
import { Locale } from "@/i18n/getDictionary";
import LanguageSwitcher from "./LanguageSwitcher";
import { useAuth } from "@/lib/AuthContext";

interface DesktopSidebarProps {
  dict: Dictionary;
  currentLang: Locale;
}

const DesktopSidebar: React.FC<DesktopSidebarProps> = ({ dict, currentLang }) => {
  const [activeSection, setActiveSection] = React.useState("hero");
  const { isOwner, setIsOwner, setIsLoginOpen } = useAuth();
  const a = dict.auth;

  const menuItems = [
    { id: "hero", label: "Home", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
    )},
    ...(isOwner ? [{ id: "proposer", label: dict.proposer.title, icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 4v16m8-8H4" /></svg>
    )}] : []),
    { id: "dashboard", label: "Dashboard", icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
    )},
    { id: "dual-purpose", label: dict.dualPurpose.badge, icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
    )},
    { id: "architecture", label: dict.architecture.badge, icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
    )},
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-background border-r border-white/5 flex-col z-50 p-6">
      <div className="mb-12 px-2">
        <h1 className="text-xl font-bold text-white tracking-tighter">
          Civitas<span className="text-primary">Vote</span>
        </h1>
        <p className="text-[10px] text-zinc-600 uppercase tracking-[0.3em] mt-1">Institucional</p>
      </div>

      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
              activeSection === item.id 
                ? "bg-primary/10 text-primary border border-primary/20 shadow-lg shadow-primary/5" 
                : "text-zinc-500 hover:text-white hover:bg-white/5 border border-transparent"
            }`}
          >
            <span className={`${activeSection === item.id ? "text-primary" : "text-zinc-600 group-hover:text-zinc-300"}`}>
              {item.icon}
            </span>
            <span className="text-xs font-medium uppercase tracking-widest">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="mt-auto space-y-4 pt-6 border-t border-white/5">
        {isOwner ? (
          <div className="px-4 py-3 bg-primary/5 rounded-xl border border-primary/20 group relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-20">
               <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
            </div>
            <p className="text-[10px] text-primary font-bold uppercase tracking-widest mb-2">{a.ownerMode}</p>
            <button 
              onClick={() => setIsOwner(false)}
              className="text-[9px] text-zinc-500 hover:text-white uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
              {a.logout}
            </button>
          </div>
        ) : (
          <button 
            onClick={() => setIsLoginOpen(true)}
            className="w-full px-4 py-3 bg-zinc-900 border border-white/5 rounded-xl text-center group hover:border-primary/30 transition-all shadow-lg"
          >
            <p className="text-[10px] text-zinc-500 group-hover:text-primary uppercase tracking-widest transition-colors">{a.adminLogin}</p>
          </button>
        )}

        <div className="px-4 py-3 bg-zinc-900/50 rounded-xl border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-3">{dict.nav.switchLang}</p>
          <LanguageSwitcher currentLang={currentLang} />
        </div>
        
        <div className="px-4 py-3 bg-zinc-900/50 rounded-xl border border-white/5">
          <p className="text-[10px] text-zinc-500 uppercase tracking-widest mb-1">Status Rede</p>
          <div className="flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
            <span className="text-[10px] text-white font-mono uppercase">Tier A+ Active</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between px-2">
           <span className="text-[9px] text-zinc-700 uppercase tracking-widest">v1.2.0-secure</span>
           <div className="w-2 h-2 rounded-full bg-zinc-800" />
        </div>
      </div>
    </aside>
  );
};

export default DesktopSidebar;
