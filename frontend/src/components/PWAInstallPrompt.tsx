import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, X, Smartphone, WifiOff, CheckCircle2, Share2, PlusSquare, Sparkles } from 'lucide-react';

interface PWAInstallPromptProps {
  isInstallable: boolean;
  isInstalled: boolean;
  isIOS: boolean;
  isOnline: boolean;
  showInstallModal: boolean;
  setShowInstallModal: (show: boolean) => void;
  installedRecently: boolean;
  onInstall: () => Promise<string>;
}

export const PWAInstallPrompt: React.FC<PWAInstallPromptProps> = ({
  isInstallable,
  isInstalled,
  isIOS,
  isOnline,
  showInstallModal,
  setShowInstallModal,
  installedRecently,
  onInstall
}) => {
  const [bannerDismissed, setBannerDismissed] = useState(false);

  useEffect(() => {
    const dismissed = sessionStorage.getItem('pwa_banner_dismissed');
    if (dismissed === 'true') {
      setBannerDismissed(true);
    }
  }, []);

  const handleDismissBanner = () => {
    setBannerDismissed(true);
    sessionStorage.setItem('pwa_banner_dismissed', 'true');
  };

  const handleInstallClick = async () => {
    const res = await onInstall();
    if (res === 'unavailable') {
      setShowInstallModal(true);
    }
  };

  return (
    <>
      {/* 1. Offline Mode Top Notification Banner */}
      <AnimatePresence>
        {!isOnline && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-0 left-0 right-0 z-50 bg-[#16120c] border-b border-amber-500/30 text-amber-300 px-4 py-2 text-xs font-semibold flex items-center justify-center gap-2 shadow-lg backdrop-blur-md"
          >
            <WifiOff className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>Offline Mode Active — Cached cognitive games and workouts remain playable</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. Success Toast when App Installed */}
      <AnimatePresence>
        {installedRecently && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-[#0d1612] border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-2xl flex items-center gap-3 shadow-2xl backdrop-blur-xl"
          >
            <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
            </div>
            <div>
              <div className="font-bold text-sm text-white">Brainova Installed!</div>
              <div className="text-xs text-emerald-400/80">Added to your home screen & ready for offline play</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Floating Custom Install Banner (Shown when app is installable and not dismissed) */}
      <AnimatePresence>
        {isInstallable && !isInstalled && !bannerDismissed && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            className="fixed bottom-20 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 sm:max-w-md z-40 bg-[#12151D]/95 border border-emerald-500/30 rounded-2xl p-4 shadow-2xl backdrop-blur-xl"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 overflow-hidden shadow-inner">
                  <img src="/favicon.png" alt="Brainova Logo" className="w-7 h-7 object-contain" />
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Install Brainova App
                    <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-extrabold uppercase tracking-wide">
                      PWA
                    </span>
                  </h4>
                  <p className="text-xs text-white/60 line-clamp-1 mt-0.5">
                    Fast offline training, full screen & home screen access
                  </p>
                </div>
              </div>
              <button
                onClick={handleDismissBanner}
                className="text-white/40 hover:text-white/80 p-1 rounded-lg transition"
                title="Dismiss"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
              <button
                onClick={handleInstallClick}
                className="flex-1 py-2 px-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 transition active:scale-98 shadow-md"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Install App</span>
              </button>
              <button
                onClick={() => setShowInstallModal(true)}
                className="py-2 px-3 bg-white/5 hover:bg-white/10 text-white/70 hover:text-white text-xs font-semibold rounded-xl transition"
              >
                Details
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Full Custom Install Modal (Triggered by Custom Button anywhere in app) */}
      <AnimatePresence>
        {showInstallModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md"
            onClick={() => setShowInstallModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              className="bg-[#12151D] border border-white/10 rounded-3xl max-w-sm w-full p-6 text-center shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background ambient lighting */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-32 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />

              <button
                onClick={() => setShowInstallModal(false)}
                className="absolute top-4 right-4 p-1.5 text-white/50 hover:text-white rounded-full bg-white/5 hover:bg-white/10 transition"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Logo / Badge */}
              <div className="w-16 h-16 rounded-2xl bg-[#090B0F] border border-emerald-500/30 flex items-center justify-center mx-auto mb-4 shadow-lg relative">
                <img src="/favicon.png" alt="Brainova Logo" className="w-10 h-10 object-contain" />
                <div className="absolute -bottom-1 -right-1 p-1 bg-emerald-500 rounded-full text-black">
                  <Sparkles className="w-3 h-3" />
                </div>
              </div>

              <h3 className="text-xl font-extrabold text-white mb-1">
                Install Brainova
              </h3>
              <p className="text-xs text-white/60 mb-5">
                The full cognitive training experience right on your device
              </p>

              {/* Features List */}
              <div className="flex flex-col gap-2.5 text-left mb-6">
                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center shrink-0">
                    <Smartphone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Home Screen & Dock Access</div>
                    <div className="text-[11px] text-white/50">Launch instantly like a native app</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/15 text-blue-400 flex items-center justify-center shrink-0">
                    <WifiOff className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Offline Training Mode</div>
                    <div className="text-[11px] text-white/50">Play cached games anywhere without WiFi</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 p-2.5 rounded-xl bg-white/5 border border-white/5">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/15 text-purple-400 flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-white">Full Screen Immersion</div>
                    <div className="text-[11px] text-white/50">Zero browser tabs or URL bars distraction</div>
                  </div>
                </div>
              </div>

              {/* Action Button or iOS Step Guide */}
              {isIOS ? (
                <div className="bg-[#0b0e14] border border-blue-500/20 rounded-2xl p-4 text-left">
                  <div className="text-xs font-bold text-blue-400 mb-2 flex items-center gap-1.5">
                    <Share2 className="w-4 h-4" /> Install on iOS Safari:
                  </div>
                  <ol className="text-xs text-white/70 space-y-2 list-decimal list-inside">
                    <li>
                      Tap the <strong className="text-white">Share</strong> button in Safari's bottom toolbar.
                    </li>
                    <li className="flex items-center gap-1.5 flex-wrap">
                      <span>Scroll and tap</span>
                      <span className="inline-flex items-center gap-1 bg-white/10 px-2 py-0.5 rounded text-white font-semibold">
                        <PlusSquare className="w-3.5 h-3.5" /> Add to Home Screen
                      </span>
                    </li>
                    <li>
                      Tap <strong className="text-emerald-400">Add</strong> in the top-right corner.
                    </li>
                  </ol>
                </div>
              ) : isInstalled ? (
                <div className="p-3 bg-emerald-500/15 border border-emerald-500/30 rounded-2xl text-emerald-300 font-bold text-xs flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Already Installed as an App</span>
                </div>
              ) : (
                <button
                  onClick={handleInstallClick}
                  className="w-full py-3.5 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-black font-bold text-sm rounded-xl flex items-center justify-center gap-2 transition active:scale-98 shadow-lg cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>Install Brainova App</span>
                </button>
              )}

              <button
                onClick={() => setShowInstallModal(false)}
                className="mt-3 text-xs text-white/50 hover:text-white transition"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default PWAInstallPrompt;
