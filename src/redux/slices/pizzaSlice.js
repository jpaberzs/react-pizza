import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  items: [],
  status: 'loading', // loading, success, error
};

export const fetchpizzas = createAsyncThunk(
  'pizza/fetcPizzasStatus',
  async ({ currentPage, category, sortBy, order, search }) => {
    const { data } = await axios.get(
      `https://6429c41100dfa3b54739d18f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    );
    return data;
  },
);

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    setItems: (state, action) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchpizzas.pending, (state) => {
      state.status = 'loading';
      state.items = [];
    });
    builder.addCase(fetchpizzas.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = 'success';
    });
    builder.addCase(fetchpizzas.rejected, (state) => {
      state.items = [];
      state.status = 'error';
    });
  },
});

export const { setItems } = pizzaSlice.actions;

export default pizzaSlice.reducer;
