import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: typeof window !== "undefined" && localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")).products : [],
        quantity: typeof window !== "undefined" && localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")).quantity : 0,
        total: typeof window !== "undefined" && localStorage.getItem("cartItems") ?
            JSON.parse(localStorage.getItem("cartItems")).total : 0,
    },
    reducers: {
        addProduct: (state, action) => {
            state.products.push(action.payload);
            state.quantity += action.payload.quantity;
            state.total += action.payload.price;
        },
        reset: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
            typeof window !== "undefined" && localStorage.getItem("cartItems") && localStorage.removeItem("cartItems");
        },
    }
})

export const { addProduct, reset } = cartSlice.actions;

export default cartSlice.reducer;