import { create } from "zustand";
import { persist } from 'zustand/middleware';

interface FavoritesState {
    favorites: number[];
    toggleFavorite: (id: number) => void;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
    persist(
        (set, get) => ({
            favorites: [],
            toggleFavorite: (id: number) => {
                const favorites = get().favorites;
                set({
                    favorites: favorites.includes(id)
                        ? favorites.filter(fav => fav !== id)
                        : [...favorites, id]
                });
            },
            isFavorite: (id: number) => get().favorites.includes(id)
        }),
        {
            name: 'favorites',
        }
    )
);
