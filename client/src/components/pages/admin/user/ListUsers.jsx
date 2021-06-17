import React,{useEffect} from 'react'
import MaterialTable from 'material-table'
import { useDispatch,useSelector } from "react-redux";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { getusers } from '../../../../actions/getUserAction';
import './ListUsers.css'
import Layout from '../../Layout/Layout';
function ListUsers() {
    const dispatch=useDispatch();
    const listusers = useSelector((state) => state.usersReducer);
    
    useEffect(()=>{
        dispatch(getusers());
    },[dispatch])
    return (
        <div>
            <Layout >
             {listusers && (
            <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          columns={[
            { title: 'Nom', field: 'nom' },
            { title: 'Mle', field: 'Mle' },
          
            
            { title: 'Actions', field: 'Actions' },
          ]}
          data={listusers}
          
          components={{
          
            Row: ({ data }) => {
              return (
                <TableRow>
                  <TableCell >{data.nom}</TableCell>
                  <TableCell >{data.Mle}</TableCell>
                  
                  <TableCell> <button type="button" className="btn btn-danger btn-sm px-3" onClick={()=>null}>
                   {/* {
                       Delete(data)}
                   }> */}
                        <i className="fas fa-times"></i>
                        </button>
                  
                        <button type="button" className="btn btn-success btn-sm px-3" onClick={ ()=>  null}>
                            {/* handleShowEditAddModal(data)}
                            // > */}
                        <i className="fas fa-pencil-alt"></i>
                        </button>
                        <button type="button" className="btn btn-secondary btn-sm px-3"  onClick={()=>null
                        // {
                        //    handleShowPassword(data)
                          
                        //     }
                            } >
                        <i className="fas fa-key"></i>
                        </button></TableCell>
                </TableRow>
              );
            },
          
          
          }}
          
          options={{
            showTitle: false,
       }}
       
        />
      </div>
       )}
       </Layout>
        </div>
    )
}

export default ListUsers
