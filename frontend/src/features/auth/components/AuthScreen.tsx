import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, Mail, Lock, User, Brain } from 'lucide-react';
import type { Provider } from '@supabase/supabase-js';
import { Language, t } from '@/src/i18n';
import { supabase, supabaseConfigError } from '@/src/lib/supabase';

interface AuthScreenProps {
  language: Language;
  onLogin: (name?: string) => void;
  onBack: () => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ language, onLogin, onBack }) => {
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('signup');
  const [signupName, setSignupName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const trimmedEmail = email.trim().toLowerCase();
  const displayName = signupName.trim() || trimmedEmail.split('@')[0];

  const requireSupabase = () => {
    if (!supabase) {
      setInfoMsg('');
      setErrorMsg(supabaseConfigError);
      return false;
    }
    return true;
  };

  const validateEmailPassword = () => {
    if (!trimmedEmail || !password) {
      setErrorMsg('Enter your email and password.');
      return false;
    }
    if (password.length < 6) {
      setErrorMsg('Password must be at least 6 characters.');
      return false;
    }
    return true;
  };

  const loadProfileName = async (userId: string) => {
    if (!supabase) return displayName;

    const { data, error } = await supabase
      .from('profiles')
      .select('name')
      .eq('id', userId)
      .maybeSingle();

    if (error) {
      console.warn('Unable to load profile after login:', error.message);
    }

    return data?.name || displayName;
  };

  const handleEmailLogin = async () => {
    if (!requireSupabase() || !validateEmailPassword()) return;

    setLoading(true);
    setErrorMsg('');
    setInfoMsg('');
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: trimmedEmail,
        password,
      });
      if (error) throw error;
      if (!data.user) throw new Error('Login did not return a user session.');

      onLogin(await loadProfileName(data.user.id));
    } catch (e: any) {
      setErrorMsg(e.message || 'Unable to log in.');
    } finally {
      setLoading(false);
    }
  };

  const handleEmailSignup = async () => {
    if (!requireSupabase() || !validateEmailPassword()) return;

    setLoading(true);
    setErrorMsg('');
    setInfoMsg('');
    try {
      const { data, error } = await supabase.auth.signUp({
        email: trimmedEmail,
        password,
        options: {
          data: {
            name: displayName,
          },
        },
      });
      if (error) throw error;

      if (data.session && data.user) {
        await supabase.from('profiles').upsert({
          id: data.user.id,
          name: displayName,
          email: data.user.email,
        });
        onLogin(displayName);
        return;
      }

      setInfoMsg('Check your email to confirm your account, then log in.');
    } catch (e: any) {
      setErrorMsg(e.message || 'Unable to create your account.');
    } finally {
      setLoading(false);
    }
  };

  const handleOAuthLogin = async (provider: Provider) => {
    if (!requireSupabase()) return;

    setLoading(true);
    setErrorMsg('');
    setInfoMsg('');
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: window.location.origin,
        },
      });
      if (error) throw error;
    } catch (e: any) {
      setErrorMsg(e.message || `Unable to continue with ${provider}.`);
      setLoading(false);
    }
  };

  const GoogleIcon = () => (
    <svg className="w-5 h-5" viewBox="0 0 48 48">
      <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.7 17.74 9.5 24 9.5z" />
      <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z" />
      <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z" />
      <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z" />
      <path fill="none" d="M0 0h48v48H0z" />
    </svg>
  );

  return (
    <div className="flex flex-col h-[100dvh] bg-[#0a0a0c] font-sans text-white relative overflow-hidden">
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-sky-500/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none" />

      <div className="flex-1 flex flex-col px-8 pt-12 pb-12 overflow-y-auto hide-scrollbar relative z-10 w-full max-w-md mx-auto justify-center">
        <AnimatePresence mode="wait">
          {authMode === 'login' && (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                <Brain className="w-10 h-10 text-sky-400" />
              </div>

              <h2 className="text-3xl font-bold mb-2 tracking-tight text-center">{t('welcomeBack', language) || 'Welcome Back'}</h2>
              <p className="text-white/60 mb-8 text-[15px] text-center">Log in to continue your training.</p>

              <div className="space-y-4 mb-6 w-full">
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailAddress', language) || 'Email address'}
                    className="w-full bg-[#1a1a1c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('password', language) || 'Password'}
                    className="w-full bg-[#1a1a1c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-[15px]"
                  />
                </div>
              </div>

              <div className="flex justify-end mb-8 w-full">
                <button className="text-[13px] font-medium text-sky-400 hover:text-sky-300 transition-colors">
                  {t('forgotPassword', language) || 'Forgot password?'}
                </button>
              </div>

              {(errorMsg || infoMsg) && (
                <div className={`text-sm mb-6 ${errorMsg ? 'text-red-400' : 'text-emerald-400'}`}>
                  {errorMsg || infoMsg}
                </div>
              )}
              
              <button
                onClick={handleEmailLogin}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-sky-500 text-white font-bold text-lg hover:bg-sky-600 hover:scale-[0.98] active:scale-95 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 mb-8"
              >
                {loading ? 'Loading...' : (t('logIn', language) || 'Log In')}
              </button>

              <div className="w-full flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Or continue with</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#1a1a1c] border border-white/10 text-white font-bold text-[16px] flex items-center justify-center gap-3 hover:bg-[#2a2a2c] hover:scale-[0.98] active:scale-95 transition-all mb-8 shadow-sm disabled:opacity-50"
                aria-label="Continue with Google"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="text-[15px] text-white/60">
                Don't have an account?{' '}
                <button onClick={() => setAuthMode('signup')} className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Sign up
                </button>
              </div>
            </motion.div>
          )}

          {authMode === 'signup' && (
            <motion.div
              key="signup"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-full bg-sky-500/10 border border-sky-500/20 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(14,165,233,0.2)]">
                <Brain className="w-10 h-10 text-sky-400" />
              </div>

              <h2 className="text-3xl font-bold mb-2 tracking-tight text-center">{t('createAccount', language) || 'Create Account'}</h2>
              <p className="text-white/60 mb-8 text-[15px] text-center">Start your cognitive training journey today.</p>

              <div className="space-y-4 mb-8 w-full">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="text"
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    placeholder="Full Name"
                    className="w-full bg-[#1a1a1c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={t('emailAddress', language) || 'Email address'}
                    className="w-full bg-[#1a1a1c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-[15px]"
                  />
                </div>
                <div className="relative group">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40 group-focus-within:text-sky-400 transition-colors" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder={t('password', language) || 'Password'}
                    className="w-full bg-[#1a1a1c] border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/30 focus:outline-none focus:border-sky-500/50 focus:ring-1 focus:ring-sky-500/50 transition-all text-[15px]"
                  />
                </div>
              </div>

              {(errorMsg || infoMsg) && (
                <div className={`text-sm mb-6 ${errorMsg ? 'text-red-400' : 'text-emerald-400'}`}>
                  {errorMsg || infoMsg}
                </div>
              )}
              
              <button
                onClick={handleEmailSignup}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-sky-500 text-white font-bold text-lg hover:bg-sky-600 hover:scale-[0.98] active:scale-95 transition-all shadow-[0_0_20px_rgba(14,165,233,0.3)] disabled:opacity-50 mb-8"
              >
                {loading ? 'Loading...' : (t('signUp', language) || 'Sign up')}
              </button>

              <div className="w-full flex items-center gap-4 mb-8">
                <div className="flex-1 h-px bg-white/10"></div>
                <span className="text-[11px] text-white/40 uppercase tracking-wider font-semibold">Or continue with</span>
                <div className="flex-1 h-px bg-white/10"></div>
              </div>

              <button
                onClick={() => handleOAuthLogin('google')}
                disabled={loading}
                className="w-full h-14 rounded-2xl bg-[#1a1a1c] border border-white/10 text-white font-bold text-[16px] flex items-center justify-center gap-3 hover:bg-[#2a2a2c] hover:scale-[0.98] active:scale-95 transition-all mb-8 shadow-sm disabled:opacity-50"
                aria-label="Continue with Google"
              >
                <GoogleIcon />
                Continue with Google
              </button>

              <div className="text-[15px] text-white/60">
                Already have an account?{' '}
                <button onClick={() => setAuthMode('login')} className="text-sky-400 hover:text-sky-300 font-medium transition-colors">
                  Log in
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
