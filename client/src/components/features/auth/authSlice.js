import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AuthServices from "../../Services/AuthServices";
import { toast } from "react-toastify";
const token = JSON.parse(localStorage.getItem("token"));

export const register = createAsyncThunk(
    "auth/register",
    async (item, thunkAPI) => {
      try {
        const response = await AuthServices.register(item);
        return response;
      } catch (error) {
        console.log(error);
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
      }
    }
  );
  
  export const login = createAsyncThunk(
    "auth/login",
    async (item, thunkAPI) => {
      try {
        const data = await AuthServices.login(item);
        return { token: data.token };
      } catch (error) {
        console.log(error);
        toast.error("wrong parameter")
        thunkAPI.dispatch()
        return thunkAPI.rejectWithValue()
      }
    }
  );
  
  export const logout = createAsyncThunk("auth/logout", async () => {
    await AuthServices.logout();
  });
  

const initialState = token
  ? { isLoggedIn: true, token }
  : { isLoggedIn: false, token: null };

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers:{
    },
    extraReducers: (builder) => {
        builder
        .addCase(register.fulfilled, (state, action) => {
          console.log(action.payload);
            state.isLoggedIn = false;
          })
          .addCase(register.rejected, (state, action) => {
            state.isLoggedIn = false;
          })
          .addCase(login.fulfilled, (state, action) => {
            state.isLoggedIn = true;
            state.token = action.payload.token;
          })
          .addCase(login.rejected, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
          })
          .addCase(logout.fulfilled, (state, action) => {
            state.isLoggedIn = false;
            state.token = null;
          });
    }
});

export default authSlice.reducer;