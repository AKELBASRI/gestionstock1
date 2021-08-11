import { isAuthenticated } from "../auth/helpers";
import { API_URL } from "../config";


export const getusers = () => async (dispatch) => {
    try{
        const {user,token}=isAuthenticated();
        fetch(`${API_URL}/admin/alladmins/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then((res)=>res.json())
        .then((data)=>{
            dispatch({type:'GetUsers',payload:data})
           
        }).catch(error=>console.log(error))
        }
        
      
    
    catch(error){
        console.log(error)
    }
}

