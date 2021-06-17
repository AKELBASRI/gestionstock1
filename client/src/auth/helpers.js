import { API_URL } from "../config";

export const isAuthenticated=()=>{
    const jwt=localStorage.getItem('jwt_info');
    if(jwt){
        return JSON.parse(jwt);
    }
    return false;
}
