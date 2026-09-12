import React from 'react';
import { Search, Plus, Sparkles, X } from 'lucide-react';
import { NeonAccent } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenAuth: (mode: 'login' | 'signup') => void;
  onOpenCreate: () => void;
  neonAccent: NeonAccent;
  onChangeNeonAccent: (accent: NeonAccent) => void;
  neonGlowLevel: 'subtle' | 'vibrant';
  onToggleGlowLevel: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  onOpenAuth,
  onOpenCreate,
  neonAccent,
  onChangeNeonAccent,
  neonGlowLevel,
  onToggleGlowLevel
}) => {
  const accentColors = {
    cyan: { border: '#00d2ff', bg: 'bg-[#35b7f3]', glow: 'shadow-[0_0_12px_rgba(0,210,255,0.65)]' },
    pink: { border: '#ff2a85', bg: 'bg-[#ff2a85]', glow: 'shadow-[0_0_12px_rgba(255,42,133,0.65)]' },
    emerald: { border: '#00f5a0', bg: 'bg-[#00f5a0]', glow: 'shadow-[0_0_12px_rgba(0,245,160,0.65)]' },
    amber: { border: '#ffb703', bg: 'bg-[#ffb703]', glow: 'shadow-[0_0_12px_rgba(255,183,3,0.65)]' },
  };

  return (
    <header className="sticky top-0 z-50 flex items-center justify-between gap-4 px-4 sm:px-8 py-3 bg-white/92 backdrop-blur-md border-b border-[#e6ebef] transition-all">
      {/* Brand Logo with Neon Mark */}
      <div className="flex items-center gap-2.5 shrink-0 cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
        <div 
          className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xl select-none transition-all duration-300"
          style={{
            background: 'linear-gradient(135deg, #35b7f3 0%, #0096c7 100%)',
            boxShadow: neonGlowLevel === 'vibrant'
              ? '0 0 14px rgba(0,210,255,0.7), 0 0 28px rgba(0,210,255,0.3)'
              : '0 4px 10px rgba(53,183,243,0.35)'
          }}
        >
          M
        </div>
        <span className="font-display font-extrabold text-xl tracking-tight text-[#16202a]">
          Mirest
        </span>
      </div>

      {/* Primary Links */}
      <nav className="hidden lg:flex items-center gap-1 shrink-0">
        <a 
          href="#grid" 
          className="px-3.5 py-2 rounded-full font-semibold text-sm text-[#5b6b78] hover:text-[#16202a] hover:bg-[#f1f4f6] transition-colors"
        >
          Explorer
        </a>
        <a 
          href="#hero" 
          className="px-3.5 py-2 rounded-full font-semibold text-sm text-[#5b6b78] hover:text-[#16202a] hover:bg-[#f1f4f6] transition-colors"
        >
          À propos
        </a>
        <a 
          href="#footer" 
          className="px-3.5 py-2 rounded-full font-semibold text-sm text-[#5b6b78] hover:text-[#16202a] hover:bg-[#f1f4f6] transition-colors"
        >
          Professionnels
        </a>
        <button 
          onClick={onOpenCreate}
          className="group flex items-center gap-1.5 px-3.5 py-2 rounded-full font-bold text-sm text-[#16202a] hover:bg-[#f1f4f6] transition-all cursor-pointer"
        >
          <span className="text-[#35b7f3] group-hover:scale-110 transition-transform">
            <Plus size={16} strokeWidth={2.5} />
          </span>
          Créer
        </button>
      </nav>

      {/* Search Input with Neon Accent Focus */}
      <div className="flex-1 max-w-xl relative">
        <Search 
          size={18} 
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#5b6b78] opacity-60 pointer-events-none" 
        />
        <input 
          type="text" 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Recherchez des idées pour votre déco, un plat, un voyage…"
          className="w-full pl-10 pr-9 py-2.5 rounded-full bg-[#f1f4f6] text-sm text-[#16202a] placeholder-[#5b6b78] outline-none border border-transparent transition-all focus:bg-white focus:border-[#35b7f3] focus:shadow-[0_0_12px_rgba(53,183,243,0.35)]"
        />
        {searchQuery && (
          <button 
            onClick={() => onSearchChange('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 p-0.5 rounded-full"
            aria-label="Effacer la recherche"
          >
            <X size={14} />
          </button>
        )}
      </div>

      {/* Neon Preset & Actions */}
      <div className="flex items-center gap-2.5 shrink-0">
        {/* Neon Effect Mode Selector */}
        <div className="hidden sm:flex items-center gap-1.5 bg-[#f1f4f6] p-1 rounded-full border border-[#e6ebef]">
          <button
            onClick={onToggleGlowLevel}
            title={neonGlowLevel === 'vibrant' ? "Néon Vif activé" : "Néon Subtil activé"}
            className={`flex items-center gap-1 px-2.5 py-1 text-xs font-semibold rounded-full transition-all cursor-pointer ${
              neonGlowLevel === 'vibrant' 
                ? 'bg-[#0d1b2a] text-cyan-300 shadow-[0_0_8px_rgba(0,210,255,0.4)]' 
                : 'text-[#5b6b78] hover:text-[#16202a]'
            }`}
          >
            <Sparkles size={12} className={neonGlowLevel === 'vibrant' ? 'animate-pulse text-[#00d2ff]' : ''} />
            <span className="hidden md:inline">Glow</span> {neonGlowLevel === 'vibrant' ? 'Vif' : 'Doux'}
          </button>

          <div className="flex items-center gap-1 pl-1">
            {(['cyan', 'pink', 'emerald'] as NeonAccent[]).map((acc) => (
              <button
                key={acc}
                onClick={() => onChangeNeonAccent(acc)}
                title={`Teinte Néon: ${acc}`}
                className={`w-4 h-4 rounded-full transition-all cursor-pointer ${
                  acc === 'cyan' ? 'bg-[#00d2ff]' : acc === 'pink' ? 'bg-[#ff2a85]' : 'bg-[#00f5a0]'
                } ${neonAccent === acc ? 'ring-2 ring-offset-1 ring-slate-800 scale-110' : 'opacity-60 hover:opacity-100'}`}
              />
            ))}
          </div>
        </div>

        {/* Auth action buttons */}
        <button 
          onClick={() => onOpenAuth('login')}
          className="hidden xs:inline-flex px-4 py-2 rounded-full font-bold text-sm text-[#16202a] border border-[#e6ebef] hover:bg-[#f1f4f6] hover:border-slate-300 transition-all cursor-pointer"
        >
          Se connecter
        </button>

        <button 
          onClick={() => onOpenAuth('signup')}
          className="neon-action-cyan px-4 py-2 rounded-full font-bold text-sm cursor-pointer"
        >
          S'inscrire
        </button>
      </div>
    </header>
  );
};
