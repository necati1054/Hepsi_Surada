import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import StoreServices from "../../Services/StoreServices";
import { toast } from "react-toastify";

export const AllStore = createAsyncThunk("AllStore", async() =>{
    try {
        const response = await StoreServices.AllStore()
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const AllStoreInfo = createAsyncThunk("AllStoreInfo", async(item)=> { 
    try {
        const response = await StoreServices.AllStoreInfo(item)
        return response;
    } catch (error) {
        console.log(error);
    }
})

export const StoreProductUpdate = createAsyncThunk("StoreProductUpdate", async(item,thunkAPI)=>{
    try {
        const response = await StoreServices.StoreProductUpdate(item)
        toast.success("Sucess Store Product Update")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const StoreProductDelete = createAsyncThunk("StoreProductDelete", async(item,thunkAPI)=>{
    try {
        const response = await StoreServices.StoreProductDelete(item)
        toast.success("Sucess Store Product Delete")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const StoreProductAdd = createAsyncThunk("StoreProductAdd", async(item,thunkAPI) => {
    try {
        const response = await StoreServices.StoreProductAdd(item)
        toast.success("Sucess Store Product Add")
        return response.data;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const StoreİnfoUpdate = createAsyncThunk("StoreİnfoUpdate", async(item,thunkAPI) => {
    try {
        const response = await StoreServices.StoreİnfoUpdate(item)
        toast.success("Sucess Store Info Update")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const StoreLogoUpdate = createAsyncThunk("StoreLogoUpdate", async(item,thunkAPI) => {
    try {
        const response = await StoreServices.StoreLogoUpdate(item)
        toast.success("Sucess Store Logo Update")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const StoreCoverUpdate = createAsyncThunk("StoreCoverUpdate", async(item,thunkAPI) =>{
    try {
        const response = await StoreServices.StoreCoverUpdate(item)
        toast.success("Sucess Store Cover Update")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    store: [],
    store_info: [],
    store_product:[],
    person:[]
}

const storeSlice = createSlice({
    name:"store",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(AllStore.fulfilled,(state,action) => {
            state.store = action.payload
        })
        .addCase(AllStoreInfo.fulfilled,(state,action) => {
                state.store_info = action.payload.store_info
                state.store_product = action.payload.store_product
                state.person = action.payload.person
        })
        .addCase(StoreProductUpdate.fulfilled,(state,action)=>{
                const incoming = action.payload
                const newStoreProduct = state.store_product.map((item) => {
                    if(item.id == incoming.id){
                        return incoming
                    }
                    else{
                        return item
                    }
                })
                state.store_product = [...newStoreProduct]
        })
        .addCase(StoreProductDelete.fulfilled,(state,action) => {
                state.store_product = [...state.store_product.filter((item) => item.id != action.payload.id)]
        })
        .addCase(StoreProductAdd.fulfilled,(state,action)=>{
                state.store_product = [...action.payload]
        })
        .addCase(StoreİnfoUpdate.fulfilled,(state,action) => {
                state.store_info = action.payload;
        })
        .addCase(StoreCoverUpdate.fulfilled,(state,action)=>{
                state.store_info = action.payload
        })
        .addCase(StoreLogoUpdate.fulfilled,(state,action) =>{

                state.store_info = action.payload
        })
    }
})

export default storeSlice.reducer