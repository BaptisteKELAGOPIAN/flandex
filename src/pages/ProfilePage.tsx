import React, { useState, useEffect, useRef } from 'react';
import { Heart, Clock, ChevronRight, User, Download, Upload } from 'lucide-react';
import { MOCK_FLANS } from '../data/mockFlans';
import { getStoredUserData, setStoredUserData } from '../services/storage';
import { useNavigate } from 'react-router-dom';

const ProfilePage: React.FC = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [favorites, setFavorites] = useState<any[]>([]);
  const [history, setHistory] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, avg: 0 });

  useEffect(() => {
    const userData = getStoredUserData();
    
    // Favorites
    const favs = MOCK_FLANS.filter(f => userData.some(u => u.flanId === f.id && u.isFavorite));
    setFavorites(favs);

    // History (last 3 eaten)
    const eaten = userData
      .filter(u => u.isEaten)
      .sort((a, b) => new Date(b.eatenAt || 0).getTime() - new Date(a.eatenAt || 0).getTime())
      .slice(0, 3)
      .map(u => ({
        ...MOCK_FLANS.find(f => f.id === u.flanId),
        date: u.eatenAt
      }));
    setHistory(eaten);

    // Stats
    const allEaten = userData.filter(u => u.isEaten);
    const avg = allEaten.length > 0 
      ? allEaten.reduce((acc, curr) => acc + (curr.userRating || 0), 0) / allEaten.length 
      : 0;
    
    setStats({
      total: allEaten.length,
      avg: parseFloat(avg.toFixed(1))
    });
  }, []);

  const handleExport = () => {
    const data = getStoredUserData();
    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `flandex_backup_${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const content = e.target?.result as string;
        const parsedData = JSON.parse(content);
        if (Array.isArray(parsedData)) {
          setStoredUserData(parsedData);
          alert("Données importées avec succès !");
          window.location.reload();
        } else {
          alert("Format de fichier invalide. Veuillez sélectionner un backup Flandex.");
        }
      } catch (err) {
        alert("Erreur lors de l'importation. Le fichier est corrompu.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="flex flex-col h-full bg-base-100 overflow-y-auto pb-32">
      {/* Sober Header */}
      <div className="px-8 pt-16 pb-10 flex items-center gap-6">
        <div className="w-20 h-20 rounded-full bg-base-200 flex items-center justify-center text-neutral/20 border-2 border-base-300">
          <User size={40} />
        </div>
        <div>
          <h2 className="text-3xl font-black text-neutral tracking-tight">Mon Profil</h2>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral/40">{stats.total} Flans goûtés</span>
            <div className="w-1 h-1 bg-neutral/20 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-neutral/40">{stats.avg} Note moyenne</span>
          </div>
        </div>
      </div>

      {/* Favorites Section */}
      <div className="px-8 mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Heart size={18} className="text-error" fill="currentColor" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral/40">Mes Coups de Cœur</h3>
        </div>
        
        {favorites.length > 0 ? (
          <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
            {favorites.map(flan => (
              <div 
                key={flan.id} 
                onClick={() => navigate(`/flan/${flan.id}`)}
                className="flex-shrink-0 w-40 bg-base-200 rounded-[2rem] p-4 border border-base-300 cursor-pointer active:scale-95 transition-transform"
              >
                <div className="w-full aspect-square bg-white rounded-2xl flex items-center justify-center text-3xl mb-3 shadow-inner">
                  🍮
                </div>
                <h4 className="font-black text-xs truncate uppercase tracking-tight">{flan.name}</h4>
                <p className="text-[9px] font-bold text-neutral/40 truncate uppercase">{flan.bakery}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-base-200/50 rounded-3xl p-8 text-center border border-dashed border-base-300">
            <p className="text-[10px] font-bold text-neutral/30 uppercase">Aucun favori enregistré</p>
          </div>
        )}
      </div>

      {/* History Section */}
      <div className="px-8 mb-10">
        <div className="flex items-center gap-2 mb-6">
          <Clock size={18} className="text-primary" />
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-neutral/40">Dernières Dégustations</h3>
        </div>

        <div className="space-y-3">
          {history.length > 0 ? (
            history.map(flan => (
              <div 
                key={flan.id} 
                onClick={() => navigate(`/flan/${flan.id}`)}
                className="flex items-center justify-between p-4 bg-base-100 border border-base-200 rounded-2xl cursor-pointer hover:bg-base-200 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-base-200 rounded-xl flex items-center justify-center text-lg">🍮</div>
                  <div className="min-w-0">
                    <h4 className="text-xs font-black uppercase tracking-tight truncate">{flan.bakery}</h4>
                    <p className="text-[9px] font-bold text-neutral/30 uppercase truncate">{flan.name}</p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-neutral/20" />
              </div>
            ))
          ) : (
            <div className="text-center py-4 opacity-20">
              <p className="text-[10px] font-bold uppercase">Historique vide</p>
            </div>
          )}
        </div>
      </div>

      {/* Settings / Actions */}
      <div className="px-6 mt-auto">
        <div className="divider opacity-10"></div>
        <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral/40 mb-3">Sauvegarde locale</h3>
        <div className="flex flex-col gap-2">
          <button onClick={handleExport} className="flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-2xl transition-colors text-neutral">
            <div className="flex items-center gap-4">
              <Download size={18} />
              <span className="text-xs font-black uppercase tracking-tight">Exporter mes données (.txt)</span>
            </div>
          </button>

          <button onClick={() => fileInputRef.current?.click()} className="flex items-center justify-between p-4 bg-base-200 hover:bg-base-300 rounded-2xl transition-colors text-neutral">
            <div className="flex items-center gap-4">
              <Upload size={18} />
              <span className="text-xs font-black uppercase tracking-tight">Importer des données</span>
            </div>
          </button>
          <input type="file" accept=".txt,.json" className="hidden" ref={fileInputRef} onChange={handleImport} />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
