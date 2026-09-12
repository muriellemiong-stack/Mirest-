import React, { useMemo } from 'react';
import { PinItem, NeonAccent } from '../types';
import { MediaCard } from './MediaCard';
import { SearchX, Zap, X } from 'lucide-react';

interface MasonryGridProps {
  pins: PinItem[];
  savedPinIds: Set<string>;
  likedPinIds: Set<string>;
  onToggleSave: (id: string) => void;
  onToggleLike: (id: string) => void;
  onOpenDetails: (pin: PinItem) => void;
  onSelectCategory: (cat: string) => void;
  neonAccent: NeonAccent;
  neonGlowLevel: 'subtle' | 'vibrant';
  onToast: (msg: string) => void;
  onResetFilters: () => void;
  isBlackNeonActive: boolean;
  onToggleBlackNeon: () => void;
  selectedCardId: string | null;
  onSelectCard: (id: string | null) => void;
}

export const MasonryGrid: React.FC<MasonryGridProps> = ({
  pins,
  savedPinIds,
  likedPinIds,
  onToggleSave,
  onToggleLike,
  onOpenDetails,
  onSelectCategory,
  neonAccent,
  neonGlowLevel,
  onToast,
  onResetFilters,
  isBlackNeonActive,
  onToggleBlackNeon,
  selectedCardId,
  onSelectCard
}) => {
  // STRICT 2-COLUMN PINTEREST LAYOUT: 2 colonnes sur une ligne
  const columns = useMemo(() => {
    const col0: PinItem[] = [];
    const col1: PinItem[] = [];
    pins.forEach((pin, index) => {
      if (index % 2 === 0) {
        col0.push(pin);
      } else {
        col1.push(pin);
      }
    });
    return [col0, col1];
  }, [pins]);

  if (pins.length === 0) {
    return (
      <div className="max-w-md mx-auto my-20 p-8 text-center bg-white rounded-3xl border border-slate-200 shadow-sm">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-sky-50 text-[#0284c7] flex items-center justify-center shadow-[0_0_16px_rgba(53,183,243,0.3)]">
          <SearchX size={28} />
        </div>
        <h3 className="font-display text-lg font-bold text-[#0d1b2a] mb-2">
          Aucune idée trouvée
        </h3>
        <p className="text-sm text-[#5b6b78] mb-6">
          Essayez une autre recherche comme "déco", "recette", "DIY", ou réinitialisez les filtres.
        </p>
        <button
          onClick={onResetFilters}
          className="neon-action-cyan px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm cursor-pointer"
        >
          Voir toutes les idées
        </button>
      </div>
    );
  }

  const handleCardToggle = (id: string) => {
    if (!isBlackNeonActive) {
      // Neon light is deactivated: open details directly
      const pin = pins.find((p) => p.id === id);
      if (pin) onOpenDetails(pin);
      return;
    }
    // Neon light is active: toggle selection quietly without toast notification
    if (selectedCardId === id) {
      onSelectCard(null);
    } else {
      onSelectCard(id);
    }
  };

  return (
    <main id="grid" className="w-full max-w-[880px] mx-auto px-3 sm:px-5 py-4">
      {/* Discreet 2-column Pinterest bar with neon light toggle (always active by default, one-click disable) */}
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2 px-3 py-2 bg-white/80 backdrop-blur-md rounded-2xl border border-slate-200/80 shadow-2xs">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#0d1b2a]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_6px_#10b981]" />
          <span>Format 2 colonnes</span>
        </div>

        <div className="flex items-center gap-2">
          {/* Neon Light Toggle Button (Active by default, easily deactivated with 1 click) */}
          <button
            onClick={onToggleBlackNeon}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer border select-none ${
              isBlackNeonActive
                ? 'bg-black text-white border-neutral-800 shadow-[0_0_10px_rgba(0,0,0,0.45)] hover:bg-neutral-900'
                : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
            }`}
            title={isBlackNeonActive ? "Cliquer pour désactiver le néon light" : "Cliquer pour activer le néon light"}
          >
            <Zap size={13} className={isBlackNeonActive ? "text-amber-400 fill-current" : "text-slate-400"} />
            <span>Néon light :</span>
            <span className={isBlackNeonActive ? "font-bold text-amber-300" : "font-semibold text-slate-500"}>
              {isBlackNeonActive ? 'Activé' : 'Désactivé'}
            </span>
          </button>

          {isBlackNeonActive && selectedCardId && (
            <button
              onClick={() => onSelectCard(null)}
              className="px-2.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 hover:text-black text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
              title="Désélectionner la cellule"
            >
              <X size={12} />
              <span>Désélectionner</span>
            </button>
          )}
        </div>
      </div>

      {/* 2-COLUMN PINTEREST CONTAINER: Clean 2 columns on one line */}
      <div className="grid grid-cols-2 gap-4 sm:gap-6 items-start w-full">
        {columns.map((columnPins, colIdx) => (
          <div
            key={colIdx}
            className="flex flex-col gap-4 sm:gap-5 min-w-0"
          >
            {columnPins.map((pin) => (
              <MediaCard
                key={pin.id}
                pin={pin}
                isSaved={savedPinIds.has(pin.id)}
                isLiked={likedPinIds.has(pin.id)}
                isSelected={isBlackNeonActive && selectedCardId === pin.id}
                isBlackNeonActive={isBlackNeonActive}
                hasActiveSelection={isBlackNeonActive && Boolean(selectedCardId && selectedCardId !== pin.id)}
                onSelectCard={handleCardToggle}
                onToggleSave={onToggleSave}
                onToggleLike={onToggleLike}
                onOpenDetails={onOpenDetails}
                onSelectCategory={onSelectCategory}
                neonAccent={neonAccent}
                neonGlowLevel={neonGlowLevel}
                onToast={onToast}
              />
            ))}
          </div>
        ))}
      </div>
    </main>
  );
};
