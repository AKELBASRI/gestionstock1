import React,{useEffect,useState} from 'react'
import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
import { flattenObject, getCountByType } from '../../core/ApiCore';
import FeaturedItem from './FeaturedItem';
function FeaturedInfo() {
    const [listTotalCountbyType,setlistTotalCountbyType]=useState([])
    useEffect(()=>{
        getCountByType().then((res)=>setlistTotalCountbyType(res)).catch((err) => console.log(err));
        
    },[])

    const listTotalCountbyType1= listTotalCountbyType.map( (_data) =>{return flattenObject(_data)});
  
    return (
        <div>
        <h2><strong>Total :</strong> </h2>
        <div className="my-2"></div>
      <div className="d-flex">
          {listTotalCountbyType1 && listTotalCountbyType1.map((totalmateriel,i)=>(

          <FeaturedItem totalmateriel={totalmateriel} key={i} />
          ))
               
            
            }
           
         
        </div>
        <div className="my-2"></div>
        <h2><strong>Disponible :</strong> </h2>
        </div>
    )
}

export default FeaturedInfo
