import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import '../admin/ListAdmins.css'
import '../admin//DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import { useDispatch,useSelector } from "react-redux";

import { confirmAlert } from 'react-confirm-alert'; 


import { getFournisseurs } from '../../../../actions/getFournisseur';
import AddEditFournisseurModal from './AddEditFournisseurModal';
import handleClickDelete from './DeleteFournisseur';
function ListeFournisseur() {
    const dispatch=useDispatch();
    const listFournisseurs = useSelector((state) => state.fournisseurReducer);
    const handleShowEditAddModal=(fournisseur)=>{ setshowEditAddModal(true);setFournisseur(fournisseur)}
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const [fournisseur,setFournisseur]=useState({})
    useEffect(()=>{
        dispatch(getFournisseurs());
    },[dispatch])
    const handleClose = () => {setshowEditAddModal(false)};
    const actiongetFournisseurs=()=>{
        dispatch(getFournisseurs());
     }
    const Delete=(fournisseur)=>{
       
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Vous êtes sure ?</h1>
                  <p>Voulez-vous Vraiment supprimer cette utilisateur ?</p>
                  <button onClick={onClose}>Non</button>
                  <button
                    onClick={() => {
                      handleClickDelete(fournisseur,actiongetFournisseurs);
                      dispatch(getFournisseurs());
                      onClose();
                      
                    }}
                  >
                    Oui, Supprimer !
                  </button>
                </div>
              );
            }
          });
    }
    const buttons=(dataIndex, rowIndex)=>{
        return(
        <div className="row">
         
          <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>  {handleShowEditAddModal(listFournisseurs[dataIndex])}}>
                                     
                                   <i className="fas fa-pencil-alt"></i>
                                </button>
                         
          
                                <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listFournisseurs[dataIndex]))}>
                    
                          <i className="fas fa-times"></i>
                      </button>
         
        </div>
        );
      }
    const columns = [
    
    
        {
          label: "id",
          name: "idFournisseur",
          options: {
            filter: true,
          }
        },
        {
          label: "Nom Fournisseur",
          name: "NomFournisseur",
          options: {
            filter: true,
          }
        },
        {
          name: "Actions",
          options: {
            filter: false,
            sort: false,
            empty: true,
            print: false,
            setCellProps: () => ({ style: { minWidth: "5px", maxWidth: "5px" }}),
            customBodyRenderLite: (dataIndex, rowIndex) => {
              return (
                buttons(dataIndex, rowIndex)
              );
            }
          }
        },
      
      
   
      ];
      const options = {
        // pagination:false,
        // filter: true,
        // filterType: 'dropdown',
       responsive:'standard',
       selectableRows: false 
      };
    return (
        <div>
                   <Layout >
             {listFournisseurs && (
               <MUIDataTable title={"Liste des Fournisseurs"} data={listFournisseurs} columns={columns} options={options} />
               
     
       )}
        
        <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau Fournisseur</button>        
         <AddEditFournisseurModal id={fournisseur.idFournisseur} show={showEditAddModal} handleClose={handleClose} />
       </Layout>
        </div>
    )
}

export default ListeFournisseur
