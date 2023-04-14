import { configureStore } from '@reduxjs/toolkit';
import filterSlice from './slices/filterSlice';
import cart from './slices/cartSclice';
import pizza from './slices/pizzaSlice';

export const store = configureStore({
  reducer: {
    filterSlice,
    cart,
    pizza,
  },
});
