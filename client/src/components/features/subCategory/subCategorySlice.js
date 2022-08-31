import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import SubCategoryServices from "../../Services/SubCategoryServices"
import { toast } from "react-toastify";

export const AllSubCategory = createAsyncThunk("AllSubCategory", async() =>{
    try {
        const response = await SubCategoryServices.AllSubCategory()
        return response;
    } catch (error) {
        console.log(error);
    }
});

export const AddSubCategory = createAsyncThunk("AddSubCategory", async(item,thunkAPI) => {
    try {
        const response = await SubCategoryServices.AddSubCategory(item)
        toast.success("Sucess Add SubCategory")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
});

export const UpdateSubCategory = createAsyncThunk("UpdateSubCategory",async(item,thunkAPI) =>{
    try {
        const response = await SubCategoryServices.UpdateSubCategory(item)
        toast.success("Sucess Update SubCategory")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
});

export const DeleteSubCategory = createAsyncThunk("DeleteSubCategory", async(item,thunkAPI)=>{
    try {
        const response = await SubCategoryServices.DeleteSubCategory(item)
        toast.success("Sucess Remove SubCategory")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    subCategory: []
}

const subCategorySlice = createSlice({
    name:"subCategory",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(AllSubCategory.fulfilled,(state,action) => {
            if(action.payload){
                state.subCategory = action.payload
            }
        })
        .addCase(AddSubCategory.fulfilled,(state,action) =>{
            if(action.payload){
                state.subCategory = [...state.subCategory,action.payload]
            }
        })
        .addCase(AddSubCategory.rejected,(state,action) =>{

        })
        .addCase(DeleteSubCategory.fulfilled,(state,action) => {
            if(action.payload){
                state.subCategory = [...state.subCategory.filter(cate=>cate.id != action.payload.id)]
            }
        })
        .addCase(UpdateSubCategory.fulfilled,(state,action) => {
            if(action.payload){
                const incoming = action.payload;
                const newSubCate = state.subCategory.map((item)=>{
                    if(item.id == incoming.id){
                        return incoming
                    }
                    else{
                        return item
                    }
                })
                state.subCategory = [...newSubCate];
            }
        })
    }
})

export default subCategorySlice.reducer