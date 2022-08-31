import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import TmpWorkerServices from "../../Services/TmpWorkerServices";
import { toast } from "react-toastify";

const Worker_add = createAsyncThunk("worker_add",async(item,thunkAPI)=>{
    try {
        const response = TmpWorkerServices.worker_add(item);
        return response
    } catch (error) {
        thunkAPI.dispatch()
        console.log(error);
        return thunkAPI.rejectWithValue()
    }
})

export default Worker_add