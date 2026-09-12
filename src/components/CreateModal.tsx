import React, { useState } from 'react';
import { X, Image as ImageIcon, Video, Sparkles, Upload } from 'lucide-react';
import { PinItem, MediaType } from '../types';

interface CreateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreatePin: (newPin: PinItem) => void;
  onToast: (msg: string) => void;
}

export const CreateModal: React.FC<CreateModalProps> = ({
  isOpen,
  onClose,
  onCreatePin,
  onToast
}) => {
  if (!isOpen) return null;

  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('déco scandinave');
  const [type, setType] = useState<MediaType>('image');
  const [mediaUrl, setMediaUrl] = useState('');
  const [description, setDescription] = useState('');
  const [duration, setDuration] = useState('0:45');

  const presetImages = [
    { label: 'Déco intérieure', url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=700&q=80', type: 'image' as MediaType },
    { label: 'Voyage Italie', url: 'https://images.unsplash.com/photo-1529156069898-49953e39b3ac?auto=format&fit=crop&w=700&q=80', type: 'image' as MediaType },
    { label: 'Vidéo Café Barista', url: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=700&q=80', type: 'video' as MediaType },
    { label: 'Plantes & Terrarium', url: 'https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=700&q=80', type: 'diy' as MediaType }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const chosenUrl = mediaUrl.trim() || presetImages[0].url;

    const newPin: PinItem = {
      id: `pin-${Date.now()}`,
      title: title.trim(),
      category: category,
      type: type,
      mediaUrl: chosenUrl,
      duration: type === 'video' ? duration : undefined,
      height: 420,
      author: {
        name: 'Vous',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        handle: '@mon_profil',
        verified: true
      },
      likes: 1,
      saves: 0,
      commentsCount: 0,
      description: description.trim() || 'Idée partagée sur Mirest.',
      tags: [category.replace(/\s+/g, '-').toLowerCase(), 'création', type],
      accent: 'cyan'
    };

    onCreatePin(newPin);
    onToast(`Votre épingle "${title.slice(0, 20)}..." a été publiée !`);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1b2a]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8 shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f1f4f6] text-[#16202a] flex items-center justify-center font-bold hover:bg-[#e4e9ed] transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        <div className="flex items-center gap-2 mb-2 text-[#0284c7]">
          <Sparkles size={18} className="animate-pulse" />
          <span className="text-xs font-bold uppercase tracking-wider">Création de contenu</span>
        </div>

        <h2 className="font-display text-2xl font-bold text-[#0d1b2a] mb-6">
          Créer une nouvelle épingle ou vidéo
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Title */}
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
                Titre de votre idée *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Ex : Table basse en céramique beige fait-main"
                className="w-full px-4 py-2.5 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none focus:bg-white focus:border-[#35b7f3] focus:shadow-[0_0_10px_rgba(53,183,243,0.3)] transition-all"
              />
            </div>

            {/* Media Type */}
            <div>
              <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
                Format
              </label>
              <div className="flex rounded-xl bg-[#f1f4f6] p-1 border border-[#e6ebef]">
                {(['image', 'video', 'diy'] as MediaType[]).map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setType(t)}
                    className={`flex-1 py-1.5 text-xs font-bold rounded-lg capitalize transition-all cursor-pointer ${
                      type === t 
                        ? 'bg-white text-[#0d1b2a] shadow-xs' 
                        : 'text-[#5b6b78] hover:text-[#16202a]'
                    }`}
                  >
                    {t === 'video' ? 'Vidéo' : t === 'diy' ? 'DIY' : 'Image'}
                  </button>
                ))}
              </div>
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
                Catégorie
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2.5 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none focus:bg-white focus:border-[#35b7f3]"
              >
                <option value="déco scandinave">Déco scandinave</option>
                <option value="recette d’automne">Recette d’automne</option>
                <option value="voyage Portugal">Voyage Portugal</option>
                <option value="DIY bois">DIY bois & artisanat</option>
                <option value="mode minimaliste">Mode minimaliste</option>
                <option value="jardin urbain">Jardin urbain</option>
                <option value="architecture intérieure">Architecture intérieure</option>
              </select>
            </div>
          </div>

          {/* Media URL or Presets */}
          <div>
            <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
              URL de l'image ou de la vidéo
            </label>
            <input
              type="url"
              value={mediaUrl}
              onChange={(e) => setMediaUrl(e.target.value)}
              placeholder="https://images.unsplash.com/... ou choisissez un exemple ci-dessous"
              className="w-full px-4 py-2.5 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none focus:bg-white focus:border-[#35b7f3] transition-all"
            />
            
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <span className="text-[11px] text-[#5b6b78]">Suggestions prêtes :</span>
              {presetImages.map((p) => (
                <button
                  key={p.label}
                  type="button"
                  onClick={() => {
                    setMediaUrl(p.url);
                    setType(p.type);
                  }}
                  className="px-2.5 py-1 rounded-full text-[11px] font-semibold bg-slate-100 hover:bg-sky-50 hover:text-sky-700 transition-colors cursor-pointer"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Décrivez votre idée, les étapes, le matériel ou l'histoire derrière cette création..."
              className="w-full px-4 py-2.5 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none focus:bg-white focus:border-[#35b7f3] transition-all resize-none"
            />
          </div>

          {/* Preview banner */}
          {mediaUrl && (
            <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-100 border border-slate-200">
              <img src={mediaUrl} alt="Aperçu" className="w-full h-full object-cover" />
              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-black/60 text-white text-[10px] font-bold">
                Aperçu
              </div>
            </div>
          )}

          <div className="pt-3 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-sm font-bold text-[#5b6b78] hover:bg-[#f1f4f6] cursor-pointer transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="neon-action-cyan px-6 py-2.5 rounded-full text-sm font-bold cursor-pointer"
            >
              Publier l'épingle
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
