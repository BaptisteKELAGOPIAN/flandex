import React, { useState } from 'react';
import { Lock } from 'lucide-react';

const PIN_CODE = import.meta.env.VITE_APP_PIN_CODE || '1234';
const AUTH_KEY = 'flandex_is_authenticated';

interface AuthGuardProps {
  children: React.ReactNode;
}

export const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return localStorage.getItem(AUTH_KEY) === 'true';
  });
  const [pin, setPin] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (pin === PIN_CODE) {
      localStorage.setItem(AUTH_KEY, 'true');
      setIsAuthenticated(true);
    } else {
      setError(true);
      setPin('');
      setTimeout(() => setError(false), 2000);
    }
  };

  if (isAuthenticated) {
    return <>{children}</>;
  }

  return (
    <div className="h-screen w-full bg-base-200 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-sm bg-base-100 p-8 rounded-[3rem] shadow-2xl border border-base-300 flex flex-col items-center animate-in zoom-in-95">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-6">
          <Lock size={32} />
        </div>
        <h1 className="text-2xl font-black text-neutral uppercase tracking-tighter mb-2">Flandex Privé</h1>
        <p className="text-xs font-bold text-neutral/40 uppercase tracking-widest text-center mb-8">Veuillez vous identifier</p>
        
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <input 
            type="password" 
            pattern="[0-9]*" 
            inputMode="numeric"
            placeholder="Code PIN" 
            value={pin}
            onChange={(e) => setPin(e.target.value)}
            className={`input input-bordered w-full rounded-2xl text-center text-2xl font-black tracking-widest h-16 ${error ? 'input-error animate-shake' : ''}`}
            autoFocus
          />
          <button type="submit" className="btn btn-primary btn-block h-16 rounded-2xl font-black uppercase tracking-widest text-lg shadow-xl shadow-primary/20">
            Déverrouiller
          </button>
        </form>
      </div>
    </div>
  );
};
