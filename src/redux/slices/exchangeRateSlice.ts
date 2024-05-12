import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {
  ExchangeRate,
  IExchangeRateSliceState,
  Status,
} from "../../data/declarations";
import { RootState } from "../store";

export const fetchExchangeRate = createAsyncThunk<number>(
  "exchangeRate/fetchExchangeRate",
  async () => {
    try {
      const response = await axios.get(
        "https://v6.exchangerate-api.com/v6/8600a0cad78d86c201457a51/latest/USD",
      );
      const RUB_USD_EXCHANGE_RATE = response.data.conversion_rates.RUB;
      return RUB_USD_EXCHANGE_RATE;
    } catch (error) {
      console.error("Error fetching exchange rate:", error);
    }
  },
);

const initialState: IExchangeRateSliceState = {
  value: 0,
  status: Status.LOADING, // "loading" | "success" | "error"
  error: undefined,
};

const exchangeRateSlice = createSlice({
  name: "exchangeRate",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExchangeRate.pending, (state) => {
        state.status = Status.LOADING;
      })
      .addCase(fetchExchangeRate.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.value = action.payload;
      })
      .addCase(fetchExchangeRate.rejected, (state, action) => {
        state.status = Status.ERROR;
        state.error = action.error.message;
      });
  },
});

export const selectExchangeRate = (state: RootState): ExchangeRate =>
  state.exchangeRate;
export default exchangeRateSlice.reducer;
