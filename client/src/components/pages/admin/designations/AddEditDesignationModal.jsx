import React ,{useState,useEffect} from 'react'
import {Button,Modal,Form,InputGroup} from 'react-bootstrap'
import useStateRef from 'react-usestateref'

import toastr from 'toastr';
import "toastr/build/toastr.css"
import { useDispatch,useSelector } from "react-redux";

import { isAuthenticated } from '../../../../auth/helpers';
import { API_URL } from '../../../../config';


import { getDesignation } from '../../../../actions/getDesignationAction';
function AddEditDesignationModal({ iddesignation,show,handleClose}) {
    const [isvalid,setIsValid,ref]=useStateRef(true)
    const [errors,setErrors]=useState({})
    const[categories,setCategories]=useState([])
    const [ndesignation,setDesignation]=useState({
      
       
      
    })
    const [checked, setChecked] = React.useState(true);
    const dispatch=useDispatch();
    const designation = useSelector((state) =>iddesignation? state.designationReducer.find((p)=>p.idDesignation===iddesignation):null);
    useEffect(()=>{
            getCategories()
            if(designation){
                setDesignation(designation)
            }else{
                setDesignation({  })
            }
          },[designation])
  
    const validate=()=>{
        if(!ndesignation.designation){
          setErrors({designation:"Veuilez Entrer la designation "})
          setIsValid(false)
        }
        else if(!ndesignation.idtype){
            setErrors({idtype:"Veuilez Selectionner le type "})
            setIsValid(false)
        }
       else{
           setIsValid(true)
           setErrors({})
       }
        return ref.current
    }
    const getCategories=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/category/allcategories/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(res=>{setCategories(res)})
        .catch(error=>console.error(error))
    }
    const AddDesignation=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/designations/create/${user.Mle}`,{
           method:"POST",
           headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
               "Authorization":`Bearer ${token}`
           },
           body:JSON.stringify(ndesignation)
       }).then(res=>res.json())
       .then(res=>{
           if(res.error){
               toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                   positionClass:"toast-bottom-left"
               });
           }
           else{
              
               //props.history.push('/');
               toastr.success(`La designation ${ndesignation.designation}  a été crée avec succés `,'Nouvelle Designation',{
                   positionClass:"toast-bottom-left"
               });
               setDesignation({   
                
             })
               dispatch(getDesignation());
               handleClose()
           }
       })
       .catch(err=>{
           toastr.error(err,"Erreur du serveur",{
               positionClass:"toast-bottom-left"
           });
       })
    }
    const updateDesignation=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/designations/update/${user.Mle}`,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(ndesignation)
    }).then(res=>res.json())
    .then(res=>{
        if(res.error){
            toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                positionClass:"toast-bottom-left"
            });
        }
        else{
            dispatch(getDesignation());
            //props.history.push('/');
            toastr.success(`Designation ${ndesignation.designation}  est modifié avec succés `,'Modification designation',{
                positionClass:"toast-bottom-left"
            });
            setDesignation({   
               
              
             })
            
            handleClose()
            
        }
    })
    .catch(err=>{
        toastr.error(err,"Erreur du serveur",{
            positionClass:"toast-bottom-left"
        });
    })
    }
    const Submit=(e)=>{
        e.preventDefault();
        if(validate()){
            if(!iddesignation){
                AddDesignation();
            }
            else{
                updateDesignation();
            }
        }
        
    }
    const handleChange=(e)=>{
      
        setDesignation({...ndesignation,[e.target.id]:e.target.value})
       
      }
    
    
    return (
       
            <div>
           
           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
           
             <Modal.Title>{designation ? `Modification  du designation : ${designation.designation} ` :'Ajout Designation' }</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             
             <Form.Group  >
                      
               
               <Form.Label>Designation </Form.Label>
               <Form.Control value={ndesignation.designation || '' } onChange={handleChange}   type="text" placeholder="Nom" id="designation" />
               <div className="text-danger">{errors.designation}</div>
               
                <Form.Label>Type </Form.Label>
                <select value={ndesignation.idtype || ''} id="idtype" onChange={handleChange} className="form-control" aria-label="Default select example">
                                <option value="" >Selectionner le type du materiel</option>
                            
                                    {categories && categories.map((category,i)=>(
                                <option key={i} value={category.id}>{category.type}</option>
                                ))}
                </select>
                <div className="text-danger">{errors.type}</div>                        
              
              
             </Form.Group>
             
             {JSON.stringify(ndesignation)}
          
           </Modal.Body>
           <Modal.Footer>
             
             <Button variant="secondary" onClick={handleClose}>
               Close
             </Button>
             <Button variant="primary" onClick={Submit} >
             {iddesignation!==undefined ? 'Modifier':'Ajout' }
             </Button>
       
           </Modal.Footer>
        
         </Modal>
        </div>
    )
}


export default AddEditDesignationModal
