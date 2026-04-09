"use client";

import React from "react";
import type { Dictionary } from "@/i18n/dictionaries/pt";

interface ProcessLifecycleProps {
  dict: Dictionary;
  currentState?: string;
  canonicalHash?: string;
}

const ProcessLifecycle: React.FC<ProcessLifecycleProps> = ({
  dict,
  currentState = "ACTIVE",
  canonicalHash = "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
}) => {
  const states = dict.dashboard.states;
  const currentIndex = states.findIndex((s) => s.id === currentState);

  return (
    <div className="w-full relative py-8">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-zinc-800 -translate-y-1/2 z-0 hidden md:block"></div>
      <div
        className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 z-0 transition-all duration-1000 hidden md:block"
        style={{ width: `${(currentIndex / (states.length - 1)) * 100}%` }}
      ></div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-0">
        {states.map((state, idx) => {
          const isActive = idx === currentIndex;
          const isPast = idx <= currentIndex;

          return (
            <div key={state.id} className="flex flex-col items-center text-center w-full md:w-1/4">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-500 shadow-md ${
                  isActive
                    ? "bg-primary border-primary text-background shadow-primary/40 animate-pulse"
                    : isPast
                    ? "bg-zinc-800 border-primary text-primary"
                    : "bg-zinc-900 border-zinc-800 text-zinc-600"
                }`}
              >
                {isPast ? (
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <span className="text-sm font-semibold">{idx + 1}</span>
                )}
              </div>
              <div className="mt-4">
                <span className={`block text-sm font-semibold tracking-wide uppercase ${isActive ? "text-white" : isPast ? "text-zinc-300" : "text-zinc-600"}`}>
                  {state.id}
                </span>
                <span className={`block mt-1 text-xs px-2 ${isActive ? "text-zinc-400" : "text-zinc-600"}`}>
                  {state.label}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {currentIndex >= 1 && canonicalHash && (
        <div className="mt-12 flex justify-center">
          <div className="glass-panel text-center p-4 rounded-xl inline-block border border-accent/20">
            <span className="block text-xs uppercase tracking-widest text-accent mb-1 font-semibold">
              🔒 {dict.dashboard.hashLabel}
            </span>
            <code className="text-[10px] sm:text-xs text-zinc-300 font-mono tracking-wider break-all px-4 py-2 bg-black/40 rounded mt-2 block">
              {canonicalHash}
            </code>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessLifecycle;
