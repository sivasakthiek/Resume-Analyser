
import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import { Auth } from './components/Auth';
import { supabase } from '../lib/supabase';
import { Loader2 } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

export default function App() {
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'landing' | 'dashboard'>('landing');
  const [showAuth, setShowAuth] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
      if (session) {
        setView('dashboard');
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        setView('dashboard');
        setShowAuth(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setView('landing');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-blue-600">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  return (
    <>
      {view === 'landing' ? (
        <LandingPage 
          onStart={() => setView('dashboard')} 
          onLogin={() => setShowAuth(true)} 
        />
      ) : (
        <Dashboard 
          user={session?.user} 
          onLogout={handleLogout} 
        />
      )}

      <AnimatePresence>
        {showAuth && (
          <Auth 
            onSuccess={() => setShowAuth(false)} 
            onCancel={() => setShowAuth(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
}
