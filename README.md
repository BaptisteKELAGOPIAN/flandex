<p align="center">
  <img src="public/flandex_banner.jpg" alt="Flandex Banner" width="100%" style="border-radius: 12px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);" />
</p>

<h1 align="center">🍮 FLANDEX</h1>

<p align="center">
  <strong>Le Pokédex ultime pour les amateurs de flan en Île-de-France.</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
</p>

---

## 📖 À propos

**Flandex** est une application web mobile-first interactive à mi-chemin entre guide gastronomique et Pokédex. Elle permet de localiser, répertorier et noter les meilleurs flans de Paris et d'Île-de-France (des boulangeries récompensées aux palaces) grâce à une interface gourmande et intuitive.

> [!TIP]
> **Pourquoi ce projet sur mon portfolio ?**
> Il démontre ma maîtrise des applications monopages (SPA) modernes, de la cartographie interactive (Leaflet) et de l'optimisation de l'expérience utilisateur (UX/UI).

---

## ✨ Fonctionnalités Clés

* 🗺️ **Carte Interactive (Leaflet) :** Localisez les spécimens autour de vous. Les marqueurs affichent la note du flan et changent de couleur (doré/chocolat) une fois goûtés.
* 📱 **Le "Flandex" :** Suivez votre progression de capture gastronomique avec un compteur global (ex: `5/50`) et une recherche dynamique.
* 🏆 **Classements (Élite vs Personnel) :** Comparez le classement officiel de la communauté avec votre propre hiérarchie générée automatiquement selon vos notes.
* 📝 **Fiche Dégustation :** Enregistrez vos sessions de test (notation par étoiles, critiques personnelles, favoris et date de dégustation).
* 📊 **Profil & Sauvegardes :** Visualisez vos statistiques globales et exportez/importez vos données de dégustation en JSON.

---

## 🛠️ Stack Technique

* **React 19 & TypeScript :** Gestion d'état fluide et robustesse de typage.
* **React Router v7 :** Navigation rapide et sans rechargement.
* **Tailwind CSS v4 & DaisyUI v5 :** Design system sur-mesure avec un thème personnalisé (`flantheme`).
* **Leaflet & CartoDB :** Cartographie interactive légère et performante.
* **LocalStorage API :** Solution serverless 100% locale respectant la vie privée (aucune base de données requise).

---

## 🧠 Focus Technique

### 1. Filtrage non-linéaire sur slider (UX)
Pour éviter un slider vide sur les notes (les flans étant quasi tous notés entre `4.0` et `5.0`), j'ai remappé la sensibilité du slider : la première moitié couvre `0.0` à `4.0`, la seconde de `4.0` à `4.9`.

```typescript
// Remappage non-linéaire dans MapPage.tsx
const rawRating = sliderValue <= 50 
  ? (sliderValue / 50) * 4.0 
  : 4.0 + ((sliderValue - 50) / 50) * 0.9;

const minRating = parseFloat(rawRating.toFixed(1));
```

### 2. Intégration Leaflet avec Tailwind CSS
Pour conserver le design Tailwind avec la bibliothèque Leaflet, les marqueurs de carte sont générés via des templates HTML personnalisés injectés dynamiquement dans le DOM de la carte.

```typescript
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
```

---

## 🚀 Installation & Lancement

```bash
# 1. Cloner le projet
git clone https://github.com/VOTRE_PSEUDO/flandex.git
cd flandex

# 2. Installer les dépendances
npm install

# 3. Lancer en mode dev
npm run dev

# 4. Build pour la production
npm run build
```

---

## 📄 Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](file:///mnt/c/Users/BaptisteKelagopian/Desktop/code/Flan/flandex/LICENSE) pour plus de détails.


