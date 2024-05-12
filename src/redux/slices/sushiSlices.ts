import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../store";
import {
  IFetchSushiArgs,
  ISushi,
  ISushiSliceState,
  Status,
} from "../../data/declarations";

import ruLanguageIcon from "../../assets/img/ru-language-icon.svg";
import enLanguageIcon from "../../assets/img/en-language-icon.svg";


export const fetchSushi = createAsyncThunk<ISushi[], IFetchSushiArgs>(
  "sushi/fetchSushiStatus",
  async (params, { rejectWithValue }) => {
    try {
      const { url,currentPage, category, sort, orderType, search } = params;
      let limit = 4;
      let page: number | string = currentPage;

      if (search) {
        limit = 100;
      }
      if (+category === 0) {
        page = "";
      }

      const { data } = await axios.get<ISushi[]>(
        `${url}?page=${page}&limit=${limit}&${category}&sortBy=${sort.sortProperty}&order=${orderType.name}${search}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue("Error occurred");
    }
  },
);

const initialState: ISushiSliceState = {
  items: [],
  status: Status.LOADING, // "loading" | "success" | "error"
  isClicked: true,
  languageIcon: ruLanguageIcon,
};


const sushiSlice = createSlice({
  name: "sushi",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
    toggleClick(state) {
      state.isClicked = !state.isClicked;
      state.languageIcon = state.isClicked ? ruLanguageIcon : enLanguageIcon;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchSushi.pending, (state) => {
      state.status = Status.LOADING;
      state.items = [];
    });
    builder.addCase(fetchSushi.fulfilled, (state, action) => {
      state.items = action.payload;
      state.status = Status.SUCCESS;
    });
    builder.addCase(fetchSushi.rejected, (state, action) => {
      if (action.payload === `Error occurred`) {
        state.status = Status.ERROR;
      }
      state.status = Status.ERROR;
      state.items = [];
    });
  },
});

export const selectSushiData = (state: RootState) => state.sushi;
export const { setItems,toggleClick } = sushiSlice.actions;

export default sushiSlice.reducer;
