import React,{useState} from 'react'
import { API_URL } from '../../../../config'
import './signin.css'
import toastr from 'toastr';
import "toastr/build/toastr.css"
import logo from '../../../logo_radeeo.jpg'
import hero from '../../../hero.png'
import Layout from '../../Layout/Layout';

function Signin(props) {
    const[user,setUser]=useState({
        Mle:'',
        password:''
    })
    const handleChange=(e)=>{
        setUser({...user,[e.target.id]:e.target.value})
    }
    const submitSignin=e=>{
        e.preventDefault();
        fetch(`${API_URL}/signin`,{
            method:"POST",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json"
            },
            body:JSON.stringify(user)
        }).then(res=>res.json())
        .then(res=>{
            if(res.error){
                toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                    positionClass:"toast-bottom-left"
                });
            }
            else{
                localStorage.setItem('jwt_info',JSON.stringify(res));
                props.history.push({
                    pathname: '/',
                    state: { state: true }
                  })
                toastr.info("Authentification réussie",'Bienvenue',{
                    positionClass:"toast-top-right"
                });
            }
        })
        .catch(err=>{
            toastr.error(err,"Erreur du serveur",{
                positionClass:"toast-top-right"
            });
        })
    }
    return (
        
        <div>
        
        <Layout>
    <div className="card  border-0">
        <div className="row d-flex">
            <div className="col-lg-6">
                <div className="card1 pb-5">
                    <div className="row"> 
                  <div className="d-flex align-items-center justify-content-around">

                        <img src={logo} className="logo"/>
                 
                    
                        <div className="title">Gestion Stock Informatique</div>
                        </div>
                     </div>
                    <div className="row px-3 justify-content-center mt-4 mb-5"> <img src={hero} className="image"/> </div>
                </div>
            </div>
            <div className="col-lg-6">
                <div className="card2 card border-0 px-4 py-5">
                  
                 
                    <div className="row px-3"> <label className="mb-1">
                            <h6 className="mb-0 text-sm">Matricule</h6>
                        </label> 
                        <input className="mb-4" type="text" id="Mle" placeholder="Matricule" onChange={handleChange}/> </div>
                    <div className="row px-3"> <label className="mb-1">
                            <h6 className="mb-0 text-sm">Mot de passe</h6>
                        </label> <input type="password" id="password" onChange={handleChange} placeholder="Mot de passe"/> </div>
                    <div className="row px-3 mb-4">
                       
                    </div>
                    <div className="row mb-3 px-3"> <button type="submit" onClick={submitSignin} className="btn btn-blue text-center">Login</button> </div>
                 
                </div>
            </div>
         
        </div>
        {/* <div className="bg-blue py-4 ">
            <div className="footer ml-4 ml-sm-5 mb-2 text-center"><small>Copyright &copy; 2021.  RADEEO S.S.I. Tous droits réservés.<br/>Gestion Stock V1.0 by Ahmed Khalil El Basri.</small></div> 
             
           
        </div>  */}
    </div>
    </Layout>

</div>
  
    )
}

export default Signin
