"use client";

import React, { useState, useEffect, useRef } from "react";

interface LocationAutocompleteProps {
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  type: "country" | "city";
  countryContext?: string;
}

export const LocationAutocomplete: React.FC<LocationAutocompleteProps> = ({
  placeholder,
  value,
  onChange,
  type,
  countryContext,
}) => {
  const [query, setQuery] = useState(value);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setQuery(value);
  }, [value]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const searchLocations = async (searchQuery: string) => {
    if (searchQuery.length < 3) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      // Nominatim search with LATAM focus or context
      let q = searchQuery;
      if (type === "city" && countryContext) {
        q = `${searchQuery}, ${countryContext}`;
      }
      
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(q)}&accept-language=pt,es,en&limit=5${type === 'country' ? '&featuretype=country' : ''}`
      );
      const data = await response.json();
      setSuggestions(data);
    } catch (error) {
      console.error("Location search error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query !== value && query.length >= 3) {
        searchLocations(query);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  return (
    <div className="relative w-full" ref={containerRef}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-primary/50 transition-all"
        />
        {loading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-primary/20 border-t-primary rounded-full animate-spin" />
          </div>
        )}
      </div>

      {isOpen && suggestions.length > 0 && (
        <div className="absolute z-[100] w-full mt-2 glass-panel border border-white/10 rounded-xl overflow-hidden shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                const name = item.display_name.split(",")[0];
                onChange(name);
                setQuery(name);
                setIsOpen(false);
              }}
              className="w-full text-left px-4 py-3 text-sm text-zinc-300 hover:bg-primary/10 hover:text-white transition-colors border-b border-white/5 last:border-0"
            >
              <div className="flex flex-col">
                <span className="font-semibold">{item.display_name.split(",")[0]}</span>
                <span className="text-[10px] text-zinc-500 truncate">{item.display_name}</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
