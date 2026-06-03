import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MOCK_FLANS } from '../data/mockFlans';
import { ArrowLeft, CheckCircle2, MapPin, Store, Share, Heart, MessageSquare, Star, Pencil, Save } from 'lucide-react';
import { saveUserFlan, getUserFlan } from '../services/storage';

const FlanDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const flan = MOCK_FLANS.find(f => f.id === id);

  const [isEaten, setIsEaten] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const [isEditingReview, setIsEditingReview] = useState(true);

  useEffect(() => {
    if (id) {
      const userData = getUserFlan(id);
      if (userData) {
        setIsEaten(userData.isEaten);
        setUserRating(userData.userRating || 0);
        setReviewText(userData.reviewText || '');
        setIsFavorite(!!userData.isFavorite);
        // If they have eaten it and provided ANY data, default to view mode. Else edit mode.
        setIsEditingReview(!(userData.userRating || userData.reviewText));
      } else {
        setIsEaten(false);
        setUserRating(0);
        setReviewText('');
        setIsFavorite(false);
        setIsEditingReview(true);
      }
    }
  }, [id]);

  const handleToggleFavorite = () => {
    const newState = !isFavorite;
    setIsFavorite(newState);
    if (id) {
      const userData = getUserFlan(id) || { flanId: id, isEaten: false };
      saveUserFlan({ ...userData, isFavorite: newState });
    }
  };

  const handleToggleEaten = () => {
    const newState = !isEaten;
    setIsEaten(newState);
    if (id) {
      const userData = getUserFlan(id) || { flanId: id, isEaten: false };
      if (newState) {
        saveUserFlan({ 
          ...userData,
          isEaten: true, 
          eatenAt: new Date().toISOString()
        });
        setIsEditingReview(true);
      } else {
        saveUserFlan({ ...userData, isEaten: false, userRating: 0, reviewText: '' });
        setIsEditingReview(false);
      }
    }
  };

  const handleUpdateReview = (rating: number, text: string) => {
    setUserRating(rating);
    setReviewText(text);
    if (id && isEaten) {
      saveUserFlan({ 
        flanId: id, 
        isEaten: true, 
        userRating: rating,
        reviewText: text
      });
    }
  };

  if (!flan) {
    return <div className="p-20 text-center font-black text-primary">FLAN INCONNU</div>;
  }

  return (
    <div className="h-full overflow-y-auto bg-base-200 pb-32">
      {/* Header Visual */}
      <div className="relative h-40 bg-base-300 flex items-center justify-center overflow-hidden border-b border-base-300">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, var(--p) 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
        
        <div className="absolute top-8 left-8 right-8 flex justify-between z-20">
          <button onClick={() => navigate(-1)} className="btn btn-circle btn-ghost bg-base-100/50 backdrop-blur-md shadow-lg border border-base-300">
            <ArrowLeft size={20} strokeWidth={3} />
          </button>
          <div className="flex gap-2">
            <button 
              onClick={handleToggleFavorite}
              className={`btn btn-circle btn-ghost bg-base-100/50 backdrop-blur-md shadow-lg border border-base-300 ${isFavorite ? 'text-error' : 'text-neutral/40'}`}
            >
              <Heart size={20} strokeWidth={3} fill={isFavorite ? 'currentColor' : 'none'} />
            </button>
            <button className="btn btn-circle btn-ghost bg-base-100/50 backdrop-blur-md shadow-lg border border-base-300">
              <Share size={20} strokeWidth={3} />
            </button>
          </div>
        </div>

        {isEaten && (
          <div className="absolute top-1/2 -translate-y-1/2 bg-neutral text-white gap-2 py-3 px-6 font-black shadow-2xl shadow-neutral/40 border-2 border-white/10 z-20 rounded-full flex items-center text-xs uppercase tracking-widest backdrop-blur-md">
            <CheckCircle2 size={16} strokeWidth={3} /> DÉJÀ DÉGUSTÉ
          </div>
        )}
      </div>

      {/* Main Content */}
      <div className="px-6 -mt-6 relative z-10">
        <div className="card bg-base-100 shadow-2xl border border-base-200 rounded-[3rem]">
          <div className="card-body p-8">
            <div className="flex justify-between items-start mb-6">
              <div className="flex-1 min-w-0">
                <h2 className="text-4xl font-black text-base-content leading-tight mb-2 tracking-tighter">{flan.name}</h2>
                <div className="flex items-center gap-2 text-primary font-black">
                  <Store size={18} strokeWidth={2.5} />
                  <span>{flan.bakery}</span>
                </div>
              </div>
              <div className="stat p-0 w-auto bg-primary/5 rounded-3xl border border-primary/10 px-4 py-2 flex flex-col items-center">
                <div className="text-3xl font-black text-primary leading-none mb-1">{flan.rating.toFixed(1)}</div>
                <div className="flex items-center gap-0.5">
                  {[1, 2, 3, 4, 5].map(i => {
                    const fillPercent = Math.max(0, Math.min(100, (flan.rating - i + 1) * 100));
                    return (
                      <div key={i} className="relative w-3 h-3">
                        <Star size={12} className="text-base-300 absolute inset-0" fill="currentColor" strokeWidth={1} />
                        <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                          <Star size={12} className="text-primary" fill="currentColor" strokeWidth={1} />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            <p className="text-base-content/70 font-medium leading-relaxed mb-8">
              {flan.description}
            </p>

            <div className="mb-10">
              <button 
                onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${flan.bakery} ${flan.postalCode} ${flan.city}`)}`, '_blank')}
                className="btn btn-block bg-base-200 text-neutral hover:bg-base-300 border-base-300 rounded-2xl h-14 flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[10px] shadow-sm transition-all active:scale-95"
              >
                <MapPin size={18} className="text-primary" />
                Ouvrir dans Google Maps
              </button>
            </div>

            <div className="space-y-4">
              {!isEaten && (
                <button 
                  onClick={handleToggleEaten}
                  className="btn btn-block h-16 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-300 btn-primary shadow-xl shadow-primary/20 hover:scale-105"
                >
                  J'ai goûté ce flan !
                </button>
              )}

              {isEaten && (
                <div className="mt-8 animate-in fade-in slide-in-from-bottom-6">
                  {isEditingReview ? (
                    <div className="bg-base-200/50 p-8 rounded-[2.5rem] border border-base-300">
                      <div className="flex justify-between items-center mb-6">
                        <h4 className="font-black text-primary text-xs uppercase tracking-widest">Votre Rapport d'Analyse</h4>
                      </div>
                      
                      <div className="flex flex-col items-center gap-6">
                        <div className="rating rating-lg rating-half gap-0">
                          <input type="radio" name="user-rating" className="rating-hidden" checked={userRating === 0} onChange={() => setUserRating(0)} />
                          {[0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((star) => (
                            <input 
                              key={star}
                              type="radio" 
                              name="user-rating" 
                              className={`bg-neutral mask mask-star-2 ${star % 1 !== 0 ? 'mask-half-1' : 'mask-half-2'} transition-transform hover:scale-125`}
                              checked={userRating === star}
                              onChange={() => setUserRating(star)}
                            />
                          ))}
                        </div>

                        <div className="w-full relative">
                          <MessageSquare className="absolute left-4 top-4 text-neutral/20" size={18} />
                          <textarea 
                            className="textarea textarea-bordered w-full rounded-2xl bg-base-100 pl-12 pt-4 font-bold text-sm focus:ring-2 focus:ring-primary/20 min-h-[120px]"
                            placeholder="Notes sur la texture, le goût, la croûte..."
                            value={reviewText}
                            onChange={(e) => setReviewText(e.target.value)}
                          />
                        </div>

                        <button 
                          onClick={() => {
                            handleUpdateReview(userRating, reviewText);
                            setIsEditingReview(false);
                          }}
                          className="btn btn-primary btn-block rounded-xl font-black uppercase text-[10px] tracking-widest flex items-center gap-2"
                        >
                          <Save size={14} />
                          Enregistrer l'analyse
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col mb-8">
                      <div className="flex justify-between items-start mb-4">
                        <h4 className="font-black text-neutral text-xs uppercase tracking-widest">Ma Note</h4>
                        <button onClick={() => setIsEditingReview(true)} className="btn btn-ghost btn-circle btn-sm text-neutral/40 hover:text-primary -mt-2 -mr-2">
                          <Pencil size={14} />
                        </button>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-6">
                         <div className="flex items-center gap-0.5">
                          {[1, 2, 3, 4, 5].map(i => {
                            const fillPercent = Math.max(0, Math.min(100, (userRating - i + 1) * 100));
                            return (
                              <div key={i} className="relative w-6 h-6">
                                <Star size={24} className="text-base-300 absolute inset-0" fill="currentColor" strokeWidth={1} />
                                <div className="absolute inset-0 overflow-hidden" style={{ width: `${fillPercent}%` }}>
                                  <Star size={24} className="text-primary" fill="currentColor" strokeWidth={1} />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                        <span className="text-2xl font-black text-primary ml-2">{userRating > 0 ? userRating.toFixed(1) : '-'}</span>
                      </div>
                      
                      {reviewText ? (
                        <p className="text-base font-medium text-neutral leading-relaxed">
                          {reviewText}
                        </p>
                      ) : (
                        <p className="text-xs font-bold text-neutral/30 uppercase tracking-widest">Aucun commentaire rédigé</p>
                      )}
                    </div>
                  )}
                  
                  <button 
                    onClick={handleToggleEaten}
                    className="btn btn-block h-16 rounded-2xl text-lg font-black uppercase tracking-widest transition-all duration-300 btn-ghost bg-base-200 text-base-content/40 border-base-300 mt-8"
                  >
                    Retirer de ma liste
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlanDetailsPage;
