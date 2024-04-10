import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IFilterSliceState, IList } from "../../data/declarations";

const initialState: IFilterSliceState = {
  searchValue: "",
  categoryId: 1,
  currentPage: 1,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  orderType: {
    name: "asc",
  },
  isSearch: false,
};

const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setIsSearch(state, action: PayloadAction<boolean>) {
      state.isSearch = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<IList>) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setOrderType(state, action: PayloadAction<IList>) {
      state.orderType = action.payload;
    },
    setFilters(state, action: PayloadAction<IFilterSliceState>) {
      state.categoryId = action.payload.categoryId;
      state.currentPage = action.payload.currentPage;
      state.sort = action.payload.sort;
      state.orderType = action.payload.orderType;
    },
  },
});

export const selectFilter = (state: RootState) => state.filter;
export const selectSort = (state: RootState) => state.filter.sort;

export const {
  setCategoryId,
  setSort,
  setCurrentPage,
  setOrderType,
  setFilters,
  setSearchValue,
  setIsSearch,
} = filterSlice.actions;

export default filterSlice.reducer;
