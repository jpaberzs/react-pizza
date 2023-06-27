import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type Sort = {
  sortName: string;
  sortValue: 'rating' | 'price' | 'title' | '-rating' | '-price' | '-title';
  sortProperty?: string;
};

interface FilterSliceState {
  searchValue: string;
  categoryId: number;
  currentPage: string;
  sort: Sort;
}

const initialState: FilterSliceState = {
  searchValue: '',
  categoryId: 0,
  currentPage: '1',
  sort: {
    sortName: 'популярности',
    sortValue: 'rating',
  },
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoryId: (state, action: PayloadAction<number>) => {
      state.categoryId = action.payload;
    },
    setSearchValue: (state, action: PayloadAction<string>) => {
      state.searchValue = action.payload;
    },
    setSortId: (state, action: PayloadAction<Sort>) => {
      state.sort = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = String(action.payload);
    },
    setFilters: (state, action: PayloadAction<FilterSliceState>) => {
      state.sort.sortProperty = action.payload.sort.sortProperty;
      state.categoryId = Number(action.payload.categoryId);
      state.currentPage = action.payload.currentPage;
    },
  },
});

export const { setCategoryId, setSortId, setPage, setFilters, setSearchValue } =
  filterSlice.actions;

export default filterSlice.reducer;
