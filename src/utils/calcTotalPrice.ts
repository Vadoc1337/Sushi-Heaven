import { ICartItem } from "../data/declarations";
import {roundToFiveCents} from "./roundToFiveCents";

export const calcTotalPrice = (
    items: ICartItem[],
    isEnglish: boolean = false,
    exchangeRate: number = 1
) => {
    if (isEnglish) {
        // Calculate total price in dollars
        return items.reduce((sum, obj) => {
            const priceInDollars = +(roundToFiveCents(obj.price / exchangeRate).toFixed(2));
            return +(priceInDollars * obj.count + sum).toFixed(2);
        }, 0);
    } else {
        // Calculate total price in rubles
        return items.reduce((sum, obj) => obj.price * obj.count + sum, 0);
    }
};