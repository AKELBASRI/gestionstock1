import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import '../admin//ListAdmins.css'
import '../admin//DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import { useDispatch,useSelector } from "react-redux";

import { confirmAlert } from 'react-confirm-alert'; 

import handleClickDelete from './DeleteDesignation';


import { getDesignation } from '../../../../actions/getDesignationAction';
import AddEditDesignationModal from './AddEditDesignationModal';
function ListeDesignation() {
    const dispatch=useDispatch();
    const listdesignations1 = useSelector((state) => state.designationReducer);
    const handleShowEditAddModal=(designation)=>{ setshowEditAddModal(true);setDesignation(designation)}
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const [designation,setDesignation]=useState({})
    useEffect(()=>{
        dispatch(getDesignation());
    },[dispatch])
    const handleClose = () => {setshowEditAddModal(false)};
    const actiongetDesignation=()=>{
        dispatch(getDesignation());
     }
     const flattenObject = function(ob) {
  
        return Object.keys(ob).reduce(function(toReturn, k) {
      
          if (Object.prototype.toString.call(ob[k]) === '[object Date]') {
            toReturn[k] = ob[k].toString();
          }
          else if ((typeof ob[k]) === 'object' && ob[k]) {
            var flatObject = flattenObject(ob[k]);
            Object.keys(flatObject).forEach(function(k2) {
              toReturn[k + '.' + k2] = flatObject[k2];
            });
          }
          else {
            toReturn[k] = ob[k];
          }
      
          return Object.keys(toReturn).map(function(_) { return toReturn[_]; });
        }, {});
      };
    const listdesignation= listdesignations1.map( (_data) =>{return flattenObject(_data)});
    const Delete=(designation)=>{
       console.log(designation)
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Vous êtes sure ?</h1>
                  <p>Voulez-vous Vraiment supprimer cette utilisateur ?</p>
                  <button onClick={onClose}>Non</button>
                  <button
                    onClick={() => {
                      handleClickDelete(designation,actiongetDesignation);
                      dispatch(getDesignation());
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
         
          <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listdesignations1[dataIndex])}>
                                     
                                   <i className="fas fa-pencil-alt"></i>
                                </button>
                         
          
                                <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listdesignations1[dataIndex]))}>
                    
                          <i className="fas fa-times"></i>
                      </button>
         
        </div>
        );
      }
    const columns = [
    
    
        {
          label: "id",
          name: "idDesignation",
          options: {
            filter: true,
          }
        },
        {
          label: "Designation",
          name: "designation",
          options: {
            filter: true,
          }
        },
        {
            label: "idtype",
            name: "idtype",
            options: {
              filter: true,
              display:false
            }
          },
          
        {
            label: "Category",
            name: "typemateriel.type",
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
             {listdesignation && (
               <MUIDataTable title={"Liste des Designations"} data={listdesignation} columns={columns} options={options} />
             
     
       )}
        
        <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouvelle Designation </button>        
         <AddEditDesignationModal iddesignation={designation.idDesignation} show={showEditAddModal} handleClose={handleClose} />
         
       </Layout>
        </div>
    )
}

export default ListeDesignation
