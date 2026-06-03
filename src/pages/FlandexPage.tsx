import React, { useState, useEffect } from 'react';
import { MOCK_FLANS } from '../data/mockFlans';
import { Star, Trophy, Crown, Users, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getStoredUserData } from '../services/storage';

const FlandexPage: React.FC = () => {
  const navigate = useNavigate();
  const [rankingType, setRankingType] = useState<'community' | 'personal'>('community');
  const [personalFlans, setPersonalFlans] = useState<any[]>([]);

  useEffect(() => {
    const userData = getStoredUserData();
    const eatenFlans = MOCK_FLANS.filter(flan => 
      userData.some(u => u.flanId === flan.id && u.isEaten)
    ).map(flan => {
      const userFlan = userData.find(u => u.flanId === flan.id);
      return {
        ...flan,
        userRating: userFlan?.userRating || 0
      };
    }).sort((a, b) => (b.userRating || 0) - (a.userRating || 0));

    setPersonalFlans(eatenFlans);
  }, []);

  // Sorted by rating
  const topFlans = [...MOCK_FLANS].sort((a, b) => b.rating - a.rating);

  return (
    <div className="flex flex-col h-full bg-base-100">
      {/* FIXED HEADER SECTION */}
      <div className="flex-none px-8 pt-10 pb-6 border-b border-base-200">
        <div className="flex items-center gap-2 mb-2 opacity-50 uppercase tracking-[0.2em] text-[10px] font-black">
          <Trophy size={14} /> Performance Data
        </div>
        <h2 className="text-4xl font-black text-neutral uppercase tracking-tighter mb-6">Classement</h2>

        {/* Toggle Switch */}
        <div className="grid grid-cols-2 bg-base-200 p-1 rounded-2xl">
          <button 
            onClick={() => setRankingType('community')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${rankingType === 'community' ? 'bg-primary text-primary-content shadow-lg' : 'text-neutral/40 hover:text-neutral/60'}`}
          >
            <Users size={16} /> Communauté
          </button>
          <button 
            onClick={() => setRankingType('personal')}
            className={`flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all
              ${rankingType === 'personal' ? 'bg-primary text-primary-content shadow-lg' : 'text-neutral/40 hover:text-neutral/60'}`}
          >
            <User size={16} /> Personnel
          </button>
        </div>
      </div>

      {/* SCROLLABLE LIST SECTION */}
      <div className="flex-1 overflow-y-auto px-6 py-6 pb-32 space-y-4">
        {rankingType === 'personal' ? (
          personalFlans.length > 0 ? (
            personalFlans.map((flan, index) => {
              const isWinner = index === 0;
              return (
                <div 
                  key={flan.id} 
                  onClick={() => navigate(`/flan/${flan.id}`)}
                  className={`flex items-center gap-5 p-5 rounded-[1.5rem] border border-base-200 bg-base-100 transition-all active:scale-95 cursor-pointer hover:border-primary/20
                    ${isWinner ? 'shadow-xl shadow-primary/5 border-primary/10' : ''}`}
                >
                  <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-black
                    ${isWinner ? 'bg-primary text-primary-content' : 'bg-base-200 text-neutral/30'}`}
                  >
                    {isWinner ? <Crown size={22} /> : index + 1}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="font-black text-neutral text-lg truncate mb-0.5 uppercase tracking-tight">{flan.bakery}</h3>
                    <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest leading-none truncate">{flan.name}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1">
                    <div className="flex items-center gap-1 text-primary font-black">
                      <Star size={14} className="fill-current" />
                      <span>{flan.userRating || '-'}</span>
                    </div>
                    <span className="text-[9px] font-bold text-neutral/30 uppercase">Ma Note</span>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="py-10 text-center opacity-30">
              <Trophy size={48} className="mx-auto mb-4" />
              <p className="text-xs font-black uppercase tracking-widest">Aucune donnée personnelle</p>
              <p className="text-[10px] mt-2 font-bold">Goûtez plus de spécimens pour établir votre propre hiérarchie.</p>
            </div>
          )
        ) : (
          topFlans.map((flan, index) => {
            const isWinner = index === 0;
            return (
              <div 
                key={flan.id} 
                onClick={() => navigate(`/flan/${flan.id}`)}
                className={`flex items-center gap-5 p-5 rounded-[1.5rem] border border-base-200 bg-base-100 transition-all active:scale-95 cursor-pointer hover:border-primary/20
                  ${isWinner ? 'shadow-xl shadow-primary/5 border-primary/10' : ''}`}
              >
                <div className={`w-12 h-12 rounded-xl flex-shrink-0 flex items-center justify-center text-xl font-black
                  ${isWinner ? 'bg-primary text-primary-content' : 'bg-base-200 text-neutral/30'}`}
                >
                  {isWinner ? <Crown size={22} /> : index + 1}
                </div>

                <div className="flex-1 min-w-0">
                  <h3 className="font-black text-neutral text-lg truncate mb-0.5 uppercase tracking-tight">{flan.bakery}</h3>
                  <p className="text-[10px] font-bold text-neutral/40 uppercase tracking-widest leading-none truncate">{flan.name}</p>
                </div>

                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1 text-primary font-black">
                    <Star size={14} className="fill-current" />
                    <span>{flan.rating.toFixed(1)}</span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default FlandexPage;
