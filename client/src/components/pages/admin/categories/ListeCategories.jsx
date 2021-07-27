import React,{useState,useEffect} from 'react'
import MUIDataTable from "mui-datatables";
import '../admin//ListAdmins.css'
import '../admin//DeleteAdmin.css'
import Layout from '../../Layout/Layout';
import { useDispatch,useSelector } from "react-redux";
import Switch from "@material-ui/core/Switch";
import { confirmAlert } from 'react-confirm-alert'; 

import handleClickDelete from './DeleteCategory';
import AddEditCategoryModal from './AddEditCategoryModal';
import { getcategories } from '../../../../actions/getCategoryAction';
function ListeCategories() {
    const dispatch=useDispatch();
    const listcategories = useSelector((state) => state.categoryReducer);
    const handleShowEditAddModal=(category)=>{ setshowEditAddModal(true);setcategory(category)}
    const[showEditAddModal,setshowEditAddModal]=useState(false);
    const [category,setcategory]=useState({})
    useEffect(()=>{
        dispatch(getcategories());
    },[dispatch])
    const handleClose = () => {setshowEditAddModal(false)};
    const actiongetcategories=()=>{
        dispatch(getcategories());
     }
    const Delete=(category)=>{
       
        confirmAlert({
            customUI: ({ onClose }) => {
              return (
                <div className='custom-ui'>
                  <h1>Vous êtes sure ?</h1>
                  <p>Voulez-vous Vraiment supprimer cette utilisateur ?</p>
                  <button onClick={onClose}>Non</button>
                  <button
                    onClick={() => {
                      handleClickDelete(category,actiongetcategories);
                      dispatch(getcategories());
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
         
          <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>   handleShowEditAddModal(listcategories[dataIndex])}>
                                     
                                   <i className="fas fa-pencil-alt"></i>
                                </button>
                         
          
                                <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=> Delete((listcategories[dataIndex]))}>
                    
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
          label: "name",
          name: "type",
          options: {
            filter: true,
          }
        },
        
        {
            name: "inventoryornot",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value, tableMeta, updateValue) => {
                    return <div>
                        <Switch checked={value}/>
                    </div>;
                }
            },
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
             {listcategories && (
               <MUIDataTable title={"Liste des categories"} data={listcategories} columns={columns} options={options} />
             
     
       )}
        
        <button className="btn btn-outline-primary my-4" onClick={handleShowEditAddModal}>nouvelle Categorie </button>        
         <AddEditCategoryModal CodeSce={category.id} show={showEditAddModal} handleClose={handleClose} />
       </Layout>
        </div>
    )
}

export default ListeCategories