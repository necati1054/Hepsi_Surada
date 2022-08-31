import { configureStore } from "@reduxjs/toolkit"
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import subCategoryReducer from "../features/subCategory/subCategorySlice";
import ProductReducer from "../features/product/ProductSlice";
import tmpStoreReducer from "../features/tmp/tmpStoreSlice";
import storeReducer from "../features/store/storeSlice";
import HomeReducer from "../features/Home/HomeSlice";

export const store = configureStore({
    reducer:{
        home:HomeReducer,
        auth: authReducer,
        category: categoryReducer,
        subCategory: subCategoryReducer,
        product: ProductReducer,
        tmpStore:tmpStoreReducer,
        store:storeReducer,
    },
});
