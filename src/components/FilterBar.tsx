import React from 'react';
import { SlidersHorizontal, Sparkles, Video, Grid, Bookmark, User, Palette } from 'lucide-react';
import { MediaType, NeonAccent } from '../types';

interface FilterBarProps {
  activeTab: string;
  onSelectTab: (tab: string) => void;
  mediaTypeFilter: MediaType | 'all';
  onSelectMediaType: (type: MediaType | 'all') => void;
  isLessAiActive: boolean;
  onToggleLessAi: () => void;
  neonAccent: NeonAccent;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeTab,
  onSelectTab,
  mediaTypeFilter,
  onSelectMediaType,
  isLessAiActive,
  onToggleLessAi,
  neonAccent
}) => {
  const tabs = [
    { id: 'all', label: 'Toutes les Épingles', icon: Grid },
    { id: 'video', label: 'Vidéos', icon: Video, type: 'video' as MediaType },
    { id: 'diy', label: 'DIY & Créations', icon: Palette, type: 'diy' as MediaType },
    { id: 'boards', label: 'Tableaux', icon: Bookmark },
    { id: 'profiles', label: 'Créateurs', icon: User },
  ];

  return (
    <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-5 pb-3 flex items-center gap-2.5 flex-wrap">
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
        {tabs.map((tab) => {
          const isActive = activeTab === tab.id;
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                onSelectTab(tab.id);
                if (tab.type) {
                  onSelectMediaType(tab.type);
                } else if (tab.id === 'all') {
                  onSelectMediaType('all');
                }
              }}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-bold text-xs sm:text-sm tracking-tight whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'bg-[#0d1b2a] text-white shadow-[0_0_12px_rgba(0,210,255,0.45)] border border-sky-400/40 scale-[1.02]'
                  : 'bg-[#f1f4f6] text-[#16202a] hover:bg-[#e4e9ed] border border-transparent'
              }`}
            >
              <Icon size={14} className={isActive ? 'text-[#35b7f3]' : 'text-[#5b6b78]'} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="ml-auto flex items-center gap-4 py-1">
        {/* AI Toggle Switch with neon effect */}
        <div 
          onClick={onToggleLessAi}
          className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#5b6b78] select-none cursor-pointer hover:text-[#16202a]"
          title="Filtrer les contenus générés par IA"
        >
          <span>Moins d'IA</span>
          <button
            type="button"
            role="switch"
            aria-checked={isLessAiActive}
            className={`w-10 h-6 rounded-full transition-all relative border cursor-pointer ${
              isLessAiActive 
                ? 'bg-[#35b7f3] border-cyan-300 shadow-[0_0_10px_rgba(0,210,255,0.7)]' 
                : 'bg-[#e6ebef] border-transparent'
            }`}
          >
            <span 
              className={`block w-4 h-4 rounded-full bg-white shadow-xs transition-transform duration-200 mt-0.5 ml-0.5 ${
                isLessAiActive ? 'translate-x-4 shadow-[0_0_6px_#fff]' : 'translate-x-0'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
