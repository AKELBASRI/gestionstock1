import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import '../admin/ListAdmins.css'
import '../admin//DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import { useDispatch,useSelector } from "react-redux";
import { getservices } from '../../../../actions/getserviceAction';
import { confirmAlert } from 'react-confirm-alert'; 
import AddEditServiceModal from './AddEditServiceModal';
function ListServices() {
    const dispatch=useDispatch();
    const listservices = useSelector((state) => state.serviceReducer);
    const handleShowEditAddModal=(service)=>{ setshowEditAddModal(true);setservice(service)}
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const [service,setservice]=useState({})
    useEffect(()=>{
        dispatch(getservices());
    },[dispatch])
    const handleClose = () => {setshowEditAddModal(false)};
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
                    //   handleClickDelete(user,Actiongetusers);
                      dispatch(getservices());
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
         
          <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listservices[dataIndex])}>
                                     
                                   <i className="fas fa-pencil-alt"></i>
                                </button>
                         
          
                                <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listservices[dataIndex]))}>
                    
                          <i className="fas fa-times"></i>
                      </button>
         
        </div>
        );
      }
    const columns = [
    
    
        {
          label: "id",
          name: "id",
          options: {
            filter: true,
          }
        },
        {
          label: "Libelle",
          name: "service_name",
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
             {listservices && (
               <MUIDataTable title={"Liste des services"} data={listservices} columns={columns} options={options} />
               
     
       )}
        
        <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau service</button>        
         <AddEditServiceModal CodeSce={service.id} show={showEditAddModal} handleClose={handleClose} />
       </Layout>
        </div>
    )
}

export default ListServices
