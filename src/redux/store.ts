import { useDispatch } from 'react-redux';
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

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
