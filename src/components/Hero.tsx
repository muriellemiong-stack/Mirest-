import React from 'react';
import { Sparkles, ArrowRight, Video, Compass } from 'lucide-react';

interface HeroProps {
  onOpenSignup: () => void;
  onOpenLogin: () => void;
  onSelectTag: (tag: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenSignup, onOpenLogin, onSelectTag }) => {
  const suggestions = [
    'déco scandinave',
    'recette d’automne',
    'voyage Portugal',
    'DIY bois',
    'mode minimaliste'
  ];

  return (
    <section id="hero" className="pt-12 pb-10 px-4 sm:px-8 text-center bg-gradient-to-b from-[#eaf7ff] via-[#f4fbff] to-[#fbfcfd] border-b border-[#e6ebef]/50">
      <div className="max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/80 border border-sky-200 text-sky-700 text-xs font-semibold mb-5 shadow-xs">
          <Sparkles size={13} className="text-[#00d2ff] animate-pulse" />
          <span>Découvrez les nouvelles actions interactives à effet néon</span>
        </div>

        <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0d1b2a] leading-[1.12] mb-4">
          Créez la vie que vous aimez, <br className="hidden sm:inline" />
          <span className="text-[#1c93d4] bg-clip-text">une idée à la fois</span>
        </h1>

        <p className="text-base sm:text-lg text-[#5b6b78] max-w-xl mx-auto mb-7 font-normal">
          Mirest rassemble des millions d'idées en déco, mode, cuisine et voyage pour nourrir vos prochains projets.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-3.5 mb-7">
          <button 
            onClick={onOpenSignup}
            className="neon-action-cyan px-6 py-3 rounded-full font-bold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <span>Rejoignez Mirest gratuitement</span>
            <ArrowRight size={16} />
          </button>
          <button 
            onClick={onOpenLogin}
            className="px-6 py-3 rounded-full font-bold text-sm sm:text-base text-[#1c93d4] bg-white border border-[#35b7f3] hover:bg-[#eaf7ff] hover:shadow-[0_0_12px_rgba(53,183,243,0.3)] transition-all cursor-pointer"
          >
            J'ai déjà un compte
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center justify-center gap-2 flex-wrap text-xs text-[#5b6b78]">
          <span className="font-medium text-[#16202a]">Tendances :</span>
          {suggestions.map((item) => (
            <button
              key={item}
              onClick={() => onSelectTag(item)}
              className="px-3 py-1 rounded-full bg-white border border-[#e6ebef] hover:border-[#35b7f3] hover:text-[#0284c7] hover:shadow-[0_0_8px_rgba(0,210,255,0.3)] transition-all cursor-pointer font-medium"
            >
              #{item}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
