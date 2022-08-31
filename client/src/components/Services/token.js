export default function authToken(type){
    var data = localStorage.getItem("token");
    var token = JSON.parse(data).access_token;

    if(token){
        return {Authorization : `Bearer ${token}`,
    "Content-Type":type};
    }else{
        return {};
    }
}