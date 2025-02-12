import { configureStore } from "@reduxjs/toolkit";
import favoritesReducer from "./favoritesSlice.jsx";

export const store = configureStore({
    reducer: {
        favorites: favoritesReducer
    }
});
