import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import HomeServices from "../../Services/HomeServices";

export const AllData = createAsyncThunk("AllData", async() => {
    try {
        const response = HomeServices.AllData();
        return response
    } catch (error) {
        console.log(error);
    }
})

const initialState= {
    home:[]
}

const HomeSlice = createSlice({
    name:"home",
    initialState,
    extraReducers: (builder) =>{
        builder
        .addCase(AllData.fulfilled,(state,action)=>{
            state.home = action.payload
        })
    }
})

export default HomeSlice.reducer;