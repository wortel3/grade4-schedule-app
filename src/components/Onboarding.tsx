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
    <div className="min-h-screen w-full flex flex-col items-center justify-center p-4 bg-gray-50 dark:bg-gray-900 transition-colors duration-500">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-3xl shadow-xl overflow-hidden p-8 space-y-8">
        
        {/* Progress Indicator */}
        <div className="flex justify-center space-x-2 mb-8">
            {[1, 2, 3].map(i => (
                <div key={i} className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-300",
                    i <= step ? "bg-indigo-600" : "bg-gray-200 dark:bg-gray-700"
                )} />
            ))}
        </div>

        {step === 1 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
              {translations['af'].welcome} / {translations['en'].welcome}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Kies jou taal / Choose your language
            </p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleLanguageSelect('af')}
                className="flex flex-col items-center p-6 border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-bold text-xl"
              >
                <span className="text-4xl mb-2">🇿🇦</span>
                Afrikaans
              </button>
              <button
                onClick={() => handleLanguageSelect('en')}
                className="flex flex-col items-center p-6 border-2 border-gray-100 dark:border-gray-700 rounded-2xl hover:border-indigo-500 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all font-bold text-xl"
              >
                <span className="text-4xl mb-2">🇬🇧</span>
                English
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
             <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('chooseTheme')}
            </h1>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleThemeSelect('meisie')}
                className="flex flex-col items-center p-6 border-2 border-pink-100 dark:border-pink-900 rounded-2xl hover:border-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20 transition-all group"
              >
                <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                  🐼
                </div>
                <span className="font-bold text-lg text-pink-600 dark:text-pink-400">{t('girl')}</span>
              </button>
              <button
                onClick={() => handleThemeSelect('seun')}
                className="flex flex-col items-center p-6 border-2 border-blue-100 dark:border-blue-900 rounded-2xl hover:border-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all group"
              >
                <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mb-4 text-4xl group-hover:scale-110 transition-transform">
                    🚀
                </div>
                <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{t('boy')}</span>
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="animate-in fade-in slide-in-from-right-8 duration-500 space-y-6 text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {t('whatIsYourName')}
            </h1>
            <form onSubmit={handleNameSubmit} className="space-y-6">
                <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-6 h-6" />
                    <input 
                        type="text" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Gerhard..."
                        className="w-full pl-12 pr-4 py-4 text-xl rounded-2xl border-2 border-gray-200 dark:border-gray-700 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none bg-transparent"
                        autoFocus
                    />
                </div>
                <button 
                    type="submit"
                    disabled={!name.trim()}
                    className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xl font-bold shadow-lg shadow-indigo-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform active:scale-95"
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
