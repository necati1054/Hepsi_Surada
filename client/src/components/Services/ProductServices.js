import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const AllProduct = () => {
    return axios.get(API_URL+"product")
    .then((response)=>response.data)
    .then((response)=>{return response})
}

const AddProduct = (item) => {
    return axios.post(API_URL+"product",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const UpdateProduct = (item) => {
    return axios.put(API_URL+"product",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response) => {
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const DeleteProduct = (item) => {
    return axios.delete(API_URL+"product",{headers:jwt(),data:item})
    .then((response)=> response.data)
    .then((response)=> {
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const ProductImageUpdate = (item) =>{
    return axios.post(API_URL+"product_image_update",item,{headers:jwt()})
    .then((response) => response.data)
    .then((response)  => {
        if(response.message != "Failed")
        {
            return response
        }
    })
}

const ProductServices = {
    AllProduct,
    AddProduct,
    UpdateProduct,
    DeleteProduct,
    ProductImageUpdate
}

export default ProductServices