import React,{useEffect,useState} from 'react'
import './featuredInfo.css'
import {ArrowDownward, ArrowUpward} from '@material-ui/icons'
import { getCountByType } from '../../core/ApiCore';
import FeaturedItem from './FeaturedItem';
function FeaturedInfo() {
    const [listCountByType,setCountType]=useState([])
    useEffect(()=>{
        getCountByType().then((res)=>setCountType(res)).catch((err) => console.log(err));
        console.log(listCountByType)
    },[])
    const flattenObject = function(ob) {
  
        return Object.keys(ob).reduce(function(toReturn, k) {
      
          if (Object.prototype.toString.call(ob[k]) === '[object Date]') {
            toReturn[k] = ob[k].toString();
          }
          else if ((typeof ob[k]) === 'object' && ob[k]) {
            var flatObject = flattenObject(ob[k]);
            Object.keys(flatObject).forEach(function(k2) {
              toReturn[k + '.' + k2] = flatObject[k2];
            });
          }
          else {
            toReturn[k] = ob[k];
          }
      
          return Object.keys(toReturn).map(function(_) { return toReturn[_]; });
        }, {});
      };
    const listCountByType1= listCountByType.map( (_data) =>{return flattenObject(_data)});
  
    return (
        
        <div className="featured">
        
             
                    {listCountByType1 && listCountByType1.map((countype,i)=>(

                   <FeaturedItem countype={countype} key={i} />
                    ))
               
            
            }
           
         
          
        </div>
    )
}

export default FeaturedInfo
