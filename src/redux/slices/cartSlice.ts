import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ICartItem, ICartSliceState} from "../../data/declarations";
import {RootState} from "../store";
import {getCartFromLS} from "../../utils/getCartFromLS";
import {calcTotalPrice} from "../../utils/calcTotalPrice";

const {items, totalPrice} = getCartFromLS();

const initialState:ICartSliceState = {
    totalPrice,
    items
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        addItem(state, action:PayloadAction<ICartItem>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload.id);
            findItem ? findItem.count++ : state.items.push({...action.payload, count: 1});
            state.totalPrice = calcTotalPrice(state.items)
        },
        minusItem(state, action:PayloadAction<string>) {
            const findItem = state.items.find(
                (obj) => obj.id === action.payload
            );
            if (findItem) {
                findItem.count--;
                state.totalPrice -= findItem.price;
            }
            if (findItem!.count === 0) {
                state.items = state.items.filter((item) => item.count != 0);
            }
        },
        removeItem(state, action:PayloadAction<string>) {
            state.items=state.items.filter((obj) => obj.id !== action.payload);
            state.totalPrice = calcTotalPrice(state.items);
        },
        clearItems(state) {
            state.items = [];
            state.totalPrice = 0;
        }
    },
});

export const selectCart = (state:RootState) => state.cart;
export const selectCartItemById = (id:string)=>(state:RootState) =>
    state.cart.items.find((obj) => obj.id === id)

export const {addItem, removeItem, clearItems,minusItem} = cartSlice.actions;

export default cartSlice.reducer;
