import { configureStore } from "@reduxjs/toolkit";
import { productReducer } from "./productSlice";


export let store = configureStore({
    reducer: {
        productRed: productReducer
    },
})