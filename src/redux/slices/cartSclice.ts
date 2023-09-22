import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { getCartFromLS } from '../../utils/getCartFromLS';
import { calcTotalPrice } from '../../utils/calcTotalPrice';

export type CartItem = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  type: string;
  size: number;
  count: number;
};

interface CartSliceState {
  totalPrice: number;
  products: CartItem[];
}

const cartData = getCartFromLS();

const initialState: CartSliceState = {
  totalPrice: cartData.totalPrice,
  products: cartData.items,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<CartItem>) => {
      // eslint-disable-next-line
      let findObject = state.products.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        ) {
          return obj;
        }
      });

      if (findObject) {
        findObject.count++;
      } else {
        state.products.push({
          ...action.payload,

          count: 1,
        });
      }
      state.totalPrice = calcTotalPrice(state.products);
    },
    minusItem: (state, action: PayloadAction<CartItem>) => {
      // eslint-disable-next-line
      let findObject = state.products.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        ) {
          return true;
        }
      });

      if (findObject) {
        if (findObject.count > 1) {
          findObject.count--;
        } else {
          return;
        }
      }
      state.totalPrice = state.products.reduce((sum, obj) => sum + obj.count * obj.price, 0);
    },
    removeProduct: (state, action: PayloadAction<CartItem>) => {
      // eslint-disable-next-line
      let findObject = state.products.find((obj) => {
        if (
          obj.id === action.payload.id &&
          obj.type === action.payload.type &&
          obj.size === action.payload.size
        ) {
          return obj;
        }
      });
      state.products = state.products.filter((obj) => obj !== findObject);
      state.totalPrice = state.products.reduce((sum, obj) => sum + obj.count * obj.price, 0);
    },
    clearProduct: (state) => {
      state.products = [];
      state.totalPrice = 0;
    },
  },
});

export const { addProduct, removeProduct, clearProduct, minusItem } = cartSlice.actions;

export default cartSlice.reducer;
