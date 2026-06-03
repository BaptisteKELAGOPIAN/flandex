import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { MOCK_FLANS } from '../data/mockFlans';
import L from 'leaflet';
import { useNavigate } from 'react-router-dom';
import { Star, Locate, MapPin, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { getStoredUserData, getStoredFilters, saveStoredFilters } from '../services/storage';

const MapPage: React.FC = () => {
  const navigate = useNavigate();
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [eatenIds, setEatenIds] = useState<string[]>([]);
  
  // Filters State
  const [showFilters, setShowFilters] = useState(false);
  const [sliderValue, setSliderValue] = useState<number>(() => getStoredFilters().sliderValue);
  const [statusFilter, setStatusFilter] = useState<'all' | 'eaten' | 'uneaten'>(() => getStoredFilters().statusFilter);

  // Non-linear mapping for the rating slider so 50% visually = 4.0
  const rawRating = sliderValue <= 50 
    ? (sliderValue / 50) * 4.0 
    : 4.0 + ((sliderValue - 50) / 50) * 0.9;
  const minRating = parseFloat(rawRating.toFixed(1));

  const center: [number, number] = [48.8566, 2.3522]; // Paris center

  useEffect(() => {
    const userData = getStoredUserData();
    setEatenIds(userData.filter(f => f.isEaten).map(f => f.flanId));
  }, []);

  // Sync filters to storage whenever they change
  useEffect(() => {
    saveStoredFilters({ sliderValue, statusFilter });
  }, [sliderValue, statusFilter]);

  const createRatingIcon = (rating: number, isEaten: boolean) => {
    const bgColor = isEaten ? 'bg-neutral' : 'bg-primary';
    const ringColor = isEaten ? 'ring-neutral/20' : 'ring-primary/20';
    
    return L.divIcon({
      html: `<div class="relative flex items-center justify-center ${bgColor} text-white font-black text-[10px] rounded-full w-8 h-8 shadow-lg border-2 border-white ring-2 ${ringColor} transition-all hover:scale-110">
               ${rating}
               ${isEaten ? '<div class="absolute -top-1 -right-1 bg-white text-neutral rounded-full w-3 h-3 flex items-center justify-center"><svg width="8" height="8" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg></div>' : ''}
             </div>`,
      className: '',
      iconSize: [32, 32],
      iconAnchor: [16, 16],
      popupAnchor: [0, -16],
    });
  };

  const userIcon = L.divIcon({
    html: `<div class="relative">
             <div class="absolute -inset-2 bg-blue-500/20 rounded-full animate-ping"></div>
             <div class="relative bg-blue-500 w-4 h-4 rounded-full border-2 border-white shadow-lg"></div>
           </div>`,
    className: '',
    iconSize: [16, 16],
    iconAnchor: [8, 8],
  });

  const handleLocate = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([latitude, longitude]);
        },
        (error) => {
          console.error("Error detecting location", error);
          alert("Impossible de détecter votre position. Vérifiez vos permissions.");
        }
      );
    }
  };

  // Apply filters
  const filteredFlans = MOCK_FLANS.filter(flan => {
    if (flan.rating < minRating) return false;
    
    const isEaten = eatenIds.includes(flan.id);
    if (statusFilter === 'eaten' && !isEaten) return false;
    if (statusFilter === 'uneaten' && isEaten) return false;
    
    return true;
  });

  return (
    <div className="h-full w-full bg-base-100 relative z-0">
      
      {/* Filters Panel (Top Left) */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-2">
        <button 
          onClick={() => setShowFilters(!showFilters)}
          className={`btn btn-circle shadow-xl border-none transition-all active:scale-90 relative ${showFilters ? 'bg-primary text-white' : 'bg-white text-neutral hover:bg-base-200'}`}
        >
          <SlidersHorizontal size={20} />
          {((sliderValue > 0 ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)) > 0 && (
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-neutral text-white text-[9px] font-black rounded-full flex items-center justify-center shadow-md border border-white">
              {(sliderValue > 0 ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)}
            </span>
          )}
        </button>

        {showFilters && (
          <div className="bg-white p-4 rounded-2xl shadow-2xl border border-base-200 w-64 animate-in fade-in slide-in-from-top-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xs font-black uppercase tracking-widest text-neutral/40">Filtres de la carte</h3>
              {((sliderValue > 0 ? 1 : 0) + (statusFilter !== 'all' ? 1 : 0)) > 0 && (
                <button 
                  onClick={() => { setSliderValue(0); setStatusFilter('all'); }}
                  className="text-[9px] font-black uppercase tracking-widest text-error/60 hover:text-error transition-colors"
                >
                  Réinitialiser
                </button>
              )}
            </div>
            
            {/* Rating Filter with Non-Linear Math */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[10px] font-bold uppercase text-neutral">Note minimum</span>
                <span className="text-xs font-black text-primary flex items-center gap-1"><Star size={10} className="fill-current"/> {sliderValue > 0 ? minRating.toFixed(1) : 'Toutes'}</span>
              </div>
              <input 
                type="range" 
                min="0" 
                max="100" 
                step="1" 
                value={sliderValue} 
                onChange={(e) => setSliderValue(parseInt(e.target.value))} 
                className="w-full py-2 cursor-pointer accent-primary" 
              />
              <div className="w-full flex justify-between text-[8px] font-bold text-neutral/30 px-1">
                <span>0</span>
                <span>4.0</span>
                <span>4.9</span>
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <span className="text-[10px] font-bold uppercase text-neutral block mb-2">Statut de dégustation</span>
              <div className="flex flex-col gap-1">
                <FilterButton active={statusFilter === 'all'} onClick={() => setStatusFilter('all')} label="Tous les flans" />
                <FilterButton active={statusFilter === 'uneaten'} onClick={() => setStatusFilter('uneaten')} label="À découvrir (Non goûtés)" />
                <FilterButton active={statusFilter === 'eaten'} onClick={() => setStatusFilter('eaten')} label="Déjà goûtés" icon={<CheckCircle2 size={12} />} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Buttons (Top Right) */}
      <div className="absolute top-6 right-6 z-[1000] flex flex-col gap-3">
        <button 
          onClick={handleLocate}
          className="btn btn-circle bg-white shadow-xl border-none hover:bg-base-200 text-primary transition-all active:scale-90"
        >
          <Locate size={22} />
        </button>
      </div>

      <MapContainer 
        center={center} 
        zoom={13} 
        className="h-full w-full z-0"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; CARTO'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
        
        <MapEventsHandler onInteract={() => setShowFilters(false)} />

        {userLocation && (
          <Marker position={userLocation} icon={userIcon} />
        )}

        {filteredFlans.map((flan) => {
          const isEaten = eatenIds.includes(flan.id);
          return (
            <Marker 
              key={flan.id} 
              position={[flan.lat, flan.lng]} 
              icon={createRatingIcon(flan.rating, isEaten)}
            >
              <Popup className="google-style-popup">
                <div className="w-64 -m-1 overflow-hidden">
                  <div className={`h-20 flex items-center justify-center text-4xl relative ${isEaten ? 'bg-neutral/10' : 'bg-primary/10'}`}>
                     🍮
                     {isEaten && <div className="absolute top-2 right-2 bg-neutral text-white text-[8px] font-black uppercase px-2 py-1 rounded-full flex items-center gap-1"><CheckCircle2 size={10}/> Goûté</div>}
                  </div>
                  
                  <div className="p-4 bg-white">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-base font-black text-neutral leading-tight flex-1 pr-2">{flan.bakery}</h3>
                      <div className="flex flex-col items-end gap-0.5">
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-lg text-xs font-black ${isEaten ? 'bg-neutral/10 text-neutral' : 'bg-primary/10 text-primary'}`}>
                          <Star size={12} className="fill-current" /> {flan.rating.toFixed(1)}
                        </div>
                      </div>
                    </div>

                    <p className="text-[11px] font-bold text-neutral/40 uppercase mb-1 flex items-center gap-1">
                      <MapPin size={10} /> {flan.name}
                    </p>
                    
                    <p className="text-[10px] text-neutral/60 leading-tight mb-4 line-clamp-2">
                      {flan.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      <button 
                        onClick={() => navigate(`/flan/${flan.id}`)}
                        className={`btn btn-sm rounded-xl font-black text-[10px] uppercase shadow-lg ${isEaten ? 'btn-neutral shadow-neutral/20' : 'btn-primary shadow-primary/20'}`}
                      >
                        Détails
                      </button>
                      <button 
                        onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${flan.bakery} ${flan.postalCode} ${flan.city}`)}`, '_blank')}
                        className="btn btn-ghost btn-sm bg-base-200 rounded-xl font-black text-[9px] uppercase text-neutral/50 hover:text-neutral"
                      >
                        Google Maps
                      </button>
                    </div>
                  </div>
                </div>
              </Popup>
            </Marker>
          );
        })}
        
        {userLocation && <MapUpdater position={userLocation} />}
      </MapContainer>
    </div>
  );
};

// Custom Filter Button Component
const FilterButton = ({ active, onClick, label, icon }: { active: boolean, onClick: () => void, label: string, icon?: React.ReactNode }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all text-left ${active ? 'bg-neutral text-white' : 'bg-base-200 text-neutral/50 hover:bg-base-300'}`}
  >
    {icon} {label}
  </button>
);

const MapEventsHandler = ({ onInteract }: { onInteract: () => void }) => {
  useMapEvents({
    click: onInteract,
    dragstart: onInteract,
  });
  return null;
};

const MapUpdater = ({ position }: { position: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(position, 15, { duration: 1.5 });
  }, [position, map]);
  return null;
};

export default MapPage;
