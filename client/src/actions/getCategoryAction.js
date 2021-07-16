import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";

export const getcategories = () => async (dispatch) => {
    try{
        const {user,token}=isAuthenticated();
        fetch(`${API_URL}/category/allcategories/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).
        then((res)=>res.json())
        .then((data)=>{
            dispatch({type:'GetCategory',payload:data})
           
        }).catch(error=>console.log(error))
        }
        
      
    
    catch(error){
        console.log(error)
    }
}