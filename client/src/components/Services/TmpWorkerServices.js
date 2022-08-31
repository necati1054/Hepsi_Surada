import axios from "axios";
import jwt from "./token"
const API_URL = "http://localhost:8000/api/";

const worker_add = (item) => {
    return axios.post(API_URL+"worker_add",item,{headers:jwt()})
    .then((response)=>response.data)
    .then((response) =>{return response})
}

const TmpWorkerServices={
    worker_add,
}

export default TmpWorkerServices