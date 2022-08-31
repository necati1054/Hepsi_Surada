import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const AllTmpStore = () => {
    return axios.get(API_URL+"tmp_store",{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {return response})
};

const UpdateTmpStore = (item) => {
    return axios.put(API_URL+"tmp_store",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) =>{return response})
}

const AddTmpStore = (item) => {
    return axios.post(API_URL+"tmp_store",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response) =>{return response})
}

const TmpStoreServices = {
    AllTmpStore,
    UpdateTmpStore,
    AddTmpStore,
}

export default TmpStoreServices