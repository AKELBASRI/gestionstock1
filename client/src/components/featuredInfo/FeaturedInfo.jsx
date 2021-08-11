import React,{useEffect,useState} from 'react'
import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
import { flattenObject, getTotaMaterielByType,getTotalAvailableMaterielByType } from '../../core/ApiCore';
import FeaturedItem from './FeaturedItem';
function FeaturedInfo() {
    const [listTotalCountbyType,setlistTotalCountbyType]=useState([])
    const[listTotalAvailableByType,setlistTotalAvailableByType]=useState([])
    useEffect(()=>{
        getTotaMaterielByType().then((res)=>setlistTotalCountbyType(res)).catch((err) => console.log(err));
        getTotalAvailableMaterielByType().then((res)=>setlistTotalAvailableByType(res)).catch((err) => console.log(err));
    },[])

    const listTotalCountbyType1= listTotalCountbyType.map( (_data) =>{return flattenObject(_data)});
    const listTotalAvailableByType1= listTotalAvailableByType.map( (_data) =>{return flattenObject(_data)});
  
    return (
        <div>
        <h3><strong>Total :</strong> </h3>
        <div className="my-2"></div>
      <div className="d-flex">
          {listTotalCountbyType1 && listTotalCountbyType1.map((totalmateriel,i)=>(

          <FeaturedItem totalmateriel={totalmateriel} key={i} />
          ))
               
            
            }
           
         
        </div>
        <div className="my-2"></div>
        <h3><strong>Disponible :</strong> </h3>
        <div className="d-flex">
          {listTotalAvailableByType1 && listTotalAvailableByType1.map((totalmateriel,i)=>(

          <FeaturedItem totalmateriel={totalmateriel} key={i} />
          ))
               
            
            }
           
         
        </div>
        </div>
    )
}

export default FeaturedInfo
