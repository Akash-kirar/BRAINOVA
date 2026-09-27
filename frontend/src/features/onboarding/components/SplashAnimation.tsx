import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Brain } from 'lucide-react';

export const SplashAnimation = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let currentProgress = 0;
    const interval = setInterval(() => {
      // Slower loading (~1.6s)
      currentProgress += 3;
      
      if (currentProgress >= 100) {
        setProgress(100);
        clearInterval(interval);
        setTimeout(onComplete, 300); // Wait a bit after reaching 100% before transitioning
      } else {
        setProgress(currentProgress);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="flex-1 flex flex-col items-center justify-center z-10 w-full px-8 max-w-sm mx-auto">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center mb-12"
      >
        <div className="w-24 h-24 mb-6 text-[#00a8ff] flex items-center justify-center">
          <Brain className="w-full h-full" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-3xl font-bold tracking-[0.2em] text-[#00a8ff] ml-2">
          BRAINOVA
        </h1>
      </motion.div>

      <div className="w-full relative pt-8">
        <div className="flex justify-between text-xs font-bold text-white/50 mb-3 tracking-widest px-1">
          <span>SYSTEM LOADING</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-[#00a8ff] rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ ease: "linear", duration: 0.1 }}
          />
        </div>
      </div>
    </div>
  );
};
