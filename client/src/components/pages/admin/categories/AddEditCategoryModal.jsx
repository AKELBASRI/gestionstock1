import React ,{useState,useEffect} from 'react'
import {Button,Modal,Form,InputGroup} from 'react-bootstrap'
import useStateRef from 'react-usestateref'

import toastr from 'toastr';
import "toastr/build/toastr.css"
import { useDispatch,useSelector } from "react-redux";
import { getservices } from '../../../../actions/getserviceAction'
import { isAuthenticated } from '../../../../auth/helpers';
import { API_URL } from '../../../../config';
import Switch from "@material-ui/core/Switch";
import { getcategories } from '../../../../actions/getCategoryAction';
function AddEditCategoryModal({ CodeSce,show,handleClose}) {
    const [isvalid,setIsValid,ref]=useStateRef(true)
    const [ncategory,setCategory]=useState({
      
        idtypemateriel:'',
        type:'',
        inventoryornot:''
      
    })
    const [checked, setChecked] = React.useState(true);
    const dispatch=useDispatch();
    const category = useSelector((state) =>CodeSce? state.categoryReducer.find((p)=>p.id===CodeSce):null);
    useEffect(()=>{
            if(category){
                setCategory(category)
            }else{
                setCategory({})
            }
          },[category])
    const [errors,setErrors]=useState({})
    const validate=()=>{
        if(!ncategory.type){
          setErrors({type:"Veuilez Entrer le nom du category "})
          setIsValid(false)
        }
        
       else{
           setIsValid(true)
           setErrors({})
       }
        return ref.current
    }
    const AddCategory=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/category/create/${user.Mle}`,{
           method:"POST",
           headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
               "Authorization":`Bearer ${token}`
           },
           body:JSON.stringify(ncategory)
       }).then(res=>res.json())
       .then(res=>{
           if(res.error){
               toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                   positionClass:"toast-bottom-left"
               });
           }
           else{
              
               //props.history.push('/');
               toastr.success(`Le service ${ncategory.type}  est crée avec succés `,'Nouveau Service',{
                   positionClass:"toast-bottom-left"
               });
               setCategory({  idtypemateriel:'',
               type:'',
               inventoryornot:''
             })
               dispatch(getservices());
               handleClose()
           }
       })
       .catch(err=>{
           toastr.error(err,"Erreur du serveur",{
               positionClass:"toast-bottom-left"
           });
       })
    }
    const updateCategory=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/category/update/${user.Mle}`,{
        method:"PUT",
        headers:{
            "Accept":"application/json",
            "Content-Type":"application/json",
            "Authorization":`Bearer ${token}`
        },
        body:JSON.stringify(ncategory)
    }).then(res=>res.json())
    .then(res=>{
        if(res.error){
            toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                positionClass:"toast-bottom-left"
            });
        }
        else{
            dispatch(getcategories());
            //props.history.push('/');
            toastr.success(`category ${category.type}  est modifié avec succés `,'Modification Service',{
                positionClass:"toast-bottom-left"
            });
            setCategory({ idtypemateriel:'',
            type:'',
            inventoryornot:''})
            
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
            if(!CodeSce){
               AddCategory();
            }
            else{
                updateCategory();
            }
        }
        
    }
    const handleChange=(e)=>{
        const value = e.target.id === "inventoryornot" ? e.target.checked : e.target.value;
        setCategory({...ncategory,[e.target.id]:value})
       
      }
    
    
    return (
       
            <div>
           
           <Modal show={show} onHide={handleClose}>
           <Modal.Header closeButton>
           
             <Modal.Title>{category ? `Modification  du category : ${category.type} ` :'Ajout Category' }</Modal.Title>
           </Modal.Header>
           <Modal.Body>
             
             <Form.Group  >
                      
               
               <Form.Label>Nom </Form.Label>
               <Form.Control value={ncategory.type || '' } onChange={handleChange}   type="text" placeholder="Nom" id="type" />
               <div className="text-danger">{errors.type}</div>
               <Form.Label>Inventory ou non </Form.Label>
             
               <Switch value="active" checked={ncategory.inventoryornot || false} value={checked} onChange={handleChange} id='inventoryornot'/>
               <div className="text-danger">{errors.type}</div>
              
             </Form.Group>
             
             {JSON.stringify(ncategory)}
          
           </Modal.Body>
           <Modal.Footer>
             
             <Button variant="secondary" onClick={handleClose}>
               Close
             </Button>
             <Button variant="primary" onClick={Submit} >
             {CodeSce!==undefined ? 'Modifier':'Ajout' }
             </Button>
       
           </Modal.Footer>
        
         </Modal>
        </div>
    )
}


export default AddEditCategoryModal
