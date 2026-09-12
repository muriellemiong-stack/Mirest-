import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Bookmark, 
  Heart, 
  MoreHorizontal, 
  Play, 
  Pause,
  Volume2,
  VolumeX,
  Share2, 
  Download, 
  ExternalLink, 
  Check,
  Maximize2,
  Wrench
} from 'lucide-react';
import { PinItem, NeonAccent } from '../types';

interface MediaCardProps {
  pin: PinItem;
  isSaved: boolean;
  isLiked: boolean;
  isSelected: boolean;
  isBlackNeonActive?: boolean;
  hasActiveSelection?: boolean;
  onSelectCard: (id: string) => void;
  onToggleSave: (id: string) => void;
  onToggleLike: (id: string) => void;
  onOpenDetails: (pin: PinItem) => void;
  onSelectCategory: (category: string) => void;
  neonAccent: NeonAccent;
  neonGlowLevel: 'subtle' | 'vibrant';
  onToast: (msg: string) => void;
}

export const MediaCard: React.FC<MediaCardProps> = ({
  pin,
  isSaved,
  isLiked,
  isSelected = false,
  isBlackNeonActive = false,
  hasActiveSelection = false,
  onSelectCard,
  onToggleSave,
  onToggleLike,
  onOpenDetails,
  onSelectCategory,
  onToast
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Video auto-playback state (Pexels / Pinterest style)
  const isVideo = pin.type === 'video';
  const isDiy = pin.type === 'diy';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoLoaded, setVideoLoaded] = useState(false);

  // Guaranteed video play helper complying with mobile & desktop browser autoplay policies
  const attemptPlay = useCallback(() => {
    const vid = videoRef.current;
    if (!vid) return;
    try {
      vid.muted = true;
      vid.defaultMuted = true;
      vid.playsInline = true;
      vid.setAttribute('muted', '');
      vid.setAttribute('playsinline', '');
      vid.setAttribute('webkit-playsinline', '');
      const p = vid.play();
      if (p !== undefined) {
        p.then(() => {
          setIsVideoPlaying(true);
        }).catch(() => {
          setIsVideoPlaying(false);
        });
      }
    } catch {
      setIsVideoPlaying(false);
    }
  }, []);

  // IntersectionObserver to auto-play video when in view, and pause when out of view
  useEffect(() => {
    if (!isVideo) return;
    const currentVideo = videoRef.current;
    if (!currentVideo) return;

    // Direct initial attempt
    attemptPlay();

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            attemptPlay();
          } else {
            currentVideo.pause();
            setIsVideoPlaying(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(currentVideo);

    // Global first-touch listener for mobile browsers that require user gesture
    const handleFirstGesture = () => {
      if (currentVideo && currentVideo.paused) {
        attemptPlay();
      }
    };
    window.addEventListener('touchstart', handleFirstGesture, { once: true, passive: true });
    window.addEventListener('click', handleFirstGesture, { once: true, passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('touchstart', handleFirstGesture);
      window.removeEventListener('click', handleFirstGesture);
    };
  }, [isVideo, attemptPlay]);

  const toggleVideoPlayback = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play().then(() => setIsVideoPlaying(true)).catch(() => {});
    } else {
      vid.pause();
      setIsVideoPlaying(false);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const handleCopyLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard?.writeText(window.location.href);
    setCopiedLink(true);
    onToast(`Lien de "${pin.title.slice(0, 26)}..." copié !`);
    setTimeout(() => {
      setCopiedLink(false);
      setShowMoreMenu(false);
    }, 1200);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToast(`Partage ouvert pour ${pin.title}`);
    setShowMoreMenu(false);
  };

  const handleDownload = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToast(`Téléchargement en haute définition`);
    setShowMoreMenu(false);
  };

  // Clicking the cell: if neon is active, toggle neon; otherwise open pin details
  const handleCellClick = (e: React.MouseEvent) => {
    // If clicked on an interactive button or control, let that button's handler execute
    if ((e.target as HTMLElement).closest('.pinterest-card-action')) {
      return;
    }
    if (isBlackNeonActive) {
      onSelectCard(pin.id);
    } else {
      onOpenDetails(pin);
    }
  };

  return (
    <div
      onClick={handleCellClick}
      className={`group relative rounded-[20px] overflow-hidden bg-[#f1f4f6] transition-all duration-300 cursor-pointer select-none ${
        isBlackNeonActive
          ? isSelected 
            ? 'cell-neon-black-selected' 
            : hasActiveSelection 
              ? 'cell-dimmed-background cell-neon-hover' 
              : 'cell-neon-hover'
          : 'hover:shadow-md hover:-translate-y-0.5'
      }`}
      onMouseEnter={() => {
        setIsHovered(true);
        if (isVideo) attemptPlay();
      }}
      onTouchStart={() => {
        if (isVideo) attemptPlay();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowMoreMenu(false);
      }}
    >
      {/* Media: Auto-playing Video or Image/DIY preview */}
      <div className="relative overflow-hidden bg-black" style={{ height: `${pin.height}px` }}>
        {isVideo && (pin.videoUrl || pin.videoPreviewUrl) ? (
          <>
            {/* Background / Poster image shown before video is ready */}
            <img
              src={pin.mediaUrl}
              alt={pin.title}
              loading="lazy"
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
                videoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
              }`}
            />

            {/* Auto-animated HTML5 Video (Plays continuously on loop, muted by default like Pexels) */}
            <video
              ref={videoRef}
              src={pin.videoUrl || pin.videoPreviewUrl}
              poster={pin.mediaUrl}
              autoPlay
              muted
              defaultMuted
              loop
              playsInline
              preload="auto"
              onLoadedData={() => {
                setVideoLoaded(true);
                attemptPlay();
              }}
              onCanPlay={() => attemptPlay()}
              onPlay={() => setIsVideoPlaying(true)}
              onPause={() => setIsVideoPlaying(false)}
              className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
                isHovered || isSelected ? 'scale-105 filter contrast-[1.03]' : 'scale-100'
              }`}
            />

            {/* Discrete Auto-play Video Indicator */}
            <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
              <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold backdrop-blur-md bg-black/75 text-white border border-sky-400/40 shadow-[0_0_10px_rgba(56,189,248,0.4)]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#38bdf8] animate-ping" />
                <span className="text-[11px] font-bold tracking-tight">Vidéo animée</span>
                <span className="text-[10px] text-sky-200 opacity-80">{pin.duration || '0:30'}</span>
              </div>
            </div>

            {/* Quick In-feed Video Controls (Pause / Sound) */}
            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
              <button
                onClick={toggleMute}
                className="pinterest-card-action w-8 h-8 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-black hover:scale-105 border border-white/20 transition-all cursor-pointer shadow-md"
                title={isMuted ? "Activer le son" : "Couper le son"}
                aria-label={isMuted ? "Activer le son" : "Couper le son"}
              >
                {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-emerald-400" />}
              </button>

              <button
                onClick={toggleVideoPlayback}
                className="pinterest-card-action w-8 h-8 rounded-full bg-black/75 backdrop-blur-md text-white flex items-center justify-center hover:bg-black hover:scale-105 border border-white/20 transition-all cursor-pointer shadow-md"
                title={isVideoPlaying ? "Mettre en pause" : "Lire la vidéo"}
                aria-label={isVideoPlaying ? "Mettre en pause" : "Lire la vidéo"}
              >
                {isVideoPlaying ? <Pause size={13} /> : <Play size={13} className="fill-current ml-0.5 text-[#38bdf8]" />}
              </button>
            </div>
          </>
        ) : (
          <img
            src={pin.mediaUrl}
            alt={pin.title}
            loading="lazy"
            className={`w-full h-full object-cover transition-transform duration-500 ease-out ${
              isHovered || isSelected ? 'scale-105 filter contrast-[1.03]' : 'scale-100'
            }`}
          />
        )}

        {/* DIY Project badge */}
        {isDiy && (
          <div className="absolute top-3 left-3 z-10 flex items-center gap-1.5 pointer-events-none">
            <div className="bg-black/85 backdrop-blur-md text-amber-300 border border-amber-400/50 shadow-[0_0_8px_rgba(251,191,36,0.35)] flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold">
              <Wrench size={11} className="text-amber-300" />
              <span>Tutoriel DIY</span>
            </div>
          </div>
        )}

        {/* Category Pill on bottom left of image */}
        <div className="absolute bottom-3 left-3 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelectCategory(pin.category);
            }}
            className="pinterest-card-action neon-badge-pill px-3 py-1 rounded-full text-xs font-bold transition-all hover:scale-105 cursor-pointer flex items-center gap-1"
          >
            <span>{pin.category}</span>
          </button>
        </div>

        {/* Ambient Dark Gradient on Hover for Action Contrast */}
        <div 
          className={`absolute inset-0 bg-gradient-to-b from-black/45 via-transparent to-black/60 transition-opacity duration-200 pointer-events-none ${
            isHovered || isSelected ? 'opacity-100' : 'opacity-0'
          }`} 
        />
      </div>

      {/* =========================================================
          ACTIONS OVERLAY: Neon Actions & Agrandir
          ========================================================= */}
      <div 
        className={`absolute inset-0 p-3.5 flex flex-col justify-between pointer-events-none transition-opacity duration-200 ${
          isHovered || isSelected ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* TOP ROW ACTIONS */}
        <div className="flex items-center justify-between pointer-events-auto">
          {/* Action: Like / Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike(pin.id);
            }}
            title={isLiked ? "Retirer des favoris" : "Aimer cette idée"}
            className={`pinterest-card-action neon-action-pink w-9 h-9 rounded-full flex items-center justify-center cursor-pointer transition-transform ${
              isLiked ? 'liked' : ''
            }`}
          >
            <Heart 
              size={17} 
              className={`transition-colors ${isLiked ? 'fill-[#ff2a85] text-[#ff2a85]' : 'text-slate-700'}`} 
            />
          </button>

          {/* Action: Enregistrer */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleSave(pin.id);
            }}
            className={`pinterest-card-action neon-action-cyan px-4 py-2 rounded-full font-bold text-xs sm:text-sm tracking-tight flex items-center gap-1.5 cursor-pointer select-none ${
              isSaved ? 'saved' : ''
            }`}
          >
            <Bookmark size={14} className={isSaved ? 'fill-current' : ''} />
            <span>{isSaved ? 'Enregistré' : 'Enregistrer'}</span>
          </button>
        </div>

        {/* BOTTOM ROW ACTIONS: Prominent "Agrandir" button */}
        <div className="flex items-center justify-between pointer-events-auto relative mt-auto gap-2">
          {/* Action: Agrandir / Plein format (parfait téléphone ou laptop) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenDetails(pin);
            }}
            title="Agrandir en plein écran (adapté téléphone ou laptop)"
            className="pinterest-card-action neon-action-glass px-3 py-1.5 rounded-full text-xs font-extrabold flex items-center gap-1.5 cursor-pointer text-slate-900 bg-white/90 hover:bg-white shadow-md hover:scale-105 transition-all"
          >
            <Maximize2 size={13} className="text-[#0284c7]" />
            <span>Agrandir</span>
          </button>

          {/* Action: "⋯" More Options */}
          <div className="relative">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setShowMoreMenu(!showMoreMenu);
              }}
              title="Plus d'actions"
              className="pinterest-card-action neon-action-glass w-9 h-9 rounded-full flex items-center justify-center font-bold text-base cursor-pointer"
            >
              <MoreHorizontal size={18} />
            </button>

            {/* Popover Menu */}
            {showMoreMenu && (
              <div 
                className="absolute right-0 bottom-11 w-48 bg-white/95 backdrop-blur-md rounded-2xl p-1.5 shadow-[0_12px_32px_rgba(13,27,42,0.22),0_0_14px_rgba(53,183,243,0.35)] border border-sky-100 z-30 transition-all"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={handleCopyLink}
                  className="pinterest-card-action w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#16202a] hover:bg-[#eaf7ff] hover:text-[#0284c7] flex items-center justify-between transition-colors cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink size={14} />
                    Copier le lien
                  </span>
                  {copiedLink && <Check size={14} className="text-emerald-500" />}
                </button>

                <button
                  onClick={handleShare}
                  className="pinterest-card-action w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#16202a] hover:bg-[#eaf7ff] hover:text-[#0284c7] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Share2 size={14} />
                  Partager l'idée
                </button>

                <button
                  onClick={handleDownload}
                  className="pinterest-card-action w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-[#16202a] hover:bg-[#eaf7ff] hover:text-[#0284c7] flex items-center gap-2 transition-colors cursor-pointer"
                >
                  <Download size={14} />
                  Télécharger
                </button>

                <div className="my-1 border-t border-slate-100" />

                <button
                  onClick={() => {
                    onToast("Contenu masqué de vos suggestions");
                    setShowMoreMenu(false);
                  }}
                  className="pinterest-card-action w-full text-left px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:bg-slate-50 hover:text-slate-800 transition-colors cursor-pointer"
                >
                  Masquer cette épingle
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Card Info Details (Author & Title) */}
      <div className="p-3 bg-white border-t border-slate-100 flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img 
            src={pin.author.avatar} 
            alt={pin.author.name} 
            className="w-6 h-6 rounded-full object-cover shrink-0 ring-1 ring-slate-200"
          />
          <div className="truncate">
            <div className="text-xs font-semibold text-[#16202a] truncate group-hover:text-black transition-colors">
              {pin.title}
            </div>
            <div className="text-[11px] text-[#5b6b78] truncate flex items-center gap-1.5">
              <span>{pin.author.name}</span>
              {isDiy && (
                <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.2 rounded-sm">
                  DIY
                </span>
              )}
              {isVideo && (
                <span className="text-[10px] font-bold text-sky-600 bg-sky-50 px-1.5 py-0.2 rounded-sm">
                  Vidéo animée
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Compact stats pill */}
        <div className="flex items-center gap-1 shrink-0 text-[11px] font-medium text-slate-400">
          <Heart size={11} className={isLiked ? 'text-[#ff2a85] fill-current' : ''} />
          <span>{pin.likes + (isLiked ? 1 : 0)}</span>
        </div>
      </div>
    </div>
  );
};
