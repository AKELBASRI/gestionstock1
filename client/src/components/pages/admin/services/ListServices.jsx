import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import Layout from '../../Layout/Layout';
import { useDispatch,useSelector } from "react-redux";
import { getservices } from '../../../../actions/getserviceAction';

import AddEditServiceModal from './AddEditServiceModal';
import handleClickDelete from './DeleteService';
import { Delete } from '../../../../core/util';
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
    const actiongetservices=()=>{
        dispatch(getservices());
     }

    const buttons=(dataIndex, rowIndex)=>{
        return(
        <div className="row">
         
          <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listservices[dataIndex])}>
                                     
                                   <i className="fas fa-pencil-alt"></i>
                                </button>
                         
          
                                <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete(listservices[dataIndex],actiongetservices,handleClickDelete)}>
                    
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
            <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouveau service</button>        
             {listservices && (
               <MUIDataTable title={"Liste des services"} data={listservices} columns={columns} options={options} />
               
     
       )}
        
       
         <AddEditServiceModal CodeSce={service.id} show={showEditAddModal} handleClose={handleClose} />
       </Layout>
        </div>
    )
}

export default ListServices
