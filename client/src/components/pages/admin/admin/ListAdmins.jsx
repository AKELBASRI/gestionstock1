import React,{useEffect,useState} from 'react'

import { useDispatch,useSelector } from "react-redux";
import { confirmAlert } from 'react-confirm-alert'; 

import './ListAdmins.css'
import './DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import MUIDataTable from "mui-datatables";
import ChangePasswordModal from './ChangePasswordModal'
import AddEditUserModal from './AddEditUserModal';
import { getusers } from '../../../../actions/getUserAction';
import handleClickDelete from './DeleteAdmin';
function ListUsers() {
    const dispatch=useDispatch();
    const [user,setUser]=useState({})
    const listusers = useSelector((state) => state.usersReducer);
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const[showPasswordModal,setshowpasswordmodal]=useState(false);
    const handleShowEditAddModal=(user)=>{ setshowEditAddModal(true);setUser(user)}
    const handleClose = () => {setshowpasswordmodal(false);setshowEditAddModal(false)};
    const handleShowPassword = (user) => {setshowpasswordmodal(true);setUser(user)}
    useEffect(()=>{
        dispatch(getusers());
    },[dispatch])
    const Actiongetusers=()=>{
      dispatch(getusers());
    }
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
                    handleClickDelete(user,Actiongetusers);
                    dispatch(getusers());
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
       
        <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listusers[dataIndex])}>
                                   
                                 <i className="fas fa-pencil-alt"></i>
                              </button>
                              <button type="button" className="btn btn-secondary btn-sm px-3"  onClick={()=> handleShowPassword(listusers[dataIndex])
                      
                             } >
                        <i className="fas fa-key"></i>
                        </button>
        
                              <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listusers[dataIndex]))}>
                  
                        <i className="fas fa-times"></i>
                    </button>
       
      </div>
      );
    }
    const columns = [
    
    
      {
        label: "Nom",
        name: "nom",
        options: {
          filter: true,
        }
      },
      {
        label: "Mle",
        name: "Mle",
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
        
            <Layout >
             {listusers && (
               <MUIDataTable title={"Liste des admins"} data={listusers} columns={columns} options={options} />
               
     
       )}
        <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau admin</button>        
        <ChangePasswordModal usernormal={user} show={showPasswordModal} handleClose={handleClose} />
        <AddEditUserModal Mle={user.Mle} show={showEditAddModal} handleClose={handleClose} />
       </Layout>
     
    )
}

export default ListUsers
