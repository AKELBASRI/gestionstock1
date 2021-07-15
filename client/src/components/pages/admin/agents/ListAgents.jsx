import React,{useEffect,useState} from 'react'

import { useDispatch,useSelector } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; 

import '../admin/ListAdmins.css'
import '../admin/DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import MUIDataTable from "mui-datatables";



// import handleClickDelete from './DeleteAdmin';
import { getagents } from '../../../../actions/getagentsAction';
import AddEditAgentModal from './AddEditAgentModal';
function ListAgents() {
    const dispatch=useDispatch();
    const [user,setUser]=useState({})
    const listagents = useSelector((state) => state.agentsReducer);
    
    const[showEditAddModal,setshowEditAddModal]=useState(false);
   
    const handleShowEditAddModal=(user)=>{ setshowEditAddModal(true);setUser(user)}
    const handleClose = () => {setshowEditAddModal(false)};
    
    useEffect(()=>{
        dispatch(getagents());
    },[dispatch])
    const Actiongetagents=()=>{
      dispatch(getagents());
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
      const listagentsf= listagents.map( (_data) =>{return flattenObject(_data)});
    const Delete=(user)=>{
       
      confirmAlert({
          customUI: ({ onClose }) => {
            return (
              <div className='custom-ui'>
                <h1>Vous êtes sure ?</h1>
                <p>Voulez-vous Vraiment supprimer cette utilisateur ?</p>
                <button onClick={onClose}>Non</button>
                <button
                  onClick={() => {
                    // handleClickDelete(user,Actiongetusers);
                    dispatch(getagents());
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
       
        <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listagents[dataIndex])}>
                                   
                                 <i className="fas fa-pencil-alt"></i>
                              </button>
                            
        
                              <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listagents[dataIndex]))}>
                  
                        <i className="fas fa-times"></i>
                    </button>
       
      </div>
      );
    }
    const columns = [
     
    {
        
        label: "Mle",
        name: "agent_number",
        options: {
            filter: true,
        }
        },
      
    {
        label: "Nom",
        name: "agent_full_name",
        options: {
          filter: true,
        }
    },
    {
        label: "Email",
        name: "agent_email",
        options: {
            filter: true,
        }
        },
        {
            label: "Service",
            name: "service_id",
            options: {
                filter: true,
                display: false,
            }
            },
            {
                label: "Agence",
                name: "agency_id",
                options: {
                    filter: true,
                    display: false,
                }
                },
    {
        label: "Service",
        name: "service.service_name",
        options: {
          filter: true,
        }
    },
    {
        label: "agence",
        name: "agency.agency_name",
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
                 <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau agent</button>  ,    
             {listagentsf && (
                
               <MUIDataTable title={"Liste des agents"} data={listagentsf} columns={columns} options={options} />
               
     
       )}
        
        {/* <ChangePasswordModal usernormal={user} show={showPasswordModal} handleClose={handleClose} />*/}
        <AddEditAgentModal Mle={user.agent_number} show={showEditAddModal} handleClose={handleClose} /> 
       </Layout>
     
    )
}

export default ListAgents
