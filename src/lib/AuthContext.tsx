"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  isOwner: boolean;
  setIsOwner: (val: boolean) => void;
  isAuditor: boolean;
  setIsAuditor: (val: boolean) => void;
  isLoginOpen: boolean;
  setIsLoginOpen: (val: boolean) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isOwner, setIsOwner] = useState(false);
  const [isAuditor, setIsAuditor] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  // Persistence
  useEffect(() => {
    const savedOwner = localStorage.getItem("civitas_owner_session");
    if (savedOwner === "true") setIsOwner(true);
    
    const savedAuditor = localStorage.getItem("civitas_auditor_session");
    if (savedAuditor === "true") setIsAuditor(true);
  }, []);

  const handleSetOwner = (val: boolean) => {
    setIsOwner(val);
    if (val) {
      localStorage.setItem("civitas_owner_session", "true");
      // Logout auditor if owner logs in
      setIsAuditor(false);
      localStorage.removeItem("civitas_auditor_session");
    } else {
      localStorage.removeItem("civitas_owner_session");
    }
  };

  const handleSetAuditor = (val: boolean) => {
    setIsAuditor(val);
    if (val) {
      localStorage.setItem("civitas_auditor_session", "true");
      // Logout owner if auditor logs in
      setIsOwner(false);
      localStorage.removeItem("civitas_owner_session");
    } else {
      localStorage.removeItem("civitas_auditor_session");
    }
  };

  return (
    <AuthContext.Provider value={{ 
      isOwner, 
      setIsOwner: handleSetOwner, 
      isAuditor,
      setIsAuditor: handleSetAuditor,
      isLoginOpen, 
      setIsLoginOpen 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
