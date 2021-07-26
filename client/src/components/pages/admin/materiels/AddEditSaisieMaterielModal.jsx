import React, {useState,useEffect} from 'react'
import {Button,Modal,Form} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import toastr from 'toastr';
import "toastr/build/toastr.css"

import useStateRef from 'react-usestateref'
import { API_URL } from '../../../../config';
import { isAuthenticated } from '../../../../auth/helpers';
import { getMateriels } from '../../../../actions/getMaterielsActions';
function AddEditSaisieMaterielModal({id,show,handleClose}) {

    const[categories,setCategories]=useState([])
    const[Fournisseurs,setFournisseur]=useState([])
    const [isvalid,setIsValid,ref]=useStateRef(true)
    const [isvalid2,setShowInventory,showInventory]=useStateRef(true);
    const [errors,setErrors]=useState({})
  
    const [isvalid1,setMaterial,material]=useStateRef({
        marque:'',
        numeroinventaire:'',
        garentie:'',
        datereceptionprovisoire:'',
        IDFournisseur:'',
        idtype:'',
       
    })
    const [Qte,setQte]=useState(0)
    const dispatch=useDispatch();
    const material1 = useSelector((state) =>id ? state.MaterielReducer.find((p)=>p.agent_number===id):null);
    useEffect(()=>{
        getCategories()
        getFournisseur()
        if(material1){
           
            setMaterial(material1)
        }else{
          setMaterial({  marque:'',
          numeroinventaire:'',
          garentie:'',
          datereceptionprovisoire:'',
          IDFournisseur:'',
          idtype:''})
        }
      
    },[material1])
    const handleQte=(e)=>{
        setQte(e.target.value)
    }
    const handleChange=(e)=>{
        
       
        setMaterial({...material.current,[e.target.id]:e.target.value})
        const catselected=categories.find((cat)=>cat.id===parseInt(material.current.idtype));
        if(catselected){
            if(!catselected.inventoryornot)
            {
               
                setShowInventory(false)
                setMaterial({...material.current,numeroinventaire:''})
                
               
            }else{
                setShowInventory(true)
                
            }
        }
       
      }
    
      const validate=()=>{
       
    
         if((!material.current.numeroinventaire)&&(showInventory.current)){
          setErrors({numeroinventaire:"Veuillez saisir le numero d'inventaire "})
          setIsValid(false)
          
        } 
         else if(!material.current.idtype){
            setErrors({idtype:'Veuillez selectionner le type '})
            setIsValid(false)
          }
          else if(!Qte &&(!showInventory.current)){
            setErrors({Qte:'Veuillez saisir quantité'})
            setIsValid(false)
          }
        else if(!material.current.marque){
            setErrors({marque:"Veuilez Entrer la marque "})
            setIsValid(false)
          }
        else if(!material.current.garentie){
            setErrors({garentie:"Veuillez saisir la garentie "})
            setIsValid(false)
          }
        else if(!material.current.datereceptionprovisoire){
            setErrors({datereceptionprovisoire:'Veuillez saisir la date de reception provisoire '})
            setIsValid(false)
          }
        else if(!material.current.IDFournisseur){
            setErrors({IDFournisseur:'Veuillez selectionner le Fournisseur '})
            setIsValid(false)
          }
       
      
       else{
           setIsValid(true)
           setErrors({})
       }
        return ref.current
    }
 
    
    const UpdateMateriel=()=>{
      const{user,token}=isAuthenticated()
      fetch(`${API_URL}/agents/update/${user.Mle}`,{
         method:"PUT",
         headers:{
             "Accept":"application/json",
             "Content-Type":"application/json",
             "Authorization":`Bearer ${token}`
         },
         body:JSON.stringify(material)
     }).then(res=>res.json())
     .then(res=>{
         if(res.error){
             toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                 positionClass:"toast-bottom-left"
             });
         }
         else{
            
             //props.history.push('/');
             toastr.success(`L'agent matricule ${material.agent_number}  est modifié avec succés `,'Modification Utilisateur',{
                 positionClass:"toast-bottom-left"
             });
             setMaterial({  agent_number:'',agent_full_name:'', agent_email:'',agency_id:'',service_id:''})
             dispatch(getMateriels());
             handleClose()
         }
     })
     .catch(err=>{
         toastr.error(err,"Erreur du serveur",{
             positionClass:"toast-bottom-left"
         });
     })
    }
    const AjoutMateriel=()=>{
        const marque=material.current.marque
         for (let i = 0; i < Qte; i++) {
                const{user,token}=isAuthenticated()
                fetch(`${API_URL}/materiels/create/${user.Mle}`,{
                    method:"POST",
                    headers:{
                        "Accept":"application/json",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body:JSON.stringify(material.current)
                }).then(res=>res.json())
                .then(res=>{
                    if(res.error){
                        toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                            positionClass:"toast-bottom-left"
                        });
                    }
                    else{
                        
                        handleClose()
                       
                        //props.history.push('/');
                        toastr.success(`Le Materiel ${marque}  est crée avec succés `,'Nouveau Materiel',{
                            positionClass:"toast-bottom-left"
                        });
                        
                        dispatch(getMateriels());
                    }
                })
                .catch(err=>{
                    toastr.error(err,"Erreur du serveur",{
                        positionClass:"toast-bottom-left"
                    });
            })
            if(i===Qte-1){
                setMaterial({
                marque:'',
                numeroinventaire:'',
                garentie:'',
                datereceptionprovisoire:'',
                IDFournisseur:'',
                idtype:''})
                setQte('')
            }
    }

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
    const getFournisseur=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/fournisseurs/all/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(res=>{setFournisseur(res)})
        .catch(error=>console.error(error))
    }
    const submitUser=(e)=>{
        e.preventDefault();
        if(validate()){
          if(material1){
           UpdateMateriel()
        }else{
          AjoutMateriel()
             
   }
  }
}    
   
    return (
     
        <div>
           
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
          <Modal.Title>{material1 ? `Modification  du materiel : ${material1.marque}`:'Ajout Materiel' }</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          
          <Form.Group  >
                    
                    {JSON.stringify(material)}
            <Form.Label>Type </Form.Label>
            <select value={material.current.idtype || ''} id="idtype" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner le type du materiel</option>
                         
                                {categories && categories.map((category,i)=>(
                               <option key={i} value={category.id}>{category.type}</option>
                               ))}
            </select>
            
            <div className="text-danger">{errors.idtype}</div>
            {showInventory.current && (
             <div>
                  <Form.Label>Numero Inventaire</Form.Label>
            <Form.Control value={material.current.numeroinventaire || '' } onChange={handleChange}   type="text" placeholder="Numero Inventaire" id="numeroinventaire" />
            <div className="text-danger">{errors.numeroinventaire}</div>
           
       
            </div>
            )}
            {!showInventory.current &&(
                <div>
                     <Form.Label>Quantité</Form.Label>
                     <Form.Control value={Qte || '' } onChange={handleQte}   type="text" placeholder="Quantité" id="Qte" />
                     <div className="text-danger">{errors.Qte}</div>
                </div>
            )}
            <div className="my-2"></div>
           
         
            
            <Form.Label>Marque : </Form.Label>
            <Form.Control value={material.current.marque || '' } onChange={handleChange}   type="text" placeholder="Marque" id="marque" />
            <div className="text-danger">{errors.marque}</div>
      
            <Form.Label>Garentie</Form.Label>
            <select value={material.current.garentie || ''} id="garentie" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner la garentie</option>
                            <option  key="1"  value="1" >1 an</option>
                            <option  key="2" value="2" >2 ans</option>
                            <option key="3" value="3" >3 ans</option>
                               
            </select>
            <div className="text-danger">{errors.garentie}</div>
            <div className="my-2"></div>
            <Form.Label>Date Reception Provisoire : </Form.Label>
            <Form.Control value={material.current.datereceptionprovisoire || '' } onChange={handleChange}   type="date" placeholder="Date reception provisoire" id="datereceptionprovisoire" />
            <div className="text-danger">{errors.datereceptionprovisoire}</div>


           
          
            <Form.Label>Fournisseur </Form.Label>
            <select value={material.current.IDFournisseur || ''} id="IDFournisseur" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner le Fournisseur</option>
                         
                                {Fournisseurs && Fournisseurs.map((fournisseur,i)=>(
                               <option key={i} value={fournisseur.idFournisseur}>{fournisseur.NomFournisseur}</option>
                               ))}
            </select>
            <div className="text-danger">{errors.IDFournisseur}</div>
          </Form.Group>
          
          
       
        </Modal.Body>
        <Modal.Footer>
          
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={submitUser} >
          {material1 ? 'Modifier':'Ajout' }
          </Button>
        
        </Modal.Footer>
     
      </Modal>
       
        </div>
    )

}
export default AddEditSaisieMaterielModal
