import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  initialMode: 'login' | 'signup';
  onClose: () => void;
  onSuccess: (msg: string) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  initialMode,
  onClose,
  onSuccess
}) => {
  if (!isOpen) return null;

  const [mode, setMode] = useState<'login' | 'signup'>(initialMode);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [birthdate, setBirthdate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    onSuccess(mode === 'signup' ? "Bienvenue sur Mirest ! Compte créé avec succès." : "Ravi de vous revoir sur Mirest !");
    onClose();
  };

  const handleGoogleAuth = () => {
    onSuccess("Connexion avec Google réussie !");
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0d1b2a]/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div 
        className="relative bg-white rounded-3xl w-full max-w-md p-7 sm:p-9 text-center shadow-2xl border border-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#f1f4f6] text-[#16202a] flex items-center justify-center font-bold hover:bg-[#e4e9ed] transition-colors cursor-pointer"
        >
          <X size={16} />
        </button>

        {/* Brand Logo with Neon Glow */}
        <div 
          className="w-12 h-12 mx-auto mb-3.5 rounded-2xl flex items-center justify-center text-white font-extrabold text-2xl"
          style={{
            background: 'linear-gradient(135deg, #35b7f3 0%, #0096c7 100%)',
            boxShadow: '0 0 16px rgba(53,183,243,0.5), 0 0 30px rgba(53,183,243,0.25)'
          }}
        >
          M
        </div>

        <h2 className="font-display text-2xl font-bold text-[#0d1b2a] mb-1.5">
          {mode === 'signup' ? 'Bienvenue sur Mirest' : 'Ravi de vous revoir'}
        </h2>
        <p className="text-sm text-[#5b6b78] mb-6">
          {mode === 'signup' 
            ? 'Rejoignez Mirest gratuitement pour découvrir et enregistrer de nouvelles idées' 
            : 'Connectez-vous pour retrouver vos tableaux et inspirations'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-3.5 text-left">
          <div>
            <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
              Adresse e-mail
            </label>
            <input 
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="vous@exemple.com"
              className="w-full px-4 py-3 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none transition-all focus:bg-white focus:border-[#35b7f3] focus:shadow-[0_0_10px_rgba(53,183,243,0.3)]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
              Mot de passe
            </label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="8 caractères minimum"
              className="w-full px-4 py-3 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none transition-all focus:bg-white focus:border-[#35b7f3] focus:shadow-[0_0_10px_rgba(53,183,243,0.3)]"
            />
          </div>

          {mode === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-[#5b6b78] mb-1.5">
                Date de naissance
              </label>
              <input 
                type="date" 
                value={birthdate}
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-[#e6ebef] bg-[#fbfcfd] text-sm text-[#16202a] outline-none transition-all focus:bg-white focus:border-[#35b7f3] focus:shadow-[0_0_10px_rgba(53,183,243,0.3)]"
              />
            </div>
          )}

          <button
            type="submit"
            className="neon-action-cyan w-full py-3.5 rounded-xl font-bold text-sm sm:text-base mt-2 cursor-pointer"
          >
            {mode === 'signup' ? 'Continuer' : 'Se connecter'}
          </button>
        </form>

        <div className="flex items-center gap-3 my-5 text-xs text-[#5b6b78]">
          <div className="flex-1 h-px bg-[#e6ebef]" />
          <span>OU</span>
          <div className="flex-1 h-px bg-[#e6ebef]" />
        </div>

        <button 
          onClick={handleGoogleAuth}
          type="button"
          className="w-full py-3 px-4 rounded-xl border border-[#e6ebef] bg-white font-bold text-sm text-[#16202a] flex items-center justify-center gap-2.5 hover:bg-slate-50 hover:border-slate-300 transition-all cursor-pointer"
        >
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 8 3l6-6C34.9 5.1 29.7 3 24 3 12.4 3 3 12.4 3 24s9.4 21 21 21 21-9.4 21-21c0-1.4-.1-2.7-.4-3.5z"/>
            <path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.6 15.9 18.9 13 24 13c3.1 0 5.8 1.1 8 3l6-6C34.9 5.1 29.7 3 24 3c-7.4 0-13.8 4.1-17.1 10.2z"/>
            <path fill="#4CAF50" d="M24 45c5.6 0 10.7-2.1 14.5-5.6l-6.7-5.5C29.7 35.7 27 36.7 24 36.7c-5.3 0-9.7-3.4-11.3-8.1l-6.6 5.1C9.3 40.6 16.1 45 24 45z"/>
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.4 5.5-6.4 6.9l6.7 5.5C39.7 37.4 45 31.5 45 24c0-1.4-.1-2.7-.4-3.5z"/>
          </svg>
          Continuer avec Google
        </button>

        <div className="mt-5 text-xs text-[#5b6b78]">
          {mode === 'signup' ? (
            <span>
              Vous avez déjà un compte ?{' '}
              <button 
                type="button"
                onClick={() => setMode('login')} 
                className="text-[#1c93d4] font-bold hover:underline cursor-pointer"
              >
                Connectez-vous
              </button>
            </span>
          ) : (
            <span>
              Pas encore de compte ?{' '}
              <button 
                type="button"
                onClick={() => setMode('signup')} 
                className="text-[#1c93d4] font-bold hover:underline cursor-pointer"
              >
                Inscrivez-vous
              </button>
            </span>
          )}
        </div>

        <p className="mt-5 text-[11px] text-[#9aa7b2] leading-normal">
          En continuant, vous acceptez les Conditions d'utilisation et la Politique de confidentialité de Mirest.
        </p>
      </div>
    </div>
  );
};
