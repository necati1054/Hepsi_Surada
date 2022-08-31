import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CategoryServices from "../../Services/CategoryServices";
import { toast } from "react-toastify";

export const AllCategory = createAsyncThunk("AllCategory", async() => {
    try {
        const response = await CategoryServices.AllCategory();
        return response;
    } catch (error) {
        console.log(error);
    }
})

export const AddCategory = createAsyncThunk("category/AddCategory", async(item,thunkAPI) => {
    try {
        const response = await CategoryServices.AddCategory(item);
        toast.success("Sucess Add Category")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const UpdateCategory = createAsyncThunk("category/UpdateCategory", async(item,thunkAPI) => {
    try {
        const response =  await CategoryServices.UpdateCategory(item);
        toast.success("Sucess Update Category")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

export const DeleteCategory = createAsyncThunk("category/DeleteCategory", async(item,thunkAPI) => {
    try {
        const response = await CategoryServices.DeleteCategory(item);
        toast.success("Sucess Remove Category")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    category: [],
}

const CategorySlice = createSlice({
    name:"category",
    initialState,
    reducers:{}, // api den veri gelmeyeceği zaman kullan
    extraReducers: (builder) => { //api den veri geleceği zaman 
        builder
        .addCase(AllCategory.fulfilled, (state, action) => { //olumlu
            state.category = action.payload
        })
        .addCase(AddCategory.rejected,(state,action) => {
            
        })
        .addCase(AddCategory.fulfilled,(state,action) => {
            state.category = [...state.category,action.payload]
        })
        .addCase(DeleteCategory.rejected,(state,action)=>{

        })
        .addCase(DeleteCategory.fulfilled,(state,action)=>{
            if(action.payload){
                state.category = [...state.category.filter(cate=>cate.id !== action.payload.id)]
            }
        })
        .addCase(UpdateCategory.rejected,(state,action)=>{

        })
        .addCase(UpdateCategory.fulfilled,(state,action)=>{
            if(action.payload){
                const incoming = action.payload
                const newCate = state.category.map((item)=>{
                    if(item.id === incoming.id){
                        return incoming
                    }
                    else{
                        return item
                    }
                })
                state.category = [...newCate]
            }
        })
    }
})

export default CategorySlice.reducer;