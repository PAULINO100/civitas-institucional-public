"use client";

import React, { useState } from "react";
import type { Dictionary } from "@/i18n/dictionaries/pt";

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: (role: 'OWNER' | 'AUDITOR' | null) => void;
  dict: Dictionary;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose, onLogin, dict }) => {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const a = dict.auth;

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(false);

    // Mock authentication logic
    setTimeout(() => {
      if (password === "CIVITAS-2026-OWNER") {
        onLogin('OWNER');
        onClose();
      } else if (password === "CIVITAS-AUDITOR-2026") {
        onLogin('AUDITOR');
        onClose();
      } else {
        setError(true);
        setIsLoading(false);
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="glass-panel w-full max-w-md p-10 rounded-[2.5rem] border border-white/10 relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -mr-16 -mt-16" />
        
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" /></svg>
        </button>

        <div className="relative z-10 text-center">
          <div className="w-16 h-16 bg-primary/10 border border-primary/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
          </div>
          
          <h2 className="text-2xl font-bold text-white tracking-tight mb-2">{a.adminLogin}</h2>
          <p className="text-zinc-500 text-sm mb-10">{a.adminSubtitle}</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 text-left">
              <label className="text-[10px] text-zinc-600 uppercase tracking-widest ml-1">{a.passwordLabel}</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={a.passwordPlaceholder}
                className={`w-full bg-black/40 border ${error ? 'border-red-500/50' : 'border-white/10'} rounded-2xl px-6 py-4 text-white focus:outline-none focus:border-primary/50 transition-all font-mono`}
                autoFocus
              />
              {error && <p className="text-red-500 text-[10px] mt-2 ml-1 uppercase tracking-widest">{a.error}</p>}
            </div>

            <button 
              type="submit"
              disabled={isLoading || !password}
              className="w-full py-5 bg-primary text-white rounded-2xl font-bold uppercase tracking-[0.2em] text-xs hover:bg-[#00c07a] transition-all transform hover:scale-[1.02] shadow-xl shadow-primary/20 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              {isLoading ? "PROTOCOL_VERIFICATION..." : a.loginCTA}
            </button>
          </form>

          <p className="mt-8 text-[9px] text-zinc-700 uppercase tracking-widest font-mono">
            Secure Operation Layer v1.2.0
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLoginModal;
