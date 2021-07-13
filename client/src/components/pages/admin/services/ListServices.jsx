import React from 'react'
import MUIDataTable from "mui-datatables";
import '../admin/ListAdmins.css'
import '../admin//DeleteAdmin.css'
import Layout from '../../Layout/Layout';
function ListServices() {
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
            
        </div>
    )
}

export default ListServices
