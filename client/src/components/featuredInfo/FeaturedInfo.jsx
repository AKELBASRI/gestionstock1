import React,{useEffect,useState} from 'react'
import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
import { flattenObject, getCountByType } from '../../core/ApiCore';
import FeaturedItem from './FeaturedItem';
function FeaturedInfo() {
    const [listCountByType,setCountType]=useState([])
    useEffect(()=>{
        getCountByType().then((res)=>setCountType(res)).catch((err) => console.log(err));
        console.log(listCountByType)
    },[])

    const listCountByType1= listCountByType.map( (_data) =>{return flattenObject(_data)});
  
    return (
        
      <div>
          {listCountByType1 && listCountByType1.map((countype,i)=>(

          <FeaturedItem countype={countype} key={i} />
          ))
               
            
            }
           
         
          
        </div>
    )
}

export default FeaturedInfo
