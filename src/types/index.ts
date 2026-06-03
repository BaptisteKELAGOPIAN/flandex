export interface FlanLocation {
  id: string;
  name: string;
  bakery: string;
  description: string;
  lat: number;
  lng: number;
  rating: number;
  imageUrl?: string;
  postalCode?: string;
  city?: string;
}

export interface UserFlan {
  flanId: string;
  isEaten: boolean;
  isFavorite?: boolean;
  userRating?: number;
  reviewText?: string;
  eatenAt?: string;
}
