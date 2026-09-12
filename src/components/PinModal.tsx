import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Bookmark, 
  Heart, 
  Share2, 
  Maximize2, 
  Minimize2, 
  MessageCircle, 
  Send, 
  Play, 
  Pause,
  Volume2, 
  VolumeX, 
  Check,
  Tv,
  Smartphone,
  Laptop
} from 'lucide-react';
import { PinItem, NeonAccent } from '../types';

interface PinModalProps {
  pin: PinItem | null;
  isOpen: boolean;
  onClose: () => void;
  isSaved: boolean;
  isLiked: boolean;
  onToggleSave: (id: string) => void;
  onToggleLike: (id: string) => void;
  neonAccent: NeonAccent;
  onToast: (msg: string) => void;
}

export const PinModal: React.FC<PinModalProps> = ({
  pin,
  isOpen,
  onClose,
  isSaved,
  isLiked,
  onToggleSave,
  onToggleLike,
  onToast
}) => {
  if (!isOpen || !pin) return null;

  const [comments, setComments] = useState<Array<{ id: string; author: string; text: string; time: string }>>([
    { id: '1', author: 'Sophie V.', text: 'Superbe inspiration, exactement ce que je cherchais pour mon appartement !', time: 'Il y a 2h' },
    { id: '2', author: 'Marc D.', text: 'Les couleurs et l’ambiance sont juste parfaites.', time: 'Il y a 5h' }
  ]);
  const [newComment, setNewComment] = useState('');
  const [copied, setCopied] = useState(false);

  // Video Controls & Device-Adaptive State
  const isVideo = pin.type === 'video';
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const modalContainerRef = useRef<HTMLDivElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isTheaterMode, setIsTheaterMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);

  // Auto-play video when modal opens with sound active
  useEffect(() => {
    if (isVideo && videoRef.current) {
      videoRef.current.playbackRate = playbackSpeed;
      videoRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {
        // Fallback if browser requires user gesture for unmuted audio
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [isVideo, pin.id, playbackSpeed]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const toggleNativeFullscreen = () => {
    if (!document.fullscreenElement) {
      if (modalContainerRef.current) {
        modalContainerRef.current.requestFullscreen?.().catch(() => {
          videoRef.current?.requestFullscreen?.();
        });
      } else if (videoRef.current) {
        videoRef.current.requestFullscreen?.();
      }
    } else {
      document.exitFullscreen?.().catch(() => {});
    }
  };

  const cycleSpeed = () => {
    const speeds = [1, 1.25, 1.5, 2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (videoRef.current) {
      videoRef.current.playbackRate = nextSpeed;
    }
    onToast(`Vitesse : ${nextSpeed}x`);
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      ...comments,
      { id: Date.now().toString(), author: 'Vous', text: newComment.trim(), time: 'À l’instant' }
    ]);
    setNewComment('');
    onToast("Commentaire publié avec succès !");
  };

  const handleCopyLink = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    onToast("Lien copié dans le presse-papiers !");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-0 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200 overflow-y-auto"
      onClick={onClose}
    >
      <div 
        ref={modalContainerRef}
        className={`relative w-full bg-white sm:rounded-3xl overflow-hidden shadow-2xl flex transition-all duration-300 ${
          // Fullscreen or Theater or Regular layout
          isFullscreen
            ? 'h-[100dvh] w-full rounded-none flex-col md:flex-row'
            : isTheaterMode
              ? 'max-w-5xl max-h-[96vh] flex-col'
              : 'max-w-5xl lg:max-w-6xl max-h-[100dvh] sm:max-h-[92vh] min-h-[100dvh] sm:min-h-0 flex-col md:flex-row'
        } border border-slate-200/60`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar with Adaptive Icons & Close Button */}
        <div className="absolute top-3 right-3 z-30 flex items-center gap-2">
          {/* Theater Mode Toggle (Laptop / Desktop) */}
          {isVideo && (
            <button
              onClick={() => setIsTheaterMode(!isTheaterMode)}
              className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 text-xs font-semibold cursor-pointer shadow-md transition-all"
              title={isTheaterMode ? "Vue côte-à-côte" : "Mode grand format / cinéma"}
            >
              <Tv size={14} />
              <span>{isTheaterMode ? "Vue normale" : "Grand format"}</span>
            </button>
          )}

          {/* Native Fullscreen Toggle (Phone & Laptop) */}
          <button
            onClick={toggleNativeFullscreen}
            className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center cursor-pointer shadow-md transition-all"
            title={isFullscreen ? "Quitter le plein écran" : "Plein écran complet"}
            aria-label="Plein écran"
          >
            {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
          </button>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-black/70 hover:bg-black text-white backdrop-blur-md border border-white/20 flex items-center justify-center shadow-md hover:text-sky-300 transition-all cursor-pointer"
            aria-label="Fermer"
          >
            <X size={18} />
          </button>
        </div>

        {/* =========================================================================
            MEDIA SIDE: Adapts dynamically to Phone (stacked, full width) or Laptop
            ========================================================================= */}
        <div 
          className={`relative bg-black flex items-center justify-center overflow-hidden transition-all duration-300 ${
            isTheaterMode
              ? 'w-full h-[55vh] md:h-[65vh]'
              : 'w-full md:w-3/5 lg:w-[62%] min-h-[260px] sm:min-h-[380px] md:min-h-[500px]'
          }`}
        >
          {isVideo && (pin.videoUrl || pin.videoPreviewUrl) ? (
            <div className="relative w-full h-full flex items-center justify-center bg-black group">
              <video
                ref={videoRef}
                src={pin.videoUrl || pin.videoPreviewUrl}
                poster={pin.mediaUrl}
                autoPlay
                playsInline
                loop
                controls
                className="w-full h-full max-h-[85vh] object-contain"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />

              {/* Custom Overlay Controls (Visible on hover/touch) */}
              <div className="absolute bottom-14 left-4 right-4 z-20 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="flex items-center gap-2 pointer-events-auto">
                  <button
                    onClick={togglePlay}
                    className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg cursor-pointer transition-transform hover:scale-105"
                    title={isPlaying ? "Pause" : "Lire"}
                  >
                    {isPlaying ? <Pause size={18} /> : <Play size={18} className="fill-current ml-0.5 text-sky-400" />}
                  </button>

                  <button
                    onClick={toggleMute}
                    className="w-10 h-10 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md flex items-center justify-center border border-white/20 shadow-lg cursor-pointer transition-transform hover:scale-105"
                    title={isMuted ? "Activer le son" : "Couper le son"}
                  >
                    {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} className="text-emerald-400" />}
                  </button>

                  <button
                    onClick={cycleSpeed}
                    className="px-3 h-10 rounded-full bg-black/80 hover:bg-black text-white backdrop-blur-md flex items-center justify-center border border-white/20 text-xs font-bold shadow-lg cursor-pointer transition-transform hover:scale-105"
                    title="Vitesse de lecture"
                  >
                    {playbackSpeed}x
                  </button>
                </div>
              </div>

              {/* Device Adaptive Badge indicator */}
              <div className="absolute top-3 left-3 z-20 flex items-center gap-2 pointer-events-none">
                <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                  <Laptop size={12} className="text-sky-300" />
                  <span className="text-[11px]">Format adapté Laptop & Téléphone</span>
                </div>
                <div className="sm:hidden flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white text-xs font-medium">
                  <Smartphone size={12} className="text-sky-300" />
                  <span className="text-[11px]">Format mobile</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[#0d1b2a]">
              <img
                src={pin.mediaUrl}
                alt={pin.title}
                className="w-full h-full max-h-[85vh] object-contain"
              />
            </div>
          )}

          {/* Category Pill */}
          <div className="absolute bottom-4 left-4 z-10 pointer-events-none">
            <span className="neon-badge-pill px-3.5 py-1.5 rounded-full text-xs font-bold text-[#0d1b2a] shadow-lg">
              {pin.category}
            </span>
          </div>
        </div>

        {/* =========================================================================
            DETAILS SIDE: Fluid layout for Mobile and Laptop
            ========================================================================= */}
        <div 
          className={`flex flex-col justify-between p-4 sm:p-6 md:p-8 overflow-y-auto bg-white ${
            isTheaterMode 
              ? 'w-full max-h-[40vh]' 
              : 'w-full md:w-2/5 lg:w-[38%] max-h-[50vh] sm:max-h-[60vh] md:max-h-[92vh]'
          }`}
        >
          {/* Header Action Bar */}
          <div>
            <div className="flex items-center justify-between gap-3 pb-4 border-b border-slate-100 mb-5">
              <div className="flex items-center gap-2">
                {/* Like */}
                <button
                  onClick={() => onToggleLike(pin.id)}
                  className={`neon-action-pink w-10 h-10 rounded-full flex items-center justify-center cursor-pointer ${
                    isLiked ? 'liked' : ''
                  }`}
                  title={isLiked ? "Aimé" : "Aimer"}
                >
                  <Heart size={18} className={isLiked ? 'fill-[#ff2a85] text-[#ff2a85]' : 'text-slate-600'} />
                </button>

                {/* Share / Copy */}
                <button
                  onClick={handleCopyLink}
                  className="neon-action-glass w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-slate-700"
                  title="Copier le lien de l'idée"
                >
                  {copied ? <Check size={18} className="text-emerald-500" /> : <Share2 size={18} />}
                </button>
              </div>

              {/* Primary Neon Save Button */}
              <button
                onClick={() => onToggleSave(pin.id)}
                className={`neon-action-cyan px-4 sm:px-5 py-2 sm:py-2.5 rounded-full font-bold text-xs sm:text-sm flex items-center gap-2 cursor-pointer ${
                  isSaved ? 'saved' : ''
                }`}
              >
                <Bookmark size={15} className={isSaved ? 'fill-current' : ''} />
                <span>{isSaved ? 'Enregistré' : 'Enregistrer'}</span>
              </button>
            </div>

            {/* Title & Description */}
            <h2 className="font-display text-lg sm:text-2xl font-bold text-[#0d1b2a] leading-snug mb-2">
              {pin.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#5b6b78] leading-relaxed mb-4">
              {pin.description}
            </p>

            {/* Author info */}
            <div className="flex items-center justify-between p-2.5 sm:p-3 rounded-2xl bg-[#f8fafc] border border-slate-100 mb-5">
              <div className="flex items-center gap-3">
                <img
                  src={pin.author.avatar}
                  alt={pin.author.name}
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full object-cover ring-2 ring-sky-200"
                />
                <div>
                  <div className="text-xs sm:text-sm font-bold text-[#0d1b2a] flex items-center gap-1.5">
                    {pin.author.name}
                    {pin.author.verified && (
                      <span className="w-3.5 h-3.5 rounded-full bg-[#35b7f3] text-white text-[9px] flex items-center justify-center">✓</span>
                    )}
                  </div>
                  <div className="text-[11px] sm:text-xs text-[#5b6b78]">{pin.author.handle}</div>
                </div>
              </div>
              <button 
                onClick={() => onToast(`Abonné à ${pin.author.name}`)}
                className="px-3 sm:px-4 py-1.5 rounded-full bg-[#f1f4f6] text-xs font-bold text-[#0d1b2a] hover:bg-[#35b7f3] hover:text-white transition-all cursor-pointer"
              >
                Suivre
              </button>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 mb-5">
              {pin.tags.map((t) => (
                <span key={t} className="px-2.5 py-1 rounded-full bg-[#f1f4f6] text-[11px] font-semibold text-slate-600">
                  #{t}
                </span>
              ))}
            </div>

            {/* Comments List */}
            <div className="space-y-2.5 mb-4">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#0d1b2a] uppercase tracking-wider">
                <MessageCircle size={14} className="text-[#35b7f3]" />
                <span>Commentaires ({comments.length})</span>
              </div>
              <div className="space-y-2 max-h-32 sm:max-h-36 overflow-y-auto pr-1">
                {comments.map((c) => (
                  <div key={c.id} className="text-xs bg-[#f8fafc] p-2.5 rounded-xl border border-slate-100">
                    <div className="flex items-center justify-between text-[#5b6b78] mb-1">
                      <span className="font-bold text-[#16202a]">{c.author}</span>
                      <span className="text-[10px]">{c.time}</span>
                    </div>
                    <p className="text-[#475569]">{c.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Comment input form */}
          <form onSubmit={handleAddComment} className="pt-3 border-t border-slate-100 flex items-center gap-2 mt-auto">
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Ajouter un commentaire..."
              className="flex-1 px-3 sm:px-4 py-2 sm:py-2.5 rounded-full bg-[#f1f4f6] text-xs sm:text-sm text-[#16202a] outline-none border border-transparent focus:bg-white focus:border-[#35b7f3] transition-all"
            />
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#35b7f3] text-white flex items-center justify-center hover:bg-[#1c93d4] disabled:opacity-40 transition-all cursor-pointer shrink-0"
              aria-label="Envoyer commentaire"
            >
              <Send size={13} />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
