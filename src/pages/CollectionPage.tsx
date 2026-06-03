import React, { useState, useEffect } from 'react';
import { MOCK_FLANS } from '../data/mockFlans';
import { Sparkles, Search, Fingerprint } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStoredUserData } from '../services/storage';

const CollectionPage: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [eatenIds, setEatenIds] = useState<string[]>([]);

  useEffect(() => {
    const userData = getStoredUserData();
    setEatenIds(userData.filter(f => f.isEaten).map(f => f.flanId));
  }, []);
  
  const filteredFlans = MOCK_FLANS.filter(flan => 
    flan.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    flan.bakery.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const eatenCount = eatenIds.length;

  return (
    <div className="flex flex-col h-full bg-base-100">
      {/* FIXED HEADER SECTION */}
      <div className="flex-none px-8 pt-10 pb-6 border-b border-base-200">
        <div className="flex justify-between items-end mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
               <div className="w-3 h-3 rounded-full bg-error animate-pulse shadow-[0_0_8px_rgba(255,0,0,0.4)]"></div>
               <div className="w-2 h-2 rounded-full bg-warning"></div>
               <div className="w-2 h-2 rounded-full bg-success"></div>
            </div>
            <h2 className="text-4xl font-black text-neutral uppercase tracking-tighter">Flandex</h2>
            <p className="text-[10px] font-bold opacity-30 uppercase tracking-[0.4em]">Data Collection v1.0</p>
          </div>
          <div className="text-right">
            <span className="text-xs font-black opacity-20 uppercase tracking-widest leading-none block">Captured</span>
            <div className="text-3xl font-black text-primary leading-none mt-1">{eatenCount}<span className="text-neutral/10 text-xl">/{MOCK_FLANS.length}</span></div>
          </div>
        </div>

        {/* Search Bar inside fixed section */}
        <div className="relative mt-4">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-neutral/20" size={18} />
          <input 
            type="text" 
            placeholder="Rechercher un spécimen..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-base-200 border-none rounded-2xl py-4 pl-12 pr-4 text-sm font-bold focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* SCROLLABLE LIST SECTION */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-3">
        {filteredFlans.length > 0 ? (
          filteredFlans.map((flan) => {
            const isEaten = eatenIds.includes(flan.id);
            const flanNumber = flan.id.padStart(3, '0');
            
            return (
              <div 
                key={flan.id} 
                onClick={() => navigate(`/flan/${flan.id}`)}
                className={`group flex items-center gap-4 p-3 rounded-2xl border transition-all cursor-pointer active:scale-[0.98]
                  ${isEaten 
                    ? 'bg-base-100 border-primary/20 shadow-lg shadow-primary/5' 
                    : 'bg-base-200/50 border-transparent opacity-60'}`}
              >
                {/* ID Badge */}
                <div className="text-[10px] font-black opacity-20 rotate-90 w-8">
                  NO.{flanNumber}
                </div>

                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-xl flex items-center justify-center text-2xl shadow-inner
                  ${isEaten ? 'bg-primary/5 border border-primary/5' : 'bg-neutral/5 grayscale'}`}>
                  {isEaten ? '🍮' : '?'}
                </div>

                {/* Data Section */}
                <div className="flex-1 min-w-0">
                  <h4 className={`font-black text-sm uppercase tracking-tight truncate ${isEaten ? 'text-neutral' : 'text-neutral/20'}`}>
                    {flan.bakery}
                  </h4>
                  <div className="flex items-center gap-2 mt-0.5">
                     <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-widest
                       ${isEaten ? 'bg-primary/10 text-primary' : 'bg-neutral/10 text-neutral/20 opacity-50'}`}>
                       Vanille
                     </div>
                     <div className="w-1 h-1 bg-neutral/10 rounded-full"></div>
                     <span className="text-[9px] font-bold text-neutral/20 uppercase truncate">
                       {flan.name}
                     </span>
                  </div>
                </div>

                {/* Status Action */}
                <div className="flex-shrink-0">
                  {isEaten ? (
                    <Sparkles size={16} className="text-primary/40 animate-pulse" />
                  ) : (
                    <Fingerprint size={18} className="text-neutral/10" />
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-20 text-center opacity-20 font-black uppercase tracking-widest text-sm">
            Aucun spécimen trouvé
          </div>
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
