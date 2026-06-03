import React, { useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Map as MapIcon, Trophy, User, Smartphone } from 'lucide-react';

const Layout: React.FC = () => {
  const location = useLocation();
  const isActive = (path: string) => location.pathname === path;

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'flantheme');
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-base-100 text-neutral overflow-hidden">
      <main className="flex-1 relative overflow-hidden">
        <Outlet />
      </main>

      {/* Floating Pokedex Nav */}
      <div className="fixed bottom-6 left-0 right-0 px-6 z-[9999] pointer-events-none">
        <nav className="w-full max-w-md mx-auto bg-neutral rounded-[2rem] shadow-2xl flex justify-between items-center p-2 gap-1 pointer-events-auto border-2 border-primary/20">
          <NavItem to="/" active={isActive('/')} icon={<MapIcon size={22} />} label="Carte" />
          <NavItem to="/flandex" active={isActive('/flandex')} icon={<Smartphone size={22} />} label="Flandex" />
          <NavItem to="/elite" active={isActive('/elite')} icon={<Trophy size={22} />} label="Classement" />
          <NavItem to="/profile" active={isActive('/profile')} icon={<User size={22} />} label="Moi" />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ to, active, icon, label }: { to: string, active: boolean, icon: React.ReactNode, label: string }) => (
  <Link 
    to={to} 
    className={`flex-1 flex flex-col items-center justify-center gap-1 py-2 px-1 rounded-2xl transition-all duration-300 min-w-0 ${active ? 'bg-primary text-primary-content shadow-inner' : 'text-white/40 hover:text-white'}`}
  >
    {icon}
    <span className="text-[9px] font-black uppercase tracking-widest truncate w-full text-center">{label}</span>
  </Link>
);

export default Layout;
