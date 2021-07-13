import React,{useEffect,useState} from 'react'

import { useDispatch,useSelector } from "react-redux";

import { getusers } from '../../../../actions/getUserAction';
import './ListUsers.css'
import Layout from '../../Layout/Layout';
import MUIDataTable from "mui-datatables";
import ChangePasswordModal from './ChangePasswordModal'
function ListUsers() {
    const dispatch=useDispatch();
    const [user,setUser]=useState({})
    const listusers = useSelector((state) => state.usersReducer);
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const[showPasswordModal,setshowpasswordmodal]=useState(false);
    const handleClose = () => {setshowpasswordmodal(false);setshowEditAddModal(false)};
    const handleShowPassword = (user) => {setshowpasswordmodal(true);setUser(user)}
    useEffect(()=>{
        dispatch(getusers());
    },[dispatch])
    const buttons=(dataIndex, rowIndex)=>{
      return(
      <div className="row">
       
        <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>  console.log(listusers[dataIndex].nom)}>
                                    {/* handleShowEditAddModal(data)}
                                     // > */}
                                 <i className="fas fa-pencil-alt"></i>
                              </button>
                              <button type="button" className="btn btn-secondary btn-sm px-3"  onClick={()=> handleShowPassword(listusers[dataIndex])
                         // {
                         //    handleShowPassword(data)
                          
                         //     }
                             } >
                        <i className="fas fa-key"></i>
                        </button>
        
                              <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=>null}>
                  {/* {
      //                  Delete(data)}
      //              }> */}
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
      //       <div style={{ maxWidth: '100%' }}>
      //   <MaterialTable
      //     columns={[
      //       { title: 'Nom', field: 'nom' },
      //       { title: 'Mle', field: 'Mle' },
          
            
      //       { title: 'Actions', field: 'Actions' },
      //     ]}
      //     data={listusers}
          
      //     components={{
          
      //       Row: ({ data }) => {
      //         return (
      //           <TableRow>
      //             <TableCell >{data.nom}</TableCell>
      //             <TableCell >{data.Mle}</TableCell>
                  
      //             <TableCell> <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=>null}>
      //              {/* {
      //                  Delete(data)}
      //              }> */}
      //                   <i className="fas fa-times"></i>
      //                   </button>
                  
      //                   <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>  null}>
      //                       {/* handleShowEditAddModal(data)}
      //                       // > */}
      //                   <i className="fas fa-pencil-alt"></i>
      //                   </button>
      //                   <button type="button" className="btn btn-secondary btn-sm px-3"  onClick={()=>null
      //                   // {
      //                   //    handleShowPassword(data)
                          
      //                   //     }
      //                       } >
      //                   <i className="fas fa-key"></i>
      //                   </button></TableCell>
      //           </TableRow>
      //         );
      //       },
          
          
      //     }}
          
      //     options={{
      //       showTitle: false,
      //  }}
       
      //   />
      // </div>
       )}
        <ChangePasswordModal usernormal={user} show={showPasswordModal} handleClose={handleClose} />
       </Layout>
     
    )
}

export default ListUsers
