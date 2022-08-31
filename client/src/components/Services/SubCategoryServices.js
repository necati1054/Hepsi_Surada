import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const AllSubCategory = () => {
    return axios.get(API_URL+"sub_category")
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const AddSubCategory = (item) => {
    return axios.post(API_URL+"sub_category",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const DeleteSubCategory = (item) => {
    return axios.delete(API_URL+"sub_category",{headers:jwt(),data:item})
    .then((response)=>response.data)
    .then((response)=>{
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const UpdateSubCategory = (item) => {
    return axios.put(API_URL+"sub_category",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const SubCategoryServices = {
    AllSubCategory,
    AddSubCategory,
    DeleteSubCategory,
    UpdateSubCategory
}

export default SubCategoryServices