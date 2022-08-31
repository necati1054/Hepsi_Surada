import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const AllData = (item) =>{
    return axios.get(API_URL+"home/?page="+item)
    .then((response)=>response.data)
    .then((response) =>{return response})
}

const ProductInfo = (item) => {
    return axios.post(API_URL+"home",item)
    .then((response)=>response.data)
    .then((response)=>{return response})
}


const HomeServices = {
    AllData,
    ProductInfo,
}

export default HomeServices