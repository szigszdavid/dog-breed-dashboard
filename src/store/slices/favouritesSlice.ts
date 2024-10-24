import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Breed {
  id: string;
  name: string;
  life_span: string;
  image: { url: string };
}

interface FavoritesState {
  favorites: Breed[];
}

const initialState: FavoritesState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Breed>) => {
      state.favorites.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
    removeFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(
        (breed) => breed.id !== action.payload
      );
      localStorage.setItem("favorites", JSON.stringify(state.favorites));
    },
  },
});

export const { addFavorite, removeFavorite } = favoritesSlice.actions;
export default favoritesSlice.reducer;
