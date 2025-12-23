'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: Date;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  xp: number;
  badge: string;
}

const achievements: Achievement[] = [
  { id: 'view-hero', name: 'First Impression', description: 'Viewed the hero section', xp: 10, badge: '👋' },
  { id: 'view-about', name: 'Know Me Better', description: 'Explored the about section', xp: 15, badge: '👤' },
  { id: 'view-skills', name: 'Skill Explorer', description: 'Checked out skills', xp: 20, badge: '💪' },
  { id: 'view-projects', name: 'Project Hunter', description: 'Viewed projects', xp: 25, badge: '🚀' },
  { id: 'view-blog', name: 'Blog Reader', description: 'Read blog posts', xp: 15, badge: '📝' },
  { id: 'view-contact', name: 'Social Butterfly', description: 'Visited contact section', xp: 10, badge: '📧' },
  { id: 'scroll-100', name: 'Scroller', description: 'Scrolled 100% of the page', xp: 30, badge: '📜' },
  { id: 'stay-30s', name: 'Staying Power', description: 'Stayed for 30 seconds', xp: 25, badge: '⏱️' },
  { id: 'stay-2min', name: 'Deep Dive', description: 'Stayed for 2 minutes', xp: 50, badge: '🌊' },
];

// Export hook separately
export const useGamification = () => {
  const [xp, setXp] = useState(0);
  const [level, setLevel] = useState(1);
  const [badges, setBadges] = useState<Badge[]>([]);
  const [recentUnlock, setRecentUnlock] = useState<Badge | null>(null);

  useEffect(() => {
    // Load from localStorage only on client
    if (typeof window === 'undefined') return;
    
    const savedXp = localStorage.getItem('portfolio-xp');
    const savedLevel = localStorage.getItem('portfolio-level');
    const savedBadges = localStorage.getItem('portfolio-badges');

    if (savedXp) setXp(parseInt(savedXp));
    if (savedLevel) setLevel(parseInt(savedLevel));
    if (savedBadges) {
      try {
        setBadges(JSON.parse(savedBadges));
      } catch (e) {
        console.error('Error parsing badges:', e);
      }
    }
  }, []);

  const unlockAchievement = (achievementId: string) => {
    const achievement = achievements.find(a => a.id === achievementId);
    if (!achievement) return;

    // Check if already unlocked
    const existingBadge = badges.find(b => b.id === achievementId);
    if (existingBadge?.unlocked) return;

    // Unlock badge
    const newBadge: Badge = {
      id: achievementId,
      name: achievement.name,
      description: achievement.description,
      icon: achievement.badge,
      unlocked: true,
      unlockedAt: new Date(),
    };

    const newBadges = [...badges, newBadge];
    setBadges(newBadges);
    
    // Save to localStorage only on client
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-badges', JSON.stringify(newBadges));
    }

    // Add XP
    const newXp = xp + achievement.xp;
    setXp(newXp);
    
    if (typeof window !== 'undefined') {
      localStorage.setItem('portfolio-xp', newXp.toString());
    }

    // Calculate level (100 XP per level)
    const newLevel = Math.floor(newXp / 100) + 1;
    if (newLevel > level) {
      setLevel(newLevel);
      if (typeof window !== 'undefined') {
        localStorage.setItem('portfolio-level', newLevel.toString());
      }
    }

    // Show notification
    setRecentUnlock(newBadge);
    setTimeout(() => setRecentUnlock(null), 5000);
  };

  return { xp, level, badges, recentUnlock, unlockAchievement };
};

export default function GamificationPanel() {
  const { xp, level, badges, recentUnlock, unlockAchievement } = useGamification();
  const [isOpen, setIsOpen] = useState(false);

  const xpForNextLevel = level * 100;
  const xpProgress = (xp % 100) / 100;

  return (
    <>
      {/* Floating XP Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-emerald-600 to-green-600 text-white p-4 rounded-full shadow-2xl hover:shadow-emerald-500/50 transition-all"
        aria-label="Gamification Panel"
      >
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold">Lv.{level}</span>
          <span className="text-xs">XP: {xp}</span>
        </div>
      </motion.button>

      {/* Achievement Notification */}
      <AnimatePresence>
        {recentUnlock && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -50 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: -50, x: -50 }}
            className="fixed bottom-24 right-6 z-50 bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-4 max-w-xs border-2 border-purple-500"
          >
            <div className="flex items-center gap-3">
              <span className="text-4xl">{recentUnlock.icon}</span>
              <div>
                <h4 className="font-bold text-gray-900 dark:text-white">Badge Unlocked!</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{recentUnlock.name}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Gamification Panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-40"
            />
            <motion.div
              initial={{ opacity: 0, x: 400 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 400 }}
              className="fixed right-0 top-0 h-full w-96 bg-white dark:bg-gray-900 z-50 shadow-2xl overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h2>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* Level Progress */}
                <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-lg">
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Level {level}</span>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{xp} / {xpForNextLevel} XP</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${xpProgress * 100}%` }}
                      className="h-3 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full"
                    />
                  </div>
                </div>

                {/* Badges Grid */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Your Badges</h3>
                  <div className="grid grid-cols-2 gap-4">
                    {achievements.map((achievement) => {
                      const badge = badges.find(b => b.id === achievement.id);
                      return (
                        <div
                          key={achievement.id}
                          className={`p-4 rounded-lg border-2 transition-all ${
                            badge?.unlocked
                              ? 'bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 border-purple-500'
                              : 'bg-gray-100 dark:bg-gray-800 border-gray-300 dark:border-gray-700 opacity-50'
                          }`}
                        >
                          <div className="text-4xl mb-2 text-center">{achievement.badge}</div>
                          <h4 className="font-semibold text-sm text-gray-900 dark:text-white text-center">
                            {achievement.name}
                          </h4>
                          <p className="text-xs text-gray-600 dark:text-gray-400 text-center mt-1">
                            {achievement.description}
                          </p>
                          <div className="text-xs text-emerald-600 dark:text-emerald-400 text-center mt-2">
                            +{achievement.xp} XP
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

