import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";

export const getFournisseurs = () => async (dispatch) => {
    try{
        const {user,token}=isAuthenticated();
        return fetch(`${API_URL}/fournisseurs/all/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then((res)=>res.json())
        .then((data)=>{
            dispatch({type:'GetFournisseurs',payload:data})
           
        }).catch(error=>console.log(error))
        }
        
      
    
    catch(error){
        console.log(error)
    }
}