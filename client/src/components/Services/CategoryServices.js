import axios from "axios";
import jwt from "./token"
// import Message from "../hata/Message";
const API_URL = "http://localhost:8000/api/";

const AllCategory = () => {
    return axios.get(API_URL+"main_category")
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const AddCategory = (item) => {
    return axios.post(API_URL+"main_category",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const UpdateCategory = (item) => {
    return axios.put(API_URL+"main_category",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const DeleteCategory = (item) => {
    return axios.delete(API_URL+"main_category",{headers:jwt(),data:item})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const CategoryServices = {
    AllCategory,
    AddCategory,
    UpdateCategory,
    DeleteCategory,
}

export default CategoryServices
