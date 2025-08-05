import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
let initialState = {
    counter : 0,
    products:[],
    brands:[],
}

export let getBrands = createAsyncThunk(
    "product/getBrands",
    async function(){
      let {data} =   await axios.get("https://ecommerce.routemisr.com/api/v1/brands")
      return data;
    }
)

export let productSlice = createSlice({
    name : "product",
    initialState,
    reducers:{
        increament : (state)=>{
            state.counter ++;
        },
        decreament: (state)=>{
            state.counter--;
        },
        incByValue: (state , action)=>{
            state.counter+= action.payload; 
        }
    },
    extraReducers:(builder)=>{
        builder.addCase(getBrands.fulfilled, (state , action)=>{
            state.brands = action.payload.data
        }  )
    }
})

export let {increament , decreament , incByValue}=productSlice.actions;
export let productReducer = productSlice.reducer