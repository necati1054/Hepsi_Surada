import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import ProductServices from "../../Services/ProductServices";
import { toast } from "react-toastify";

export const AllProductt = createAsyncThunk("AllProductt", async() => {
    try {
        const response = await ProductServices.AllProduct();
        return response
    } catch (error) {
        console.log(error);
    }
});

export const AddProductt = createAsyncThunk("AddProduct", async(item,thunkAPI) => {
    try {
        const response = await ProductServices.AddProduct(item);
        toast.success("Sucess Add Product")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
});

export const UpdateProductt = createAsyncThunk("UpdateProduct", async(item,thunkAPI) => {
    try {
        const response = await ProductServices.UpdateProduct(item);
        toast.success("Sucess Update Product")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
});

export const DeleteProductt = createAsyncThunk("DeleteProduct", async(item,thunkAPI) => {
    try {
        const response = await ProductServices.DeleteProduct(item);
        toast.success("Sucess Remove Product")
        return response;
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
});

export const ProductImageUpdate = createAsyncThunk("ProductImageUpdate",async(item,thunkAPI) => {
    try {
        const response = await ProductServices.ProductImageUpdate(item)
        toast.success("Sucess Update Product Image")
        return response
    } catch (error) {
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
    }
})

const initialState = {
    product: [],
}

const ProductSlice = createSlice({
    name:"product",
    initialState,
    reducers:{},
    extraReducers: (builder) => {
        builder
        .addCase(AllProductt.fulfilled, (state, action) => {
            state.product = action.payload
        })
        .addCase(AddProductt.fulfilled, (state,action) => {
            if(action.payload){
                state.product = [...state.product,action.payload]
            }
        })
        .addCase(DeleteProductt.fulfilled, (state,action) => {
            if(action.payload){
                state.product = [...state.product.filter(pro => pro.id != action.payload.id)]
            }
        })
        .addCase(UpdateProductt.fulfilled, (state,action) => {
            if(action.payload){
                const incoming = action.payload
                const newPro = state.product.map((item) => {
                    if(item.id == incoming.id){
                        return incoming
                    }
                    else{
                        return item
                    }
                })
                state.product = [...newPro]
            }
        })
        .addCase(ProductImageUpdate.fulfilled,(state,action) => {
            if(action.payload){
                const incoming = action.payload
                const newPro = state.product.map((item) => {
                    if(item.id == incoming.id){
                        return incoming
                    }
                    else{
                        return item
                    }
                })
                state.product = [...newPro]
            }
        })
    }
})

export default ProductSlice.reducer;