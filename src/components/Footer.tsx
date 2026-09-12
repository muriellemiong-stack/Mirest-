import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer id="footer" className="bg-[#0d1b2a] text-[#c7d2db] pt-14 pb-8 px-4 sm:px-8 mt-12 border-t border-sky-950">
      <div className="max-w-[1280px] mx-auto flex flex-wrap gap-10 justify-between">
        {/* Brand */}
        <div className="space-y-3">
          <div className="flex items-center gap-2.5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-extrabold text-xl font-display"
              style={{
                background: 'linear-gradient(135deg, #35b7f3 0%, #0096c7 100%)',
                boxShadow: '0 0 16px rgba(0, 210, 255, 0.4)'
              }}
            >
              M
            </div>
            <span className="font-display font-extrabold text-2xl text-white tracking-tight">
              Mirest
            </span>
          </div>
          <p className="text-xs text-[#7c8ea0] max-w-xs leading-relaxed">
            La plateforme d'inspiration visuelle pour explorer, créer et enregistrer vos idées pour tous vos projets de vie.
          </p>
        </div>

        {/* Link Columns */}
        <div className="flex gap-10 sm:gap-16 flex-wrap">
          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#7c8ea0] font-bold mb-3.5">
              Application
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a href="#" className="block hover:text-white transition-colors">Télécharger sur iOS</a>
              <a href="#" className="block hover:text-white transition-colors">Télécharger sur Android</a>
              <a href="#" className="block hover:text-white transition-colors">Extension Chrome</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#7c8ea0] font-bold mb-3.5">
              Liens rapides
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a href="#grid" className="block hover:text-white transition-colors">Explorer les épingles</a>
              <a href="#" className="block hover:text-white transition-colors">Vidéos tendances</a>
              <a href="#" className="block hover:text-white transition-colors">Centre d'aide</a>
            </div>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest text-[#7c8ea0] font-bold mb-3.5">
              Légal
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm">
              <a href="#" className="block hover:text-white transition-colors">Conditions d'utilisation</a>
              <a href="#" className="block hover:text-white transition-colors">Politique de confidentialité</a>
              <a href="#" className="block hover:text-white transition-colors">Mentions légales</a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto mt-10 pt-6 border-t border-white/10 text-xs text-[#7c8ea0] flex flex-wrap justify-between items-center gap-3">
        <span>© 2026 Mirest</span>
        <span className="flex items-center gap-1.5">
          Fait avec soin et des effets néon soignés pour les curieux et créateurs
        </span>
      </div>
    </footer>
  );
};
