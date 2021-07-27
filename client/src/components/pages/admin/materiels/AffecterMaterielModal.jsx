import React ,{useState,useEffect} from 'react'
import { isAuthenticated } from '../../../../auth/helpers'
import { API_URL } from '../../../../config'
import {Button,Modal,Form} from 'react-bootstrap'
import { useDispatch,useSelector } from "react-redux";
import useStateRef from 'react-usestateref'
import toastr from 'toastr';
import "toastr/build/toastr.css"
import { getMateriels } from '../../../../actions/getMaterielsActions';
function AffecterMaterielModal({codemtrl,show,handleClose}) {
    const [ListAgents,setAgents]=useState([])
    const [ListeService,setService]=useState([])
    const[Listagencies,setAgencies]=useState([])
    const material1 = useSelector((state) =>codemtrl ? state.MaterielReducer.find((p)=>p.idmateriel===codemtrl):null);
    const [isvalid1,setaffctMaterial,affctMateriel]=useStateRef({})
    const dispatch=useDispatch();
    const handleChange=(e)=>{
        
        setaffctMaterial({...affctMateriel.current,[e.target.id]:e.target.value})
        
      }
    const getAgents=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/agents/all/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(res=>{setAgents(res)})
        .catch(error=>console.error(error))
    }
    const getservices=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/service/allservices/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(res=>{setService(res)})
        .catch(error=>console.error(error))
    }
    const getAgencies=()=>{
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/agencies/all/${user.Mle}`,{
            method:"GET",
            headers:{
                "Accept":"application/json",
                "Content-Type":"application/json",
                "Authorization":`Bearer ${token}`
            },
        }).then(res=>res.json())
        .then(res=>{setAgencies(res)})
        .catch(error=>console.error(error))
    }
    const AffecterAction=()=>{
        
        const{user,token}=isAuthenticated()
        fetch(`${API_URL}/materiels/affecter/${user.Mle}`,{
           method:"PUT",
           headers:{
               "Accept":"application/json",
               "Content-Type":"application/json",
               "Authorization":`Bearer ${token}`
           },
           body:JSON.stringify(affctMateriel.current)
       }).then(res=>res.json())
       .then(res=>{
           if(res.error){
               toastr.warning(res.error,"S'il vous plaît Veuillez vérifier le Formulaire",{
                   positionClass:"toast-bottom-left"
               });
           }
           else{
              
               //props.history.push('/');
               toastr.success(`Le Materiel ${affctMateriel.current.marque}  est été modifié avec succés `,'Modification Materiel',{
                  positionClass:"toast-bottom-left"
              });
              setaffctMaterial({})
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
    useEffect(()=>{
        getservices()
        getAgents()
        getAgencies()
        if(material1){
           console.log(material1)
            setaffctMaterial(material1)
        }else{
            setaffctMaterial({})
        }
    },[material1])
    return (
        <div>
           
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
        
          <Modal.Title>Affectation Materiel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            
            <Form.Group  >
                    
                  
                    <Form.Label>Agent </Form.Label>
                    <select value={affctMateriel.current.mleagent || ''} id="mleagent" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner l'agent</option>
                            
                                {ListAgents && ListAgents.map((agent,i)=>(
                                <option key={i} value={agent.agent_number}>{agent.agent_full_name}</option>
                                ))}
                    </select>
                    <div className="my-2"></div>
                    <Form.Label>Service </Form.Label>
                    <select value={affctMateriel.current.idservice || ''} id="idservice" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner le service</option>
                            
                                {ListeService && ListeService.map((service,i)=>(
                                <option key={i} value={service.id}>{service.service_name}</option>
                                ))}
                    </select>
                    <div className="my-2"></div>
                    <Form.Label>Agence </Form.Label>
                    <select value={affctMateriel.current.idagence || ''} id="idagence" onChange={handleChange} className="form-control" aria-label="Default select example">
                            <option value="" >Selectionner le service</option>
                            
                                {Listagencies && Listagencies.map((agence,i)=>(
                                <option key={i} value={agence.id}>{agence.agency_name}</option>
                                ))}
                    </select>
                    </Form.Group>
                    <Modal.Footer>
          
                            <Button variant="secondary" onClick={handleClose}>
                                Close
                            </Button>
                            <Button variant="primary" onClick={AffecterAction} >
                           Affecter
                            </Button>
        
                     </Modal.Footer>
                    </Modal.Body>
            </Modal>
        </div>
    )
}

export default AffecterMaterielModal