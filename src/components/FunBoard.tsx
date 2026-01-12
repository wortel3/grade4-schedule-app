import { useApp } from '../hooks/use-app';
import { Sparkles, Smile, Star, Trophy } from 'lucide-react';
import { cn } from '../lib/utils';

export default function FunBoard() {
  const { lastInteraction, t, user, completedTasks } = useApp();
  
  // Use key to force re-animation when interaction changes
  const key = lastInteraction || 'default';
  
  // Calculate star count (1 task = 1 star)
  const starCount = completedTasks.length;

  const getContent = () => {
    if (!lastInteraction) {
        return (
            <div className="flex flex-col items-center justify-center h-full text-center space-y-8 opacity-80 animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="relative group cursor-pointer hover:scale-110 transition-transform duration-500">
                    <div className="absolute inset-0 bg-yellow-400/20 blur-3xl rounded-full group-hover:bg-yellow-400/40 transition-all" />
                    <Smile size={120} className={cn(
                        "transition-colors duration-500",
                        user.theme === 'meisie' ? "text-pink-300 dark:text-pink-600" : "text-blue-300 dark:text-blue-600"
                    )}/>
                    <div className="absolute -top-4 -right-4 bg-yellow-400 p-3 rounded-full shadow-lg animate-bounce">
                        <Star className="text-white w-8 h-8 fill-current" />
                    </div>
                </div>
                
                <div className="space-y-3 max-w-xs mx-auto">
                    <h3 className="text-3xl font-black text-gray-700 dark:text-gray-200 tracking-tight">
                        {t('reward_default_title')}
                    </h3>
                    <p className="text-xl font-medium text-gray-500 dark:text-gray-400 leading-relaxed">
                        {t('reward_default_desc')}
                    </p>
                </div>

                {/* Progress Mini-Dashboard */}
                <div className="bg-white/50 dark:bg-black/20 p-6 rounded-2xl w-full max-w-[280px] backdrop-blur-sm border border-gray-100 dark:border-gray-700">
                     <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-bold text-gray-500 uppercase tracking-wider">Total Stars</span>
                        <Trophy size={20} className="text-yellow-500" />
                     </div>
                     <div className="text-5xl font-black text-indigo-600 dark:text-indigo-400">
                        {starCount}
                     </div>
                </div>
            </div>
        );
    }

    interface RewardCardProps {
        icon: string;
        titleKey: string;
        descKey: string;
        colorClass: string;
        iconClass: string;
    }

    // Common container for rewards
    const RewardCard = ({ icon, titleKey, descKey, colorClass, iconClass }: RewardCardProps) => (
        <div className="text-center space-y-8 animate-in zoom-in-50 duration-500">
            <div className="relative inline-block">
                <div className={cn("absolute inset-0 blur-3xl opacity-30 scale-150 rounded-full", colorClass.replace('text-', 'bg-'))} />
                <div className={cn("text-9xl relative z-10", iconClass)}>{icon}</div>
            </div>
            
            <div className="space-y-4">
                <h3 className={cn("text-4xl font-black tracking-tight", colorClass)}>{t(titleKey)}</h3>
                <p className="text-2xl font-medium text-gray-600 dark:text-gray-300 max-w-xs mx-auto leading-relaxed">
                    {t(descKey)}
                </p>
            </div>
            
            <div className="pt-8">
                 <div className="inline-flex items-center space-x-2 bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400 px-6 py-3 rounded-full font-bold text-lg">
                    <Star className="fill-current w-6 h-6" />
                    <span>+1 Star!</span>
                 </div>
            </div>
        </div>
    );

    switch (lastInteraction) {
        // Phase 1
        case 'unpack':
            return <RewardCard icon="🎒✨" titleKey="reward_unpack_title" descKey="reward_unpack_desc" colorClass="text-indigo-600" iconClass="animate-bounce" />;
        case 'clothes':
             return <RewardCard icon="👕🦸" titleKey="reward_clothes_title" descKey="reward_clothes_desc" colorClass="text-blue-600" iconClass="animate-pulse" />;
        case 'lunch':
             return <RewardCard icon="🥪😋" titleKey="reward_lunch_title" descKey="reward_lunch_desc" colorClass="text-green-600" iconClass="animate-bounce" />;
         case 'trash':
             return <RewardCard icon="🗑️♻️" titleKey="reward_trash_title" descKey="reward_trash_desc" colorClass="text-gray-600" iconClass="animate-spin" />;
        case 'rest':
             return <RewardCard icon="🛌💤" titleKey="reward_rest_title" descKey="reward_rest_desc" colorClass="text-purple-600" iconClass="animate-pulse" />;

        // Phase 2
        case 'homework_sorted':
             return <RewardCard icon="📚✅" titleKey="reward_org_title" descKey="reward_org_desc" colorClass="text-orange-600" iconClass="" />;

        // Phase 3
        default:
            if (lastInteraction.startsWith('study_')) {
                 return <RewardCard icon="🧠💡" titleKey="reward_study_title" descKey="reward_study_desc" colorClass="text-pink-600" iconClass="animate-bounce" />;
            } else {
                 return (
                    <div className="text-center space-y-6 animate-in zoom-in-75 duration-500">
                         <div className="relative">
                            <div className="absolute inset-0 bg-yellow-400/30 blur-3xl rounded-full scale-150 animate-pulse" />
                            <Sparkles size={100} className="text-yellow-400 mx-auto relative z-10"/>
                        </div>
                        <h3 className="text-4xl font-black text-yellow-500">{t('reward_awesome_title')}</h3>
                    </div>
                );
            }
    }
  };

  return (
    <div 
        key={key}
        className={cn(
        "h-full min-h-[600px] rounded-[2.5rem] p-8 shadow-xl border border-gray-200 dark:border-gray-800 transition-all duration-500 flex items-center justify-center overflow-hidden relative",
        user.theme === 'meisie' ? 'bg-pink-50/50 dark:bg-pink-900/10' : 'bg-blue-50/50 dark:bg-blue-900/10',
        lastInteraction && "bg-white dark:bg-gray-800 scale-[1.02] shadow-2xl ring-4 ring-offset-4 ring-indigo-100 dark:ring-indigo-900 dark:ring-offset-gray-900"
    )}>
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0)', backgroundSize: '32px 32px' }}>
        </div>
        
        <div className="relative z-10 w-full">
            {getContent()}
        </div>
    </div>
  );
}
