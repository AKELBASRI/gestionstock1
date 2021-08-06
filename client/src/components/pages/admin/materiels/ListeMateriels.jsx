import React,{useEffect,useState} from 'react'

import { useDispatch,useSelector } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; 

import '../admin/ListAdmins.css'
import '../admin/DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import MUIDataTable from "mui-datatables";
import Switch from "@material-ui/core/Switch";

import { getMateriels } from '../../../../actions/getMaterielsActions';
import AddEditSaisieMaterielModal from './AddEditSaisieMaterielModal';
import handleClickDelete from './DeleteMateriel';
import AffecterMaterielModal from './AffecterMaterielModal';

function ListMateriels() {
    const dispatch=useDispatch();
    const [materiel,setMateriel]=useState({})
    const listmateriels1 = useSelector((state) => state.MaterielReducer);
    const[showAffctMaterielModal,setshowAffctMaterielModal]=useState(false)
    const[showEditAddModal,setshowEditAddModal]=useState(false);
   
    const handleShowEditAddModal=(materiel)=>{ setshowEditAddModal(true);setMateriel(materiel)}
    const handleClose = () => {setshowEditAddModal(false);setshowAffctMaterielModal(false)};
    const handleShowAffctMateriel=(materiel)=>{setshowAffctMaterielModal(true);setMateriel(materiel)}
    useEffect(()=>{
        dispatch(getMateriels());
    },[dispatch])
    const ActiongetMateriels=()=>{
      dispatch(getMateriels());
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
      const listmateriels= listmateriels1.map( (_data) =>{return flattenObject(_data)});
    const Delete=(materiel)=>{
       
      confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Vous êtes sure ?</h1>
                <p>Voulez-vous Vraiment supprimer cette utilisateur ?</p>
                <button onClick={onClose}>Non</button>
                <button
                  onClick={() => {
                    handleClickDelete(materiel,ActiongetMateriels);
                    dispatch(getMateriels());
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
       
        <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listmateriels1[dataIndex])}>
                                   
                                 <i className="fas fa-pencil-alt"></i>
                              </button>
                            
        
                              <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listmateriels1[dataIndex]))}>
                  
                        <i className="fas fa-times"></i>
                    </button>
                    <button type="button" className="btn btn-primary btn-sm px-3" onClick={()=> handleShowAffctMateriel((listmateriels1[dataIndex]))}>
                  
                    <i className="fas fa-link"></i>
              </button>
       
      </div>
      );
    }
    const columns = [
     
    {
        
        label: "id",
        name: "idmateriel",
        options: {
            filter: true,
            display:false
        }
        },
      
        {
          label: "iddesignation",
          name: "iddesignation",
          options: {
          filter: true,
          sort: false,
          display:false
        }
          },
    {
        label: "Numero Inventaire",
        name: "numeroinventaire",
        options: {
            filter: true,
        }
        },
        {
          label: "Garentie",
          name: "garentie",
          options: {
          filter: true,
          sort: false,
          customBodyRender: (value, tableMeta, updateValue) => {
              return <div>
                {value==1?value+" an":value+" ans"}
              </div>;
          }
        
          },
            },
            {
              label: "Date reception provisoire",
              name: "datereceptionprovisoire",
              options: {
                  filter: true,
                  
              }
              },
              {
                label: "Affecter",
                name: "Affecter",
                options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value}/>
                    </div>;
                }
              }
                },
                {
                  label: "idtype",
                  name: "idtype",
                  options: {
                  filter: true,
                  sort: false,
                  display:false
                }
                  },
                
                  {
                    label: "IDFournisseur",
                    name: "IDFournisseur",
                    options: {
                    filter: true,
                    sort: false,
                    display:false
                  }
                    },
                    {
                      label: "idagence",
                      name: "idagence",
                      options: {
                      filter: true,
                      sort: false,
                      display:false
                    }
                      },
                      {
                        label: "mleagent",
                        name: "mleagent",
                        options: {
                        filter: true,
                        sort: false,
                        display:false
                      }
                        },
                        {
                          label: "idservice",
                          name: "idservice",
                          options: {
                          filter: true,
                          sort: false,
                          display:false
                        }
                          },
        
              {
                  label: "idservice",
                  name: "idservice",
                  options: {
                    filter: true,
                    display:false
                  }
              },
              {
                label: "agency_id",
                name: "idagence",
                options: {
                    filter: true,
                    display: false,
                }
                },
                {
                  label: "Agent",
                  name: "agent.agent_full_name",
                  options: {
                      filter: true,
                      
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
                      label: "Fournisseur",
                      name: "fournisseur.NomFournisseur",
                      options: {
                          filter: true,
                          
                      }
                      },
                      {
                        label: "Designation",
                        name: "designation.designation",
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
       pagination:true,
      // filter: true,
      // filterType: 'dropdown',
     responsive:'standard',
     selectableRows: false 
    };
    return (
        
            <Layout >
                 <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau Materiel</button>  ,    
             {listmateriels && (
                
               <MUIDataTable title={"Liste des Materiels"} data={listmateriels} columns={columns} options={options} />
               
     
       )}
        <AffecterMaterielModal codemtrl={materiel.idmateriel} show={showAffctMaterielModal} handleClose={handleClose}/>
        
        <AddEditSaisieMaterielModal codemtrl={materiel.idmateriel} show={showEditAddModal} handleClose={handleClose} /> 
       </Layout>
     
    )
}

export default ListMateriels
