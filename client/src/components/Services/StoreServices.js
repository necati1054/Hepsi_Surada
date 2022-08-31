import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const AllStore = () => {
    return axios.get(API_URL+"store")
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const AllStoreInfo = (item) =>{
    return axios.post(API_URL+"store_info",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const StoreProductUpdate = (item)=>{
    return axios.put(API_URL+"store_product",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const StoreProductDelete = (item) =>{
    return axios.delete(API_URL+"store_product",{headers:jwt(),data:item})
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const StoreProductAdd = (item) => {
    return axios.post(API_URL+"store_product",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response) => {return response})
}

const StoreİnfoUpdate = (item) => {
    return axios.put(API_URL+"store",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {return response})
}

const StoreLogoUpdate = (item) => {
    return axios.post(API_URL+"logo",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {return response})
}

const StoreCoverUpdate = (item) => {
    return axios.post(API_URL+"cover",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {return response})
}

const StoreServices = {
    AllStore,
    AllStoreInfo,
    StoreProductUpdate,
    StoreProductDelete,
    StoreProductAdd,
    StoreİnfoUpdate,
    StoreLogoUpdate,
    StoreCoverUpdate
}

export default StoreServices