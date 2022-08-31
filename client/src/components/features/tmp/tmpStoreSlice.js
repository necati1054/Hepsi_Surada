import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TmpStoreServices from "../../Services/TmpStoreServices"
import { AllStore } from "../store/storeSlice";
import { toast } from "react-toastify";

export const AllTmpStore = createAsyncThunk("AllTmpStore", async() => {
    try {
        const response = await TmpStoreServices.AllTmpStore()
        return response
    } catch (error) {
        console.log(error);
    }
});

export const AddTmpStore = createAsyncThunk("AddTmpStore", async(item,thunkAPI) => {
    try {
        const response = await TmpStoreServices.AddTmpStore(item)
        toast.success("application received")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const UpdateTmpStore = createAsyncThunk("UpdateTmpStore", async(item,thunkAPI) => {
    try {
        const response = await TmpStoreServices.UpdateTmpStore(item)
        toast.success("Sucess Add Store")
        AllStore()
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    tmpStore: []
}

const tmpStoreSlice = createSlice({
    name:"tmpStore",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(AllTmpStore.fulfilled,(state,action) => {
            state.tmpStore = action.payload
        })
        .addCase(AddTmpStore.fulfilled,(state,action) => {
            if(action.payload){
                state.tmpStore = [...state.tmpStore,action.payload]
            }
        })
        .addCase(UpdateTmpStore.fulfilled,(state,action) => {
            if(action.payload){
                state.tmpStore = [...state.tmpStore.filter((tmp)=>tmp.id != action.payload.id)]
            }
        })
    }
})

export default tmpStoreSlice.reducer;