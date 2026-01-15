import { useState } from 'react';
import { useApp } from '../hooks/use-app';
import { cn } from '../lib/utils';
import { User } from 'lucide-react';

export default function Onboarding() {
  const { updateUser, t } = useApp();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [name, setName] = useState('');

  const handleLanguageSelect = (lang: 'af' | 'en') => {
    updateUser({ language: lang });
    setStep(2);
  };

  const handleThemeSelect = (theme: 'meisie' | 'seun') => {
    updateUser({ theme });
    setStep(3);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      updateUser({ name, onboardingComplete: true });
    }
  };

  // Helper to get translation based on current selection or default
  // We use the context 't' which uses the user.language.
  // Since we set user.language in step 1, step 2 and 3 will match.
  
  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 transition-colors duration-500">
      <div className="max-w-md w-full bg-slate-800/90 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden p-8 space-y-8 border border-slate-700/50">
        
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
            {[1, 2, 3].map(i => (
                <div key={i} className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-300",
                    i <= step ? "bg-indigo-500" : "bg-slate-600"
                )} />
            ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              {translations['af'].welcome} / {translations['en'].welcome}
            </h1>
            <p className="text-slate-400">
              Kies jou taal / Choose your language
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLanguageSelect('af')}
                className="flex flex-col items-center p-6 border-2 border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-indigo-500/10 transition-all font-bold text-xl text-white"
              >
                <span className="text-4xl mb-2">🇿🇦</span>
                Afrikaans
              </button>
              <button
                onClick={() => handleLanguageSelect('en')}
                className="flex flex-col items-center p-6 border-2 border-slate-700 rounded-2xl hover:border-indigo-500 hover:bg-indigo-500/10 transition-all font-bold text-xl text-white"
              >
                <span className="text-4xl mb-2">🇬🇧</span>
                English
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
             <h1 className="text-3xl font-bold text-white">
              {t('chooseTheme')}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThemeSelect('meisie')}
                className="flex flex-col items-center p-6 border-2 border-slate-700 rounded-2xl hover:border-pink-500 hover:bg-pink-500/10 transition-all group"
              >
                <div className="w-20 h-20 bg-pink-500/20 rounded-full flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                  🐼
                </div>
                <span className="font-bold text-lg text-pink-400">{t('girl')}</span>
              </button>
              <button
                onClick={() => handleThemeSelect('seun')}
                className="flex flex-col items-center p-6 border-2 border-slate-700 rounded-2xl hover:border-blue-500 hover:bg-blue-500/10 transition-all group"
              >
                <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                    🚀
                </div>
                <span className="font-bold text-lg text-blue-400">{t('boy')}</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
            <h1 className="text-3xl font-bold text-white">
              {t('whatIsYourName')}
            </h1>
            <form onSubmit={handleNameSubmit} className="space-y-6">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-6 h-6" />
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Gerhard..."
                        className="w-full pl-12 pr-4 py-4 text-xl rounded-2xl border-2 border-slate-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/20 transition-all outline-none bg-slate-900/50 text-white placeholder:text-slate-500"
                        autoFocus
                    />
                </div>
                <button
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-2xl text-xl font-bold shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
                >
                    {t('start')}
                </button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

// Translations helper import
import { translations } from '../i18n';
