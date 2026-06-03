import type { UserFlan } from '../types';

const STORAGE_KEY = 'flandex_user_data';

export const getStoredUserData = (): UserFlan[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUserFlan = (userFlan: UserFlan) => {
  const currentData = getStoredUserData();
  const index = currentData.findIndex(f => f.flanId === userFlan.flanId);
  
  if (index >= 0) {
    currentData[index] = { ...currentData[index], ...userFlan };
  } else {
    currentData.push(userFlan);
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(currentData));
};

export const removeUserFlan = (flanId: string) => {
  const currentData = getStoredUserData();
  const newData = currentData.filter(f => f.flanId !== flanId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(newData));
};

export const isFlanEaten = (flanId: string): boolean => {
  const currentData = getStoredUserData();
  return currentData.some(f => f.flanId === flanId && f.isEaten);
};

export const getUserFlan = (flanId: string): UserFlan | undefined => {
  const currentData = getStoredUserData();
  return currentData.find(f => f.flanId === flanId);
};

export const setStoredUserData = (data: UserFlan[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
};

// --- Filters Persistence ---
const FILTERS_KEY = 'flandex_map_filters';

export interface MapFilters {
  sliderValue: number;
  statusFilter: 'all' | 'eaten' | 'uneaten';
}

export const getStoredFilters = (): MapFilters => {
  const data = localStorage.getItem(FILTERS_KEY);
  return data ? JSON.parse(data) : { sliderValue: 0, statusFilter: 'all' };
};

export const saveStoredFilters = (filters: MapFilters) => {
  localStorage.setItem(FILTERS_KEY, JSON.stringify(filters));
};
