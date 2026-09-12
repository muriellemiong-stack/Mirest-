import React, { useState, useMemo } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FilterBar } from './components/FilterBar';
import { MasonryGrid } from './components/MasonryGrid';
import { PinModal } from './components/PinModal';
import { AuthModal } from './components/AuthModal';
import { CreateModal } from './components/CreateModal';
import { Footer } from './components/Footer';
import { NeonToast } from './components/NeonToast';
import { INITIAL_PINS } from './data/mockPins';
import { PinItem, MediaType, NeonAccent } from './types';

export default function App() {
  const [pins, setPins] = useState<PinItem[]>(INITIAL_PINS);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [mediaTypeFilter, setMediaTypeFilter] = useState<MediaType | 'all'>('all');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isLessAiActive, setIsLessAiActive] = useState(false);

  // User interactions
  const [savedPinIds, setSavedPinIds] = useState<Set<string>>(new Set(['pin-1', 'pin-5']));
  const [likedPinIds, setLikedPinIds] = useState<Set<string>>(new Set(['pin-2']));

  // Modals
  const [selectedPin, setSelectedPin] = useState<PinItem | null>(null);
  const [authModal, setAuthModal] = useState<{ isOpen: boolean; mode: 'login' | 'signup' }>({
    isOpen: false,
    mode: 'signup'
  });
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Neon custom visual styles
  const [neonAccent, setNeonAccent] = useState<NeonAccent>('cyan');
  const [neonGlowLevel, setNeonGlowLevel] = useState<'subtle' | 'vibrant'>('vibrant');

  // Pinterest card selection with black neon light frame (active by default, easily deactivated)
  const [isBlackNeonActive, setIsBlackNeonActive] = useState<boolean>(true);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);

  // Feedback Toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((current) => (current === msg ? null : current));
    }, 2400);
  };

  // Actions handling
  const handleToggleSave = (id: string) => {
    setSavedPinIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast("Épingle retirée de vos tableaux");
      } else {
        next.add(id);
        showToast("Épingle enregistrée dans vos tableaux !");
      }
      return next;
    });
  };

  const handleToggleLike = (id: string) => {
    setLikedPinIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
        showToast("Ajouté à vos favoris avec éclat néon !");
      }
      return next;
    });
  };

  const handleCreatePin = (newPin: PinItem) => {
    setPins((prev) => [newPin, ...prev]);
  };

  // Filtered pins list
  const filteredPins = useMemo(() => {
    return pins.filter((pin) => {
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = pin.title.toLowerCase().includes(q);
        const matchesCategory = pin.category.toLowerCase().includes(q);
        const matchesAuthor = pin.author.name.toLowerCase().includes(q);
        const matchesTags = pin.tags.some((t) => t.toLowerCase().includes(q));
        if (!matchesTitle && !matchesCategory && !matchesAuthor && !matchesTags) {
          return false;
        }
      }

      // Media type filter
      if (mediaTypeFilter !== 'all' && pin.type !== mediaTypeFilter) {
        return false;
      }

      // Specific Category click
      if (selectedCategory && pin.category.toLowerCase() !== selectedCategory.toLowerCase()) {
        return false;
      }

      // "Moins d'IA" simulation
      if (isLessAiActive && pin.tags.includes('ai-generated')) {
        return false;
      }

      return true;
    });
  }, [pins, searchQuery, mediaTypeFilter, selectedCategory, isLessAiActive]);

  const resetAllFilters = () => {
    setSearchQuery('');
    setActiveTab('all');
    setMediaTypeFilter('all');
    setSelectedCategory(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fbfcfd] text-[#16202a]">
      {/* Navigation */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={(q) => {
          setSearchQuery(q);
          if (selectedCategory) setSelectedCategory(null);
        }}
        onOpenAuth={(mode) => setAuthModal({ isOpen: true, mode })}
        onOpenCreate={() => setIsCreateOpen(true)}
        neonAccent={neonAccent}
        onChangeNeonAccent={setNeonAccent}
        neonGlowLevel={neonGlowLevel}
        onToggleGlowLevel={() => setNeonGlowLevel((prev) => (prev === 'vibrant' ? 'subtle' : 'vibrant'))}
      />

      {/* Hero Header */}
      <Hero
        onOpenSignup={() => setAuthModal({ isOpen: true, mode: 'signup' })}
        onOpenLogin={() => setAuthModal({ isOpen: true, mode: 'login' })}
        onSelectTag={(tag) => {
          setSearchQuery(tag);
          document.getElementById('grid')?.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* Active Category Indicator if filtered */}
      {selectedCategory && (
        <div className="max-w-[1400px] mx-auto px-4 sm:px-8 pt-4 flex items-center gap-2 text-xs font-semibold text-[#5b6b78]">
          <span>Filtre actif :</span>
          <span className="px-3 py-1 rounded-full bg-[#0d1b2a] text-cyan-300 flex items-center gap-2 shadow-[0_0_8px_rgba(0,210,255,0.3)]">
            #{selectedCategory}
            <button 
              onClick={() => setSelectedCategory(null)}
              className="text-slate-400 hover:text-white ml-1 cursor-pointer"
            >
              ✕
            </button>
          </span>
        </div>
      )}

      {/* Filter Tabs & AI Toggle */}
      <FilterBar
        activeTab={activeTab}
        onSelectTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'boards') {
            showToast("Affichage des tableaux enregistrés");
          } else if (tab === 'profiles') {
            showToast("Découverte des créateurs certifiés");
          }
        }}
        mediaTypeFilter={mediaTypeFilter}
        onSelectMediaType={setMediaTypeFilter}
        isLessAiActive={isLessAiActive}
        onToggleLessAi={() => {
          const next = !isLessAiActive;
          setIsLessAiActive(next);
          showToast(next ? "Filtre 'Moins d'IA' activé" : "Affichage standard réactivé");
        }}
        neonAccent={neonAccent}
      />

      {/* Masonry Columns with Captivating Neon Actions */}
      <MasonryGrid
        pins={filteredPins}
        savedPinIds={savedPinIds}
        likedPinIds={likedPinIds}
        onToggleSave={handleToggleSave}
        onToggleLike={handleToggleLike}
        onOpenDetails={setSelectedPin}
        onSelectCategory={(cat) => setSelectedCategory(cat)}
        neonAccent={neonAccent}
        neonGlowLevel={neonGlowLevel}
        onToast={showToast}
        onResetFilters={resetAllFilters}
        isBlackNeonActive={isBlackNeonActive}
        onToggleBlackNeon={() => {
          setIsBlackNeonActive((prev) => {
            if (prev) {
              setSelectedCardId(null);
            }
            return !prev;
          });
        }}
        selectedCardId={selectedCardId}
        onSelectCard={setSelectedCardId}
      />

      {/* Footer */}
      <Footer />

      {/* Expanded Pin Inspection Modal */}
      <PinModal
        pin={selectedPin}
        isOpen={Boolean(selectedPin)}
        onClose={() => setSelectedPin(null)}
        isSaved={selectedPin ? savedPinIds.has(selectedPin.id) : false}
        isLiked={selectedPin ? likedPinIds.has(selectedPin.id) : false}
        onToggleSave={handleToggleSave}
        onToggleLike={handleToggleLike}
        neonAccent={neonAccent}
        onToast={showToast}
      />

      {/* Auth Modal (Sign in / Sign up) */}
      <AuthModal
        isOpen={authModal.isOpen}
        initialMode={authModal.mode}
        onClose={() => setAuthModal({ isOpen: false, mode: 'login' })}
        onSuccess={showToast}
      />

      {/* Create Pin Modal */}
      <CreateModal
        isOpen={isCreateOpen}
        onClose={() => setIsCreateOpen(false)}
        onCreatePin={handleCreatePin}
        onToast={showToast}
      />

      {/* Live Neon Toast Notification */}
      <NeonToast message={toastMessage} />
    </div>
  );
}
