<p align="center">
  <img src="public/flandex_banner.jpg" alt="Flandex Banner" width="100%" style="border-radius: 12px; box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);" />
</p>

<h1 align="center">🍮 FLANDEX</h1>

<p align="center">
  <strong>The ultimate Pokédex for flan lovers in Île-de-France.</strong>
</p>

<p align="center">
  <a href="https://flandex.vercel.app" target="_blank" rel="noopener noreferrer">
    <img src="https://img.shields.io/badge/Live_Demo-flandex.vercel.app-FF9800?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" />
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-6.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-38BDF8?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="TailwindCSS" />
  <img src="https://img.shields.io/badge/Leaflet-1.9-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet" />
</p>

---

## 📖 About

**Flandex** is an interactive, mobile-first web application halfway between a culinary guide and a Pokédex. It allows you to locate, index, and rate the best flans (custard tarts) in Paris and the Île-de-France region (from award-winning bakeries to luxury palaces) through a sweet and intuitive interface.

> [!IMPORTANT]
> **🚀 Try the live application:**
> Access the online version at <a href="https://flandex.vercel.app" target="_blank" rel="noopener noreferrer"><strong>flandex.vercel.app</strong></a>.
>
> *(Note: The application uses LocalStorage to store your tastings locally and completely privately).*

> [!TIP]
> **Why is this project in my portfolio?**
> It showcases my mastery of modern single-page applications (SPA), interactive mapping (Leaflet), and user experience/user interface (UX/UI) optimization.

---

## ✨ Key Features

* 🗺️ **Interactive Map (Leaflet):** Locate flan spots around you. Markers display the flan rating and change color (gold/chocolate) once they have been tasted.
* 📱 **The "Flandex":** Track your culinary capture progress with a global counter (e.g., `5/50`) and dynamic search.
* 🏆 **Rankings (Elite vs. Personal):** Compare the community's official ranking with your own custom hierarchy automatically generated based on your ratings.
* 📝 **Tasting Record:** Log your tastings (star ratings, personal reviews, favorites, and tasting date).
* 📊 **Profile & Backups:** View your global statistics and export/import your tasting data in JSON format.

---

## 🛠️ Tech Stack

* **React 19 & TypeScript:** Fluid state management and robust typing.
* **React Router v7:** Fast navigation without page reloads.
* **Tailwind CSS v4 & DaisyUI v5:** Custom design system with a tailored theme (`flantheme`).
* **Leaflet & CartoDB:** Lightweight and high-performance interactive mapping.
* **LocalStorage API:** 100% local, privacy-respecting serverless solution (no database required).

---

## 🧠 Technical Highlights

### 1. Non-linear slider filtering (UX)
To avoid a mostly empty slider for ratings (since almost all flans are rated between `4.0` and `5.0`), I remapped the slider's sensitivity: the first half covers `0.0` to `4.0`, while the second half covers `4.0` to `4.9`.

```typescript
// Non-linear remapping in MapPage.tsx
const rawRating = sliderValue <= 50 
  ? (sliderValue / 50) * 4.0 
  : 4.0 + ((sliderValue - 50) / 50) * 0.9;

const minRating = parseFloat(rawRating.toFixed(1));
```

### 2. Leaflet Integration with Tailwind CSS
To maintain the Tailwind design styling alongside the Leaflet library, the map markers are generated via custom HTML templates dynamically injected into the map DOM.

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

## 🚀 Installation & Setup

```bash
# 1. Clone the project
git clone https://github.com/YOUR_USERNAME/flandex.git
cd flandex

# 2. Install dependencies
npm install

# 3. Run in development mode
npm run dev

# 4. Build for production
npm run build
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](file:///mnt/c/Users/BaptisteKelagopian/Desktop/code/Flan/flandex/LICENSE) file for details.
