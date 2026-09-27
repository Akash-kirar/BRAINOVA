import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, Check, Crown, PlayCircle, TrendingUp, Calendar, BarChart2, Ban, Headphones, Star } from 'lucide-react';
import { getApiUrl } from '../lib/api';

export default function PremiumSubscriptionPage({ onBack, onSkip, onSuccess }: { onBack: () => void; onSkip?: () => void; onSuccess?: () => void; }) {
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'quarterly' | 'yearly'>('yearly');
  const [showRequestPage, setShowRequestPage] = useState(false);
  const [requestSubmitted, setRequestSubmitted] = useState(false);

  
  const handlePayment = () => { setShowRequestPage(true); };

  const features = [
    { text: 'Access to all 100+ Premium Games', icon: <PlayCircle className="w-[18px] h-[18px] text-[#f59e0b]" /> },
    { text: 'Advanced AI analysis', icon: <TrendingUp className="w-[18px] h-[18px] text-[#f59e0b]" /> },
    { text: 'Priority Support', icon: <Headphones className="w-[18px] h-[18px] text-[#f59e0b]" /> },
    { text: 'Early Access to New Features', icon: <Star className="w-[18px] h-[18px] text-[#f59e0b]" /> },
    { text: 'Detailed progress reports', icon: <BarChart2 className="w-[18px] h-[18px] text-[#f59e0b]" /> },
    { text: 'Personalized Daily Workouts', icon: <Calendar className="w-[18px] h-[18px] text-[#f59e0b]" /> },
  ];

  if (showRequestPage) {
    return (
      <div className="fixed inset-0 bg-[#0a0a0c] z-50 flex flex-col items-center justify-center p-6 text-white text-center">
        {!requestSubmitted ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-[#121215] rounded-3xl p-8 border border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-violet-500 to-fuchsia-500"></div>
            <Crown className="w-16 h-16 text-[#f59e0b] mx-auto mb-6" />
            <h2 className="text-2xl font-bold mb-4">Request Premium Access</h2>
            <p className="text-white/60 mb-8 leading-relaxed">
              Submit a request to become a premium member. We will review your profile and activate your premium features within 24 hours.
            </p>
            <div className="flex flex-col gap-3">
              <button onClick={() => {
                  setRequestSubmitted(true);
                  setTimeout(() => {
                    localStorage.setItem("brainova_is_pro", "true");
                    onBack();
                    if (onSuccess) onSuccess();
                  }, 2500);
                }} 
                className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white font-bold py-4 rounded-xl text-[16px] hover:opacity-90 transition-opacity">
                Submit Request
              </button>
              <button onClick={() => setShowRequestPage(false)} className="w-full py-4 text-white/50 font-semibold hover:text-white transition-colors">
                Cancel
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="max-w-md w-full bg-[#121215] rounded-3xl p-8 border border-[#10b981]/20 shadow-2xl flex flex-col items-center justify-center min-h-[300px]">
            <div className="w-20 h-20 bg-[#10b981]/10 rounded-full flex items-center justify-center mb-6 border-[2px] border-[#10b981]">
               <Check className="w-10 h-10 text-[#10b981]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Request Sent!</h2>
            <p className="text-[#10b981] font-medium">You will be upgraded shortly.</p>
          </motion.div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0c0914] font-sans text-white relative z-50 overflow-hidden">
      
      {/* Background elements */}
      <div className="absolute top-0 left-0 right-0 h-96 bg-gradient-to-b from-[#2e1065]/40 to-transparent pointer-events-none"></div>
      
      {/* Small floating stars/particles */}
      <div className="absolute top-8 left-10 w-2 h-2 bg-purple-400 rounded-sm rotate-45 opacity-40"></div>
      <div className="absolute top-20 right-14 w-3 h-3 bg-pink-400 rounded-sm rotate-12 opacity-30"></div>
      <div className="absolute top-40 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full opacity-50"></div>
      <div className="absolute top-32 right-32 w-2 h-2 bg-blue-400 rounded-sm rotate-45 opacity-40"></div>

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5 shrink-0 z-10 relative">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center -ml-2 text-white/90">
          <ChevronLeft className="w-6 h-6" />
        </button>

      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-32 flex flex-col relative z-10">
        
        {/* Crown Icon */}
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-yellow-500/20 blur-xl rounded-full"></div>
            <Crown className="w-[60px] h-[60px] text-[#fbbf24] fill-[#fbbf24] drop-shadow-[0_0_15px_rgba(251,191,36,0.5)]" />
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-8">
          <h2 className="text-[28px] font-bold text-white mb-2 tracking-tight">Brainova Premium</h2>
          <p className="text-white/60 text-[16px]">Unlock your brain's full potential</p>
        </div>

        {/* Features List */}
        <div className="bg-[#1a1432] border border-white/5 rounded-3xl p-6 mb-8">
          <div className="space-y-4">
            {features.map((feature, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className="w-6 flex justify-center">
                  {feature.icon}
                </div>
                <span className="text-[15px] font-medium text-white/90">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="flex flex-col gap-4">
          <button 
            onClick={() => setSelectedPlan('monthly')}
            className={`w-full rounded-2xl p-5 flex justify-between items-center border-[2px] transition-all relative ${
              selectedPlan === 'monthly' 
                ? 'bg-slate-800/80 border-slate-400' 
                : 'bg-white/5 border-transparent opacity-80 hover:opacity-100'
            }`}
          >
            <div className="text-left">
              <div className="font-bold text-[18px] text-white">1 Month</div>
              <div className="text-[11px] font-bold tracking-wider mt-1 text-white/50 uppercase">Subscription</div>
            </div>
            <div className="font-bold text-[24px] text-white">₹199</div>
          </button>

          <button 
            onClick={() => setSelectedPlan('quarterly')}
            className={`w-full rounded-2xl p-5 flex justify-between items-center border-[2px] transition-all relative ${
              selectedPlan === 'quarterly' 
                ? 'bg-[#f43f5e]/10 border-[#f43f5e]' 
                : 'bg-[#f43f5e]/5 border-[#f43f5e]/20 opacity-90 hover:opacity-100'
            }`}
          >
            
            <div className="text-left">
              <div className="font-bold text-[18px] text-white">3 Months</div>
              <div className="text-[11px] font-bold tracking-wider mt-1 text-white/50 uppercase">Subscription</div>
            </div>
            <div className="font-bold text-[24px] text-white">₹99</div>
          </button>

          <button 
            onClick={() => setSelectedPlan('yearly')}
            className={`w-full rounded-2xl p-5 flex justify-between items-center border-[2px] transition-all relative ${
              selectedPlan === 'yearly' 
                ? 'bg-amber-500/10 border-amber-500' 
                : 'bg-amber-500/5 border-amber-500/20 opacity-80 hover:opacity-100'
            }`}
          >
            <div className="text-left">
              <div className="font-bold text-[18px] text-white">1 Year</div>
              <div className="text-[11px] font-bold tracking-wider mt-1 text-white/50 uppercase">Subscription</div>
            </div>
            <div className="font-bold text-[24px] text-white">₹1,999</div>
          </button>
        </div>

      </div>

      {/* Bottom Sticky action */}
      <div className="absolute bottom-0 left-0 right-0 p-6 pt-10 bg-gradient-to-t from-[#0c0914] via-[#0c0914] to-transparent z-20 flex flex-col items-center">
        <button onClick={handlePayment} className="w-full bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 hover:from-violet-500 hover:via-fuchsia-500 hover:to-pink-400 shadow-[0_0_25px_rgba(217,70,239,0.4)] hover:shadow-[0_0_35px_rgba(217,70,239,0.6)] text-white font-bold py-4 rounded-full text-[18px] hover:-translate-y-1 transition-all mb-4">
          Proceed to Payment
        </button>
        <p className="text-white/40 text-[14px]">Cancel anytime</p>
      </div>

    </div>
  );
}

