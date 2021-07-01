import React, { useState,useEffect } from 'react'
import { Link,withRouter } from 'react-router-dom';

function SubMenu({item1,state,props,onOpen}) {
    const [subnav, setSubnav] = useState(false);
    const showSubnav = () => setSubnav(!subnav);
    item1.close=()=>{setSubnav(false)}
    const isActive = (history, path) => {
      
      if (history.location.pathname === path) {
          
      
        return {
          background:"#172b4d",
          width: '100%'
        }
       
      } else {
       
        return {  
          width: '100%'
        }
       
      }
    };
    const clickitem=(item1,path)=>{
      
    
        if(item1.item.subNav){
          showSubnav()
        }else if(path){
          onOpen(item1.key)
        }

      
    }
    useEffect(()=>{
      if(subnav) {
        onOpen(item1.key)
      }
    },[subnav])
    return (
        <div>
           
           
            <ul>
            <li>
                
                <Link to={item1.item.subNav ?"#":item1.item.path}  style={isActive(props.history,item1.item.path)}  onClick={()=>clickitem(item1,item1.item.path)}
                 
                
                >
                  <span className="icon"><i className={item1.item.icon} ></i></span>
                  <span className="title">{item1.item.title}</span>
                  {item1.item.subNav &&(
                      item1.item.subNav && subnav
                        ? item1.item.iconOpened
                        : item1.item.subNav
                        ? item1.item.iconClosed
                        : null
                  )}
                </Link>
               
                {
                  subnav && 
                
                <ul className={state?"show":"showleft"}>

                
                {subnav && item1.item.subNav && item1.item.subNav.map((item,index)=>{
                    return(
                        <li key={index}  >
                      <Link to={item.path} style={isActive(props.history,item.path)  }   >
                      
                      <span className="title">{item.title}</span>
                    </Link></li>
                    );
                })}
                </ul>
                }
              </li>
              
             
            </ul>
        </div> 
       
    )
}

export default withRouter(SubMenu)
